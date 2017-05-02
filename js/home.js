// JavaScript Document


function through(obj){
	function a2d(n){
		return 	n*180/Math.PI;
	}
	//判断鼠标从哪个边移入
	function hoverDir(obj,ev){
		var sCt=document.documentElement.scrollTop||document.body.scrollTop;
		var x = obj.offsetLeft+obj.offsetWidth/2 - ev.clientX;
		var y = obj.offsetTop+obj.offsetHeight/2 - ev.clientY-sCt;
		return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
	}
	obj.onmouseover = function(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[0];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				oS.style.left = '300px';
				oS.style.top = 0;
			break;
			case 1:
				oS.style.top = '400px';
				oS.style.left = 0;
			break;
			case 2:
				oS.style.left = '-300px';
				oS.style.top = 0;
			break;
			case 3:
				oS.style.top = '-400px';
				oS.style.left = 0;
			break;
		}
		move(oS,{left:0,top:0});
	};
	
	obj.onmouseout = function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo)){
			return;
		}
		var dir = hoverDir(obj,oEvent);
		var oS = obj.children[0];
		//左边 2 右侧0 上边3  下边1
		switch(dir){
			case 0:
				move(oS,{left:300,top:0});
			break;
			case 1:
				move(oS,{left:0,top:400});
			break;
			case 2:
				move(oS,{left:-300,top:0});
			break;
			case 3:
				move(oS,{left:0,top:-400});
			break;
		}
	};
}
function cross(){
	var oUl = document.getElementById('cross');	
	var aLi = oUl.children;
	for(var i = 0;i<aLi.length;i++){
		through(aLi[i]);
	}
}
function maodian(id){ //传锚点的id，就会慢慢滑下
	$(id).click(function(){
		$('html,body').animate({
			scrollTop:$($(this).attr('href')).offset().top-100 //有吸顶条的需要减100左右没有可以不减。
		},{
			duration:500,
			easing:'swing'	
		});
		return false;
	});
};
$(document).ready(function() {
    cross();
	maodian('#topinpai');
	maodian('#tofenxi');
	maodian('#toworks');
	maodian('#toproposal');
	maodian('#toaddress');
	(function(){
		$("#works li").click(function(){
			$('#works .works_msg').eq($(this).index()).show();
			$('body').css('overflowY','hidden')
		});
		$("#works li .work_close_btn_1").click(function(){
			event.stopPropagation();
			$(this).parent().hide();
			$('body').css('overflowY','auto')
		});
		$("#works li .work_close_btn_2").click(function(){
			event.stopPropagation();
			$(this).parent().hide();
			$('body').css('overflowY','auto')
		});
		
	})()
	
});
