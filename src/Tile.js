import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      author: '',
      text: ''
    };
    //bind functions to this class
    this.deleteTile = this.deleteTile.bind(this);
    this.updateTile = this.updateTile.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTileUpdate = this.handleTileUpdate.bind(this);
  }
  updateTile(e) {
    e.preventDefault();
    //set update flag in the state
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleTileUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let tile = {author: author, text: text};
    this.props.onTileUpdate(id, tile);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''

    })
  }
  deleteTile(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onTileDelete(id);
    console.log('Tile deleted');
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={ style.comment }>
        <h3>tile id: {this.props.uniqueID}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
        <a style={ style.updateLink } href='#' onClick={ this.updateTile }>update</a>
        <a style={ style.deleteLink } href='#' onClick={ this.deleteTile }>delete</a>
        { (this.state.toBeUpdated)
          ? (<form onSubmit={ this.handleTileUpdate }>
              <input
                type='text'
                placeholder='Update name...'
                style={ style.commentFormAuthor }
                value={ this.state.author }
                onChange= { this.handleAuthorChange } />
              <input
                type='text'
                placeholder='Update your comment...'
                style= { style.commentFormText }
                value={ this.state.text }
                onChange={ this.handleTextChange } />
              <input
                type='submit'
                style={ style.commentFormPost }
                value='Update' />
            </form>)
          : null}
      </div>
    )
  }
}

export default Tile;