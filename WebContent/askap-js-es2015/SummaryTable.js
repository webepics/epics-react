import {TextWidget, LEDButton} from './widgets'
import TableWidget from './TableWidget'
import React, {Component} from 'react';
import jQuery from 'jquery'

export default class SummaryTable extends React.Component {
	
	constructor(props) {
		super(props);

		// code here to load pv and descriptions from file specified in this.props.type
		var jsonurl = 'DataFetcher?pvfiles=' + props.pvfiles;
		var that = this;
		$.ajax({
			  url: jsonurl,
			  dataType: 'json',
			  async: false,
			  success: function(data) {
				  that.pvs=data;
			  }
		});
	}
	
	render() {
		return (
			<div className='summary-table'>
			    <TableWidget pvdescription={this.pvs} antenna={this.props.antenna} subsystem={this.props.subsystem} type={this.props.type} rows={this.props.rows}/>
			</div>
		)
	}
}
