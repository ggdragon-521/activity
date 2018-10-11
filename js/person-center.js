$(function() {
		var header = document.getElementsByTagName('header')[0];
		var main = document.getElementById('main');
		main.style.minHeight = (window.innerHeight - header.offsetHeight) + 'px';
	})
//检测修改是否符合格式 个人资料
function modifyCheck() {
	var email=$(".email").val();
	var filterEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	if(!filterEmail.test(email)){
		if (email == "") {
			return true;
		} else {
			swal("邮箱格式不对");
			return false;
		}
	}else{
		swal({
			title:"修改成功",
			text:"2s后自动关闭",
			timer: 2000
		})
	}
}
function alert_warn(){
	swal({
		title:"手机号不可更改",
		text:"2s后自动关闭",
		timer: 2000
	})
}
function alert_name(){
	swal({
		title:"姓名不可更改",
		text:"2s后自动关闭",
		timer: 2000
	})
}