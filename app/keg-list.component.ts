import { Component, EventEmitter } from 'angular2/core';
import { KegComponent } from './keg.component';
import { Keg } from './keg.model';
import { EditKegDetailsComponent } from './edit-keg-details.component';
import { NewKegComponent} from './new-keg.component';
// import { DonePipe } from './done.pipe';

@Component ({
  selector: 'keg-list',
  inputs: ['kegList'],
  outputs: ['onKegSelect'],
  // pipes: [],
  directives: [KegComponent, EditKegDetailsComponent, NewKegComponent],
  template: `
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all"></option>
      <option value="lessThan10">Less than 10 pints left</option>
      <option value="moreThan10" selected="selected">Plenty o' Pints</option>
    </select>
    <keg-display *ngFor="#currentKeg of kegList"

    [keg]="currentKeg">
    </keg-display>
    <edit-keg-details *ngIf="selectedKeg" [keg]="selectedKeg">
    </edit-keg-details>
    <new-keg (onSubmitNewKeg)="createKeg($event)"></new-keg>
  `
})
// [class.cheap]="currentKeg.price =< 5"
// [class.fancy]="currentKeg.price > 5"
export class KegListComponent {
  public kegList: Keg[];
  public onKegSelect: EventEmitter<Keg>;
  public selectedKeg: Keg;
  public filterDone: number = 124;
  constructor() {
    this.onKegSelect = new EventEmitter();
  }
  kegClicked(clickedKeg: Keg): void {
    this.selectedKeg = clickedKeg;
    this.onKegSelect.emit(clickedKeg);
  }
  createKeg(createdKeg: Keg): void {
    this.kegList.push(createdKeg);
  }
  onChange(filterOption){
    this.filterDone = filterOption;
  }
}
