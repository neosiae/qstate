import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: `dist/index.js`,
    plugins: [typescript(), nodeResolve(), commonjs()],
    output: [
      {
        file: `dist/bundle.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
  },
  {
    input: `dist/index.d.ts`,
    plugins: [dts()],
    output: {
      file: `dist/bundle.d.ts`,
      format: 'es',
    },
  },
];
