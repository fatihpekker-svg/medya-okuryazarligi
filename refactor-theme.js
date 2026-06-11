const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory()
        ? walkSync(dirFile, filelist)
        : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'EACCES') return;
    }
  });
  return filelist;
};

const appDir = path.join(__dirname, 'src', 'app');
const files = walkSync(appDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace hardcoded "white" or 'white' colors with var(--gray-100)
  content = content.replace(/color:\s*["']white["']/g, 'color: "var(--gray-100)"');
  
  // Replace dark backgrounds that were explicitly set
  content = content.replace(/background:\s*["']rgba\(255,\s*255,\s*255,\s*0\.0[12345]/g, 'background: "rgba(0,0,0,0.05');
  content = content.replace(/background:\s*["']rgba\(255,\s*255,\s*255,\s*0\.1[0-9]?/g, 'background: "rgba(0,0,0,0.08');
  
  // Replace border colors that were white-based
  content = content.replace(/border:\s*["']1px solid rgba\(255,\s*255,\s*255,\s*0\.[0-9]+/g, 'border: "1px solid rgba(0,0,0,0.08');
  content = content.replace(/borderBottom:\s*["']1px solid rgba\(255,\s*255,\s*255,\s*0\.[0-9]+/g, 'borderBottom: "1px solid rgba(0,0,0,0.08');
  content = content.replace(/borderLeft:\s*["']1px solid rgba\(255,\s*255,\s*255,\s*0\.[0-9]+/g, 'borderLeft: "1px solid rgba(0,0,0,0.08');
  content = content.replace(/borderRight:\s*["']1px solid rgba\(255,\s*255,\s*255,\s*0\.[0-9]+/g, 'borderRight: "1px solid rgba(0,0,0,0.08');
  content = content.replace(/borderTop:\s*["']1px solid rgba\(255,\s*255,\s*255,\s*0\.[0-9]+/g, 'borderTop: "1px solid rgba(0,0,0,0.08');
  
  // Replace any explicit hex whites to var(--gray-100) for text
  content = content.replace(/color:\s*["']#fff["']/gi, 'color: "var(--gray-100)"');
  content = content.replace(/color:\s*["']#ffffff["']/gi, 'color: "var(--gray-100)"');

  // Any background that is black transparent should become white transparent or lighter 
  content = content.replace(/background:\s*["']rgba\(0,\s*0,\s*0,\s*0\.[234567]/g, 'background: "rgba(255,255,255,0.7');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
