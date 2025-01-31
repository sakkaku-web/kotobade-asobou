import resolve from "@rollup/plugin-node-resolve";
// import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';

const packageJson = require('./package.json');
export default {
    input: 'src/game-components/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    external: ["react", "react-dom"],
    plugins: [
        del({ targets: 'dist/*' }),
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.build.json',
            useTsconfigDeclarationDir: true,
        }),
        postcss({
            // minimize: true,
            // modules: true,
            // extract: true,
            config: {
                path: "./postcss.config.js",
            },
            extensions: [".css"],
            minimize: true,
            inject: {
                insertAt: "top",
            },
        }),
        terser(),
    ],
};