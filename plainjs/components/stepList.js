import Element from './element.js';
import Button from './button.js';


/**
 * We need a custom li element, so we'll
 * make it a class of it's own.
 */
class Step extends Element {
	constructor(props){
		super({type:'li'});
		this.element.setAttribute('key', props.move);
		this.element.insertAdjacentElement('afterbegin', props.button.render());
	}
}

export default class StepList extends Element {

	constructor(){
		super({type:'ol'});
		this.element.className = 'stepList';
	}

	update(props){

		this.element.innerHTML = '';

		props.history.forEach((unused, move)=>{
			const value = move ? 
				'Go to move #' + move :
				'Go to game start';
				
			const onClick = (move)=>props.onClick(move);
			const button = new Button({ value, move, onClick });
			const li = new Step({ value, move, button });

			if(!this.element.querySelector(`[key="${move}"]`)){
				this.element.insertAdjacentElement('beforeend', li.render());
			}
		});
	}
}