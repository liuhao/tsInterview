import DieRoller from "./DieRollerModule.js"

const DIE_NUMBER: number = 4;

let DieSet: Array<DieRoller> = [];
for(let i = 0; i < DIE_NUMBER; i++) {
    DieSet.push(new DieRoller(50, 5));
}

DieSet.map((element: DieRoller) => {
    document.body.appendChild(element.div);
})

let btn: Element = document.createElement('button');
btn.textContent = "Change Color";

(btn as HTMLElement).onclick = () => {
    DieSet.map((element:DieRoller) => {
        element.roll();
    });
}
document.body.appendChild(btn);
