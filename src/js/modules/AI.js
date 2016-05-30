'use strict!';

export class AI {
  constructor(limit) {
    this.limit = limit;
  }

  getState(state) {
    this.state = state;
    console.log(this.state)
  }

  getAction(action) {
    this.action = action;

    this.randomTurn();
  }

  randomTurn() {
    let position = { x: 0, y: 0 };
    let index    = 0;
    let positionArr = [];

    for ( let i = 0, k = this.limit - 1; i < this.limit; i++, k-- ) {
			for ( let j = 0; j < this.limit; j++ ) {
        if (this.state[i][j].item === 'empty') {
          positionArr.push({
            x     : this.state[i][j].x,
            y     : this.state[i][j].y,
            index : this.state[i][j].id
          });
        }
			}
		}

    const randomCell = positionArr[Math.floor(Math.random()*positionArr.length)];

    position.x = randomCell.x;
    position.y = randomCell.y;
    index      = randomCell.index;

    console.log(positionArr, position)

    this.returnAction(position, index);
  }

  returnAction(...data) {
    this.action(...data);
  }
}
