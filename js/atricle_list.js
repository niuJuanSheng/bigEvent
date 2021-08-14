

$(function () {

  function articleQuery() {
    // 获取数据，发请求
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/article/query',
      headers: { Authorization: localStorage.getItem('token') },
      success(res) {
        if (res.code === 200) {
          let html = template('atricleListTemp', res.data)
          $('.table tbody').html(html)
        } else {
          console.log('获取失败')
        }

      }
    })
  }
  articleQuery()

  function renerPager() {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: 'pager' //注意，这里的 test1 是 ID，不用加 # 号
      , count: 50 //数据总数，从服务端得到
    });
  }
  renerPager()



})