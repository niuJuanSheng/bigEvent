
$(function () {

  // 全局变量，请求参数
  let params = {
    //   key	string	搜索关键词，可以为空，为空返回某类型所有文章
    key: '',
    // type	string	文章类型id，可以为空，为空返回所有类型文章
    type: '',
    // state	string	文章状态，草稿 ，已发布,为空返回所有状态文章
    state: '',
    // page	number	当前页，为空返回第1页
    page: '1',
    // perpage	number	每页显示条数，为空默认每页6条
    perpage: ''
  }

  // 发起异步请求
  function articleQuery() {
    // 获取数据，发请求
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/article/query',
      headers: { Authorization: localStorage.getItem('token') },
      data: params,
      success(res) {
        if (res.code === 200) {
          let html = template('atricleListTemp', res.data)
          $('.table tbody').html(html)
          // 获取分页的总条数
          const totalCount = res.data.totalCount
          renerPager(totalCount)
        } else {
          console.log('获取失败')
        }

      }
    })
  }
  articleQuery()

  // 利用layui实现分页组件
  function renerPager(totalCount) {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: 'pager', //注意，这里的 test1 是 ID，不用加 # 号
      count: totalCount,//数据总数，从服务端得到
      limit: 10,
      curr: params.page,
      jump: function (obj, first) {

        //首次不执行
        if (!first) {
          //do something
          // 获取当前点击的分页页码
          params.page = obj.curr
          // 重新发起异步请求
          articleQuery()
        }
      }
    });
  }

  // 发起异步请求获取所有文章类别
  function selCategory() {
    $.ajax({
      url: 'http://localhost:8080/api/v1/admin/category/list',
      headers: { Authorization: localStorage.getItem('token') },
      success(res) {
        if (res.code === 200) {
          let html = ` <option value="">所有分类</option>
          <option>未分类</option>`
          $.each(res.data, (i, val) => {
            html += `<option>${val.name}</option>`
          })
          $('#selCategory').html(html)
        } else {
          console.log('获取失败')
        }
      }
    })

  }
  selCategory()

})