$(function () {
    //自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    });

    //用户渲染
    initUserInfo();
    //导出layer
    var layer = layui.layer;
    //封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUserInfo', res.data);
            }
        })
    }

    //表单重置
    $('#btnReset').on('click', function (e) {
        //阻止重置
        e.preventDefault();
        //从新用户渲染
        initUserInfo();
    })

    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.msg('用户信息修改失败！')
                }
                layer.msg('恭喜您，用户信息修改成功！')
                //调用父页面的跟新用户信息和头像方法
                window.parent.getUserInfo();
            }
        })
    })
})