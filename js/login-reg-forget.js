$(function(){
	var header=document.getElementsByTagName('header')[0];
	var main=document.getElementById('main');
	main.style.minHeight = (window.innerHeight - header.offsetHeight) + 'px';
	//验证码倒计时
	var wait=60;
	var code=$(".code")[0];
	if(code==undefined){
		return false;
	}
	document.getElementsByClassName('code')[0].disabled = false;   
	function time(o) {
        if (wait == 0) {
            o.removeAttribute('disabled');
            o.style.backgroundColor = '#49b0f6';
            o.value='获取验证码';
            wait = 30;
        } else {
            o.setAttribute('disabled', true);
            o.style.backgroundColor = '#999'
            o.value='倒计时(' + wait + ')';
            wait--;
            setTimeout(function() {
                time(o)
            },
            1000)
        }
    }
	document.getElementsByClassName('code')[0].onclick=function(){time(this);}
})
//验证登陆
var filterPhone  =  /(^1\d{10}$)/;
var filterPwd =/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\`]{6,16}$/
function loginCheck(){
	var account=$('input[name="account"]');
	var pwd=$('input[name="password"]');
	if(account.val()==""&&pwd.val()==""){
		swal("账号和密码不能为空");
		return false;
	}else if(account.val()==""){
		swal("账号不能为空");
		return false;
	}else if(pwd.val()==""){
		swal("密码不能为空");
		return false;
	}
	if(!filterPhone.test(account.val())||!filterPwd.test(pwd.val())){
		if (!filterPhone.test(account.val())) {
			swal("账号格式不对");
			return false;		
		}else if(!filterPwd.test(pwd.val())){
			swal("密码格式不对");
			return false;
		}
	}else{
		window.location.href="person-center.html"
	}
	$.ajax({
		url:"do.php",
		data:{account:account.val(),pwd:pwd.val()},
		type:"post",
		success:function(e){
			//0错误 1正确 account账号  password密码
			if(e.account==0){
				swal("账号错误")
			}else if(e.password==0){
				swal("密码错误")
			}else if(e.account==1&&e.password==1){
				swal("登陆成功")
			}

		}
	})
}
//验证注册和忘记密码
function registerCheck(){
	var account=$('input[name="account1"]');
	var pwd=$('input[name="password"]');
	if(!filterPhone.test(account.val())&&!filterPwd.test(pwd.val())){
		if(account.val()==""&&pwd.val()==""){
			swal("账号和密码不能为空");
			return false;
		}else if(account.val()==""){
			swal("账号不能为空");
			return false;
		}else if(pwd.val()==""){
			swal("密码不能为空");
			return false;
		}else{
			swal("账号和密码错误");
			return false;
		}
		
	}else if (!filterPhone.test(account.val())) {
		swal("账号错误");
		return false;		
	}else if(!filterPwd.test(pwd.val())){
		swal("请输入6~16位数字或英文组合密码");
		return false;
	}
	$.ajax({
		url:"do.php",
		data:{account:account.val(),pwd:pwd.val(),code:$('.codeWrap input').val()},
		type:"post",
		success:function(e){
			//0错误 1正确 account账号  code验证码
			if(e.account==0){
				swal("账号错误")
				return false;
			}else if(e.code==0){
				swal("密码错误");
				return false;
			}else if(e.account==1&&e.code==1){
				swal("注册成功")
			}

		}
	})
}
//验证修改密码
function save1(){
	var oldPwd=$("input[name='pwd_modify']").val();
	var newPwd=$("input[name='newPwd']").val();
	var confirmPwd=$("input[name='confirm']").val();
	if(oldPwd==""){
		swal("旧密码不能为空");
		return false;
	}else if(newPwd==""){
		swal("新密码不能为空");
		return false;
	}else if(confirmPwd==""){
		swal("请再次输入新密码");
		return false;
	}else if(!filterPwd.test(oldPwd)||!filterPwd.test(newPwd)){
		swal("请输入6~16位数字或英文组合密码");
		return false;
	}else if(newPwd!=confirmPwd){
		swal("输入密码与新密码不一致");
		return false;
	}
	$.ajax({
		url:"do.php",
		data:{old:oldPwd,new:newPwd},
		success:function(e){
			if(e==1){
				swal("修改密码成功");
				//重置表单为空
				$("input").val("")
			}
		}
	})


}