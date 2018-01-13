/**
 * Created by asus-ty on 2018/1/13.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
  function render() {
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        $("tbody").html( template("tpl",info) );
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function (a,b,c,p) {
            currentPage = p;
            render();
          }
        });
      }
    });
  }
  render();
  $(".btn_add").on("click", function () {
      $("#addModal").modal("show");
  });
  var $form = $("#form");
  $form.bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'

    },
    fields:{
      categoryName:{

        validators:{
          notEmpty:{
            message:"请输入一级分类的名称"
          }
        }
      }
    }
  });
  $form.on("success.form.bv", function (e) {

    //var categoryName = $("[name='categoryName']").val();

    e.preventDefault();
    console.log("呵呵");
    //发送ajax请求，
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (info) {
        if(info.success){

          //关闭模态框
          $("#addModal").modal("hide");

          //重新渲染第一页
          currentPage = 1;
          render();


          //把模态框中的数据重置
          $form.data("bootstrapValidator").resetForm();
          //$form是一个jquery对象，没有reset方法
          //但是dom对象有reset方法，所以需要把form这个对象取出来，才能调用reset方法
          $form[0].reset();

        }
      }
    });
  });
});