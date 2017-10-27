"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subscriber = function Subscriber() {
				_classCallCheck(this, Subscriber);

				this.isConnected = false;
				this.pvName = "";
				this.id = -1;
				this.callback = null;
};

var WSManager = function () {
				function WSManager() {
								_classCallCheck(this, WSManager);

								var wsUri = "ws://localhost:8080/CSS/ws/pv";

								this.channelIDIndex = 0;
								this.subscriptionMap = new Map();

								var output = document.getElementById("output");

								this.websocket = new WebSocket(wsUri);
								var that = this;

								this.websocket.onopen = function (evt) {
												console.log("Connected to Endpoint!");
												that.isConnected = true;
												that.handleConnected();
								};

								this.websocket.onmessage = function (evt) {
												var json;
												json = JSON.parse(evt.data);
												that.dispatchMessage(json);
								};
								this.websocket.onerror = function (evt) {
												console.log('ERROR: ' + evt.data);
								};
								this.websocket.onclose = function (evt) {
												console.log('CLOSE: ' + evt.data);
												that.isConnected = false;
								};
				}

				_createClass(WSManager, [{
								key: "handleConnected",
								value: function handleConnected() {
												var _iteratorNormalCompletion = true;
												var _didIteratorError = false;
												var _iteratorError = undefined;

												try {
																for (var _iterator = this.subscriptionMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
																				var _step$value = _slicedToArray(_step.value, 2),
																				    key = _step$value[0],
																				    subscriber = _step$value[1];

																				subscriber.isConnected = this.isConnected;

																				var message = JSON.stringify({
																								"message": "subscribe",
																								"id": subscriber.id,
																								"channel": subscriber.name
																				});

																				this.websocket.send(message);
																}
												} catch (err) {
																_didIteratorError = true;
																_iteratorError = err;
												} finally {
																try {
																				if (!_iteratorNormalCompletion && _iterator.return) {
																								_iterator.return();
																				}
																} finally {
																				if (_didIteratorError) {
																								throw _iteratorError;
																				}
																}
												}
								}
				}, {
								key: "subscribe",
								value: function subscribe(pvname, callback) {
												this.channelIDIndex++;

												var subscriber = new Subscriber();
												subscriber.name = pvname;
												subscriber.callback = callback;
												subscriber.id = this.channelIDIndex;

												subscriber.isConnected = this.isConnected;

												if (this.isConnected) {
																var message = JSON.stringify({
																				"message": "subscribe",
																				"id": this.channelIDIndex,
																				"channel": pvname
																});

																this.websocket.send(message);
												}
												this.subscriptionMap.set(this.channelIDIndex, subscriber);
												return this.channelIDIndex;
								}
				}, {
								key: "unsubscribe",
								value: function unsubscribe(id) {
												this.subscriptionMap.delete(id);

												var message = JSON.stringify({
																"message": "unsubscribe",
																"id": this.channelIDIndex
												});
												this.websocket.send(message);
								}
				}, {
								key: "write",
								value: function write(id, type, value) {
												var valueObj = {
																"type": type,
																"value": value
												};

												var message = JSON.stringify({
																"message": "write",
																"id": id,
																"value": JSON.stringify(valueObj)
												});
												this.websocket.send(message);
								}
				}, {
								key: "dispatchMessage",
								value: function dispatchMessage(message) {
												if (message.id) {
																var subscriber = this.subscriptionMap.get(message.id);
																if (subscriber) subscriber.callback(message);
												}
								}
				}]);

				return WSManager;
}();

var wsManager = new WSManager();
