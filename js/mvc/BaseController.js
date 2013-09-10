function BaseController() {
    this.controllerName = 0;
    this._view = 0;
    var _self = this;
    function view(select,v) {
        var ret = $(select, v);

        if(ret.length==0){
            ret = v.siblings(select);
        }

        if (ret.length == 0) {
            ret = v.parents(select);
        }

        if (ret.length == 0) {
            ret = v.parent().find(select);
        }

        if (ret.length == 0) {
            ret = v.parent().parent().find(select);
        }

        if (ret.length == 0) {
            ret = v.parent().parent().parent().find(select);
        }

        if (ret.length == 0) {
            ret = v.parent().parent().parent().parent().find(select);
        }

        ret.toString = function () {
            return ret.get(0).outerHTML;
        }

        return ret;
    }

    this.LoadView = function (model) {
        $i.Model.GetView("/js/view/" + model + "View.shtml", function (htm) {
            if (htm) {
                _self._myView = $(htm);
            }
        })
    }

    this.GetView = function (select,myview) {
        if (!this._view && $i.Mvc.ViewHas[this.controllerName]) {
            this._view = $i.Mvc.ViewHas[this.controllerName];
            delete $i.Mvc.ViewHas[this.controllerName];
        }
        return new view(select,myview||this._view);
    }
}

