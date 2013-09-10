window.$i = IceMx2 = (function () {

	var IceMx2 = window.IceMx2 || {};
	var fnBodyClick = [],
        nowId = 1,
        nowMsgIndex = 100;

	function IceMxEvent(eventName) {
		var handlers = [];
		this.GetName = function () {
			return eventName;
		};
		this.addHandler = function (handler) {
			handlers.push(handler);
		};
		this.removeHandler = function (handler) {
			for (var i = 0; i < handlers.length; i++) {
				if (handlers[i] == handler) {
					handlers.splice(i, 1);
					break;
				}
			}
		};
		this.fire = function (eventArgs) {
		   
		    for (var i = 0, max = handlers.length; i < max; i++) {
				handlers[i](eventArgs);
			}
		};
	}

	IceMx2.Event = new function () {
		var _events = [];
		this.GetMvcPartOver = function () {
		    console.log("GetMvcPartOver");
		    if (--IceMx2.Event.GetingMvcPartCount == -1) {
				this.FireEvent("MvcLoadOver");
			}
		}
		this.GetingMvcPartCount = 0;

		function getEvent(eventName) {
			return $.grep(_events, function (event) {
				return event.GetName() === eventName;
			})[0];
		}

		this.FireEvent = function (eventName, eventArgs) {
		    var event = getEvent(eventName);
		
			if (!event) {
				event = new IceMxEvent(eventName);

				_events.push(event);
			}
			
			event.fire(eventArgs);
		};

		this.AddEvent = function (eventName, handler) {
			var event = getEvent(eventName);

			if (!event) {
				event = new IceMxEvent(eventName);
				_events.push(event);
			}

			event.addHandler(handler);
		}
	}

	return IceMx2;

}());



