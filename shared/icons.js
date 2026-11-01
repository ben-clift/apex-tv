// Small hand-drawn icon set (24x24). Usage: ICON("tv") returns SVG markup.
(function(){
  var P={
    play:'<path d="M8 5.5v13l11-6.5z" class="x"/>',
    tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    wave:'<path d="M4 12v0M8 8v8M12 4v16M16 9v6M20 11v2"/>',
    bars:'<path d="M5 20V10M10 20V4M15 20v-8M20 20V7"/>',
    list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    cal:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4 4 3 3-2 4 3"/>',
    bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    film:'<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M8 4v16M16 4v16M3.5 9h4.5M3.5 15h4.5M16 9h4.5M16 15h4.5"/>',
    quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.6 2.6 0 1 1 3.6 2.4c-.7.4-1.1 1-1.1 1.8M12 17v.1"/>',
    score:'<path d="M7 5v14M17 5v14M3 12h18"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    timer:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 1.5M9.5 3h5"/>',
    radio:'<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8l9-4M8 14h5M16.5 14h.1"/>',
    grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    gear:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    home:'<path d="M4 11l8-7 8 7M6 10v10h12V10"/>',
    back:'<path d="M15 5l-7 7 7 7"/>',
    refresh:'<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>',
    check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    alert:'<path d="M12 4l9 16H3zM12 10v4M12 17.2v.1"/>',
    qr:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2.5v2.5M20 14v.1M14 20h2.5M20 17v3"/>',
    spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    chart:'<path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    minus:'<path d="M5 12h14"/>',
    next:'<path d="M9 5l7 7-7 7"/>',
    shuffle:'<path d="M3 7h3.5c5 0 6 10 11 10H21M3 17h3.5c1.6 0 2.7-1 3.7-2.2M14 8.4C15 7.6 16 7 17.5 7H21M18.5 4.5L21 7l-2.5 2.5M18.5 14.5L21 17l-2.5 2.5"/>',
    full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    cat:'<path d="M5 20c-1-6 1-10 7-10s8 4 7 10zM7 11L6 5l4 3M17 11l1-6-4 3"/>',
    moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/>'
  };
  window.ICON=function(n,cls){var b=P[n]||P.grid;return '<svg class="i '+(cls||"")+'" viewBox="0 0 24 24" aria-hidden="true">'+b.replace(/ class="x"/g,"")+'</svg>'};
  window.ICON.names=Object.keys(P);
})();
