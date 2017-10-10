import React, { Component } from 'react';
import style from './style';

//this class is responsible for displaying all the results of a search request made by a tile
//all it takes in from Tile is the dict passed to it by scraper.py, which it then reformats into html
class ResultIcon extends Component{

	constructor(props) {
		super(props);
		this.state= {
		 	bigDict: this.props.results,
		 	bigArr: [],
		 	tempString: '',
		 	importants:[],
		 	id:-1,
		};
		var p = this.state.bigDict;
	    console.log(Object.keys(p).length);
	    var retString = ''; //our html formatted string
	    let defImg = 'https://i.pinimg.com/236x/c4/ee/45/c4ee45976bd00727d6c8f90fb03c6eb3--icon-png-pixel-art.jpg'; //this is a default image for when no image is provided by Dave
	    if (Object.keys(p).length === 0){
	      console.log("empty response!");
	      retString = "<p>No results found!</p>";
	    } else {

	      for (var key in p){
	        if(p.hasOwnProperty(key)){
	          console.log(key + "------>");
	          let j = p[key];
            if ('imgLink' in j){//if an image is provided for thumbnail
            	retString = retString + '<a href="' + j['link'] +'"><img src="'+  j['imgLink'] +'" width="82" height="86" title="'+ j['imgAlt'] +'" alt="'+ j['imgAlt'] +'"></a>';
            } else {//otherwise just use the default image
            	retString = retString + '<a href="' + j['link'] +'"><img src="'+  defImg +'" width="82" height="86" title="default icon" alt="default flower icon"></a>';
            }
        	retString = retString + '<a href="#" onClick="tempFunc(' +  j['id']  +  ')">'+ j['normal'] +'</a>' //ugly code alert
            retString = retString + '<p><i>' +  j['scientific']  +  '</i></p>'
	        }
	      }
	    }
	    this.state.tempString = retString;
    	this.resClick = this.resClick.bind(this);
	}

	resClick(e){ //ideally this will call props.updatetiletype etc with the id of the plant that it has chosen
		e.preventDefault();
		console.log(e.target.value + "IT WORKED");
	}

//this shit is super hacky lmao
//so each of the <a> tags have onClick="tempFunc(id)", where id is dependent on the flower returned by dave's garden
//tempFunc is not defined anywhere here. In fact, you won't find it in any of the .js files. It's in index.html (at the bottom of <head>)
//what tempFunc does is it passes id to the value of the button with id 'sneakybutton' (which IS in this file) before triggering the onClick action
//of said sneakybutton. This then calls resClick which will eventually do the update tile thing

//the reason why things are like this is because dangerouslySetInnerHTML seems to ignore {{stuff in curly braces}} so I couldn't directly include
//it in retString, hence this terrible workaround.

//Ideally I'd have resultIcon call multiple of some other component à la TileList, but this way gives me a lot more flexibility with how I want to
//deal with the search results, as un-reacty as it is


	render() {

		return(
			<div>
			<form>
			  <button style={{display: false}} id="sneakyButton" value="submit_value" onClick={this.resClick}>
			  </button>

			</form>


			<a href="#" onClick={ this.resClick }>lkjlkjlkj</a>
			<div dangerouslySetInnerHTML={{ __html: this.state.tempString }}/></div>

				



		);
	}


}

export default ResultIcon;