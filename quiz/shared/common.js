// Shared helpers for every Apex TV app. No dependencies.
(function(){
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  function el(tag,attrs,kids){var e=document.createElement(tag);for(var k in (attrs||{})){if(k==="text")e.textContent=attrs[k];else if(k==="class")e.className=attrs[k];else e.setAttribute(k,attrs[k]);}
    (kids||[]).forEach(function(c){e.appendChild(c)});return e}
  function toast(msg,ms){var t=el("div",{class:"toast",text:msg});document.body.appendChild(t);setTimeout(function(){t.remove()},ms||2500)}
  function store(k,v){try{if(v===undefined){var r=localStorage.getItem("apex:"+k);return r?JSON.parse(r):null}localStorage.setItem("apex:"+k,JSON.stringify(v))}catch(e){return null}}
  function getJSON(url,opts,ms){
    var c=new AbortController();var t=setTimeout(function(){c.abort()},ms||8000);
    opts=opts||{};opts.signal=c.signal;
    return fetch(url,opts).then(function(r){clearTimeout(t);if(!r.ok)throw new Error(url.split("?")[0]+" returned "+r.status);return r.json()})
      .catch(function(e){clearTimeout(t);throw new Error((e.name==="AbortError"?"Timed out: ":"")+(e.message||e))})}
  function pad(n){return (n<10?"0":"")+n}

  // Remote control: register colour keys and media keys on Samsung TVs
  try{if(window.tizen&&tizen.tvinputdevice){["ColorF0Red","ColorF1Green","ColorF2Yellow","ColorF3Blue","MediaPlayPause","MediaPlay","MediaPause","MediaStop","MediaFastForward","MediaRewind","0","1","2","3","4","5","6","7","8","9"].forEach(function(k){try{tizen.tvinputdevice.registerKey(k)}catch(e){}})}}catch(e){}

  var colour={403:"red",404:"green",405:"yellow",406:"blue"};
  var handlers={};
  function on(name,fn){handlers[name]=fn}   // names: red green yellow blue back play enter left right up down
  function focusables(){return $$(".f").filter(function(e){return e.offsetParent!==null})}
  function move(dir){
    var all=focusables();var cur=document.activeElement;
    if(!cur||cur.className.indexOf("f")<0){if(all[0])all[0].focus();return}
    var a=cur.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2,best=null,bd=1e9;
    all.forEach(function(e){if(e===cur)return;var b=e.getBoundingClientRect(),bx=b.left+b.width/2,by=b.top+b.height/2,dx=bx-ax,dy=by-ay;
      var ok=dir==="left"?dx<-4:dir==="right"?dx>4:dir==="up"?dy<-4:dy>4;if(!ok)return;
      var d=(dir==="left"||dir==="right")?Math.abs(dx)+Math.abs(dy)*2.5:Math.abs(dy)+Math.abs(dx)*2.5;if(d<bd){bd=d;best=e}});
    if(best){best.focus();best.scrollIntoView&&best.scrollIntoView({block:"nearest"})}}
  function exitApp(){
    if(history.length>1&&document.referrer){history.back();return}
    try{tizen.application.getCurrentApplication().exit()}catch(e){location.href="../index.html"}}

  // On-screen buttons for the TV browser, where colour keys may not reach the page.
  function bar(extra){
    if(window.tizen&&tizen.application)return;           // real Tizen app: remote keys work, no bar needed
    var b=document.getElementById("apexbar");if(!b){b=el("div",{id:"apexbar",style:"position:fixed;right:24px;bottom:56px;z-index:50;display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;max-width:70%"});document.body.appendChild(b)}
    b.innerHTML="";
    var cols={"c-r":["red","#e5484d"],"c-g":["green","#3fb950"],"c-y":["yellow","#d9a521"],"c-b":["blue","#4c8dff"]},m,re=/<span class="(c-[rgyb])">([^<]*)<\/span>/g,list=[];
    while((m=re.exec(window.HINTS||""))){(function(c,t){list.push({t:t.replace(/^(RED|GREEN|YELLOW|BLUE)\s*/i,"")||c[0],c:c[1],fn:function(){var h=handlers[c[0]];if(h)h({preventDefault:function(){}})}})})(cols[m[1]],m[2])}
    (extra||[]).forEach(function(x){list.push(x)});
    list.push({t:"Home",c:"#555",fn:exitApp});
    list.forEach(function(x){var e=el("div",{class:"f",tabindex:"0",text:x.t,style:"background:"+x.c+";color:#111;font-size:.7em;padding:10px 18px;border-radius:30px;cursor:pointer;font-weight:700"});e.onclick=x.fn;b.appendChild(e)})}
  document.addEventListener("keydown",function(e){
    var k=e.keyCode,n=null;
    if(colour[k])n=colour[k];
    else if(k===37)n="left";else if(k===39)n="right";else if(k===38)n="up";else if(k===40)n="down";
    else if(k===13)n="enter";else if(k===10009||k===8||k===27)n="back";
    else if(k===10252||k===415||k===19||k===32)n="play";
    else if(k>=48&&k<=57)n="num"+(k-48);
    if(!n)return;
    var h=handlers[n];
    if(h&&h(e)!==false){e.preventDefault();return}
    if(n==="left"||n==="right"||n==="up"||n==="down"){move(n);e.preventDefault()}
    else if(n==="enter"){var a=document.activeElement;if(a&&a.click)a.click()}
    else if(n==="back"){exitApp();e.preventDefault()}
  });
  window.addEventListener("load",function(){var f=focusables()[0];if(f)f.focus();
    if(!$(".hint")){var h=el("div",{class:"hint"});h.innerHTML='<span>◀▲▼▶ move</span><span>OK select</span><span>Back exit</span>'+(window.HINTS||"");document.body.appendChild(h)}});
  window.addEventListener("load",function(){bar(window.EXTRA)});
  window.A={bar:bar,call:function(n,e){var h=handlers[n];if(h)h(e||{preventDefault:function(){}})},$:$,$$:$$,el:el,toast:toast,store:store,getJSON:getJSON,pad:pad,on:on,exit:exitApp,cfg:window.APEX};
})();
