window.$i = IceMx2 = (function () {

    var IceMx2 = window.IceMx2 || {};
    var MVC_PATH = "js/mvc/", GetingMvcPartCount = 0;

    //加载
    function Get(models, fn) {

        //申明式加载
        $.each(models, function (i, model) {
         
            if (window[model + "Controller"]) {
                return;
            }
          
            //加载model
            IceMx2.Load(MVC_PATH + "model/" + model + "Model.js");
           
            //加载视图
            IceMx2.Load(MVC_PATH + "view/" + model + "View.shtml", function (htm) {
                //加载控制器
                $.getScript(MVC_PATH + "controller/" + model + "Controller.js", function () {
                    if (htm) {
                        IceMx2.Mvc.ViewHas[model] = $(htm);
                    }
                   
                    if (!fn) { IceMx2.Event.FireEvent("GetMvcPartOver") };
                });
            })
        })
    }

    IceMx2.Mvc = {
        ViewHas: {},
        Get: function () {

            var count, models, fn;
            if (typeof arguments[arguments.length - 1] == "function") {
                count = arguments.length - 1;
                fn = models = arguments;
                models.pop();
            } else {
                count = arguments.length;
                models = arguments;
            }

            GetingMvcPartCount = 0;
            GetingMvcPartCount += count;

            Get(models, fn);
        },
        NewController: function (controllerName, fn) {
            var o = fn;
            var newC = new BaseController();
            newC.controllerName = controllerName;
            o.prototype = newC;
            return o;
        }
    }

    IceMx2.Event.AddEvent("GetMvcPartOver", function () {
        GetingMvcPartCount--;
        if (GetingMvcPartCount==0) {
            IceMx2.Event.FireEvent("MvcLoadOver");
        }
    })

    return IceMx2;

}());



