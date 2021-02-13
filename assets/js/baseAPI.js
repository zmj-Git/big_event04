// 1.开发环境服务器地址
var baseURL = "http://api-breakingnews-web.itheima.net"
// // 2.测试环境服务器地址
// var baseURL = "http://api-breakingnews-web.itheima.net"
// // 3.生产环境服务器地址
// var baseURL = "http://api-breakingnews-web.itheima.net"

//拦截所有ajax请求:get/post/ajax;
$.ajaxPrefilter(function (params) {
    // 1.添加根路径
    params.url = baseURL + params.url;

    // 2.身份验证
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 3.拦截所有响应，判断身份确认信息
    params.complete = function (res) {
        // console.log(res.responseJSON)
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败!') {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
})