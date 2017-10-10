import React, { Component } from 'react';
import style from './style';


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
		//bind functions to this class
		var important = ['imgLink','link','scientific'];
		var p = this.state.bigDict;
	    console.log(Object.keys(p).length);
	    var retString = '';
	    let defImg = 'https://i.pinimg.com/236x/c4/ee/45/c4ee45976bd00727d6c8f90fb03c6eb3--icon-png-pixel-art.jpg';
	    if (Object.keys(p).length === 0){
	      console.log("empty response!");
	      retString = "<p>No results found!</p>";
	    } else {

	      for (var key in p){
	        if(p.hasOwnProperty(key)){
	          console.log(key + "------>");
	          let j = p[key];
	          // for(var key2 in j){
	          // 	if(!(key2 in important)){
	          // 		continue;
	          // 	}
            if ('imgLink' in j){
            	//retString = retString + '<div onClick '+ 
            	retString = retString + '<a href="' + j['link'] +'"><img src="'+  j['imgLink'] +'" width="82" height="86" title="'+ j['imgAlt'] +'" alt="'+ j['imgAlt'] +'"></a>';

            } else {

            	retString = retString + '<a href="' + j['link'] +'"><img src="'+  defImg +'" width="82" height="86" title="default icon" alt="default flower icon"></a>';
            }
        	retString = retString + '<a href="#" onClick="tempFunc(' +  j['id']  +  ')">'+ j['normal'] +'</a>'
            retString = retString + '<p><i>' +  j['scientific']  +  '</i></p>'
	          // }
	        }
	      }
	    }
	    this.state.tempString = retString;
    	this.resClick = this.resClick.bind(this);
	}

	resClick(e){
		e.preventDefault();
		console.log(e.target.value + "IT WORKED");
	}

//this shit is super hacky lmao

	render(){




		return(
			<div>
			<form>
			  <button style={{display: false}} id="sneakyButton" value="submit_value" onClick={this.resClick}>
			  </button>

			</form>


			<a href="#" onClick={ this.resClick }>lkjlkjlkj</a>
			<div dangerouslySetInnerHTML={{ __html: this.state.tempString }}/>




			</div>
				



		);
	}


}

export default ResultIcon;