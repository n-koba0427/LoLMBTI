function readResult(){
    try { return JSON.parse(localStorage.getItem('lolmbti_result') || '{}'); }
    catch { return {}; }
  }
  function letterFor(avg,left,right){ return avg>3 ? left : (avg<3 ? right : left.toLowerCase()+"/"+right.toLowerCase()); }
  
  function drawRadar(canvas, values /* {EI,SN,TF,JP} 1..5 */){
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    // 座標
    const cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 30;
    const axes = [
      {k:'EI', label:'E', angle:-Math.PI/2},
      {k:'SN', label:'S', angle:-Math.PI/2 + Math.PI/2},
      {k:'TF', label:'T', angle:-Math.PI/2 + Math.PI},
      {k:'JP', label:'J', angle:-Math.PI/2 + 3*Math.PI/2},
    ];
    // 同心円ガイド
    ctx.strokeStyle = 'rgba(255,255,255,.15)';
    for (let i=1;i<=4;i++){
      ctx.beginPath();
      axes.forEach((ax,idx)=>{
        const rr = r * (i/4);
        const x = cx + rr*Math.cos(ax.angle);
        const y = cy + rr*Math.sin(ax.angle);
        if(idx===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.closePath(); ctx.stroke();
    }
    // 軸
    ctx.strokeStyle = 'rgba(255,255,255,.25)';
    ctx.lineWidth = 1;
    axes.forEach(ax=>{
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.lineTo(cx + r*Math.cos(ax.angle), cy + r*Math.sin(ax.angle));
      ctx.stroke();
    });
    // ラベル
    ctx.fillStyle = 'rgba(255,255,255,.75)';
    ctx.font = 'bold 14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    axes.forEach(ax=>{
      const x = cx + (r+14)*Math.cos(ax.angle);
      const y = cy + (r+14)*Math.sin(ax.angle);
      ctx.textAlign = Math.cos(ax.angle)>0? 'left': (Math.cos(ax.angle)<0? 'right':'center');
      ctx.textBaseline = Math.sin(ax.angle)>0? 'top': (Math.sin(ax.angle)<0?'bottom':'middle');
      ctx.fillText(ax.label, x, y);
    });
    // ポリゴン
    const pts = axes.map(ax=>{
      const t = (values[ax.k]-1)/4; // 0..1
      return {
        x: cx + r*t*Math.cos(ax.angle),
        y: cy + r*t*Math.sin(ax.angle)
      };
    });
    ctx.beginPath();
    pts.forEach((p,i)=> i? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
    ctx.closePath();
    ctx.fillStyle = 'rgba(122,162,255,.25)'; ctx.fill();
    ctx.strokeStyle = 'rgba(122,162,255,.9)'; ctx.lineWidth = 2; ctx.stroke();
  }
  
  function buildMatchCard(title, items){
    const div = document.createElement('div');
    div.className = 'match-card';
    div.innerHTML = `<strong>${title}</strong>`;
    items.forEach(m=>{
      const p = document.createElement('p');
      const detail = m.team? `（${m.team}・${m.role}）` : (m.region? `（${m.region}）` : '');
      const tag = `<span class="tag">一致度 ${m.match}</span>`;
      p.innerHTML = `• ${m.name}${detail} ${tag}`;
      div.appendChild(p);
    });
    return div;
  }
  
  function saveImagePNG(){
    const data = JSON.parse(localStorage.getItem('lolmbti_result')||'{}');
    if(!data.type) { alert('結果が見つかりません。'); return; }
    const canvas = document.getElementById('shareCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    // 背景
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,'#0f1117'); g.addColorStop(1,'#1a2130');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  
    // タイトル
    ctx.fillStyle = '#e8ecf1';
    ctx.font = '700 42px system-ui, -apple-system, Segoe UI, Roboto, sans-serif';
    ctx.fillText('LoLタイプ診断（MBTIの4次元を参考）', 40, 80);
  
    // タイプ
    ctx.font = '800 92px ui-monospace, SFMono-Regular, Menlo, Consolas';
    ctx.fillStyle = '#7aa2ff';
    ctx.fillText(data.type, 40, 180);
    ctx.font = '600 28px system-ui,-apple-system, Segoe UI, Roboto';
    const typeName = (window.TYPE_NAMES[data.type]||'');
    ctx.fillStyle = '#e8ecf1';
    ctx.fillText(typeName, 40, 220);
  
    // スコア
    ctx.font = '600 22px ui-monospace, SFMono-Regular, Menlo, Consolas';
    ctx.fillText(`EI:${data.avg.EI.toFixed(2)}  SN:${data.avg.SN.toFixed(2)}  TF:${data.avg.TF.toFixed(2)}  JP:${data.avg.JP.toFixed(2)}`, 40, 260);
  
    // 小型レーダー
    const radar = document.createElement('canvas'); radar.width=320; radar.height=320;
    drawRadar(radar, data.avg);
    ctx.drawImage(radar, 40, 290);
  
    // 署名
    ctx.font = '400 18px system-ui,-apple-system, Segoe UI, Roboto';
    ctx.fillStyle = '#9aa3b2';
    ctx.fillText('※教育/娯楽目的の非公式ツール。MBTI®は登録商標です。', 40, 610);
  
    // ダウンロード
    const a = document.createElement('a');
    a.download = `LoLType_${data.type}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  }
  
  window.addEventListener('DOMContentLoaded', ()=>{
    const data = readResult();
    if(!data.type){
      document.querySelector('.wrap').innerHTML = `<section class="card"><p>結果データが見つかりませんでした。</p><a class="btn primary" href="test.html">テストへ</a></section>`;
      return;
    }
  
    const type = data.type;
    const typeName = TYPE_NAMES[type] || '境界タイプ';
    document.getElementById('typePill').textContent = type;
    document.getElementById('typeName').textContent = `— ${typeName}`;
    document.getElementById('borderNote').textContent = (data.borderDims && data.borderDims.length)
      ? `※ 境界：${data.borderDims.join(', ')}（平均が3に近接）` : '';
  
    document.getElementById('scoreEI').textContent = data.avg.EI.toFixed(2);
    document.getElementById('scoreSN').textContent = data.avg.SN.toFixed(2);
    document.getElementById('scoreTF').textContent = data.avg.TF.toFixed(2);
    document.getElementById('scoreJP').textContent = data.avg.JP.toFixed(2);
  
    // レーダー
    drawRadar(document.getElementById('radar'), data.avg);
  
    // 有名人マッチ（選手＆配信者）
    const pros = window.findMatches(type, window.CELEB_PROS, 3);
    const streamers = window.findMatches(type, window.CELEB_STREAMERS, 3);
    const matches = document.getElementById('matches');
    matches.appendChild(buildMatchCard('プロ選手に例えるなら', pros));
    matches.appendChild(buildMatchCard('配信者に例えるなら', streamers));
  
    // インサイト
    const list = document.getElementById('insights');
    (TYPE_INSIGHTS[type]||["複数の気質が拮抗。役割やコンディションで出し分けできる柔軟性が強みです。"])
      .forEach(line=>{ const li=document.createElement('li'); li.textContent=line; list.appendChild(li); });
  
    // 共有
    document.getElementById('copyBtn').addEventListener('click', async ()=>{
      const txt = `LoLタイプ診断: ${type}（${typeName}） EI:${data.avg.EI.toFixed(2)} SN:${data.avg.SN.toFixed(2)} TF:${data.avg.TF.toFixed(2)} JP:${data.avg.JP.toFixed(2)} #LeagueOfLegends`;
      try { await navigator.clipboard.writeText(txt); alert('コピーしました'); } catch { alert(txt); }
    });
    document.getElementById('saveBtn').addEventListener('click', saveImagePNG);
  });
  