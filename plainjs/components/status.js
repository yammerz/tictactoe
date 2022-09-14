import Element from './element.js';

export default class Status extends Element {
	constructor(props={}){
		super({type:'div'});
		this.element.className = 'status';
		this.element.value = props.value;
		this.element.textContent = props.value;
	}

}