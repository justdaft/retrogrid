import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
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
    <div class="singleTile">
        <div  *ngFor="#item of tile.pattern" >
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

export class SingleTile {
    @Input() tile: ITile;
}
