class Message {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  get msg() {
    return this.greeting
  }
}

const { msg } = new Message(
  `This file is required by the index.html file and will
be executed in the renderer process for that window.
All of the Node.js APIs are available in this process.`,
)

export { msg }
