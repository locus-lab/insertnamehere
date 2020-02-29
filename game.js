// v0.3: Terrain Textures

grid = [];
objects = [];

//canvas dimensions
let w = window.innerWidth-100;
let h = 500;

//grid dimensions
let gw = 100;
let gh = 100;

//cell dimensions
let wd = 70;
let hd = 70;

//drag variables
let drag = false;
let offsetX = -gw*wd/2;
let offsetY = -gh*hd/2;

let prevMouseX = 0;
let prevMouseY = 0;

let poffsetX = -gw*wd/2;
let poffsetY = -gh*hd/2;

//menu variables
let menuOpen = true;
let menuWidth = 150;

//notification
let currentAlert = false;
let alertFade = 100;

//storybox
let currentStory = 'Insert Catchy Opening Sequence Here';
let storyCtr = 0;

//variable to make sure structures are not accidentally created
let clearClick = false;

resources = {
    'Population':100,
    'Food':100,
    'Wood':100,
    'Science™':0
}

structures = {
    'basic-hut':[255,100,100],
    'trapper':[100,255,100],
    'logger':[255,150,100],
    'thinker':[100,100,255]
}

let terrainImages;

let testImg;

function setup(){
    i1=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/drygrass.png');
    i2=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/drygrass2.png');
    i3=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/grasswasteland.png');
    i4=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/lake.png');
    i5=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/wasteland.png');
    i6=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/wastelandruin.png');
    terrainImages=[
        i1,i2,i3,i4,i5,i6
    ]
    createCanvas(w,h);
    noStroke();
    makegrid();
}

let currentStructure = 0;
let selectedStructure = Object.keys(structures)[currentStructure];

function buttonClicked(x,y,width,height){
    if(mouseIsPressed&&mouseButton===LEFT){
        if(mouseX>x&&mouseX<x+width){
            if(mouseY>y&&mouseY<y+height){
                return true;
            }
        }
    }
    return false;
}

function buttonHovered(x,y,width,height){
    if(mouseX>x&&mouseX<x+width){
        if(mouseY>y&&mouseY<y+height){
            return true;
        }
    }
    return false;
}

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
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(mouseX>i*wd+offsetX&&mouseX<i*wd+wd+offsetX&&mouseY>j*hd+offsetY&&mouseY<j*hd+hd+offsetY){
                if(objectExists(i,j)===false){
                    if(resources['Wood']>=10 && resources['Population']>20){
                        objects.push({'type':selectedStructure,'x':i,'y':j});
                        resources['Wood']-=10;
                        resources['Population']-=20;
                    }
                    else{
                        currentAlert='Not enough resources!'
                    }
                }
            }
        }
    }
}

function drawMenu(){
    if(menuOpen){
        textAlign(LEFT,TOP);

        //collapse button
        fill(50);
        ellipse(w-menuWidth,h/2,50,50);
        textSize(30);
        fill(255);
        text('>',w-menuWidth-20,h/2-15);
        if(buttonClicked(w-menuWidth-25,h/2-25,25,50)){
            menuOpen = false;
            clearClick = true;
        }

        //main rect
        fill(20);
        rect(w-menuWidth,0,menuWidth,h);

        //resources title block
        fill(100,100,255);
        textSize(20);
        text("Resources",w-menuWidth+20,20);

        //resource listing
        textSize(15);
        fill(255);
        let itemPos = 50;
        for(var key in resources){
            text(key+': '+resources[key].toString(),w-menuWidth+20,itemPos);
            itemPos += 20;
        }

        //structure title block
        fill(100,100,255);
        textSize(20);
        text("Structures",w-menuWidth+20,200);

        //structure listing
        textSize(15);
        itemPos = 230;
        for(var item=0;item<Object.keys(structures).length;item++){
            if(buttonHovered(w-menuWidth+20,itemPos,menuWidth-20,20)){
                fill(50);
                rect(w-menuWidth,itemPos-2,menuWidth,20);
            }
            if(item===currentStructure){
                fill(100,255,100);
            }
            else{
                fill(255);
            }
            text(Object.keys(structures)[item],w-menuWidth+20,itemPos);

            //structure selection
            if(buttonClicked(w-menuWidth+20,itemPos,menuWidth-20,20)){
                currentStructure = item;
                selectedStructure = Object.keys(structures)[item];
            }
            itemPos += 20;
        }
    }
    else{
        fill(50);
        ellipse(w,h/2,50,50);
        textSize(30);
        fill(255);
        text('<',w-20,h/2-15);
        if(buttonClicked(w-25,h/2-25,25,50)){
            menuOpen = true;
            clearClick = true;
        }
    }
}

function drawObjects(){
    for(let i=0;i<objects.length;i++){
        fill(structures[objects[i]['type']]);
        rect(objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY,wd-10,hd-10);
    }
}

function makegrid(){
    for(let i=0;i<gw;i++){
        n = [];
        for(let j=0;j<gh;j++){
            n.push(round(Math.random()*(terrainImages.length-1))+1);
        }
        grid.push(n);
        //console.log(n);
    }
    //console.log(grid);
}

function drawgrid(){
    background(90);
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            image(window['i'+grid[i][j].toString()],i*wd+offsetX,j*hd+offsetY,wd,hd);
        }
    }
}

function gridDrag(){
    offsetX = mouseX-prevMouseX+poffsetX;
    offsetY = mouseY-prevMouseY+poffsetY;
}

function resourceManagement(){
    for(let i=0;i<objects.length;i++){
        switch(objects[i]['type']){
            case 'basic-hut':
                if(resources['Food']>=2){
                    resources['Population']++;
                    resources['Food']-=2;
                }
                else{
                    currentAlert='Not enough food; population generation stopped';
                }
                break;
            case 'trapper':
                if(resources['Wood']>=1){
                    resources['Food']+=3;
                    resources['Wood']-=1;
                }
                else{
                    currentAlert='Not enough wood; food generation stopped';
                }
                break;
            case 'logger':
                if(resources['Food']>=3){
                    resources['Wood']+=3;
                    resources['Food']-=3;
                }
                else{
                    currentAlert='Not enough food; wood generation stopped';
                }
            case 'thinker':
                if(resources['Food']>=3){
                    resources['Science™']+=1;
                    resources['Food']-=3;
                }
                else{
                    currentAlert='Not enough food; Science™ generation stopped';
                }
                break;
        }
    }
}

function alertManager(){
    if(currentAlert){
        fill(0,0,0,alertFade);
        rect(w/4,0,w/2,50);
        textSize(20);
        text(currentAlert,w/4+10,10,w/2-20,50);
        alertFade-=10;
    }
    if(alertFade<=0){
        currentAlert=false;
        alertFade = 100;
    }
}

function storyManager(){
    if(currentStory){
        fill(0,0,0,99);
        rect(40,40,w-80,h-120);
        fill(255);
        textSize(20);
        text(currentStory.slice(0,storyCtr),50,50,w-40,h-140);
        if(storyCtr<currentStory.length){
            storyCtr+=1;
        }
        else{
            fill(0,0,0);
            rect(40,h-60,w-80,50);
            fill(255);
            text("[Continue, even if it doesn't make sense]",45,h-50);
            if(buttonClicked(40,h-60,w-80,50)){
                currentStory=false;
                storyCtr=0;
                clearClick=true;
            }
        }
    }
}

setInterval(resourceManagement,2000);

/* p5 functions*/

function mouseClicked(){
    if(mouseButton===LEFT&&clearClick===false){
        if(menuOpen&&mouseX<w-menuWidth||menuOpen===false){
            placeObject();
        }
    }
    clearClick = false;
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
    alertManager();
    storyManager();
}

// disable right-click menu appearing after dragging
window.addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; } );
