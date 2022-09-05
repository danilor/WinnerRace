import {Component, Input, OnInit} from '@angular/core';
import {Racer} from "../../classes/racer";

@Component({
  selector: 'app-single-racer',
  templateUrl: './single-racer.component.html',
  styleUrls: ['./single-racer.component.css']
})
export class SingleRacerComponent implements OnInit {

  @Input() racer: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * This will return the racer object as percent
   */
  getRacerPercent(){
    return Math.floor(this.racer.getPercent())
  }



}
