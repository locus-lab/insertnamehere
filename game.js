//0.6.4: Fully Winnable Prototype

//canvas dimensions
let w = window.innerWidth/2;
let h = 500;

//grid dimensions
let gw = 70;
let gh = 30;

//cell dimensions
let wd = 100;
let hd = 100;

//gamemap array
//grid = [];

//structure array
objects = [];

//ghoul array
ghouls = [];

//special objects array

//[NAME,X,Y,READ,MESSAGE]

/*uniqueobjects = [
    ['Nuclear Killswitch',Math.round(gw/2)-3,Math.round(gh/2),false,'A green street sign lies half-buried in the ground. Its faded lettering reads: HALF-FOODS GROCERY STORE in 300 METERS. Turn RIGHT at the intersection.'],
    ['Ancient Advertisement',Math.round(gw/2),Math.round(gh/2)+4,false,'“Come buy your FRESH ORGANIC FRUITS at HALF-FOODS GROCERY STORE before disaster strikes! Take Route I-1101 Northwest.”'],
    ['Street Sign',Math.round(gw/2)-7,Math.round(gh/2),false,'A green street sign lies half-buried in the ground. Its faded lettering reads: HALF-FOODS GROCERY STORE in 300 METERS. Turn LEFT at the intersection.'],
    ['A Piece of Half-Burned Paper',Math.round(gw/2)-2,false,Math.round(gh/2)-4,'“Secret Military Outpost. 100 meters west. Meeting time January 10, 2045 - if humanity still exists.”'],
    ['Street Sign',Math.round(gw/2)-6,Math.round(gh/2)+1,false,'A plate of metal painted with words. The letters are faded, but still readable: “TOTALLY NOT SUSPICIOUS MILITARY BASE IN 200 METERS. GO SOUTHWEST.”'],
    ['Street Sign',Math.round(gw/2)-2,Math.round(gh/2)-10,false,`An entry from a journal: "The bombs have hit. If anyone's left after this tragedy, go to my laboratory. I've been working on some things there..."`]
];*/

uniqueobjects = [
    ['Nuclear Killswitch',67,6,false,''],
    ['Grocery Store',37,27,false,['While the majority of the green lettering on the ancient sign had crumbled, you can still make out the words ‘Half Foods Grocers: food for twice the price”. After busting through the window, your crew explores the rest of the store, staying away from the gaping hole in the ceiling from which small metal fragments periodically tumble.','In one of the few cash registers that avoided rust brought on by the torrential rain, you find a small cloth-bound notebook. The majority of the pages have been hastily torn out or faded by the elements- but you manage to make out some sparse lettering: They’ve finally done it. Those little ***** have dropped them on us. The radio says eighty minutes until all heck breaks loose. I’m going to go find Dan and see if he knows anything else. After that, the ink veers off the page. You shut the book and hide it away, but it remains open in your mind for hours. Who was this person?']],
    ['Ballistic Early Warning System Tower',34,3,false,["In spite of the darkness of night, it's the tallest thing you’ve ever seen - one of your group claims that as a child he lived in the ruins of massive stone giants miles taller than this one, but he’s well known for his ridiculous tales. The concrete tower juts out of the ground at an angle, and ivy snakes up its walls. Despite its formidable appearance, it is easily entered through one of the many gaping holes in its side.","After ascending the winding spiral staircase for what seems like forever, you and your team of reckless villagers see a source of light emanating from a small room marked ‘WC’. Inside, near the porcelain remains of a sink, lies a small monitor - its screen fractured down the middle yet nevertheless giving out the distinct blue glow that the people of the past seemed to obsess over. You lean down, the only one in the group brave enough to attempt interaction with it - and press one of the many buttons that seem to have been embedded in a square below it. Suddenly, it lights up, claiming in the same writing of the journal claiming the presence of a ‘thermonuclear’ threat in the region. Shocked, you and your team look around the room - but it appears to have deceived you. Minutes pass, and all of your team members look as bored yet intact as usual.","Weary of further lies, you probe the monitor slowly- at first stirring up unhappy SYNTAX ERRORs but eventually managing to open a small journal- timestamped the day of the tragedy. You begin to read.",`03/05:
    Sarah’s been a little under the weather recently, so I took a day off to make her some of my ‘world famous’ chili. BIG MISTAKE. As soon as I got back in, I had to deal with a screaming colonel. We’d been moved to DEFCON-2 over the day off.
    03/06:
    The constant yelling around here is driving me mad. I’ve moved my office to the old water closet (that’s the bathroom for the Americans who have to read this) just to avoid the near constant yelling of the sergeant.  Honestly, I think he’s just as scared as the rest of us, and he just doesn’t know what to do with his fears.
    03/09:
    We’re ENGAGED! She accepted! 
    03/11:
    I… I don’t even know what to think. The entire country has been moved to DEFCON-1. It’s only a matter of time, now. Sarah’s not picking up her phone. I’m going to find her.
    03/11 (Supplemental): 
    It’s happened. I have to save her.
    `]],
    ['Laboratory',66,6,false,['Something tells you that you are nearly there - perhaps it is just a block away.']],
    ['Ancient Advertisement',37,23,false,['“Come buy your FRESH ORGANIC FRUITS at HALF-FOODS GROCERY STORE before disaster strikes! Take Route I-1101 four blocks south.”']],
    ['Street Sign',34,13,false,['A plate of metal painted with words. The letters are faded, but still readable: “TOTALLY NOT SUSPICIOUS MILITARY TOWER IN 10 BLOCKS. GO NORTH.”']],
    ['Street Sign',37,17,false,['A green street sign lies half-buried in the ground. Its faded lettering reads: HALF-FOODS GROCERY STORE in 10 BLOCKS SOUTH.']]
]


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
let currentStory = [`After hundreds of years of walking through the ruined earth, passing stories down from generation to generation, the nomadic lifestyle seems like the only way of life. But it is time to settle down - time to heal the earth, bring back the ways of our fathers, to part the fog that obscures the earth and blots the sun. You have been chosen as the leader of a small colony - defend it at all costs.`];
//currentStory = currentStory.split(' ');
let storyString = '';
let storyCtr = 0;
let currentPage = 0;

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

//end sequence
let endText = `Starting WINDOWS XP (2000 GATEWAY EDITION)...
Completed.
Loading "DansSecretStuffDontTouch" libraries...
Sorted.
Analyzing Situation...
Completed.
What in the world happened ... to the world?
This place is a mess. Has it not been cleaned in five hundred and thirty eight years?
According to my records... yes.
Oh well.
I guess I'll just do the best I can.
Undropping nuclear weapons...
Awakening deep-sea kraken...
Messing with physics...
Undoing stupid stuff that people did...
Completed.
Activating Nuclear Killswitch...`;
let endCtr = 0;
let endString = '';
let end_triggered = false;

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

//control buttons

let moveswitched = true;

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
    t0=loadImage('https://raw.githubusercontent.com/locus-lab/insertnamehere/master/images/ocean.png');
    
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
    //makegrid();
    makefog();
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
    grid = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,6,5,5,5,5,5,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,5,5,5,5,5,5,5,-1,-1],[-1,-1,-1,-1,-1,-1,-1,2,2,2,3,5,5,5,6,5,6,5,-1,-1],[-1,-1,-1,-1,-1,-1,-1,2,-1,2,3,5,5,5,5,5,5,-1,-1,-1],[-1,-1,-1,-1,-1,-1,2,2,-1,-1,0,-1,-1,-1,-1,5,-1,-1,-1,-1],[-1,-1,-1,-1,-1,2,2,-1,-1,-1,-1,-1,-1,-1,-1,5,-1,-1,-1,-1],[-1,-1,-1,-1,-1,2,2,-1,-1,-1,-1,-1,-1,-1,5,5,5,-1,-1,-1],[-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,5,5,5,5,5,-1,-1],[-1,-1,-1,-1,-1,1,-1,-1,-1,-1,-1,-1,5,5,6,6,6,5,-1,-1],[-1,-1,-1,-1,1,1,-1,-1,2,2,2,-1,5,5,6,6,6,5,-1,-1],[-1,-1,-1,-1,1,1,-1,-1,2,2,2,2,5,5,5,5,5,5,-1,-1],[-1,-1,-1,-1,0,6,6,2,2,4,2,2,5,5,5,5,5,5,-1,-1],[-1,-1,-1,-1,-1,6,6,2,2,2,2,2,5,5,1,2,2,2,-1,-1],[-1,-1,-1,-1,-1,-1,-1,2,2,2,2,4,5,5,2,2,2,2,2,-1],[-1,-1,-1,-1,-1,-1,-1,2,2,5,5,5,5,5,2,2,2,2,2,-1],[-1,-1,-1,-1,-1,-1,-1,-1,2,2,5,5,5,5,2,2,2,2,2,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,2,2,2,2,2,2,2,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,2,2,2,2,4,2,2,2],[-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,2,2,2,2,2,2,2,2],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,4,2,2,2,2,2,2],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,2,2,2,2,2,2],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,2,2,2,4,2,2],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,2,2,2,2,2,2,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,5,5,2,2,2,2,2,-1],[-1,-1,-1,-1,-1,-1,-1,-1,2,3,5,5,5,5,5,5,2,2,-1,-1],[-1,-1,-1,-1,-1,-1,-1,2,2,3,5,5,5,5,6,5,2,-1,-1,-1],[-1,-1,-1,-1,-1,-1,2,2,2,3,5,5,6,5,5,5,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,2,2,2,3,5,5,5,5,5,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,2,2,2,-1,-1,-1,5,5,-1,-1,-1,5,5,5],[-1,-1,-1,-1,-1,-1,-1,2,2,2,-1,-1,-1,-1,-1,-1,-1,5,5,5],[-1,-1,-1,-1,-1,-1,2,4,4,2,2,-1,-1,-1,-1,-1,-1,5,5,6],[-1,-1,-1,-1,-1,-1,2,2,4,4,2,1,2,-1,-1,-1,-1,-1,-1,5],[-1,-1,-1,-1,-1,-1,-1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,5],[-1,-1,-1,-1,-1,-1,-1,-1,2,2,-1,2,2,-1,-1,-1,-1,-1,-1,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,1,1,-1,-1,5,5,-1,-1,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,6,6,1,1,-1,-1,6,5,-1,-1,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,6,5,1,-1,-1,-1,5,5,-1,-1,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,-1,-1,-1,-1,5,-1,-1,5,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,5,5,-1,-1,5,-1,-1,5,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,5,5,5,-1,5,5,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,6,5,5,5,5,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,5,-1,-1,5,5],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];
}

function makefog(){
    let k;
    for(let i = 0; i<gh; i++){
        k = [];
        for(let j=0; j<gw; j++){
            k.push(1);
        }
        fogs.push(k);
    }
    console.log(fogs);
}

function scatterghouls(){
    for(let i=0;i<50;i++){
        ghouls.push([round(Math.random()*gw),round(Math.random()*gh)]);
    }
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
        clearfog(Math.round(gw/2),Math.round(gh/2));
    }
}

/* Movement Functions */
function virtualKeyboard(){
    
}

function moveSwitch(){
    if(moveswitched){
        fill(100,100,255);
        rect(20,h-100,60,40);
        fill(100,100,100);
        rect(80,h-100,60,40);
    }
    if(moveswitched==false){
        fill(100,100,100);
        rect(20,h-100,60,40);
        fill(100,100,255);
        rect(80,h-100,60,40);
    }
}

function virtualScroll(){

}

/* Minimap */
function miniMap(){
    
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
        for(let j=0; j<fogs[i].length;j++){
            //if(fogs[i][j]>=0){
                if(j*wd+offsetX+wd>0&&i*hd+offsetY+hd>0&&j*wd+offsetX<w&&i*hd+offsetY<h){
                    tint(255,205+50*fogs[i][j]);
                    image(fogImg,j*wd+offsetX,i*hd+offsetY,wd,hd);
                }
            //}
        }
    }
}

function clearfog(x,y){
    for(let i=0; i<fogs.length;i++){
        for(let j=0; j<fogs[i].length;j++){
            if(fogs[i][j]>=0){
                if(Math.hypot(j-x,i-y)<=2.0){
                    fogs[i][j] = -3;
                }
                else if(Math.hypot(j-x,i-y)<=4.0){
                    fogs[i][j] = 0;
                }
            }
        }
    }
}

function drawbackground(){
    background(0);
    for(let i=0;i<=w/wd+2;i++){
        for(let j=0;j<=h/hd+2;j++){
            image(t0,(i-1)*wd+offsetX%wd,(j-1)*hd+offsetY%hd,wd,hd);
        }
    }
}

function drawgrid(){
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(grid[i][j]!=-1){
                if(i*wd+offsetX+wd>0&&j*hd+offsetY+hd>0&&i*wd+offsetX<w&&j*hd+offsetY<h){
                    if(fogs[j][i]<=0){
                        image(window['t'+grid[i][j].toString()],i*wd+offsetX,j*hd+offsetY,wd,hd);
                    }
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
    if(mouseButton===RIGHT||keyIsPressed){
        drag = true;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
}

function mouseReleased(){
    if(mouseButton===RIGHT||keyIsPressed){
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
    if(key==='w'){
        offsetY+=hd;
        poffsetY+=hd;
        console.log('w');
    }
    if(key==='s'){
        offsetY-=hd;
        poffsetY-=hd;
    }
    if(key==='a'){
        offsetX+=wd;
        poffsetY-=wd;
    }
    if(key==='d'){
        offsetX-=wd;
        poffsetY+=wd;
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
                            currentStory = uniqueobjects[i][4];
                        }
                    }
                }
            }
        }
    }
}

function isInFog(i,j){
    if(fogs[j][i]>=0){
        return true;
    }
    return false;
}

function placeObject(){
    for(let i=0;i<gw;i++){
        for(let j=0;j<gh;j++){
            if(mouseX>i*wd+offsetX&&mouseX<i*wd+wd+offsetX&&mouseY>j*hd+offsetY&&mouseY<j*hd+hd+offsetY){
                if(isInFog(i,j)===false){
                    if(objectExists(i,j)===false){
                        if(resources['Wood']>=structures[selectedStructure][2]*difficulty && population['Available']>10){
                            objects.push({'type':selectedStructure,'x':i,'y':j});
                            resources['Wood']-=structures[selectedStructure][2]*difficulty;
                            //population['Working']-=20;
                            population['Available']-=10;
                            population['Working']+=10;
                            //difficulty=Math.round(difficulty*1.75);
                            clearfog(i,j);
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
        if(storyCtr<currentStory[currentPage].split(' ').length){
            storyString += currentStory[currentPage].split(' ')[storyCtr]+' ';
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
                storyString = '';
                storyCtr=0;
                clearClick=true;
                if(currentPage===currentStory.length-1){
                    currentStory=false;
                    currentPage=0;
                }
                else{
                    currentPage+=1;
                }
            }
        }
    }
}

function endManager(){
    if(end_triggered){
        fill(0,0,0,200);
        background(0,0,0);
        fill(255);
        textSize(12);
        text(endString,50,50,w-100,h-120);
        if(endCtr<endText.length){
            endString += endText[endCtr];
            endCtr+=1;
        }
        else{
            console.log('Ending Sequences Ended');
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
            currentStory=uniqueobjects[i][4];
            if(uniqueobjects[i][0]==='Nuclear Killswitch'){
                end_triggered = true;
            }
        }
    }
}

setInterval(resourceManagement,2000);
setInterval(nearGhoul,2000);

// v~~ : Terrain Test

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
            if(end_triggered){
                endManager();
            }
            else{
                drawbackground();
                drawgrid();
                drawUniques();
                drawfog();
                drawGhouls();
                drawObjects();
                drawCursor();
                drawMenu();
                //moveSwitch();
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
}

// disable right-click menu appearing after dragging
window.addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; } );
