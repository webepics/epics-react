import React, {Component} from 'react';
import wsManager from './WSManager'

export default class ListBaseWidget extends React.Component {
	
	constructor() {
		super();
		
		this.subIdList = new Map();
	}

	connect(pv) {
		// need to subscribe to multiple pvs
		for (var i=0; i<pv.length; i++) {
			for (var property in pv[i]) {
				var subId = wsManager.subscribe(pv[i][property], (message)=>this.processUpdate(message));
				this.subIdList.set(subId, [i, property]);
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

