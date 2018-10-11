var vue = new Vue({
    el : 'body',//vue的作用范1围，一般body就行
    data : {//页面的数据
        courseList : [],//课程数据  
        courseList2:[], 
    },
    ready: function() {//不能写到其他三个地方的都写里面
        // 初始化数据
        this.getData();
        this.getData2();
    },
    methods : {//页面的方法
        getData : function() {
            var oThis = this;
            $.ajax({
                type : 'get',
                url: "https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/activity",
                dataType: 'json',
                success : function(data) {
                        console.log(data);
                        oThis.courseList= data;
                    
                }
            });
        },
        getData2:function(){
            var oThis = this;
            $.ajax({
                type : 'get',
                url: "https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/next",
                dataType: 'json',
                success : function(data) {
                        console.log(data);
                        oThis.courseList2= data;
                    
                }
            });
        },
        checkList1:function(){
           
        },
        checkList2:function(){
           
        },
         vote:function(){
            var oThis = this;
            var checks=$('input[name="check"]:checked');
            var ids = [];
            $("input[name='check']:checked").each(function(){
             var id=$(this).next().attr('cid');
             ids.push(id);
         })
            if(checks.length==0){
                swal('请选择课程提交');
                return false;
            }
            $.ajax({
                traditional:true,
                url:'data1.json',
                type:"post",
                data:{'id':ids},
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
        vote2:function(){
            var oThis = this;
            var checkss=$('input[name="checks"]:checked');
            var ids = [];
            $("input[name='checks']:checked").each(function(){
             var id=$(this).next().attr('cid');
             ids.push(id);
         })
            if(checkss.length==0){
                swal('请选择课程提交');
                return false;
            }
            $.ajax({
                traditional:true,
                url:'data1.json',
                type:"post",
                data:{'id':ids},
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

    }
});