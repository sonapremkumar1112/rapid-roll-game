const canvas = document.getElementById('canvas1');
canvas.height=window.innerHeight-40;
canvas.width = window.innerWidth;

const canvas2=document.getElementById('canvas2');
canvas2.height=35;
canvas2.width = 125;

const button=document.getElementById("button");

var restartHit=false;

var d= canvas2.getContext("2d");

class Life2{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }

    draw(){
        d.beginPath();
        d.arc(this.x-this.radius-0.75,this.y-this.radius*2.25,this.radius+0.75,-3.75,0,false);
        d.arc(this.x+this.radius-0.75,this.y-this.radius*2.25,this.radius+0.75,- Math.PI,1,false);
        d.lineTo(this.x,this.y);
        d.fillStyle=this.color;
        d.fill();
    }
}

var life2=[];
life2.push(new Life2(25,30,7,"red"));
life2.push(new Life2(65,30,7,"red"));
life2.push(new Life2(105,30,7,"red"));
life2.forEach((i)=>{
    i.draw();
})


function hearts(g){
    life2.forEach((i,index)=>{
        if(index<g){
            i.color="red";
            i.draw();
        }else{
            i.color="rgba(251, 255, 38, 0.85)";
            i.draw();
        }
    })
    
}

const p= document.getElementById("button");
const s = document.getElementById("output");
const r=document.getElementById("score");

var c = canvas.getContext('2d');
var score=0;

class Background{
    constructor(spikeBase,spikeHeight,color){
        this.spikeBase=spikeBase;
        this.spikeHeight=spikeHeight;
        this.color=color;
    }

    draw(){
        c.beginPath();
        c.moveTo(0,0);
        var k=0;
        for(var j=0; j<201; j++){
            if(j%2==0){
                c.lineTo((this.spikeBase)*j +2*k,0);
                k++;
                c.lineTo((this.spikeBase)*j +2*k,0);
    
            }else{
                c.lineTo((this.spikeBase)*j +2*k,this.spikeHeight);
            }
        }
        c.lineTo(0,0);
        c.fillStyle=this.color;
        c.fill();
    }

}

class Platform{
    constructor(x,y,w,h,velocity,color){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.velocity=velocity;
        this.color=color;
    }

    draw(){
        c.fillStyle=this.color;
        c.fillRect(this.x,this.y,this.w,this.h);
    }

    update(){
        this.y=this.y-this.velocity;
        this.draw();
    }
}

class Player{
    constructor(x,y,radius,velocity,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.velocity=velocity;
        this.color=color;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
    }

    fall(){
        for(var i=0; i<this.velocity; i++){
            this.y++;
            this.draw();
        }   
    }

    moveRight(d){
        for(var i=0; i<d; i++){
         this.x++;
         this.draw();
        }
    }

    moveLeft(d){
        for(var i=0; i<d; i++){
         this.x--;
         this.draw();
        }
    }

    moveUP(h){
        this.y=this.y-h;
        this.draw();
    }
}

class Particle{
    constructor(x,y,velocity){
        this.x=x;
        this.y=y;
        this.velocity=velocity;
        this.alpha=1;
    }

    draw(){
        c.save();
        c.globalAlpha=this.alpha;
        c.beginPath();
        c.arc(this.x,this.y,3,0,Math.PI*2,false);
        c.fillStyle="white";
        c.fill();
        c.restore();
    }

    update(){
        this.y=this.y+this.velocity.y;
        this.x=this.x+this.velocity.x;
        this.alpha-=0.02;
        this.draw();
    }
}

class Life{
    constructor(x,y,radius,velocity,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.velocity=velocity;
        this.color=color;
    }

    draw(){
        c.beginPath();
        c.arc(this.x-this.radius-0.75,this.y-this.radius*2.25,this.radius+0.75,-3.75,0,false);
        c.arc(this.x+this.radius-0.75,this.y-this.radius*2.25,this.radius+0.75,- Math.PI,1,false);
        c.lineTo(this.x,this.y);
        c.fillStyle=this.color;
        c.fill();
    }

    update(){
        this.y=this.y-this.velocity;
        this.draw();
    }
}
const colorBackGround="red";
const velocityPlatform= 2;
const colorPlatform="rgba(250,0,0)";
const velocityPlayer=2;
const colorPlayer="white";
const radiusPlayer= Math.min(canvas.width,canvas.height) /50;
var keyPressed='r';
var numLives=3;
const sideVelocity=6.5;

const life= new Life(0,0,7,velocityPlatform,"red");
life.draw();

const background = new Background(10,50,colorBackGround);
var player= new Player(canvas.width/2,0,radiusPlayer,velocityPlayer,colorPlayer);
player.draw();
background.draw();
console.log(player.radius)



window.addEventListener("keydown",(event)=>{
    if(event.keyCode==39){
        keyPressed="right";
    }
    else if (event.keyCode==37){
        keyPressed="left";
    }
})

var platforms=[];
var particles=[];
var lives=[];
lives[0]=life;
lives[1]=life;

function createPlatform(){
    setInterval(()=>{
    var a= Math.random()+0.25;
    var r=Math.min(canvas.width/5,250);
    var k= Math.min(canvas.width/5,100);
    var b=Math.random()*(r-k) + k;
    var c=Math.random()*canvas.width +2;
    if(c+b> canvas.width){
        platforms.push(new Platform(c-b-3,canvas.height,b,10,velocityPlatform,colorPlatform));
    }else{
        platforms.push(new Platform(c,canvas.height,b,10,velocityPlatform,colorPlatform));
    }

    if(a>1){
        b=Math.random()*(r-k) + k;
        c=c+ r+ 2*k;
        if(c+b> canvas.width){
            platforms.push(new Platform(c-b-3,canvas.height,b,10,velocityPlatform,colorPlatform));
        }else{
            platforms.push(new Platform(c,canvas.height,b,10,velocityPlatform,colorPlatform));
        }
    }
    },1200);

    setInterval(()=>{
        lives.pop();
        lives.push(new Life(platforms[platforms.length-1].x + platforms[platforms.length-1].w/2,platforms[platforms.length-1].y -5,7,velocityPlatform,"yellow"));
    },12000)
}




var i=0; 
var temp=false;

let aId;
function animateParticles(){
    aId=requestAnimationFrame(animateParticles);
    c.fillStyle="rgba(0,0,0,0.1)";
    c.fillRect(0,0,canvas.width,canvas.height);
    background.draw();
    life.draw();
    platforms.forEach((platform)=>{
        platform.draw();
    })

    particles.forEach((particle)=>{
          particle.update();
          if(particle.alpha<=0.02){
            particles=[];
            cancelAnimationFrame(aId);
          }
        })
}

let animationId;
function animate(){
    animationId= requestAnimationFrame(animate);
    c.fillStyle="rgba(0,0,0,0.1)";
    c.fillRect(0,0,canvas.width,canvas.height);
    
    if(keyPressed=="right"){
        if(player.x+5<canvas.width){
          player.moveRight(sideVelocity);
          keyPressed='r';
          temp=false;
        }
    }
    else if(keyPressed=="left"){
        if(player.x-5>0){
          player.moveLeft(sideVelocity);
          keyPressed='r';
          temp=false;
        }
    }

    platforms.forEach((platform,index)=>{
        if(platform.y<=-10){
            platforms.splice(index,1);
           }
        })


    platforms.forEach((platform)=>{
        platform.update();

        if(platform.y-(player.y+player.radius)<3 && platform.y-(player.y+player.radius)>-3){
            if(platform.x<player.x && platform.x + platform.w > player.x){
                player.moveUP(velocityPlatform);
                score+= velocityPlatform/10;
                r.innerHTML=score -  score%1;
                temp=true;
                if(player.y<= background.spikeHeight + 10){
                    for(var h=0; h<15; h++){
                        particles.push(new Particle(player.x,player.y,{
                            x: (Math.random()-0.5)*10,
                            y: (Math.random()-0.5)*10
                        }));
                    }
                    animateParticles();
                    numLives--;
                    hearts(numLives-1);

                    player.x=canvas.width/2;
                    player.y=background.spikeHeight + 20;
                
                    if(numLives<=0){
                        s.classList.add("yes");
                        s.innerHTML="Score: "+ (score- score%1);
                        p.style.top="55%" ;
                        p.style.left= "46%";
                        p.style.fontSize = "25px" ;
                        p.innerHTML="Restart";
                        restartHit=true;
                        cancelAnimationFrame(animationId);
                    }
                    
                    temp=false;
                }
            }
        } 
    })

    background.draw();
    
    lives.forEach((life)=>{
    if(Math.hypot(player.x-life.x,player.y-life.y)<=20){
        lives.pop();
        if(numLives<4){
            numLives++;
            hearts(numLives-1);
        }
    }else{
        life.update();
    }})

    if(!temp){
        player.fall();
        score+= (velocityPlatform + velocityPlayer)/10;
        r.innerHTML=score - score%1;
    }

    if(player.y>canvas.height){
        numLives--;
        hearts(numLives-1);
        player.x=canvas.width/2;
        player.y=0;
        if(numLives<=0){
            cancelAnimationFrame(animationId);
        }
    } 

}

var a=0;
p.addEventListener("click",()=>{
    a++;
    if(restartHit){
        s.classList.remove("yes");
        restartHit=false;
        p.style.top="10px" ;
        p.style.left= "50%";
        p.style.fontSize = "x-large" ;
    }
    cancelAnimationFrame(animationId);
    score=0;
    player= new Player(canvas.width/2,0,radiusPlayer,velocityPlayer,colorPlayer);
    player.draw();
    platforms=[];
    particles=[];
    lives=[];
    lives[0]=life;
    lives[1]=life;

    keyPressed='r';
    numLives=4;
    hearts(numLives-1);


    if(a==1){
        createPlatform();
    }
    console.log(player);
    temp=false;
    animate();
    p.innerHTML="Restart";
})

