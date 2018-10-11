var vue = new Vue({
    el : 'body',//vue的作用范1围，一般body就行
    data : {//页面的数据
        courseId:getUrlPram('courseId'),//课程id
        videoList : [],//课程数据  
    },
    ready: function() {//不能写到其他三个地方的都写里面
        // 初始化数据
        this.getData();
    },
    methods : {//页面的方法
        getData : function() {
            var oThis = this;
            $.ajax({
                type : 'get',
                url: "https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/video",
                data : {
                    courseId : oThis.courseId,
                },
                dataType: 'json',
                success : function(data) {
                        console.log(data);
                        oThis.videoList= data;
                    
                }
            });
        },
        submit:function(){
            var oThis = this;
            var val = $('#textarea').val();
            $.ajax({
                url:'data1.json',
                type:"post",
                data:{'val':val},
                success:function(e){
                  //0错误 1正确
                  if(e==0){
                    alert('系统错误，请重试');
                  }else if(e==1){
                    window.location.href="";
                  }
                }
            })
        },
        put:function(){
            var oThis = this;
            var checkss=$('input[name="check"]:checked');
             if(checkss.length==0){
                alert('请选择答案提交');
                 return false;
            }
            var item = [];
            var items = [];
            $("input[name='check']:checked").each(function(){
             var id=$(this).val();
             item.push(id);
         })
            var checks=$('input[name="checks"]:checked');
             if(checks.length==0){
                alert('请选择答案提交');
                return false;
            }
            $("input[name='checks']:checked").each(function(){
             var ids=$(this).val();
             items.push(ids);
         })
            $.ajax({
                url:'data1.json',
                type:"post",
                data:{'id':item,'ids':items},
                success:function(e){
                  //0错误 1正确
                  if(e==0){
                    alert('系统错误，请重试');
                  }else if(e==1){
                    window.location.href="";
                  }
                }
            })
            $('.overlay').css('display','none');
            $('.showBox').css('display','none');

            sessionStorage.setItem('item',items);
        }
        
    }
});

function getUrlPram(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if(r!=null) {
        return  decodeURI(r[2]);
    }
    return null;
}
window.onload = function(){
    var aa= sessionStorage.getItem('item');
    if(aa){
      $('.overlay').css('display','none');
      $('.showBox').css('display','none');  
    }
}
var courseId = getUrlPram('courseId');
function  begin_playing(){
    $.ajax({
        url:"test.guoxue360.cn/sales/progress/start" + '?id=' + this.courseId,
        type:"get",
        success:function(e){
                  //0错误 1正确
                  if(e==0){
                    alert('系统错误，请重试');
                }else if(e==1){
                    window.location.href="";
                }
            }
        })
}

setTimeout(()=>{
    var i = 1;
    var myVid=document.getElementById("media");
    myVid.addEventListener("timeupdate",timeupdate);
    var all_time = parseInt(myVid.duration);
    var need_time = parseInt(all_time*0.2);
    console.log(need_time);
    video.addEventListener("timeupdate",timeupdate);
    function timeupdate(){
//因为当前的格式是带毫秒的float类型的如：12.231233，所以把他转成String了便于后面分割取秒
      var time = myVid.currentTime+"";
      var times = parseInt(time);
      console.log(times);
      if(times==need_time){
         myVid.pause();
         $.ajax({
            type:'get',
            data:{},
            dataType:'json',
            url:'https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/problems',
            success:function(data){
              i = i+1;
              console.log(i);
            }
         })
}
}
},800);