var InitController = function (){


    //option sets
    var colorOptions= ['default','negative', 'ok', 'positive'];
    var labelPositionOptions= ['top','right', 'left', 'bottom'];
    var starOptions= ['svg', 'icon', 'image'];
    var speedOptions= ['immediately', 'noticeable', 'slow'];
    var sizeOptions= ['small', 'medium', 'large'];
    var spaceOptions= ['around', 'between', 'no'];

    //component input properties (> bindings)
    var id;
    //pathEmpty: string;
    //pathFilled:string;
    var numOfStars = 5;
    var rating = 3.5;
    var labelText= this.rating;
    var color;
    var speed;
    var size;
    var space= false;
    var readOnly= false;
    var disabled= false;
    var showHalfStars= false;
    //component input functions (> bindings)
    var getColor = _getColor;
    var useCustomCetColor= false;
    var getHalfStarVisible = _getHalfStarVisible;
    var useCustomGetHalfStarVisible= false;

    //component output (& bindings)
    function onClick($event) {
        console.log('single onClick rating: ',$event.rating);
    }

    function onUpdate($event) {
        console.log('single onUpdate rating: ',$event.rating);
        this.rating = $event.rating;
    }

    function updateGetColorBinding() {
        console.log('update Bind ', this.useCustomCetColor, this.getColor);
        if(this.useCustomCetColor) {
            this.getColor = this._getColor;
        }
        else {
            this.getColor = undefined;
        }

        console.log('updated this.getColor ', this.getColor);
    }

    function updateGetHalfStarVisibleBinding() {
        if(this.useCustomGetHalfStarVisible) {
            this.getHalfStarVisible = this._getHalfStarVisible;
        }
        else {
            this.getHalfStarVisible = undefined;
        }
    }

    function _getColor(rating, numOfStars, staticColor) {
        console.log('single getColor rating: ',rating, 'numOfStars: ', numOfStars, 'fixColor: ', staticColor);
        let colors = ['default', 'negative', 'ok', 'positive'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function _getHalfStarVisible(rating){
        console.log('getHalfStarVisible rating: ',rating, rating%1);
        return (rating<3);
    }

}