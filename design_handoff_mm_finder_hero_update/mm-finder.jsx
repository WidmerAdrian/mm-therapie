/* global React, ReactDOM, BodyFigure */
const {useState,useEffect,useRef}=React;
const MMR={
nacken:{n:'Nacken und Schultern',v:['front','back'],s:['Nackenschmerzen','Spannungskopfschmerzen','Schulterschmerzen','Migräne','HWS-Syndrom','Schwindel'],t:['trigger','tief','klass','dorn'],tip:'Verspannungen im Nacken sind oft der Grund für Kopfschmerzen. Wer viel sitzt, ist besonders anfällig.'},
brust:{n:'Brust und Atmung',v:['front'],s:['Verspannte Brustmuskulatur','Flache Atmung','Stress','Innere Unruhe'],t:['klass','andu'],tip:'Eine klassische Massage wirkt auf den ganzen Körper und auf die Psyche entspannend.'},
ruecken:{n:'Rücken',v:['back'],s:['Rückenschmerzen','Blockaden der Wirbel','Lendenwirbelbeschwerden','Brustwirbelsäule','Skoliosen','Ausstrahlung in die Beine'],t:['dorn','trigger','tief','andu'],tip:'Rückenprobleme entstehen oft durch Fehlstellungen von Becken oder Wirbelsäule. Hier setzt die Dorn-Breuss-Therapie an.'},
arm:{n:'Arm und Ellbogen',v:['front','back'],s:['Tennisarm','Tennisellbogen','Muskelverhärtungen','Kraftverlust'],t:['trigger','tief'],tip:'Der Schmerz sitzt oft nicht dort, wo er entsteht. Triggerpunkte im Unterarm strahlen bis in den Ellbogen aus.'},
hand:{n:'Hand und Unterarm',v:['front','back'],s:['Schmerzen in Unterarm und Händen','Gefühlsstörungen','Schwellungen nach Operationen'],t:['tief','lymph'],tip:'Kribbeln oder Taubheit in den Händen kann von Muskelblockaden im Unterarm oder Nacken kommen.'},
bauch:{n:'Bauch und Verdauung',v:['front'],s:['Verdauungsbeschwerden','Zyklusstörungen','Blasenentzündungen','Innere Anspannung'],t:['fuss','klass'],tip:'Über die Fussreflexzonen lassen sich die zugehörigen Organe sanft anregen.'},
huefte:{n:'Hüfte und Leiste',v:['front'],s:['Leistenschmerzen','Hüftschmerzen','Unterschiedliche Beinlängen'],t:['tief','dorn'],tip:'Bei der Dorn-Therapie werden zuerst die Beinlängen geprüft und bei Bedarf sanft korrigiert.'},
gesaess:{n:'Gesäss und Becken',v:['back'],s:['Beckenfehlstellung','Ausstrahlung in die Beine','Ischiasähnliche Schmerzen'],t:['dorn','tief'],tip:'Eine Korrektur am Becken wirkt sich oft auf den ganzen Rücken aus.'},
oberschenkel:{n:'Oberschenkel',v:['front','back'],s:['Chronische Zerrungen','Muskelverhärtungen','Schwellungen','Schwere Beine'],t:['tief','lymph','andu'],tip:'Nach Sportverletzungen hilft die Tiefenmassage, wenn das Aufbautraining nicht vorankommt.'},
knie:{n:'Knie',v:['front','back'],s:['Knieschmerzen','Schwellungen nach Operationen','Bewegungseinschränkungen'],t:['tief','lymph'],tip:'Nach Operationen reduziert die Lymphdrainage Schwellungen und Schmerzen.'},
wade:{n:'Wade',v:['front','back'],s:['Achillessehnenschmerzen','Schwere, geschwollene Beine','Muskelverhärtungen'],t:['tief','lymph','andu'],tip:'Der Grund für Achillessehnenschmerzen liegt meistens in der Wadenmuskulatur.'},
fuss:{n:'Fuss und Ferse',v:['front','back'],s:['Fersensporn','Durchblutungsstörungen','Kalte Füsse','Müde Füsse'],t:['fuss','trigger'],tip:'Am Fuss spiegelt sich der ganze Körper. Eine Behandlung wirkt weit über die Füsse hinaus.'},
g_erschoepft:{g:1,n:'Erschöpfung',s:['Müdigkeit','Fehlende Energie','Fatigue-Syndrom','Schwäche'],t:['klass','andu','fuss'],tip:'Viele rheumatische Erkrankungen gehen mit Fatigue einher. Sanfte Behandlungen geben neue Energie.'},
g_schlaf:{g:1,n:'Schlafstörungen',s:['Einschlafprobleme','Unruhiger Schlaf','Verspannungen in der Nacht'],t:['fuss','andu','klass'],tip:'Eine gute Durchblutung verbessert nachweislich die Schlafqualität.'},
g_stress:{g:1,n:'Stress',s:['Innere Unruhe','Verspannungen','Kopfschmerzen'],t:['klass','fuss','trigger'],tip:'Stress hinterlässt Spuren im Körper. Massage berührt Körper, Geist und Seele.'},
g_relax:{g:1,n:'Einfach entspannen',s:['Auszeit vom Alltag','Wohlbefinden','Tiefe Entspannung'],t:['klass','fuss','andu'],tip:'Sie brauchen keinen Grund. Gönnen Sie Ihrem Körper einfach Erholung.'}
};
const ORDER=['nacken','brust','ruecken','arm','hand','bauch','huefte','gesaess','oberschenkel','knie','wade','fuss'];
const GEN=['g_erschoepft','g_schlaf','g_stress','g_relax'];
const I={
ck:<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".14"></circle><path d="M7.5 12.5l3 3L16.5 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path></svg>,
l:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>,
r:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"></path></svg>,
x:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>,
tap:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10l4.2.8a2 2 0 0 1 1.6 2.3l-.8 4.6A3 3 0 0 1 14 20h-2.6a3 3 0 0 1-2.4-1.2L5.6 14a1.5 1.5 0 0 1 2.3-1.9L9 13.3"></path></svg>,
bulb:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"></path></svg>
};
function useMedia(q){const[m,s]=useState(()=>matchMedia(q).matches);useEffect(()=>{const mq=matchMedia(q),f=()=>s(mq.matches);mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[q]);return m}
function Insp({id,dir,onStep,onClose,num,docked,setDir}){
const R=MMR[id],TH=window.MM_TH||{},ref=useRef(null),g=useRef(null);
const down=e=>{if(!docked||e.target.closest('button,a'))return;g.current={x:e.clientX,y:e.clientY,dx:0,dy:0};ref.current.style.transition='none';e.currentTarget.setPointerCapture(e.pointerId)};
const move=e=>{if(!g.current)return;const dx=e.clientX-g.current.x,dy=e.clientY-g.current.y;g.current.dx=dx;g.current.dy=dy;ref.current.style.transform='translate('+(Math.abs(dx)>Math.abs(dy)&&!R.g?dx*.35:0)+'px,'+(dy>0?dy:dy/5)+'px)'};
const up=()=>{if(!g.current)return;const{dx,dy}=g.current;g.current=null;ref.current.style.transition='';ref.current.style.transform='';if(dy>80)onClose();else if(Math.abs(dx)>60&&!R.g)onStep(dx<0?1:-1)};
return <div className={'ff-insp'+(docked?' docked':'')} ref={ref} role="region" aria-label={R.n}>
<div className="ff-grip" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
{docked&&<span className="ff-grab" aria-hidden="true"></span>}
<div className="ff-ih"><span className="ff-num" key={id}>{R.g?I.ck:String(num).padStart(2,'0')}</span><div className={'ff-it '+dir} key={id+'t'}><b>{R.n}</b><small>{R.t.length} passende Behandlungen</small></div>
{!R.g&&<div className="ff-nav"><button className="ff-ib" onClick={()=>onStep(-1)} aria-label="Vorherige Stelle">{I.l}</button><button className="ff-ib" onClick={()=>onStep(1)} aria-label="Nächste Stelle">{I.r}</button></div>}
<button className="ff-ib" onClick={onClose} aria-label="Schliessen">{I.x}</button></div></div>
<div className="ff-body" key={id+'b'}>
<div className="ff-lbl">Typische Beschwerden</div>
<ul className="ff-sym">{R.s.map((s,i)=><li key={s} style={{'--i':i}}>{I.ck}<span>{s}</span></li>)}</ul>
<div className="ff-lbl">Das kann Ihnen helfen</div>
<div className="ff-tr">{R.t.map((t,i)=>{const T=TH[t];if(!T)return null;return <button key={t} className="ff-trc" data-open={t} style={{'--c':T.c,'--i':i}}><img src={T.img[0]} alt=""></img><span><b>{T.n}</b><small>{i===0?'Passt besonders gut':'Passt gut'}</small></span>{I.r}</button>})}</div>
<p className="ff-tip">{I.bulb}<span>{R.tip}</span></p>
</div>
<div className="ff-cta"><a className="btn btn-p" href="#kontakt" onClick={onClose}>Termin vereinbaren</a><a className="btn btn-s" href="tel:+41791995588">Anrufen</a></div>
</div>}
function Finder(){
const[view,setView]=useState('front'),[act,setAct]=useState(null),[touched,setT]=useState(false),[dir,setDir]=useState('fwd'),[prev,setPrev]=useState(null);
const wide=useMedia('(min-width:960px)'),stageRef=useRef(null),cardRef=useRef(null);
const ids=ORDER.filter(id=>MMR[id].v.includes(view));
const vib=()=>navigator.vibrate&&navigator.vibrate(8);
const pick=id=>{vib();setT(true);setDir('fwd');setAct(a=>a===id?null:id)};
const pickAny=id=>{const R=MMR[id];if(!R.g&&!R.v.includes(view))setView(R.v[0]);pick(id)};
const step=d=>{vib();const i=ids.indexOf(act),n=ids[(i+d+ids.length)%ids.length];setDir(d>0?'fwd':'bwd');setAct(n)};
const sw=v=>{vib();setView(v);if(act&&!MMR[act].g&&!MMR[act].v.includes(v))setAct(null)};
const close=()=>{vib();setAct(null)};
useEffect(()=>{if(wide||!act)return;const io=new IntersectionObserver(([e])=>{if(e.intersectionRatio<.25)setAct(null)},{threshold:[0,.25]});const t=setTimeout(()=>io.observe(cardRef.current),900);return()=>{clearTimeout(t);io.disconnect()}},[act,wide]);
useEffect(()=>{document.body.classList.toggle('ff-docked',!wide&&!!act);return()=>document.body.classList.remove('ff-docked')},[act,wide]);
const ripple=e=>{if(!e.target.closest||!e.target.closest('.zone'))return;const r=stageRef.current.getBoundingClientRect(),s=document.createElement('span');s.className='ff-rip';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';stageRef.current.appendChild(s);setTimeout(()=>s.remove(),900)};
const num=act&&!MMR[act].g?ORDER.indexOf(act)+1:0;
const ip={id:act,dir,num,onStep:step,onClose:close};
return <div className={'ff'+(act?' has':'')+(act&&MMR[act].g?' gen':'')}>
<div className="ff-card" ref={cardRef}>
<div className="ff-aura"><i></i><i></i><i></i></div>
<div className="ff-seg"><span className={'ff-seg-l'+(view==='back'?' back':'')}></span><button className={view==='front'?'on':''} onClick={()=>sw('front')}>Vorne</button><button className={view==='back'?'on':''} onClick={()=>sw('back')}>Hinten</button></div>
<div className="ff-stage" ref={stageRef} onPointerDown={ripple}><div className="ff-fig" key={view}><BodyFigure view={view} active={act&&!MMR[act].g?act:prev} onSelect={pick}></BodyFigure>{!touched&&!act&&<span className="ff-hint" style={{left:'50%',top:'17.4%'}} aria-hidden="true"><i></i><b>Hier tippen</b></span>}</div></div>
{!act&&<div className="ff-pill">{I.tap}Auf eine Stelle tippen</div>}
</div>
{wide&&<div className="ff-side">{act?<Insp {...ip}></Insp>:<div className="ff-pick"><div className="ff-pk-h"><span className="ff-pk-ic">{I.tap}</span><span><b>Wo tut es weh?</b><small>Zeigen Sie auf eine Stelle, sie leuchtet am Körper auf.</small></span></div><div className="ff-pk-g" onMouseLeave={()=>setPrev(null)}>{ids.map((id,i)=><button key={view+id} className={'ff-pk'+(prev===id?' on':'')} style={{'--i':i}} onMouseEnter={()=>setPrev(id)} onFocus={()=>setPrev(id)} onBlur={()=>setPrev(null)} onClick={()=>{setPrev(null);pick(id)}}><span className="ff-pk-n">{String(ORDER.indexOf(id)+1).padStart(2,'0')}</span><span className="ff-pk-l"><b>{MMR[id].n}</b><small>{MMR[id].s[0]}</small></span></button>)}</div></div>}</div>}
{!wide&&<div className="ff-zc"><span className="ff-lbl">Oder Stelle wählen</span><div className="ff-chips">{ids.map((id,i)=><button key={view+id} className={'ff-chip z'+(act===id?' on':'')} style={{'--i':i}} onClick={()=>pick(id)}><b>{String(ORDER.indexOf(id)+1).padStart(2,'0')}</b>{MMR[id].n}</button>)}</div></div>}
<div className="ff-gen"><span className="ff-lbl">Oder eher allgemein?</span><div className="ff-chips">{GEN.map((id,i)=><button key={id} className={'ff-chip'+(act===id?' on':'')} style={{'--i':i}} onClick={()=>pickAny(id)}>{MMR[id].n}</button>)}</div></div>
{!wide&&act&&ReactDOM.createPortal(<div className="ff-dock"><Insp {...ip} docked></Insp></div>,document.body)}
</div>}
ReactDOM.createRoot(document.getElementById('finderRoot')).render(<Finder></Finder>);
