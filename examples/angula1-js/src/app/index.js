angular.module('app',
      [
            "star-rating"
          , "ui.router"
          , "single-page"
          , "init-page"
      ])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('single');
    });