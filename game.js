grid = [];
objects = [];

let w = 800;
let h = 500;

let wd = 70;
let hd = 70;

let offsetX = 0;
let offsetY = 0;

let prevMouseX = 0;
let prevMouseY = 0;

let poffsetX = 0;
let poffsetY = 0;

let drag = false;

let menuOpen = true;

function setup(){
    createCanvas(w,h);
    noStroke();
    makegrid();
}

resources = {
    'Population':100,
    'Food':100,
    'Wood':100,
    'Science™':0
}

structures = {
    'basic-hut':[255,100,100],
    'trapper':[100,255,100],
    'thinker':[100,100,255]
}

/*structures = [
    'basic-hut',
    'trapper',
    'thinker'
]*/

let currentStructure = 0;
let selectedStructure = Object.keys(structures)[currentStructure];
console.log(selectedStructure);

function objectExists(i,j) {
    for(let x=0;x<objects.length;x++){
        if(objects[x]['x']===i&&objects[x]['y']===j){
            objects.splice(x,1);
            return true;
        }
    }
    return false;
}

function placeObject(){
    for(let i=0;i<w/wd;i++){
        for(let j=0;j<h/hd;j++){
            if(mouseX>=i*wd+offsetX&&mouseX<=i*wd+wd+offsetX&&mouseY>=j*hd+offsetY&&mouseY<=j*hd+hd+offsetY){
                if(objectExists(i,j)===false){
                    objects.push({'type':selectedStructure,'x':i,'y':j});
                    //objects.push({'type':structures[currentStructure],'x':i,'y':j});
                    resources['Wood']-=10;
                    console.log(objects);
                }
            }
        }
    }
}

function drawMenu(){
    let menuWidth = 150;
    if(menuOpen){
        textAlign(LEFT,TOP);
        fill(20);
        rect(w-menuWidth,0,menuWidth,h);

        fill(100,100,255);
        textSize(20);
        text("Resources",w-menuWidth+20,20);

        textSize(15);
        fill(255);
        let itemPos = 50;
        for(var key in resources){
            text(key+': '+resources[key].toString(),w-menuWidth+20,itemPos);
            itemPos += 20;
        }

        fill(100,100,255);
        textSize(20);
        text("Structures",w-menuWidth+20,200);

        textSize(15);
        itemPos = 230;
        for(var item=0;item<Object.keys(structures).length;item++){
            if(item===currentStructure){
                fill(100,255,100);
            }
            else{
                fill(255);
            }
            text(Object.keys(structures)[item],w-menuWidth+20,itemPos);
            itemPos += 20;
        }
    }

}

function drawObjects(){
    for(let i=0;i<objects.length;i++){
        //image code here
        //dummy brown thing
        //let col = structures[objects[i]['type']];
        //fill(col[0],col[1],col[2]);
        /*switch(objects[i]['type']){
            case 'basic-hut': fill(255,100,100); break;
            case 'trapper': fill(100,255,100); break;
            case 'thinker': fill(100,100,255); break;
        }*/
        fill(structures[objects[i]['type']]);
        rect(objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY,wd-10,hd-10);
    }
}

function makegrid(){
    for(let i=0;i<w/4;i++){
        n = [];
        for(let j=0;j<h/4;j++){
            n.push(color(250+5*Math.random()));
        }
        grid.push(n);
    }
}

function drawgrid(){
    background(90);
    for(let i=0;i<w/wd;i++){
        for(let j=0;j<h/hd;j++){
            fill(grid[i][j]);
            rect(i*wd+offsetX,j*hd+offsetY,wd,hd);
        }
    }
}

function gridDrag(){
    offsetX = mouseX-prevMouseX+poffsetX;
    offsetY = mouseY-prevMouseY+poffsetY;
    console.log(prevMouseX);
}

function resourceManagement(){
    for(let i=0;i<objects.length;i++){
        switch(objects[i]['type']){
            case 'basic-hut':
                resources['Population']++;
                resources['Food']--;
                break;
            case 'trapper':
                resources['Food']+=3;
                break;
            case 'thinker':
                resources['Science™']+=1;
                break;
        }
    }
}

setInterval(resourceManagement,1000);

/* p5 functions*/

function mouseClicked(){
    if(mouseButton===LEFT){
        placeObject();
    }
}

function mousePressed(){
    if(mouseButton===CENTER || mouseButton===RIGHT){
        drag = true;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
}

function mouseReleased(){
    if(mouseButton===CENTER||mouseButton===RIGHT){
        drag = false;
        poffsetX = offsetX;
        poffsetY = offsetY;
    }
}

function keyPressed(){
    if(keyCode===UP_ARROW){
        currentStructure--;
        if(currentStructure<0){
            currentStructure = Object.keys(structures).length-1;
        }
        console.log(currentStructure);
        selectedStructure=Object.keys(structures)[currentStructure];
    }
    if(keyCode===DOWN_ARROW){
        currentStructure++;
        if(currentStructure>=Object.keys(structures).length){
            currentStructure = 0;
        }
        selectedStructure=Object.keys(structures)[currentStructure];
    }
}

function draw(){
    drawgrid();
    drawObjects();
    drawMenu();
    if(drag){
        gridDrag();
    }
}

window.addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; } );