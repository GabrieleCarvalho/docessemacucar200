import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { META_PIXEL_ID, metaPixelScript, setAdvertisingOptOut, trackProductEvent } from '@/lib/meta-pixel';

type TestPixelWindow = Window & { fbq?: ReturnType<typeof vi.fn> & { queue?: unknown[][] }; _fbq?: unknown; metaPixelStarted?: boolean; metaAdvertisingAllowed?: boolean; metaContentViewed?: boolean };
const pixel = window as TestPixelWindow;
const data = { content_name: '200 Sobremesas Zero Açúcar', content_ids: ['200-sobremesas-zero-acucar'], value: 24.9, currency: 'BRL' };

beforeEach(() => {
  localStorage.clear();
  delete pixel.fbq; delete pixel._fbq; delete pixel.metaPixelStarted; delete pixel.metaAdvertisingAllowed; delete pixel.metaContentViewed;
  document.querySelectorAll('script[src*="connect.facebook.net"]').forEach(s => s.remove());
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

async function run(region: string, ok = true) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok, text: async () => `loc=${region}\n` }));
  window.eval(metaPixelScript);
  await new Promise(resolve => setTimeout(resolve, 0));
}

describe('Meta pixel install and regional limits', () => {
  it('initializes the configured account once and reports one page view', async () => {
    await run('BR'); await run('BR');
    expect(META_PIXEL_ID).toBe('1742630000352865');
    expect(document.querySelectorAll('script[src*="connect.facebook.net"]')).toHaveLength(1);
    expect(pixel.fbq?.queue?.filter(e => e[0] === 'init')).toEqual([['init', '1742630000352865']]);
    expect(pixel.fbq?.queue?.filter(e => e[1] === 'PageView')).toHaveLength(1);
  });
  it.each(['PT', 'DE', 'FR', 'IT', 'GB', 'CH', 'NO', 'XX', 'T1', ''])('blocks provider transmission for region %s', async region => {
    await run(region);
    expect(pixel.fbq).toBeUndefined();
    expect(document.querySelector('script[src*="connect.facebook.net"]')).toBeNull();
  });
  it('blocks transmission when the country lookup fails', async () => {
    await run('BR', false); expect(pixel.fbq).toBeUndefined();
  });
  it('does not install after an explicit advertising opt-out', async () => {
    localStorage.setItem('advertising_opt_out', 'true'); await run('BR'); expect(pixel.fbq).toBeUndefined();
  });
});

describe('Product events correspond to their actions', () => {
  it('reports ViewContent once with the actual offer', () => {
    pixel.metaAdvertisingAllowed = true; pixel.fbq = vi.fn();
    expect(trackProductEvent('ViewContent', data)).toBe(true);
    expect(trackProductEvent('ViewContent', data)).toBe(false);
    expect(pixel.fbq).toHaveBeenCalledExactlyOnceWith('track', 'ViewContent', data);
  });
  it('reports InitiateCheckout, not Purchase, at the checkout action', () => {
    pixel.metaAdvertisingAllowed = true; pixel.fbq = vi.fn();
    trackProductEvent('InitiateCheckout', data);
    expect(pixel.fbq).toHaveBeenCalledExactlyOnceWith('track', 'InitiateCheckout', data);
  });
  it('does not queue an event before geographic permission', () => {
    pixel.fbq = vi.fn();
    expect(trackProductEvent('InitiateCheckout', data)).toBe(false);
    expect(pixel.fbq).not.toHaveBeenCalled();
  });
  it('withdrawal blocks new events and persists refusal', () => {
    pixel.metaAdvertisingAllowed = true; pixel.fbq = vi.fn();
    setAdvertisingOptOut(true);
    expect(localStorage.getItem('advertising_opt_out')).toBe('true');
    expect(pixel.fbq).toHaveBeenCalledWith('consent', 'revoke');
    pixel.fbq.mockClear();
    expect(trackProductEvent('InitiateCheckout', data)).toBe(false);
    expect(pixel.fbq).not.toHaveBeenCalled();
  });
});
