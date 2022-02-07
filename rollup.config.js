import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const plugins = [
  commonjs(),
  babel({ babelHelpers: 'bundled' }),
  uglify()
]

const getOutputConfig = (name) => ({
  file: `dist/${name}.min.js`,
  format: 'umd',
  name
})

const getModuleConfig = (moduleName) => {
  const filename = moduleName.toLowerCase()

  return {
    input: `./src/${moduleName}/${moduleName}.js`,
    output: getOutputConfig(filename),
    plugins
  }
}

export default [
  {
    input: 'index.js',
    output: getOutputConfig('selekta'),
    plugins
  },
  getModuleConfig('IndexSelekta'),
  getModuleConfig('EnumSelekta')
];
