﻿/**
 * module() Here inject dependencies of App modules and components, such as controllers, service, directive, etc
 * config() Here define the main state, routes, http interceptor
 *
 * @param {angular.ui.IUrlRouterProvider} $urlRouterProvider
 * @return {void}
 */

(function (): void {
    'use strict';

    angular
        .module('mainApp', [
            'mainApp.auth',
            'mainApp.core',
            'mainApp.core.util',
            'mainApp.localStorage',
            'mainApp.core.restApi',
            'mainApp.models.user',
            'mainApp.pages.main',
            'mainApp.components.header',
            'mainApp.components.map',
            'mainApp.components.footer',
            'mainApp.pages.landingPage',
            'mainApp.pages.aboutPage',
            'mainApp.pages.howItWorksPage'
        ])
        .config(config);

    function config($locationProvider: angular.ILocationProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $translateProvider: angular.translate.ITranslateProvider) {

        /*$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');*/

        //$urlRouterProvider.otherwise('/page');
        $urlRouterProvider.otherwise('/page/landing');

        /* Translate Provider */
        let prefix = 'assets/i18n/';
        let suffix = '.json';

        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });

        $translateProvider.preferredLanguage('en');

    }

})();
