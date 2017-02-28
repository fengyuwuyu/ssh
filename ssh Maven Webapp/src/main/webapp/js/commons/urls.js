/*封装变量（利用JSONP）*/
var urls= {
	'msUrl':'http://localhost:8080/Card/'
//		'msUrl':'http://192.168.0.112/Card/'
};

$.ajaxSetup({   
    contentType:"application/x-www-form-urlencoded;charset=utf-8",   
    complete:function(XMLHttpRequest,textStatus){ 
      var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
          if(sessionstatus=="timeout"){ 
        	  YiYa.confirm('消息',"登录超时,请重新登录！",function(r){
		          //如果超时就处理 ，指定要跳转的页面  
		          window.location.replace(urls['msUrl'] + "login.jsp");  
	          });
	          return false; 
          } 
       }
  });
