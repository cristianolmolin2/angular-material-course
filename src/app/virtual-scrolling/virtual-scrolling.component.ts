import { Component } from '@angular/core';

@Component({
  selector: 'app-virtual-scrolling',
  templateUrl: './virtual-scrolling.component.html',
  styleUrls: ['./virtual-scrolling.component.scss']
})
export class VirtualScrollingComponent {

  items = Array.from({ length: 100 }).map((value, i) => `Item #${i}`);

}
