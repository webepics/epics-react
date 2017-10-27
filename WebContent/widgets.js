
class TextWidget extends React.Component{

	constructor() {
		super();

		this.state.value = "";
	}

	render() {
        return (
        <div>
	        <label className='col-md-6'>Hello Xinyu Wu!</label>
	        <input type="text" className='col-md-6' value={this.state.value}/>
	    </div>
        );
	}

	_webSocketConnect() {
		var wsUri = "ws://localhost:8080/ws";

		let output = document.getElementById("output");

		let websocket = new WebSocket(wsUri);
		websocket.onopen = function(evt) {
			this._writeToScreen("Connected to Endpoint!");
		};
		websocket.onmessage = function(evt) {
			this._writeToScreen("Message Received: " + evt.data);
			this.state.value = evt.data;
		};
		websocket.onerror = function(evt) {
			this._writeToScreen('ERROR: ' + evt.data);
		};
		websocket.onclose = function(evt) {
			this._writeToScreen('CLOSE: ' + evt.data);
		};
	}

	_writeToScreen(message) {
			console.log(mesage);
	}

	componentWillMount() {
		this._webSocketConnect();
	}
}

jQuery(function() {
	  ReactDOM.render(
		  <TextWidget />,
		  document.getElementById('test')
	  );
})
