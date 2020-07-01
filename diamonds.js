// Measure returns which diamons (from 1 to 12) are to be weighted
// 'numb' represents: 
//    0 - if the diamonds were not weithed yet
//    1, 2 - weather it was the first or second time they were measured, in that case, weight should have:
//        -1 if the left side is heavier
//         0 if both sides have the same weight
//         1 if the right side is heavier

onload = function() {start();}
    
    
function start(){
    ta = document.getElementById("textarea");
    ba = document.getElementById("sidea");
    bo = document.getElementById("sideo");
    bb = document.getElementById("sideb");
    this.dia = new Diamonds();
    
    ta.innerHTML = "<B>Interaction 1:</B> <p> side A: " + dia.whatToMeasure(1)[0];
    ta.innerHTML += "<p> side B: " + dia.whatToMeasure(1)[1];
    
    ba.innerHTML = "Side A Down <br>" + dia.whatToMeasure(1)[0];
    bb.innerHTML = "Side B Down <br>" + dia.whatToMeasure(1)[1];
    bo.innerHTML = "Balances Out";
}

function clickSideA() {
    this.dia.measureResults (this.dia.nextToMeasure(), -1);
    updateSite();
}

function clickSideO() {
    if(this.dia.nextToMeasure() <= 3) {
        this.dia.measureResults (this.dia.nextToMeasure(), 0);
        updateSite();
    } else {
        this.dia = null;
        start();
    }
}

function clickSideB() {
    this.dia.measureResults (this.dia.nextToMeasure(), 1);
    updateSite();
}

function updateSite() {
    ta = document.getElementById("textarea");
    ba = document.getElementById("sidea");
    bo = document.getElementById("sideo");
    bb = document.getElementById("sideb");
    
    if(this.dia.nextToMeasure() <= 3) {
        ba.innerHTML = "Side A Down <br>" + dia.whatToMeasure(this.dia.nextToMeasure())[0];
        bb.innerHTML = "Side B Down <br>" + dia.whatToMeasure(this.dia.nextToMeasure())[1];

        ta.innerHTML += "<B>Interaction " + this.dia.nextToMeasure() +":</B> <p> side A: " + dia.whatToMeasure(this.dia.nextToMeasure())[0];
        ta.innerHTML += "<p> side B: " + dia.whatToMeasure(this.dia.nextToMeasure())[1];
    } else
        {
            ba.innerHTML = "Side A Down";
            bb.innerHTML = "Side B Down"
            bo.innerHTML = "<B>Result: " + this.dia.result + "<br> Click here to restart";
            ta.innerHTML += "<B>The false diamond is: " + this.dia.result;
        }
}

class Diamonds {
    constructor () {
        this.diaArray = Array(12).fill(null);
        this.result = null;
        this.measurement = 0;
        // diaArray stores the state of each diamond:
        //   null = unknown
        //   0 = legitimate; 1 = heavier; -1 = ligher
    }
    
    whatToMeasure (measureNumber) {
        if (measureNumber == 1) {
            return [[1,2,3,4],[5,6,7,8]];
        }
        
        if (measureNumber == 2) {
            if (compArr (this.diaArray, [1,1,1,1,-1,-1,-1,-1,0,0,0,0]) ||
                compArr (this.diaArray, [-1,-1,-1,-1,1,1,1,1,0,0,0,0])) return [[1,2,5,10],[3,4,7,9]];
            else
            if (compArr (this.diaArray, [0,0,0,0,0,0,0,0,null,null,null,null])) {
                return [[2,5,10,11],[1,4,7,9]];}
            else
                return 'Error';
            }
    
        if (measureNumber == 3) {
            if (compArr (this.diaArray, [1,1,0,0,0,0,-1,0,0,0,0,0]) ||
                compArr (this.diaArray, [-1,-1,0,0,0,0,1,0,0,0,0,0])) return [[1],[2]];
            else
            if (compArr (this.diaArray, [0,0,0,0,0,-1,0,-1,0,0,0,0]) ||
                compArr (this.diaArray, [0,0,0,0,0,1,0,1,0,0,0,0])) return [[6],[8]];
            else
            if (compArr (this.diaArray, [0,0,1,1,-1,0,0,0,0,0,0,0]) ||
                compArr (this.diaArray, [0,0,-1,-1,1,0,0,0,0,0,0,0])) return [[3],[4]];
            else
            if (compArr (this.diaArray, [0,0,0,0,0,0,0,0,-1,1,1,0]) ||
                compArr (this.diaArray, [0,0,0,0,0,0,0,0,1,-1,-1,0])) return [[10],[11]];
            else
            if (compArr (this.diaArray, [0,0,0,0,0,0,0,0,0,0,0,null])) return [[1],[12]];
            else
                return 'Error';
        }
    }
    
    nextToMeasure () {
        return (this.measurement+1);
    }
    
    measureResults (measureNumber, weight) {
        if ((this.measurement + 1) != measureNumber) return 'Error'; else this.measurement++;
        if (measureNumber == 1) {
            if (weight == -1)
                this.diaArray = [1,1,1,1,-1,-1,-1,-1,0,0,0,0];
            else if (weight == 1)
                this.diaArray = [-1,-1,-1,-1,1,1,1,1,0,0,0,0];
            else if (weight == 0)
                this.diaArray = [0,0,0,0,0,0,0,0,null,null,null,null];
        } else
        
        if (measureNumber == 2) {
            if (compArr (this.diaArray, [1,1,1,1,-1,-1,-1,-1,0,0,0,0])) {
                if (weight == -1)
                    this.diaArray = [1,1,0,0,0,0,-1,0,0,0,0,0];
                else if (weight == 0)
                    this.diaArray = [0,0,0,0,0,1,0,1,0,0,0,0];
                else if (weight == 1)
                    this.diaArray = [0,0,1,1,-1,0,0,0,0,0,0,0]; }
            else
            if (compArr (this.diaArray, [0,0,0,0,0,0,0,0,null,null,null,null])) {
                if (weight == -1)
                    this.diaArray = [0,0,0,0,0,0,0,0,-1,1,1,0];
                else if (weight == 0)
                    this.diaArray = [0,0,0,0,0,0,0,0,0,0,0,null];
                else if (weight == 1)
                    this.diaArray = [0,0,0,0,0,0,0,0,1,-1,-1,0]; }
            else
            if (compArr (this.diaArray, [-1,-1,-1,-1,1,1,1,1,0,0,0,0])) {
                if (weight == -1)
                    this.diaArray = [0,0,-1,-1,1,0,0,0,0,0,0,0];
                else if (weight == 0)
                    this.diaArray = [0,0,0,0,0,-1,0,-1,0,0,0,0];
                else if (weight == 1)
                    this.diaArray = [-1,-1,0,0,0,0,1,0,0,0,0,0]; }
            else return 'Error';
        } else
        
        if (measureNumber == 3) {
            if (weight == -1) {               
                if(compArr(this.diaArray, [1,1,0,0,0,0,-1,0,0,0,0,0])) this.result = '1-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,-1,0,-1,0,0,0,0])) this.result = '6-H';
                else if(compArr(this.diaArray, [0,0,1,1,-1,0,0,0,0,0,0,0])) this.result = '3-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,-1,1,1,0])) this.result = '10-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,0,0,0,null])) this.result = '12-L';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,1,-1,-1,0])) this.result = '11-L';
                else if(compArr(this.diaArray, [0,0,-1,-1,1,0,0,0,0,0,0,0])) this.result = '4-L';
                else if(compArr(this.diaArray, [0,0,0,0,0,1,0,1,0,0,0,0])) this.result = '8-L'; //1 0 -1
                else if(compArr(this.diaArray, [-1,-1,0,0,0,0,1,0,0,0,0,0])) this.result = '2-L';
                else return 'Error';
            }
            else if (weight == 0) {               
                if(compArr(this.diaArray, [1,1,0,0,0,0,-1,0,0,0,0,0])) this.result = '7-L';
                else if(compArr(this.diaArray, [0,0,0,0,0,-1,0,-1,0,0,0,0])) this.result = 'Error';
                else if(compArr(this.diaArray, [0,0,1,1,-1,0,0,0,0,0,0,0])) this.result = '5-L';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,-1,1,1,0])) this.result = '9-l';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,0,0,0,null])) this.result = 'Error';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,1,-1,-1,0])) this.result = '9-H';
                else if(compArr(this.diaArray, [0,0,-1,-1,1,0,0,0,0,0,0,0])) this.result = '5-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,1,0,1,0,0,0,0])) this.result = 'Error';
                else if(compArr(this.diaArray, [-1,-1,0,0,0,0,1,0,0,0,0,0])) this.result = '7-H';
                else return 'Error';
            }
            else if (weight == 1) {               
                if(compArr(this.diaArray, [1,1,0,0,0,0,-1,0,0,0,0,0])) this.result = '2-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,-1,0,-1,0,0,0,0])) this.result = '8-H';
                else if(compArr(this.diaArray, [0,0,1,1,-1,0,0,0,0,0,0,0])) this.result = '4-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,-1,1,1,0])) this.result = '11-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,0,0,0,null])) this.result = '12-H';
                else if(compArr(this.diaArray, [0,0,0,0,0,0,0,0,1,-1,-1,0])) this.result = '10-L';
                else if(compArr(this.diaArray, [0,0,-1,-1,1,0,0,0,0,0,0,0])) this.result = '3-L';
                else if(compArr(this.diaArray, [0,0,0,0,0,1,0,1,0,0,0,0])) this.result = '6-L';
                else if(compArr(this.diaArray, [-1,-1,0,0,0,0,1,0,0,0,0,0])) this.result = '1-L';
                else return 'Error';
            }
            else return 'Error';
        }
    }       
}
    



function compArr(arr1, arr2){
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i])
            return false;
    }
    return true;
}
    
