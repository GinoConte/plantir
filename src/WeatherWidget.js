import React, { Component } from 'react';
import style from './style';

//this className is responsible for displaying all the results of a search request made by a tile
//all it takes in from Tile is the dict passed to it by scraper.py, which it then reformats into html
class WeatherWidget extends Component{

	constructor(props) {
		super(props);
		this.state= {
			hello:'world',
			defImg:'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/',
			defImgend:'.png',
			finWea:{},
		};
		var days = { 0: 'Sunday',
		             1: 'Monday',
					 2: 'Tuesday',
					 3: 'Wednesday',
					 4: 'Thursday',
					 5: 'Friday',
					 6: 'Saturday',}
		var months = { 0 : 'Jan',
			           1 : 'Feb',
					   2 : 'Mar',
					   3 : 'Apr',
					   4 : 'May',
					   5 : 'Jun',
					   6 : 'Jul',
					   7 : 'Aug',
					   8 : 'Sep',
					   9 : 'Oct',
					   10: 'Nov',
					   11: 'Dec',}
		console.log(this.props.check);
		//console.log(this.props.weatherMess);
		if(this.props.weatherMess){
			let j = this.props.weatherMess;
			let jLen = this.props.weatherMess.length
			let k = 0;
			let tempDate = '';
	        for (var i = 0; i < jLen ;i=i+8){
	          console.log(this.props.weatherMess[i]);
	          // this.state.finWea[k] = {}
	          // this.state.finWea[k]['icon'] = this.state.defImg + this.props.weatherMess[i]['weather']['0']['icon'] + this.state.defImgend;
	          tempDate = new Date(this.props.weatherMess[i]['dt']*1000); //dt is measured in seconds but date wants milliseconds
	          // console.log(tempDate)
	          // console.log(tempDate.getDay());
	          this.state.finWea[k] = {
	          	'icon': this.state.defImg + this.props.weatherMess[i]['weather']['0']['icon'] + this.state.defImgend,
	          	'day': days[tempDate.getDay()],
	          	'dateStr': months[tempDate.getMonth()] + tempDate.getDate(),
	          	'desc': this.props.weatherMess[i]['weather']['0']['description'],
	          	'temp': this.props.weatherMess[i]['main']['temp'],

	          };
	          k++;
	        }
	        console.log(this.state.finWea);
	    }


	}

	render() {


		return(
		<div className="row row-no-gutter"  style={{ 'height' : '200px',}}>
			<div className="col-md-4" style={{ 'background-color' : '#AAAAAA', 'height': '100%',}}>
			<img src={this.state.finWea[0]['icon']} style={{'max-width':'50%','min-height': '100%', 'float': 'right','clear': 'right',}}/>
			<div style={{ 'position' : 'relative', 'top': '50%', 'transform': 'perspective(1px) translateY(-50%)',}}>
				<h2 style={{'margin-top':'0px','margin-bottom':'20px',}}>{this.state.finWea[0]['day']}</h2>
				<h3 style={{}}>{this.state.finWea[0]['dateStr']}</h3>
				<h4 style={{}}>{this.state.finWea[0]['temp']}°C</h4>
				<h4 style={{}}>{this.state.finWea[0]['desc']}</h4>
			</div>

			</div>

			<div className="col-md-2" style={{ 'background-color' : '#DDDDDD','height': '100%',}}>
			<div style={{ 'position' : 'relative', 'top': '50%', 'transform': 'translateY(-50%)',}}>
				<center><h3 style={{'margin':0}}>{this.state.finWea[1]['day']}</h3></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[1]['dateStr']}</h4></center>
				<center><img src={this.state.finWea[1]['icon']} style={{'margin-top':'-20px', 'margin-bottom':'-15px', 'max-width': '100%',}}/></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[1]['temp']}°C</h4></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[1]['desc']}</h4></center>
			</div>
			</div>
			<div className="col-md-2" style={{ 'background-color' : '#AAAAAA','height': '100%',}}>
			<div style={{ 'position' : 'relative', 'top': '50%', 'transform': 'translateY(-50%)',}}>	
				<center><h3 style={{'margin':0}}>{this.state.finWea[2]['day']}</h3></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[2]['dateStr']}</h4></center>
				<center><img src={this.state.finWea[2]['icon']} style={{'margin-top':'-20px', 'margin-bottom':'-15px', 'max-width': '100%',}}/></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[2]['temp']}°C</h4></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[2]['desc']}</h4></center>
			</div>
			</div>
			<div className="col-md-2" style={{ 'background-color' : '#DDDDDD','height': '100%',}}>
			<div style={{ 'position' : 'relative', 'top': '50%', 'transform': 'translateY(-50%)',}}>
				<center><h3 style={{'margin':0}}>{this.state.finWea[3]['day']}</h3></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[3]['dateStr']}</h4></center>
				<center><img src={this.state.finWea[3]['icon']} style={{'margin-top':'-20px', 'margin-bottom':'-15px', 'max-width': '100%',}}/></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[3]['temp']}°C</h4></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[3]['desc']}</h4></center>
			</div>
			</div>
			<div className="col-md-2" style={{ 'background-color' : '#AAAAAA','height': '100%',}}>
			<div style={{ 'position' : 'relative', 'top': '50%', 'transform': 'translateY(-50%)',}}>
				<center><h3 style={{'margin':0}}>{this.state.finWea[4]['day']}</h3></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[4]['dateStr']}</h4></center>
				<center><img src={this.state.finWea[4]['icon']} style={{'margin-top':'-20px', 'margin-bottom':'-15px', 'max-width': '100%',}}/></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[4]['temp']}°C</h4></center>
				<center><h4 style={{'margin':0}}>{this.state.finWea[4]['desc']}</h4></center>
			</div>
			</div>

		</div>
		);
	}


}

export default WeatherWidget;
