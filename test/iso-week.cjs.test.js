// Ensure we load the file fresh via CommonJS to exercise the module.exports branch
const modPath = require.resolve('../js/iso-week.js');
delete require.cache[modPath];
const iso = require(modPath);

describe('iso-week CommonJS export', () => {
  it('module.exports exposes getISOWeekInfo', () => {
    expect(typeof iso.getISOWeekInfo).toBe('function');
    const res = iso.getISOWeekInfo(new Date(2026, 1, 9));
    expect(res.iso_year).toBe(2026);
    expect(res.week_number).toBe(7);
  });
});
