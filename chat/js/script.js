let Topics = ({topics, setTopic}) =>
  <div>
    <h4>Click on a topic...</h4>
    <ul>
      {topics.map(topic => <li><a href="#" onClick={() => setTopic(topic)}>{topic}</a></li>)}
    </ul>
  </div>

let Messages = ({messages}) =>
  <div>
    <h4>Here's what people are saying...</h4>
    <ul className="list-group">
      {messages.map(message => <li className="list-group-item">{message}</li>)}
    </ul>
  </div>

let Input = ({sendMessage}) =>
  <form onSubmit={(event) => {
    let form = event.target
    sendMessage(form.elements.message.value)
    form.reset()
    event.preventDefault()
  }}>
    <input name="message" className="form-control" placeholder="Say something interesting (and not gross)..." />
  </form>

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {messages: [], topics: []}
    this.socket = new Phoenix.Socket('wss://dreadful-spider-42903.herokuapp.com/socket')
    this.socket.connect()
  }

  componentWillMount() {
    fetch('https://dreadful-spider-42903.herokuapp.com/topics')
      .then(response => response.json())
      .then(json => this.setState({topics: json.data}))
  }

  setTopic(topic) {
    if (this.channel) {
      this.channel.leave()
    }
    this.channel = this.socket.channel(`chat:${topic}`)
    this.channel.join()
    this.channel.on('shout', ({data}) => this.receiveMessage(data))
    this.receiveMessage(`Joining ${topic}...`)
  }

  receiveMessage(message) {
    this.setState(
      ({messages}) => ({messages: messages.concat(message)})
    )
  }

  sendMessage(message) {
    if (this.channel) {
      this.channel.push('shout', {data: message})
    } else {
      this.receiveMessage('You have not selected a topic.')
    }
  }

  render() {
    let {messages, topics} = this.state

    return (
      <div>
        <Topics topics={topics} setTopic={(topic) => this.setTopic(topic)} />
        <Messages messages={messages} />
        <hr />
        <Input sendMessage={(message) => this.sendMessage(message)} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)

let hi = () => alert('hi')
let schedule = () => setTimeout(() => {
  alert('hi')
  schedule()
}, 1000)