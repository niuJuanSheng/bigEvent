$(function () {
  getUserInfo()
  // 向后台发起请求，获取用户信息
  function getUserInfo() {
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/user/info',
      // 请求头  token 都是放在请求头!!!当众1发送给后台!!!
      headers: { Authorization: localStorage.getItem('token') },
      success(res) {
        const user = res.data
        $('.user_info span').text(user.nickname)
        $('.user_info img').prop('src', user.userPic)
        $('.user_center_link img').prop('src', user.userPic)
      }
    })
  }

  // 退出功能
  $('.logout').on('click', function () {
    if (confirm('确定退出吗')) {
      localStorage.removeItem('token')
      location.href = 'login.html'
    }
  })

  // 点击一级菜单控制二级菜单
  $('.level01').on('click', function () {
    $(this).next('.level02').stop().slideToggle()
    // 点击一级菜单控制箭头的方向
    $(this).find('.iconfont').toggleClass('rotate0')
  })




})