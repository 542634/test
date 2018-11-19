require(["config"],function(){
	require(["jquery","header","footer","template"],function($,header,footer,template){
		$("header").load("/html/component/header.html",function(){
			header.init();
		});
		
		$("footer").load("/html/component/footer.html",function(){
			footer.init();
		});
		

		var cart = $.cookie("cart");
		//console.log(cart);
		if(cart  == null ){
			
			$(".cart-empty").css({
				"display":"block",
				
			})
			$(".steps").css({
				"display":"none",
				
			})
			$(".cart-container").css({
				"display":"none",
			})
			$(".youlike").css({
				"display":"block",
			})
		}else{
			var res = JSON.parse(cart);
			
			
		 	var html = template("html-script",{products:res})
		 	
		 	$("#html-template").html(html);
		}
		
		//全选和反选
			var len = $(".checked").length;
			var sum = 0;
			$(".allchecked").click(function(){
				if($(".allchecked").prop("checked")){
					sum = 2;
					$(".checked").prop("checked",true);
					
				}else{
					sum = 0;
					$(".checked").prop("checked",false);
				}
				
			})
			
				$(".checked").click(function(){
					
					if($(this).prop("checked")){
						sum++;
					}else{
						sum--;
					}
					if(sum == len){
						$(".allchecked").prop("checked",true);
					}
					if(sum < len){
						
						$(".allchecked").prop("checked",false);
						
					}
				})
				//数量按钮的加减
				//console.log(res);
				$(".down").click(function(){
				var val = $(this).next().val();
					val--;
					if(val < 1){
					alert("该宝贝不能再少了哟 ！亲");
					val = 1;
					}
					$(this).next().val(val);
					
					for(var i = 0; i < res.length; i++){
						if($(this).parent().parent().attr("data-id") == res[i].id){
							res[i].num = val;
						$(this).parent().parent().find("#allprice em").html(res[i].num*res[i].price + ".00");
						var allNum = 0;
						var num = 0;
		 				for( var i = 0;i < res.length;i++){
			
		 					num = res[i].price * res[i].num;
		 					allNum = allNum +num;
						}
						$("#products-price").html("￥"+ allNum + ".00");
						$("#allProduct-price").html("￥"+ allNum + ".00");
							
						}
					}
					
					var str = JSON.stringify(res);
					$.cookie("cart",str,{
								path:"/",
								expires:7
						});
					
					
				})
				
				$(".up").click(function(){
				var val = $(this).prev().val();
					val++;
					$(this).prev().val(val); 
					
					for(var i = 0; i < res.length; i++){
					var _id = $(this).parent().parent().attr("data-id");
						if(_id == res[i].id){
							res[i].num = val;
						//console.log(res);
						//console.log(res[i]);
						$(this).parent().parent().find("#allprice em").html(res[i].num*res[i].price + ".00");
						var allNum = 0;
						var num = 0;
					 for( var i = 0;i < res.length;i++){
						
					 	num = res[i].price * res[i].num;
					 	allNum = allNum +num;
					 }
					$("#products-price").html("￥"+ allNum + ".00");
					$("#allProduct-price").html("￥"+ allNum + ".00");
						}
					}
					
					var str = JSON.stringify(res);
					$.cookie("cart",str,{
								path:"/",
								expires:7
						});
					
				})
				
				
		
			
		//var product_price =$("#html-template dd p:nth-child(6) ");
		//console.log(product_price.text());
		 //var allnum = product_price.text().slice(1);
			//console.log(res);
			var allNum = 0;
			var num = 0;
		 for( var i = 0;i < res.length;i++){
			
		 	num = res[i].price * res[i].num;
		 	allNum = allNum +num;
		 }
		$("#products-price").html("￥"+ allNum + ".00");
		$("#allProduct-price").html("￥"+ allNum + ".00");
		
		
		//点击移除商品 删除json里的数据 重新存cookie
		$(".remove").click(function(){
			if(confirm("你确定要移除该商品吗？亲")){
				$(this).parent().parent().remove();
			}
			
			for(var i = 0; i < res.length; i++){
				
					var _id = $(this).parent().parent().attr("data-id");
						if(_id == res[i].id){
							
							res.splice(i,1);//开始位置,删除个数
							
						}
					}
			
			var allNum = 0;
			var num = 0;
		 for( var i = 0;i < res.length;i++){
			
		 	num = res[i].price * res[i].num;
		 	allNum = allNum +num;
		 }
		$("#products-price").html("￥"+ allNum + ".00");
		$("#allProduct-price").html("￥"+ allNum + ".00");
			
			var str = JSON.stringify(res);
					$.cookie("cart",str,{
								path:"/",
								expires:7
					});
		})
		
		//点击编辑
		$(".edit").click(function(){
			$(this).parent().find(this).hide();
			$(this).parent().find(".size").hide();
			$(this).parent().find(".color").hide();
			$(this).parent().find(".isize").show().val($(".size").html());
			$(this).parent().find(".icolor").show().val($(".color").html());
			$(this).parent().find(".okBtn").show();
			$(this).parent().find(".cancel").show();
		})
		//点击确定
		$(".okBtn").click(function(){
			$(this).parent().find(this).hide();
			$(this).parent().find(".isize").hide();
			$(this).parent().find(".icolor").hide();
			$(this).parent().find(".size").show().html($(".isize").val());
			$(this).parent().find(".color").show().html($(".icolor").val());
			$(this).parent().find(".edit").show();
			$(this).parent().find(".cancel").hide();
		})
		//点击取消
		$(".cancel").click(function(){
			$(this).hide();
			$(this).parent().find(".isize").hide();
			$(this).parent().find(".icolor").hide();
			$(this).parent().find(".size").show();
			$(this).parent().find(".color").show();
			$(this).parent().find(".edit").show();
			$(this).parent().find(".okBtn").hide();
		})
	})
})