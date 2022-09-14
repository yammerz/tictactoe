export default class Element {

	constructor(props={}){

		// The type of html element
		if(Object.hasOwn(props, 'type')) {
			this.element = document.createElement(props.type);
		}
	}
	render(){
		return this.element;
	}

}








