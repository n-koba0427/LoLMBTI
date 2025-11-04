// プロ選手（Worlds 2025 参加チーム所属）— name, team, role, typeTag
window.CELEB_PROS = [
    {name:"Faker", team:"T1", role:"Mid", typeTag:"INTJ"},
    {name:"Keria", team:"T1", role:"Support", typeTag:"ENFJ"},
    {name:"Oner", team:"T1", role:"Jungle", typeTag:"ISTP"},
    {name:"Gumayusi", team:"T1", role:"ADC", typeTag:"ESTP"},
  
    {name:"Chovy", team:"Gen.G", role:"Mid", typeTag:"INTJ"},
    {name:"Ruler", team:"Gen.G", role:"ADC", typeTag:"ISTJ"},
    {name:"Canyon", team:"Gen.G", role:"Jungle", typeTag:"ESTJ"},
    {name:"Duro", team:"Gen.G", role:"Support", typeTag:"ESFJ"},
  
    {name:"Bdd", team:"KT Rolster", role:"Mid", typeTag:"INFJ"},
  
    {name:"Knight", team:"Bilibili Gaming", role:"Mid", typeTag:"INTP"},
    {name:"Bin", team:"Bilibili Gaming", role:"Top", typeTag:"ESFP"},
    {name:"Elk", team:"Bilibili Gaming", role:"ADC", typeTag:"ISFP"},
    {name:"ON", team:"Bilibili Gaming", role:"Support", typeTag:"ISFJ"},
  
    {name:"JackeyLove", team:"Top Esports", role:"ADC", typeTag:"ESTP"},
    {name:"369", team:"Top Esports", role:"Top", typeTag:"ISTP"},
    {name:"Kanavi", team:"Top Esports", role:"Jungle", typeTag:"INTJ"},
    {name:"Creme", team:"Top Esports", role:"Mid", typeTag:"ENFP"},
  
    {name:"Tarzan", team:"Anyone's Legend", role:"Jungle", typeTag:"ENTJ"},
  
    {name:"Viper", team:"Hanwha Life Esports", role:"ADC", typeTag:"INFP"},
    {name:"Zeka", team:"Hanwha Life Esports", role:"Mid", typeTag:"ENTP"},
  ];
  
  window.CELEB_STREAMERS = [
    // Worlds 2025 公式コストリーマーとして多数報道/告知のある面々（英/西/他）
    {name:"Caedrel", typeTag:"ENTP", region:"EN"},
    {name:"Doublelift", typeTag:"ESTP", region:"EN"},
    {name:"IWillDominate", typeTag:"ENTP", region:"EN"},
    {name:"Jankos", typeTag:"ESTJ", region:"EN"},
    {name:"LS", typeTag:"INTJ", region:"EN"},
    {name:"Sneaky", typeTag:"ENFP", region:"EN"},
    {name:"YamatoCannon", typeTag:"ENFJ", region:"EN"},
    {name:"Tyler1", typeTag:"ESTP", region:"EN"},
    {name:"Ibai Llanos", typeTag:"ESFP", region:"ES"},
    {name:"Pobelter", typeTag:"INFJ", region:"EN"},
    {name:"Meteos", typeTag:"ISTJ", region:"EN"},
    {name:"Rekkles", typeTag:"INFP", region:"EN"}
  ];
  
  window.findMatches = function(myType, pool, k=3){
    // 4文字一致数でソート
    const score = (t) => [...t].reduce((acc, ch, i)=> acc + (ch===myType[i]?1:0), 0);
    const sorted = [...pool].sort((a,b)=> score(b.typeTag)-score(a.typeTag));
    return sorted.slice(0,k).map(x=>({ ...x, match: `${score(x.typeTag)}/4` }));
  }
  