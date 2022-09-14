export default class Container {
	constructor(props = {}) {
		//remember use self=this with callbacks
		const self = this;
		// Store the HTML element to attach the render to if set
		if(Object.hasOwn(props, 'element')) {
			self.element = props.element;
		}
	}
}