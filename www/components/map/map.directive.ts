/**
* MaMap
* @description - MainApp Map Directive
* @example - <ma-search-map></ma-search-map>
*/

module components.map {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IMap extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaMap implements IMap {

        static directiveId = 'maMap';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = MapController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        transclude: true;
        scope = {
            mapConfig: '='
        };
        templateUrl: string = 'components/map/map.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maMap directive constructor');
        }

        link($scope: IMapScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maMap link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IMap {
            return new MaMap();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.map')
        .directive(MaMap.directiveId, MaMap.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * MapController
    * @description - Map Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IMapController {
        activate: () => void;
    }

    interface IMapForm {
        position: IPosition;
    }

    export interface IPosition {
        lat: number;
        lng: number;
    }

    interface IMapScope extends angular.IScope {
        options: IMapOptions;
        modalOptions: IMapOptions;
        mapConfig: IMapConfig;
        mapId: string;
    }

    interface IMapOptions extends google.maps.MapOptions {
        center: any;
        zoom: number;
        mapTypeControl: boolean;
        zoomControl: boolean;
        zoomControlOptions: any;
        streetViewControl: boolean;
    }

    export interface IMapConfig {
        type: string;
        data: IMapDataSet;
    }

    export interface IMapDataSet {
        position: IPosition;
        markers: Array<IMapMarkers>;
    }

    export interface IMapMarkers {
        id: string;
        position: IPosition;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class MapController implements IMapController {

        static controllerId = 'mainApp.components.map.MapController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        private _map: google.maps.Map;
        private _infoWindow: google.maps.InfoWindow;
        private _markers: Array<any>;
        private _meetingPointDetailsData: any;
        form: IMapForm;
        mapId: string;
        mapConfig: IMapConfig;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$scope', '$rootScope', '$timeout'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(public $scope: IMapScope,
                    public $rootScope: app.core.interfaces.IMainAppRootScope,
                    private $timeout) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //VARIABLES
            let self = this;
            /********************/

            //init properties
            this._map;
            this.mapId = 'ma-map-' + Math.floor((Math.random() * 100) + 1);
            this._infoWindow = null;
            this._markers = [];
            this.$scope.options = null;
            //Form init
            this.form = {
                position: {
                    lat: null,
                    lng: null
                }
            };

            //default map options
            switch(this.mapConfig.type) {
                case 'search-map':
                    this._searchMapBuilder();
                break;
            }

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('map controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * _searchMapBuilder
        * @description - this method builds the Map on Search Page
        * @use - this._searchMapBuilder();
        * @function
        * @return {void}
        */
        private _searchMapBuilder(): void {
            //VARIABLES
            let self = this;
            let zoom = 16;
            let center = this.mapConfig.data.position;
            /********************/

            //Map options
            this.$scope.options = {
                center: new google.maps.LatLng(center.lat, center.lng),
                zoom: zoom,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: false,
                scrollwheel: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                }
            };

            // Init map
            if (this._map === void 0) {

                this.$timeout(function() {

                    //Init Map
                    self._map = new google.maps.Map(
                        document.getElementById(self.mapId),
                        self.$scope.options
                    );

                    //Create Filter Buttons
                    self._createFilterButtons();

                    //set markers
                    for (let i = 0; i < self.mapConfig.data.markers.length; i++) {
                        let marker = self.mapConfig.data.markers[i];
                        self._setMarker(marker.id,
                                        new google.maps.LatLng(marker.position.lat, marker.position.lng),
                                        'assets/images/meeting-point.png');
                    }

                });
            }

        }


        /**
        * _setMarker
        * @description - this method assigns every Marker on Map
        * @use - this._setMarker('1',
                                 new google.maps.LatLng(34.98, 12.92),
                                 'assets/images/meeting-point.png');
        * @function
        * @params {string} id - entity id
        * @params {google.maps.LatLng} position google object - position on the map
        * @params {string} icon - icon image route (i.e. 'assets/images/meeting-point.png')
        * @return {void}
        */

        private _setMarker (id: string, position: google.maps.LatLng,
                            icon: string): void {
            // VARIABLES
            let self = this;
            let marker;
            let markerOptions = {
                id: id,
                position: position,
                map: this._map,
                icon: icon
            };
            /********************/

            // create marker object
            marker = new google.maps.Marker(markerOptions);

            // add marker to markers array
            this._markers.push(marker);

        }


        /**
        * _filterControl
        * @description - this method build filters button on Map
        * @use - this._filterControl(document.createElement('div'),
                                    'Stundents');
        * @function
        * @params {HTMLDivElement} controlDiv - html div element
        * @params {string} type - filter button type
        * @return {void}
        */

        private _filterControl(controlDiv: HTMLDivElement, type: string): void {
            // VARIABLES
            let self = this;
            let defaultBtn = 'Students';
            let className = 'filterBtnMap';
            let background_color = 'rgb(255, 255, 255)';
            let background_color_active = '#00B592';
            let border_radius = '3px';
            let box_shadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
            let cursor = 'pointer';
            let margin_top = '10px';
            let margin_bottom = '22px';
            let margin_right = '10px';
            let text_align = 'center';
            let title = 'Click to search' + type;
            let color = '#4E4E4E';
            let color_active = '#FFF';
            let font_family = 'Roboto,Arial,sans-serif';
            let font_size = '15px';
            let line_height = '10px';
            let padding_top = '10px';
            let padding_bottom = '10px';
            let padding_left = '20px';
            let padding_right = '20px';
            let border_bottom = '0 hidden transparent';
            let border_bottom_active = '2px solid #018a6f';
            /********************/

            // Set CSS for the control.
            let controlUI = document.createElement('div');
            controlUI.className = className;
            controlUI.style.borderRadius = border_radius;
            controlUI.style.boxShadow = box_shadow;
            controlUI.style.cursor = cursor;
            controlUI.style.marginTop = margin_top;
            controlUI.style.marginBottom = margin_bottom;
            controlUI.style.marginRight = margin_right;
            controlUI.style.textAlign = text_align;
            controlUI.title = title;
            //Assign Active mode to Button Default
            if(type === defaultBtn){
                controlUI.style.backgroundColor = background_color_active;
                controlUI.style.borderBottom = border_bottom_active;
            } else {
                controlUI.style.backgroundColor = background_color;
            }

            controlDiv.appendChild(controlUI);

            // Set CSS for the control interior.
            let controlText = document.createElement('div');
            controlText.style.fontFamily = font_family;
            controlText.style.fontSize = font_size;
            controlText.style.lineHeight = line_height;
            controlText.style.paddingTop = padding_top;
            controlText.style.paddingBottom = padding_bottom;
            controlText.style.paddingLeft = padding_left;
            controlText.style.paddingRight = padding_right;
            controlText.innerHTML = type;
            // Assign Active mode to Button Default
            if(type === defaultBtn) {
                controlText.style.color = color_active;
            } else {
                controlText.style.color = color;
            }

            controlUI.appendChild(controlText);

            // Click event listener
            controlUI.addEventListener('click', function(e) {
                // VARIABLES
                let element = this;
                let child:any = this.children[0];
                let filterBtn:any = document.getElementsByClassName(className);

                // Clean button state
                for (let i = 0; i < filterBtn.length; i++) {
                    filterBtn[i].style.backgroundColor = background_color;
                    filterBtn[i].style.borderBottom = border_bottom;
                    filterBtn[i].children[0].style.color = color;
                }

                // Active button
                element.style.backgroundColor = background_color_active;
                element.style.borderBottom = border_bottom_active;
                child.style.color = color_active;

                //Remove all markers
                self._removeMarkers();

                self.$scope.$emit(type);
            });

        }


        /**
        * _removeMarkers
        * @description - this method remove all markers on Map
        * @use - this._removeMarkers();
        * @function
        * @return {void}
        */

        private _removeMarkers(): void {
            for (let i = 0; i < this._markers.length; i++) {
                this._markers[i].setMap(null);
            }
        }


        /**
        * _createFilterButtons
        * @description - this method builds every filter button on the Map
        * @use - this._createFilterButtons();
        * @function
        * @return {void}
        */

        private _createFilterButtons(): void {
            let buttons = ['Students', 'Teachers', 'Schools'];

            for (let i = 0; i < buttons.length; i++) {
                let controlDiv: HTMLDivElement = document.createElement('div');
                let control = this._filterControl(controlDiv, buttons[i]);
                this._map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
            }
        }


        /**
        * _subscribeToEvents
        * @description - this method subscribes Map Component to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * BuildMarkers event
            * @parent - SearchPageController
            * @description - Parent send markers list in order to Child draws them on map
            * @event
            */
            this.$scope.$on('BuildMarkers', function(event, args) {
                self.mapConfig = args;
                //set markers
                for (let i = 0; i < self.mapConfig.data.markers.length; i++) {
                    let marker = self.mapConfig.data.markers[i];
                    self._setMarker(marker.id,
                                    new google.maps.LatLng(marker.position.lat, marker.position.lng),
                                    'assets/images/meeting-point.png');
                }
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.map')
        .controller(MapController.controllerId, MapController);

}
