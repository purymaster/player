	
	//변수 관리
	var is_modal = false; //모달 활성화 여부

	//팝업 열기
	function open_popup(url){
		var popup_url = url;
		var popup_opt = "width=760, height=850, resizable=no, scrollbars=auto, status=no;"; //추후 저해상도 사용자에 대한 대책 필요
		window.open(popup_url,"",popup_opt);
	};
	
	//모달 띄우기
	function modal_show(){
		is_modal = true;
		$('body').append("<div class='deemed'></div>");
		$('html').css('overflow-y','hidden');
		$('.layer').scrollTop(0);
	};
	
	//모달 닫기
	function modal_hide(){
		is_modal = false;
		$('.deemed').remove();
		$('html').css('overflow-y','visible');
		$('.layer').scrollTop(0).hide();
	};

$(function(){

	//dotdotdot플러그인
	$('.ellipsis').dotdotdot({
		watch:true
	});

	//스킵 네비게이션
	$('.skip a').click(function(){
		$('#content').attr('tabindex', '0').focus();
		return false;
	});
	
	//셀렉트박스 커스터마이징
	var select_box = $(".select_box select");
    select_box.on('mouseover focus', function(){
		$(this).parent('.select_box').addClass('on');
	}).on('mouseout focusout', function(){
		$(this).parent('.select_box').removeClass('on');
	}).change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });
	
	//파일업로드 커스터마이징
	var file_target = $('.upload input[type=file]');
  	file_target.on('change', function(){
		if(window.FileReader){
		  var filename = $(this)[0].files[0].name;
		} else {
		  var filename = $(this).val().split('/').pop().split('\\').pop();
		};
		$(this).siblings('.upload_name').val(filename);
  	});
	
	//네비게이션 제어
	$('nav dt:eq(0)').addClass('on');
	$('nav dt a,nav dd > ul > li > a').on('focus',function(){
		$('nav dd > ul > li').removeClass('on');
		$(this).parent().addClass('on').siblings().removeClass('on');
	});
	$('nav').on('clickoutside focusoutside',function(){
		$('nav li').removeClass('on');
	});
	
	//컨텐츠 GNB제어
	//$('.content_nav > ul:eq(0)').addClass('on');
	$('.content_nav > a').on('focus click',function(){
		$(this).next('ul').addClass('on').siblings().removeClass('on');
	});
	$('.content_nav').on('focusoutside clickoutside',function(){
		$(this).children('ul').removeClass('on');
	});
	$('.content_nav > ul > li > a').on('click',function(){
		$(this).parent('li').parent('ul').addClass('on');
	});
	
	//리스트 사이즈뷰
	$('.product_list > li .info .size button').on('focus mouseover',function(){
		$(this).next('ul').show();
	}).on('blur mouseout',function(){
		$(this).next('ul').hide();
	});
	
	//포토상품평 제어
	$('.photo_review dt a').on('click',function(){
		if($(this).parent().hasClass('on')){
			$('.photo_review dt').removeClass('on');	
		} else {
			$('.photo_review dt').removeClass('on');
			$(this).parent().addClass('on');	
		};
	}).on('blur',function(){
		$('.photo_review dt').removeClass('on');
	});
	
	//푸터 어워드 슬라이더
	var footer_slider = $('.award .bxslider').bxSlider({ 
		pager:false,
		controls:true,
		prevText:'이전수상내역',
		nextText:'다음수상내역',
		slideWidth:100,
		minSlides:13,
		maxSlides:13,
		moveSlides:13
	});

	// 팝업 높이제어
	if($('.tb_popup01 div table tbody').height() >= 399){
		$('.tb_popup01').addClass('on');
	};
	
	// 팝업 쿠폰 제어
	/*
	if($('.cp_layer div').height() >= 185){
		$(this).parent().addClass('on');
	};
	*/

	// 팝업 쿠폰선택
	$('div.cp_list').hide();
	$('div.cp_list .tb_popup01').removeClass('on');
	//.on('click focusin', function(){
	$('.select_cp button.cp_select').on('focus',function(){
		$('.select_cp').removeClass('on');
		$('div.cp_list').hide();
		$(this).parent().addClass('on');
		$(this).next('.cp_list').show();
		if($(this).next('.cp_list').find('.cp_layer tbody').height() >= 185){
			$(this).next('.cp_list').find('.cp_layer').addClass('on');
		};
		/*
		if($(this).next('.cp_list').css('display')=='none'){
			$('.select_cp').removeClass('on');
			$('div.cp_list').hide();
			$(this).parent().addClass('on');
			$(this).next('.cp_list').show();
		}else if($(this).next('.cp_list').css('display')=='block'){
			$('div.cp_list').hide();
			$(this).parent().removeClass('on');
		};
		*/
	});
	
	// 팝업 내 포커스 조절
	$('.tb_popup01').on('clickoutside focusoutside',function(){
		$(this).find('.cp_list').hide();
		$(this).find('.select_cp').removeClass('on');
	});

	// 팝업 내 닫기 버튼
	$('div.cp_list .tb_btn.white, .cp_layer_close a.btn_close').click(function(){
		$(this).parent().parent().hide();
		$('.select_cp').removeClass('on');
	});
	
	$('.my_coupon').hide();
	$('.coupon_info > a.tb_btn').click(function(){
		$('.my_coupon').show();
	});

	// 로그인(회원/비회원) 화면 제어
	$('.join_page .login_area dl dd').hide();
	$('.non_member_buy').hide();
	$('.join_page .login_area dl dt.on').next('dd').show();

	$('.join_page .login_area dl dt a').on('click focusin', function(){
		$(this).parent().addClass('on').siblings().removeClass('on').next('dd').hide();
		
		$(this).each(function(){
			if($(this).parent().hasClass('on')){
				$(this).parent().next('dd').css({'display':'block'});
				nonLogin();
			}else{
				$(this).parent().next('dd').css({'display':'none'});
			}
		});

		function nonLogin(){
			if($('.join_page .login_form dl dt.non').hasClass('on')){
				$('.non_member_buy').css({'display':'block'});
			}else{
				$('.non_member_buy').css({'display':'none'});
			};
		}
	});
	
	//리스트 갯수 보기 제어
	$('.list_control').hide();
	$('.list_control.list8').show(); //default 8개 보기
	$('button.view_list8').addClass('on');
	
	$('button.view_list').on('click',function(){
		$('button.view_list').removeClass('on');
		$('.list_control').hide();
		$(this).addClass('on');
		if($(this).hasClass('view_list8')){
			$('.list_control.list8').show();
		} else {
			$('.list_control.list6').show();
		};
	});
	
	//검색 필터 제어
	$('.smart_filter dl dd button').on('click',function(){ //filter 옵션 버튼 클릭시 클래스 부여
		$(this).toggleClass('on');
	});
	
	//모달 레이어
	$('.modal_btn').on('click',function(){
		if(is_modal == false){
			modal_show();
			$('.'+$(this).attr('data-n')).show();
		} else {
			modal_hide();
		};
	});
	$('.popup_close .modal_btn').on('blur',function(){
		if(is_modal == true){
			modal_hide();
		};
	});
});



