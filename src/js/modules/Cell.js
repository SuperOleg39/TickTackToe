'use strict!';

export class Cell {

	constructor( position, limit, id ) {
		this.item  = 'empty';
		this.node  = {};
		this.x 		 = position.x;
		this.y 		 = position.y;
		this.id 	 = id;
		this.limit = limit;

		this.initNode();
	}

	initNode() {
		let node = document.createElement('div');

		node.className   = 'cell';
		node.style.width = 100 / this.limit + '%';

		this.node = node;
	}

}
