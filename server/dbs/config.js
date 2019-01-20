module.exports = ({
  dbs: 'mongodb://127.0.0.1:27017/blog',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  get code() {
    return () => {
      return Math.random().toString(16).slice(2,6).toLowerCase()
    }
  }
})