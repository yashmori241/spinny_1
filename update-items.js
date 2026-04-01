const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib/data/cars.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the hardcoded unsplash images arrays with the new dynamic API endpoint.
content = content.replace(/images: \[([\s\S]*?)\],/g, (match, p1) => {
  // Extract the make and model from the item by looking backwards
  return match;
});

// Since Regex parsing a JS object backwards is tricky, we can use eval or a simple regex over the whole object. Let's just do a specific replace.
let newContent = content;
const carMatches = [ ...content.matchAll(/make:\s*"(.*?)",\s*model:\s*"(.*?)",[\s\S]*?images:\s*\[([\s\S]*?)\],/g) ];

for (const m of carMatches) {
  const make = m[1];
  const model = m[2];
  
  const encodedMake = encodeURIComponent(make);
  const encodedModel = encodeURIComponent(model);
  
  const newImagesStr = `images: [\n      "/api/car-image?make=${encodedMake}&model=${encodedModel}&v=1",\n      "/api/car-image?make=${encodedMake}&model=${encodedModel}&v=2",\n      "/api/car-image?make=${encodedMake}&model=${encodedModel}&v=3",\n    ],`;
  
  newContent = newContent.replace(m[0].match(/images:\s*\[([\s\S]*?)\],/)[0], newImagesStr);
}

fs.writeFileSync(filePath, newContent);
console.log('Replaced all car images with custom endpoints!');
