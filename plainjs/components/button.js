import Element from "./element.js";

export default class Button extends Element {
	constructor(props){
		super({type:'button'});
		this.element.textContent = props.value;

		if(Object.hasOwn(props, 'id')){
		this.element.id = props.id;
		}
        if(Object.hasOwn(props, 'onClick')){
            this.element.onclick = () => props.onClick(props.move);
        }
	}
}
