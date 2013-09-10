window.$i = IceMx2 = (function () {

	var IceMx2 = window.IceMx2 || {};
	
	IceMx2.Game = {

	    IntPoint: function (x, y, step, gamePanel) {
	        return { x: (Math.floor((x / step)) * step), y: (Math.floor(((y - gamePanel.offset().top) / step)) * step)  }
	    },
	    GamePanelPosition: function (x, y, step, gamePanel) {
	        return { x: (Math.floor(((x - gamePanel.offset().left) / step)) * step), y: (Math.floor(((y - gamePanel.offset().top) / step)) * step) }
	    },
	    WebPoint: function (x, y, step) {
	        return { x: x*step, y: y * step }
	    },
	    IntPointToWebPoint: function (x, y, step, gamePanel) {
	        return { x: (x * step) , y: (y * step)  };
	    },
	    WebPointToIntPoint: function (x, y, step, gamePanel) {
	        return { y: Math.round((y) / step), x: Math.round((x ) / step) };
	    },

	    MoveLeft: function ($node,step) {
	        var left = Number($node.position().left) - step;
	        $node.css("left", left);
	        return left;
	    },
	    MoveRight: function ($node,step) {
	        var left = Number($node.position().left) + step;
	        $node.css("left", left);
	        return left;
	    },

	    Play: function ($node, maxPicCount, perWidth, speed) {

	        if (maxPicCount.length) {
                
	            var ary = arguments[1];
	            var max = ary.length;
	            var mySpeed = arguments[2];
	            var fn = arguments[3];
	            
	            var i = 0;

	            var timer = setInterval(function () {
	                if (i == max) {
	                    if (fn) {
	                        fn();
	                        clearInterval(timer);
	                        return;
	                    } else {
	                        i = 0;
	                    }
	                }
	               
	                $node.attr("src", ary[i]);

	                i++;
	            }, mySpeed);
	        } else {
	            var i = 0;
	            return setInterval(function () {
	                if (i > maxPicCount) {
	                    i = 0;
	                }

	                $node.css("background-position-x", i * perWidth);
	                i++;
	            }, speed);
	        }
	    }
	}

	return IceMx2;

}());



