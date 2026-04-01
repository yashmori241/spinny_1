const fs = require('fs');
const file = 'c:/Users/yashm/OneDrive/Desktop/MY AI PROJECT/prototype A/spinny/lib/data/cars.ts';
let code = fs.readFileSync(file, 'utf8');

const baseImages = [
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&ar=16:9&fit=crop',
  'https://images.unsplash.com/photo-1503376713356-fc4cfa6e118b?q=80&w=1200&ar=16:9&fit=crop',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&ar=16:9&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&ar=16:9&fit=crop',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&ar=16:9&fit=crop',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&ar=16:9&fit=crop'
];

let idx = 0;
// Look for blocks like: images: ["/api/car-image...", "/api...", "/api..."]
code = code.replace(/images:\s*\[[\s\S]*?\]/g, () => {
  const i1 = baseImages[idx % baseImages.length];
  const i2 = baseImages[(idx + 1) % baseImages.length];
  const i3 = baseImages[(idx + 2) % baseImages.length];
  idx++;
  return `images: [\n      "${i1}",\n      "${i2}",\n      "${i3}",\n    ]`;
});

fs.writeFileSync(file, code);
console.log('Successfully patched cars.ts with real Unsplash imagery.');
