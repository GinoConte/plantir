import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import Plantir from './Plantir';
import style from './style';

ReactDOM.render(
	<Plantir
		//url='http://localhost:3001/api/comments'
		pollInterval={2000} />,
	 document.getElementById('root')
);

//registerServiceWorker();
