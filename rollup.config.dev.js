import copy from 'rollup-plugin-cpy'
import browsersync from 'rollup-plugin-browsersync'
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
            copy({
                files: ['lib/ellipse-elements.min.js'],
                dest: 'demo',
            }),
            browsersync({
                server: './demo',
                watch: true,
                port: 8080,
            })
        ]
    },
];
