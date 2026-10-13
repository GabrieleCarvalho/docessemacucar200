import { describe, expect, it } from 'vitest';

import { META_PIXEL_ID, metaPixelScript } from '@/lib/meta-pixel';

describe('Meta pixel install', () => {
  it('uses the paid-traffic pixel id', () => {
    expect(META_PIXEL_ID).toBe('1742630000352865');
    expect(metaPixelScript).toContain('1742630000352865');
  });

  it('loads fbevents.js and tracks PageView once allowed', () => {
    expect(metaPixelScript).toContain('connect.facebook.net/en_US/fbevents.js');
    expect(metaPixelScript).toContain("f('init',id)");
    expect(metaPixelScript).toContain("f('track','PageView')");
  });

  it('blocks the pixel in consent regions and when the region is unknown', () => {
    for (const region of ['PT', 'DE', 'FR', 'IT', 'GB', 'CH']) {
      expect(metaPixelScript).toContain(`'${region}'`);
    }
    expect(metaPixelScript).toContain("if(!loc||blocked.indexOf(loc.toUpperCase())!==-1)return");
    expect(metaPixelScript).toContain('/cdn-cgi/trace');
  });
});
