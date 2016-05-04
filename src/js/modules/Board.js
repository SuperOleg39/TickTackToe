'use strict!';

import { Cell } from './Cell'

export class Board {

	constructor( limit ) {
		this.cells = [];
		this.node  = {};
		this.limit = limit;

		this.initNode();
	}

	initCells() {
		let position = {};

		for ( let i = 0; i < this.limit; i++ ) {
			position.x = i;
			for ( let j = 0; j < this.limit; j++ ) {
				position.y = j;

				const cell = new Cell( position, this.limit );

				this.cells.push( cell );
			}
		}
	}

	initNode() {
		let node = document.createElement('div');
		node.className = 'board';

		this.initCells();

		for ( let i = 0; i < this.cells.length; i++ ) {
			node.appendChild( this.cells[i].node )
		}

		this.node = node;
	}

}
