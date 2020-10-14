import copy from 'rollup-plugin-cpy'
import browsersync from 'rollup-plugin-browsersync'
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
            copy({
                files: ['lib/curly-html-elements.min.js'],
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
