grid = [];
objects = [];

var wd = 70;
var hd = 70;

var offsetX = 0;
var offsetY = 0;

function objectExists(i,j) {
    for(var x=0;x<objects.length;x++){
        if(objects[x][1]===i&&objects[x][2]===j){
            objects.splice(x,x+1);
            return true;
        }
    }
    return false;
}

function placeObject(w,h){
    for(var i=0;i<w/wd;i++){
        for(var j=0;j<h/hd;j++){
            if(mouseX>=i*wd&&mouseX<=i*wd+wd&&mouseY>=j*hd&&mouseY<=j*hd+hd){
                if(objectExists(i,j)===false){
                    objects.push(['test',i,j]);
                }
            }
        }
    }
}

function drawObjects(w,h){
    //DELETE
    fill(210,180,140);
    for(var i=0;i<objects.length;i++){
        //image code here
        //dummy brown thing
        rect(objects[i][1]*wd+5+offsetX,objects[i][2]*hd+5+offsetY,wd-10,hd-10);
    }
}

function makegrid(w,h){
    for(var i=0;i<w/4;i++){
        n = [];
        for(var j=0;j<h/4;j++){
            n.push(color(100,200+55*Math.random(),100));
        }
        grid.push(n);
    }
}

function drawgrid(w,h){
    background(255);
    for(var i=0;i<w/wd;i++){
        for(var j=0;j<h/hd;j++){
            fill(grid[i][j]);
            rect(i*wd+offsetX,j*hd+offsetY,wd,hd);
        }
    }
}

function setup(){
    createCanvas(800, 500);
    noStroke();
    makegrid(800,500);
}

function mouseClicked(){
    placeObject(800,500);
}

function draw(){
    drawgrid(800,500);
    drawObjects(800,500);
}