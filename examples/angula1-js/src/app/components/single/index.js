var singlePage = angular
    .module('single-page', [])
    .component('singlePageComp', singleComponent())
    .config(function($stateProvider) {
        $stateProvider
            .state('single', {
                    url: '/single',
                    template: '<single-page-comp></single-page-comp>'
                }
            );
    })
    .name;
