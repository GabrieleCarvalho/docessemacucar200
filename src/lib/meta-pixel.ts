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

function buildMetaPixelScript(pixelId: string, consentRegions: string[]): string {
  return `(function(){var id='${pixelId}';var blocked=${JSON.stringify(consentRegions)};
function load(){var w=window;if(w.fbq)return;var f=w.fbq=function(){f.callMethod?f.callMethod.apply(f,arguments):f.queue.push(arguments)};if(!w._fbq)w._fbq=f;f.push=f;f.loaded=!0;f.version='2.0';f.queue=[];var s=document.createElement('script');s.async=!0;s.src='https://connect.facebook.net/en_US/fbevents.js';document.head.appendChild(s);f('init',id);f('track','PageView');}
var done=!1;function decide(loc){if(done)return;done=!0;if(!loc||blocked.indexOf(loc.toUpperCase())!==-1)return;load();}
try{var c=new AbortController();setTimeout(function(){c.abort()},2000);fetch('/cdn-cgi/trace',{signal:c.signal}).then(function(r){if(!r.ok){decide('');return null}return r.text()}).then(function(t){if(t===null)return;var m=/(?:^|\\n)loc=([A-Za-z]{2})/.exec(t);decide(m&&m[1])}).catch(function(){decide('')});}catch(e){decide('')}})();`;
}

export const metaPixelScript = buildMetaPixelScript(META_PIXEL_ID, CONSENT_REGIONS);
