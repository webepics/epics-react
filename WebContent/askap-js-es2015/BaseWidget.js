import React, {Component} from 'react';
import wsManager from './WSManager'

export default class BaseWidget extends React.Component {

	constructor() {
		super();
	}

	componentWillMount() {
		this.subId = wsManager.subscribe(this.props.pv, (message)=>this.processUpdate(message));
	}

	componentWillUnmount() {
		wsManager.unsubscribe(this.subId);
	}
};

