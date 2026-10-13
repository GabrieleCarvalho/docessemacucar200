// Meta Pixel (Meta Ads) — pixel da conta de tráfego pago do projeto.
// Instalado uma única vez, no root, para valer em todas as páginas do site.
export const META_PIXEL_ID = '1742630000352865';

// Rota "sem aviso de cookies": o pixel só carrega para visitantes de regiões
// que não exigem consentimento. Nas regiões de consentimento (União Europeia,
// Espaço Econômico Europeu, Reino Unido e Suíça) ou quando a região não pode
// ser determinada, o pixel não é carregado.
const CONSENT_REGIONS = [
  'AL', 'AD', 'AT', 'AX', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES',
  'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV',
  'MC', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'SM', 'UK', 'VA',
];

export function advertisingOptedOut(): boolean {
  if (typeof window === 'undefined') return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  try {
    return nav.globalPrivacyControl === true || navigator.doNotTrack === '1' ||
      localStorage.getItem('advertising_opt_out') === 'true' ||
      ['false', 'denied', 'rejected'].includes(localStorage.getItem('cookie_consent') ?? '');
  } catch { return true; }
}

type PixelWindow = Window & {
  metaAdvertisingAllowed?: boolean;
  metaContentViewed?: boolean;
  fbq?: (...args: unknown[]) => void;
};

export function trackProductEvent(event: 'ViewContent' | 'InitiateCheckout', data: Record<string, unknown>): boolean {
  if (typeof window === 'undefined' || advertisingOptedOut()) return false;
  const pixel = window as PixelWindow;
  if (!pixel.metaAdvertisingAllowed || !pixel.fbq) return false;
  if (event === 'ViewContent' && pixel.metaContentViewed) return false;
  pixel.fbq('track', event, data);
  if (event === 'ViewContent') pixel.metaContentViewed = true;
  return true;
}

export function setAdvertisingOptOut(denied: boolean) {
  localStorage.setItem('advertising_opt_out', String(denied));
  const pixel = window as PixelWindow;
  pixel.fbq?.('consent', denied ? 'revoke' : 'grant');
}

export const metaPixelScript = `(function(){var w=window,id='${META_PIXEL_ID}',blocked=${JSON.stringify(CONSENT_REGIONS)};
if(w.metaPixelStarted)return;w.metaPixelStarted=true;
function refused(){try{return navigator.globalPrivacyControl===true||navigator.doNotTrack==='1'||localStorage.getItem('advertising_opt_out')==='true'||['false','denied','rejected'].indexOf(localStorage.getItem('cookie_consent'))!==-1}catch(e){return true}}
function load(){if(refused()||w.fbq)return;var f=w.fbq=function(){f.callMethod?f.callMethod.apply(f,arguments):f.queue.push(arguments)};if(!w._fbq)w._fbq=f;f.push=f;f.loaded=!0;f.version='2.0';f.queue=[];f('set','autoConfig',false,id);f('init',id);w.metaAdvertisingAllowed=true;var s=document.createElement('script');s.async=!0;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(s);f('track','PageView');w.dispatchEvent(new Event('meta-pixel-ready'));}
w.addEventListener('storage',function(){if(w.fbq)w.fbq('consent',refused()?'revoke':'grant')});
var done=false;function decide(loc){if(done)return;done=true;if(!loc||loc==='XX'||loc==='T1'||blocked.indexOf(loc.toUpperCase())!==-1)return;load();}
try{var c=new AbortController();var timer=setTimeout(function(){c.abort()},2000);fetch('/cdn-cgi/trace',{signal:c.signal}).then(function(r){if(!r.ok){decide('');return null}return r.text()}).then(function(t){clearTimeout(timer);if(t===null)return;var m=/(?:^|\\n)loc=([A-Za-z0-9]{2})(?:\\n|$)/.exec(t);decide(m&&m[1])}).catch(function(){decide('')});}catch(e){decide('')}})();`;
