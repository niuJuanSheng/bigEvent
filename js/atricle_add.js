/* 
1 组件的初始化
  1 图片上传框 即时显示 （两个标签 图片标签 另外一个 文件上传标签）
  2 动态渲染下拉列表-文章类别
  3 初始化 layui的日期选择框
  4 初始化 tinymce 富文本编辑器

*/

$(function () {

  // 1. 图片上传框 即时显示
  function uploadImg() {
    $('#inputCover').on('change', function () {

      const file = this.files[0]
      $('#coverimg').prop('src', URL.createObjectURL(file))

    })
  }

  // 1. 图片上传框 即时显示
  uploadImg()

  // 2. 动态渲染下拉列表-文章类别
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

  // 2. 动态渲染下拉列表-文章类别
  getCategoryList()

  // 3. 初始化 layui的日期选择框
  function initDate() {

    const laydate = layui.laydate;
    //执行一个laydate实例
    laydate.render({
      elem: '#articleDate'

    });
  }

  // 3. 初始化 layui的日期选择框
  initDate()


  // 4. 初始化 tinymce 富文本编辑器
  function initTinymce() {
    tinymce.init({
      selector: '#articleContent',
      language: 'zh_CN'
    });
  }

  // 4. 初始化 tinymce 富文本编辑器
  initTinymce()






})

