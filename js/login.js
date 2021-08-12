$(function () {

  $('#login').on('click', function (e) {
    // 阻止按钮的默认刷新页面
    e.preventDefault()

    // 获取用户名和密码
    const username = $('#username').val().trim()
    const password = $('#password').val().trim()

    $.post('http://localhost:8080/api/v1/admin/user/login', { username, password }, res => {
      if (res.code === 200) {
        // 成功
        // 将token  存储到本地
        localStorage.setItem('token', res.token)

        // 跳转到首页
        location.href = 'index.html'
      } else {
        console.log('登录失败')
        console.log(res)
      }

    })

  })

})