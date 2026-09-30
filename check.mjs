import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {filterPlaces,parseIntent} from './logic.mjs';
const data=JSON.parse(readFileSync('data.json'));
assert.equal(data.places.length,5);
assert.equal(filterPlaces(data.places,{minutes:1,budget:999,outlets:false}).length,0);
assert.equal(filterPlaces(data.places,{minutes:5,budget:999,outlets:false}).length,1);
assert.equal(filterPlaces(data.places,{minutes:15,budget:999,outlets:false}).length,5);
assert.equal(filterPlaces(data.places,{minutes:15,budget:25,outlets:false}).length,3);
assert.equal(filterPlaces(data.places,{minutes:20,budget:999,outlets:true}).length,0);
assert.throws(()=>filterPlaces(data.places,{minutes:NaN,budget:999,outlets:false}));
assert.throws(()=>filterPlaces(data.places,{minutes:21,budget:999,outlets:false}));
assert.deepEqual(parseIntent('想放空休息，最多步行10分钟'),{purpose:'rest',minutes:10,outlets:false});
assert.equal(parseIntent('工作一小时，最多步行15分钟，必须有插座').outlets,true);
assert.equal(parseIntent('插座只是偏好，不是必须').outlets,false);
assert.equal(parseIntent('步行999分钟').minutes,20);
assert.equal(data.reviews[0].reviews[0].date,'2023-02-16');
assert.equal(data.reviews[1].reviews[0].text,'几点开始营业');
for(const p of data.places){assert.match(p.source_url,/^https:\/\/map\.baidu\.com\/\?qt=inf&uid=[a-z0-9]+$/);assert.equal(p.route.status,'available');assert.ok(p.route.duration_seconds>0);}
const html=readFileSync('index.html','utf8');
for(const [,path] of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)"/g))assert.ok(existsSync(path),`Missing ${path}`);
assert.equal(readdirSync('assets').filter(x=>x.endsWith('.webp')).length,9);
const banner=readFileSync('quietlens-banner.png');assert.equal(banner.readUInt32BE(16),1200);assert.equal(banner.readUInt32BE(20),675);assert.ok(banner.length<5*1024*1024);
for(const f of ['index.html','app.mjs','logic.mjs','data.json'])assert.doesNotMatch(readFileSync(`${f}`,'utf8'),/BAIDU_MAP_SERVER_AK|DEEPSEEK_API_KEY|sk-[a-zA-Z0-9]{20}|\/Users\//);
console.log('PASS: route/budget filters, strict-condition refusal, empty state, demo intent bounds, provenance, all 9 city assets, 1200×675 banner under 5 MB, no credential fields.');

assert.doesNotMatch(html,/(?:src|href)="\/(?!\/)/);
assert.doesNotMatch(readFileSync("app.mjs","utf8"),/fetch\(['"]\//);
console.log("PASS: GitHub Pages subdirectory asset paths.");
