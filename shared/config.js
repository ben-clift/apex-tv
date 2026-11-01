// Default settings for every app. You can also change most of these on the Settings page
// (they are then saved in that browser only). Never put a secret key here: this file is public.
window.APEX = {
  dashboardUrl: "",               // your Apex Creator Finder, e.g. https://your-app.streamlit.app/?embed=true
  kapangUrl: "https://kapang.com/live?channel_id=799",
  supabaseUrl: "",                // friends' requests board (optional)
  supabaseAnonKey: "",            // PUBLIC anon key only
  guestPageUrl: "",               // e.g. https://ben-clift.github.io/apex-tv/requests/guest.html
  wledIp: "",                     // e.g. 192.168.1.50
  place: { name: "Marlborough", lat: 51.42, lon: -1.73 },
  nowPlayingUrl: "",              // JSON: {artist,title,bpm,key,next:[{artist,title}]}
  beatdeckStateUrl: "",           // JSON: {bpm,preset,calm,brightness,cycle,beatAt}
  adUrls: [],                     // mp4 links for Ad Preview
  streams: [],                    // [{name,url}] HLS or mp4 you own or are licensed to use
  hubLinks: [
    { name: "Kapang", url: "https://kapang.com/live" },
    { name: "BBC iPlayer", url: "https://www.bbc.co.uk/iplayer" },
    { name: "ITVX", url: "https://www.itv.com/watch" },
    { name: "Channel 4", url: "https://www.channel4.com" },
    { name: "Open-Meteo weather", url: "https://open-meteo.com" }
  ]
};
