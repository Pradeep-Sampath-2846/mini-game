const playerElm =document.getElementById('player');
const groundElm =document.getElementById('ground');
let dx=0;
let dy =2;
let dz=0;
let acceleration=0.1;
let index=1;


const draw=()=>{
    dy=dy+acceleration;
    if(index>7) index=1;
    
    if(dy<0){
        playerElm.style.backgroundImage=`url(/img/templerun/Jump__00${index++}.png)` 
    }else if(dz===5){
        playerElm.style.backgroundImage=`url(/img/templerun/Slide__00${index++}.png)`

    }else if(dx===0){
        playerElm.style.backgroundImage=`url(/img/templerun/Idle__00${index++}.png)`
    }else{
        playerElm.style.backgroundImage=`url(/img/templerun/Run__00${index++}.png)`
    }
    requestAnimationFrame(draw); 
}

const animate=()=>{
    if((playerElm.offsetLeft+playerElm.offsetWidth)>innerWidth){
        dx=0;
        playerElm.style.left=`${innerWidth-playerElm.offsetWidth}px`;
    } else if(playerElm.offsetLeft<0){
        dx=0;
        playerElm.style.left='0';
    }
    
    if((playerElm.offsetTop+playerElm.offsetHeight)>groundElm.offsetTop){
        dy=0;
        playerElm.style.top=`${groundElm.offsetTop-playerElm.offsetHeight}px`
    }
    
    playerElm.style.left=`${playerElm.offsetLeft+dx}px`;
    playerElm.style.top=`${playerElm.offsetTop+dy}px`;

    requestAnimationFrame(animate);
    
    
}

  addEventListener('keydown',({key})=>{
    if(key=='ArrowRight'){
        dx =5;
        index=1;
        playerElm.classList.remove('turn');

    }else if(key =='ArrowLeft'){
        dx=-5;
        index=1;
        playerElm.classList.add('turn');
    }else if(key=='f'){
        dz=5;
    }
  });

  addEventListener('keyup',({key})=>{
    if(key=='ArrowRight' || key =='ArrowLeft'){
        dx=0;
        dz=0;
    }
  });

  addEventListener('keypress',({key})=>{
    if(key== ' '){
        dy=-10;
        acceleration=0.3;
    }
  });

  requestAnimationFrame(draw);
  requestAnimationFrame(animate);

/* constroling request AnimationFrame time */

   let j=0;

   let t1=0;
   const interval=2;   /* time iterval */

  function repaint(timestamp){
    if(!t1) t1=timestamp;
    const diff=timestamp-t1;
    if(diff>=(interval*1000)){
        t1=timestamp;
        console.log('Painted:'+j++,timestamp)
    };
    requestAnimationFrame(repaint);
    
  }

  requestAnimationFrame(repaint);