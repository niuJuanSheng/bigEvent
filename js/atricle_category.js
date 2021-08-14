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
          console.log(res)
        } else {
          console.log('获取失败')
        }
      }
    })
  }
  getCategoryList()


})