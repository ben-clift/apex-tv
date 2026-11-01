// Apex TV shell: settings, app list, header, action dock, empty/error states, remote control, offline.
(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var root=document.documentElement.getAttribute("data-root")||"./";
  var saved={};try{saved=JSON.parse(localStorage.getItem("apex:settings")||"{}")}catch(e){}
  var cfg=Object.assign({},window.APEX||{},saved);
  function saveSettings(o){try{localStorage.setItem("apex:settings",JSON.stringify(o));return true}catch(e){return false}}

  function el(tag,attrs,html){var e=document.createElement(tag);for(var k in (attrs||{})){if(k==="class")e.className=attrs[k];else if(k==="text")e.textContent=attrs[k];else e.setAttribute(k,attrs[k])}if(html!==undefined)e.innerHTML=html;return e}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function toast(msg,ms){var t=el("div",{class:"toast",role:"status",text:msg});document.body.appendChild(t);setTimeout(function(){t.remove()},ms||2600)}
  function store(k,v){try{if(v===undefined){var r=localStorage.getItem("apex:"+k);return r?JSON.parse(r):null}localStorage.setItem("apex:"+k,JSON.stringify(v))}catch(e){return null}}
  function getJSON(url,opts,ms){var c=new AbortController(),t=setTimeout(function(){c.abort()},ms||8000);opts=opts||{};opts.signal=c.signal;
    return fetch(url,opts).then(function(r){clearTimeout(t);if(!r.ok)throw new Error("The server answered "+r.status);return r.json()})
      .catch(function(e){clearTimeout(t);throw new Error(e.name==="AbortError"?"The request timed out":(e.message||"Network problem"))})}
  function pad(n){return (n<10?"0":"")+n}

  // ---------- the app list (home page and hub read this) ----------
  var APPS=[
    {id:"kapang",name:"Kapang",desc:"Free TV channels, opened full screen",icon:"tv",feat:true},
    {id:"beatdeckvis",name:"BeatDeck Visuals",desc:"MilkDrop visuals with tempo and settings",icon:"wave",feat:true},
    {id:"requests",name:"Party Requests",desc:"Friends scan a code and suggest tracks",icon:"qr",needs:function(c){return !c.supabaseUrl},need:"Needs a Supabase link"},
    {id:"fixtures",name:"Where To Watch",desc:"Fixtures and the official place to watch",icon:"cal"},
    {id:"hub",name:"Link Hub",desc:"Your favourite sites, one tap away",icon:"grid"},
    {id:"clock",name:"Ambient Clock",desc:"Big clock and weather for a spare screen",icon:"clock"},
    {id:"dashboard",name:"Creator Dashboard",desc:"Your Creator Finder on the big screen",icon:"chart",needs:function(c){return !c.dashboardUrl},need:"Needs your app link"},
    {id:"lights",name:"Lights",desc:"WLED scenes and a gentle beat flash",icon:"bulb",labs:true,needs:function(c){return !c.wledIp},need:"Needs the strip's address"},
    {id:"nowplaying",name:"Now Playing",desc:"DJ board: current and next track",icon:"radio",labs:true,needs:function(c){return !c.nowPlayingUrl},need:"Needs a data link"},
    {id:"adpreview",name:"Ad Preview",desc:"Check Hookreel ads on a big screen",icon:"film",labs:true,needs:function(c){return !(c.adUrls&&c.adUrls.length)},need:"Needs video links"},
    {id:"fastcheck",name:"Stream Check",desc:"Test your own HLS or mp4 streams",icon:"play",labs:true,needs:function(c){return !(c.streams&&c.streams.length)},need:"Needs stream links"},
    {id:"archive",name:"Family Archive",desc:"Photo slideshow with captions",icon:"image",labs:true,need:"Add your photos",needs:function(){return true}},
    {id:"quiz",name:"Quiz Night",desc:"Question screen and team scores",icon:"quiz",labs:true},
    {id:"scoreboard",name:"Scoreboard",desc:"Two scores and a match clock",icon:"score",labs:true},
    {id:"timers",name:"Timers",desc:"Kitchen and party countdowns",icon:"timer",labs:true}
  ];

  // ---------- header ----------
  function initBar(){
    var h=$("#appbar");if(!h)return;
    var home=h.getAttribute("data-home")==="1",title=h.getAttribute("data-title")||"",icon=h.getAttribute("data-icon")||"grid",sub=h.getAttribute("data-sub")||"";
    h.className="appbar";
    h.innerHTML=(home?"":'<a class="back f" href="'+root+'index.html" aria-label="Back to home">'+ICON("back")+'</a>')+
      '<div class="ttl"><span class="badge">'+ICON(icon)+'</span><span>'+esc(title)+'</span></div><div class="sub" id="barsub">'+esc(sub)+'</div>';
  }

  // ---------- states ----------
  function state(target,kind,title,text,actions){
    var t=typeof target==="string"?$(target):target;if(!t)return;
    var ic=kind==="err"?"alert":kind==="load"?"refresh":"spark";
    if(kind==="load"){t.innerHTML='<div class="stack" aria-busy="true"><div class="sk" style="height:3.2rem"></div><div class="sk" style="height:3.2rem"></div><div class="sk" style="height:3.2rem"></div></div>';return}
    t.innerHTML='<div class="state '+(kind==="err"?"err":"")+'"><div class="ico">'+ICON(ic)+'</div><h3>'+esc(title)+'</h3><p>'+esc(text||"")+'</p>'+(actions?'<div class="acts">'+actions+'</div>':"")+'</div>';
    fx();
  }

  // ---------- remote control ----------
  var handlers={}, KEYS={403:"red",404:"green",405:"yellow",406:"blue",37:"left",39:"right",38:"up",40:"down",13:"enter",10009:"back",8:"back",27:"back",415:"play",10252:"play",19:"play",32:"play",
    82:"red",71:"green",89:"yellow",66:"blue"};   // R G Y B on a keyboard
  function on(n,fn){handlers[n]=fn}
  function call(n){var h=handlers[n];if(h)h({preventDefault:function(){}})}
  function fx(){$$(".f").forEach(function(e){if(!e.hasAttribute("tabindex")&&e.tagName!=="A"&&e.tagName!=="INPUT"&&e.tagName!=="TEXTAREA"&&e.tagName!=="SELECT"&&e.tagName!=="BUTTON")e.setAttribute("tabindex","0")})}
  function focusables(){return $$(".f").filter(function(e){return e.offsetParent!==null||getComputedStyle(e).position==="fixed"})}
  function move(dir){
    var all=focusables(),cur=document.activeElement;
    if(!cur||!cur.classList||!cur.classList.contains("f")){if(all[0])all[0].focus();return}
    var a=cur.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2,best=null,bd=1e9;
    all.forEach(function(e){if(e===cur)return;var b=e.getBoundingClientRect(),dx=b.left+b.width/2-ax,dy=b.top+b.height/2-ay;
      var ok=dir==="left"?dx<-4:dir==="right"?dx>4:dir==="up"?dy<-4:dy>4;if(!ok)return;
      var d=(dir==="left"||dir==="right")?Math.abs(dx)+Math.abs(dy)*2.5:Math.abs(dy)+Math.abs(dx)*2.5;if(d<bd){bd=d;best=e}});
    if(best){best.focus();if(best.scrollIntoView)best.scrollIntoView({block:"nearest",behavior:"smooth"})}}
  function goHome(){if(window.tizen&&tizen.application){try{tizen.application.getCurrentApplication().exit();return}catch(e){}}
    if(document.referrer&&history.length>1&&document.referrer.indexOf(location.host)>-1)history.back();else location.href=root+"index.html"}
  document.addEventListener("keydown",function(e){
    var n=KEYS[e.keyCode];if(!n)return;
    var tag=(document.activeElement&&document.activeElement.tagName)||"";
    var typing=tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT";
    if(typing){if(e.keyCode===27||e.keyCode===10009){document.activeElement.blur();e.preventDefault()}return}   // let people type
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    var h=handlers[n];
    if(h&&h(e)!==false){e.preventDefault();return}
    if(n==="left"||n==="right"||n==="up"||n==="down"){move(n);e.preventDefault()}
    else if(n==="enter"){var a=document.activeElement;if(a&&a.click&&a!==document.body)a.click()}
    else if(n==="back"){goHome();e.preventDefault()}
  });
  try{if(window.tizen&&tizen.tvinputdevice){["ColorF0Red","ColorF1Green","ColorF2Yellow","ColorF3Blue","MediaPlayPause","MediaPlay","MediaPause"].forEach(function(k){try{tizen.tvinputdevice.registerKey(k)}catch(e){}})}}catch(e){}

  // ---------- dock: buttons that also show which remote colour key they use ----------
  function dock(items){
    var d=$("#dock");if(!d){d=el("div",{id:"dock",class:"dock"});document.body.appendChild(d)}
    d.innerHTML="";
    items.forEach(function(it){
      var b=el("button",{class:"btn f"+(it.primary?" primary":""),type:"button","aria-label":it.label},(it.key&&/^(red|green|yellow|blue)$/.test(it.key)?'<i class="k '+it.key+'"></i>':"")+(it.icon?ICON(it.icon):"")+'<span>'+esc(it.label)+'</span>');
      b.onclick=function(ev){it.fn&&it.fn(ev)};d.appendChild(b);
      if(it.key)on(it.key,function(){it.fn&&it.fn();return true});
    });
    return d}

  // ---------- extras ----------
  var lock=null;function keepAwake(){try{if(navigator.wakeLock){navigator.wakeLock.request("screen").then(function(l){lock=l}).catch(function(){});document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible")keepAwake()},{once:true})}}catch(e){}}
  function fullscreen(){var d=document.documentElement;try{if(document.fullscreenElement)document.exitFullscreen();else (d.requestFullscreen||d.webkitRequestFullscreen).call(d)}catch(e){toast("Full screen is not available here")}}
  function needsSetup(a){return !!(a.needs&&a.needs(cfg))}

  window.addEventListener("DOMContentLoaded",function(){initBar();fx()});
  window.addEventListener("load",function(){fx();var first=$(".f");if(first&&!document.querySelector(":focus-visible")&&matchMedia("(hover:none)").matches===false)try{first.focus({preventScroll:true})}catch(e){}
    if("serviceWorker" in navigator&&location.protocol==="https:"){try{navigator.serviceWorker.register(root+"sw.js")}catch(e){}}});

  window.A={$:$,$$:$$,el:el,esc:esc,toast:toast,store:store,getJSON:getJSON,pad:pad,cfg:cfg,saveSettings:saveSettings,saved:saved,defaults:window.APEX||{},
    on:on,call:call,dock:dock,state:state,fx:fx,goHome:goHome,apps:APPS,needsSetup:needsSetup,keepAwake:keepAwake,fullscreen:fullscreen,root:root,initBar:initBar};
})();
