// ページング設定
const PER_PAGE = 6;
let page = 1;
const maxPage = Math.ceil(LOL_ITEMS.length / PER_PAGE);
const answers = {}; // id -> 1..5

const qArea = () => document.getElementById('questionArea');

function renderPage() {
  const start = (page-1)*PER_PAGE, end = start+PER_PAGE;
  const slice = LOL_ITEMS.slice(start, end);
  qArea().innerHTML = '';
  slice.forEach(item => {
    const div = document.createElement('div');
    div.className = 'q';
    div.innerHTML = `<h3>${item.id}. ${item.text}</h3>`;
    const scale = document.createElement('div'); scale.className='scale';
    const labels = ['全く当てはまらない','やや当てはまらない','どちらとも言えない','やや当てはまる','とても当てはまる'];
    labels.forEach((lab,i)=>{
      const id = `q${item.id}_${i+1}`;
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type='radio'; input.name=`q${item.id}`; input.id=id; input.value=(i+1);
      input.checked = (answers[item.id]===i+1);
      input.addEventListener('change', ()=>{
        answers[item.id] = i+1;
        updateProgress();
      });
      label.appendChild(input);
      const span = document.createElement('span'); span.textContent = `${i+1} ${lab}`;
      label.appendChild(span);
      scale.appendChild(label);
    });
    div.appendChild(scale);
    qArea().appendChild(div);
  });

  document.getElementById('pageNow').textContent = page;
  document.getElementById('prevBtn').disabled = (page===1);
  document.getElementById('nextBtn').textContent = (page===maxPage? '結果を見る' : '次へ');
  updateProgress();
}

function updateProgress() {
  const count = Object.keys(answers).length;
  document.getElementById('progressCount').textContent = count;
  document.getElementById('bar').style.width = `${Math.round(count/LOL_ITEMS.length*100)}%`;
}

function ensurePageAnswered() {
  const start = (page-1)*PER_PAGE, end = start+PER_PAGE;
  const ids = LOL_ITEMS.slice(start,end).map(x=>x.id);
  for (const id of ids) if (!answers[id]) return false;
  return true;
}

function computeAndSave() {
  // 採点：左側(E/S/T/J)の得点化。逆転（pol=-1）は 6-v。
  const buckets = { EI:[], SN:[], TF:[], JP:[] };
  LOL_ITEMS.forEach(it=>{
    const v = answers[it.id];
    const s = it.pol===+1 ? v : (6 - v);
    buckets[it.dim].push(s);
  });
  const avg = Object.fromEntries(Object.entries(buckets).map(([k,arr]) => [k, arr.reduce((a,b)=>a+b,0)/arr.length]));
  const letter = (dim,left,right)=> avg[dim]>3 ? left : (avg[dim]<3 ? right : left.toLowerCase()+"/"+right.toLowerCase());
  const l1 = letter('EI','E','I'), l2 = letter('SN','S','N'), l3 = letter('TF','T','F'), l4 = letter('JP','J','P');
  const type = [l1,l2,l3,l4].map(x=>x.length===1?x:x.toUpperCase()[0]).join('');
  const borderDims = Object.entries(avg).filter(([,v])=>Math.abs(v-3)<0.15).map(([k])=>k);
  const payload = { avg, type, borderDims, ts: Date.now() };
  localStorage.setItem('lolmbti_result', JSON.stringify(payload));
  // 回答の保存（必要なら）：localStorage.setItem('lolmbti_answers', JSON.stringify(answers));
  location.href = 'result.html';
}

window.addEventListener('DOMContentLoaded', ()=>{
  renderPage();
  document.getElementById('prevBtn').addEventListener('click', ()=>{
    if (page>1) { page--; renderPage(); window.scrollTo(0,0); }
  });
  document.getElementById('nextBtn').addEventListener('click', ()=>{
    if (!ensurePageAnswered()) { alert('未回答の項目があります。'); return; }
    if (page<maxPage) { page++; renderPage(); window.scrollTo(0,0); }
    else { computeAndSave(); }
  });
});
