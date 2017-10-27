class Subscriber {
    constructor() {
        this.isConnected = false;
        this.pvName = "";
        this.id = -1;
        this.callback = null;
    }
}

class WSManager {

    constructor() {
	    var wsUri = "ws://localhost:8080/CSS/ws/pv";
	
	    this.channelIDIndex = 0;
	    this.subscriptionMap = new Map();

		let output = document.getElementById("output");

		this.websocket = new WebSocket(wsUri);
		let that = this;

		this.websocket.onopen = function(evt) {			
			console.log("Connected to Endpoint!");
		    that.isConnected = true;
		    that.handleConnected();
		};
		
		this.websocket.onmessage = function(evt) {
	        var json;
	        json = JSON.parse(evt.data);
	        that.dispatchMessage(json);
		};
		this.websocket.onerror = function(evt) {
			console.log('ERROR: ' + evt.data);
		};
		this.websocket.onclose = function(evt) {
			console.log('CLOSE: ' + evt.data);
            that.isConnected = false;
		};
	}

    handleConnected() {
        for (let [key, subscriber] of this.subscriptionMap) {
            subscriber.isConnected = this.isConnected;

            var message = JSON.stringify({
                  "message" : "subscribe",
                  "id" : subscriber.id,
                  "channel" : subscriber.name
              });

            this.websocket.send(message);
        }
    }

    subscribe(pvname, callback) {
	    this.channelIDIndex++;
	
	    let subscriber = new Subscriber();
	    subscriber.name = pvname;
	    subscriber.callback = callback;
	    subscriber.id = this.channelIDIndex;
	
	    subscriber.isConnected = this.isConnected;
	
	    if (this.isConnected) {
	        var message = JSON.stringify({
	                  "message" : "subscribe",
	                  "id" : this.channelIDIndex,
	                  "channel" : pvname
	              });
	
	        this.websocket.send(message);
	    }
	    this.subscriptionMap.set(this.channelIDIndex, subscriber);
	    return this.channelIDIndex;
    }

    unsubscribe(id) {
	    this.subscriptionMap.delete(id);
	
	    var message = JSON.stringify({
                "message" : "unsubscribe",
                "id" : this.channelIDIndex,
            });
	    this.websocket.send(message);
    }
    
    write(id, type, value) {
    	var valueObj = {
    	    "type": type,
    	    "value": value
    	}
    	
	    var message = JSON.stringify({
            "message" : "write",
            "id" : id,
            "value" : JSON.stringify(valueObj)
        });
	    this.websocket.send(message);
    	
    }

    dispatchMessage(message) {
	    if (message.id) {
	        let subscriber = this.subscriptionMap.get(message.id);
	        if (subscriber)
	            subscriber.callback(message);
	    }
	}
}

var wsManager = new WSManager();
