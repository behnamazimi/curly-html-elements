import copy from 'rollup-plugin-cpy'
import browsersync from 'rollup-plugin-browsersync'
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
            copy({
                files: ['lib/ellipsis-html.min.js'],
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
