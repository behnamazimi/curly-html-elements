import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-cpy'
import pkg from './package.json';

export default [
    {
        input: 'src/curly-html-elements.js',
        output: {
            name: "CurlyElements",
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            terser(),
            copy({
                files: ['lib/curly-html-elements.min.js'],
                dest: 'demo',
            }),
        ]
    },
    {
        input: 'src/curly-html-elements.js',
        output: {
            file: pkg.main,
            format: 'cjs',
        }
    },
    {
        input: 'src/curly-html-elements.js',
        output: {
            file: pkg.module,
            format: 'es',
        }
    }
];
