import {TextWidget, LEDButton} from './widgets'
import TableWidget from './TableWidget'
import React, {Component} from 'react';
import jQuery from 'jquery'

export default class SummaryTable extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.pvs = [{name:':bul:fpga:temp', description:'tempurature', unit:'C'}, 
			{name:':bul:fpga:vccAux', description:'Aux Voltage', unit:'V'}, 
			{name:':bul:fpga:vccInt', description:'Int Voltage', unit:'V'}, 
			{name:':bul:fpga:status', description:'fpga status', unit:'C'}, 
			{name:':bul:atxInPower', description:'atx In power', unit:'W'},
			{name:':bul:atxOutPower', description:'atx Out power', unit:'W'}, 
			{name:':bul:atx12V:iout', description:'atx 12 v current out', unit:'amp'}, 
			{name:':bul:atx3V3:iout', description:'atx 3 v3 current out', unit:'amp'}, 
			{name:':bul:atx3V3:vout', description:'atx 3 v3 voltage out', unit:'V'}, 
			{name:':bul:atx5V:iout', description:'atx 5V current out', unit:'amp'}];
		
		// code here to load pv and descriptions from file specified in this.props.type
	}
	
	render() {
		return (
			<div className='summary-table'>
			    <TableWidget pvdescription={this.pvs} antenna={this.props.antenna} subsystem={this.props.subsystem} />
			</div>
		)
	}
}
