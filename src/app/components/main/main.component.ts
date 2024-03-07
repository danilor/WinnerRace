import {Component, OnInit} from '@angular/core';
import {Race} from "../../classes/race";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public availableRacersOptions: any[] = [];
  public numberOfRacers: number = 20; // The amount of racers
  public numberOfSteps: number = 500;
  public milliseconds: number = 1500;

  public editingRacers: boolean = false;
  public racers: any = [];
  public racersModifiableList: string = '';

  public horseStamina = true;

  public eliminationMode = true;

  private race: Race | null = null;

  public raceInProgress = false;

  public availableNumberOfSteps = [
    100, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000, 2500, 5000, 10000
  ];

  public availableMillisecondsOptions: any[] = [
    {
      label: '0.5 seconds',
      value: 500
    },
    {
      label: '1.0 second',
      value: 1000
    },
    {
      label: '1.5 seconds',
      value: 1500
    },
    {
      label: '2.0 seconds',
      value: 2000
    },
    {
      label: '2.5 seconds',
      value: 2500
    }
  ]


  private timeBeforeCelebration = 800; // In milliseconds

  public lastWinner = '';

  constructor() {
  }

  ngOnInit(): void {
    this.availableRacersOptions = this.getAvailableRacerOptions();
    this.generateRacers();
    this.buildRace();

  }

  /**
   * This will generate all racers
   */
  generateRacers(): void {
    console.log('Generating Racers');
    this.racers = [];
    for (let i = 1; i <= this.numberOfRacers; i++) {
      this.racers.push('Racer ' + i);
    }
  }


  /**
   * It builds the Race object
   */
  buildRace(): void {
    this.race = new Race();
    this.race.setDurationParameters(0, this.numberOfSteps);
    this.race.setUpStaminaMode(this.horseStamina);
    this.race.setUpEliminationMode(this.eliminationMode);
    this.race.setIntervalPause(this.milliseconds);
    this.race.generateRacers(parseInt(this.racers.length.toString()), this.racers);

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
    this.race!.startRace().then((winner: any) => {
      setTimeout(() => {
        eval('startConfetti()');
        this.lastWinner = winner;
      }, this.timeBeforeCelebration);
    });
    this.raceInProgress = true;
    return;
  }

  editRacers(): void {
    this.editingRacers = true;
    this.racersModifiableList = this.racers.join('\n');
    return;
  }

  cancelEditRacers(): void {
    this.editingRacers = false;
    return;
  }

  saveEditRacers(): void {
    this.editingRacers = false;
    this.racers = this.racersModifiableList.split('\n').filter((r: string) => r !== '');
    this.buildRace();
    return;
  }


  /**
   * It will return the racer number
   * @param number
   */
  getRacerNameByNumber(number: string): string {
    return this.racers[parseInt(number.toString(), 10)];
  }

  getLastWinnerNumber(modifier: number){
    return parseInt(this.lastWinner,10) + modifier;
  }

}
