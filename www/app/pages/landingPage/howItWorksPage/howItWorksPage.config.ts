/**
* config()
* @description - how it works page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.howItWorksPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.landingPage.work', {
                url: '/landing/work',
                views: {
                    'container': {
                        templateUrl: 'app/pages/landingPage/howItWorksPage/howItWorksPage.html',
                        controller: 'mainApp.pages.howItWorksPage.HowItWorksPageController',
                        controllerAs: 'vm'
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
