// 設問（24問／5件法／逆転あり）
window.LOL_ITEMS = [
    {id:1,  text:"自分から積極的にショットコールする。", dim:"EI", pol:+1},
    {id:2,  text:"チャットやピングは必要最低限しかしない。", dim:"EI", pol:-1},
    {id:3,  text:"ソロよりデュオ/フルパが好きだ。", dim:"EI", pol:+1},
    {id:4,  text:"集中したいのでVCはオフにしがち。", dim:"EI", pol:-1},
    {id:5,  text:"試合後にGG/WPなど声をかけることが多い。", dim:"EI", pol:+1},
    {id:6,  text:"集団戦中のコールが多いと疲れる。", dim:"EI", pol:-1},
  
    {id:7,  text:"ドラゴン/バロン湧きタイマーを常に意識し、先回りで視界を取る。", dim:"SN", pol:+1},
    {id:8,  text:"独自ビルドやルーンを試すのが楽しい。", dim:"SN", pol:-1},
    {id:9,  text:"最小リスクで確実なプレイを選ぶ。", dim:"SN", pol:+1},
    {id:10, text:"マップを見て相手の次の一手を読み、素早くロームする。", dim:"SN", pol:-1},
    {id:11, text:"CS/プレートなど確実な利益を積み上げたい。", dim:"SN", pol:+1},
    {id:12, text:"裏TP/変則スプリットなど奇襲的な動きにワクワクする。", dim:"SN", pol:-1},
  
    {id:13, text:"味方を救うより勝率の高いトレードを優先する。", dim:"TF", pol:+1},
    {id:14, text:"味方がミスしても励ましのチャットを入れる。", dim:"TF", pol:-1},
    {id:15, text:"「勝ち筋」のためなら地味でもセーフプレイを選ぶ。", dim:"TF", pol:+1},
    {id:16, text:"不利でも味方の希望や楽しさを尊重したい。", dim:"TF", pol:-1},
    {id:17, text:"不要なチャットはミュートして集中する。", dim:"TF", pol:+1},
    {id:18, text:"バロン前はピン連打より落ち着いた合図を心がける。", dim:"TF", pol:-1},
  
    {id:19, text:"リコール/パワースパイクのタイミングを計画通り守る。", dim:"JP", pol:+1},
    {id:20, text:"状況次第で「もう一波だけ」を狙うことが多い。", dim:"JP", pol:-1},
    {id:21, text:"レーン優先度や配置を決めてからオブジェクトに向かう。", dim:"JP", pol:+1},
    {id:22, text:"直感的なキルチャンスがあればプランを変えても飛び込む。", dim:"JP", pol:-1},
    {id:23, text:"コントロールワードの所持と設置位置をあらかじめ決めておく。", dim:"JP", pol:+1},
    {id:24, text:"試合中の予定はよく変えるし、それを楽しめる。", dim:"JP", pol:-1},
  ];
  
  // タイプ名とインサイト（配信用キャッチを濃く）
  window.TYPE_NAMES = {
    ENTJ:"指揮官ショットコーラー", ENFJ:"チームメンタル司令塔",
    ENTP:"発明家タイプ", ENFP:"ハイテンション・ローマー",
    ESTJ:"オブジェクト監督官", ESFJ:"応援隊長サポート",
    ESTP:"機を見るスノーボーラー", ESFP:"パーティーファイター",
    INTJ:"マクロ将軍", INFJ:"静かな勝ち筋ガイド",
    INTP:"理論クラフター", INFP:"心のサポーター",
    ISTJ:"視界管理官", ISFJ:"守護天使サポート",
    ISTP:"状況打破の外科医", ISFP:"スタイリッシュアサシン"
  };
  
  window.TYPE_INSIGHTS = {
    ENTJ:["視界→構図→合図で“ズレ”をゼロに。","コールはカウントダウンで同期。"],
    ENFJ:["味方の温度を上げてDPSも上げる。","撤退合図もセットで雰囲気崩壊を防ぐ。"],
    ENTP:["“失敗しても損が小さい奇襲”を連発。","情報差で撹乱しよう。"],
    ENFP:["ロームで場を回すムードメーカー。","視界に寄ってから加速。"],
    ESTJ:["定石と優先度の交通整理役。","例外条件を決めてチャンス逃し回避。"],
    ESFJ:["ケア/ピール/声掛けでチームを保温。","“無理しない文化”も広めよう。"],
    ESTP:["好機に牙、撤退も速い。","“もう一波”の誘惑に勝つ設計。"],
    ESFP:["火付け役。倒したら即リセット。","視界と帰還のテンポで差を作る。"],
    INTJ:["サイド圧と合流ルートの二刀流。","孤立死を0にする計画性。"],
    INFJ:["少手数で勝ち筋。","要点ショートコールで伝わる。"],
    INTP:["理詰め→小規模A/B→即採用。","机上の空論を実データで潰す。"],
    INFP:["良い雰囲気＋隠しキャリー。","事実ベースの優しい提案。"],
    ISTJ:["ワードで事故率を溶かす。","優位時は“攻めの視界”に切替。"],
    ISFJ:["延命からの逆転職人。","撤退線を先に引いておく。"],
    ISTP:["ピンポイント介入で盤面を変える。","最低限の合図と視界を。"],
    ISFP:["美しい入りと退き。","“勝ちに寄与する美”を追求。"]
  };
  
  // 有名人（Worlds 2025 本戦参加チーム＋代表的コストリーマー）
  // 参考：公式プライマー/本戦ページ/報道。データはエンタメ用タグ付け（typeTag）は編集的推定です。
  // 公式のチーム/日程: lolesports.com（Primer 等）・本戦参加とロスターはLeaguepedia。コストリーマーは報道・公式SNS告知。
  window.CELEB_PROS = [
    {name:"Faker", team:"T1", role:"Mid", typeTag:"INTJ"},
    {name:"Keria", team:"T1", role:"Support", typeTag:"ENFJ"},
    {name:"Oner", team:"T1", role:"Jungle", typeTag:"ISTP"},
    {name:"Gumayusi", team:"T1", role:"ADC", typeTag:"ESTP"},
    {name:"Chovy", team:"Gen.G", role:"Mid", typeTag:"INTJ"},
    {name:"Ruler", team:"Gen.G", role:"ADC", typeTag:"ISTJ"},
    {name:"Canyon", team:"Gen.G", role:"Jungle", typeTag:"ESTJ"},
    {name:"Bin", team:"BLG", role:"Top", typeTag:"ESFP"},
    {name:"Knight", team:"BLG", role:"Mid", typeTag:"INTP"},
    {name:"Elk", team:"BLG", role:"ADC", typeTag:"ISFP"},
    {name:"ON", team:"BLG", role:"Support", typeTag:"ISFJ"},
    {name:"369", team:"TES", role:"Top", typeTag:"ISTP"},
    {name:"Kanavi", team:"TES", role:"Jungle", typeTag:"INTJ"},
    {name:"Creme", team:"TES", role:"Mid", typeTag:"ENFP"},
    {name:"JackeyLove", team:"TES", role:"ADC", typeTag:"ESTP"},
    {name:"Viper", team:"HLE", role:"ADC", typeTag:"INFP"},
    {name:"Zeka", team:"HLE", role:"Mid", typeTag:"ENTP"},
    {name:"Tarzan", team:"AL", role:"Jungle", typeTag:"ENTJ"},
    {name:"Caps", team:"G2", role:"Mid", typeTag:"ENFP"},
    {name:"BrokenBlade", team:"G2", role:"Top", typeTag:"ESTP"},
  ];
  
  window.CELEB_STREAMERS = [
    {name:"Caedrel", typeTag:"ENTP", region:"EN"},
    {name:"Doublelift", typeTag:"ESTP", region:"EN"},
    {name:"IWillDominate", typeTag:"ENTP", region:"EN"},
    {name:"Jankos", typeTag:"ESTJ", region:"EN"},
    {name:"LS", typeTag:"INTJ", region:"EN"},
    {name:"Sneaky", typeTag:"ENFP", region:"EN"},
    {name:"YamatoCannon", typeTag:"ENFJ", region:"EN"},
    {name:"Tyler1", typeTag:"ESTP", region:"EN"},
    {name:"Ibai Llanos", typeTag:"ESFP", region:"ES"},
  ];
  
  // マッチング（4文字一致数→降順）
  window.findMatches = function(myType, pool, k=3){
    const score = (t) => [...t].reduce((acc, ch, i)=> acc + (ch===myType[i]?1:0), 0);
    const sorted = [...pool].sort((a,b)=> score(b.typeTag)-score(a.typeTag));
    return sorted.slice(0,k).map(x=>({ ...x, match: `${score(x.typeTag)}/4` }));
  };
  
  // 共有URL（公開時にドメインへ差し替え）
  window.SHARE_BASE_URL = location.origin.startsWith('http') ? location.origin + location.pathname.replace(/result\.html$/,'') : 'https://example.com/loltype/';
  