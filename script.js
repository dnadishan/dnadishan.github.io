const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));document.querySelector('#year').textContent=new Date().getFullYear();document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active')?.classList.remove('active');btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;});}));const lightbox=document.querySelector('.lightbox');const lightboxImg=lightbox.querySelector('img');const lightboxText=lightbox.querySelector('p');document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();lightboxImg.src=link.href;lightboxImg.alt=link.dataset.lightbox;lightboxText.textContent=link.dataset.lightbox;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}));function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lightboxImg.src='';}lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});

const circuitCanvas=document.querySelector('.circuit-canvas');
const circuitContext=circuitCanvas?.getContext('2d');
if(circuitCanvas&&circuitContext){
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let traces=[];
  let frameId;
  let startTime;

  function createTraces(){
    const width=window.innerWidth;
    const height=window.innerHeight;
    const traceCount=Math.min(42,Math.max(14,Math.round(width*height/26000)));
    traces=Array.from({length:traceCount},(_,index)=>{
      let x=Math.random()*width;
      let y=Math.random()*height;
      const points=[[x,y]];
      for(let segment=0;segment<4;segment++){
        const distance=45+Math.random()*125;
        if(segment%2===0)x=Math.max(12,Math.min(width-12,x+(Math.random()<.5?-distance:distance)));
        else y=Math.max(12,Math.min(height-12,y+(Math.random()<.5?-distance:distance)));
        points.push([x,y]);
      }
      const length=points.slice(1).reduce((total,point,index)=>total+Math.hypot(point[0]-points[index][0],point[1]-points[index][1]),0);
      return{points,length,phase:index/traceCount,pulse:index%3===0};
    });
  }

  function drawCircuits(timestamp=0){
    const width=window.innerWidth;
    const height=window.innerHeight;
    const ratio=Math.min(window.devicePixelRatio||1,2);
    if(circuitCanvas.width!==Math.round(width*ratio)||circuitCanvas.height!==Math.round(height*ratio)){
      circuitCanvas.width=Math.round(width*ratio);
      circuitCanvas.height=Math.round(height*ratio);
      circuitContext.setTransform(ratio,0,0,ratio,0,0);
      createTraces();
    }

    circuitContext.clearRect(0,0,width,height);
    traces.forEach(trace=>{
      circuitContext.beginPath();
      trace.points.forEach(([x,y],index)=>index===0?circuitContext.moveTo(x,y):circuitContext.lineTo(x,y));
      circuitContext.strokeStyle='rgba(93,224,197,.24)';
      circuitContext.lineWidth=1;
      circuitContext.stroke();

      trace.points.slice(1).forEach(([x,y])=>{
        circuitContext.beginPath();
        circuitContext.arc(x,y,1.5,0,Math.PI*2);
        circuitContext.fillStyle='rgba(118,185,238,.55)';
        circuitContext.fill();
      });

      if(trace.pulse&&!reducedMotion.matches){
        const progress=((timestamp-startTime)/9000+trace.phase)%1;
        let distance=progress*trace.length;
        for(let index=1;index<trace.points.length;index++){
          const [fromX,fromY]=trace.points[index-1];
          const [toX,toY]=trace.points[index];
          const segmentLength=Math.hypot(toX-fromX,toY-fromY);
          if(distance<=segmentLength){
            circuitContext.beginPath();
            circuitContext.arc(fromX+(toX-fromX)*(distance/segmentLength),fromY+(toY-fromY)*(distance/segmentLength),2,0,Math.PI*2);
            circuitContext.fillStyle='rgba(93,224,197,.9)';
            circuitContext.shadowColor='#5de0c5';
            circuitContext.shadowBlur=10;
            circuitContext.fill();
            circuitContext.shadowBlur=0;
            break;
          }
          distance-=segmentLength;
        }
      }
    });

    if(!reducedMotion.matches)frameId=requestAnimationFrame(drawCircuits);
  }

  function restartCircuits(){
    cancelAnimationFrame(frameId);
    startTime=performance.now();
    drawCircuits(startTime);
  }

  window.addEventListener('resize',restartCircuits);
  reducedMotion.addEventListener('change',restartCircuits);
  createTraces();
  restartCircuits();
}