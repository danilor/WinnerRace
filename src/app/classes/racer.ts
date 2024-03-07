import {min} from "rxjs/operators";

export class Racer {

  /**
   * This is the name of the racer. Could be a number
   * @private
   */
  private _name = '';

  /**
   * The label for the racer
   * @private
   */
  private _label = '';

  /**
   * The initial Value
   * @private
   */
  private _minValue = 0;
  /**
   * The max and winner value
   * @private
   */
  private _maxValue = 10000;
  /**
   * The minimal steps taken in a tic
   * @private
   */
  private _minStep = 1;
  /**
   * The max steps taken in a tic
   * @private
   */
  private _maxStep = 12;


  /**
   * Current step
   * @private
   */
  private _currentStep = 0;


  /**
   * If this is true, the farther he has go, the more possibility to reduce its step on a
   * minimal of 1
   * @private
   */
  private _firstPlaceDisadvantage = true;


  private _active = true;

  /**
   *
   * @param minvalue
   * @param maxValue
   * @param minStep
   * @param maxStep
   */
  constructor(name = '', minvalue = 0, maxValue = 1000, minStep = 1, maxStep = 15) {
    this._name = name;
    this._minValue = minvalue;
    this._maxValue = maxValue;
    this._minStep = minStep;
    this._maxStep = maxStep;
  }


  /**
   * This will reset the position of this racer
   */
  reset(): void {
    this.currentStep = 0;

  }

  /**
   * This will execute one single step
   */
  advance(): void {

    /**
     * If this racer is inactive, then we are not going to advance
     */
    if (!this.active) {
      return;
    }

    if (this.isWinner()) {
      return;
    }


    /**
     * Getting the next step
     */
    let step = Math.floor(Math.random() * (this.minStep + this.maxStep));

    if (this._firstPlaceDisadvantage) {
      /**
       * What we are doing here is the following:
       * If the racer is ahead and it is close to the end, we are going to introduce a disadvantage
       * so it will run slower on the last portion of the track.
       * To do this, we are going to get the percentage of travel, get a random number out of it
       * and subtract that number from the actual current step as multiples of 10. And if the current step is less
       * than 1, we move it to 1
       */
      const modifier = Math.floor(Math.random() * (this.getPercent())) / 10;
      step -= modifier;
      if (step < 1) {
        step = 1;
      }
    }

    this.currentStep += step;

    if (this.currentStep > this.maxValue) {
      this.currentStep = this.maxValue;
    }
    return;

  }


  /**
   * This will return the currente step but as percent
   */
  getPercent(): number {
    const aux = (this.currentStep * 100 / this.maxValue);
    return aux;
  }


  /**
   * Returns the currente step
   */
  getRacerCurrentStep(): number {
    return this._currentStep;
  }

  /**
   * Returns if the racer is a winner
   */
  isWinner(): boolean {
    const aux = (this._currentStep >= this._maxValue);
    /*if(aux){
      console.log(this);
    }*/
    return aux;
  }

  /**
   * This will put on inactive this racer
   */
  disableRacer(): void {
    this.active = false;
  }

  /**
   * Returns if the current racer is active
   */
  isActive(): boolean {
    return this._active;
  }


  get minValue(): number {
    return this._minValue;
  }

  set minValue(value: number) {
    this._minValue = value;
  }

  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(value: number) {
    this._maxValue = value;
  }

  get minStep(): number {
    return this._minStep;
  }

  set minStep(value: number) {
    this._minStep = value;
  }

  get maxStep(): number {
    return this._maxStep;
  }

  set maxStep(value: number) {
    this._maxStep = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }


  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get currentStep(): number {
    return this._currentStep;
  }

  set currentStep(value: number) {
    this._currentStep = value;
  }


  get firstPlaceDisadvantage(): boolean {
    return this._firstPlaceDisadvantage;
  }

  set firstPlaceDisadvantage(value: boolean) {
    this._firstPlaceDisadvantage = value;
  }


  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }
}
