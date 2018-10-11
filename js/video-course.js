$(function(){
	//导航切换
	var video_list=$('.video-introduce ul a li');
	var oBg=$('.bg')[0];
	video_list.eq(0).addClass('active');
	// for(var i=0;i<video_list.length;i++){
	// 	video_list[i].onclick=function(){
	// 		startMove(oBg,this.offsetLeft);
	// 		$(this).addClass("active").parent().siblings().find('li').removeClass("active")
	// 	}
	// }
	function hash(){
		var hash=window.location.hash;
		if(hash=="#1"){
			video_list.eq(0).addClass('active');
			video_list.eq(1).removeClass('active');
			$(".video-wrap1").show('slow');
			$(".video-wrap2").hide();
			startMove(oBg,0);
		}else if(hash=="#2"){
			video_list.eq(1).addClass('active');
			video_list.eq(0).removeClass('active');
			$(".video-wrap1").hide();
			$(".video-wrap2").show('slow');
			startMove(oBg,video_list.width());
		}
	}
	hash();
	window.onhashchange=function(){
		hash();
	}
	//课程字数多显示省略号
	var course_detail=$('.course-detail .str');
	$.each(course_detail,function(i,obj){
		var str=$(this).html();
		var num=54;
		if(str.length>num){
			var newStr=str.substring(0, 54);
			$(this).hide();
			$(this).next('.newStr').html(newStr+'...').show();
		}else{
			$(this).siblings('.down').hide();
		}

	})
	$(".down").click(function(){

		$(this).hide();
		$(this).siblings('.up').show();
		$(this).siblings('.str').show();
		$(this).siblings('.newStr').hide();
		
	})
	$(".up").click(function(){
		$(this).hide();
		$(this).siblings('.down').show();
		$(this).siblings('.str').hide();
		$(this).siblings('.newStr').show();
	})
	//控制课程字数
	$('.course-list li a span').each(function(){
		var str=$(this).html();
		var num=21;
		if(str.length>num){
			var newStr=str.substring(0, 20);
			$(this).html(newStr+'...');
		}
	});
	(function ($) {
	  $.fn.slideUp = function (duration) {    
	    // get old position to restore it then
	    var position = this.css('position');
	    this.css({
	      position: 'absolute',
	      visibility: 'hidden'
	    });
	    // get naturally height
	    height = this.height();
	    // set initial css for animation
	    this.css({
	    	height:height,
	      	position: position,
	      	visibility: 'visible',
	      	overflow: 'hidden'
	      	
	    });
	 
	    // animate to gotten height
	    this.animate({
	      	height: 0,
	      	paddingBottom: '0',
	     	border:'0',
	      	margin: '0'
	    }, duration,function(){
	    	
	    });
	  };
	  $.fn.slideDown = function (duration) {    
	    // get old position to restore it then
	    var position = this.css('position');
	    this.css({
	      position: 'absolute',
	      visibility: 'hidden'
	    });
	    // get naturally height
	    //var height = this.height();
	    // set initial css for animation
	    this.css({
	    	height:0,
	      	position: position,
	      	visibility: 'visible',
	      	overflow: 'hidden'
	      	
	    });
	 
	    // animate to gotten height
	    this.animate({
	      	height: height,
	      	paddingBottom: '0',
	     	border:'0',
	      	margin: '0'
	    }, duration,function(){
	    	
	    });
	  };
	})(Zepto);
	$('.video-wrap2 .container>p').click(function(){
		if($(this).next().height()==0){
			$(this).next().slideDown()
		}else{
			$(this).next().slideUp();
		}
	})
	$('.star').click(function(){
		if($(this)[0].src=="http://192.168.1.222/gxpxphone/images/Star2@2x.png"){
			$(this)[0].src="http://192.168.1.222/gxpxphone/images/Star@2x.png"
		}else{
			$(this)[0].src="http://192.168.1.222/gxpxphone/images/Star2@2x.png"
		}
		
	});
	//视频播放完毕
	$("#video video")[0].onended=function(){
		alert(1)
	}
	$("#video video").on("waiting", function () {
		$('.pdq-load-wrap').show();
	});
	$("#video video").on("playing", function () {
		$('.pdq-load-wrap').hide();
	});
	$("#video video").on("canplay", function () {
		$('.pdq-load-wrap').hide();
	});
})