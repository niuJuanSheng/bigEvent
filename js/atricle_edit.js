
$(function () {

  // 获取被编辑的文章的id
  const id = (new URLSearchParams(location.search)).get('id')



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
        articleInfo()
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


  // 发起请求
  function articleInfo() {
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/article/search',
      data: { id },
      headers: { Authorization: localStorage.getItem('token') },
      success(res) {

        if (res.code === 200) {
          $('[name="title"]').val(res.data.title)
          $('[name="categoryId"]').val(res.data.categoryId)
          $('[name="date"]').val(res.data.date)
          // 图片获取
          $('#coverimg').prop('src', res.data.cover)
          // 富文本内容的获取
          $('#articleContent').html(res.data.content)

        } else {
          console.log('获取失败')
        }

      }
    })
  }

  articleInfo()


  // 5. 发布点击事件
  function releaseCategory(ele, state) {
    // 5. 绑定点击事件
    $(ele).on('click', function () {

      // 使用formData 获取到对应的数据 表单的数据
      const formdata = new FormData($('#form')[0])
      // 追加文本域内容
      formdata.append('content', tinyMCE.editors['articleContent'].getContent())
      // 追加发布状态
      formdata.append('state', state)
      // 追加要编辑的文章的id
      formdata.append('id', id)

      // 拼接参数 发送到后台 完成新增
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/v1/admin/article/edit',
        data: formdata,
        // 请求头
        contentType: false,
        processData: false,
        headers: { Authorization: localStorage.getItem('token') },
        success(res) {
          if (res.code === 200) {
            console.log(res)
            // 重新跳转到文章的列表页面
            location.href = 'atricle_list.html'
          } else {
            console.log('获取失败')
          }
        }

      })
    })
  }
  releaseCategory('#release', '已发布')
  releaseCategory('.btn-draft', '')



})

