const win = {
    width: 10,
    height: 10,
    left: -5,
    bottom: -5,
}

const funcs = [
    {
        f:(x) => {return tg(x)},
        color: 'purple',
        width:3
    },
];

const discret =  1000;



let zoomStep = win.width/10;

const scale = 1; //размер единичного отрезка

//let funcTemplate = '';

function sin(x) {
    return Math.sin(x);
}

function tg(x) {
    return Math.tan(x);
}

function f(x) {
    return x*x;
}