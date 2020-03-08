// v0.6.2: Idea Generator

//canvas dimensions
let w = window.innerWidth/2;
let h = 500;

//grid dimensions
let gw = 30;
let gh = 30;

//cell dimensions
let wd = 200;
let hd = 200;

//gamemap array
grid = [];

//structure array
objects = [];

//ghoul array
ghouls = [];

//special objects array

//[NAME,X,Y,READ,MESSAGE]

uniqueobjects = [
    ['Street Sign',Math.round(gw/2)-3,Math.round(gh/2),false,'A green street sign lies half-buried in the ground. Its faded lettering reads: HALF-FOODS GROCERY STORE in 300 METERS. Turn RIGHT at the intersection.'],
    ['Ancient Advertisement',Math.round(gw/2),Math.round(gh/2)+4,false,'“Come buy your FRESH ORGANIC FRUITS at HALF-FOODS GROCERY STORE before disaster strikes! Take Route I-1101 Northwest.”'],
    ['Street Sign',Math.round(gw/2)-7,Math.round(gh/2),false,'A green street sign lies half-buried in the ground. Its faded lettering reads: HALF-FOODS GROCERY STORE in 300 METERS. Turn LEFT at the intersection.'],
    ['A Piece of Half-Burned Paper',Math.round(gw/2)-2,false,Math.round(gh/2)-4,'“Secret Military Outpost. 100 meters west. Meeting time January 10, 2045 - if humanity still exists.”'],
    ['Street Sign',Math.round(gw/2)-6,Math.round(gh/2)+1,false,'A plate of metal painted with words. The letters are faded, but still readable: “TOTALLY NOT SUSPICIOUS MILITARY BASE IN 200 METERS. GO SOUTHWEST.”'],
    ['Street Sign',Math.round(gw/2)-2,Math.round(gh/2)-10,false,`An entry from a journal: "The bombs have hit. If anyone's left after this tragedy, go to my laboratory. I've been working on some things there..."`]
];


//drag variables
let drag = false;
let offsetX = -(gw*wd-w)/2;
let offsetY = -(gh*hd-h)/2;

let prevMouseX = 0;
let prevMouseY = 0;

let poffsetX = -(gw*wd-w)/2;
let poffsetY = -(gh*hd-h)/2;

//menu variables
let menuOpen = true;
let menuWidth = 150;

//notification
let currentAlert = false;
let alertFade = 100;

//storybox
let currentStory = `After hundreds of years of walking through the ruined earth, passing stories down from generation to generation, the nomadic lifestyle seems like the only way of life. But it is time to settle down - time to heal the earth, bring back the ways of our fathers, to part the fog that obscures the earth and blots the sun. You have been chosen as the leader of a small colony - defend it at all costs.`;
currentStory = currentStory.split(' ');
let storyString = '';
let storyCtr = 0;

//descriptions when hover
let currentDescription = false;

//ghoul battle variable;
let currentGhoul = false;
let ghoulWeapons = ['Rock','Paper','Scissors'];
let chosenWeapon = false;
let defeated = false;

//variable to make sure structures are not accidentally created
let clearClick = false;

//"fog of war"
let fogs=[];

//startscreen
let startScreen = true;

//Stopping Empire Syndrome since 2020
let difficulty = 1;

population = {
    'Total':100,
    'Working':0,
    'Available':100
}

resources = {
    'Food':100,
    'Wood':100,
    'Science™':0
}

//Structures
//[NAME,COLOR,DESCRIPTION,WOODCOST,TECHREQUIRED]

structures = {
    'basic_hut':[[255,100,100],'A basic hut, for all your basic hut needs! \n \nProduces: 1 Population/day \n \nCost: 10 Wood, 20 Available Population, consumes food continously \n',10,'start'],
    'hunter':[[100,255,100],'A way to keep your people from starving to death! \n \nProduces: 3 Food/day \nCost: 20 Wood, 20 Available Population, consumes wood continously \n',10,'start'],
    'logger':[[255,150,100],'Employs a squadron of woodpeckers to contribute to climate change \n \nProduces: 3 Wood/day \nCost: 20 Wood, 20 Available Population, consumes food continously \n',20,'start'],
    'thinker':[[100,100,255],'They think, I think. Therefore they are and I am. Or something. \n \nProduces: 0.25 Science/day \n \nCost: 20 Available Population',0,'start']
}

/*structures = [
    ['basic_hut',[255,100,100],'A basic hut, for all your basic hut needs! \n \nProduces: 1 Population/day \n \nCost: 10 Wood, 20 Available Population, consumes food continously \n',10,'start'],
    ['hunter',[100,255,100],'A way to keep your people from starving to death! \n \nProduces: 3 Food/day \nCost: 20 Wood, 20 Available Population, consumes wood continously \n',10,'start'],
    ['logger',[255,150,100],'Employs a squadron of woodpeckers to contribute to climate change \n \nProduces: 3 Wood/day \nCost: 20 Wood, 20 Available Population, consumes food continously \n',20,'start'],
    ['thinker',[100,100,255],'They think, I think. Therefore they are and I am. Or something. \n \nProduces: 0.25 Science/day \n \nCost: 20 Available Population',0,'start']
];*/

//Technology Tree

researched = ['start'];

//[NAME,LEVEL,COST,PREREQUISITES]
techtree = [
    ['start',0,0,'start'],
    ['stuff',1,5,'start'],
    ['basic',1,5,'start'],
    ['moreStuff',2,5,'stuff'],
    ['test',2,5,'basic'],
    ['nuclear',3,10,'test']
];

let treeopen = false;

let mOffsetX = 20;
let mOffsetY = 0;

let mpoffsetX = 20;
let mpoffsetY = 0;

levelCrowdedness = [0,0,0,0];

for(let p=0;p<techtree.length;p++){
    levelCrowdedness[techtree[p][1]]+=1;
}

//images

let terrainImages;

let fogImg;
let ghoulImg;

let startImg;

function setup(){
    t1=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/drygrass.png');
    t2=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/drygrass2.png');
    t3=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/grasswasteland.png');
    t4=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/lake.png');
    t5=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/wasteland.png');
    t6=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/wastelandruin.png');
    
    basic_hut=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/basic-hut.png');
    hunter=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/hunter.png');
    logger=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/logger.png');
    thinker=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/thinker.png');

    fogImg=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/fog.png');
    ghoulImg=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/ghoul.png');
    startImg=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/start-img.png');
    console.log('Clearing the Skies - version 0.6.2');
    createCanvas(w,h);
    noStroke();
    makegrid();
    clearfog();
    scatterghouls();
    textFont('monospace');
    noSmooth();
}

let currentStructure = 0;
let selectedStructure = Object.keys(structures)[currentStructure];

Object.filter = function( obj, predicate) {
    var result = {}, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
};

Array.prototype.contains = function(value) {
    for(var i=0; i< this.length; i++){
        if(this[i].toString()===value.toString()){
            return true;
        }
    }
    return false;
}

function makegrid(){
    for(let i=0;i<gw;i++){
        n = [];
        for(let j=0;j<gh;j++){
            n.push(round(Math.random()*(6-1))+1);
            fogs.push([i,j,1]);
        }
        grid.push(n);
    }
}

function scatterghouls(){
    for(let i=0;i<50;i++){
        ghouls.push([round(Math.random()*gw),round(Math.random()*gh)]);
    }
}

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
            //objects.splice(x,1);
            return true;
        }
    }
    for(let n=0;n<uniqueobjects.length;n++){
        if(i===uniqueobjects[n][1]&&j===uniqueobjects[n][2]){
            return true;
        }
    }    
    return false;
}

function nearGhoul(){
    if(currentStory===false){
        for(let k=0; k<3; k++){
            for(let i=0; i<ghouls.length;i++){
                for(let j=0; j<objects.length;j++){
                    if(Math.hypot(ghouls[i][0]-objects[j]['x'],ghouls[i][1]-objects[j]['y'])<=1.5){
                        currentGhoul = i;
                    }
                }
            }
        }
    }
}

function nearUnique(){
    if(currentStory===false){
        for(let k=0; k<3; k++){
            for(let i=0; i<uniqueobjects.length;i++){
                if(uniqueobjects[i][3] === false){
                    for(let j=0; j<objects.length;j++){
                        if(Math.hypot(uniqueobjects[i][1]-objects[j]['x'],uniqueobjects[i][2]-objects[j]['y'])<=1){
                            uniqueobjects[i][3] = true;
                            currentStory = uniqueobjects[i][4].split(' ');
                        }
                    }
                }
            }
        }
    }
}

function isInFog(i,j){
    for(let k=0;k<fogs.length;k++){
        if(fogs[k][0]===i&&fogs[k][1]===j){
            return true;
        }
    }
    return false;
}

function placeObject(){
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(mouseX>i*wd+offsetX&&mouseX<i*wd+wd+offsetX&&mouseY>j*hd+offsetY&&mouseY<j*hd+hd+offsetY){
                if(isInFog(i,j)===false){
                    if(objectExists(i,j)===false){
                        if(resources['Wood']>=structures[selectedStructure][2]*difficulty && population['Available']>20){
                            objects.push({'type':selectedStructure,'x':i,'y':j});
                            resources['Wood']-=structures[selectedStructure][2]*difficulty;
                            //population['Working']-=20;
                            population['Available']-=20;
                            //difficulty=Math.round(difficulty*1.75);
                            clearfog();
                            nearGhoul();
                            nearUnique();
                        }
                        else{
                            currentAlert='Not enough resources!';
                        }
                    }
                }
                else{
                    currentAlert="Can't build in unexplored areas!";
                }
            }
        }
    }
}

/* Menu Drawing Functions */

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

        //population title block
        fill(100,100,255);
        textSize(20);
        text("Population",w-menuWidth+20,20);
        
        textSize(15);
        fill(255);
        let itemPos = 50;

        for(var key in population){
            text(key+': '+population[key].toString(),w-menuWidth+20,itemPos);
            if(buttonHovered(w-menuWidth+20,itemPos,menuWidth-20,20)){
                currentDescription = key+' Population';
            }
            itemPos += 20;
        }

        //resources title block
        fill(100,100,255);
        textSize(20);
        text("Resources",w-menuWidth+20,120);

        //resource listing
        textSize(15);
        fill(255);
        itemPos = 150;

        for(var key in resources){
            text(key+': '+resources[key].toString(),w-menuWidth+20,itemPos);
            if(buttonHovered(w-menuWidth+20,itemPos,menuWidth-20,20)){
                currentDescription = key;
            }
            itemPos += 20;
        }

        //Research Tree Button
        if(buttonHovered(w-menuWidth+20,220,menuWidth-40,30)){
            fill(100,100,255);
            if(buttonClicked(w-menuWidth+20,220,menuWidth-40,30)){
                treeopen = true;
            }
        }
        else{
            fill(100,255,100);
        }
        rect(w-menuWidth+20,220,menuWidth-40,30);
        fill(0);
        textSize(20);
        text("R&D",w-menuWidth+25,225);

        //structure title block
        fill(100,100,255);
        textSize(20);
        text("Structures",w-menuWidth+20,260);

        //structure listing
        textSize(15);
        itemPos = 290;

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
        //if(popupOpen===false){
        //    currentDescription = false;
        //}
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

function drawTechtree(){
    if(treeopen){
        clearClick = true;
        textAlign(LEFT,TOP);

        //main rect
        fill(0,230);
        rect(0,0,w,h);

        //nodes
        textSize(15);
        textAlign(CENTER,CENTER);
        for(let i=0;i<techtree.length;i++){
            let owned;
            if(researched.includes(techtree[i][0])){
                fill(100,255,100);
                owned = '[Owned]';
            }
            else if(researched.includes(techtree[i][3])){
                fill(100);
                owned = '[Click to Research]';
            }
            else{
                fill(70);
                owned = '[Requires '+techtree[i][3]+']';
            }
            let currentCrowdedness = levelCrowdedness[techtree[i][1]];
            let yVal=techtree.filter((z)=>{return z[1]==techtree[i][1];});
            yVal=yVal.sort((a,b)=>a[2]-b[2]).findIndex((x)=>{return techtree[i]==x;})+1;
            yVal*=20+(h-20-50-20)/(currentCrowdedness+1);
            rect(techtree[i][1]*120+mOffsetX,yVal+mOffsetY,100,50);
            fill(0);
            text(techtree[i][0],techtree[i][1]*120+mOffsetX+100/2,yVal+mOffsetY+50/2);

            if(buttonHovered(techtree[i][1]*120+mOffsetX,yVal+mOffsetY,100,50)){
                let structs = 'None';
                structs = Object.keys(Object.filter(structures,(x)=>{return techtree[i][0]==x[4]})).toString().replace(/[,]/g," \n - ");
                currentDescription = techtree[i][0]+' \n \nCost: '+techtree[i][2].toString()+' Science \nStructures: \n - '+structs+' \n \n'+owned;
            }
            if(buttonClicked(techtree[i][1]*120+mOffsetX,yVal+mOffsetY,100,50)){
                if(researched.includes(techtree[i][0])==false&&researched.includes(techtree[i][3])){
                    researched.push(techtree[i][0]);
                    resources['Science™']-=techtree[i][2];
                }
            }
        }

        textAlign(LEFT,TOP);
        //title-block
        textSize(30);
        fill(100,100,255);
        text('Idea Factory',20,20);

        //exit-button
        textAlign(CENTER,CENTER);
        textSize(20);
        if(buttonHovered(w-100,20,80,30)){
            fill(100,255,100);
        }
        else{
            fill(255,100,100);
        }
        rect(w-100,20,80,30);
        fill(0);
        text('Exit',w-100,20,80,30);
        if(buttonClicked(w-100,20,80,30)){
            treeopen = false;
            mOffsetX = 20;
            mOffsetY = 0;
            mpoffsetX = 20;
            mpoffsetY = 0;
        }
    }
}

/* Map Drawing Functions */

function drawObjects(){
    for(let i=0;i<objects.length;i++){
        //fill(structures[objects[i]['type']][0]);
        //rect(objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY,wd-10,hd-10);
        //rect(objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY+hd-wd,wd-10,wd-10);
        image(window[objects[i]['type']],objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY+hd-wd,wd-10,wd-10);
    }
}

function drawUniques(){
    for(let i=0;i<uniqueobjects.length;i++){
        fill(255,255,100);
        //rect(objects[i]['x']*wd+5+offsetX,objects[i]['y']*hd+5+offsetY,wd-10,hd-10);
        rect(uniqueobjects[i][1]*wd+5+offsetX,uniqueobjects[i][2]*hd+5+offsetY+hd-wd,wd-10,wd-10);
    }
}

function drawfog(){
    for(let i=0; i<fogs.length;i++){
        tint(255,200+55*fogs[i][2]);
        if(fogs[i][0]*wd+offsetX+wd>0&&fogs[i][1]*hd+offsetY+hd>0&&fogs[i][0]*wd+offsetX<w&&fogs[i][1]*hd+offsetY<h){
            image(fogImg,fogs[i][0]*wd+offsetX,fogs[i][1]*hd+offsetY,wd,hd);
        }
    }
}

function clearfog(){
    for(let k=0; k<3; k++){
        for(let i=0; i<fogs.length;i++){
            for(let j=0; j<objects.length;j++){
                if(Math.hypot(fogs[i][0]-objects[j]['x'],fogs[i][1]-objects[j]['y'])<=2.0){
                    fogs.splice(i,1);
                }
                if(Math.hypot(fogs[i][0]-objects[j]['x'],fogs[i][1]-objects[j]['y'])<=4.0){
                    fogs[i][2] = 0;
                }
            }
        }
    }
}

function drawgrid(){
    background(90);
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(i*wd+offsetX+wd>0&&j*hd+offsetY+hd>0&&i*wd+offsetX<w&&j*hd+offsetY<h){
                if(fogs.contains([i,j,1])===false){
                    image(window['t'+grid[i][j].toString()],i*wd+offsetX,j*hd+offsetY,wd,hd);
                }
            }
        }
    }
}

function drawGhouls(){
    tint(255,230);
    for(let i=0;i<ghouls.length;i++){
        if(ghouls[i][0]*wd+offsetX+wd>0&&ghouls[i][1]*hd+offsetY+hd>0&&ghouls[i][0]*wd+offsetX<w&&ghouls[i][1]*hd+offsetY<h){
            //image(ghoulImg,ghouls[i][0]*wd+5+offsetX,ghouls[i][1]*hd+5+offsetY,wd-10,hd-10);
            if(fogs.contains([ghouls[i][0],ghouls[i][1],0])===false&&fogs.contains([ghouls[i][0],ghouls[i][1],1])===false){
                image(ghoulImg,ghouls[i][0]*wd+5+offsetX,ghouls[i][1]*hd+5+offsetY+hd-wd,wd-10,wd-10);
            }
        }
    }
}

function drawCursor(){
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(mouseX>i*wd+offsetX&&mouseX<i*wd+wd+offsetX&&mouseY>j*hd+offsetY&&mouseY<j*hd+hd+offsetY){
                if(isInFog(i,j)===false){
                    fill(100,100,255,100);
                }
                else{
                    fill(100,100);
                }
                rect(i*wd+offsetX,j*hd+offsetY+hd-wd,wd,wd);
            }
        }
    }
}

function drawStart(){
    background(50);
    //image(startImg,-(500*h/213-w)/2,0,500*h/213,h)
    textSize(30);
    fill(255,100);
    //rect(70,h/2-90/2-30,w-140,50);
    fill(255);
    text('Clearing the Skies',70,h/2-90/2);
    
    textSize(10);
    text('v.0.6.0',70,h/2-90/2+30);
    
    textSize(20);
    if(buttonHovered(70,h/2-90/2+60,w-140,50)){
        fill(100,100,255);
    }
    else{
        fill(100,255,100);
    }
    rect(70,h/2-90/2+60,w-140,50);
    fill(0);
    text("Press to Start",80,h/2-90/2+90);
    if(buttonClicked(70,h/2-90/2+60,w-140,50)){
        startScreen = false;
        clearClick = true;
        objects.push({'type':'basic_hut','x':Math.round(gw/2),'y':Math.round(gh/2)});
        clearfog();
    }
}

function gridDrag(){
    if(treeopen){
        mOffsetX = mouseX-prevMouseX+mpoffsetX;
        mOffsetY = mouseY-prevMouseY+mpoffsetY;
    }
    else{
        offsetX = mouseX-prevMouseX+poffsetX;
        offsetY = mouseY-prevMouseY+poffsetY;        
    }
}

/* Managers */

function resourceManagement(){
    if(currentStory===false){
        for(let i=0;i<objects.length;i++){
            switch(objects[i]['type']){
                case 'basic_hut':
                    if(resources['Food']>=2){
                        population['Available']++;
                        population['Total']++;
                        resources['Food']-=2;
                    }
                    else{
                        currentAlert='Not enough food; population generation stopped';
                    }
                    break;
                case 'hunter':
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
                    break;
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
}

function alertManager(){
    if(currentAlert){
        fill(0,0,0,alertFade);
        rect(w/4,0,w/2,50);
        textSize(20);
        text(currentAlert,w/4+10,10,w/2-20,50);
        alertFade-=2;
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
        text(storyString,50,50,w-100,h-120);
        if(storyCtr<currentStory.length){
            storyString += currentStory[storyCtr]+' ';
            storyCtr+=1;
        }
        else{
            if(buttonHovered(40,h-60,w-80,50)){
                fill(100,100,255,200);
            }
            else{
                fill(100,255,100,150);
            }
            rect(40,h-60,w-80,50);
            fill(0);
            text("[Please Press this Button]",45,h-50);
            if(buttonClicked(40,h-60,w-80,50)){
                currentStory=false;
                storyString = '';
                storyCtr=0;
                clearClick=true;
            }
        }
    }
}

function descriptionManager(){
    if(currentDescription){
        textAlign(LEFT,TOP);
        textSize(15);
        fill(255, 213, 74,200);
        let desSeg = '';
        let bl = 0;
        for(let ch = 0; ch<=currentDescription.split(' ').length; ch++){
          if(textWidth(desSeg)>=180){
            bl+=1;
            desSeg = currentDescription.split(' ')[ch-1]+' ';
          }
          //console.log(desSeg);
          if(currentDescription.split(' ')[ch]==='\n'){
              bl+=1;
          }
          desSeg+=currentDescription.split(' ')[ch]+' ';
          
        }
        bl+=1;
        //let bl = Math.ceil(bw/200)+1;
        let bh = bl*textSize()/0.75;
        let dx = mouseX;
        let dy = mouseY;
        if(w-mouseX<200){
            dx = mouseX-200;
        }
        if(h-mouseY<bh+20){
            dy = mouseY-bh;
        }
        rect(dx,dy,200,bh+20);
        fill(0);
        text(currentDescription,dx+10,dy+10,200-20,bh);
    }
}

function ghoulManager(){
    if(currentGhoul&&chosenWeapon){
        fill(30,230);
        rect(40,20,w-80,h*3/4);
        fill(255);
        textSize(20);
        text('You chose '+ghoulWeapons[chosenWeapon-1],60,30,w-100,h);
        
        if(defeated===0){
            defeated=-1;
        }
        let ghoulChoice = chosenWeapon-1+defeated;
        if(chosenWeapon-1+defeated>ghoulWeapons.length-1){
            ghoulChoice = (chosenWeapon-1+defeated)%ghoulWeapons.length;
        }
        if(chosenWeapon-1+defeated<0){
            ghoulChoice = ghoulWeapons.length+(chosenWeapon-1+defeated);
        }
        text('Ghoul chose '+ghoulWeapons[ghoulChoice],60,60,w-100,h);
        if(defeated===-1){
            ghouls.splice(currentGhoul,1);
            text('The ghoul vanishes in a puff of purple smoke!',60,90,w-100);
        }
        if(defeated===1){
            text('The ghoul is angered and stomps on a bunch of people!',60,90,w-100);
            ghouls.splice(currentGhoul,1);
        }
        
        if(buttonHovered(40,h-60,w-80,50)){
            fill(100,100,255,200);
        }
        else{
            fill(100,255,100,150);
        }
        rect(40,h-60,w-80,50);
        fill(0);

        text("[Please Press this Button]",45,h-50);
        if(buttonClicked(40,h-60,w-80,50)){
            if(defeated===-1){
                resources['Wood']+=50;
                resources['Food']+=20;
                currentAlert = "You gain 50 Wood from scavenging the ghoul's treasure hoard!";
            }
            else{
                currentAlert = 'You lose 20 population!';
                population['Total']-=20;
                population['Available']-=20;
            }
            currentGhoul=false;
            chosenWeapon=false;
            defeated = false;
            clearClick=true;
        }
        clearClick=true;
    }
    if(currentGhoul&&chosenWeapon===false){
        fill(30,230);
        rect(40,20,w-80,h*3/4);
        fill(255);
        textSize(20);
        text('A Ghoul is near! What weapon will you use?',60,30,w-100,h);
        let choiceboxwidth = (w-160)/3;
        for(let i=0;i<ghoulWeapons.length;i++){
            if(buttonHovered(60+i*(choiceboxwidth+20),60,choiceboxwidth,h*3/4-100)){
                fill(27, 222, 222);
            }
            else{
                fill(222, 73, 138, 200);
            }
            if(buttonClicked(60+i*(choiceboxwidth+20),60,choiceboxwidth,h*3/4-100)){
                chosenWeapon = i+1;
                defeated = Math.round(Math.random());
            }
            rect(60+i*(choiceboxwidth+20),60,choiceboxwidth,h*3/4-100);
            fill(0);
            text(ghoulWeapons[i],70+i*(choiceboxwidth+20),70);
        }
        clearClick=true;
    }
}

function uniqueManager(){
    for(let i=0;i<uniqueobjects.length;i++){
        if(buttonHovered(uniqueobjects[i][1]*wd+5+offsetX,uniqueobjects[i][2]*hd+5+offsetY+hd-wd,wd-10,wd-10)){
            currentDescription=uniqueobjects[i][0]+' \n[Click to read]';
        }
        if(buttonClicked(uniqueobjects[i][1]*wd+5+offsetX,uniqueobjects[i][2]*hd+5+offsetY+hd-wd,wd-10,wd-10)){
            currentStory=false;
            storyCtr = 0;
            storyString = '';
            currentStory=uniqueobjects[i][4].split(' ');
        }
    }
}

setInterval(resourceManagement,2000);
setInterval(nearGhoul,2000);
//setInterval(nearUnique,2000);

/* p5 functions*/

function mouseClicked(){
    if(buttonHovered(0,0,w,h)){
        if(mouseButton===LEFT&&clearClick===false){
            if(menuOpen&&mouseX<w-menuWidth||menuOpen===false){
                placeObject();
            }
        }
        clearClick = false;
    }
}

function mousePressed(){
    if(mouseButton===RIGHT){
        drag = true;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
}

function mouseReleased(){
    if(mouseButton===RIGHT){
        drag = false;
        poffsetX = offsetX;
        poffsetY = offsetY;
        mpoffsetX = mOffsetX;
        mpoffsetY = mOffsetY;
    }
}

function mouseWheel(){
    if(event.delta<0){
        wd+=5;
        hd+=5;
    }
    else{
        wd-=5;
        hd-=5;
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


function windowResized() {
    if(window.innerWidth<=800){
        w = window.innerWidth-40;
    }
    else{
        w = window.innerWidth/2;
    }
    resizeCanvas(w, 500);
}

function draw(){
    currentDescription = false;
    if(startScreen){
        drawStart();
    }
    else{
        if(treeopen){
            drawTechtree();
            if(drag){
                gridDrag();
            }
            descriptionManager();
            alertManager();
        }
        else{
            drawgrid();
            drawUniques();
            drawfog();
            drawGhouls();
            drawObjects();
            drawCursor();
            drawMenu();
            if(drag){
                gridDrag();
            }
            uniqueManager();
            descriptionManager();
            storyManager();
            ghoulManager();
            alertManager();
        }
    }
}

// disable right-click menu appearing after dragging
window.addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; } );
