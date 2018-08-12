import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss'],
})
export class HomeSectionComponent implements OnInit {

  public intermediate: number;
  constructor() { }


  ngOnInit() {

  }

  onCountoEnd() {
    console.log("countEnd");
  }

  onCountToChange($event) {
    this.intermediate = $event;
  }


}
