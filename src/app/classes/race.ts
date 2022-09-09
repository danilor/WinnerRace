import {Racer} from "./racer";
import {UtilService} from "../services/util.service";

export class Race {

  private numberOfRacers = 10;
  readonly racers: Racer[] = []; // This will hold the list of racers

  private timer = 100; // milliseconds. This is every time we want to execute the step process

  private timerObject: any = null;

  private startingValue = 0;
  private endingValue = 10000;

  private RaceResult: any;

  private takeIntoCountHorseStamina = false;

  private eliminationMode: boolean = false; // This will make the race an elimination race

  /**
   * Constructor
   */
  constructor() {
    this.i('Race Object Ready');
    this.racers = [];
  }

  /**
   * returns all racers
   */
  getRacers(): any {
    return this.racers;
  }


  /**
   * Sets up the stamina mode
   * @param mode
   */
  setUpStaminaMode(mode: boolean): void {
    this.takeIntoCountHorseStamina = mode;
  }


  /**
   * Sets up the elimination mode
   * @param elimination
   */
  setUpEliminationMode(elimination: boolean): void {
    this.eliminationMode = elimination;
  }


  /**
   * This will generate every single racer
   * @param numberOfRacers
   */
  generateRacers(numberOfRacers: number = 10) {
    this.numberOfRacers = numberOfRacers;

    this.i('Generating Racers > ' + this.numberOfRacers.toFixed());
    this.i('Horse stamina: ' + this.takeIntoCountHorseStamina.toString());
    for (let i = 0; i < this.numberOfRacers; i++) {
      const aux = new Racer();
      aux.minValue = this.startingValue;
      aux.maxValue = this.endingValue;
      aux.name = (i + 1).toString();
      aux.firstPlaceDisadvantage = this.takeIntoCountHorseStamina;
      this.racers.push(aux);
    }

    /*this.t(this.racers.map((r: any)=>{
      return {
        name: r.name
      }
    }));*/

  }


  /**
   * This will set up the duration of the race
   * @param init
   * @param end
   */
  setDurationParameters(init: number, end: number) {
    this.startingValue = init;
    this.endingValue = end;
  }

  /**
   * This will start the race
   */
  startRace() {
    this.l('Starting Race');
    this.l('Elimination mode ' + this.eliminationMode);
    this.l('Stamina Mode ' + this.takeIntoCountHorseStamina);
    if (this.getRacers().length === 0) {
      this.generateRacers();
    }


    this.RaceResult = new Promise((myResult) => {
      /**
       * Now lets start the timer
       */

      this.timerObject = setInterval(() => {
        this.advanceAllRunners((winner: any) => {
          myResult(winner);
        });
      }, this.timer);


    });

    return this.RaceResult;
  }


  /**
   * This will advance all runners in one single tic
   * but in random order
   */
  advanceAllRunners(haveWinner: any) {
    let listOfRunners = [];
    for (let i = 0; i < this.numberOfRacers; i++) {
      /**
       * We only wnt to shuffle those active ones so we don't
       * over use the process
       */
      if (this.racers[i].isActive() && !this.racers[i].isWinner()) {
        listOfRunners.push(i);
      }
    }

    listOfRunners = this.shuffle(listOfRunners);

    // console.log('List of runners', listOfRunners);

    for (let i = 0; i < listOfRunners.length; i++) {
      // listOfRunners[i];
      try {
        // @ts-ignore
        this.racers[listOfRunners[i]].advance();
      } catch (exception) {
        console.log('Error reading list of runners', listOfRunners[i]);
      }


      /**
       * First We stop the race if all participants are winners
       */

      const notWinners = this.racers.filter((participant: Racer) => {
        return !participant.isWinner() && participant.isActive();
      });


      // this.l('Is this elimination mode?');
      // this.l(this.eliminationMode);


      // @ts-ignore
      if (this.racers[listOfRunners[i]].isWinner()) {

        /**
         * If elimination mode is enabled and there is only one active not winner racer, then we need to reset all racers
         * and "disable" the one that was last.
         */
        const activeRacers = this.racers.filter((r: any) => r.isActive());
        // this.l('Active Racers: ' + activeRacers.length);
        // this.l('Elimination Mode: ' + this.eliminationMode);

        if (this.eliminationMode.toString().toLowerCase() === 'true' && activeRacers.length === 2) {
          this.l('One last racer has won');
          const winner = this.racers[listOfRunners[i]].name;
          this.l('Winner is: ' + winner);
          this.l('Elimination mode' + this.eliminationMode);
          haveWinner(winner);
          clearInterval(this.timerObject);
          return;
        }


        /**
         * I know I shouldn't convert this to string to compare it to "true", but
         * I don't know why it was not working as it should before. This is something I need to dig into
         * and see why it was not working as expected
         */
        if (this.eliminationMode.toString().toLowerCase() === 'true' && notWinners.length === 1) { // If there are only 2 racers, then it is a regular elimination
//
          this.l('Elimination mode active [' + this.eliminationMode + ']. Removing one racer.');

          const lastOne = this.racers.findIndex((r: Racer) => {
            return r.isActive() && !r.isWinner();
          });

          this.racers[lastOne].disableRacer();

          /**
           * We need to disable the last one and reset all of them
           */
          for (let i = 0; i < this.racers.length; i++) {
            // @ts-ignore
            this.racers[i].reset();
          }

        } else if (this.eliminationMode.toString().toLowerCase() === 'false') {
          // this.l('This was not an elimination [' + this.eliminationMode + '] race');
          // this.l('We have a winner!');
          // @ts-ignore
          const winner = this.racers[listOfRunners[i]].name;
          this.l('Winner is: ' + winner);
          this.l('Elimination mode' + this.eliminationMode);
          haveWinner(winner);
          clearInterval(this.timerObject);
          return;

        }
        break;
      }


    }

  }


  /**
   * This will shuffle the runners
   * @param array
   */
  shuffle(array: any): any {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  /**
   * Short for console.log
   * @param t
   */
  l(t: any) {
    if (typeof t === 'string') console.log('[RACE] ' + t);
    else console.log(t);
  }

  /**
   * Short for console.info
   * @param t
   */
  i(t: any) {
    if (typeof t === 'string') console.info('[RACE] ' + t);
    else console.info(t);
  }

  /**
   * Short for console.table
   * @param t
   */
  t(t: any) {
    console.table(t);
  }

}
