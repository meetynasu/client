/**
 * run() run low-level functionality
 * such as authorization, get user info, roles, etc.
 *
 * @param {scope} $rootScope
 * @param {ICurrentUser} currentUser
 * @return {void}
 */

(function (): void {

    'use strict';

    angular
        .module('mainApp')
        .run(run);

    run.$inject = ['$rootScope', 'dataConfig', '$http'];

    function run($rootScope: ng.IRootScopeService,
                 dataConfig: IDataConfig,
                 $http: any ): void {

        mixpanel.init(dataConfig.mixpanelToken, {
            loaded: function(mixpanel) {
                let first_visit = mixpanel.get_property("First visit");
                let current_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                if(first_visit == null) {
                    mixpanel.register_once({ "First visit": current_date });
                    mixpanel.track("Visit");
                }
            }
        });

        //TODO: Get these values from the logged user
        dataConfig.userId = 'id1234';
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();



(function (angular) {

  function localStorageServiceFactory($window) {
    if($window.localStorage){
      return $window.localStorage;
    }
    throw new Error('Local storage support is needed');
  }

  // Inject dependencies
  localStorageServiceFactory.$inject = ['$window'];

  // Export
  angular
    .module('mainApp.localStorage', [])
    .factory('mainApp.localStorageService', localStorageServiceFactory);

})(angular);
