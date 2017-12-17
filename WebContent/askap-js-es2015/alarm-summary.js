import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import jQuery from 'jquery'

import SummaryTable from './SummaryTable'
import wsManager from './WSManager'
import LabelWidget from './Label'

class Header extends React.Component {
	
	constructor() {
		super();
		this.state = {connectedHeart: 'icon-heart hideHeart',
				brokenHeart: 'icon-heart-broken showHeart'};
	}

	componentDidMount() {
		wsManager.setConnectionHandler((isConnected)=>this.processWebsocketConnection(isConnected));		
	}
	
	processWebsocketConnection(isConnected) {
		if (isConnected) {
			this.setState({
				connectedHeart: 'icon-heart showHeart',
					brokenHeart: 'icon-heart-broken hideHeart'				
			})
		} else {
			this.setState({
				connectedHeart: 'icon-heart hideHeart',
					brokenHeart: 'icon-heart-broken showHeart'				
			})			
		}
	}
	
	render() {
		
	    var location = window.location.href.split('/');
	    var antenna = location[5];
	    var subsystem = location[6];
	    
	    return (
	      <div className="summary-menu">
			<div>
				<span className={this.state.connectedHeart}></span>
				<span className={this.state.brokenHeart} ></span>
			</div>
	      
	        <div class='alarm-menu'>
	          <h4>Online Critical Alarms</h4>
	          <ul>
	            <li class='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/alignment"}>Alignment</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_alignment:alarm'}/>
	            </li>
	          </ul>

	          
	          <h4>Summary Alarms</h4>
	          <ul class='alarm-menu'>
	            <li class='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/bat"}>Bat</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_batStatus:alarm'}/>
	            </li>
	            <li class='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/fanspeed"}>Fanspeed</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_fans:alarm'}/>
	            </li>
	            <li class='alarm-menu-item'>
	              <Link to={"/" + antenna + "/" + subsystem + "/temperature"}>Temperature</Link><LabelWidget pv={antenna + ':' + subsystem + ':S_temps:alarm'}/>
	            </li>
	          </ul>
	          	          
	        </div>
	      </div>
      )
	}
}

/*
 * https://reacttraining.com/react-router/web/example/url-params
 */
const Alignment = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='alignment' 
    	     rows={['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12']} 
    		 pvfiles='alignment.json' />);
}

const Bat = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='bat'
	     rows={['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12']} 
         pvfiles='alignment.json,bat.json' />);
}

const FanSpeed = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='fanspeed'
    	     rows={['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12']} />);
}

const Temperature = ({match}) => {
    return (<SummaryTable antenna={match.params.antenna} subsystem={match.params.subsystem} type='temperature'
	     rows={['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12']} />);
}

    		
const app = (
		<Router>
		  <div>
			<Header/>
		    <Switch>
		      <Route path="/:antenna/:subsystem/alignment" component={Alignment} />
		      <Route path="/:antenna/:subsystem/bat" component={Bat} />
		      <Route path="/:antenna/:subsystem/fanspeed" component={FanSpeed} />
		      <Route path="/:antenna/:subsystem/temperature" component={Temperature} />
		   </Switch>   		
		  </div>
		</Router>
)

jQuery(function() {
	  ReactDOM.render(
		  app,
		  document.getElementById('AlarmSummary')
	  );
})

