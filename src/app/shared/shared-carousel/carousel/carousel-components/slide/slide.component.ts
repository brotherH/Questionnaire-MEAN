import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'carousel-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  @Input() public src: string;
  @Input() public isHidden: boolean;
  @Input() public slideNo: number;



  constructor() { }

  ngOnInit() {
  }

}
