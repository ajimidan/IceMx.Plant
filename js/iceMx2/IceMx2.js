window.$i = IceMx2 =(function () {

    var IceMx2 = window.IceMx2 || {};
    var fnBodyClick = [],
        nowId = 1,
        nowMsgIndex = 100,
           CSS_VERSION = 1,
        VIEW_VIERSION = 1,
        JS_VERSION = 1;

  

    function GetUrl(url) {
        url = url.replace(" ", "").toLowerCase();
        var postfix = url.match(/\.\w+$|\.\w+(?=\?)/);
        var hasPrameter = url.indexOf("?") > -1;
        return { url: url, postfix: postfix, hasParmeter: hasPrameter };
    }
    function AddVersionAndTime($url, version, needTime) {
        if (!$url.hasParmeter) {
            $url.url += "?_v=" + version + (needTime ? "&_t=" + new Date().valueOf() : "");
        } else {
            $url.url = $url.url.replace("?", "?_v=" + version + (needTime ? "&_t=" + new Date().valueOf() : "") + "&");
        }
        return $url;
    }
    function GetElement(id) {
        if (typeof (id) == "string") {
            return document.getElementById(id);
        } else if (id.length != undefined) {
            return id.get(0);
        } else {
            return id;
        }
    }

    IceMx2.Url = {
        AddVersion: function (url, needTime) {
            var $url = GetUrl(url),
                postfix = $url.postfix + "";

            switch (postfix) {
                case ".js":
                    return AddVersionAndTime($url, JS_VERSION, needTime).url;
                    break;
                case ".css":
                    return AddVersionAndTime($url, CSS_VERSION, needTime).url;
                    break;
                case ".shtml":
                    return AddVersionAndTime($url, VIEW_VIERSION, needTime).url;
                    break;
                default:
                    return $url.url;
            }
        },
        AddVersionAndTime: function (url) {
            return IceMx2.Url.AddVersion(url, true);
        }
    }


    IceMx2.Common = {
        BindEnter: function ($node, fn) {
            $node.keydown(function (e) {
                if (e.keyCode == 13) {
                    var value = $node.val();
                    fn($node, value);
                    e.stopPropagation();
                    e.preventDefault();
                }
            });
        },
        AddBodyClick: function (fn) {
            fnBodyClick.push(fn);
        },
        EventCancel: function (e) {
            if (window.event) {
                window.event.cancelBubble = true;
                return false;
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
        },
        //在指定位置显示
        ShowToCenterFix: function (jqNode, top, isfix) {
            var width = jqNode.width();
            var height = jqNode.height();

            jqNode.hide();
            var postion = "absolute";
            if (isfix == undefined || isfix == true) {
                Position = "fixed";
            }
            jqNode.css({ "position": postion }).css({ "top": top + "px", "left": ($("body").width() - width) / 2 + "px" });
            jqNode.fadeIn(300);
        },
        ShowToCenter: function (jqNode, top) {
            IceMx2.Common.ShowToCenterFix(jqNode, top, false);
        },
        //在指定位置显示
        ShowByClickNode: function ($node, clickNode) {
            $node.css({ "position": "absolute" }).css({ "top": clickNode.offset().top + "px", "left": clickNode.offset().left }).show();
        },
        BindDefaultText: function (node) {
            if (node.val() == '') {
                node.val(node.attr("invalue"));
                node.css("color", "#cccccc");
            }
            node.focus(function () {

                if (node.val() == node.attr("invalue")) {
                    $(this).val("");
                    node.css("color", "black");
                }
            });
            node.blur(function () {
                if ($(this).val() == '') {
                    $(this).val(node.attr("invalue"));
                    node.css("color", "#cccccc");
                }
            });
            return IceMx2.Common;
        },
        FocusToEnd: function (element) {
            element = GetElement(element);
            if (IceMx2.ie) {
                switch (element.tagName) {
                    case 'INPUT':
                    case 'TEXTAREA':
                        var range = element.createTextRange();
                        break;
                    default:
                        var range = document.body.createTextRange();
                        range.moveToElementText(element);
                        break;
                }
                range.collapse(false);
                range.select();
            } else {
                //新方法

                element.selectionStart = element.value.length;
                element.focus();
                return;

                //老方法
                //element.focus();
                //try {
                //    var range = document.createRange();
                //    range.selectNode(element.lastChild || element);
                //    range.collapse(false);
                //    window.getSelection().removeAllRanges();
                //    window.getSelection().addRange(range);

                //} catch (ex) {}
            }
        }
    };

    //加载
    IceMx2.Load = function () {

        var url, fn, async;

        if (arguments.length = 2) {
            url = arguments[0];
            async = false;
            fn = arguments[1];
        } else {
            url = arguments[0];
            async = arguments[1];
            fn = arguments[2];
        }

        //js
        if (url.indexOf(".js", url.length - 3) > -1) {
            $.getScript(url, fn);
        } else {
            url = IceMx2.Url.AddVersion(url);
            //view
            $.ajax({
                url: url,
                cache: true,
                async: async,
                type: "GET",
                success: fn
            })
        }
    }
    IceMx2.GetIceId = function () {
        return "iceid" + (nowId++) + (new Date()).getTime() + parseInt(Math.random() * 1000);
    };
    IceMx2.GetMsgIndex = function () {
        return nowMsgIndex++;
    };
 
    $(function () {
        $("body").click(function () {
            for (var i = 0; i < fnBodyClick.length; i++) {
                //执行
                fnBodyClick[i]();
            }
        });
    })

    return IceMx2;
    
}());



