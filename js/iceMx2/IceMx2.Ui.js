window.$i = IceMx2 = (function () {

    var IceMx2 = window.IceMx2 || {};
    

    IceMx2.Ui = {
        DisableSelection: function (target) {
            //IE route
            if (typeof target.onselectstart != "undefined") {
                target.onselectstart = function () { return false };
            }
                //Firefox route
            else if (typeof target.style.MozUserSelect != "undefined") {
                target.style.MozUserSelect = "none";
            }
            else //All other route (ie: Opera)
            { target.onmousedown = function () { return false }; };

            target.style.cursor = "default";
        },
        EnableSelection: function (target) {
            if (typeof target.onselectstart != "undefined") //IE route
            {
                target.onselectstart = null;
            }
            else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
            {
                target.style.MozUserSelect = "default";
            }
            else //All other route (ie: Opera)
            { target.onmousedown = null; }
            target.style.cursor = "default";
        },
        DragParent: function (el) {
            el.mousedown(function (e1) {

                if (IceMx2.fireFox) {
                    IceMx2.Ui.DisableSelection(el.parent().get(0));
                } else {
                    IceMx2.Ui.DisableSelection(document.body);
                }
                var clickY = e1.clientY;
                var clickX = e1.clientX;
                var margintop = parseInt(el.parent().offset().top);
                var marginLeft = parseInt(el.parent().offset().left);
                var mTop = 0;
                var mLeft = 0;
                var ddd = 0;
                if (!ddd) {
                    ddd = $("<div style='z-index:999999;position:absolute;border:1px solid black; background-color:#f8f8f8'></div>");
                    ddd.css({ "opacity": "0.7", width: el.parent().width(), height: el.parent().height() });
                    $("body").append(ddd);
                    ddd.css({ "top": el.offset().top, "left": el.offset().left });
                }

                $("body").bind("mousemove", function (e) {

                    var nowY = e.clientY - clickY;
                    var nowX = e.clientX - clickX;
                    mTop = nowY + margintop;
                    mLeft = nowX + marginLeft;

                    ddd.css({ "top": mTop, "left": mLeft });
                });

                $("body").one("mouseup", (function () {
                    var myTop = ddd.offset().top || 0;
                    var myLeft = ddd.offset().left || 0;
                    var da = new Date();

                    $("body").unbind("mousemove");

                    da.setFullYear(2083, 1, 1);

                    IceMx2.Cookie.SetCookie("iceLog4Top", myTop, da, "", "", "");
                    IceMx2.Cookie.SetCookie("iceLog4Left", myLeft, da, "", "", "");

                    el.parent().animate({ "top": myTop, "left": myLeft }, 100);
                    ddd.remove();

                    if (IceMx2.fireFox) {
                        IceMx2.Ui.EnableSelection(el.parent().get(0));
                    } else {
                        IceMx2.Ui.EnableSelection(document.body);
                    }
                }));
            });
        },
        //显示tip
        ShowTip: function (msg, $node, time, fontSize) {
            var id = "";
            if (time) {
                id = "ice_tip2";
            } else {
                id = "ice_tip";
            }
            var htm = "<div id='" + id + "' style='display:none;z-index:999; padding:3px 15px 3px 15px; height:30px; background:#FC0; border:#F90 solid 2px; line-height:30px; text-align:center;";
            if (fontSize) {
                htm += " font-size:" + fontSize + "px;";
            } else {
                htm += " font-size:20px;";
            }
            htm += " font-family:Arial, Helvetica, sans-serif; color: #F60;'>" + msg + "</div>";
            htm = $(htm);
            htm.appendTo("body");
            if ($node) {
                IceMx2.Common.ShowByClickNode(htm, $node);
            } else {
                IceMx2.Common.ShowToCenterFix(htm, 200);
            }

            if (time) {
                htm.animate({ top: "-=100px", opacity: 0 }, time, function () {
                    htm.remove();
                });
            }
        },
        RemoveTip: function () {
            $("#ice_tip").remove();
        },
        Panel: {
            XiuZheng: 0,
            Init: function (xiuZheng) {
                if (!xiuZheng) { xiuZheng = 0 };

                ICE.Ui.Panel.XiuZheng = xiuZheng;
                $(".ice-panel:[autoheight]").css({ "height": 0 + "px" });
                var autoHeight = $(document).height();
                $("body").find(".ice-panel").each(function (i, n) {

                    if ($(n).attr("autoHeight") == undefined) {

                        var xiuZhengHeight = ICE.ie7 ? 6 : 8;

                        autoHeight -= ($(n).height() + xiuZhengHeight);
                    }
                });

                $(".ice-panel:[autoheight]").css({ "height": (autoHeight - xiuZheng) + "px" });
            }
        },
        Init: function () {
            //$(window).resize(function () {
            //    ICE.Ui.Panel.Init(ICE.Ui.Panel.XiuZheng);
            //    if (ICE.Ui.Table.NowTable) {
            //        ICE.Ui.Table.NowTable.ChangeSize();
            //    }
            //})
        },
        GetTextValue: function (id) {
            var node = $("#" + id);
            return node.val() == node.attr("invalue") ? "" : node.val();
        },
        tip :function (msg) {
            $i.Ui.ShowTip(msg, null, 5000, 12);
        }
    };

    return IceMx2;

}());

