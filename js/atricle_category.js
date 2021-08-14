
$(function () {

  // 定义一个全局变量，用来存储编辑数据的id
  let editId

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
  $('#myModal .btn_opt').on('click', function (e) {
    // 阻止默认事件
    e.preventDefault
    // 获取输入的数据
    const name = $('.categoryName').val().trim()
    const slug = $('.categoryAlias').val().trim()

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


  // 绑定编辑的点击事件
  $('#tbody').on('click', '.edit', function () {
    // 显示模态框
    $('#editModal').modal('show')
    // 填充数据
    $('#name').val($(this).parents('tr').data('value').name)
    $('#slug').val($(this).parents('tr').data('value').slug)

    // 获取当前点击的id
    editId = $(this).parents('tr').data('value').id

  })

  // 绑定编辑分类的保存按钮事件
  $('#editModal .btn_opt').on('click', function () {

    const name = $('#name').val()
    const slug = $('#slug').val()
    // 发起post请求
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/v1/admin/category/edit',
      headers: { Authorization: localStorage.getItem('token') },
      data: {
        id: editId,
        name, slug
      },
      success(res) {
        if (res.code === 200) {
          // 关闭模态框
          $('#editModal').modal('hide')
          getCategoryList()
        } else {
          console.log('获取失败')
        }
      }
    })

  })


  // 绑定删除分类按钮的绑定事件
  $('#tbody').on('click', '.delete', function () {

    // 获取当前点击的id值
    const id = $(this).parents('tr').data('value').id
    // 发起post请求
    $.ajax({
      type: 'POST',
      url: "http://localhost:8080/api/v1/admin/category/delete",
      headers: { Authorization: localStorage.getItem('token') },
      data: { id },
      success(res) {
        if (res.code === 200) {
          if (confirm('确定删除吗')) {
            getCategoryList()
          }

        } else {
          console.log('获取失败')
          console.log(res)
        }
      }
    })


  })

})