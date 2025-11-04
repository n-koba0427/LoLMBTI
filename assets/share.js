// 共有系の将来拡張フック（OGP生成や短縮URL連携などを追加予定）
window.makeShareText = (data) => {
    const typeName = (window.TYPE_NAMES[data.type]||'');
    return `LoLタイプ診断: ${data.type}（${typeName}） EI:${data.avg.EI.toFixed(2)} SN:${data.avg.SN.toFixed(2)} TF:${data.avg.TF.toFixed(2)} JP:${data.avg.JP.toFixed(2)} #LeagueOfLegends`;
  };
  