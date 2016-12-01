/**
* config()
* @description - about page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.landingPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.landingPage.about', {
                url: '/landing/about',
                views: {
                    'container': {
                        templateUrl: 'app/pages/landingPage/aboutPage/aboutPage.html'
                    }
                },
                parent: 'page',
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = false;
                }],
                params: {
                    user: null,
                    id: null
                }
            });
    }
})();
