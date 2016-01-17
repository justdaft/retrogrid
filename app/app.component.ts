import {Component, enableProdMode} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {SingleTile} from './single.tile.component';
import {ImmutableSingleTile} from './immutableSingleTile';
import uuid from 'node-uuid';
import {createGame} from './game';

interface ITile {
  id?: number;
  isRevealed?: boolean;
  isMatched?: boolean;
  pattern?: any;
}


enableProdMode();

@Component({
  selector: 'app',
  template: `
  <div class='tileBoard'>
    <single-tile *ngFor='#tile of getTiles()' [tile]='tile' ></single-tile>
  </div>

  <div class='tileBoard'>
    <immutable-single-tile *ngFor='#tile of getImmutableTiles()'
    [tile]='tile' ></immutable-single-tile>
  </div>
  `,
  directives: [NgClass, SingleTile, ImmutableSingleTile]
})

export class AppComponent {
    tileObject: any;
    tileX: any;
    tile: any;
    _tiles: Array<any> = [];
    game: any;

    getTiles() {
      return this._tiles;
    }

    getImmutableTiles() {
      return this.game ? this.game.get('tiles') : [];
    }

    createGameTiles(numberOfUniqueTiles: number) {
        let _tilesArray: Array<any> = [];
        for (let i = 1; i <= numberOfUniqueTiles; i++) {
            let tmp = this.createTileObject();
            _tilesArray.push(tmp);
            _tilesArray.push(tmp);
        }
        let copyOfBaseTiles = _tilesArray;
        let newTiles = this.shuffleTile(copyOfBaseTiles);
        console.log('createGameTiles', newTiles);
        return newTiles;
    }



    constructor() {
        if (this.createTiles()) {
          //  this.tile = this.createTiles();
         this._tiles = this.createGameTiles(32);
         this.game = createGame({cols: 8, rows: 8 });
         console.log('constructor', this.game);
        }

    }

    onInit() {

    }

    shuffleTile(o) {
        for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    createTile() {
// 0
// 24
// 36
// 60
// 66
// 90
// 102
// 126
// 129
// 153
// 165
// 189
// 195
// 219
// 231
// 255


 // let validNumberPool =   [0, 24, 36, 60, 66, 90, 102, 126, 129, 153, 165, 189, 195, 219, 231, 255];

        let baseTile = [
            [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0], [0, 1, 0, 1, 1, 0, 1, 0], [0, 1, 1, 0, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]
        ];
        let copyOfBaseTile = baseTile;
        let newTile = this.shuffleTile(copyOfBaseTile);
        return newTile.slice(0, 8);
    };

    createTileObject() {
        let _tile: any = {
          id:  uuid.v4(),
          isRevealed: false,
          isMatched: false,
          pattern: this.createTile()
        };
        return _tile;
    };



    createTiles() {
        let tiles = this.createTile();
        return tiles;
    };

    startNewGame() {
      this.game = createGame({cols: 8, rows: 8 });
    }
}
