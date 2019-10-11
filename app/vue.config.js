module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/ItemsJs-Vue-Demo/" : "/",
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar[\\\/]/]
};
