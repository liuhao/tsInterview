enum Values {
    One,
    Two,
    Three,
    Four,
    Five,
    Six
}

enum DieColors {
    Red,
    Blue,
    Yellow,
    Green,
    Brown,
    Orange
}

class Die {
    div: Element;
    value: Values;

    constructor(size: number, border: number) {
        this.value = Values.One;
        this.div = document.createElement('div');
        (this.div as HTMLElement).style.width = `${ size }px`;
        (this.div as HTMLElement).style.height = `${ size }px`;
        (this.div as HTMLElement).style.backgroundColor = DieColors[this.value];
        (this.div as HTMLElement).style.borderStyle = 'solid';
        (this.div as HTMLElement).style.borderWidth = `${ border }px`;
        (this.div as HTMLElement).textContent = Values[this.value];
    }
}

async function getRandomIntInclusive() {
    let response = await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8');
    let result = await response.json();
    return result.data[0] % 6;
}

export default class DieRoller extends Die implements Roll{
    constructor(size: number, border: number) {
        super(size, border);
    }

    async roll(): Promise<boolean> {
        this.value = await getRandomIntInclusive();
        (this.div as HTMLElement).textContent = Values[this.value];
        (this.div as HTMLElement).style.backgroundColor = DieColors[this.value];
        return true;
    }
}

interface Roll {
    roll(): Promise<boolean>;
}