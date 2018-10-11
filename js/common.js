$(function(){
	//课程导航
	var c_num=0;
	$('.filterCourse').click(function(){
		
		if(c_num++%2==0){
			$(".course-nav,.mask-nav").css("display","block");
			$("html").addClass("alpha");
		}else{
			$(".course-nav,.mask-nav").css("display","none");
			$("html").removeClass("alpha");
		}
		
	})
	$(".mask-nav").tap(function(e){
		c_num++;
		e.preventDefault()
		$(".course-nav,.mask-nav").hide();
		$("html").removeClass("alpha");
	})

	//课程分类
	var aLi=$(".classify ul li");
	var c_list=$(".c_list");
	var oBg=$('.bg')[0];
	//初始化
	c_list.eq(0).addClass('show');
	for(i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		aLi[i].onclick=function ()
		{
			startMove(oBg, this.offsetLeft);
			for(var j=0;j<c_list.length;j++){
				c_list.removeClass('show');
			}
			c_list.eq(this.index).addClass('show');
		};
	}

})
// 获取url参数
function getUrlPram(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if(r!=null) {
        return  decodeURI(r[2]);
    }
    return null;
}

var iSpeed=0;
var left=0;

function startMove(obj, iTarget)
{
	clearInterval(obj.timer);
	
	obj.timer=setInterval(function (){
		iSpeed=(iTarget-obj.offsetLeft)/3;
		iSpeed*=0.9;
		
		left+=iSpeed;
		
		if(Math.abs(iSpeed)<1 && Math.abs(left-iTarget)<1)
		{
			clearInterval(obj.timer);
			var rem=$('html').css('fontSize');
			rem=parseFloat(rem);
			obj.style.left=iTarget/rem+'rem';
		}
		else
		{
			obj.style.left=left+'px';
		}
		
	}, 30);
}