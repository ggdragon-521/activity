$(function(){
	var mySwiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    spaceBetween: 30,
	    centeredSlides: true,
	    autoplay: 2500,
	    loop: true,
	    autoplayDisableOnInteraction: false

	});
	$(".swiper-container").mouseover(function(){
	    mySwiper.stopAutoplay();
	}).mouseout(function(){
	    mySwiper.startAutoplay()
	});
	//限制介绍字数两行maxlength
	var maxLength=function(ele,num){
		$(ele).each(function(i){
			var str=$(this).html();
			if(str.length>num){
				var newStr=str.substring(0, num);
				$(this).html(newStr+'...');	
			}
		})
	}
	maxLength('.maxLeng1',26)
	maxLength('.maxLeng2',36)

	//点击搜索按钮
	$('.search').click(function(){
		$("header,#main,footer").hide();
		$("#search").show();
		$('form img').show();
	})
	$('.cancel').click(function(){
		$("header,#main,footer").show();
		$("#search").hide();
		$("#keyword").val("");
		$("#search_content").empty();
	})
	$("#keyword").on('input propertychange',function(){
		var search_name=$.trim($(this).val());
		$("#search_content").empty();
		if(search_name!=''){
			console.log(search_name)
			$('form img').hide();
			$.ajax({
				url:'http://192.168.1.220/gxpx/Mobile/index/date?name='+search_name,
				type: 'post',
				success:function(e){
					var data=JSON.parse(e);
					console.log(data)
					var html="";
					for(var i=0;i<data.length;i++){
						html+='<li><a href="#">'+'<div class="search_wrap">'+'<img src="images/s1@2x.png">'+'<span>'+data[i].name+'</span>'+'</div>'+'</a></li>'
					}
					$("#search_content").html(html);
				}
			})
			
		}else{
			$('form img').show();
		}
		
	})
	$("#keyword").on('keypress',function(e) {
	    var keycode = e.keyCode;
	    if(keycode=='13') {
	        e.preventDefault();
	        if($(this).val()==""){
				return false;
			}  
	        //请求搜索接口
	        window.location.href="search-result.html"
	    }
    	
	})

})