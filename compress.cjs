const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const imgDir = path.join(__dirname, 'src/assets/images');

async function processImages() {
  const files = fs.readdirSync(imgDir);
  for (const file of files) {
    if (file.match(/^\d+\.jpeg$/)) {
      const filePath = path.join(imgDir, file);
      const stat = fs.statSync(filePath);
      
      // If image is larger than 1MB, compress it
      if (stat.size > 1024 * 1024) {
        console.log(`Compressing ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);
        const tempPath = path.join(imgDir, `temp_${file}`);
        
        await sharp(filePath)
          .resize(1080, 1440, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(tempPath);
          
        fs.renameSync(tempPath, filePath);
        console.log(`Done compressing ${file}`);
      }
    }
  }
}

processImages().catch(console.error);
