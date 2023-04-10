// ajax 함수 
function fn_ajax(type, url, data){
   var ajaxResult;
   $.ajax({
      type : type,
      url : url, 
      data : data,
      async : false,
      success : function(data){
               ajaxResult = data;
            }
   });
   return ajaxResult;
}

// msg option array 생성 함수
function create_msg(title, content, func){
   $('.msgForm').css('display','block');
   $('.msgTitle').html(title);
   $('.msgContent').html(content);
   $('#msgOk').attr('onclick', "$('.msgForm').css('display','none'); " + func);
}

// msg 생성 함수
// html에 msg가 있을때 해당 msg객체를 컨트롤.  
function fn_msg(data){
   $('.msgForm').css('display','block');
   $('.msgTitle').html(data.title);
   $('.msgContent').html(data.content);
   $('#msgOk').attr('onclick', "$('.msgForm').css('display','none'); " + data.func);
} 

// 정규표현식 함수
function fn_reg(type, data){
   var reg;
   var msg;
   var regResult = false;
   switch(type){
      case "id" :
         reg = /[a-zA-Z0-9]{5,19}$/g;
         msg = "아이디는 영문 숫자를 포함하여 <br>6자 이상 20자 미만이 되어야 합니다.";
         break;
      case "pwd" :
         reg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
         msg = "비밀번호는 영문, 숫자, 특수문자가 1자 이상<br> 총 8자 이상이 16마만 이여야 합니다.";
         break;
      case "email" :
         reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
         msg = "이메일을 확인 해 주세요.";
         break;
      case "phone" :
         reg = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
         msg = "핸드폰 번호를 확인 해 주세요.";
         break;
      case "name" :
         data = fn_replace(data);
         reg = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,}/;
         msg = "이름을 올바르게 입력해 주세요.";
   }
   regResult = reg.test(data);
   if(regResult == true){
      msg = "";
   }
   
   resultMap = {regResult : regResult, msg : msg}
   return resultMap;
}

// 전달받은 obj가 비어있는지 확인하는 함수
function fn_blank(data){
   
   var result = false;
   var trimObj = fn_replace(data);
   
   if(trimObj.length > 0){
      result = true;
   }
   
   return result;
}

// 공백제거 함수
function fn_replace(obj){
   var resultObj = obj.trim();
   return resultObj;   
}

// 두개의 값이 같은지 확인하는 함수
function fn_same(data1, data2){
   return data1 == data2 ? true : false;
}

// data의 type에 따라 문자열을 이어주는 함수.
function fn_concat(type, data){
   var concatStr = "";
   switch(type){
      case "phone" :
         concatStr = data.phone1 + "-" + data.phone2 + "-" + data.phone2;
         break;  
      case "email" :
         concatStr = data.email1 + "@" + data.email2;
         break;
   }
   
   return concatStr;
}