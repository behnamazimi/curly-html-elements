import copy from 'rollup-plugin-cpy'
import browsersync from 'rollup-plugin-browsersync'
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
            copy({
                files: ['lib/html-ellipsis.min.js'],
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
