import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.css']
})
export class WinnerModalComponent implements OnInit {

  @Input() winner: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
