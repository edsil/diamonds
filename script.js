"use strict";

import { Diamonds } from "./diamonds.js";

var canvas, ctx;
var btnStart, btnLeft, btnBalance, btnRight;
const diam = new Image();
diam.src = './img/diamond.png';
const scale = new Image();
scale.src = './img/scale.png';
const bad = new Image();
bad.src = './img/bad.png';

var dia = new Diamonds();
window.onload = function () {
    document.body.style.overflow = "hidden";
    canvas = document.getElementById("canvas");
    btnStart = document.getElementById("btnStart");
    btnLeft = document.getElementById("btnLeft");
    btnBalance = document.getElementById("btnBalance");
    btnRight = document.getElementById("btnRight");
    btnStart.onclick = start;
    btnLeft.onclick = tipsLeft;
    btnBalance.onclick = balances;
    btnRight.onclick = tipsRight;
    ctx = canvas.getContext("2d");
    ctx.canvas.width = 400;
    ctx.canvas.height = 200;
    canvas.style.border = "1px solid black";
    ctx.drawImage(scale, 20, 60, 360, 193);
    positionDiam([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, 10);
};

function redraw() {
    ctx.clearRect(0, 0, 400, 200);
    ctx.drawImage(scale, 20, 60, 360, 193);
}

function positionDiam(dn, x, y, diaBad = false) {
    ctx.font = "12px Arial";
    var dy = y;
    var dx;
    dn.forEach(function (a, i) {
        dx = x + i * 30;
        if (a == diaBad) {
            //ctx.drawImage(bad, dx, dy + 5, 25, 20);
            //ctx.fillText(String(a), dx + 8, dy);
            new SlowDraw(bad, String(a), dx, dy + 5, 25, 20, 0.1);
        } else {
            //ctx.drawImage(diam, dx, dy + 5, 25, 20);
            //ctx.fillText(String(a), dx + 8, dy);
            new SlowDraw(diam, String(a), dx, dy + 5, 25, 20, 0.1);
        }
    });
    ctx.drawImage(diam, dx, dy + 5, 25, 20);
}

class SlowDraw {
    constructor(img, str, dx, dy, w, h, time) {
        this.img = img;
        this.str = str;
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = h;
        this.time = time;
        this.counter = 0;
        this.draw(time);
    }

    draw(time) {
        ctx.drawImage(this.img, this.dx, this.dy, this.w, this.h);
        var opp = (100 - this.counter) / 100;
        ctx.fillStyle = "rgba(255,255,255," + opp + ")";
        ctx.fillRect(this.dx, this.dy, this.w, this.h);
        ctx.fillStyle = "rgb(0,0,0,0.01)";
        ctx.font = "12px Arial";
        ctx.fillText(this.str, this.dx + 8, this.dy);
        this.counter++;
        if (this.counter < 100) {
            setTimeout(time => { this.draw(time); }, time / 100);
        } else {
            this.counter = 0;
        }
    }

}

function start() {
    btnStart.hidden = true;
    btnLeft.hidden = false;
    btnBalance.hidden = false;
    btnRight.hidden = false;
    update();
}

function tipsLeft() {
    dia.measureResults(dia.nextToMeasure(), -1);
    update();
}

function balances() {
    dia.measureResults(dia.nextToMeasure(), 0);
    update();
}

function tipsRight() {
    dia.measureResults(dia.nextToMeasure(), 1);
    update();
}

function update() {
    if (dia.nextToMeasure() <= 3) {
        const whatToMeas = dia.whatToMeasure(dia.nextToMeasure());
        const to_show = [];
        for (var i = 1; i < 13; i++) {
            if (!(whatToMeas[0].includes(i) || whatToMeas[0].includes(i))) {
                to_show.push(i);
            }
        }
        redraw();
        positionDiam(to_show, 10, 10);
        positionDiam(whatToMeas[0], 35, 88);
        positionDiam(whatToMeas[1], 245, 88);
        ctx.font = "25px Arial";
        ctx.fillText(dia.nextToMeasure(), 190, 70);
    } else {
        redraw();
        positionDiam([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, 10, dia.result[0]);
        btnStart.hidden = false;
        btnStart.innerHTML = "Diamond " + dia.result[0] + " is false, and " + ((dia.result[1] == "H") ? "heavier" : "lighter") + " than the others. Click to restart.";
        btnLeft.hidden = true;
        btnBalance.hidden = true;
        btnRight.hidden = true;
        dia = new Diamonds();
    }
}