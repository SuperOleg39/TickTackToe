'use strict!';

import { Item } from './Item'
import { Board } from './Board'

export class TickTackToe {

	constructor( limit ) {
		this.items = [];
		this.types = [ 'noughts', 'toe' ];
		this.turn  = 'noughts';
		this.limit = limit;
		this.board = new Board( this.limit );
		this.maxItemOneType = Math.ceil( this.limit * this.limit / 2 );

		this.initGame();
	}

	initGame() {
		document.body.appendChild( this.board.node );

		this.addEventsToCells();
	}

	changeTurn() {
		if ( this.checkGameStatus( this.turn ) ) {
			alert( `${this.turn} win!` );
			this.resetGame();
		} else {
			if ( this.turn === 'noughts' ) {
				this.turn = 'toe';
			} else {
				this.turn = 'noughts';
			}
		}
	}

	addEventsToCells() {
		const self = this;

		this.board.cells.forEach(function( item, i ) {
			let position = { x : item.x, y : item.y };

			item.node.addEventListener( "click" , function() {
				if ( !this.classList.contains( self.turn )
					 && item.item === 'empty' )
				{
					item.item = self.turn;
					this.classList.add( self.turn )
					self.addItem( position )
				}
			});
		});
	}

	addItem( position ) {
		if ( this.getItemCount( this.turn ) < this.maxItemOneType ) {
			const item = new Item( this.turn, position.x, position.y );

			this.items.push( item );
			this.changeTurn();

			if ( this.items.length === this.limit * this.limit ) {
				alert( 'Draw!' )
				this.resetGame();
			}
		}
	}

	getItemCount( type ) {
		let count = 0;

		this.items.forEach(function( item , i ) {
			if ( item.type === type ) {
				count++;
			}
		});

		return count;
	}

	resetGame() {
		this.items = [];

		this.board.cells.forEach(function( item, i ) {
			item.item = 'empty';
			item.node.className = 'cell';
		});
	}

	checkGameStatus( type ) {
		let result    = [];
		let winstreak = [];
		let count  	  = 0;

		for ( let i = 0; i < this.limit; i++ ) {
			result[i] = [];

			for ( let j = 0; j < this.limit; j++ ) {
				result[i].push( this.board.cells[ count ] );
				count++;
			}
		}

		function isNoughtsOrToe( element, index, array ) {
  		return element.item === type;
		}

		for ( let i = 0; i < this.limit; i++ ) {
			winstreak = [];

			for ( let j = 0; j < this.limit; j++ ) {
				winstreak.push( result[i][j] );

				if ( winstreak.every( isNoughtsOrToe )
					 && winstreak.length === this.limit )
				{
					return true;
				}
			}
		}

		for ( let i = 0; i < this.limit; i++ ) {
			winstreak = [ ];
			for ( let j = 0; j < this.limit; j++ ) {
				winstreak.push( result[j][i] );

				if ( winstreak.every( isNoughtsOrToe )
					 && winstreak.length === this.limit )
				{
					return true;
				}
			}
		}

		winstreak = [ ];
		for ( let i = 0; i < this.limit; i++ ) {
			winstreak.push( result[i][i] );

			if ( winstreak.every( isNoughtsOrToe )
				 && winstreak.length === this.limit )
			{
				return true;
			}
		}

		winstreak = [ ];
		for ( let i = this.limit - 1, j = 0; i >= 0; i--, j++ ) {
			winstreak.push( result[i][j] );

			if ( winstreak.every( isNoughtsOrToe )
				 && winstreak.length === this.limit )
			{
				return true;
			}
		}

		return false;
	}

}
