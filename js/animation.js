/**
 * Created by hezhu on 2017/1/14.
 */
/*--------------插入动画---------------*/
function anim_insert_item() {
    $(document).ready(function () {

        $("#list_box li:first").css({"opacity":"0"})
        $("#list_box li").css({"top":"-43px"})
        $("#list_box li").animate({top:'0px',opacity:'1'})




    })

}

/*-----------------删除动画------------*/
function anim_remove_item(eve) {
    $(document).ready(function () {

        $("#list_box li:first").stop(false,true).animate({left:'60px'},200);
        $("#list_box li:first").fadeOut(100,
            function () {
                $("#list_box li").css({"top":"43px"});
                $("#list_box li").animate({top:'0px'},200).ready(function () {
                    eve();
                });
            }
        );

    })
    
}