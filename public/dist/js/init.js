/** *************Init JS*********************
	
    TABLE OF CONTENTS
	---------------------------
	1.Ready function
	2.Load function
	3.Full height function
	4.snoopy function
	5.Chat App function
	6.Resize function
 ** ***************************************/
 
 "use strict"; 
/*****Ready function start*****/
$(document).ready(function(){
	snoopy();
	$('.preloader-it > .la-anim-1').addClass('la-animate');
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).on("load",function(){
	$(".preloader-it").delay(500).fadeOut("slow");
	/*Progress Bar Animation*/
	var progressAnim = $('.progress-anim');
	if( progressAnim.length > 0 ){
		for(var i = 0; i < progressAnim.length; i++){
			var $this = $(progressAnim[i]);
			$this.waypoint(function() {
			var progressBar = $(".progress-anim .progress-bar");
			for(var i = 0; i < progressBar.length; i++){
				$this = $(progressBar[i]);
				$this.css("width", $this.attr("aria-valuenow") + "%");
			}
			}, {
			  triggerOnce: true,
			  offset: 'bottom-in-view'
			});
		}
	}
});
/*****Load function* end*****/

/***** Full height function start *****/
var setHeightWidth = function () {
	var height = $(window).height();
	var width = $(window).width();
	$('.full-height').css('height', (height));
	$('.page-wrapper').css('min-height', (height));
	
	/*Right Sidebar Scroll Start*/
	if(width<=1007){
		$('#chat_list_scroll').css('height', (height - 270));
		$('.fixed-sidebar-right .chat-content').css('height', (height - 279));
		$('.fixed-sidebar-right .set-height-wrap').css('height', (height - 219));
		
	}
	else {
		$('#chat_list_scroll').css('height', (height - 204));
		$('.fixed-sidebar-right .chat-content').css('height', (height - 213));
		$('.fixed-sidebar-right .set-height-wrap').css('height', (height - 153));
	}	
	/*Right Sidebar Scroll End*/
	
	/*Vertical Tab Height Cal Start*/
	var verticalTab = $(".vertical-tab");
	if( verticalTab.length > 0 ){ 
		for(var i = 0; i < verticalTab.length; i++){
			var $this =$(verticalTab[i]);
			$this.find('ul.nav').css(
			  'min-height', ''
			);
			$this.find('.tab-content').css(
			  'min-height', ''
			);
			height = $this.find('ul.ver-nav-tab').height();
			$this.find('ul.nav').css(
			  'min-height', height + 40
			);
			$this.find('.tab-content').css(
			  'min-height', height + 40
			);
		}
	}
	/*Vertical Tab Height Cal End*/
};
/***** Full height function end *****/

/***** snoopy function start *****/
var $wrapper = $(".wrapper");
var snoopy = function(){
	
	/*Counter Animation*/
	var counterAnim = $('.counter-anim');
	if( counterAnim.length > 0 ){
		counterAnim.counterUp({ delay: 10,
        time: 1000});
	}
	
	/*Tooltip*/
	if( $('[data-toggle="tooltip"]').length > 0 )
		$('[data-toggle="tooltip"]').tooltip();
	
	/*Popover*/
	if( $('[data-toggle="popover"]').length > 0 )
		$('[data-toggle="popover"]').popover()
	
	
	/*Sidebar Collapse Animation*/
	var sidebarNavCollapse = $('.fixed-sidebar-left .side-nav  li .collapse');
	var sidebarNavAnchor = '.fixed-sidebar-left .side-nav  li a';
	$(document).on("click",sidebarNavAnchor,function (e) {
		if ($(this).attr('aria-expanded') === "false")
				$(this).blur();
		$(sidebarNavCollapse).not($(this).parent().parent()).collapse('hide');
	});
	
	/*Panel Remove*/
	$(document).on('click', '.close-panel', function (e) {
		var effect = $(this).data('effect');
			$(this).closest('.panel')[effect]();
		return false;	
	});
	
	/*Accordion js*/
		$(document).on('show.bs.collapse', '.panel-collapse', function (e) {
		$(this).siblings('.panel-heading').addClass('activestate');
	});
	
	$(document).on('hide.bs.collapse', '.panel-collapse', function (e) {
		$(this).siblings('.panel-heading').removeClass('activestate');
	});
	
	/*Sidebar Navigation*/
	$(document).on('click', '#toggle_nav_btn,#open_right_sidebar,#setting_panel_btn', function (e) {
		$(".dropdown.open > .dropdown-toggle").dropdown("toggle");
		return false;
	});
	$(document).on('click', '#toggle_nav_btn', function (e) {
		$wrapper.removeClass('open-right-sidebar open-setting-panel').toggleClass('slide-nav-toggle');
		return false;
	});
	
	$(document).on('click', '#open_right_sidebar', function (e) {
		$wrapper.toggleClass('open-right-sidebar').removeClass('open-setting-panel');
		return false;
	
	});
	
	$(document).on('click','.product-carousel .owl-nav',function(e){
		return false;
	});
	
	$(document).on('click', 'body', function (e) {
		if($(e.target).closest('.fixed-sidebar-right,.setting-panel').length > 0) {
			return;
		}
		$('body > .wrapper').removeClass('open-right-sidebar open-setting-panel');
		return;
	});
	
	$(document).on('show.bs.dropdown', '.nav.navbar-right.top-nav .dropdown', function (e) {
		$wrapper.removeClass('open-right-sidebar open-setting-panel');
		return;
	});
	
	$(document).on('click', '#setting_panel_btn', function (e) {
		$wrapper.toggleClass('open-setting-panel').removeClass('open-right-sidebar');
		return false;
	});
	$(document).on('click', '#toggle_mobile_nav', function (e) {
		$wrapper.toggleClass('mobile-nav-open').removeClass('open-right-sidebar');
		return;
	});
	

	$(document).on("mouseenter mouseleave",".wrapper > .fixed-sidebar-left", function(e) {
		if (e.type == "mouseenter") {
			$wrapper.addClass("sidebar-hover"); 
		}
		else { 
			$wrapper.removeClass("sidebar-hover");  
		}
		return false;
	});
	
	$(document).on("mouseenter mouseleave",".wrapper > .setting-panel", function(e) {
		if (e.type == "mouseenter") {
			$wrapper.addClass("no-transition"); 
		}
		else { 
			$wrapper.removeClass("no-transition");  
		}
		return false;
	});
	
	/*Todo*/
	var random = Math.random();
	$(document).on("keypress","#add_todo",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0))  {
				$('<li class="todo-item"><div class="checkbox checkbox-success"><input type="checkbox" id="checkbox'+random+'"/><label for="checkbox'+random+'">' + $('.new-todo input').val() + '</label></div></li><li><hr class="light-grey-hr"/></li>').insertAfter(".todo-list li:last-child");
				$('.new-todo input').val('');
		} else if(e.which == 13) {
			alert('Please type somthing!');
		}
		return;
	});
	
	/*Chat*/
	$(document).on("keypress","#input_msg_send",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0)) {
			$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".fixed-sidebar-right .chat-content  ul li:last-child");
			$(this).val('');
		} else if(e.which == 13) {
			alert('Please type somthing!');
		}
		return;
	});
	$(document).on("keypress","#input_msg_send_widget",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0)) {
			$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".chat-for-widgets .chat-content  ul li:last-child");
			$(this).val('');
		} else if(e.which == 13) {
			alert('Please type somthing!');
		}
		return;
	});
	$(document).on("keypress","#input_msg_send_chatapp",function (e) {
		if ((e.which == 13)&&(!$(this).val().length == 0)) {
			$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + $(this).val() + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">3:30 pm</span></div></div></div><div class="clearfix"></div></li>').insertAfter(".chat-for-widgets-1 .chat-content  ul li:last-child");
			$(this).val('');
		} else if(e.which == 13) {
			alert('Please type asomthing!');
		}
		return;
	});
	
	$(document).on("click",".fixed-sidebar-right .chat-cmplt-wrap .chat-data",function (e) {
		$(".fixed-sidebar-right .chat-cmplt-wrap").addClass('chat-box-slide');
		return false;
	});
	$(document).on("click",".fixed-sidebar-right #goto_back",function (e) {
		$(".fixed-sidebar-right .chat-cmplt-wrap").removeClass('chat-box-slide');
		return false;
	});
	
	/*Chat for Widgets*/
	$(document).on("click",".chat-for-widgets.chat-cmplt-wrap .chat-data",function (e) {
		$(".chat-for-widgets.chat-cmplt-wrap").addClass('chat-box-slide');
		return false;
	});
	$(document).on("click","#goto_back_widget",function (e) {
		$(".chat-for-widgets.chat-cmplt-wrap").removeClass('chat-box-slide');
		return false;
	});
	/*Horizontal Nav*/
	$(document).on("show.bs.collapse",".top-fixed-nav .fixed-sidebar-left .side-nav > li > ul",function (e) {
		e.preventDefault();
	});
	
	/*Slimscroll*/
	$('.nicescroll-bar').slimscroll({height:'100%',color: '#878787', disableFadeOut : true,borderRadius:0,size:'4px',alwaysVisible:false});
	$('.message-nicescroll-bar').slimscroll({height:'229px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.message-box-nicescroll-bar').slimscroll({height:'350px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.product-nicescroll-bar').slimscroll({height:'346px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.app-nicescroll-bar').slimscroll({height:'162px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.todo-box-nicescroll-bar').slimscroll({height:'310px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.users-nicescroll-bar').slimscroll({height:'370px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.users-chat-nicescroll-bar').slimscroll({height:'257px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.chatapp-nicescroll-bar').slimscroll({height:'543px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	$('.chatapp-chat-nicescroll-bar').slimscroll({height:'483px',size: '4px',color: '#878787',disableFadeOut : true,borderRadius:0});
	
	/*Product carousel*/
	if( $('.product-carousel').length > 0 )
	var $owl = $('.product-carousel').owlCarousel({
		loop:true,
		margin:15,
		nav:true,
		navText: ["<i class='zmdi zmdi-chevron-left'></i>","<i class='zmdi zmdi-chevron-right'></i>"],
		dots:false,
		autoplay:true,
		responsive:{
			0:{
				items:1
			},
			400:{
				items:2
			},
			767:{
				items:3
				},
			1399:{
				items:4
			}
		}
	});
	
	/*Refresh Init Js*/
	var refreshMe = '.refresh';
	$(document).on("click",refreshMe,function (e) {
		var panelToRefresh = $(this).closest('.panel').find('.refresh-container');
		var dataToRefresh = $(this).closest('.panel').find('.panel-wrapper');
		var loadingAnim = panelToRefresh.find('.la-anim-1');
		panelToRefresh.show();
		setTimeout(function(){
			loadingAnim.addClass('la-animate');
		},100);
		function started(){} //function before timeout
		setTimeout(function(){
			function completed(){} //function after timeout
			panelToRefresh.fadeOut(800);
			setTimeout(function(){
				loadingAnim.removeClass('la-animate');
			},800);
		},1500);
		  return false;
	});
	
	/*Fullscreen Init Js*/
	$(document).on("click",".full-screen",function (e) {
		$(this).parents('.panel').toggleClass('fullscreen');
		$(window).trigger('resize');
		return false;
	});
	
	/*Nav Tab Responsive Js*/
	$(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function(e) {
		var $target = $(e.target);
		var $tabs = $target.closest('.nav-tabs-responsive');
		var $current = $target.closest('li');
		var $parent = $current.closest('li.dropdown');
			$current = $parent.length > 0 ? $parent : $current;
		var $next = $current.next();
		var $prev = $current.prev();
		$tabs.find('>li').removeClass('next prev');
		$prev.addClass('prev');
		$next.addClass('next');
		return;
	});
};
/***** snoopy function end *****/

/***** Chat App function Start *****/
var chatAppTarget = $('.chat-for-widgets-1.chat-cmplt-wrap');
var chatApp = function() {
	$(document).on("click",".chat-for-widgets-1.chat-cmplt-wrap .chat-data",function (e) {
		var width = $(window).width();
		if(width<=1007) {
			chatAppTarget.addClass('chat-box-slide');
		}
		return false;
	});
	$(document).on("click","#goto_back_widget_1",function (e) {
		var width = $(window).width();
		if(width<=1007) {
			chatAppTarget.removeClass('chat-box-slide');
		}	
		return false;
	});
};
/***** Chat App function End *****/

var boxLayout = function() {
	if((!$wrapper.hasClass("rtl-layout"))&&($wrapper.hasClass("box-layout")))
		$(".box-layout .fixed-sidebar-right").css({right: $wrapper.offset().left + 300});
		else if($wrapper.hasClass("box-layout rtl-layout"))
			$(".box-layout .fixed-sidebar-right").css({left: $wrapper.offset().left});
}
boxLayout();	

/***** Resize function start *****/
$(window).on("resize", function () {
	setHeightWidth();
	boxLayout();
	chatApp();
}).resize();
/***** Resize function end *****/

$(document).ready(function(){

	$('tr.email-row-item').on('click', function(e){
		e.stopPropagation();
		if(!$(e.target).hasClass('email-item-checkbox')){
			location = '/' + $(this).eq(0).attr('data-id');
		}
	});

	$('#select-all-messages').on('change', function(e){
		toggleAllMessages(e.target.checked);
	})
	
	$('.email-item-checkbox').on('click', function(e){
		e.stopPropagation();
		var id = $(this).data('id')
		var indexes = $('#selected-items-to-send').val()
		var indexArray = indexes.trim() ? JSON.parse(indexes) : []

		if(!$(this).prop('checked')){
			var filtered = indexArray.filter(index => index !== id);
			$('#selected-items-to-send').val(JSON.stringify(filtered))
		} else {
			 var filtered = [...indexArray, id]; 
			$('#selected-items-to-send').val(JSON.stringify(filtered))
		}
	})

	$('.markAllAs').on('click', function() {

			var type = $(this).data('type')
			var indexes = $('#selected-items-to-send').val();
			if(indexes){
				var indexes = JSON.parse(indexes);
				$.ajax({
					type: "POST",
					url: window.location.origin + '/mark-all-as',
					data: { indexes, type },
					dataType: 'JSON',
					success: function(data){
						if(data.updated){
							location.reload();
						}
					},
					error: function(e){
						console.log('error', e)
					}
				})
			}
	})

	$('#deleteSingleMessage').on('click', function() {

		var id = $(this).data('id')
		if(id){
			$.ajax({
				type: "POST",
				url: window.location.origin + '/mark-as/' + id,
				data: { viewed: 0, deleted: 1 },
				dataType: 'JSON',
				success: function(){
					window.location = '/';
				},
				error: function(e){
					console.log('error', e)
				}
			})
		}
	})

	$('#addNewMessage').on('click', function(){
		$('#nameFrom').val('');
		$('#emailFrom').val('');
		$('#to').val('');
		$('#cc').val('');
		$('#reply').val('');
		$('#subject').val('');
		$('#titleMessage').text('Nuevo mensaje')
		$(".textarea_editor").data("wysihtml5").editor.setValue('')
		$('#composeModal').modal('show');
	})

	$('#replySingleMessage, #resendSingleMessage').on('click', function() {

		var id = $(this).data('id')
		var type = $(this).attr('id') === 'replySingleMessage' ? 'Responder' : 'Reenviar'
		var prefix = type === 'Responder' ? 'Re: ' : 'Fwd: '
		if(id){
			
			var html = $('#messageSingleMessage').html();
			$(".textarea_editor").data("wysihtml5").editor.setValue(html)
			
			$.ajax({
				type: "POST",
				url: window.location.origin + '/get-message-info',
				data: { id },
				dataType: 'JSON',
				success: function({ email }){
					if(email){
						$('#nameFrom').val(email.name);
						$('#emailFrom').val(email.from);
						$('#to').val(email.to);
						$('#cc').val(email.cc);
						$('#reply').val(email.reply);
						$('#subject').val(prefix + email.subject);
						$('#titleMessage').text(type)
						console.log(email)
					}

					$('#composeModal').modal('show');
				},
				error: function(e){
					console.log('error', e)
				}
			})

		}
	})

	
	

})

function toggleAllMessages(checked) {
	var items = $('.email-item-checkbox');
	var indexArray = []
	
	for(var i = 0; i < items.length; i++){
		var item = $(items[i]);
		item.prop('checked', checked)
		if(checked){
			indexArray.push(item.data('id'));
		}
	}

	var indexes = JSON.stringify(indexArray);
	$('#selected-items-to-send').val(indexes)
}

function goToEmailDetail(e){
	const id = $(e.target).data('id')
	e.stopPropagation();
	e.preventDefault();
	location = '/'. id
	return false;
}

