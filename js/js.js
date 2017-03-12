function Dmove_keyboard(obj){

$("#keyboard").addClass("skin"+obj.skin);

//键盘部分JS
$("#keyboard .title").css("line-height",$("#keyboard").height()/5+"px");

$(".keyboard-bind").focus(function(){
    var input = $(this);

    var jpnub = $("#xfkb td").length;

    if(obj.move){
        $("#keyboard .title").css("cursor","move");
        move("keyboard");        //开启键盘可移动
    }


    $("#xfkb td").unbind("click");
        
    $("#keyboard").show();
    var xfkb_text = input.val();                        //获取input框当前的val值


    $(".input_on").removeClass("input_on");
    input.addClass("input_on");                         //设置input框选中时的样式

    $("#jptitle").html(input.attr("placeholder"));      //键盘标题，自动获取input的placeholder值

    $("#xfkb td").click(function () {
        var click = $(this).html();                         //获取点击按键的内容
        //特殊按键在这添加事件
        //判断点击的按键是否有特殊事件，如果没有则按键内容加在input文本后面
        if (click == "清空") {
            xfkb_text = "";
            input.val(xfkb_text);
        }else if(click == "shift"){
            for(i=0;i<jpnub;i++){
                    $("#xfkb td:eq("+i+")").html($("#xfkb td:eq("+i+")").html().toUpperCase());
                }
        }else if(click == "SHIFT"){
            for(i=0;i<jpnub;i++){
                    $("#xfkb td:eq("+i+")").html($("#xfkb td:eq("+i+")").html().toLowerCase());
                }
        }else if(click == "空格"){
            xfkb_text = xfkb_text + " ";
            input.val(xfkb_text);
        }else {
            xfkb_text = xfkb_text + click;
            input.val(xfkb_text);
        }

        input.focus();
    })

})

$(".keyboard_hide").click(function(){
    $(".input_on").removeClass("input_on");                    //移除选中input的选中样式
    $("#keyboard").hide();
})




//鼠标按住键盘头部拖动JS
function unmove(obj){
    $("#" + obj + " .title").unbind("mousedown");
}
function move(obj){
    var OffsetX = 0;
    var OffsetY = 0;
    var moveKg = false;
    var csZ = 0;
    function d(id) {
        return document.getElementById(id);
    }
    $("#"+obj+" .title").bind("mousedown", function () {
        OffsetX = event.pageX - d(obj).offsetLeft;
        OffsetY = event.pageY - d(obj).offsetTop;
        csZ = $("#"+obj).css("z-index");
        $("#"+obj).css("z-index","9999");
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
            var maxX = $(window).width() - d(obj).offsetWidth;
            var maxY = $(window).height() - d(obj).offsetHeight;
            moveX=Math.min(maxX,Math.max(0,moveX));
            moveY=Math.min(maxY,Math.max(0,moveY));
            $("#"+obj).css({"left":moveX,"top":moveY});
        })
        $(document).bind("mouseup", function () {
            moveKg = false;
            $("#"+obj).css("z-index",csZ);
            $(document).unbind("mousemove mouseup");
        })
    }
}


}