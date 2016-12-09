var app;
(function (app) {
    var pages;
    (function (pages) {
        var howItWorksPage;
        (function (howItWorksPage) {
            var HowItWorksPageController = (function () {
                function HowItWorksPageController($state, $translate) {
                    this.$state = $state;
                    this.$translate = $translate;
                    this._init();
                }
                HowItWorksPageController.prototype._init = function () {
                    this.form = {};
                    this.section = 'browse';
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                HowItWorksPageController.prototype.activate = function () {
                    var self = this;
                    console.log('howItWorksPage controller actived');
                };
                HowItWorksPageController.prototype.goToSection = function (section) {
                    event.preventDefault();
                    this.section = section;
                    document.querySelector('#' + section + '-block').scrollIntoView({ behavior: 'smooth' });
                };
                return HowItWorksPageController;
            }());
            HowItWorksPageController.controllerId = 'mainApp.pages.howItWorksPage.HowItWorksPageController';
            HowItWorksPageController.$inject = ['$state',
                '$translate'];
            howItWorksPage.HowItWorksPageController = HowItWorksPageController;
            angular
                .module('mainApp.pages.howItWorksPage')
                .controller(HowItWorksPageController.controllerId, HowItWorksPageController);
        })(howItWorksPage = pages.howItWorksPage || (pages.howItWorksPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=howItWorksPage.controller.js.map