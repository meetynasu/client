var app;
(function (app) {
    var pages;
    (function (pages) {
        var aboutPage;
        (function (aboutPage) {
            var AboutPageController = (function () {
                function AboutPageController($state, $translate) {
                    this.$state = $state;
                    this.$translate = $translate;
                    this._init();
                }
                AboutPageController.prototype._init = function () {
                    this.form = {};
                    this.section = 'history';
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                AboutPageController.prototype.activate = function () {
                    var self = this;
                    console.log('aboutPage controller actived');
                };
                AboutPageController.prototype.goToSection = function (section, event) {
                    event.preventDefault();
                    this.section = section;
                    document.querySelector('#' + section + '-block').scrollIntoView({ behavior: 'smooth' });
                };
                return AboutPageController;
            }());
            AboutPageController.controllerId = 'mainApp.pages.aboutPage.AboutPageController';
            AboutPageController.$inject = ['$state',
                '$translate'];
            aboutPage.AboutPageController = AboutPageController;
            angular
                .module('mainApp.pages.aboutPage')
                .controller(AboutPageController.controllerId, AboutPageController);
        })(aboutPage = pages.aboutPage || (pages.aboutPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=aboutPage.controller.js.map