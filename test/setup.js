import './mocks/indexedDB.js';
import fs from 'fs';
import path from 'path';

const loadToGlobal = (relPath) => {
  const full = path.resolve(process.cwd(), relPath);
  const code = fs.readFileSync(full, 'utf-8');
  // Use indirect eval to execute in global scope so functions become global
  const globalEval = (0, eval);
  globalEval(code + `\n//# sourceURL=${relPath}`);
};

// Load DB first, then other modules that depend on it
['js/db.js', 'js/iso-week.js', 'js/calculations.js'].forEach(loadToGlobal);
