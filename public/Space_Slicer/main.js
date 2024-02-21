const stageBg = document.querySelector('.stage-bg')
const stageFg = document.querySelector('.stage-fg')
const score = document.querySelector('.score')
const timer = document.querySelector('.timer')
const veg = ['👽','🛸','🤖','🪐','🚀','👾','⭐','☄️','🌙','🌶️','🫛']
const vegTLs = []
const props = { x:0, dir:1 }
let vegNum = 0
let pts = 0
let timeScale = 1

gsap.set('.follower', {filter:'drop-shadow(30px 30px 4px rgba(0,0,0,0.1))'})
gsap.set('.dagger', {rotate:125, xPercent:-50, yPercent:-55})

window.onpointerdown = (e)=> {
  gsap.timeline({defaults:{duration:0.3, ease:'back.out(4)'}})
    .to('.dagger', {rotate:200, xPercent:-30, scale:0.8}, 0)
    .to('.follower', {filter:'drop-shadow(5px 7px 2px rgba(0,0,0,0.3))'}, 0)
    .add(()=>{ //check distance between veg and dagger
      const mark = document.createElement('div')
      stageFg.append(mark)
      gsap.fromTo(mark, {innerHTML:'🗯️', x:e.x+84, y:e.y-20, rotate:'random(0,360)'}, {scale:4, duration:0.1, opacity:0.5, onComplete:()=>mark.remove()})    
      for (const item of stageBg.children) {
        const dX = Math.abs(gsap.getProperty(item,'x') - (e.x+84))
        const dY = Math.abs(gsap.getProperty(item,'y') - (e.y-25))
        const dist = (dX + dY) / 2
        if (dist<60){
          if (item.innerHTML=='⏱️') {
            timeScale = 0.2
            gsap.to(vegTLs, {timeScale:timeScale})
            gsap.to('.stage-bg', {background:'linear-gradient(rgba(0,120,230,0.5) 77%,rgba(0,100,255,0.9))'})
            gsap.delayedCall(5, ()=>{
              timeScale = 1
              gsap.set(vegTLs, {timeScale:1})
              gsap.to('.stage-bg', {background:'linear-gradient(rgba(0,0,0,0) 77%,rgba(0,0,0,0.5))'})
            })
          }
          pts++
          score.innerHTML = 'Sliced '+pts+'<span class="num"> / '+vegNum+'</span>'
          stageFg.append(item)
          gsap.timeline()
          .set(mark, {autoAlpha:0})
          .set(item, {innerHTML:'💥', rotate:'random(0,200,0)', filter:'drop-shadow(0px 0px 0px rgba(0,0,0,0))'})
          .to(item, {duration:0.1, scale:2})
          .to(item, {duration:0.1, scale:0, ease:'expo.inOut'})
        }
      }
    }, 0.15)
}

window.onpointerup = (e)=> {
  gsap.to('.dagger', {duration:0.3, rotate:125, xPercent:-50, scale:1})
  gsap.to('.follower', {duration:0.3, filter:'drop-shadow(30px 30px 4px rgba(0,0,0,0.1))'})
}

window.onpointermove = (e)=>{  
  props.x = gsap.getProperty('.follower', 'x')
  props.dir = (e.x>props.x)? -1:1  
  gsap.to('.follower', {y:e.y})
  gsap.to('.follower', {x:e.x, duration:1, ease:'expo', onUpdate:()=>{
    const rot = Math.abs(e.x-gsap.getProperty('.follower', 'x'))/6
    gsap.set('.follower', {rotate:gsap.utils.clamp(0,33,rot)*props.dir})
  }})
}

function addveg(){ 
  vegNum++
  score.innerHTML = 'Sliced '+pts+'<span class="num"> / '+vegNum+'</span>'
  const f = document.createElement('div')
  stageBg.append(f)
  vegTLs.push(
    gsap.timeline({onComplete:()=>{f.remove(); vegTLs.shift()}})
    .fromTo(f, {
      innerHTML:(vegNum==8||vegNum==36)?'⏱️':veg[gsap.utils.random(0,veg.length-1,1)],
      fontSize:99,
      xPercent:-50,
      yPercent:-50,
      y:innerHeight+99,
      x:gsap.utils.random(200,innerWidth-100,1),
      rotate:(vegNum%2==0)?10:-10,
      filter: 'drop-shadow(20px -10px 4px rgba(0,0,0,0.2))'
    }, {
      duration:3,
      x:'+='+'random(-200,200)',
      rotate:(vegNum%2==0)?-10:10
    })
    .to(f, {
      y:gsap.utils.random(0,innerHeight/2,1),    
      filter: 'drop-shadow(30px 30px 4px rgba(0,0,0,0.1))',
      duration:1.5,
      yoyo:true,
      repeat:1
    }, 0)
    .timeScale(timeScale)  
  )  
}

const vegTL = gsap.to(window, {duration:1, repeat:50, onRepeat:addveg})

const timerTL = gsap.timeline({onComplete:gameEnd})
  .to('.timer .face', {rotate:50, ease:'power1.in'})
  .to('.timer .face', {rotate:0, ease:'none', duration:vegTL.totalDuration()})

function gameEnd(){
  gsap.timeline()
  .fromTo('.replay', {
    innerHTML:'⬅️ Replay?',
    opacity:0,
    x:100
  },{
    ease:'back.out(3)',
    opacity:1,
    x:0
  })
  
  timer.onclick=()=>{
    timer.onclick = null
    pts = vegNum = 0
    score.innerHTML = 'Score: 0'
    gsap.to('.replay', {opacity:0})
    vegTL.play(0)
    timerTL.play(0)
  }
}