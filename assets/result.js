function readResult(){
    try { return JSON.parse(localStorage.getItem('loltype_result') || '{}'); }
    catch { return {}; }
  }
  function drawRadar(canvas, values){ // values: 1..5
    const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    const cx=W/2, cy=H/2, r=Math.min(W,H)/2-30;
    const axes = [
      {k:'EI', label:'E', ang:-Math.PI/2},
      {k:'SN', label:'S', ang:-Math.PI/2+Math.PI/2},
      {k:'TF', label:'T', ang:-Math.PI/2+Math.PI},
      {k:'JP', label:'J', ang:-Math.PI/2+3*Math.PI/2},
    ];
    ctx.strokeStyle='rgba(255,255,255,.18)';
    for(let i=1;i<=4;i++){
      ctx.beginPath();
      axes.forEach((ax,idx)=>{
        const rr=r*(i/4), x=cx+rr*Math.cos(ax.ang), y=cy+rr*Math.sin(ax.ang);
        if(idx===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.closePath(); ctx.stroke();
    }
    ctx.strokeStyle='rgba(255,255,255,.25)';
    axes.forEach(ax=>{ ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+r*Math.cos(ax.ang), cy+r*Math.sin(ax.ang)); ctx.stroke(); });
    ctx.fillStyle='rgba(255,255,255,.75)'; ctx.font='bold 14px ui-monospace, SFMono-Regular, Menlo, Consolas';
    axes.forEach(ax=>{
      const x=cx+(r+14)*Math.cos(ax.ang), y=cy+(r+14)*Math.sin(ax.ang);
      ctx.textAlign = Math.cos(ax.ang)>0? 'left': (Math.cos(ax.ang)<0?'right':'center');
      ctx.textBaseline = Math.sin(ax.ang)>0? 'top': (Math.sin(ax.ang)<0?'bottom':'middle');
      ctx.fillText(ax.label,x,y);
    });
    const pts = axes.map(ax=>{
      const t=(values[ax.k]-1)/4; return {x:cx+r*t*Math.cos(ax.ang), y:cy+r*t*Math.sin(ax.ang)};
    });
    ctx.beginPath(); pts.forEach((p,i)=> i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); ctx.closePath();
    ctx.fillStyle='rgba(122,162,255,.27)'; ctx.fill();
    ctx.strokeStyle='rgba(122,162,255,.95)'; ctx.lineWidth=2; ctx.stroke();
  }
  function setBar(id,val){ // 1..5
    const el=document.getElementById(id); el.style.width=`${(val-1)/4*100}%`;
  }
  
  function buildMatchCard(title, items){
    const div=document.createElement('div'); div.className='match-card';
    div.innerHTML=`<strong>${title}</strong>`;
    items.forEach(m=>{
      const p=document.createElement('p');
      const detail = m.team? `（${m.team}・${m.role}）` : (m.region? `（${m.region}）` : '');
      const tag = `<span class="tag">一致度 ${m.match}</span>`;
      p.innerHTML = `• ${m.name}${detail} ${tag}`;
      div.appendChild(p);
    });
    return div;
  }
  
  function drawShareCard(canvas, data, story=false){
    const ctx = canvas.getContext('2d'), W=canvas.width, H=canvas.height;
    // 背景グラデ＋シャード
    const g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,'#0f1117'); g.addColorStop(1,'#1a2130');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    for(let i=0;i<22;i++){ // シャード
      const x=Math.random()*W, y=Math.random()*H, w=80+Math.random()*220, h=2+Math.random()*5, a=Math.random()*Math.PI;
      ctx.save(); ctx.translate(x,y); ctx.rotate(a);
      ctx.fillStyle = `rgba(122,162,255,${.05+Math.random()*.12})`;
      ctx.fillRect(-w/2,-h/2,w,h); ctx.restore();
    }
    // タイトル
    ctx.fillStyle='#e8ecf1';
    ctx.font = (story?'700 56px':'700 42px')+' system-ui, -apple-system, Segoe UI, Roboto';
    ctx.fillText('LoLタイプ診断', 40, story?120:80);
  
    // タイプ
    ctx.font = (story?'800 160px':'800 92px')+' ui-monospace, SFMono-Regular, Menlo, Consolas';
    ctx.fillStyle = '#7aa2ff';
    ctx.fillText(data.type, 40, story?260:180);
    ctx.font = (story?'600 38px':'600 28px')+' system-ui,-apple-system, Segoe UI, Roboto';
    ctx.fillStyle = '#e8ecf1';
    const typeName = (window.TYPE_NAMES[data.type]||'');
    ctx.fillText(typeName, 40, story?310:220);
  
    // スコア列
    ctx.font = (story?'600 36px':'600 22px')+' ui-monospace, SFMono-Regular, Menlo, Consolas';
    const sline = `EI:${data.avg.EI.toFixed(2)}  SN:${data.avg.SN.toFixed(2)}  TF:${data.avg.TF.toFixed(2)}  JP:${data.avg.JP.toFixed(2)}`;
    ctx.fillText(sline, 40, story?360:260);
  
    // 小型レーダー
    const radar=document.createElement('canvas'); radar.width= story?520:320; radar.height= story?520:320;
    drawRadar(radar, data.avg);
    ctx.drawImage(radar, 40, story?400:290);
  
    // マッチ（上位2）
    const pros = window.findMatches(data.type, window.CELEB_PROS, 2);
    const strs = window.findMatches(data.type, window.CELEB_STREAMERS, 2);
    ctx.font = (story?'700 42px':'700 26px')+' system-ui'; ctx.fillStyle='#e8ecf1';
    ctx.fillText('似ているプレイスタイル', story?600:390, story?480:320);
    ctx.font = (story?'600 34px':'600 20px')+' system-ui'; ctx.fillStyle='#cfd6e6';
    let y0 = story?530:350;
    [...pros, ...strs].forEach(m=>{
      const line = `• ${m.name}${m.team?`（${m.team}/${m.role}）`: (m.region?`（${m.region}）`:'')}  — 一致度 ${m.match}`;
      ctx.fillText(line, story?600:390, y0); y0 += story?46:26;
    });
  
    // 署名
    ctx.font = (story?'400 28px':'400 16px')+' system-ui';
    ctx.fillStyle='#9aa3b2';
    ctx.fillText('Fan‑made tool. Data processed locally.', 40, H-30);
  }
  
  function savePNG(canvas, name){
    const a=document.createElement('a'); a.download=name; a.href=canvas.toDataURL('image/png'); a.click();
  }
  async function copyImage(canvas){
    if(!('clipboard' in navigator)) return false;
    return new Promise(resolve=>{
      canvas.toBlob(async b=>{
        try{
          await navigator.clipboard.write([new ClipboardItem({'image/png': b})]);
          resolve(true);
        }catch{ resolve(false); }
      });
    });
  }
  
  window.addEventListener('DOMContentLoaded', ()=>{
    const data = readResult();
    const wrap = document.querySelector('.wrap');
    if(!data.type){
      wrap.innerHTML = `<section class="card"><p>結果データが見つかりませんでした。</p><a class="btn primary" href="test.html">テストへ</a></section>`;
      return;
    }
    // ヘッダ
    const type = data.type, typeName = TYPE_NAMES[type] || '境界タイプ';
    document.getElementById('typePill').textContent = type;
    document.getElementById('typeName').textContent = `— ${typeName}`;
    document.getElementById('borderNote').textContent = (data.borderDims && data.borderDims.length)
      ? `※ 境界：${data.borderDims.join(', ')}（平均が3に近接）` : '';
  
    // スコア
    ['EI','SN','TF','JP'].forEach(k=>{
      document.getElementById('score'+k).textContent = data.avg[k].toFixed(2);
      setBar('bar'+k, data.avg[k]);
    });
  
    // グラフ
    drawRadar(document.getElementById('radar'), data.avg);
  
    // 有名人マッチ
    const pros = window.findMatches(type, window.CELEB_PROS, 3);
    const streamers = window.findMatches(type, window.CELEB_STREAMERS, 3);
    const matches = document.getElementById('matches');
    matches.appendChild(buildMatchCard('プロ選手に例えるなら', pros));
    matches.appendChild(buildMatchCard('配信者に例えるなら', streamers));
  
    // インサイト
    const list = document.getElementById('insights');
    (TYPE_INSIGHTS[type]||["複数の気質が拮抗。役割やコンディションで出し分けできる柔軟性が強みです。"])
      .forEach(line=>{ const li=document.createElement('li'); li.textContent=line; list.appendChild(li); });
  
    // 共有画像（横/縦）
    const card = document.getElementById('shareCard');
    drawShareCard(card, data, false);
    const story = document.getElementById('shareStory');
    drawShareCard(story, data, true);
  
    // テキスト共有
    const txt = `LoLタイプ診断: ${type}（${typeName}） EI:${data.avg.EI.toFixed(2)} SN:${data.avg.SN.toFixed(2)} TF:${data.avg.TF.toFixed(2)} JP:${data.avg.JP.toFixed(2)} #LeagueOfLegends`;
    document.getElementById('copyBtn').addEventListener('click', async ()=>{
      try { await navigator.clipboard.writeText(txt); alert('コピーしました'); } catch { alert(txt); }
    });
  
    // 画像保存
    document.getElementById('saveBtn').addEventListener('click', ()=>{
      savePNG(card, `LoLType_${type}.png`);
    });
  
    // X共有
    document.getElementById('shareX').addEventListener('click', ()=>{
      const url = encodeURIComponent(window.SHARE_BASE_URL);
      const intent = `https://x.com/intent/tweet?text=${encodeURIComponent(txt)}&url=${url}`;
      window.open(intent, '_blank','noopener');
    });
  
    // Discord共有（Web Share API + 画像コピーのフォールバック）
    document.getElementById('shareDiscord').addEventListener('click', async ()=>{
      try{
        const blob = await new Promise(res=> card.toBlob(res, 'image/png'));
        const file = new File([blob], `LoLType_${type}.png`, {type:'image/png'});
        if (navigator.canShare && navigator.canShare({files:[file]})) {
          await navigator.share({files:[file], text: txt});
        } else {
          const ok = await copyImage(card);
          if(ok) alert('画像をクリップボードにコピーしました。Discordで貼り付けて共有できます。');
          else savePNG(card, `LoLType_${type}.png`);
        }
      }catch(e){ savePNG(card, `LoLType_${type}.png`); }
    });
  });
  