/* Проверенные пояснения, формулы и точные учебные схемы. */
(()=>{'use strict';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const style=document.createElement('style');style.textContent=`
.lesson-notes,.triangle-theory{font-size:17px;line-height:1.8}.lesson-notes li{margin:10px 0}.lesson-notes h2{font-size:clamp(23px,3vw,29px)}
.review-formulas{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;margin:20px 0}.review-formula{font-size:clamp(23px,3vw,29px);line-height:2;padding:16px;background:#f1f6fb;border:1px solid #d6e3ed;border-radius:14px;overflow-x:auto}.review-formula math{font-size:1em}.review-formula small{display:block;font:14px/1.5 'Segoe UI',sans-serif;color:#536c84}
.review-figure{margin:18px 0;padding:12px;background:#f7faff;border:1px solid #d7e4ed;border-radius:14px;max-width:760px}.review-figure svg{width:100%;height:auto;display:block;max-height:360px}.review-figure figcaption{font:14px/1.6 'Segoe UI',sans-serif;color:#526a80;margin-top:8px}.review-figure text{font-family:'Segoe UI',sans-serif;fill:#35445c}.review-note{padding:12px 16px;border-left:4px solid #94bcd8;background:#f4f8fb;margin:14px 0;font-size:15px;line-height:1.7}.review-example{padding:16px;background:#fff;border:1px solid #d6e3ed;border-radius:12px;line-height:1.9}.triangle-question>p:first-child{font-size:19px;line-height:1.9}.triangle-question math,.choice-option math{font-size:1.25em}.triangle-theory math{font-size:1.35em}.force-lab>p:first-of-type{font-size:19px;line-height:1.9}.force-result{font-size:21px;line-height:1.9}.review-table{overflow-x:auto}.review-table table{border-collapse:collapse;width:100%;margin:14px 0}.review-table th,.review-table td{border:1px solid #d8e4ed;padding:10px 14px;text-align:center}.review-table th{background:#eef5fa}
@media(max-width:600px){.triangle-question>p:first-child{font-size:17px}.review-figure{padding:6px}.review-formula{padding:12px}.lesson-notes{padding:16px!important}}
`;document.head.append(style);
const line=(x1,y1,x2,y2,c='#7896af',w=2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
const txt=(x,y,s,anchor='middle')=>`<text x="${x}" y="${y}" font-size="17" text-anchor="${anchor}">${esc(s)}</text>`;
const path=d=>`<path d="${d}" fill="none" stroke="#507ea2" stroke-width="3"/>`;
function arrow(x,y,dx,dy,c='#417da4'){const a=Math.atan2(dy,dx),ex=x+dx,ey=y+dy;return path(`M${x} ${y}L${ex} ${ey}M${ex-10*Math.cos(a-.45)} ${ey-10*Math.sin(a-.45)}L${ex} ${ey}L${ex-10*Math.cos(a+.45)} ${ey-10*Math.sin(a+.45)}`).replaceAll('#507ea2',c);}
function fig(body,caption,w=560,h=300){return `<figure class="review-figure"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(caption)}"><title>${esc(caption)}</title>${body}</svg><figcaption>${esc(caption)}</figcaption></figure>`;}
function plot(f,{xmin=-4,xmax=5,ymin=-5,ymax=7,title='',points=[],color='#527fa2',second=null}={}){
 const W=600,H=340,L=52,R=560,T=25,B=290,X=x=>L+(x-xmin)/(xmax-xmin)*(R-L),Y=y=>B-(y-ymin)/(ymax-ymin)*(B-T);let s='';
 for(let x=Math.ceil(xmin);x<=xmax;x++){s+=line(X(x),T,X(x),B,'#e2eaf2',1);if(x!==0)s+=txt(X(x),Math.min(B,Y(0))+22,x);}
 const rough=(ymax-ymin)/6,pow=10**Math.floor(Math.log10(rough)),step=([1,2,5,10].find(v=>v*pow>=rough)||10)*pow;for(let j=Math.ceil(ymin/step);j*step<=ymax+1e-9;j++){const y=Number((j*step).toFixed(6));s+=line(L,Y(y),R,Y(y),'#e2eaf2',1);if(y!==0)s+=txt(Math.max(L,X(0))-10,Y(y)+5,String(y).replace('.',','),'end');}
 s+=line(L,Y(0),R,Y(0),'#7891a8')+line(X(0),T,X(0),B,'#7891a8')+txt(R+16,Y(0)-5,'x')+txt(X(0)+12,T-8,'y')+txt(X(0)-13,Y(0)+20,'0');
 const curve=(fn,c)=>{let d='',pen=false;for(let i=0;i<=500;i++){const x=xmin+(xmax-xmin)*i/500,y=fn(x);if(!Number.isFinite(y)||y<ymin||y>ymax){pen=false;continue;}d+=(pen?'L':'M')+X(x).toFixed(2)+' '+Y(y).toFixed(2);pen=true;}return `<path d="${d}" fill="none" stroke="${c}" stroke-width="3"/>`;};s+=curve(f,color);if(second)s+=curve(second,'#b56898');
 for(const [x,y,label]of points)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${color}"/>`+(label?txt(X(x)+10,Y(y)-12,label,'start'):'');
 return fig(s,title,W,H);
}
const fractionPicture=()=>fig(Array.from({length:12},(_,i)=>`<rect x="${32+i*40}" y="85" width="38" height="70" fill="${i<8?'#93c4e3':'#fff'}" stroke="#648ca9"/>`).join('')+txt(270,55,'Одинаковое целое · 12 равных частей')+txt(270,205,'8 из 12 частей = 2 из 3 частей'),'Сокращение дроби сохраняет долю одного и того же целого.',560,240);
function triangle({right=false,labels=['A','B','C'],sides=[],height=false,mid=false}={}){const A=[85,240],B=right?[85,50]:[280,45],C=[475,240];let s=path(`M${A}L${B}L${C}Z`)+txt(65,259,labels[0])+txt(B[0],28,labels[1])+txt(495,259,labels[2]);if(right)s+=path('M85 222H103V240');if(height){s+=line(B[0],B[1],280,240,'#af7296')+path('M280 225H295V240')+txt(280,265,'H');}if(mid)s+=line((A[0]+B[0])/2,(A[1]+B[1])/2,(C[0]+B[0])/2,(C[1]+B[1])/2,'#b27398')+txt(168,135,'M')+txt(393,135,'N');sides.forEach(([x,y,t])=>s+=txt(x,y,t));return fig(s,'Схема к условию. Чертёж иллюстративный; длины определяются данными задачи.');}
const rectangle=(a='a',b='b')=>fig(path('M110 65H440V225H110Z')+txt(275,253,a)+txt(78,150,b)+path('M110 207H128V225'),'Прямоугольник: соседние стороны перпендикулярны.');
const trapezoid=()=>fig(path('M90 235L190 65H370L470 235Z')+line(190,65,190,235,'#b27398')+path('M190 219H206V235')+txt(280,52,'a')+txt(280,263,'b')+txt(172,155,'h'),'Высота трапеции перпендикулярна обеим параллельным основаниям.');
const para=()=>fig(path('M80 225L190 65H475L365 225Z')+line(80,225,475,65)+line(190,65,365,225)+txt(62,247,'A')+txt(180,49,'B')+txt(491,61,'C')+txt(375,249,'D')+txt(279,165,'O'),'Вершины параллелограмма идут по порядку; диагонали пересекаются в O.');
function circleAngle(){const O=[280,150],r=104,P=a=>[O[0]+r*Math.cos(a*Math.PI/180),O[1]-r*Math.sin(a*Math.PI/180)],A=P(40),B=P(140),C=P(270);return fig(`<circle cx="280" cy="150" r="104" fill="white" stroke="#7195b1" stroke-width="2"/>`+path(`M${A}L${O}L${B}M${A}L${C}L${B}`)+txt(A[0]+17,A[1]-8,'A')+txt(B[0]-17,B[1]-8,'B')+txt(280,278,'C')+txt(280,170,'O')+txt(280,120,'100°'),'C лежит на большей дуге AB; центральный и вписанный углы опираются на одну меньшую дугу.');}
function forces(){return fig(`<rect x="220" y="105" width="110" height="90" rx="12" fill="#dfedf7" stroke="#7896af"/>`+line(70,198,490,198)+arrow(275,150,130,0)+arrow(275,150,-90,0,'#ae6b91')+arrow(275,150,0,-100)+arrow(275,150,0,100,'#ae6b91')+txt(440,140,'F тяги')+txt(125,140,'F сопротивл.')+txt(292,42,'N')+txt(304,270,'mg'),'На схеме показаны силы на одно тело. Направления заданы, длины стрелок условные.');}
function circleMotion(){return fig(`<circle cx="260" cy="155" r="100" fill="none" stroke="#9cbad0" stroke-width="2"/>`+line(260,155,360,155)+arrow(360,155,0,-100)+arrow(360,155,-83,0,'#ae6b91')+txt(245,173,'O')+txt(307,176,'R')+txt(385,62,'v')+txt(308,142,'aₙ'),'Скорость направлена по касательной; нормальное ускорение — к центру.');}
function work(){return fig(`<rect x="190" y="155" width="85" height="65" rx="8" fill="#dfedf7"/>`+line(55,223,495,223)+arrow(225,182,170,0)+arrow(225,182,130,-95,'#ae6b91')+`<path d="M270 182A45 45 0 0 0 261 155" fill="none" stroke="#7896af"/>`+txt(298,163,'α')+txt(410,201,'s')+txt(369,72,'F'),'Работа постоянной силы зависит от угла между силой и перемещением.');}
function energy(){return fig(line(70,240,490,240)+`<circle cx="210" cy="65" r="17" fill="#91bfde"/>`+line(320,65,320,240,'#b27398')+txt(345,160,'h')+arrow(210,92,0,97)+txt(245,159,'g')+txt(270,273,'Нулевой уровень потенциальной энергии'),'При падении без сопротивления потенциальная энергия переходит в кинетическую.');}
function motionGraph(kind){if(kind==='vx')return plot(t=>2*t-4,{xmin:0,xmax:4,ymin:-5,ymax:5,title:'vₓ(t) = 2t − 4, 0 ≤ t ≤ 4 с. Ось x: t, с; ось y: vₓ, м/с.'}).replace('>x</text>','>t</text>').replace('>y</text>','>vₓ</text>');if(kind==='rest')return plot(()=>3,{xmin:0,xmax:5,ymin:0,ymax:5,title:'Горизонтальный участок графика координаты: x(t) не меняется.'}).replace('>x</text>','>t</text>').replace('>y</text>','>x</text>');return plot(()=>4,{xmin:0,xmax:5,ymin:0,ymax:6,title:'График v(t): скорость 4 м/с на интервале от 0 до 5 с.'}).replace('>x</text>','>t</text>').replace('>y</text>','>v</text>');}
const parabola=()=>plot(x=>(x-2)**2-1,{xmin:-1,xmax:5,ymin:-2,ymax:8,title:'y = (x − 2)² − 1. Подписанные оси и сетка позволяют читать координаты.'});
const para8=()=>plot(x=>x*x-4,{xmin:-4,xmax:4,ymin:-5,ymax:6,title:'y = x² − 4. Масштаб каждой оси задан числовыми отметками.'});
const sine=()=>plot(x=>Math.cos(x*Math.PI/2),{xmin:0,xmax:8,ymin:-1.5,ymax:1.5,title:'Пример гармонических колебаний x(t). Ось абсцисс: t, с; ординат: x, м.'}).replace('>x</text>','>t</text>').replace('>y</text>','>x</text>');
const distribution=()=>fig([.25,.5,.25].map((p,i)=>`<rect x="${110+i*145}" y="${250-p*350}" width="70" height="${p*350}" rx="4" fill="#99c4df"/>`+txt(145+i*145,275,i)+txt(145+i*145,240-p*350,String(p).replace('.',','))).join('')+line(65,250,510,250)+line(65,250,65,30)+txt(65,18,'P')+txt(535,253,'X'),'Пример распределения: число орлов при двух независимых бросках честной монеты.');
const age=()=>fig(txt(95,75,'Сейчас')+txt(95,180,'Через 6 лет')+txt(270,40,'Сестра')+txt(435,40,'Брат')+txt(270,85,'x')+txt(435,85,'3x')+txt(270,190,'x + 6')+txt(435,190,'3x + 6')+arrow(270,105,0,50)+arrow(435,105,0,50),'Прибавляем одинаковое время к возрасту каждого человека.',560,240);
const squareSum=()=>fig(`<rect x="155" y="30" width="250" height="250" fill="#eef5fb" stroke="#7896af" stroke-width="2"/>`+line(315,30,315,280)+line(155,190,405,190)+txt(235,117,'a²')+txt(360,117,'ab')+txt(235,244,'ab')+txt(360,244,'b²')+txt(235,20,'a')+txt(360,20,'b')+txt(135,117,'a')+txt(135,244,'b'),'Квадрат со стороной a+b: площадь равна сумме a², ab, ab и b².',560,315);
const schema=[fractionPicture,null,squareSum,null,null,()=>motionGraph('vx'),forces,energy,null,parabola,distribution,age,work,circleMotion,()=>motionGraph('vx'),sine,para8,null,()=>triangle({height:true,mid:true}),squareSum,forces,null];
const formulas=[
['a/b = (ak)/(bk)','(a/b) + (c/b) = ((a+c)/b)','(a/b) : (c/d) = (ad/bc)'],
['a(b+c) = ab+ac','ax = b ⇒ x = b/a'],
['(a+b)² = a²+2ab+b²','(a−b)² = a²−2ab+b²','a²−b² = (a−b)(a+b)'],
['s = vt','vср = sобщ/tобщ','pсовм = p₁+p₂'],
['mвещ = (mc)/100','cсм = ((m₁c₁+m₂c₂)/(m₁+m₂))','aₙ = a₁+(n−1)d','bₙ = b₁qⁿ⁻¹'],
['vₓ = v₀ₓ+aₓt','Δx = v₀ₓt+(aₓt²)/2'],
['Fрез = ma','aₓ = Fрезₓ/m'],
['Eк = (mv²)/2','Eп = mgh','v = (2πR)/T','aₙ = v²/R'],
['√(x²) = |x|','√(ab) = √a·√b','√(a/b) = √a/√b'],
['y = a(x−h)²+m','yкас = f(x₀)+f′(x₀)(x−x₀)'],
['M(X) = Σxᵢpᵢ','D(X) = M(X²)−(M(X))²','σ = √(D(X))'],
['3x+6 = 2(x+6)'],
['A = Fs cos α','Pср = A/t','Eк = (mv²)/2','Eпруж = (kx²)/2','η = Aпол/Aзатр'],
['ν = 1/T','ω = (2π)/T','v = ωR','aₙ = v²/R','a = √(aₙ²+aτ²)'],
['vср = sобщ/tобщ','vₓ = v₀ₓ+aₓt','Δx = v₀ₓt+(aₓt²)/2'],
['x = A cos(ωt+φ₀)','aₓ = −ω²x','T = 2π√(m/k)','T = 2π√(l/g)'],
['y = kx+b','y = c/x','y = √x'],
['D = b²−4ac','x = ((−b±√D)/(2a))','√(a²) = |a|'],
['Sтреуг = (ah)/2','Sтрап = ((a+b)h)/2','c² = a²+b²','S₂/S₁ = k²'],
['(a+b)² = a²+2ab+b²','(a−b)² = a²−2ab+b²','a²−b² = (a−b)(a+b)'],
['Fтяж = mg','Fупр = k|Δl|','N = mg cos α','P = m(g+aₓ)'],
['(x/2)+(x/3) = 10','3x+2x = 60','x = 12']
];
const assumptions={0:'Здесь b≠0, d≠0, k≠0; при делении также c≠0.',1:'В формуле x=b/a требуется a≠0. При a=0 отдельно проверь, является ли равенство тождеством или противоречием.',3:'В формулах s=vt и p=A/t скорости и производительности постоянны; единицы согласованы.',4:'c₁ и c₂ — числовые значения процентов; результат cсм — тоже число процентов. Общая масса положительна; при смешивании нет потерь вещества.',6:'Законы Ньютона применяются в инерциальной системе; масса постоянна. Fрез — векторная сумма всех сил.',7:'Eп=mgh применимо вблизи Земли; g=10 м/с², если не оговорено иначе.',8:'Для корней a≥0, b≥0, а в знаменателе b>0. После возведения уравнения в квадрат проверь каждый корень.',9:'Парабола требует a≠0. Признак экстремума предполагает непрерывность в точке и постоянные знаки производной по обе стороны.',10:'Формулы относятся к дискретной величине с существующими M(X) и D(X). Все pᵢ≥0, Σpᵢ=1.',12:'Для A=Fs cos α сила постоянна, α — угол к перемещению. Здесь g=10 м/с²; сопротивлением воздуха пренебрегаем. η — доля; для процентов умножь её на 100%.',13:'Полное ускорение равно aₙ только при постоянном модуле скорости. T и ν — характеристики равномерного вращения; углы в формулах измеряются в радианах.',14:'Ускорение постоянно в формулах равноускоренного движения. Для бросков g=10 м/с², сопротивления воздуха нет; начальная скорость фиксирована.',15:'Идеальный пружинный маятник: без потерь, k>0, m>0. Формула математического маятника верна для малых углов. x отсчитывается от положения равновесия.',16:'В y=c/x требуется x≠0; при c≠0 это гипербола. Функция √x определена при x≥0.',17:'Квадратная формула требует a≠0: при D>0 два действительных корня, при D=0 один, при D<0 действительных корней нет.',18:'h — высота к указанному основанию. k — отношение соответствующих сторон подобных фигур.',20:'Силы действия и противодействия приложены к разным телам. N=mg cos α — лишь при нулевом ускорении по нормали и отсутствии иных сил по нормали. В формуле веса ось направлена вверх, g=10 м/с², контакт с полом сохраняется.',21:'Здесь знаменатели — постоянные ненулевые числа. На НОК умножают каждое слагаемое в обеих частях.'};
function update(index,n,q,explanation){const t=extraTests[index]?.questions[n-1];if(!t)return;if(q)t.q=q;if(explanation)t.explanation=explanation;}
// Условия самодостаточны: значения и предположения находятся непосредственно в вопросе.
update(4,5,'Два бегуна одновременно стартуют из одной точки и равномерно бегут в одном направлении по кругу длиной 400 м со скоростями 5 и 3 м/с. Через сколько секунд быстрый впервые догонит медленного после старта?');
update(5,3,'Тело движется прямолинейно из покоя с постоянным ускорением 2 м/с². Найдите путь за 3 с.');
update(9,10,'Функция непрерывна при x=a. Слева от a её производная отрицательна, справа положительна в некоторой окрестности a. Что находится при x=a?');
update(10,4,'X принимает значения −1 и 1 с вероятностями 0,25 и 0,75. Найдите M(X²).');
update(10,5,'X принимает значения −1 и 1 с вероятностями 0,25 и 0,75. Найдите D(X).');
update(10,14,'X принимает значения 0 и 4 с вероятностями по 0,5. Найдите дисперсию.');
update(20,9,'Тело лежит на неподвижной наклонной плоскости с углом 60° к горизонту. mg=100 Н; других сил по нормали и ускорения по нормали нет. Найдите N.');
update(12,7,'Тело массой 2 кг находится на высоте 3 м над землёй. При g=10 м/с² найдите потенциальную энергию относительно уровня земли.');
update(12,13,'Тело падает из покоя с высоты 20 м без сопротивления воздуха. g=10 м/с². Найдите скорость перед землёй в м/с. Введите число.');
update(12,14,'Тело массой 1 кг скользит по горизонтальной поверхности 5 м. Коэффициент трения скольжения 0,2; g=10 м/с². Других вертикальных сил, кроме тяжести и реакции опоры, нет. Найдите работу трения в джоулях. Введите число.');
update(12,15,'Механизм поднимает груз массой 10 кг на 4 м за 2 с. КПД 80%, g=10 м/с². Найдите потребляемую среднюю мощность в ваттах. Введите число.');
update(13,7,'Тело равномерно движется по окружности радиуса 2 м со скоростью 4 м/с. Найдите модуль ускорения.');
update(13,10,'При равномерном движении по окружности «центростремительная сила» — это:');
update(13,12,'Тело равномерно движется по окружности радиуса 0,5 м с периодом 2 с. Скорость имеет вид v=kπ м/с. Найдите коэффициент k. Введите число.');
update(13,15,'Тело массой 2 кг равномерно движется по окружности радиуса 4 м со скоростью 6 м/с. Найдите модуль равнодействующей сил в ньютонах. Введите число.');
update(14,5,'При прямолинейном равноускоренном движении скорость выросла с 2 до 8 м/с за 3 с. Найдите ускорение в м/с².');
update(14,6,'Тело начинает прямолинейное движение из покоя с постоянным ускорением 2 м/с². Найдите путь за 3 с.');
update(14,7,'Тело брошено вертикально вверх. Сопротивления воздуха нет, g=10 м/с². Чему равно ускорение в верхней точке?');
update(14,8,'Тело падает из покоя с высоты 20 м без сопротивления воздуха. g=10 м/с². Найдите время падения.');
update(14,10,'При какой величине угла к горизонту дальность полёта максимальна при одной и той же начальной скорости? Высоты старта и приземления равны, сопротивления воздуха нет.');
update(16,13,'Пешеход движется равномерно без остановок: за 1, 2, 3 часа проходит 4, 8, 12 км соответственно. Найдите путь за 5 часов в километрах. Введите число.');
update(16,14,null,'Подставьте x=3: y=12/3=4.');
update(16,15,'В коробке 3 красных и 5 синих шаров. Каждый шар имеет одинаковую вероятность быть выбранным. Найдите вероятность выбора красного шара. Введите число или дробь.','Всего 8 шаров, из них 3 красных. Вероятность равна 3/8.');
update(18,3,'Найдите площадь прямоугольника со сторонами 5 и 8 см.');
update(18,12,'Точки A, B, C лежат на окружности с центром O. Центральный угол AOB равен 100°, точка C лежит на большей дуге AB. Найдите угол ACB в градусах. Введите число.');
// Убираем повторяющееся служебное «Для проверки», оставляя одну чёткую просьбу.
extraTests.forEach(t=>t.questions.forEach(q=>{q.q=q.q.replace(/Для проверки: /g,'В поле ответа: ').replace(/Введите результат\. Введите только число или дробь\./,'Введите число или дробь.');q.explanation=q.explanation.replace(/\.Если/g,'. Если');}));
tutoringLessons[10][2]='Для X=−1 и X=1 с вероятностями 0,25 и 0,75: M(X)=−0,25+0,75=0,5; M(X²)=1; D(X)=1−0,5²=0,75.';
tutoringLessons[11][2]='Пусть сестре x лет, брату 3x. Через 6 лет: 3x+6=2(x+6). Отсюда x=6: сестре 6, брату 18. Проверка через 6 лет: 24=2·12.';
// Лаконичная теория вместо длинных монолитных конспектов.
const oldLesson=lessonHTML;
lessonHTML=function(index){const item=tutoringLessons[index];if(!item)return oldLesson(index);const [title,rules,example,mistake]=item;const clean=rules.flatMap(s=>s.replace(/\.Если/g,'. Если').split(/(?<=[.!?])\s+(?=[А-ЯЁ])/)).filter(s=>!s.startsWith('В заданиях')&&!s.startsWith('В открытых заданиях'));return '<h2>'+esc(title)+'</h2><h3>Главное</h3><ul>'+clean.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul><div class="review-formulas">'+(formulas[index]||[]).map(s=>'<div class="review-formula">'+esc(s)+'</div>').join('')+'</div>'+(assumptions[index]?'<p class="review-note">'+esc(assumptions[index])+'</p>':'')+(schema[index]?schema[index]():'')+'<h3>Пример с объяснением</h3><div class="review-example">'+esc(example)+'</div><h3>На что обратить внимание</h3><p>'+esc(mistake)+'</p>';};
function questionVisual(t,i){const q=t.questions[i].q;
 if(t.title.includes('Функции и графики · 8')){if([0,1,2,9].includes(i))return plot(x=>-2*x+6,{xmin:-1,xmax:5,ymin:-4,ymax:8,title:'График y = −2x + 6.'});if([3,4,13].includes(i))return plot(x=>12/x,{xmin:-8,xmax:8,ymin:-8,ymax:8,title:'Гипербола y = 12/x; x = 0 не входит в область определения.'});if([5,6].includes(i))return plot(Math.sqrt,{xmin:-1,xmax:9,ymin:-1,ymax:4,title:'График арифметического квадратного корня y = √x.'});if([7,8,10,11].includes(i))return para8();if(i===12)return '<div class="review-table"><table><caption>Данные равномерного движения</caption><tr><th>t, ч</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>s, км</th><td>0</td><td>4</td><td>8</td><td>12</td></tr></table></div>';}
 if(t.title==='Графики функций и правила их анализа'){if([0,1,2,3,10].includes(i))return parabola();if(i===11)return plot(x=>Math.abs(x-2),{xmin:-1,xmax:5,ymin:-1,ymax:6,second:x=>x,title:'Пересечение y = |x − 2| (синий) и y = x (розовый).'});if([12,14].includes(i))return plot(x=>x*x*x-3*x,{xmin:-2,xmax:2,ymin:-3,ymax:3,title:'График f(x) = x³ − 3x на отрезке [−2; 2].'});if(i===13)return plot(x=>x*x-4*x+3,{xmin:0,xmax:5,ymin:-3,ymax:6,title:'Исходный график f(x) = x² − 4x + 3. Касательную нужно построить самостоятельно.'});}
 if(t.title.startsWith('Геометрия:')){if([1,2].includes(i))return rectangle('8 см','5 см');if(i===3||i===14)return triangle({right:true,sides:[[60,150,'6'],[280,266,'8']]});if(i===4)return trapezoid();if([5,6].includes(i))return para();if([7,12,13].includes(i))return triangle({height:true,mid:i!==12,sides:i>=12?[[165,130,'13'],[397,130,'13'],[280,283,'AC = 10']]:[]});if(i===11)return circleAngle();}
 if(t.title==='Кинематика и графики'){if(i===3)return motionGraph('speed');if(i===4)return motionGraph('rest');}
 if(t.title.startsWith('Кинематика ·')){if(i===3)return motionGraph('rest');if(i===11)return motionGraph('vx');if([12,13].includes(i))return energy();}
 if(t.title.startsWith('Движение по окружности')&&[3,4,6,8,12,14].includes(i))return circleMotion();
 if(t.title.startsWith('Работа, мощность')&&[1,2,10].includes(i))return work();
 if(t.title.startsWith('Периодическое')&&[0,1,4,5,7].includes(i)){if(i===4||i===5)return plot(t=>.2*Math.cos(3*t),{xmin:0,xmax:4,ymin:-.3,ymax:.3,title:'График по условию: x = 0,2 cos(3t). По горизонтали t, с; по вертикали x, м.'}).replace('>x</text>','>t</text>').replace('>y</text>','>x</text>');return sine();}
 if(t.title==='Динамика: законы Ньютона'&&[0,3].includes(i))return forces();
 return '';}
const oldOpen=openExtra;openExtra=function(index){oldOpen(index);const root=document.getElementById('extra-root');if(!root)return;const test=extraTests[index];root.querySelectorAll('.triangle-question').forEach((wrap,i)=>{if(wrap.querySelector('.review-figure,.review-table'))return;const html=questionVisual(test,i);if(html)wrap.querySelector('p')?.insertAdjacentHTML('afterend',html);});formatMath(root);};
function triangleFigures(){document.querySelectorAll('#triangle-questions .triangle-question').forEach((wrap,i)=>{if(wrap.querySelector('.review-figure'))return;let h='';if([17,18,19,20,21,27].includes(i))h=triangle({right:true});else if([11,14,16,31,33].includes(i))h=triangle({height:true});else if([26,28,34].includes(i))h=triangle({height:true});else if(i===35)h=fig(path('M80 245L260 40L480 245Z')+line(152,163,348,163,'#ae6b91')+txt(260,26,'A')+txt(65,265,'B')+txt(495,265,'C')+txt(130,161,'D')+txt(368,161,'E')+txt(260,150,'DE ∥ BC'),'D лежит на AB, E лежит на AC; DE параллелен BC.');if(h)wrap.querySelector('p')?.insertAdjacentHTML('afterend',h);});}
const beforeTriangles=renderTriangleQuestions;renderTriangleQuestions=function(){beforeTriangles();triangleFigures();};triangleFigures();
// Простые формулы геометрии на видном месте перед разделом.
const triangleCards=['∠A+∠B+∠C = 180°','|a−b| < c < a+b','AB=DE, AC=DF, ∠A=∠D','BM = MC','a²+b² = c²','S₂/S₁ = k²','S = (ah)/2','S = (ah)/2'];
Object.keys(triangleTheory).forEach((key,i)=>triangleTheory[key]+='<div class="review-formula">'+esc(triangleCards[i])+'</div>');
// Обновляем уже отрисованную теорию первого теста, не трогая выбранные ответы.
const theoryNodes=document.querySelectorAll('#triangle-questions .triangle-theory');theoryNodes.forEach((el,i)=>{if(triangleCards[i])el.insertAdjacentHTML('beforeend','<div class="review-formula">'+esc(triangleCards[i])+'</div>');});
formatMath(document.body);
})();
