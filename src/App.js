import React, { Component } from 'react';
import ToolbarComponent from './components/ToolbarComponent'
import MessagesComponent from './components/MessagesComponent'
import ComposeForm from './components/ComposeForm'

const BASE_URL = 'http://localhost:8082/api/messages'

class App extends Component {
  state = {
    messages: []
  };

  async componentDidMount() {
    const response = await fetch(`${BASE_URL}`)
    const messages = await response.json()
    console.log("MESSAGES", messages);
    this.setState({
      messages: [
        ...messages.map(message => ({
          ...message,
          selected: false
        }))
      ]
    });
  }


  toggleProperty = (message, property) => {
    const index = this.state.messages.indexOf(message)
    this.setState({
      messages: [
        ...this.state.messages.slice(0, index),
        {...message, [property]: !message[property]},
        ...this.state.messages.slice(index + 1)
      ]
    });
  }

  toggleStar = async message => {
    const response = await fetch(`${BASE_URL}`, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [message.id],
        "command": "star",
        "star": message.starred
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log("response +++>>>", await response.json());
    this.toggleProperty(message, 'starred');
  };

  toggleSelect = message => {
    this.toggleProperty(message, 'selected');
  };

  toggleCompose = () => {
    this.setState({
      composeForm: !this.state.composeForm
    })
  }

  markReadStatus = async readStatus => {
    console.log("readStatus ===>>", readStatus)
    const selectedMessages = this.state.messages.filter(message => {
      return message.selected
    })
    console.log("this.state.messages", this.state.messages);
    const response = await fetch( `${BASE_URL}`, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [...selectedMessages.map(message => {
            return message.id
        })],
        "command": "read",
        "read": readStatus
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })
    console.log("selectedMessages",selectedMessages);
    this.setState({
      messages: this.state.messages.map(
        message =>
          message.selected ? {...message, read: readStatus } : message
      )
    });
  }

  deleteMessages = async () => {
    const selectedMessages = this.state.messages.filter(message => {
      return message.selected
    })
    const response = await fetch(`${BASE_URL}`, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [...selectedMessages.map(message => {
            return message.id
        })],
        "command": "delete"
      }),
      headers: {
        'Content-Type': "application/json"
      }
    });
    const messages = this.state.messages.filter(message => !message.selected)
    this.setState({messages})
  }

  createMessage = async (message) => {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': "application/json"
      }
    });
    const newPost = await response.json();
    console.log("newPost", newPost);
    this.setState({
      messages: [...this.state.messages, newPost],
      composeForm: !this.state.composeForm
    })
  }

  applyLabel = label => {
    const messages =
    this.state.messages.map(
      message =>
      message.selected && !message.labels.includes(label)
      ? { ...message, labels: [...message.labels, label].sort() }
      : message
    );
    this.setState({ messages })
  };

  removeLabel = label => {
    const messages = this.state.messages.map(message => {
        const index = message.labels.indexOf(label);
        if (message.selected && index > -1) {
          return {
            ...message,
             labels: [
               ...message.labels.slice(0, index),
               ...message.labels.slice(index + 1)
             ]
          };
      }
      return message;
    });
    this.setState({ messages });
  };

  toggleSelectAll = () => {
    const selectedMessages = this.state.messages.filter(
      message => message.selected
    );
    const selected = selectedMessages.length !== this.state.messages.length
    this.setState({
      messages: this.state.messages.map(
        message =>
        message.selected !== selected ? {...message, selected } : message
      )
    })
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <ToolbarComponent
         messages={this.state.messages}
         toggleSelectAll={this.toggleSelectAll}
         markReadStatus={this.markReadStatus}
         deleteMessages={this.deleteMessages}
         applyLabel={this.applyLabel}
         removeLabel={this.removeLabel}
         toggleCompose={this.toggleCompose}
           />

         {this.state.composeForm ? <ComposeForm createMessage={this.createMessage}/> : null}

        <MessagesComponent
        messages={this.state.messages}
        toggleStar={this.toggleStar}
        toggleSelect={this.toggleSelect}
         />
      </div>
    )
  }
}

export default App;
