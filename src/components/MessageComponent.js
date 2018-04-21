import React, { Component } from 'react';


class MessageComponent extends Component {
  render () {
    const { message, toggleStar, toggleSelect } = this.props;

    const readClass = message.read ? 'read' : 'unread'
    const starClass = message.starred ? 'fa-star' : 'fa-star-o';
    const selectedClass = message.selected ? 'selected' : '';

    const starMessage = e => {
      // e.stopPropagation();
      toggleStar(message);
    }

    const labels = message.labels.map((label, i) => (
      <span key={i} className="label label-warning">{label}</span>
    ))

    return (
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
              onClick={() => toggleSelect(message)}
               type="checkbox"
              checked={!!message.selected}
              readOnly={true}
               />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starClass}`} onClick={starMessage} />
            </div>
          </div>
        </div>
        <div className="col-xs-11">
            {labels}
            {message.subject}
        </div>
      </div>
    )
  }
}


export default MessageComponent
