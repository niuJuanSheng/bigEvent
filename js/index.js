$(function () {

  // 向后台发起请求，获取用户信息
  $.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/info',
    // 请求头  token 都是放在请求头!!!当众1发送给后台!!!
    headers: { Authorization: localStorage.getItem('token') },
    success(res) {
      console.log(res)
    }

  })

})