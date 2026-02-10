import './mocks/indexedDB.js';

// Require modules so Node/Vitest can instrument them for coverage.
// Files also attach exports to globalThis for backward compatibility.
require('../js/db.js');
require('../js/iso-week.js');
require('../js/calculations.js');
