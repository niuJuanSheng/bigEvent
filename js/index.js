$(function () {

  // 判断是否有token，没有的话阻止跳转出页面
  const token = localStorage.getItem('token')
  if (!token) {
    location.href = 'login.html'
  }

})