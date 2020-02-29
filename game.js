// v0.4: General Improvement

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
let currentStory = 'test test 123';//`After hundreds of years of walking through the ruined earth, passing stories down from generation to generation, the nomadic lifestyle seems like the only way of life. But it is time to settle down- time to heal the earth, bring back the ways of our fathers, to part the fog that blots the sun. You have been chosen as the leader of a small colony- defend them at all costs.`;
let storyCtr = 0;

//descriptions when hover
let currentDescription = false;

//variable to make sure structures are not accidentally created
let clearClick = false;

//"fog of war"
let fogs=[];

resources = {
    'Population':100,
    'Food':100,
    'Wood':100,
    'Science™':0
}

structures = {
    'basic-hut':[[255,100,100],'A basic hut, for all your basic hut needs!'],
    'trapper':[[100,255,100],'A way to keep your people from starving to death!'],
    'logger':[[255,150,100],'Employs a squadron of woodpeckers to contribute to climate change'],
    'thinker':[[100,100,255],'They think, I think. Therefore they are and I am. Or something.']
}

/*terrainImageNames = [
    'drygrass.png',
    'drygrass2.png',
    'grasswasteland.png',
    'lake.png',
    'wasteland.png',
    'wastelandruin.png'
]*/

let terrainImages;

let fogImg;

//var i1,i2,i3,i4,i5,i6;

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
    fogImg=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/fog.png');
    console.log('INSERTNAMEHERE - version 0.3.1');
    createCanvas(w,h);
    noStroke();
    makegrid();
    textFont('monospace');
}

/*function preload(){
    terrainImages=[];
    for(let i=0;i<terrainImageNames.length;i++){
        img=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/'+terrainImageNames[i]);
        terrainImages.push(img);
    }
    testImg = loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/drygrass.png');
    //console.log(terrainImages);
}*/

let currentStructure = 0;
let selectedStructure = Object.keys(structures)[currentStructure];
//console.log(selectedStructure);

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
                        //objects.push({'type':structures[currentStructure],'x':i,'y':j});
                        resources['Wood']-=10;
                        resources['Population']-=20;
                        clearfog();
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
        fill(20,20,20,240);
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

        //popup descriptions
        popupOpen = false;

        for(var item=0;item<Object.keys(structures).length;item++){
            if(buttonHovered(w-menuWidth+20,itemPos,menuWidth-20,20)){
                fill(50);
                rect(w-menuWidth,itemPos-2,menuWidth,20);
                currentDescription=structures[Object.keys(structures)[item]][1];
                popupOpen = true;
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
        if(popupOpen===false){
            currentDescription = false;
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
        fill(structures[objects[i]['type']][0]);
        rect(objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY,wd-10,hd-10);
    }
}

function makegrid(){
    for(let i=0;i<gw;i++){
        n = [];
        for(let j=0;j<gh;j++){
            n.push(round(Math.random()*(terrainImages.length-1))+1);
            fogs.push([i,j,1]);
        }
        grid.push(n);
        //console.log(n);
    }
    //console.log(grid);
}

function drawfog(){
    for(let i=0; i<fogs.length;i++){
        //fill(100,100,100,200+55*fogs[i][2]);
        tint(255,200+55*fogs[i][2]);
        if(fogs[i][0]*wd+offsetX+wd>0&&fogs[i][1]*hd+offsetY+hd>0&&fogs[i][0]*wd+offsetX<w&&fogs[i][1]*hd+offsetY<h){
            //rect(fogs[i][0]*wd+offsetX,fogs[i][1]*hd+offsetY,wd,hd);
            image(fogImg,fogs[i][0]*wd+offsetX,fogs[i][1]*hd+offsetY,wd,hd);
        }
    }
}

function clearfog(){
    let fogs2 = fogs;
    for(let k=0; k<3; k++){
        for(let i=0; i<fogs.length;i++){
            for(let j=0; j<objects.length;j++){
                if(Math.hypot(fogs[i][0]-objects[j]['x'],fogs[i][1]-objects[j]['y'])<=2.0){
                    //console.log(Math.hypot(fogs[i][0]-objects[j]['x'],fogs[i][1]-objects[j]['y']));
                    fogs2.splice(i,1);
                }
                if(Math.hypot(fogs[i][0]-objects[j]['x'],fogs[i][1]-objects[j]['y'])<=4.0){
                    //console.log(Math.hypot(fogs[i][0]-objects[j]['x'],fogs[i][1]-objects[j]['y']));
                    fogs[i][2] = 0;
                }
            }
        }
    }

    fogs=fogs2;
}

function drawgrid(){
    background(90);
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(i*wd+offsetX+wd>0&&j*hd+offsetY+hd>0&&i*wd+offsetX<w&&j*hd+offsetY<h){
                image(window['i'+grid[i][j].toString()],i*wd+offsetX,j*hd+offsetY,wd,hd);
            }
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
        fill(0,0,0,200);
        rect(40,40,w-80,h-120);
        fill(255);
        textSize(20);
        text(currentStory.slice(0,storyCtr),50,50,w-40,h-140);
        if(storyCtr<currentStory.length){
            storyCtr+=1;
        }
        else{
            fill(0,0,0,200);
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

function descriptionManager(){
    if(currentDescription){
        fill(255, 213, 74,200);
        let dx = mouseX;
        let dy = mouseY;
        if(w-mouseX<200){
            dx = mouseX-200;
        }
        if(h-mouseY<150){
            dy = mouseY-150;
        }
        rect(dx,dy,200,150);
        fill(0);
        text(currentDescription,dx+10,dy+10,200-20,150-20);
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
    drawfog();
    drawObjects();
    drawMenu();
    if(drag){
        gridDrag();
    }
    descriptionManager()
    alertManager();
    storyManager();
}

// disable right-click menu appearing after dragging
window.addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; } );
