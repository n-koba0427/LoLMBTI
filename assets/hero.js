const canvas=document.getElementById('heroBg'); const ctx=canvas.getContext('2d');
function fit(){ const r=window.devicePixelRatio||1; canvas.width=innerWidth*r; canvas.height=innerHeight*r; canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px'; ctx.setTransform(r,0,0,r,0,0); }
fit(); addEventListener('resize', fit);

const shards=[...Array(42)].map(()=>({
  x:Math.random()*innerWidth, y:Math.random()*innerHeight,
  w:80+Math.random()*220, h:2+Math.random()*5, a:Math.random()*Math.PI, v:(.2+Math.random()*1.5)
}));
const stars=[...Array(60)].map(()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight, s:Math.random()*2+0.5, v:0.2+Math.random()*0.8}));

function loop(t){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // 背景グラデ
  const g=ctx.createLinearGradient(0,0,canvas.width,canvas.height); g.addColorStop(0,'#0f1117'); g.addColorStop(1,'#1a2130'); ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height);
  // シャード
  shards.forEach(s=>{
    ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.a);
    ctx.globalAlpha=.06; ctx.fillStyle='#7aa2ff'; ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);
    ctx.restore(); s.x += Math.cos(s.a)*s.v; s.y += Math.sin(s.a)*s.v;
    if(s.x<-300||s.x>innerWidth+300||s.y<-300||s.y>innerHeight+300){ s.x=Math.random()*innerWidth; s.y=Math.random()*innerHeight; }
  });
  // 星
  stars.forEach(st=>{
    ctx.beginPath(); ctx.arc(st.x,st.y,st.s,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,.25)'; ctx.fill();
    st.x += st.v; if(st.x>innerWidth+20){ st.x=-20; st.y=Math.random()*innerHeight; }
  });
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
