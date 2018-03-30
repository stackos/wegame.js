const TAG = 'Router'

class Router {
  constructor() {
    this.msgMap = new Map()
  }

  add(path, handler) {
    this.msgMap.set(path, handler)
  }

  route(msg) {
    Logger.log(TAG, 'Routing ' + msg.path)

    const handler = this.msgMap.get(msg.path)
    if (handler) {
      handler(msg)
    } else {
      msg.endResponse()
    }
  }
}

module.exports = Router
