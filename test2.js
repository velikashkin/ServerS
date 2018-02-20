alert('YES!SSSSSSSSSSSSSSSSSSSSSSS!!');	$('#topicmenu-options_menu2').remove();
	var dfd = $('#topic_func').position().top
	var fdf = $('#topic_func').position().left
	var menus = $('#topicmenu-options_menu').clone();
	menus.attr('id','topicmenu-options_menu2').css({
	  'display':'',
	  'position':'fixed',
	  'top':dfd,
	  'left':fdf,
	})
	  .appendTo("body");
	$('body').click(function(){
	  $('#topicmenu-options_menu2').remove();
	});
