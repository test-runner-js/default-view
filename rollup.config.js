module.exports = [
  {
    input: 'index.mjs',
    external: ['util'],
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      name: 'DefaultView'
    }
  },
  {
    input: 'index.mjs',
    external: ['util'],
    output: {
      file: 'dist/index.mjs',
      format: 'esm'
    }
  }
]
