/**
 * Created by asus-ty on 2018/1/16.
 */
$(function () {
    var productId = getSearch("productId");

  $.ajax({
    type:"get",
    url:'/product/queryProductDetail',
    data:{
      id:productId
    },
    success:function (info) {
        $(".mui-scroll").html(template("tpl",info));

      mui(".mui-slider").slider({
        interval:2000
      });
      mui(".mui-numbox").numbox();
    }
  });

});