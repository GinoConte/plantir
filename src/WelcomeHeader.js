import React, { Component } from 'react';
import style from './style';

class WelcomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { gardenid: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleTokenChange(e) {
    this.setState({ gardenid: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    // let author = this.state.author.trim();
    // let text = this.state.text.trim();
    let token = this.state.gardenid.trim();
    if (!token) {
      return;
    }

    // this.props.onTileSubmit({ author: author, text: text });
    // this.setState({ author: '', text: '' });
    this.props.onTokenSubmit(token)
    this.setState({ gardenid: '' });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Create' />
        <input
          type='text'
          placeholder='Enter a garden token!'
          style={ style.commentFormText}
          value={ this.state.gardenid }
          onChange={ this.handleTokenChange } />
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post' />
      </form>
    )
  }
}

export default WelcomeHeader;