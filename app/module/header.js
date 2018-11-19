define(["jquery","cookie"],function($,cookie){
	function Header(){
	}
	Header.prototype.init = function(){
		$(".wrap").find("li").hover(function(){
			var _left = $(".wrap").offset().left;
			var left = $(this).offset().left + $(this).width()/2 -7 + 14 -_left;
			//console.log($(this).offset().left);
			$(".wrap").css("backgroundPositionX",left);
			$(this).find("p").css({"display":"block"});
		},function(){
			$(".wrap").css("backgroundPositionX",-14);
			$(this).find("p").css({"display":"none"});
		});
		
		
		$("#hchina").click(function(){
			console.log($("#hchina").offset().left);
			$("#hcountry").css({
			
			"left": $("#hchina").offset().left - $("#hcountry").width()/2,
			"top": $("#hchina").offset().top + $("#hchina").height()
				})
			$("#hcountry").toggle();
		});
		
		
		$(document).scroll(function(){
			//console.log($(this).scrollTop());
			if($(this).scrollTop() > 70){
				$(".nav").css({
					"position":"fixed",
					"top":"0px",
					"z-index":"9999",
					"background":"#ffffff",
					"left":"0",
					"width":"100%",
					"padding-left":"110px",
					"border-bottom":"1px solid #919191",
					"height":"60px"
				})
				$(".logo").css({
					"background-size":"auto 28px ",
					"background-position-x":"0px",
					"background-position-y":"28px",
					
				})
				$(".wrap").css({
					"margin-top":"35px"
				})
				$(".wrap p").css({
					"margin-top":"12px"
				})
			}else{
				$(".nav").css({
					"position":"absolute",
					"top":"67px",
					"height":"75px",
					"width":"1040px",
					
				})
				$(".logo").css({
					"background-size":"156px auto",
					"background-position":"center"
					
					
				})
				$(".wrap").css({
					"margin-top":"52px"
				})
			}
			
		})
		
		var _cookie = $.cookie("userName");
		
		if(_cookie){
			$("#hlogin").css({
				"display":"none"
			});
			$("#hreginster").css({
				"display":"none"
			});
			
			$("#outlogin").css({
				"display":"block"
			});
			$("#showuser").css({
				"display":"block"
			});
			
			$("#outlogin").html("退出登录");
			$("#showuser").html(_cookie);
		}
		
		$("#outlogin").click(function(){
			$("#outlogin").css({
				"display":"none"
			});
			$("#showuser").css({
				"display":"none"
			});
			$("#hlogin").css({
				"display":"block"
			});
			$("#hreginster").css({
				"display":"block"
			});
			
			 location.reload();
			
			$.cookie("userName","",
				{expires:-1}
			)
			
		})
	}
	return new Header();
});
