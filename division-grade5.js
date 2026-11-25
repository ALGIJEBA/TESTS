/* Деление · 5 класс. Общий движок тестирования и отправки всех попыток. */
(()=>{
const lessons=[{"title":"Подготовка к делению в столбик","hash":"division-preparation-5","date":"16 декабря, среда · 19:00","rules":["Деление — действие, обратное умножению: 42 : 7 = 6, потому что 6 · 7 = 42.","Делимое — число, которое делим; делитель — число, на которое делим; частное — результат. На ноль делить нельзя.","(a + b) : c = a : c + b : c при c ≠ 0. Для устного деления в натуральных числах выбирай слагаемые, которые делятся без остатка.","248 = 240 + 8: 240 : 4 + 8 : 4 = 60 + 2 = 62. Также подходит 200 + 40 + 8: 50 + 10 + 2 = 62."],"practice":"Повторение (5 мин): 7 · □ = 42; 9 · □ = 72; □ · 6 = 54; 8 · □ = 56.<br>Теория (10 мин). Подбор (15 мин): 84 : 7; 7 · 10 = 70, 7 · 11 = 77, 7 · 12 = 84.<br>Разложение (15 мин): 369 : 3; 488 : 4; 648 : 6; 936 : 9.<br>Закрепление (10 мин): ученик получил 246 : 2 = 103, пропустив 40 : 2 = 20. Правильно 123. В 7 коробках 168 карандашей: 24 в каждой.<br>Итог (5 мин): объясни проверку умножением.","hw":"91 : 7; 108 : 9; 156 : 6; 264 : 4; 486 : 3; 848 : 8. Проверь умножением. В 6 коробках 258 карандашей — сколько в одной?","answers":"Разминка: 6; 8; 9; 7. Практика: 123; 122; 108; 104. ДЗ: 13; 12; 26; 66; 162; 106; задача — 43.","pairs":[[72,8],[84,7],[369,3],[488,4],[648,6],[936,9],[246,2],[168,7],[91,7],[108,9],[156,6],[264,4],[486,3],[848,8],[258,6]]},{"title":"Деление на однозначное число","hash":"division-single-digit-5","date":"19 декабря, суббота · 16:00","rules":["Алгоритм: разделить → умножить → вычесть → снести следующую цифру.","Подбирай наибольшую цифру, произведение которой на делитель не превосходит неполного делимого.","После вычитания остаток должен быть меньше делителя. Оставшиеся сотни превращай в десятки, десятки — в единицы.","846 : 3 = 282. 8 сотен : 3 → 2 сотни, остаток 2 сотни; вместе с 4 десятками получаем 24 десятка. 24 : 3 = 8; затем 6 : 3 = 2.","824 : 4 = 206. После сотен остаются 2 десятка: 2 < 4, поэтому пишем 0 десятков. Затем 24 единицы : 4 = 6."],"practice":"Повторение (5 мин): 64 : 8; 120 : 4; 180 : 6; 360 : 9.<br>Теория (15 мин). Совместная практика (15 мин): 684 : 2; 963 : 3; 848 : 4; 756 : 3; 875 : 5; 936 : 4. Для 735 : 5 проверь варианты 137, 147, 157 умножением.<br>Найди ошибку (10 мин): 824 : 4 = 26. Почему потерян разряд десятков?<br>Самостоятельная работа (10 мин): 486 : 2; 693 : 3; 848 : 4; 756 : 6; 945 : 5.<br>Итог (5 мин): проговори четыре действия.","hw":"864 : 4; 735 : 3; 896 : 7; 984 : 6; 936 : 8. 756 тетрадей распределили между 3 классами — сколько каждому? Проверь умножением.","answers":"Разминка: 8; 30; 30; 40. Практика: 342; 321; 212; 252; 175; 234; правильный вариант 147. Самостоятельная: 243; 231; 212; 126; 189. ДЗ: 216; 245; 128; 164; 117; задача — 252.","pairs":[[684,2],[963,3],[848,4],[756,3],[875,5],[936,4],[735,5],[824,4],[486,2],[693,3],[756,6],[945,5],[896,7],[984,6],[936,8]]},{"title":"Деление многозначных чисел","hash":"division-multidigit-5","date":"23 декабря, среда · 19:00","rules":["Первое неполное делимое — наименьшая начальная часть записи делимого, которая не меньше делителя.","В 1 248 : 4 сначала берём 12 сотен, потому что 1 < 4. 12 : 4 = 3 сотни; затем 4 : 4 = 1 десяток; 8 : 4 = 2 единицы. Ответ 312.","Если в делимом n цифр, а в первом неполном делимом k цифр, в частном n − k + 1 цифр (для положительных целых чисел, когда делимое не меньше делителя).","После начала записи частного не пропускай разряды: если неполное делимое меньше делителя, пиши 0, затем сноси следующую цифру.","824 : 4 = 206; 3 612 : 3 = 1 204; 6 048 : 6 = 1 008. Проверяй: частное · делитель = делимое."],"practice":"Повторение (5 мин): 648 : 3; 875 : 5; 936 : 4.<br>Теория (15 мин). Ноль в частном (10 мин).<br>Практика (15 мин): 1 248 : 4; 2 484 : 6; 3 696 : 8; 824 : 4; 3 612 : 3; 6 048 : 6; 7 392 : 7; 8 568 : 4; 9 648 : 8. Назови первое неполное делимое и число цифр ответа.<br>Задача (5 мин): 2 736 кг яблок поровну в 8 контейнерах.<br>Самостоятельная (10 мин): 1 536 : 4; 2 145 : 5; 3 612 : 3; 5 040 : 7; 8 568 : 4.","hw":"1 872 : 6; 2 436 : 4; 4 056 : 3; 6 048 : 6; 7 560 : 7. 3 248 книг поровну в 8 библиотеках. Дополнительно: придумай четырёхзначное число, которое делится на 4 и имеет ноль в разряде десятков частного.","answers":"Разминка: 216; 175; 234. Практика: 312; 414; 462; 206; 1 204; 1 008; 1 056; 2 142; 1 206. Задача — 342 кг. Самостоятельная: 384; 429; 1 204; 720; 2 142. ДЗ: 312; 609; 1 352; 1 008; 1 080; задача — 406 книг. Дополнительно, например: 1 216 : 4 = 304.","pairs":[[1248,4],[2484,6],[3696,8],[824,4],[3612,3],[6048,6],[7392,7],[8568,4],[9648,8],[5040,7],[1536,4],[2145,5],[2436,4],[4056,3],[3248,8]]}];
const start=extraTests.length;
const num=v=>String(v).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
function steps(a,b){
 let carry=0,started=false,rows=[];
 for(const digit of String(a)){
 const current=carry*10+Number(digit);
 if(!started&&current<b){carry=current;continue;}
 started=true;const q=Math.floor(current/b),product=q*b;carry=current-product;
 rows.push({current,q,product,carry});
 }
 return rows;
}
function diagram(a,b){
 const rows=steps(a,b);
 return '<div class="column-scroll"><svg role="img" aria-label="Деление '+a+' на '+b+' в столбик" width="300" height="'+(80+rows.length*62)+'" viewBox="0 0 300 '+(80+rows.length*62)+'"><g font-family="monospace" font-size="23" fill="#35445c"><text x="30" y="28">'+a+'</text><path d="M150 5V65M150 35H270" stroke="#35445c" fill="none"/><text x="175" y="28">'+b+'</text><text x="175" y="60">'+a/b+'</text>'+rows.map((r,i)=>'<text x="'+(30+i*15)+'" y="'+(57+i*62)+'">−'+r.product+'</text><path d="M'+(30+i*15)+' '+(65+i*62)+'h70" stroke="#5ba9d6"/><text x="'+(45+i*15)+'" y="'+(88+i*62)+'">'+(i<rows.length-1?rows[i+1].current:r.carry)+'</text>').join('')+'</g></svg></div>';
}
lessons.forEach((l,k)=>{
 const questions=l.pairs.map(([a,b],i)=>{
 const answer=a/b;
 const q={q:'Вычисли '+num(a)+' : '+b+'.',explanation:num(a)+' : '+b+' = '+num(answer)+'. Проверка: '+num(answer)+' · '+b+' = '+num(a)+'.',topic:k===0?'Подбор и разложение':String(answer).includes('0')?'Ноль в частном':'Письменное деление'};
 if(i<10){q.options=[String(answer),String(answer+b),String(Math.max(0,answer-1))];q.correctIndex=i%3;[q.options[0],q.options[q.correctIndex]]=[q.options[q.correctIndex],q.options[0]];}
 else{q.answer=String(answer);q.check=v=>/^\d+(?:[ \u00a0\u202f]\d+)*$/.test(String(v).trim())&&Number(String(v).replace(/[ \u00a0\u202f]/g,''))===answer;}
 return q;
 });
 extraTests.push({title:l.title+' · 5 класс',questions});
 tutoringLessons.push([l.title,l.rules,'','']);
 subjectCatalog.math.topics.push({name:l.title,grades:[5],section:'Арифметика',extra:start+k});
});
const prevLesson=lessonHTML;
lessonHTML=function(index){
 const l=lessons[index-start];if(!l)return prevLesson(index);
 return '<h2>'+l.title+'</h2><p>5 класс · '+l.date+' · 60 минут</p><h3>Главные принципы</h3><ul>'+l.rules.map(r=>'<li>'+r+'</li>').join('')+'</ul>'+((index-start)>0?diagram(index-start===1?846:1248,index-start===1?3:4):'')+'<div data-division-lab="'+(index-start)+'"></div><h3>Занятие</h3><p>'+l.practice+'</p><h3>Домашнее задание</h3><p>'+l.hw+'</p><details><summary>Ответы для преподавателя</summary><p>'+l.answers+'</p></details><h3>Проверочный тест</h3><p>15 вопросов: 10 с выбором и 5 открытых. Решай в тетради. После завершения доступны процент, разбор и результаты по темам.</p>';
};
function lab(root,k){
 if(k===0){
 root.innerHTML='<h3>Раздели 12 конфет поровну</h3><label>Количество коробок <select aria-label="Количество коробок"><option>2</option><option selected>3</option><option>4</option><option>6</option></select></label><div class="division-boxes"></div><p aria-live="polite"></p>';
 const select=root.querySelector('select');const render=()=>{const b=Number(select.value);root.querySelector('.division-boxes').innerHTML=Array.from({length:b},(_,i)=>'<div class="card">Коробка '+(i+1)+'<br>'+Array(12/b).fill('●').join(' ')+'<br>'+12/b+' шт.</div>').join('');root.querySelector('p').textContent='12 : '+b+' = '+12/b+'. Проверка: '+12/b+' · '+b+' = 12.';};select.onchange=render;render();
 }else{
 const examples=k===1?[[846,3],[824,4]]:[[1248,4],[3612,3],[6048,6]];
 let e=0,s=0;
 root.innerHTML='<h3>Пошаговый разбор</h3><p aria-live="polite"></p><button type="button" class="button">Назад</button> <button type="button" class="button">Следующий шаг</button> <button type="button" class="button">Другой пример</button>';
 const buttons=root.querySelectorAll('button');
 const render=()=>{const [a,b]=examples[e],rs=steps(a,b),r=rs[s];root.querySelector('p').textContent=a+' : '+b+'. Шаг '+(s+1)+' из '+rs.length+': неполное делимое '+r.current+'. Пишем цифру '+r.q+'. Умножаем: '+r.q+' · '+b+' = '+r.product+'. Вычитаем: '+r.current+' − '+r.product+' = '+r.carry+'. '+(s<rs.length-1?'Сносим следующую цифру: получаем '+rs[s+1].current+'.':'Готово: '+a/b+'. Проверка: '+a/b+' · '+b+' = '+a+'.');buttons[0].disabled=s===0;buttons[1].disabled=s===rs.length-1;};
 buttons[0].onclick=()=>{s--;render();};buttons[1].onclick=()=>{s++;render();};buttons[2].onclick=()=>{e=(e+1)%examples.length;s=0;render();};render();
 }
}
const prevOpen=openExtra;openExtra=function(index){prevOpen(index);if(index<start||index>=start+lessons.length)return;document.getElementById('extra-back').textContent='← К математике';document.querySelectorAll('[data-division-lab]').forEach(el=>lab(el,Number(el.dataset.divisionLab)));};
const prevCatalog=renderCatalog;renderCatalog=function(...args){prevCatalog(...args);document.querySelectorAll('[data-division-lab]').forEach(el=>lab(el,Number(el.dataset.divisionLab)));};
function link(){const k=lessons.findIndex(l=>location.hash==='#'+l.hash);if(k<0)return;catalogSelection={subject:'math',grade:5,topic:subjectCatalog.math.topics.find(t=>t.extra===start+k)};openExtra(start+k);addTestBreadcrumb();}
window.addEventListener('hashchange',link);link();
const style=document.createElement('style');style.textContent='.division-boxes{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}.division-boxes .card{min-width:130px;color:#5b86a8} [data-division-lab]{padding:18px;background:#f0f8ff;border-radius:15px;margin:18px 0} [data-division-lab] select{font:inherit;padding:8px}';document.head.append(style);
})();