/**
 * AboutPageController
 * @description - Landing Page Controller
 */

module app.pages.aboutPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IAboutPageController {
        form: ILandingForm;
        error: ILandingError;
        activate: () => void;
    }

    export interface ILandingScope extends angular.IScope {

    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface ILandingForm {

    }

    export interface ILandingError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class AboutPageController implements IAboutPageController {

        static controllerId = 'mainApp.pages.aboutPage.AboutPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ILandingForm;
        error: ILandingError;
        section: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = ['$state',
                                 '$translate'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $state: ng.ui.IStateService,
            private $translate: any) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //Init form
            this.form = {
            };

            //Init subnav section active
            this.section = 'history';

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;
            //LOG
            console.log('aboutPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        goToSection(section, event): void {
            event.preventDefault();
            this.section = section;
            document.querySelector('#'+ section +'-block').scrollIntoView({ behavior: 'smooth' });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.aboutPage')
        .controller(AboutPageController.controllerId, AboutPageController);

}
