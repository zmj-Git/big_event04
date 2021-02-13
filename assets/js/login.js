$(function () {
    //1.点击去注册账号，隐藏登录区域。显示注册区域
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //2.点击去登录，隐藏注册区域。显示登录区域
    $("#link_login").on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //3.自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位，且不能输入空格"
        ],
        repwd: function (value) {
            var pwd = $(".reg-box input[name-password]").val()
            if (value !== pwd) {
                return "两次密码输入不一致！";
            }
        }
    });

    //4.注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录");
                //手动切换到登录表单
                $("#link_login").click();
                //重置form表单
                $("#form_reg")[0].reset();
            }
        });
    })
    //5.登录功能
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("恭喜你，登录成功");
                localStorage.setItem('token', res.token);
                //跳转
                location.href = "/index.html"
            }
        });
    })
})