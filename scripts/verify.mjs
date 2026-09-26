/* Screenshot every page at the PLAN's verification breakpoints. */
import { chromium } from 'file:///C:/Users/gmdid/AppData/Local/Temp/claude/C--Users-gmdid-GoldenTriangleWebsite/970b9b6b-6136-4669-b952-25ac98088aae/scratchpad/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'scripts', 'shots');
mkdirSync(out, { recursive: true });

const pages = ['index.html', 'services.html', 'about.html', 'contact.html'];
const widths = [375, 768, 1280, 1600];

const browser = await chromium.launch();
for (const page of pages) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto('file://' + resolve(root, page).replace(/\\/g, '/'));
    await p.waitForTimeout(2800); // let reveals fire (safety timer is 2.5s)
    const name = page.replace('.html', '');
    await p.screenshot({ path: `${out}/${name}-${w}.png`, fullPage: true });
    // horizontal overflow check
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) console.log(`OVERFLOW ${name}@${w}: ${overflow}px`);
    await ctx.close();
  }
  console.log(`done: ${page}`);
}
await browser.close();
console.log('all screenshots in scripts/shots');
