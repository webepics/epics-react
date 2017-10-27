import React, {Component} from 'react';

export default class ListBaseWidget extends React.Component {
	
	constructor() {
		super();
		
		this.subIdList = new Map();
	}

	componentWillMount() {
		// need to subscribe to multiple pvs
		for (var i=0; i<this.props.pv.length; i++) {
			for (var j=0; j<this.props.pv[i].length; j++) {
				var subId = wsManager.subscribe(this.props.pv[i][j], (message)=>this.processUpdate(message));
				this.subIdList.set(subId, [i, j]);
			}
		}
		
		this.interval = setInterval(() => this.update(), 500);
	}

	componentWillUnmount() {
		// need to unsubscribe to multiple pvs
		for (var subId of this.subIdList.keys())
				wsManager.unsubscribe(subId);
		
		this.subIdList.clear();
		clearInterval(this.interval);
	}
};

