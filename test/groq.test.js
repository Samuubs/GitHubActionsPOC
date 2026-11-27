const assert = require('node:assert/strict');
const test = require('node:test');
const { parsePatchAddedLines } = require('../scripts/groq');

test('parsePatchAddedLines selects added lines and ignores removed/context lines', () => {
  const patch = [
    '@@ -4,3 +4,4 @@',
    ' unchanged',
    '-old line',
    '+new line',
    ' another unchanged line',
    '+another new line'
  ].join('\n');

  assert.deepEqual([...parsePatchAddedLines(patch)], [5, 7]);
});

test('parsePatchAddedLines handles multiple hunks and files without a patch', () => {
  const patch = [
    '@@ -1 +1,2 @@',
    '+first',
    ' unchanged',
    '@@ -20,2 +21,2 @@',
    '-old',
    '+second'
  ].join('\n');

  assert.deepEqual([...parsePatchAddedLines(patch)], [1, 21]);
  assert.deepEqual([...parsePatchAddedLines(undefined)], []);
});
