import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from 'angular2/core';
import {NgClass} from 'angular2/common';


// <div class="tile" [class.mine]="tile.get('isMine')" (click)="handleTileClick(tile)">
//   <div class="lid" *ng-if="!tile.get('isRevealed')"></div>
//   <div *ng-if="tile.get('isRevealed') && !tile.get('isMine')">
//     {{ tile.get('threatCount') > 0 ? tile.get('threatCount') : '' }}
//   </div>
// </div>

@Component({
    selector: 'immutable-single-tile',
    template: `
    <div class="singleTile" *ngIf="!tile.isRevealed">
        <div  *ngFor="#item of tile.get('tilePattern')" >

            <div *ngFor="#itemX of item">
                <div [ngClass]="{'tilePatternWhite': itemX, 'tilePatternBlack': !itemX}" >
                    {{itemX}}
                </div>
            </div>

        </div>
    </div>
  `,
    directives: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImmutableSingleTile {
    @Input() tile: any;
    // @Output() tileClick: EventEmitter<ITile> = new EventEmitter();

  //  onChanges(changes: any) {
  //    if (changes.tile) {
  //      console.log('Tile %s changed', this.tile.id);
  //    }
  //  }

  //  handleTileClick(tile: any) {
  //   this.tileClick.next(tile);
  //   console.log('Tile %s changed', tile.id);
  //  }
}
