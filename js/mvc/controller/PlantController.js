var PlantController = $i.Mvc.NewController("Plant", function (config) {

    //#region 变量定义
    var $body = this.GetView("#icePlantPanelView"),
        $wanDou = this.GetView("#icePlantWanDouBody"),
        $xiangRiKui = this.GetView("#icePlantXiangRiKuiBody"),
        $yangGuang = this.GetView("#icePlantYangGuangBody"),
        $zhiWuIcoPanel = this.GetView("#icePlantPanelZhiWuIco"),
        $ziDan = this.GetView("#icePlantZiDanBody"),
        $stemp = 100,
        $jiangShi = this.GetView("#icePlantJiangShiBody"),
        $zhanChang = this.GetView("#icePlantPanelZhanChang"),
        $icePlantNowPoint = this.GetView("#icePlantNowPoint"),
        $gameSpeed = 1000,
        $listJiangShi1 = [],
        $listJiangShi2 = [],
        $listJiangShi3 = [],
        $listJiangShi4 = [],
        $listJiangShi5 = [],
        $listJiangShi6 = [],
        $MyYangGuang = 50;


    //#endregion

    //#region 类定义
    function ZhiWuIco(id, body, config) {
        var cl = body.clone().css({ width: 80, height: 80, "border": "1px solid black", "margin-left": "-1px" }).addClass("ll");
        cl.find("img").css({ width: 50, height: 50 });
        cl.append("<div style='color:yellow;font-weight:bold;text-align:center'>" + config.yangGuang + "</div>")
        this.body = cl;
        this.yangGuang = config.yangGuang;
        this.id = id;
        var _self = this;

        this.body.click(function (e) {

            if (CanPut(_self.yangGuang)) {
                _self.body.animate({ "opacity": 0.2 }, 200);
                var newIco = MakeIco(_self.id, _self.body);
                newIco.body = _self.body.find("img").clone().css({ "width": 80, "height": 80, "position": "absolute" }).hide().appendTo($zhanChang);
                $body.NowZhiwuIco = newIco;
                $i.Common.EventCancel(e);
            }
        })

        $i.Common.AddBodyClick(function () {
            _self.body.animate({ "opacity": 1 }, 200);
        })
    }
    function WanDou(config) {
        this.body = config.body.clone();
        this.id = 0;
        this.isFire = 0;
        this.fireTimer = 0;
        this.speed = 2500;
        this.x = config.x;
        this.y = config.y;
        var _self = this;

        $i.Event.AddEvent("Line" + (this.y + 1) + "HasJiangShi", function () {
            _self.fire();
        })

        $i.Event.AddEvent("Line" + (this.y + 1) + "Clear", function () {
            _self.stopFire();
        })

        this.Move = function () {

        }

        this.fire = function () {
            if (this.isFire) {
                return;
            }

            this.isFire = true;
            function ddd() {

                $i.Game.Play(_self.body.find("img"), ["/img/game/zhiwu.png", "/img/game/zhiwu2.png", "/img/game/zhiwu3.png"], 100, function () {
                    var ziDan = new ZiDan({ x: _self.x * $stemp + 45, y: _self.y * $stemp + 5, gameY: _self.y });
                    ziDan.body.appendTo($zhanChang);
                    ziDan.Run();
                });
            }
            this.fireTimer = setInterval(ddd, this.speed);
            ddd();
        }
        this.stopFire = function () {
            this.isFire = false;
            clearInterval(this.fireTimer);
        }
    }
    function XiangRiKui(config) {
        this.body = config.body.clone();
        this.id = 1;
        this.x = config.x;
        this.y = config.y;
        var _self = this;

        //制造阳光
        setInterval(function () {

            var myYangGuang = $yangGuang.clone();
            myYangGuang.mouseover(function () {
                $(this).find("img").attr("src", "/img/game/yangGuang2.png");
            })
            myYangGuang.mouseout(function () {
                $(this).find("img").attr("src", "/img/game/yangGuang.png");
            })

            myYangGuang.click(function () {

                var p = $i.Game.WebPoint(0, 0, $stemp, $body);

                myYangGuang.animate({ top: p.y - 80, left: p.x, opacity: 0 }, 500, null, function () {
                    SetPoint(50);
                    myYangGuang.remove();
                });

            })

            myYangGuang.appendTo($zhanChang).css({ "left": _self.x * 100, "top": _self.y * 100 }).animate({ top: "+=20", "left": "+=80" }, 500);
        }, 10000)

    }
    function ZiDan(config) {
        this.body = $ziDan.clone();
        this.speed = 10;
        this.y = config.gameY;
        this.timer = 0;
        var _self = this;
        var nowLine = _self.y + 1;
        //var p = $i.Game.IntPointToWebPoint(config.x, config.y, $stemp, $body);

        this.body.css({ "left": config.x, "top": config.y });

        this.Run = function () {
            this.timer = setInterval(function () {
                var left = $i.Game.MoveRight(_self.body, 4);
                var line = [];
                switch (nowLine) {
                    case 1:
                        line = $listJiangShi1;
                        break;
                    case 2:
                        line = $listJiangShi2;
                        break;
                    case 3:
                        line = $listJiangShi3;
                        break;
                    case 4:
                        line = $listJiangShi4;
                        break;
                    case 5:
                        line = $listJiangShi5;
                        break;
                    case 6:
                        line = $listJiangShi6;
                        break;
                }


                //碰撞检测
                for (var i = 0; i < line.length; i++) {
                    if (left >= line[i].body.position().left) {
                        //var nowLine = i + 1;

                        //击中处理
                        clearInterval(_self.timer);
                        //子弹击中的动画
                        $i.Game.Play(_self.body.find("img"), ["/img/game/zidan2.png", "/img/game/zidan3.png"], 60, function () {
                            _self.body.remove();
                            delete _self;
                        });

                        //僵尸血量减少
                        line[i].OnFire(function () {
                            line.splice(i, 1);
                        });

                        if (line.length == 0) {
                            $i.Event.FireEvent("Line" + nowLine + "Clear");
                        }

                        break;
                    }
                }
                //边界检测
                if (left > 800) {
                    clearInterval(_self.timer);
                    _self.body.remove();
                    delete _self;
                }

            }, this.speed);
        }
    }
    function JiangShi(config) {
        this.body = $jiangShi.clone();
        this.speed = config.speed;
        this.line = 0;
        this.hp = config.hp;
        this.timer = 0;
        var _self = this;
        $i.Game.Play(this.body, 3, 40, 500);
        this.move = function () {
            this.timer = setInterval(function () {
                $i.Game.MoveLeft(_self.body, _self.speed);
                $i.Event.FireEvent("Line" + _self.line + "HasJiangShi");
            }, $gameSpeed)
        }
        this.OnFire = function (fn) {
            if (--this.hp == 0) {
                this.Dead(fn);
            }
        }
        this.Dead = function (fn) {
            this.body.remove();
            clearInterval(this.timer);
            fn();
            delete this;
        }
    }
    function GuanKa() {
        this.nowGuan = 0;

        this.Run = function () {
            setTimeout(function () {
                $i.Ui.tip("僵尸要来了做好准备！");

                setInterval(function () {
                    AddJiangShi();
                }, 5500);

            }, 5000);
        }
    }

    //#endregion

    //#region 私有方法
    function MakeZhiWu(id, config) {
        switch (id) {
            case 0:
                config.body = $wanDou;
                return new WanDou(config);
                break;
            case 1:
                config.body = $xiangRiKui;
                return new XiangRiKui(config);
                break;
            default:
                break;
        }
    }
    function MakeIco(id, config) {
        switch (id) {
            case 0:
                return new ZhiWuIco(id, $wanDou, { yangGuang: 100 });
                break;
            case 1:
                return new ZhiWuIco(id, $xiangRiKui, { yangGuang: 50 });
                break;
        }
    }
    function GameInit() {
        //植物ico
        $zhanChang.mousemove(function (e) {
            if ($body.NowZhiwuIco) {
                var p = $i.Game.GamePanelPosition(e.clientX, e.clientY, $stemp, $zhanChang);
                $body.NowZhiwuIco.body.show().css({ left: p.x, top: p.y });
            }
        })

        //安放植物
        $zhanChang.click(function (e) {
            if ($body.NowZhiwuIco) {
                var p = $i.Game.GamePanelPosition(e.clientX, e.clientY, $stemp, $zhanChang);
                $body.NowZhiwuIco.body.remove();

                var gameP = $i.Game.WebPointToIntPoint(p.x, p.y, $stemp, $zhanChang);

                var zhiwu = MakeZhiWu($body.NowZhiwuIco.id, { x: gameP.x, y: gameP.y });
                zhiwu.body.show().css({ "position": "absolute", left: p.x, top: p.y }).appendTo($zhanChang);

                SubPoint($body.NowZhiwuIco.yangGuang)

                setTimeout(function () {
                    $body.NowZhiwuIco = null;
                }, 100);
                return;
            }
        });

        var $guan = new GuanKa();
        $guan.Run();

        SetPoint();
    }
    function AddJiangShi() {

        var x = 8, y = Math.floor(Math.random() * 6);
        var point = $i.Game.WebPoint(x, y, $stemp, $body);
        var jiangShi = new JiangShi({ speed: 5, hp: 5 });
        //来个僵尸
        jiangShi.body.appendTo($zhanChang).css({ "position": "absolute", top: point.y, left: point.x });
        jiangShi.line = y + 1;
        //动起来吧
        jiangShi.move();

        switch (y) {
            case 0:
                $listJiangShi1.push(jiangShi);
                break;
            case 1:
                $listJiangShi2.push(jiangShi);
                break;
            case 2:
                $listJiangShi3.push(jiangShi);
                break;
            case 3:
                $listJiangShi4.push(jiangShi);
                break;
            case 4:
                $listJiangShi5.push(jiangShi);
                break;
            case 5:
                $listJiangShi6.push(jiangShi);
                break;
            default:
                break;
        }
    }
    function SetPoint(yangGuang) {

        if (yangGuang) {
            $MyYangGuang += yangGuang;
        }

        $icePlantNowPoint.html($MyYangGuang);
    }
    function SubPoint(yangGuang) {

        if ($MyYangGuang < yangGuang) {
            $i.Ui.tip("阳光不够了！");
            return false;
        }

        if (yangGuang) {
            $MyYangGuang -= yangGuang;
        }

        $icePlantNowPoint.html($MyYangGuang);
    }
    function CanPut(yangGuang) {
        if ($MyYangGuang < yangGuang) {
            $i.Ui.tip("阳光不够了！");
            return false;
        } else {
            return true;
        }
    }

    //#endregion


    //#region 共有方法
    this.Init = function () {
        var wanDouIco = MakeIco(0);
        var xiangRiKuiIco = MakeIco(1);

        GameInit();

        setTimeout(function () {

            //把植物图标放上去
            wanDouIco.body.appendTo($zhiWuIcoPanel);
            xiangRiKuiIco.body.appendTo($zhiWuIcoPanel);

        }, 200)
        return $body;
    }
    //#endregion

});


