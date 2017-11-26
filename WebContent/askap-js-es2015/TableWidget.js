import React, {Component} from 'react';
import ListBaseWidget from './ListBaseWidget'
import ReactTable from "react-table";


export default class TableWidget extends ListBaseWidget {

	constructor(props) {
		super(props);
		
		this.virtualData = [];
		var pvs = [];
		
		for (var i=0; i<props.pvdescription.length; i++) {
			var row = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12'];
			var rowData = {};
			var pvrow = {};

			rowData['description'] = props.pvdescription[i].description
			rowData['unit'] = props.pvdescription[i].unit
				
			for (var r in row) {
				var pvName = props.antenna + ":" + props.subsystem + ":" + row[r] + props.pvdescription[i].name;
				rowData[row[r]] = {'value': 'N/A', 'state': 'disconnected', 'name': pvName};
				pvrow[row[r]]  = pvName;
			}
			
			this.virtualData.push(rowData);		
			pvs.push(pvrow)
		}
		
		this.numUpdates = 0;
		this.state = { data: this.virtualData};
		this.connect(pvs);
	}

	update() {
		this.setState({data: this.virtualData});		
	}
	
	processUpdate(message) {
		if (message.type == 'connection') {
			var indexes = this.subIdList.get(message.id);
			
			if (message.connected)				
				this.virtualData[indexes[0]][indexes[1]]['state'] = 'connected';				
			else 
				this.virtualData[indexes[0]][indexes[1]]['state'] = 'disconnected';
		}
		
		if (message.type == 'value') {
			var indexes = this.subIdList.get(message.id);
			
			var val = message.value.value;			
			if (!isNaN(val))
				val = val.toFixed(2);
				
			this.virtualData[indexes[0]][indexes[1]]['value'] = val;		
			this.virtualData[indexes[0]][indexes[1]]['state'] = message.value.alarm.severity;		
		}
	}
	
	render() {
        return (
        		<ReactTable data={this.state.data}
        		    columns={[
        		      {
        		          Header: 'DRX Table',
        		          columns : [
        		        	  
  	        		    	{Header: "Description",	        		    		
  		        		      accessor: "description",
  		        		      minWidth: 200
  		        		    },
  		        		    	
  	        		    	{
  		        		      Header: "Unit",	        		    		
  		        		      accessor: "unit",
  		        		      minWidth: 50
  		        		    },
        		        	  
	        		    	{Header: "c01",	        		    		
		        		      accessor: "c01",
		        		      Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
  		        		      minWidth: 50
		        		    },
	        		    	
	        		    	{Header: "c02",
		            		  accessor: 'c02',
		            		  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
  		        		      minWidth: 50
		        		    },
		        		    
	        		    	{Header: "c03",
		                	  accessor: 'c03',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
  		        		      minWidth: 50
		        		    },
		        		    
	        		    	{Header: "c04",
		                	  accessor: 'c04',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
  		        		      minWidth: 50
		        		    },
		        		    
	        		    	{Header: "c05",
		                	  accessor: 'c05',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c06",
		                	  accessor: 'c06',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c07",
		                	  accessor: 'c07',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c08",
		                	  accessor: 'c08',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c09",
		                	  accessor: 'c09',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c10",
		                	  accessor: 'c10',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c11",
		                	  accessor: 'c11',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    
	        		    	{Header: "c12",
		                	  accessor: 'c12',
		                	  Cell: row => (<label className={row.value.state}>{row.value.value}</label>),
	  		        		  minWidth: 50
	        		    	},
	        		    ]
        		      }
        		    ]}
        			defaultPageSize= {this.virtualData.length}
        			showPagination= {false}
        		    className="-striped -highlight"
        		/>
        );
	}
}