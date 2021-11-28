import { terser } from 'rollup-plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'index.ts',
    output: {
      format: 'es',
      file: 'dist/index.js',
      sourcemap: true,
      exports: 'default',
    },
    // plugins: [esbuild({ target: 'esnext' }), terser()],
    plugins: [esbuild({ target: 'esnext' })],
  },
  {
    input: 'index.ts',
    output: {
      format: 'es',
      file: 'dist/index.d.ts',
    },
    plugins: [dts()],
  },
]
