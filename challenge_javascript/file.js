const totalBalls = document.querySelector('#num_obj');
const textQuantity = document.querySelector("#text_quantity");
const sizeBalls = document.querySelector("#size");
const buttonAdd = document.querySelector("#btn_add");
const buttonRemove = document.querySelector("#btn_remove");
const container = document.querySelector("#container");

let widthContainer = container.offsetWidth;
let heightContainer = container.offsetHeight;
let balls = [];
let numberBalls = 0;

class Balls {
    constructor(arrayBalls, container, size) {
        this.arrayBalls = arrayBalls;
        this.container = container;
        this.id = Date.now() + '_' + Math.floor(Math.random() * 1000000000000000);
        this.size = Math.floor(Math.random() * size) + 10;
        this.colorR = Math.floor(Math.random() * 255);
        this.colorG = Math.floor(Math.random() * 255);
        this.colorB = Math.floor(Math.random() * 255);
        this.positionX = Math.floor(Math.random() * (widthContainer - this.size));
        this.positionY = Math.floor(Math.random() * (heightContainer - this.size));
        this.speedX = Math.floor(Math.random() * 2) + 0.5;
        this.speedY = Math.floor(Math.random() * 2) + 0.5;
        this.directionX = Math.floor(Math.random() * 10) > 5 ? 1 : -1;
        this.directionY = Math.floor(Math.random() * 2) > 5 ? 1 : -1;
        this.toCreateBall();
        this.myBall = document.getElementById(this.id);
        this.control = setInterval(this.toControl, 10);
        numberBalls++;
        totalBalls.innerHTML = numberBalls;
    }

    toAddMyPos = () => {
        return this.arrayBalls.indexOf(this);
    }

    toRemove = () => {
        clearInterval(this.control);
        this.balls = balls.filter((b) => {
            if (b.id != this.id) {
                return b;
            }
        });

        this.myBall.remove();
        numberBalls--;
        totalBalls.innerHTML = numberBalls;
    }

    toControlBorder = () => {
        if (this.positionX + this.size >= widthContainer) {
            this.directionX = -1;
        } else if (this.positionX <= 0) {
            this.directionX = 1;
        }
        if (this.positionY + this.size >= heightContainer) {
            this.directionY = -1;
        } else if (this.positionY <= 0) {
            this.directionY = 1;
        }
    }

    toControl = () => {
        this.toControlBorder();
        this.positionX += (this.directionX * this.speedX);
        this.positionY += (this.directionY * this.speedY);
        this.myBall.setAttribute('style',
            `left:${this.positionX}px; 
             top:${this.positionY}px; 
             width:${this.size}px; 
             height:${this.size}px; 
             background-color: rgb(${this.colorR},${this.colorG},${this.colorB})`
        );

        if ((this.positionX > widthContainer) || (this.positionY > heightContainer)) {
            this.toRemove();
        }
    }

    toCreateBall = () => {
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'balls');
        div.setAttribute('style',
            `left:${this.positionX}px; 
             top:${this.positionY}px; 
             width:${this.size}px; 
             height:${this.size}px; 
             background-color: rgb(${this.colorR},${this.colorG},${this.colorB})`
        );

        this.container.appendChild(div);
    }
}

window.addEventListener('resize', (event) => {
    widthContainer = container.offsetWidth;
    heightContainer = container.offsetHeight;
});

buttonAdd.addEventListener('click', (event) => {
    const quantity = textQuantity.value;
    const size = sizeBalls.value;
    const totalBalls = numberBalls;

    const check = toCanAdd(quantity, size, totalBalls);

    if (!check) return;
    
    for (let i = 0; i < quantity; i++) {
        balls.push(new Balls(balls, container, size));
    }
});

buttonRemove.addEventListener('click', (event) => {
    balls.map(b => {
        b.toRemove();
    })
});

function toCanAdd(quantity, size, totalBalls) {
    if (totalBalls > 10000) {
        window.alert(`O container aceita apenas  ${totalBalls} bolinhas.`);
        return false;
    }

    if (quantity > 3000) {
        window.alert('Número de bolinhas não deve ser maior que 3000.');
        return false;
    }

    if (quantity < 0) {
        window.alert('Número de bolinhas deve ser maior que 0.');
        return false;
    }

    if (size > 200) {
        window.alert('Tamanho não deve ser maior que 200.');
        return false;
    }

    if (size < 0) {
        window.alert('Tamanho não deve ser maior que -20.');
        return false;
    }

    return true;
}