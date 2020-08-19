import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-cpy'
import pkg from './package.json';

export default [
    {
        input: 'src/ellipsis-html.js',
        output: {
            name: "EllipsisHTML",
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            terser(),
            copy({
                files: ['lib/ellipsis-html.min.js'],
                dest: 'demo',
            }),
        ]
    },
    {
        input: 'src/ellipsis-html.js',
        output: {
            file: pkg.main,
            format: 'cjs',
        }
    },
    {
        input: 'src/ellipsis-html.js',
        output: {
            file: pkg.module,
            format: 'es',
        }
    }
];
