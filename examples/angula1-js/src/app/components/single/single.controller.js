function singleController () {

    //option sets
    this.colorOptions = ['default','negative', 'ok', 'positive'];
    this.labelPositionOptions = ['top','right', 'left', 'bottom'];
    this.starOptions = ['svg', 'icon', 'image'];
    this.speedOptions = ['immediately', 'noticeable', 'slow'];
    this.sizeOptions = ['small', 'medium', 'large'];
    this.spaceOptions = ['around', 'between', 'no'];

    //component input properties (> bindings)
    this.id;
    this.numOfStars= 5;
    this.rating = 3.5;
    this.labelText;
    this.color;
    this.speed;
    this.size;
    this.space= false;
    this.readOnly= false;
    this.disabled= false;
    this.showHalfStars= false;
    this.getColor;
    this.useCustomCetColo = false;
    this.getHalfStarVisible;
    this.useCustomGetHalfStarVisible = false;

    this.onClick = onClick;
    this.onRatingChange = onRatingChange;
    this.updateGetColorBinding = updateGetColorBinding;
    this.updateGetHalfStarVisibleBinding = updateGetHalfStarVisibleBinding;

    //component output (& bindings)
    function onClick($event){
        console.log('single onClick rating: ',$event.rating);
    }

    function onRatingChange($event) {
        console.log('single onRatingChange rating: ',$event.rating);
        this.rating = $event.rating;
    }

    function updateGetColorBinding() {
        if(this.useCustomCetColor) {
            this.getColor = _getColor;
        }
        else {
            this.getColor = undefined;
        }
    }

    function updateGetHalfStarVisibleBinding() {
        if(this.useCustomGetHalfStarVisible) {
            this.getHalfStarVisible = _getHalfStarVisible;
        }
        else {
            this.getHalfStarVisible = undefined;
        }
    }

    function _getColor(rating, numOfStars, staticColor) {
        console.log('single getColor rating: ',rating, 'numOfStars: ', numOfStars, 'fixColor: ', staticColor);
        var colors = ['default', 'negative', 'ok', 'positive'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function _getHalfStarVisible(rating) {
        console.log('getHalfStarVisible rating: ',rating, rating%1);
        return (rating<3);
    }

}