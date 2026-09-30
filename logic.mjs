export function filterPlaces(places,{minutes,budget,outlets}) {
  if(!Number.isFinite(minutes)||minutes<1||minutes>20||!Number.isFinite(budget)||budget<=0||typeof outlets!=='boolean') throw new Error('筛选条件无效');
  if(outlets)return [];
  return places.filter(p=>p.route?.status==='available'&&p.route.duration_seconds<=minutes*60&&(budget===999||(p.reference_price!==null&&p.reference_price<=budget))).sort((a,b)=>a.route.duration_seconds-b.route.duration_seconds);
}
// ponytail: bounded demo phrase matching; use the main project's intent model for arbitrary natural language.
export function parseIntent(text){
  const walk=text.match(/(?:步行|走路|走|最多步行|不超过)\s*(\d+)\s*分钟/);
  return {purpose:/放空|休息|恢复/.test(text)?'rest':/聊天|见面|交谈/.test(text)?'chat':'focus',minutes:walk?Math.min(20,Math.max(1,Number(walk[1]))):15,outlets:/(必须|一定要|一定有).{0,6}插座/.test(text)};
}
