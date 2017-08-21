(function ($) {
    $.fn.Dmove_keyboard = function (obj) {
        var _obj,title,input,keyBtn,keyCustomEvent,keyCustom,skin
        _obj = $(this);
        title = $(this).children('.title');
        input = $(".keyboard-bind");
        keyBtn = $("#xfkb td");
        keyCustomEvent = {
            shift:function (type) {
                if(type){
                    for (i = 0; i < keyBtn.length; i++) {
                        keyBtn.eq(i).html(keyBtn.eq(i).html().toUpperCase());
                    }
                }else {
                    for (i = 0; i < keyBtn.length; i++) {
                        keyBtn.eq(i).html(keyBtn.eq(i).html().toLowerCase());
                    }
                }
            },
            space:function () {
                xfkb_text = xfkb_text + " ";
            }
        }
        keyCustom = {
            'shift':keyCustomEvent.shift(true),
            'SHIFT':keyCustomEvent.shift(true),
            '空格':keyCustomEvent
        }



        skin = function (nub) {
            _obj.removeClass();
            _obj.addClass("skin" + nub);
        }
        skin(obj.skin)
        _obj.find('.jpskin').find('ul').children('li').click(function () {
            skin($(this).attr('data-skin'))
        })

        //键盘部分JS
        title.css("line-height", _obj.height() / 5 + "px");

        input.focus(function () {
            var inputOn = $(this)

            if (obj.move) {
                title.css("cursor", "move");
                move();        //开启键盘可移动
            }


            keyBtn.unbind("click");

            _obj.show();
            var xfkb_text = inputOn.val();                        //获取input框当前的val值


            $(".input_on").removeClass("input_on");
            inputOn.addClass("input_on");                         //设置input框选中时的样式

            title.children(".jptitle").html(inputOn.attr("placeholder"));      //键盘标题，自动获取input的placeholder值

            keyBtn.click(function () {
                var click = $(this).html();                         //获取点击按键的内容
                //特殊按键在这添加事件
                //判断点击的按键是否有特殊事件，如果没有则按键内容加在input文本后面
                if (click == "清空") {
                    xfkb_text = "";
                    inputOn.val(xfkb_text);
                } else if (click == "shift") {
                    for (i = 0; i < keyBtn.length; i++) {
                        $("#xfkb td:eq(" + i + ")").html($("#xfkb td:eq(" + i + ")").html().toUpperCase());
                    }
                } else if (click == "SHIFT") {
                    for (i = 0; i < keyBtn.length; i++) {
                        $("#xfkb td:eq(" + i + ")").html($("#xfkb td:eq(" + i + ")").html().toLowerCase());
                    }
                } else if (click == "空格") {
                    xfkb_text = xfkb_text + " ";
                    inputOn.val(xfkb_text);
                } else {
                    xfkb_text = xfkb_text + click;
                    inputOn.val(xfkb_text);
                }
                inputOn.focus();
            })
        })

        $(".keyboard_hide").click(function () {
            $(".input_on").removeClass("input_on");                    //移除选中input的选中样式
            _obj.hide();
        })


        //鼠标按住键盘头部拖动JS
        function unmove(obj) {
            title.unbind("mousedown");
        }

        function move() {
            var OffsetX = 0;
            var OffsetY = 0;
            var moveKg = false;
            var csZ = 0;

            title.bind("mousedown", function () {
                OffsetX = event.pageX - _obj[0].offsetLeft;
                OffsetY = event.pageY - _obj[0].offsetTop;
                csZ = _obj.css("z-index");
                _obj.css("z-index", "9999");
                moveKg = true;
                jpyd();
            })
            function jpyd() {
                $(document).bind("mousemove", function () {
                    var e = e || window.event;
                    var mouswX = e.pageX;
                    var mouswY = e.pageY;
                    var moveX = mouswX - OffsetX;
                    var moveY = mouswY - OffsetY;
                    var maxX = $(window).width() - _obj[0].offsetWidth;
                    var maxY = $(window).height() - _obj[0].offsetHeight;
                    moveX = Math.min(maxX, Math.max(0, moveX));
                    moveY = Math.min(maxY, Math.max(0, moveY));
                    _obj.css({"left": moveX, "top": moveY});
                })
                $(document).bind("mouseup", function () {
                    moveKg = false;
                    _obj.css("z-index", csZ);
                    $(document).unbind("mousemove mouseup");
                })
            }
        }

    }
})(jQuery)