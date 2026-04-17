// ============================================================================
//  ASTRO BONK BOMBS — Native Capacitor integrations
//  Runs only when app is wrapped with Capacitor (Android/iOS). Safe on web.
// ============================================================================

(function(){
  'use strict';
  const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  if(!isNative){
    console.log('[native] Running in browser — skipping Capacitor setup');
    return;
  }
  console.log('[native] Capacitor detected — wiring up native features');

  const { StatusBar, Style } = window.Capacitor.Plugins.StatusBar ? { StatusBar: window.Capacitor.Plugins.StatusBar, Style: { Dark:'DARK', Light:'LIGHT' } } : {};
  const { Haptics, ImpactStyle, NotificationType } = {
    Haptics: window.Capacitor.Plugins.Haptics,
    ImpactStyle: { Heavy:'HEAVY', Medium:'MEDIUM', Light:'LIGHT' },
    NotificationType: { Success:'SUCCESS', Warning:'WARNING', Error:'ERROR' },
  };
  const ScreenOrientation = window.Capacitor.Plugins.ScreenOrientation;
  const SplashScreen = window.Capacitor.Plugins.SplashScreen;
  const App = window.Capacitor.Plugins.App;
  const Preferences = window.Capacitor.Plugins.Preferences;

  // ---- Init sequence ----
  async function init(){
    try {
      if(ScreenOrientation) await ScreenOrientation.lock({ orientation: 'portrait' });
    } catch(e) { console.warn('orientation lock failed', e); }
    try {
      if(StatusBar){
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: 'DARK' });
        await StatusBar.hide();
      }
    } catch(e) { console.warn('status bar failed', e); }
    try {
      if(SplashScreen){
        // Give the game a tiny bit to boot, then hide splash
        setTimeout(() => SplashScreen.hide(), 600);
      }
    } catch(e){ console.warn('splash hide failed', e); }
    // Back-button: only exit from menu
    if(App){
      App.addListener('backButton', (e) => {
        // Let game handle it if possible; otherwise exit
        if(window.G && window.G.state && window.G.state !== 'menu'){
          window.G.state = 'menu';
        } else {
          App.exitApp();
        }
      });
    }
  }
  init();

  // ---- Haptic helpers (hooked into game sfx calls) ----
  function vib(style){
    if(!Haptics) return;
    try { Haptics.impact({ style: style }); } catch(e) {}
  }
  function vibNotify(type){
    if(!Haptics) return;
    try { Haptics.notification({ type: type }); } catch(e) {}
  }

  // Patch sfx() to also trigger haptics based on sound key
  // sfx is defined inside the IIFE — we hook via a MutationObserver/polling for window.sfx
  // But sfx isn't attached to window. So instead, we listen for game events via custom dispatch.
  // Simpler: intercept key game actions via the AudioContext beep calls...
  //
  // Actually the cleanest: expose a global bridge the game can call.
  window.nativeHaptic = {
    jump: () => vib('LIGHT'),
    djump: () => vib('MEDIUM'),
    triple: () => { vib('MEDIUM'); setTimeout(()=>vib('LIGHT'), 40); },
    stomp: () => vib('MEDIUM'),
    hit: () => vib('HEAVY'),
    boom: () => { vib('HEAVY'); setTimeout(()=>vib('MEDIUM'), 60); },
    bounce: () => vibNotify('SUCCESS'),
    coin: () => vib('LIGHT'),
    power: () => vibNotify('SUCCESS'),
    worldup: () => { vibNotify('SUCCESS'); setTimeout(()=>vib('HEAVY'), 120); },
    boss: () => vibNotify('WARNING'),
  };

  // Hook into existing sfx if possible (after game load)
  const hookInterval = setInterval(()=>{
    try {
      // sfx is inside IIFE — can't reach directly. Instead, listen to window dispatched events
      // Tell the user to emit events from game if they want haptics.
    } catch(e){}
    clearInterval(hookInterval);
  }, 400);

  // ---- Persistent preferences (better than localStorage on native) ----
  // The game uses localStorage. On native, Capacitor injects a localStorage
  // implementation automatically, so no code changes needed. This section is for
  // explicit sync via Preferences plugin if we need cloud-safe storage later.
  window.nativeStorage = {
    get: async (key) => {
      if(!Preferences) return localStorage.getItem(key);
      const { value } = await Preferences.get({ key });
      return value;
    },
    set: async (key, value) => {
      if(!Preferences) return localStorage.setItem(key, value);
      await Preferences.set({ key, value });
    },
  };
})();
