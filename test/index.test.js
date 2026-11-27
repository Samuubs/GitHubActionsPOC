const assert = require('node:assert/strict');
const test = require('node:test');
const { createGreeting } = require('../src/index');

test('createGreeting inclui o nome e a mensagem de sucesso', () => {
  assert.equal(
    createGreeting('Equipe'),
    'Olá, Equipe! GitHub Actions está funcionando.'
  );
});

test('createGreeting remove espaços ao redor do nome', () => {
  assert.equal(createGreeting('  Equipe  '), 'Olá, Equipe! GitHub Actions está funcionando.');
});

test('createGreeting rejeita um nome vazio', () => {
  assert.throws(() => createGreeting('  '), {
    name: 'TypeError',
    message: 'Informe um nome não vazio.'
  });
});
