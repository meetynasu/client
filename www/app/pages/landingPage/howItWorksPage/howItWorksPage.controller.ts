/**
 * HowItWorksPageController
 * @description - Landing Page Controller
 */

module app.pages.howItWorksPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IHowItWorksPageController {
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
    export class HowItWorksPageController implements IHowItWorksPageController {

        static controllerId = 'mainApp.pages.howItWorksPage.HowItWorksPageController';

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
            this.section = 'browse';

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
            console.log('howItWorksPage controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        goToSection(section): void {
            event.preventDefault();
            this.section = section;
            document.querySelector('#'+ section +'-block').scrollIntoView({ behavior: 'smooth' });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.howItWorksPage')
        .controller(HowItWorksPageController.controllerId, HowItWorksPageController);

}
