import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';

@Component({
  selector: 'app-led7-display',
  templateUrl: './led7-display.component.html',
  styleUrls: ['./led7-display.component.css']
})
export class Led7DisplayComponent implements OnInit {

  @Input() number = 0;
  @Input() version: string = 'normal';
  @Input() racerLabel: string = 'Racers';

  constructor() {
  }

  ngOnInit(): void {
  }


}
