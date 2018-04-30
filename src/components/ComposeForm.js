import React, { Component } from 'react';

class ComposeForm extends Component {
  state = {
    subject: '',
    body: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.subject && this.state.body) {
      this.props.createMessage({
        subject: this.state.subject,
        body: this.state.body
      })
    }
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit} className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input onChange={e => this.setState({subject: e.target.value})} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
            </div>
          </div>
          <div className="form-group">
            <label for="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
              <textarea onChange={e => this.setState({body: e.target.value})} name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit"
                value="Send"
                className="btn btn-primary"

                ></input>
            </div>
          </div>
      </form>
    </div>
    )
  }
}



export default ComposeForm;
