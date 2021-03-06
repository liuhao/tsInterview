import applyMixins from "./exercise.js"

class genericClass<T> {
    private val: T;
    setVal(val: T) {
        this.val = val;
    }
    getVal(): T {
        return this.val;
    }
}

let element1 = new genericClass<Element>();
let element2 = new genericClass<HTMLElement>();
let element3 = new genericClass<Element>();

element1.setVal(document.createElement('div'));
element2.setVal(document.createElement('div'));
element3.setVal(document.createElement('div'));

let elementArray = [
    element1.getVal(),
    element2.getVal(),
    element3.getVal(),
];

function isHTMLElement(x: any): x is HTMLElement {
    return x.style !== undefined;
}

function convertElement(elem: Element | HTMLElement): HTMLElement {
    if(!isHTMLElement(elem)) {
        return <HTMLElement>elem;
    } else {
        return elem;
    }
}

function standardizeElements(elemArray: Array<any>): Array<HTMLElement> {
    for(let elem of elemArray) {
        elem = convertElement(elem);
    }
    return elemArray;
}

class Rotater {
    rotate(elem: HTMLElement) {
        elem.style.transform = "rotate(-315deg)";
    }
    rotateBack(elem: HTMLElement) {
        elem.style.transform = "";
    }
}

class Mover {
    move(elem: HTMLElement) {
        elem.style.transform = "translateX(50px)"
    }
    moveBack(elem: HTMLElement) {
        elem.style.transform = "";
    }
}

class movingElement implements Rotater, Mover {
    rotate: (elem: HTMLElement) => any;
    move: (elem: HTMLElement) => any;
    moveBack: (elem: HTMLElement) => any;
    rotateBack: (elem: HTMLElement) => any;
    element: HTMLElement;

    constructor(elem: HTMLElement) {
        elem.onmousedown = () => {
            this.move(elem);
        }
        elem.onmouseup = () => {
            this.moveBack(elem);
        }
        elem.onmouseover = () => {
            this.rotate(elem);
        }
        elem.onmouseout = () => {
            this.rotateBack(elem);
        }
        this.element = elem;
    }
}

applyMixins(movingElement, [Mover, Rotater]);

for(let elem of standardizeElements(elementArray)) {
    elem.style.width = "60px";
    elem.style.height = "60px";
    elem.style.backgroundColor = "green";
    elem.style.margin = "5px";
    let elemClass = new movingElement(elem);
    document.body.appendChild(elemClass.element);
}