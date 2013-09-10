window.$i = IceMx2 = (function () {

    var IceMx2 = window.IceMx2 || {};

    IceMx2.Frame = {
        History: 0,
        Init: function (defaultUrl) {
            var oldHash = location.hash.replace(/#/, "");
            if (IceMx2.fireFox) {
                oldHash = encodeURIComponent(encodeURI(oldHash));
            }

            IceMx2.Frame.History = new _history();
            $("body").delegate("a", "click", function (e) {

                if (this.attributes["action"] == undefined) {
                    if (this.attributes["href"] && (this.attributes["href"].value == "#"
                        || this.attributes["href"].value == ";"
                        || this.attributes["href"].value == "javascript:void(0)")) {
                        return false;
                    };
                    return;
                }

                $this = $(this);

                IceMx2.Frame.GetUrl($this.attr("action"));
                IceMx2.Common.EventCancel(e);
                return false;
            });
            if (oldHash != "") {
                location.hash = oldHash;

                var temp = {
                    param: oldHash,
                    data: "",
                    func: IceMx2.Frame.GetUrlBeforeOver
                };

                IceMx2.Frame.History.push(temp);
                IceMx2.Frame.GetUrlBeforeOver(oldHash, "");
            } else {
                IceMx2.Frame.GetUrl(defaultUrl);
            }
        },
        GetUrl: function (url, data) {
            //if(!IceMx.fireFox){
            url = encodeURIComponent(encodeURI(url));
            //}

            var temp = {
                param: url,
                data: data,
                func: IceMx2.Frame.GetUrlBeforeOver
            };

            IceMx2.Frame.History.push(temp);
        },
        GetUrlBeforeOver: function (url, data) {
            var newUrl;

            newUrl = decodeURIComponent(url);

            $("#icemxFrameBody").load(newUrl, function () {
                if (IceMx2.ie6 || IceMx2.ie7) {
                    location.hash = url;
                }

                IceMx2.Frame.GetUrlOver(newUrl, data);
            });
        },
        GetUrlOver: 0
    };

    _history = function () {

        var list = {};
        var iframe;
        if (IceMx2.ie6 || IceMx2.ie7) {
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.onload = function () {

            };
            document.body.appendChild(iframe);
        };

        function push(data) {
            if (typeof data !== 'object') return;

            if (typeof data.param == undefined || typeof data.func !== 'function') return;

            list[data.param] = data;
            updateHash(data.param);
        };

        function updateHash(p) {
            location.hash = p;
            if (IceMx2.ie6 || IceMx2.ie7) {
                iframe.src = 'IceMxIfame.html?' + p;
            }
        };

        function get(idx) {
            var item, param, func, scope, data;

            item = list[idx];
            if (item) {

                param = item.param;
                func = item.func;
                scope = item.scope;
                data = item.data;
                func.call(scope, param, data);
            }
        };

        window.onhashchange = function () {
            if (IceMx2.fireFox) {
                get(encodeURIComponent(encodeURI(location.hash.replace(/#/, ''))));
            } else {
                get(location.hash.replace(/#/, ''));
            }
        };

        return {
            push: push,
            get: get
        };
    };

    return IceMx2;

})();

