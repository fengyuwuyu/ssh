/*声明命名空间*/
$package('YiYa');

/*封装变量（利用JSONP）*/
var YiYa={
			port:7,
			//JSON方法一
			isJson:function(str){
				var obj = null; 
				try{
					obj = YiYa.paserJson(str);
				}catch(e){
					return false;
				}
				var result = typeof(obj) == 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length; 
				return result;
			},
			
			//JSON方法二
			paserJson:function(str){
				return eval('('+str+')');
			},
			fixHeight:function(percent){    
				if(percent == null){ 
					percent = 0.8;
				}
			    return (document.body.clientHeight) * percent ;      
			},
			fixWidth:function(percent){  
				if(percent == null){ 
					percent = 1;
				}
			    return (document.body.clientWidth - 20) * percent ;   
//				return (document.body.clientWidth) * percent ;     
			},
			//显示时间
			showTime:function(){
				var today = new Date();  
				var year = today.getFullYear();   
				var month = today.getMonth()+1; 
				var monthDay = today.getDate();
				var weekDay;   
				var hour = today.getHours();  
				var minute =today.getMinutes();   
				var second = today.getSeconds();		
				var day = today.getDay();   
				switch (day){   
					case 0:{
						weekDay = '星期日';
						break; 
					}
					case 1:{   
							weekDay = '星期一';
							break;   
					}
					case 2:{   
							weekDay ='星期二';
							break;   
					}
					case 3:{   
							weekDay = '星期三';
							break;   
					}
					case 4:{   
							weekDay = '星期四' ;
							break;   
					}
					case 5:{   
							weekDay = '星期五';
							break;   
					}
					case 6:{   
							weekDay = '星期六';
							break;   
					}
					case 7:{   
							weekDay = '星期日';
							break;   
					}
				}   
				if(month<10) month='0'+month;   
				if(monthDay<10) monthDay='0'+monthDay;   
				if(hour<10) hour='0'+hour;   
				if(minute<10) minute='0'+minute;   
				if(second<10) second='0'+second;  
			
				return year + '年' + month + '月' + monthDay + '日 ' + weekDay +' ' + hour + ':' + minute + ':' + second;     
			},
			show:function(msg,timeout,closable){
				$.messager.show({
					title:'提示消息',
					msg:msg,
					timeout:timeout,
					showType:'slide',
					closable:closable
				});
			},
			//提示弹出框
			alert:function(title, msg, icon, callback){
				$.messager.alert(title,msg,icon||'info',callback);
			},
			//询问弹出框
			confirm:function(title, msg,callback){
				$.messager.confirm(title,msg,callback);
			},
			//进度弹出框
			progress:function(text){
				 $.messager.progress({  
		            title: '进度信息',  
		            text: text  
		         }); 
			},//关闭show弹出框
			closeShow:function(){
				$(".messager-body").window('close');
			},
			//关闭进度弹出框
			closeProgress:function(){
				$.messager.progress('close');
			},
			//关闭进度弹出框
			prompt:function(title, msg, callback){
				$.messager.prompt(title, msg, function(r){
					if (r){
						if($.isFunction(callback)){
				 			callback(r);
				 		}
					}
				});
			},
			readCard:function(port,clsname,callback){
				var object = document.getElementById("object");					
				var html = $('.' + clsname).html();
				var r = object.setReader("&HF0");//初始化卡头 
				if(r >= 0){
					var port = 'COM' + YiYa.port + ',115200';
					r = object.OpenCom(port);//打开串口
					if(r >= 0){
						var physicsCard = object.ReqCard();//读卡号
						r = object.getErrCode();//返回错误码
						object.CloseCom();//关闭串口
						if(r >= 0){
					 		if($.isFunction(callback)){
					 			callback(physicsCard);
					 		}
						}else{
							$('.' + clsname).html(html + '<br/>读卡失败。'+r);
							YiYa.alert("消息", "读卡失败，请确保读卡器已连接，cpu卡已正确放置。", 'info');
						}						
					}else{
						$('.' + clsname).html(html + '<br/>串口打开失败,请检查是否已连接读卡器');
						YiYa.alert("消息", "串口打开失败,请检查是否已连接读卡器。", 'info');
					}
				}else{				
					$('.' + clsname).html(html + '<br/>不支持此卡片。');
					YiYa.alert("消息", "不支持此卡片。", 'info');
				}
			},
			//重新登录
			toLogin:function(){
				window.top.location= urls['msUrl']+'login.jsp';
			},
			checkLogin:function(data){
				//if(data.logoutFlag){//检查是否登录超时
				//	YiYa.alert('提示','登录超时,点击确定重新登录。','error',YiYa.toLogin);
				//	return false;
				//}
				return true;
			},
			ajaxSubmit:function(form,option){
				form.ajaxSubmit(option);
			},
			//AJAX提交JSON
			ajaxJson: function(url,option,callback){
				$.ajax(url,{
						type:'post',
					 	dataType:'json',
					 	data:option,			 	
					 	complete:function(data){
					 		
					 	},
					 	error:function(response, textStatus, errorThrown){
					 		try{
					 			YiYa.closeProgress();
					 			var data = $.parseJSON(response.responseText);
						 		//检查登录
						 		if(!YiYa.checkLogin(data)){
						 			return false;
						 		}else{
							 		YiYa.alert('错误信息','请求出现异常,请联系管理员。','error');
							 	}
					 		}catch(e){
					 			YiYa.alert('错误信息','请求出现异常,请联系管理员。','error');
					 		}
					 	},
					 	success:function(data){
					 		YiYa.closeProgress();
					 		if(!YiYa.checkLogin(data)){
					 			return false;
					 		}		
					 		//坚持登录
					 		if($.isFunction(callback)){
					 			callback(data);
					 		}
					 		if(data&&data.msg){
					 			YiYa.alert("消息", data.msg, "info");
					 		}
					 	}
				});
			},
			//AJAX提交表单
			submitForm:function(form,callback,dataType){
				var option = {
					 			type:'post',
					 			dataType: dataType||'json',
								complete:function(){
									YiYa.closeProgress();
								},
					 			error:function(response, textStatus, errorThrown){
				 					try{
				 						YiYa.closeProgress();
				 						 var sessionstatus=response.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
				 				          if(sessionstatus=="timeout"){ 
				 				              YiYa.confirm('消息',"登录超时,请重新登录！",function(r){
					 				              //如果超时就处理 ，指定要跳转的页面  
					 				              window.location.replace(urls['msUrl'] + "login.jsp");  
				 				              });
				 				              return false;
				 				          } 
				 						var data = $.parseJSON(response.responseText);
									 	if(!YiYa.checkLogin(data)){
									 		return false;
									 	}else{
										 	YiYa.alert('错误信息','请求出现异常,请联系管理员。','error');
										}
							 		}catch(e){
							 			YiYa.alert('错误信息','请求出现异常,请联系管理员。','error');
							 		}
								 },
								 success:function(data){
									YiYa.closeProgress();
					 				if($.isFunction(callback)){
					 					callback(data);
					 				}
					 				if(data&&data.msg){
				 						YiYa.alert('消息',data.msg,'info');
				 					}
					 			 }
				}
				YiYa.ajaxSubmit(form,option);
			},
			//添加、修改 保存
			save:function(form,callback){
				if(form.form('validate')){
					YiYa.progress('请求中...');
					//AJAX提交form
					YiYa.submitForm(form,function(data){
					 	if(data.success){
					 		if(callback){
						       	callback(data);
						    }
				        }
					 	if(data.check){
					 		if(callback){
						       	callback(data);
						    }
				        }
					});
				 }
			},
			//查询
			getById:function(url,option,callback){
				YiYa.progress('请求中...');
				YiYa.ajaxJson(url,option,function(data){
					if(data.success){
						if(callback){
					       	callback(data);
					    }
					}
				});
			},
			//删除
			remove:function(url,option,callback){
				YiYa.progress('请求中...');
				YiYa.ajaxJson(url,option,function(data){
						YiYa.closeProgress();
						if(data.success){
							if(callback){
						       	callback(data);
						    }
						}
				});
			},
			filterNull:function(config){
				var result = {};
				for(var attr in config){
					var value = config[attr];
					if(attr=='userType'){
						result[attr] = value;
					}
					if(value!=null&&value!=""){
						if(value instanceof Array){
							value=value.join(",");
						}
						result[attr] = value;
					}
				}
				return result;
			},
			//判断是否需要服务器主动推送同步数据提示框
			needServerNotify : function(){
				var needServerNotify = $('#needServerNotify').val();
				if(needServerNotify&&needServerNotify==1){
					return true;
				}
				return false;
			},
			//ele是jquery的radio元素
			radioCheck : function(ele,check){
				ele.prop("checked",check);
			},
			isNull : function(str){
				if(str==null||str.trim()==''){
					return true;
				}
				return false;
			}
};

/*自定义密码验证*/
$.extend($.fn.validatebox.defaults.rules, {  
    equals: {  
        validator: function(value,param){  
            return value == $(param[0]).val();  
        },  
        message: 'Field do not match.'  
    }  
}); 

/*自定义密码验证*/
$.extend($.fn.validatebox.defaults.rules, {
    comboxRequired: {
        validator: function(value, param){
            return value != param[0];
        },
        message: '必须选择一个'
    }
});

/*自定义组合框按索引赋值*/
$.extend($.fn.combobox.methods, {
    selectedIndex: function (jq, index) { 	
    	var data = $(jq).combobox('getData');
    	var vf = $(jq).combobox('options').valueField;
    	var va = data[0][vf];
    	$(jq).combobox('setValue', va);
    }
});

/*自定义表单转成JSON数据*/
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

/*自定义数据表格添加和删除按钮*/
$.extend($.fn.datagrid.methods, {  
    addToolbarItem: function(jq, items){  
        return jq.each(function(){  
            var toolbar = $(this).parent().prev('div.datagrid-toolbar');
            for(var i = 0;i<items.length;i++){
                var item = items[i];
                if(item === '-'){
                    toolbar.append('<div class=\'datagrid-btn-separator\'></div>');
                }else{
                    var btn=$('<a href=\'javascript:void(0)\'></a>');
                    btn[0].onclick=eval(item.handler||function(){});
                    btn.css('float','left').appendTo(toolbar).linkbutton($.extend({},item,{plain:true}));
                }
            }
            toolbar = null;
        });  
    },
    removeToolbarItem: function(jq, param){  
        return jq.each(function(){  
            var btns = $(this).parent().prev('div.datagrid-toolbar').children('a');
            var cbtn = null;
            if(typeof param == 'number'){
                cbtn = btns.eq(param);
            }else if(typeof param == 'string'){
                var text = null;
                btns.each(function(){
                    text = $(this).data().linkbutton.options.text;
                    if(text == param){
                        cbtn = $(this);
                        text = null;
                        return;
                    }
                });
            } 
            if(cbtn){
                var prev = cbtn.prev()[0];
                var next = cbtn.next()[0];
                if(prev && next && prev.nodeName == 'DIV' && prev.nodeName == next.nodeName){
                    $(prev).remove();
                }else if(next && next.nodeName == 'DIV'){
                    $(next).remove();
                }else if(prev && prev.nodeName == 'DIV'){
                    $(prev).remove();
                }
                cbtn.remove();    
                cbtn= null;
            }                        
        });  
    }                 
});