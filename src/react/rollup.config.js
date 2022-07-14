import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `dist/bundle.js`,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
    external: ['react', 'react-dom'],
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
