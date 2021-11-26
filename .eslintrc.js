module.exports = {
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-strongly-recommended', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 0
  }
}
