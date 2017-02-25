var singleComponent = function () {

    var ctrl = {
        templateUrl : "app/components/single/single.view.html",
        controller : singleController,
        controllerAs : 'single',
        replace : true
    };

    return ctrl;

};