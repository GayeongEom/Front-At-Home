/**
 * 
 */a// css 변경 jquery start
$(document).on('click', '#admRegBtn',function(){
   $('.reqRegModal').css('display', 'block');
});

$(document).on('click', '.btn-close',function(){
   $('.reqRegModal').css('display', 'none');
});

$(document).on('keyup', '#reqID',function(){
   var $regIdLen = $('#reqID').val().length;
   var $btnVal = "";
   
   if($regIdLen > 0)
      $btnVal = "1rem";
   $('#chkDupID').css('margin-bottom', $btnVal);
});

$(document).on('change','.form-select', function(){
   $selectVal = $('.form-select').val();
   $topVal = '';
   $bottomVal = '';
   $btnVal = '';
   
   if($selectVal !== '선택')
      $topVal = '1.625rem', $bottomVal = '0.625rem', $btnVal = '1rem';
   
   $('#reqSendMail').css('margin-bottom', $btnVal);
   $('.form-select').css('padding-top', $topVal).css('padding-bottom',$bottomVal);
});
// css 변경 jquery end

// 아이디 중복 확인
$(document).on('click', '#chkDupID',function(){
   
   if($(this).val() == '중복확인'){
      var reqID =$('#reqID').val();
      var $data = {"reqID" : reqID};
      var regResult = fn_reg("id",$('#reqID').val());

      if(regResult.regResult == false) {
         create_msg('알림', regResult.msg, '$("#reqID").focus();');
      } else {
         $('#regID').val(reqID);
         $('#reqID').attr('disabled', true);
         var $result = fn_ajax("post", "/TNFADM/dupChkID.do", $data);
         fn_msg($result);
      }
   } else {
      $('#reqID').val('');
      $('#reqID').removeAttr('disabled');
      $(this).val('중복확인');
      $(this).removeAttr('chk');
      $('#chkDupID').css('margin-bottom', 0);
   }
});

// 이메일 중복확인 및 이메일 인증
$(document).on('click', '#reqSendMail',function(){
   var data = {"email1" : $('#regEmail1').val(), "email2" : $('#regEmail2').val()};
   var concatStr = fn_concat("email", data);
   var emailReg = fn_reg("email", concatStr);
   if(emailReg.regResult == false ){
      create_msg('알림', emailReg.msg, '$("#regEmail1").focus();');
   } else {
      $('#inputKey').val('');
      $('#emailAddr').val(concatStr);
      $('#regEmail1, #regEmail2, #reqSendMail').attr('disabled', true);
      var $data = {"regEmail" : concatStr};
      var $result = fn_ajax("post", "/TNFADM/dupChkEmail.do", $data);
      fn_msg($result);
   }
});

// 이메일 인증 확인
$(document).on('click', '#reqChkEmail',function(){
   $('#inputKey').attr('disabled', true);
   var $data = {"emailAddr" : $('#emailAddr').val(), "emailCertkey" : $('#emailCertkey').val(), "inputKey" : $('#inputKey').val()};
   $('#inputCertkey').val($data.inputKey);
   $('#reqChkEmail').attr('disabled', true);
   var $result = fn_ajax("post", "/TNFADM/chkCertKey.do", $data);
   fn_msg($result);
});

// 관리자 등록 요청
$(document).on("click","#reqAdmRegBtn",function(){
   if(fn_validation()){ 
      var $data = $('#reqAdmReg').serialize();
      var $result = fn_ajax("post", "/TNFADM/join.do", $data);
      fn_msg($result);
   } 
});

$(document).ready(function() {
   $('#admLogin').submit(function(){
      var idReg = fn_reg("id", $('#reqLoginId').val());
      if(idReg.regResult == false){ 
         create_msg('알림', '아이디를 올바르게 입력해 주시기 바랍니다.', '$("#reqLoginId").focus();');
         return false;
      }
   });
});

// 관리자 등록 폼 유효성 검증
function fn_validation(){
   // 아이디 중복 확인 검사 여부 확인
   if($('#chkDupID').attr('chk') != 1 ) {
      create_msg('알림', '아이디 중복 확인을 진행 해 주시기 바랍니다.', '$("#reqID").focus();');
      return false;
   }

   // 비밀번호 유효성 검사
   var pwdReg = fn_reg("pwd", $('#regPwd').val());
   if(pwdReg.regResult == false) {
      create_msg('알림', pwdReg.msg, '$("#regPwd").focus();');
      return false;
   }
   
   // 비밀번호, 비밀번호 확인이 동일한지 검사
   var sameResult = fn_same($("#regPwd").val(), $("#regRePwd").val());
   if(sameResult == false) {
      create_msg('알림', '비밀번호와 비밀번호 확인이 일치 하지 않습니다. 확인하여 주세요.', '$("#regRePwd").focus();');
      return false;
   }
   
   // 이름 유효성 검사
   var nmReg = fn_reg("name", $('#regNm').val());
   if(nmReg.regResult == false) {
      create_msg('알림', nmReg.msg, '$("#name").focus();');
      return false;
   }
   
   // 핸드폰 번호 유효성 검사
   var data = {"phone1" : $('#regPhone1').val(), "phone2" : $('#regPhone2').val(), "phone3" : $('#regPhone3').val()};
   var concatStr = fn_concat("phone", data);
   var phoneReg = fn_reg("phone", concatStr);
   if(phoneReg.regResult == false ){
      create_msg('알림', phoneReg.msg, '$("#regPhone1").focus();');
      return false;
   } else {
      $('#phoneAddr').val(concatStr);
   }
   
   // 이메일 인증 검사 확인
   if($('#reqChkEmail').attr('chk') != 1 ) {
      create_msg('알림', '이메일 인증을 진행하여 주시기 바랍니다.', '$("#regEmail1").focus();');
      return false;
   }
   
   // validation check 값이 모두 참일때 true 반환
   return true;
}