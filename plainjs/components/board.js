import Element from './element.js';
import Button from './button.js';

export default class Board extends Element {

	constructor(props){
		super({type:'div'});
		this.element.className = 'board';
		this.props = props;
		this.squares = [];
	}



	/**
	 * Render a square instance button element.
	 * @param {*} i
	 * @returns a button element as a tic tac toe square
	 * @memberof Board
	 */
	renderSquare(i){

		const self = this;

		if(this.squares[i]===undefined){

			const square = new Button({
				id:i, 
				value:null, 
				onClick: () => self.props.onClick(i)
			});
			
			this.squares.push(square.render());

		}

		let square = this.squares[i];
        
		square.className = 'square';
		square.textContent = this.props.squares[i];
        
		return square;
	}



	/**
	 * Render the board with the 9 square grid.
	 *
	 * @returns element
	 * @memberof Board
	 */
	render(){

		const squares = this.props.squares;

		squares.forEach((v,i)=>{
			this.element.insertAdjacentElement('beforeend', this.renderSquare(i));
		});

		return this.element;
	}


}