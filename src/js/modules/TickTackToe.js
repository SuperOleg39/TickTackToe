'use strict!';

import { Item }  		from './Item'
import { Board } 		from './Board'
import { MainMenu } from './MainMenu'

export class TickTackToe {

	constructor( limit ) {
		this.items = [];
		this.types = [ 'noughts', 'toe' ];
		this.turn  = 'noughts';
		this.limit = limit;
		this.board = new Board( this.limit );
		this.mainMenu = new MainMenu( 'main-menu', 'open-menu' );
		this.maxItemOneType = Math.ceil( this.limit * this.limit / 2 );

		this.initGame();
	}

	initGame() {
		document.body.appendChild( this.board.node );

		this.addEventsToCells();
		this.createMainMenu();
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
		let count  	  = 0;
		let winstreak = {
			x 		: [],
			y 		: [],
			diagX : [],
			diagY : []
		};

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

		for ( let i = 0, k = this.limit - 1; i < this.limit; i++, k-- ) {
			winstreak.x = [];
			winstreak.y = [];
			winstreak.diagX.push( result[i][i] );
			winstreak.diagY.push( result[k][i] );

			for ( let j = 0; j < this.limit; j++ ) {
				winstreak.x.push( result[i][j] );
				winstreak.y.push( result[j][i] );

				if ( winstreak.x.every( isNoughtsOrToe ) && winstreak.x.length === this.limit
					 || winstreak.y.every( isNoughtsOrToe ) && winstreak.y.length === this.limit
	 				 || winstreak.diagX.every( isNoughtsOrToe ) && winstreak.diagX.length === this.limit
	 				 || winstreak.diagY.every( isNoughtsOrToe ) && winstreak.diagY.length === this.limit )
				{
					return true;
				}
			}
		}

		return false;
	}

	createMainMenu() {
		console.log(this.mainMenu)
		this.mainMenu.addActionToMenu('Новая игра', this.resetGame.bind(this));
	}
}
