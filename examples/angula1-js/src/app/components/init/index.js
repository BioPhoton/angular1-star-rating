
var initPage = angular
    .module('init-page', [])
    .component('initPageComp', InitComponent())
    .config(function($stateProvider) {
        $stateProvider
            .state('init',{
                    url: '/init',
                    template: '<init-page-comp></init-page-comp>'
                }
            );
    })
    .name;

