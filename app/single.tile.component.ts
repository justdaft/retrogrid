import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core';
import {NgClass} from 'angular2/common';

interface ITile {
  id?: number;
  isRevealed?: boolean;
  isMatched?: boolean;
  pattern?: any;
}


@Component({
    selector: 'single-tile',
    template: `
    <div class="singleTile" *ngIf="!tile.isRevealed">
        <div  *ngFor="#item of tile.pattern" (click)="handleTileClick(tile)">
        <div >
            <div *ngFor="#itemX of item">
                <div [ngClass]="{'tilePatternWhite': itemX, 'tilePatternBlack': !itemX}" >
                    {{itemX}}
                </div>
            </div>
        </div>
        </div>
    </div>
  `,
    directives: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SingleTile {
    @Input() tile: ITile;
    @Output() tileClick: EventEmitter<ITile> = new EventEmitter();

   onChanges(changes: any) {
     if (changes.tile) {
       console.log('Tile %s changed', this.tile.id);
     }
   }
   handleTileClick(tile: ITile) {
    this.tileClick.next(tile);
    console.log('Tile %s changed', tile.id);
   }
}
