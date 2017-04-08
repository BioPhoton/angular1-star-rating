import {
    IStarRatingCompBindings
    , starRatingSizes
    , starRatingSpeed
    , starRatingPosition
    , starRatingStarTypes
    , starRatingColors
    , starRatingStarSpace
    , IStarRatingOnClickEvent
    , IStarRatingOnUpdateEvent, IStarRatingOnHoverEvent
} from "star-rating.structs"

export class StarRatingController implements ng.IComponentController, IStarRatingCompBindings {

    static DefaultClassEmpty: string = "default-star-empty-icon";

    static DefaultClassHalf: string = "default-star-half-icon";

    static DefaultClassFilled: string = "default-star-filled-icon";

    static DefaultNumOfStars: number = 5;

    static DefaultShowHoverStars:boolean = false;

    static DefaultSize: starRatingSizes = "medium";

    static DefaultSpeed: starRatingSpeed = "noticeable";

    static DefaultLabelPosition: starRatingPosition = "left";

    static DefaultLabelHidden: boolean = false;

    static DefaultStarType: starRatingStarTypes = "svg";

    static DefaultAssetsPath: string = "assets/images/";

    static DefaultSvgPath: string = StarRatingController.DefaultAssetsPath + "star-rating.icons.svg";
    static DefaultSvgEmptySymbolId: string = "star-empty";
    static DefaultSvgHalfSymbolId: string = "star-half";
    static DefaultSvgFilledSymbolId: string = "star-filled";

    static DefaultSvgPathEmpty: string = StarRatingController.DefaultSvgPath + "#" + StarRatingController.DefaultSvgEmptySymbolId;

    static DefaultSvgPathHalf: string = StarRatingController.DefaultSvgPath + "#" + StarRatingController.DefaultSvgHalfSymbolId;

    static DefaultSvgPathFilled: string = StarRatingController.DefaultSvgPath + "#" + StarRatingController.DefaultSvgFilledSymbolId;


    /**
     * _getStarsArray
     *
     * returns an array of increasing numbers starting at 1
     *
     * @param numOfStars
     * @returns {Array}
     */
    static _getStarsArray(numOfStars: number): Array<number> {
        let stars = [];
        for (let i = 0; i < numOfStars; i++) {
            stars.push(i + 1);
        }
        return stars;
    }

    /**
     * _getHalfStarVisible
     *
     * Returns true if there should be a half star visible, and false if not.
     *
     * @param rating
     * @returns {boolean}
     */
    static _getHalfStarVisible(rating: number): boolean {
        return Math.abs(rating % 1) > 0;
    }

    /**
     * _getColor
     *
     * The default function for color calculation
     * based on the current rating and the the number of stars possible.
     * If a staticColor is set the function will use it as return value.
     *
     * @param rating
     * @param numOfStars
     * @param staticColor
     * @returns {starRatingColors}
     */
    static _getColor(rating: number, numOfStars: number, staticColor?: starRatingColors): starRatingColors {
        rating = rating || 0;

        //if a fix color is set use this one
        if (staticColor) {
            return staticColor;
        }

        //calculate size of smallest fraction
        let fractionSize = numOfStars / 3;

        //apply color by fraction
        let color: starRatingColors = 'default';
        if (rating > 0) {
            color = 'negative';
        }
        if (rating > fractionSize) {
            color = 'ok';
        }
        if (rating > fractionSize * 2) {
            color = 'positive';
        }

        return color;
    }


    //bindings

    //inputs
    protected _id: string;
    protected _labelText: string;
    protected _staticColor: starRatingColors;
    protected _labelPosition: starRatingPosition;
    protected _labelHidden: boolean;
    protected _speed: starRatingSpeed;
    protected _size: starRatingSizes;
    protected _starType: starRatingStarTypes;
    protected _space: starRatingStarSpace;
    protected _readOnly: boolean;
    protected _disabled: boolean;
    protected _showHalfStars: boolean;
    protected _showHoverStars: boolean;
    protected _rating: number;
    protected _numOfStars: number;
    getHalfStarVisible: (rating: number) => boolean;
    getColor: (rating: number, numOfStars: number, staticColor?: starRatingColors) => starRatingColors;

    //outputs
    onHover?: ($event: any) =>  IStarRatingOnHoverEvent;
    onClick?: ($event: any) =>  IStarRatingOnClickEvent;
    onRatingChange?: ($event: any) => IStarRatingOnUpdateEvent;

    //ctrl only
    classEmpty: string;
    classHalf: string;
    classFilled: string;

    pathEmpty: string;
    pathHalf: string;
    pathFilled: string;

    color: starRatingColors;
    stars: Array<number>;
    hoverRating:number;
    ratingAsInteger: number;
    halfStarVisible: boolean;

    //getter and setter
    set numOfStars(value: number) {
        this._numOfStars = (value > 0)?value:StarRatingController.DefaultNumOfStars;

        //update stars array
        this.stars = StarRatingController._getStarsArray(this.numOfStars);

        //update color
        this.setColor();
    }
    get numOfStars(): number {
        return this._numOfStars || StarRatingController.DefaultNumOfStars;
    }

    set rating(value: number) {
        if(value === undefined) {
            return
        }
        //validate and apply newRating
        let newRating:number = 0;
        if( value >= 0
            && value <= this.numOfStars) {
            newRating = value;
        }
        //limit max value to max number of stars
        if(value > this.numOfStars) {
            newRating = this.numOfStars;
        }
        this._rating = newRating;
        //update ratingAsInteger. rating parsed to int for the value-[n] modifier
        this.ratingAsInteger = parseInt(this._rating.toString());

        //update halfStarsVisible
        this.setHalfStarVisible();

        //update calculated Color
        this.setColor();

        //fire onRatingChange event
        let $event:IStarRatingOnUpdateEvent = {rating: this._rating};
        if(typeof this.onRatingChange === 'function') {
            this.onRatingChange({$event:$event});
        }
    }
    get rating(): number {
        return this._rating;
    }

    set showHalfStars(value: boolean) {
        this._showHalfStars = !!value;
        //update halfStarVisible
        this.setHalfStarVisible();
    }
    get showHalfStars(): boolean {
        return this._showHalfStars;
    }

    set showHoverStars(value: boolean) {
        this._showHoverStars = !!value;
    }
    get showHoverStars(): boolean {
        return this._showHoverStars;
    }

    set disabled(value: boolean) {
        this._disabled = !!value;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    set readOnly(value: boolean) {
        this._readOnly = !!value;
    }
    get readOnly(): boolean {
        return this._readOnly;
    }

    set space(value: starRatingStarSpace) {
        this._space = value;
    }
    get space(): starRatingStarSpace {
        return this._space;
    }

    set starType(value: starRatingStarTypes) {
        this._starType = value || StarRatingController.DefaultStarType;
    }
    get starType(): starRatingStarTypes {
        return this._starType;
    }

    set size(value: starRatingSizes) {
        this._size = value || StarRatingController.DefaultSize;
    }
    get size(): starRatingSizes {
        return this._size;
    }

    set speed(value: starRatingSpeed) {
        this._speed = value || StarRatingController.DefaultSpeed;
    }
    get speed(): starRatingSpeed {
        return this._speed;
    }

    set labelPosition(value: starRatingPosition) {
        this._labelPosition = value || StarRatingController.DefaultLabelPosition;
    }
    get labelPosition(): starRatingPosition {
        return this._labelPosition;
    }

    set labelHidden(value: boolean) {
        this._labelHidden = !!value;
    }
    get labelHidden(): boolean {
        return this._labelHidden;
    }


    set staticColor(value: starRatingColors) {
        this._staticColor = value || undefined;

        //update color.
        this.setColor();
    }
    get staticColor(): starRatingColors {
        return this._staticColor;
    }

    set labelText(value: string) {
        this._labelText = value;
    }
    get labelText(): string {
        return this._labelText;
    }

    set id(value: string) {
        this._id = value || (Math.random() * 10000).toString();
    }
    get id(): string {
        return this._id;
    }


    getComponentClassNames():string {
        let classNames:string[] = [];

        classNames.push(this.rating?'value-'+this.ratingAsInteger:'value-0');
        classNames.push(this.showHoverStars?'hover':'');
        classNames.push(this.hoverRating?'hover-'+this.hoverRating:'hover-0');
        classNames.push(this.halfStarVisible?'half':'');
        classNames.push(this.space?'space-'+this.space:'');
        classNames.push(this.labelHidden?'label-hidden':'label-visible');
        classNames.push(this.labelPosition?'label-'+this.labelPosition:'');
        classNames.push(this.color?'color-'+this.color:'');
        classNames.push(this.starType?'star-'+this.starType:'');
        classNames.push(this.speed);
        classNames.push(this.size);
        classNames.push(this.readOnly?'read-only':'');
        classNames.push(this.disabled?'disabled':'');

        return classNames.join(' ');
    }

    svgVisible():boolean {
        return this.starType === "svg";
    }

    setColor() {
        //check if custom function is given
        if(typeof this.getColor === "function") {
            this.color = this.getColor(this.rating, this.numOfStars, this.staticColor);
        }
        else {
            this.color = StarRatingController._getColor(this.rating, this.numOfStars, this.staticColor);
        }
    }

    setHalfStarVisible() {
        //update halfStarVisible
        if(this.showHalfStars) {

            //check if custom function is given
            if(typeof this.getHalfStarVisible === "function") {
                this.halfStarVisible = this.getHalfStarVisible(this.rating);
            } else {
                this.halfStarVisible = StarRatingController._getHalfStarVisible(this.rating);
            }

        }
        else {
            this.halfStarVisible = false;
        }
    }

    constructor() {
        //set default ctrl props
        this.classEmpty = StarRatingController.DefaultClassEmpty;
        this.classHalf = StarRatingController.DefaultClassHalf;
        this.classFilled = StarRatingController.DefaultClassFilled;
        this.pathEmpty = StarRatingController.DefaultSvgPathEmpty;
        this.pathHalf = StarRatingController.DefaultSvgPathHalf;
        this.pathFilled = StarRatingController.DefaultSvgPathFilled;

        //set default Component Inputs
        this._showHoverStars = StarRatingController.DefaultShowHoverStars;
        this.labelHidden = StarRatingController.DefaultLabelHidden;
        this._numOfStars = StarRatingController.DefaultNumOfStars;
        this.stars = StarRatingController._getStarsArray(this.numOfStars);
        this.setColor();

        //set default Outputs

    }


    /**
     * $onChanges
     *
     * The components $onChange hook
     *
     * @param changes
     */
    $onChanges(changes): void {
        let valueChanged = function (key: string, changes): boolean {
            if (key in changes) {
                if (
                    //(changes[key].previousValue != 'UNINITIALIZED_VALUE' && changes[key].currentValue !== undefined)
                     changes[key].currentValue != changes[key].previousValue) {
                    return true;
                }
            }
            return false;
        };

        //---------------------------------------

        //functions
        //@Notice For some reason callback functions is not defined even there are defaults in the constructor
        if (valueChanged('getColor', changes)) {
            this.getColor = changes.getColor.currentValue;
            this.setColor();
        }

        if (valueChanged('getHalfStarVisible', changes)) {
            this.getHalfStarVisible = changes.getHalfStarVisible.currentValue;
            this.setHalfStarVisible();
        }

        //boolean
        if (valueChanged('showHalfStars', changes)) {
            this.showHalfStars = changes.showHalfStars.currentValue;
        }

        if (valueChanged('space', changes)) {
            this.space = changes.space.currentValue;
        }

        if (valueChanged('readOnly', changes)) {
            this.readOnly = changes.readOnly.currentValue;
        }

        if (valueChanged('disabled', changes)) {
            this.disabled = changes.disabled.currentValue;
        }

        if(valueChanged('labelHidden', changes)) {
            this.labelHidden = changes.labelHidden.currentValue
        }

        //number
        if (valueChanged('rating', changes)) {
            this.rating = changes.rating.currentValue;
        }

        if (valueChanged('numOfStars', changes)) {
            this.numOfStars = changes.numOfStars.currentValue;
        }

        //string
        if (valueChanged('labelText', changes)) {
            this.labelText = changes.labelText.currentValue;
        }

        if (valueChanged('staticColor', changes)) {
            this.staticColor = changes.staticColor.currentValue;
        }

        if (valueChanged('size', changes)) {
            this.size = changes.size.currentValue;
        }

        if (valueChanged('speed', changes)) {
            this.speed = changes.speed.currentValue;
        }

        if (valueChanged('labelPosition', changes)) {
            this.labelPosition = changes.labelPosition.currentValue;
        }

        if (valueChanged('starType', changes)) {
            this.starType = changes.starType.currentValue;
        }
    }

    /**
     * onStarClicked
     *
     * Is fired when a star is clicked. And updated the rating value.
     * This function returns if the disabled or readOnly
     * property is set. If provided it emits the onClick event
     * handler with the actual rating value.
     *
     * @param rating
     */
    protected onStarClicked(rating: number): void {

        if (!this.interactionPossible()) {
            return;
        }

        this.rating = rating;

        //fire onClick event
        let $event:IStarRatingOnClickEvent = {rating: rating};
        if(typeof this.onClick === 'function') {
            this.onClick({$event:$event});
        }
    }

    protected onStarHover(rating: number): void {

        if (!this.interactionPossible() || !this.showHoverStars) {
            return;
        }

        this.hoverRating = rating?parseInt(rating.toString()):0;
        //fire onHover event
        let $event:IStarRatingOnHoverEvent = { hoverRating: this.hoverRating};
        if(typeof this.onHover === 'function') {
            this.onHover({$event:$event});
        }

    }

    protected interactionPossible():boolean {
        return  !this.readOnly && !this.disabled;
    }

    /**
     * Get the closest matching element up the DOM tree.
     * @private
     * @param  {Element} elem     Starting element
     * @param  {String}  selector Selector to match against
     * @return {Boolean|Element}  Returns null if not match found
     */
    protected getClosest ( elem, selector ) {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {
                    }
                    return i > -1;
                };
        }

        // Get closest match
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }

        return null;
    }

}