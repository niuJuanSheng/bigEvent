
// 初始化日期插件
function init_date() {
  // 使用laydate模块
  layui.use('laydate', function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
      elem: '#articleDate'
    });
  });
}

// 初始化富文本插件
function init_tinymce() {
  tinymce.init({
    selector: '#articleContent',
    language: 'zh_CN'
  });
}

$(function () {

  // 获取文章分类
  function getCategoryList() {
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/category/list',
      headers: { Authorization: localStorage.getItem('token') },
      success(res) {
        const html = template('art_category', res)
        $('#category').html(html)
      }
    })
  }
  getCategoryList()

  init_date()
  init_tinymce()


})