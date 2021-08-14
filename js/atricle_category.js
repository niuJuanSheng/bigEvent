
$(function () {

  // 获取所有的文章信息
  function getCategoryList() {
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/category/list',
      dataType: 'json',
      // 请求头
      headers: { Authorization: localStorage.getItem('token') },
      success(res) {
        if (res.code === 200) {
          // 利用模板引擎template来进行数据的渲染
          let html = template('newListTemp', res)
          $('#tbody').html(html)
        } else {
          console.log('获取失败')
        }
      }
    })
  }
  getCategoryList()

  // 文章列表新增分类
  $('.btn_opt').on('click', function (e) {
    // 阻止默认事件
    e.preventDefault
    // 获取输入的数据
    let name = $('.categoryName').val().trim()
    let slug = $('.categoryAlias').val().trim()

    if (!name || !slug) {
      alert('请输入分类名')
      return
    }
    // 发起post请求
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/v1/admin/category/add',
      headers: { Authorization: localStorage.getItem('token') },
      data: { name, slug },
      success: function (result) {
        if (result.code === 200) {
          // 清空输入框
          $('.categoryName').val("")
          $('.categoryAlias').val("")
          // 关闭模态框
          $("#myModal").modal('hide')
          getCategoryList()
        } else {
          console.log('请求失败')
        }
      }
    })


  })


  // 
})