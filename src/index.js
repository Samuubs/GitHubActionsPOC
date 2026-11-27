function createGreeting(name) {
  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new TypeError('Informe um nome não vazio!');
  }

  return `Olá, ${name.trim()}! GitHub Actions está funcionando.`;
}

if (require.main === module) {
  console.log(createGreeting(process.argv[2] || 'time'));
}

module.exports = { createGreeting };
