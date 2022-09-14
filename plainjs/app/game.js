import Container from '../components/container.js';
import Board from '../components/board.js';
import Status from '../components/status.js';
import StepList from '../components/stepList.js';

import State from 'https://cdn.jsdelivr.net/gh/yammerz/state@master/state.js';
//import State from '../state/state.js';
import { getPlayer, calculateWinner} from './helpers.js';

export default class Game extends Container {
	constructor(){
		super({
			element: document.querySelector('#container')
		});

		this.state = new State();
		this.board = null;
		this.statusDiv = null;
		this.stepList = null;
		this.winner = null;
	
		if(this.state instanceof State){
			//set the initial state with 
			this.state.setState({
				history: [{squares: Array(9).fill(null)}], 
				nextPlayer: null, 
				stepNumber: 0
			});

			console.log(this.state.getStateKey('test'));

		}

	}

	/**
	 * Handles the onclick of each square. 
	 * Calls the state.setState method with data
	 * 
	 * @param {*} i
	 * @memberof Game
	 */
	handleClick(i){

		console.time('handleClick');

		const currentState = this.state.getState();

		const history = currentState['history'].slice(0, currentState['stepNumber'] + 1);
		const current = history[history.length - 1];

		//copy of squares array
		const squares = current.squares.slice();
		
		const player = getPlayer(this.state);

		//there is never a winner on first click,
		//so winner can be defined below as needed.
		if(this.winner || squares[i]){
			return;
		} 

		squares[i] = player;

		this.winner = calculateWinner(squares);

		//update the state squares and nextplayer
		//only the key that has changed is set

		this.state.setState({
			history:  history.concat([{squares: squares}]), 
			nextPlayer: player,
			stepNumber: history.length
		});

		//update the Board
		this.update();

		console.timeEnd('handleClick');
	}

	jumpTo(step){
		
		this.state.setState({
			stepNumber: step,
			nextPlayer: (step % 2) === 0 ? 'O' : 'X'
		});

		this.update();
	}

	render(){

		this.element.insertAdjacentElement('beforeend', this.renderBoard());
		

		this.element.insertAdjacentElement('beforeend', this.renderStatus());


		this.element.insertAdjacentElement('beforeend', this.renderSteps());
		
	}

	renderBoard(){

		const currentState = this.state.getState();

		const history = currentState['history'];

		const stepNumber = currentState['stepNumber'];

		const gameStatus = history[stepNumber];
		
		const props = { squares: gameStatus.squares, onClick: (i)=>this.handleClick(i) };

		if(!this.board){
			this.board = new Board(props);
		}
		else{
			this.board.props = props;
		}


		
		return this.board.render();


	}

	renderStatus(){

		let nextPlayer = 'Next player: ' +  getPlayer(this.state);


		if(this.winner){
			nextPlayer = 'Winner: ' + this.winner;
		}
		
		if(!this.statusDiv){
			this.statusDiv = new Status({value: null});
		}

		this.statusDiv.element.textContent = nextPlayer;

		return this.statusDiv.render();

	}

	renderSteps(){

		const history = this.state.getStateKey('history');
		const props = { history: history, onClick: (step)=> this.jumpTo(step) };

		if(!this.stepList){
			this.stepList = new StepList();
		}


		this.stepList.update(props);

		return this.stepList.render();
		
	}

	update(){

		console.time('render');

		//update the board
		this.renderBoard();

		//update the status: Next player ...
		this.renderStatus();

		//update the step history
		this.renderSteps();

		console.timeEnd('render');


	}


}

