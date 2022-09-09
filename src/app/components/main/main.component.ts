import {Component, OnInit} from '@angular/core';
import {Race} from "../../classes/race";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public availableRacersOptions: any[] = [];
  public numberOfRacers: number = 10; // The amount of racers
  public numberOfSteps: number = 1000;

  public horseStamina = true;

  public eliminationMode = true;

  private race: any = null;

  public raceInProgress = false;

  public availableNumberOfSteps = [
    100, 500, 750, 1000, 1500, 2000, 2500, 5000, 10000
  ];


  private timeBeforeCelebration = 800; // In milliseconds

  public lastWinner = '';

  constructor() {
  }

  ngOnInit(): void {
    this.availableRacersOptions = this.getAvailableRacerOptions();
    this.buildRace();

  }


  /**
   * It builds the Race object
   */
  buildRace(): void {
    this.race = new Race();
    this.race.setDurationParameters(0, this.numberOfSteps);
    this.race.setUpStaminaMode(this.horseStamina);
    this.race.setUpEliminationMode(this.eliminationMode);
    this.race.generateRacers(parseInt(this.numberOfRacers.toString()));
  }

  /**
   * This will return an array with all the available options for racers
   */
  getAvailableRacerOptions() {
    const min = 2;
    const max = 40;
    const auxList = [];
    for (let i = 2; i <= max; i++) {
      auxList.push(i);
    }
    return auxList;
  }


  /**
   * returns all racers
   */
  getAllRacers(): any[] {
    if (this.race === null) {
      return [];
    }
    return this.race.getRacers();
  }


  startRace() {
    this.race.startRace().then((winner: any) => {
      setTimeout(() => {
        eval('startConfetti()');
        this.lastWinner = winner;
      }, this.timeBeforeCelebration);
    });
    this.raceInProgress = true;
  }


}
