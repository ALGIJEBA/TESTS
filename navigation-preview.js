/* Isolated navigation prototype. Loaded only on audit/navigation-20261127. */
(()=>{'use strict';
if(window.navigationPreviewLoaded)return;window.navigationPreviewLoaded=true;
const legacyCatalog=renderCatalog,legacyExam=renderExam,legacyShow=showPage;
const labs=[
 ['math',5,'place-value','Разряды чисел'],['math',5,'column-arithmetic','Сложение и вычитание в столбик'],['math',5,'division-lab','Деление в столбик'],
 ['math',6,'fractions','Обыкновенные дроби'],['math',6,'part-whole','Часть и целое'],['math',7,'equation-lab','Линейные уравнения'],['math',8,'fraction-algebra-lab','Обыкновенные и алгебраические дроби'],
 ['math',11,'mix-lab','Проценты и смеси'],['math',11,'circle-motion-lab','Движение по окружности и работа'],
 ['physics',10,'kinematics','Кинематика','Кинематика','Открыть симуляцию'],['physics',10,'dynamics','Динамика','Динамика','Открыть симуляцию'],
 ['physics',10,'carts','Две тележки','Динамика','Открыть лабораторную'],['physics',10,'newton-cat-lab','Законы Ньютона и силы'],['physics',10,'vertical-force-lab','Вертикальные силы']
];
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
function route(hash){if(location.hash!==hash)history.pushState(null,'',hash);}
function page(id,title){let root=document.getElementById(id);if(!root){root=el('section',null,'page');root.id=id;document.querySelector('main').append(root);}root.replaceChildren(el('h1',title));showPageOriginal(id);return root;}
function grid(root){const g=el('div',null,'cards');root.append(g);return g;}
function card(g,title,meta,label,action){const c=el('article',null,'card');c.append(el('h3',title));if(meta)c.append(el('p',meta));c.append(catalogButton(label,action));g.append(c);}
function openLab(l){const [s,g,key,title,section,label]=l;const current=renderCatalog;try{renderCatalog=legacyCatalog;legacyCatalog(s,g,label?null:key,section);if(label){const root=document.getElementById(s);const b=[...root.querySelectorAll('button')].find(b=>b.textContent===label);if(!b)throw Error('Missing lab launcher: '+title);b.click();}}finally{renderCatalog=current;}const root=document.getElementById(s);root.prepend(catalogButton('← Все лаборатории',()=>showLabs(s,String(g))));showPageOriginal(s);route('#nav/lab/'+key);}
function showLabs(subject='',grade=''){
 const root=page('laboratories','Интерактивные лаборатории');const controls=el('div',null,'preview-controls');
 const s=el('select'),g=el('select');s.setAttribute('aria-label','Предмет лаборатории');g.setAttribute('aria-label','Класс лаборатории');
 for(const [v,t] of [['','Все предметы'],['math','Математика'],['physics','Физика']]){const o=el('option',t);o.value=v;s.append(o);}for(const v of ['',5,6,7,8,9,10,11]){const o=el('option',v?v+' класс':'Все классы');o.value=v;g.append(o);}s.value=subject;g.value=grade;
 controls.append(s,g);root.append(controls);const cards=grid(root);function update(){cards.replaceChildren();const filtered=labs.filter(l=>(!s.value||l[0]===s.value)&&(!g.value||l[1]===Number(g.value)));for(const l of filtered)card(cards,l[3],subjectCatalog[l[0]].title+' · '+l[1]+' класс','Открыть лабораторию',()=>openLab(l));if(!filtered.length)cards.append(el('p','Лабораторий по этому фильтру пока нет.'));}s.onchange=g.onchange=update;update();route('#nav/labs');
}
renderCatalog=function(subject,grade,topic,section){
 if(typeof topic==='string')return legacyCatalog.apply(this,arguments);
 if(topic){legacyCatalog.apply(this,arguments);return;}
 const root=page(subject,subjectCatalog[subject].title+(grade?' · '+grade+' класс':''));catalogSelection={subject,grade,topic:null};
 const crumbs=el('nav',null,'breadcrumbs');crumbs.setAttribute('aria-label','Путь по разделам');crumbs.append(catalogButton('Главная',()=>showPage('home')),'→',catalogButton(subjectCatalog[subject].title,()=>renderCatalog(subject)));if(grade)crumbs.append('→ '+grade+' класс');root.prepend(crumbs);
 if(!grade){const cards=grid(root);for(let g=subject==='math'?5:7;g<=11;g++)card(cards,g+' класс','','Выбрать класс',()=>renderCatalog(subject,g));route('#nav/'+subject);return;}
 const input=el('input');input.type='search';input.placeholder='Найти тему в этом классе';input.setAttribute('aria-label','Поиск темы');root.append(input,catalogButton('Лаборатории этого класса',()=>showLabs(subject,String(grade))));
 const cards=grid(root);const topics=subjectCatalog[subject].topics.filter(t=>t.grades.includes(grade));
 function update(){cards.replaceChildren();const seen=new Set();for(const t of topics){const key=t.extra!==undefined?'test:'+t.extra:'page:'+t.page;if(seen.has(key)||!t.name.toLocaleLowerCase('ru').includes(input.value.toLocaleLowerCase('ru')))continue;seen.add(key);const test=t.extra!==undefined?extraTests[t.extra]:null;const meta=test?test.questions.length+' заданий · '+test.questions.filter(q=>!q.options).length+' открытых':'Теория и тренажёр';card(cards,t.name,meta,'Открыть тему',()=>{catalogSelection={subject,grade,topic:t};if(test){openExtra(t.extra);addTestBreadcrumb();route('#nav/test/'+t.extra);}else{showPage(t.page);route('#nav/page/'+t.page);}});}if(!cards.children.length)cards.append(el('p',topics.length?'По запросу ничего не найдено.':'Материалы этого класса пока не добавлены.'));}
 input.oninput=update;update();route('#nav/'+subject+'/'+grade);
};
function exams(){const root=page('preview-exams','Подготовка к экзаменам'),cards=grid(root);for(const s of ['math','physics'])for(const e of ['ОГЭ','ЕГЭ'])card(cards,e+' · '+subjectCatalog[s].title,'Темы для повторения; полнота экзаменационного покрытия пока не подтверждена.','Открыть',()=>{legacyExam(s,e);route('#nav/exam/'+s+'/'+encodeURIComponent(e));});route('#nav/exams');}
showPage=function(id){if(id==='laboratories')return showLabs();if(id==='preview-exams')return exams();if(subjectCatalog[id])return renderCatalog(id);legacyShow(id);if(id==='home')route('#nav/home');};
// Replace only navigation controls. Existing material handlers and legacy hashes remain.
const sidebar=document.querySelector('aside');sidebar.querySelectorAll('[data-page="laboratories"]').forEach(b=>b.onclick=()=>showLabs());const examButton=catalogButton('Экзамены',exams);examButton.className='menu-link';examButton.dataset.page='preview-exams';sidebar.append(examButton);
const home=document.getElementById('home');home.querySelector('.audit-start')?.remove();const entry=el('section',null,'section');entry.append(el('h2','Выбери, что изучать'));for(const [name,fn] of [['Математика',()=>renderCatalog('math')],['Физика',()=>renderCatalog('physics')],['Экзамены',exams],['Лаборатории',()=>showLabs()]])entry.append(catalogButton(name,fn));home.prepend(entry);
const banner=el('p','Пробная навигация · изолированная версия','preview-banner');document.body.prepend(banner);
const style=el('style');style.textContent='.preview-banner{padding:10px;text-align:center;background:#fff1cc;color:#35445c}.preview-controls{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}.preview-controls select,input[type=search]{font:inherit;max-width:100%;padding:12px;border:1px solid #9aadc3;border-radius:8px}.card .button{min-height:44px}.section>.button{margin:6px}h1{overflow-wrap:anywhere}@media(max-width:700px){.preview-controls select{width:100%}.cards{grid-template-columns:1fr!important}}';document.head.append(style);
function restore(){const p=location.hash.slice(1).split('/');if(p[0]!=='nav')return;const [,kind,a,b]=p;try{if(kind==='home')showPage('home');else if(kind==='labs')showLabs();else if(kind==='exams')exams();else if(kind==='lab'){const l=labs.find(l=>l[2]===a);if(l)openLab(l);}else if(kind==='exam'&&subjectCatalog[a]&&['ОГЭ','ЕГЭ'].includes(decodeURIComponent(b))){legacyExam(a,decodeURIComponent(b));}else if(kind==='test'&&/^\d+$/.test(a)&&extraTests[Number(a)]){const s=Object.keys(subjectCatalog).find(s=>subjectCatalog[s].topics.some(t=>t.extra===Number(a)));const t=subjectCatalog[s].topics.find(t=>t.extra===Number(a));catalogSelection={subject:s,grade:t.grades[0],topic:t};openExtra(Number(a));addTestBreadcrumb();}else if(kind==='page'&&['triangles','trigonometry'].includes(a))legacyShow(a);else if(subjectCatalog[kind]&&(!a||/^([5-9]|10|11)$/.test(a)))renderCatalog(kind,a?Number(a):undefined);}catch(e){console.error('Navigation restore failed',e);}}
window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);restore();
})();
