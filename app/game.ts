// credits to Christian Johansen for game logic:
// https://github.com/cjohansen/react-sweeper

let {List, Map, fromJS, Repeat} = Immutable;
import {repeat, shuffle, shuffleTiles} from './util';
import uuid from 'node-uuid';



interface ITile {
  id?: number;
  isRevealed?: boolean;
  isMatched?: boolean;
  pattern?: any;
}



function initTiles(rows: number, cols: number) {
        let numberOfUniqueTiles = rows * cols;
        let _list = Immutable.fromJS(createTiles(32));
        console.log('initTiles', _list);
        return _list;
        };

function createFreshTiles() {

  return
}

function createTileMap() {
    let _tile: ITile = {
      id:  uuid.v4(),
      isRevealed: false,
      isMatched: false,
      pattern: createTilePattern()
    };
    return _tile;
};
function createTiles(numberOfUniqueTiles: number) {
    let _tilesArray: Array<any> = [];
    for (let i = 1; i <= numberOfUniqueTiles; i++) {
        let tmp = createTileObject();
        _tilesArray.push(tmp);
        _tilesArray.push(tmp);
    }
    let copyOfBaseTiles = _tilesArray;
    let newTiles = shuffleTiles(copyOfBaseTiles);
    console.log('createNewCharacter: ', createNewCharacter());
    return newTiles;
}

function createTileObject() {
    let _tile: ITile = {
      id:  uuid.v4(),
      isRevealed: false,
      isMatched: false,
      pattern: createTilePattern()
    };
    return _tile;
};

function createNewCharacter() {
  let validNumberPool = List.of(0, 24, 36, 60, 66, 90, 102, 126, 129, 153, 165, 189, 195, 219, 231, 255);
  return  shuffle(validNumberPool).slice(0, 8);
};

function createTilePattern() {
    let baseTile = [
        [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0], [0, 1, 0, 1, 1, 0, 1, 0], [0, 1, 1, 0, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 1, 0, 0, 1], [1, 0, 1, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 1, 1], [1, 1, 0, 1, 1, 0, 1, 1], [1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]
    ];
    let copyOfBaseTile = baseTile;
    let newTile = shuffleTiles(copyOfBaseTile);
    return newTile.slice(0, 8);
};


export function createGame(options: any) {
  return fromJS({
    cols: options.cols,
    rows: options.rows,
    playingTime: 0,
    tiles: initTiles(options.rows, options.cols)
  });

}
