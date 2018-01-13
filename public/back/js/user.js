/**
 * Created by asus-ty on 2018/1/13.
 */

$(function () {
  var page = 1;//记录页码
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type:"get",
      url:'/user/queryUser',
      data:{
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var result = template("tpl",info);
        $("tbody").html(result);
        //渲染分页
        //如果引入的bootstrap的版本是3+，
        // 1. 分页的盒子必须是ul元素
        // 2. 还需要指定一个属性：bootstrapMajorVersion指定bootstrap的版本
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          numberOfPages: 5,
          onPageClicked: function (a, b, c, p){
            page = p;
            render();
          }
        });


      }
    });

  }
  $("tbody").on("click", ".btn", function () {

    //让模态框显示
    $("#userModal").modal("show");

    //获取到id
    var id = $(this).parent().data("id");
    //获取到是否禁用  如果是btn-success类，说明需要启用这个用户，需要传1
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    //
    $(".btn_confirm").off().on("click", function () {
      $.ajax({
        type:'post',
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          if(info.success) {
            //关闭模态框
            $("#userModal").modal('hide');
            //重新渲染页面
            render();
          }
        }
      })
    });

  });




});