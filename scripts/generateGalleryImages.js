const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'groupImages');
const out = path.join(process.cwd(), 'public', 'gallery-images.json');

function run(){
  if(!fs.existsSync(dir)){
    console.error('groupImages directory not found at', dir);
    process.exit(1);
  }
  const files = fs.readdirSync(dir)
    .filter(f => /\.(jpe?g|png|gif|webp)$/i.test(f))
    .sort();
  fs.writeFileSync(out, JSON.stringify(files, null, 2));
  console.log(`✅ Wrote ${files.length} gallery images to public/gallery-images.json`);
}
run();
