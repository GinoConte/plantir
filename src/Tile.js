import React, { Component } from 'react';
import Center from 'react-center';
import Modal from 'react-modal';
import style from './style';
import marked from 'marked';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      author: '',
      text: '',
      modalIsOpen: false,
    };
    //bind functions to this class
    this.deleteTile = this.deleteTile.bind(this);
    this.updateTile = this.updateTile.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTileUpdate = this.handleTileUpdate.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {
    return (
      <div style={style.tile}>
        <p>{this.props.tiletypename}</p><br></br><br></br>
        <button onClick={this.openModal}>Details</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Tile Information Modal"
          style={ style }
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Plot Information</h2>
          <div style={ style.tilebox }>
            <div style={ style.comment }>
              <h3>Tile ID: {this.props.uniqueID}</h3>
              <p>Parent garden: {this.props.parentgarden}</p>
              <p>Tile type: {this.props.tiletypename}</p>
              <p><b>Tile properties:</b></p>
              <p>Soil type: {this.props.tileprops.soiltype}</p>
              <p>Moisture: {this.props.tileprops.moisture}</p>
              <p>Sunlight: {this.props.tileprops.sunlight}</p>
              <p>pH balance: {this.props.tileprops.ph}</p>
              <a style={ style.updateLink } href='#' onClick={ this.updateTile }>update</a>
              <a style={ style.deleteLink } href='#' onClick={ this.deleteTile }>delete</a>
              { (this.state.toBeUpdated)
                ? (<form onSubmit={ this.handleTileUpdate }>
                    <select name="soiltype">
                      <option value="Select" selected>Soil Type</option>
                      <option value="Loam">Loam</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Clay">Clay</option>
                      <option value="Silty">Silty</option>
                      <option value="Peaty">Peaty</option>
                    </select>
                    <select name="soilsunlight">
                      <option value="Select" selected>Sunlight</option>
                      <option value="None">None</option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </select>
                    <select name="soilmoisture">
                      <option value="Select" selected>Moisture</option>
                      <option value="None">None</option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                      <option value="Waterlogged">Drenched</option>
                    </select>
                    <input
                      type='submit'
                      style={ style.commentFormPost }
                      value='Update' />
                  </form>)
                : null}
            </div>
        </div>
        <Center>
         <button onClick={this.closeModal}>close</button>
        </Center>
        </Modal>
      </div>
    )
  }
}

export default Tile;