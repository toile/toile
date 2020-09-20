import resolve from "@rollup/plugin-node-resolve";
export default {
  input: "index.js",
  output: [
    {
      file: "dist/toile.esm.js",
      format: "esm"
    },
    {
      format: "cjs",
      file: "dist/toile.common.js"
    },
    {
      format: "amd",
      file: "dist/toile.amd.js"
    },
    {
      format: "umd",
      file: "dist/toile.umd.js",
      // umd 格式必须指定 name，否则报错
      name: 'toile'
    }
  ],
  plugins: [
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve
    resolve({
      // 检查要 resolve 的模块必须是 ES2015 modules
      modulesOnly: true,
    })
  ]
};
