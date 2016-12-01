(function () {
    'use strict';
    angular
        .module('mainApp.pages.landingPage')
        .config(config);
    function config($stateProvider) {
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
//# sourceMappingURL=aboutPage.config.js.map