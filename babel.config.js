module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/]
    }
  }
}
