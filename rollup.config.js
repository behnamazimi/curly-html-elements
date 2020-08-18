import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-cpy'
import pkg from './package.json';

export default [
    {
        input: 'src/ellipse-elements.js',
        output: {
            name: "EllipseElements",
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [
            terser(),
            copy({
                files: ['lib/ellipse-elements.min.js'],
                dest: 'demo',
            }),
        ]
    },
];
