let gameseq=[];
let userseq=[];
let btns=["red", "yellow", "green","blue"];
let started= false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is started");
        started=true;
        levelup();
    }
});
function levelup(){
    userseq=[];//new level means new userseq. just like memory game
    level++;
    console.log("Level: ",level);
    h2.innerText=`Level ${level}`;
    //random btn choose
    let randidx=Math.floor(Math.random()*3);
    let randcolor=btns[randidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    /*console.log(randidx);
    console.log(randcolor);
    console.log(randbtn);*/
    gameseq.push(randcolor);
    console.log("Game Sequence",gameseq);
    btnFlash(randbtn);
}
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
}
//level 1 done->flash adding
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },1000);
}
function checkans(idx){
    //console.log("Current level: ",level);[value of level=number of gameseq ele and number of userseq ele]
    //let idx=level-1;
    if(userseq[idx]==gameseq[idx]){
        //console.log("Same Value!!");
        if(userseq.length==gameseq.length) {
            console.log("User Sequence: ",userseq);
            //check last element of the gameseq. if correct then leevelup
            setTimeout(levelup,1000);

        }
    }
    else {
        h2.innerHTML=`Game Over! Your Score was <b> ${level} </b> <br>Press any key to start.`;
        console.log("Game Over");
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress() {
    //console.log("btn was pressed");
    //console.log(this);
    let btn=this;//btn scope is just in this function
    userFlash(btn);
    usercolor= btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);
    checkans(userseq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    document.addEventListener("keypress",function(){
        console.log("Game Reset");
        started=false;
        gameseq=[];//gamesequence empty.random seq now can story from beginning
        userseq=[];
        level=0;
        if(started==false){
            console.log("Start the game from beginning!");
            started=true;
            levelup();
        }
    });
}