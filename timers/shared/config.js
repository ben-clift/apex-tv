// Edit this one file, then re-run build.py. Nothing in here is secret EXCEPT you must never
// put a Supabase service/secret key here. Use only the public "anon/publishable" key, with row
// level security on (see supabase_requests.sql).
window.APEX = {
  // Apex Creator Finder (Streamlit). ?embed=true hides the Streamlit chrome.
  dashboardUrl: "https://YOUR-APP.streamlit.app/?embed=true",

  // Friends' requests board (optional). Leave blank to run in demo mode.
  supabaseUrl: "",          // e.g. https://abcd.supabase.co
  supabaseAnonKey: "",      // public anon key only
  guestPageUrl: "",         // where you host guest.html (GitHub Pages is fine)

  // WLED strip on your Wi-Fi
  wledIp: "192.168.1.50",

  // BeatDeck Visuals: JSON your phone publishes to steer the TV (bpm, preset, calm, brightness, beatAt). Optional.
  beatdeckStateUrl: "",

  // Kapang start page (a channel link or the live page)
  kapangUrl: "https://kapang.com/live?channel_id=799",

  // Weather and clock
  place: { name: "Marlborough", lat: 51.42, lon: -1.73 },

  // DJ now-playing board polls this JSON: {artist,title,bpm,key,next:[{artist,title}]}
  nowPlayingUrl: "",

  // Hookreel finished ads (mp4 urls) for the ad preview app
  adUrls: [],

  // FAST channel / HLS test streams you own or are licensed to use
  streams: [],

  // Family archive photos live in apps/archive/photos and are listed in archive.json
  // Hub tiles: any web page you want one click away
  hubLinks: [
    { name: "Kapang", url: "https://kapang.com/live" },
    { name: "Creator Finder", url: "https://YOUR-APP.streamlit.app/?embed=true" },
    { name: "BBC iPlayer", url: "https://www.bbc.co.uk/iplayer" },
    { name: "ITVX", url: "https://www.itv.com/watch" },
    { name: "Open-Meteo weather", url: "https://open-meteo.com" }
  ]
};
