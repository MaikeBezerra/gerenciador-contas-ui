const proxy = [
    {
      context: '/',
      target: 'https://localhost:8080',
      pathRewrite: {'/' : ''}
    }
  ];
  module.exports = proxy;