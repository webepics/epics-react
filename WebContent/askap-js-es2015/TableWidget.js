import React, {Component} from 'react';
import ListBaseWidget from './ListBaseWidget'
import ReactTable from "react-table";


export default class TableWidget extends ListBaseWidget {

	constructor() {
		super();
		
		this.virtualData = [];
		for (var i=1; i<=100; i++) {
			var row = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6',
					   'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];
			var rowData = {};
			
			for (var r in row) {
				rowData[row[r]] = {'value': 'N/A', 'state': 'disconnected'};
			}
			
			this.virtualData.push(rowData);
		}
		
		this.numUpdates = 0;
		this.state = { data: this.virtualData};
	}

	update() {
		this.setState({data: this.virtualData});		
	}
	
	processUpdate(message) {
		if (message.type == 'connection') {
			var indexes = this.subIdList.get(message.id);
			
			if (message.connected)				
				this.virtualData[indexes[0]]['c'+(indexes[1]+1).toString()]['state'] = 'connected';				
			else 
				this.virtualData[indexes[0]]['c'+(indexes[1]+1).toString()]['state'] = 'disconnected';
		}
		
		if (message.type == 'value') {
			var indexes = this.subIdList.get(message.id);
			this.virtualData[indexes[0]]['c'+(indexes[1]+1).toString()]['value'] = message.value.value;		
		}
	}
	
	render() {
        return (
        		<ReactTable data={this.state.data}
        		    columns={[
        		      {
        		          Header: 'DRX Table',
        		          columns : [
	        		    	{Header: "c01",	        		    		
	        		    	accessor: "c1",
	        		    	Cell: row => (<label className={row.value.state}>{row.value.value}</label>) },
	        		    	
	        		    	{Header: "c02",
	            		    accessor: 'c2',
	            		    Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	            		    
	        		    	{Header: "c03",
	                		accessor: 'c3',
	                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	            		    
	        		    	{Header: "c04",
		                		accessor: 'c4',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},

	        		    	{Header: "c05",
		                		accessor: 'c5',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},

	        		    	{Header: "c06",
		                		accessor: 'c6',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},

	        		    	{Header: "c07",
		                		accessor: 'c7',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	        		    	
	        		    	{Header: "c08",
		                		accessor: 'c8',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	        		    	
	        		    	{Header: "c09",
		                		accessor: 'c9',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	        		    	
	        		    	{Header: "c10",
		                		accessor: 'c10',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	        		    	
	        		    	{Header: "c11",
		                		accessor: 'c11',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)},
	        		    	
	        		    	{Header: "c12",
		                		accessor: 'c12',
		                		Cell: row => (<label className={row.value.state}>{row.value.value}</label>)}	        	        		    	
            		      ]
        		      }
        		    ]}
        			defaultPageSize= {100}
        			showPagination= {false}
        		    className="-striped -highlight"
        		/>
        );
	}
}