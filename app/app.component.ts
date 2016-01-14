import {Component, enableProdMode} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {SingleTile} from './single.tile.component';
import uuid from 'node-uuid';

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
    <single-tile *ngFor='#tile of getTiles()' [tile]='tile' (tile-click)='handleTileClick($event)'></single-tile>
  </div>
  `,
  directives: [NgClass, SingleTile]
})

export class AppComponent {
    tileObject: ITile;
    tileX: any;
    tile: ITile;
    _tiles: Array<any> = [];
    public game: any;

    getTiles() {
      return this._tiles;
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
            this.tile = this.createTiles();
            this._tiles = this.createGameTiles(32);
        }
    }

    onInit() {
        //  this.startNewGame();
        // this.tileX = createSingleTile();
        if (this.createTiles()) {
            this.tile = this.createTiles();
          //  this._tiles = this.createGameTiles(2);
        }

    }

    shuffleTile(o) {
        for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    createTile() {
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
        let _tile: ITile = {
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

    // startNewGame() {
    //     // this.game = createGame({cols: 16, rows: 16, mines: 48});
    // }
}
