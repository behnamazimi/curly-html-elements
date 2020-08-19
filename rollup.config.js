import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-cpy'
import pkg from './package.json';

export default [
    {
        input: 'src/html-ellipsis.js',
        output: {
            name: "HTMLEllipsis",
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            terser(),
            copy({
                files: ['lib/html-ellipsis.min.js'],
                dest: 'demo',
            }),
        ]
    },
    {
        input: 'src/html-ellipsis.js',
        output: {
            file: pkg.main,
            format: 'cjs',
        }
    },
    {
        input: 'src/html-ellipsis.js',
        output: {
            file: pkg.module,
            format: 'es',
        }
    }
];
