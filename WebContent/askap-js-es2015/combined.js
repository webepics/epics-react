import {TextWidget, LEDButton} from './widgets'
import TableWidget from './TableWidget'
import React, {Component} from 'react';
import jQuery from 'jquery'

export default class Combined extends React.Component {
	
	constructor(props) {
		super();
		
		var pvs = [':bul:fpga:temp', ':bul:fpga:vccAux', ':bul:fpga:vccInt', ':bul:fpga:status', ':bul:atxInPower',
			   ':bul:atxOutPower', ':bul:atx12V:iout', ':bul:atx3V3:iout', ':bul:atx3V3:vout', ':bul:atx5V:iout',
			   
			   ':bul:atx5VStby:iout', ':bul:atx:iin', ':bul:atx:vin', ':bul:atxFan:tacho', 			   
			   ':bul:chassisFan1:tacho', ':bul:chassisFan1:voltage',
			   ':bul:chassisFan2:tacho', ':bul:chassisFan2:voltage',
			   ':bul:chassisFan3:tacho', ':bul:chassisFan3:voltage',
			   ':bul:chassisFan4:tacho', ':bul:chassisFan4:voltage',
			   ':bul:chassisFan5:tacho', ':bul:chassisFan5:voltage',
			   ':bul:chassisFan6:tacho', ':bul:chassisFan6:voltage',
			   ':bul:chassisFan7:tacho', ':bul:chassisFan7:voltage',
			   ':bul:chassisFan8:tacho', ':bul:chassisFan8:voltage',
			   
			   
			   ':dig:tempLocal1:temp', ':bul:tempATX1:temp', ':bul:tempAux2:temp', ':dig:synthFreq',
			   ':dig:tempLocal1:temp', ':dig:tempLocal2:temp', ':dig:tempLowerLeft:temp', ':dig:tempLowerRight:temp',
			   ':dig:tempUpperLeft:temp', ':dig:tempUpperRight:temp',
			   
			   ':evt:driverUptime', ':dig:synthFreq', 
			   ':dig:adcTemp1:temp', ':dig:adcTemp2:temp', ':dig:adcTemp3:temp', ':dig:adcTemp4:temp',
			   ':dig:adcTemp5:temp', ':dig:adcTemp6:temp', ':dig:adcTemp7:temp', ':dig:adcTemp8:temp',
			   
			   ':bul:chassisFan1:fanStatus', ':bul:chassisFan2:fanStatus', ':bul:chassisFan3:fanStatus', ':bul:chassisFan4:fanStatus',
			   ':bul:chassisFan5:fanStatus', ':bul:chassisFan6:fanStatus', ':bul:chassisFan7:fanStatus', ':bul:chassisFan8:fanStatus',
			   ':bul:atx:supplyStatus', ':bul:atxFan:fanStatus',

			   ':LinkStatus10G1:status', ':LinkStatus10G2:status', ':LinkStatus10G3:status', ':LinkStatus10G4:status', ':LinkStatus10G5:status',
			   ':LinkStatus10G6:status', ':LinkStatus10G7:status', ':LinkStatus10G8:status', ':LinkStatus10G9:status', ':LinkStatus10G10:status',
			   
			   ':evt:WF1:eventBase', ':evt:WF1:numCycles', ':evt:WF1:period', ':evt:WF1:pulseWidth', ':evt:WF1:resyncCount',
			   ':evt:WF2:eventBase', ':evt:WF2:numCycles', ':evt:WF3:period', ':evt:WF4:pulseWidth', ':evt:WF5:resyncCount',
			   
			   ':dig:fans1:tacho', ':dig:fans2:tacho', ':dig:fans4:tacho', ':dig:fans4:tacho',
			   ':S_linkStatus10G:calc', ':S_linkStatus10G:calc1', ':S_linkStatus10G:calc2',
			   ':S_linkStatus10G:calc3', ':S_linkStatus10G:calc4', ':S_linkStatus10G:calc5',
			   
			   ':dig:fpga1:temp', ':dig:fpga2:temp', ':dig:fpga3:temp', ':dig:fpga4:temp',
			   ':dig:optics1:temp', ':dig:optics2:temp', ':dig:optics3:temp', ':dig:optics4:temp',			   
			   ':bul:tempFan1:temp', ':bul:tempFan2:temp'
			];

		var shelves = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 
			          'c07', 'c08', 'c09', 'c10', 'c11', 'c12'];
		
		this.tablePV = [];
		
		for (var pv in pvs) {
			var row = [];
			for (var shelf in shelves) {
				row.push(props.initial + ':' + props.subsystem + ":" + shelves[shelf] + pvs[pv]);
			}
			this.tablePV.push(row);
		}
	}
	
	render() {
		
		return (
			<div>
				<div className='col-md-4'>
					<TextWidget label="My label:" pv={this.props.initial + ":" + this.props.subsystem + ":c01:bul:fpga:temp"} />
				</div>
				<div className='col-md-2 col-md-offset-6'>
					<LEDButton pv={this.props.initial + ":" + this.props.subsystem + ":F_startup:center_O"} />
				</div>
				<div className='col-md-12'>
					<TableWidget pv= {this.tablePV} />
				</div>					
					
			</div>
		)
	}
}
