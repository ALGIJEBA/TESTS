// Run: node tests/confirmed-20261126.cjs from the repository root.
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=fs.existsSync(path.join(__dirname,'index.html'))?__dirname:path.dirname(__dirname);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
const update=html.split('<!-- confirmed-update-20261126 -->')[1].split('</script>')[0].replace(/^\s*<script>\s*/, '');
const materials=fs.readFileSync(path.join(root,'materials-20261126.js'),'utf8');new vm.Script(materials);
const data=JSON.parse(materials.match(/const materials=(\[.*\]);/)[1]);assert.equal(data.length,9);
const context={extraTests:[],tutoringLessons:[],subjectCatalog:{math:{topics:[]},physics:{topics:[]}},lessonHTML:()=>'',};vm.createContext(context);
const register=materials.slice(0,materials.indexOf('const before=lessonHTML'))+'})();';
vm.runInContext(register,context);vm.runInContext(register,context);
for(const t of context.extraTests){assert.equal(t.questions.length,15);assert.equal(t.questions.filter(q=>!q.options).length,5);for(const q of t.questions){assert(q.explanation);if(q.options)assert(q.correctIndex>=0&&q.correctIndex<q.options.length);else assert(Number.isFinite(Number(q.answer)));}}
assert.equal(context.extraTests.length,9);assert.equal(context.tutoringLessons.length,9);
// Minimal DOM fixtures exercise navigation without starting a simulator or a submission.
class Element{
 constructor(tag='div'){this.tag=tag;this.childNodes=[];this.parentNode=null;this.dataset={};this.attributes={};this.className='';this.hidden=false;this._text='';}
 get textContent(){return this._text+this.childNodes.map(n=>n.textContent).join('');}set textContent(v){this._text=String(v);this.childNodes=[];}
 append(...ns){for(let n of ns){if(typeof n==='string'){let t=new Element('text');t.textContent=n;n=t;}n.remove();n.parentNode=this;this.childNodes.push(n);}}
 prepend(...ns){const old=[...this.childNodes];this.replaceChildren(...ns,...old);}
 replaceChildren(...ns){for(const n of this.childNodes)n.parentNode=null;this.childNodes=[];this._text='';this.append(...ns);}
 remove(){if(this.parentNode){const p=this.parentNode;p.childNodes=p.childNodes.filter(n=>n!==this);this.parentNode=null;}}
 before(n){const p=this.parentNode,i=p.childNodes.indexOf(this);n.remove();n.parentNode=p;p.childNodes.splice(i,0,n);}
 after(n){const p=this.parentNode,i=p.childNodes.indexOf(this);n.remove();n.parentNode=p;p.childNodes.splice(i+1,0,n);}
 setAttribute(k,v){this.attributes[k]=v;}
 matches(s){if(s.startsWith('.'))return s.slice(1).split('.').every(c=>this.className.split(' ').includes(c));if(s==='[data-ege-first12]')return this.dataset.egeFirst12!==undefined;return this.tag===s;}
 querySelectorAll(s){return this.childNodes.flatMap(n=>[...(n.matches(s)?[n]:[]),...n.querySelectorAll(s)]);}querySelector(s){return this.querySelectorAll(s)[0]||null;}
}
const doc=new Element('document');doc.createElement=tag=>new Element(tag);doc.head=new Element('head');const main=new Element('main'),aside=new Element('aside');doc.append(doc.head,main,aside);
doc.getElementById=id=>{const walk=n=>n.id===id?n:n.childNodes.map(walk).find(Boolean);return walk(doc);};
for(const id of ['math','physics','home']){let n=new Element('section');n.id=id;n.className='page';main.append(n);}
const node=(tag,text,cls)=>{const n=new Element(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
let opened=0,submitted=0;
function fixtureRender(s,g,t,section){const r=doc.getElementById(s);r.replaceChildren();const grid=node('div',null,'cards');r.append(grid);const card=(name,lab=false)=>{let c=node('div',null,'card');c.append(node('h3',name));if(lab){let b=node('button','Открыть');b.onclick=()=>opened++;c.append(b);}grid.append(c);};
 card('Алгебраический тест');if(g===7&&section==='Алгебра')card('Лаборатория линейных уравнений',true);if(g===10&&s==='physics'&&section==='Динамика')card('Лабораторная работа: две тележки',true);if(g===11&&s==='math')card('Лаборатория процентов и смесей',true);let c=node('div',null,'card');c.dataset.egeFirst12='true';r.append(c);nav.catalogSelection={subject:s,grade:g,topic:t};}
const nav={document:doc,extraNode:node,renderCatalog:fixtureRender,renderExam:()=>fixtureRender('math'),showPage:()=>{},showPageOriginal:id=>{nav.active=id;},catalogSelection:{subject:'math',grade:7},subjectCatalog:{math:{title:'Математика'},physics:{title:'Физика'}}};vm.createContext(nav);vm.runInContext('/* Навигация'+update.split('/* Навигация')[1],nav);
nav.renderCatalog('math',7);const r=doc.getElementById('math');assert.equal(r.querySelector('.learning-labs').querySelectorAll('.card').length,1);assert(r.querySelector('.learning-labs').hidden);assert(!r.querySelector('.cards').hidden);
const tabs=r.querySelector('.learning-tabs');tabs.childNodes[1].onclick();assert(r.querySelector('.cards').hidden);assert(!r.querySelector('.learning-labs').hidden);r.querySelector('.learning-labs').querySelector('button').onclick();assert.equal(opened,1);
assert.equal(r.querySelectorAll('[data-ege-first12]').length,0);assert.equal(nav.catalogSelection.grade,7);
nav.renderExam('math','ЕГЭ');assert.equal(r.querySelectorAll('[data-ege-first12]').length,0);
nav.showPage('laboratories');assert.equal(nav.active,'laboratories');assert(doc.getElementById('laboratories').textContent.includes('две тележки'));assert.equal(submitted,0);
console.log('Passed: inline syntax; nine existing tests at 15/5 and registration without duplicates; laboratory discovery, tabs, callbacks and collection removal.');
