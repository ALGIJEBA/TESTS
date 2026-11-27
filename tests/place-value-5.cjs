const fs=require('fs'),path=require('path'),assert=require('assert'),{JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),errors=[],calls=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script src="([^"]+)"><\/script>/g,(_,s)=>'<script>'+fs.readFileSync(path.join(root,s.split('?')[0]),'utf8')+'</script>');
(async()=>{const dom=new JSDOM(html,{url:'https://algijeba.github.io/TESTS/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.requestAnimationFrame=()=>0;w.fetch=u=>{calls.push(u);return Promise.reject(Error('No submission allowed'));};w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({measureText:()=>({width:30}),createLinearGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})});}});const w=dom.window;await new Promise(r=>w.addEventListener('load',()=>setTimeout(r,100)));
const data=w.eval('extraTests.map(t=>({title:t.title,questions:t.questions}))');
const matches=data.filter(t=>t.title==='Разряды и классы многозначных чисел · 5 класс');assert.equal(matches.length,1);const t=matches[0],index=data.indexOf(t);assert.equal(t.questions.length,15);assert.equal(t.questions.filter(q=>!q.options).length,5);
const expected=[400,6000,8000,20000,4527,63008,900402,'50 000 + 400 + 6','Класс тысяч',100000,458,7503,803609,20468,86420-20468];
t.questions.forEach((q,i)=>{const a=q.options?q.options[q.correctIndex]:q.answer;assert.equal(String(a).replaceAll(' ',''),String(expected[i]).replaceAll(' ',''));assert(q.explanation);});
for(const hash of ['place-value-5','columns-5']){w.location.hash=hash;w.dispatchEvent(new w.HashChangeEvent('hashchange'));assert(w.document.querySelector('#extra-root').textContent.includes(hash==='place-value-5'?'Разряд':'Сложение'));assert(!/19:00|16:00|Валерия|Занятие №1/.test(w.document.querySelector('#extra-root').textContent));}
w.eval("renderCatalog('math',5,null,'Арифметика')");assert(w.document.getElementById('math').textContent.includes('Разряды и классы'));
const before=data.length;w.eval(fs.readFileSync(path.join(root,'place-value-test-5.js'),'utf8'));assert.equal(w.eval('extraTests.length'),before);
assert.equal(calls.length,0);assert.deepEqual(errors,[]);console.log(JSON.stringify({tests:data.length,recoveredQuestions:15,openQuestions:5,checkedAnswers:15,legacyLinks:2,errors,submissions:calls.length}));dom.window.close();})();
