alert('YES!-----!!');
var id = this.getAttribute('post_id');
	var name = $('#post-member-' + id + ' a').html();
	var link = getUrlProt()+$('#post-member-' + id + ' a').attr('href');
	var get = $('.bar a:last').attr('onclick');
	var index_get = get.indexOf('?') + 1;
	get = get.substr(index_get);
	index_get = get.indexOf('\'');
	get = get.substring(0, index_get);
	$.get('index.php', get, function (d_data) {}).always(function (d_data) {
	  var div = document.createElement('div');
	  div.innerHTML = d_data;
	  var cur_name = $(div).find('#topic_curator').val();
	  var result = false;
	  if (cur_name == '') {
		result = confirm('Назначить "' + name + '" куратором темы?');
	  } else {
		if (name.toLowerCase() == cur_name.toLowerCase()) {
		  result = confirm('Пользователь уже является куратором данной темы. Освободить?');
		  if (result)
			name = '';
		} else
		  result = confirm('Куратором темы является "' + cur_name + '". Назначить "' + name + '" новым куратором темы?');
	  }
	  if (result) {
		var post = '';
		var tmp = $(div).find('#curator_form').html().replace(/name="(\S*?)" value="(\S*?)"/g, function (a, name, value) {
		  post = post + name + '=' + value + '&';
		});
		post = post + 'topic_curator=' + name;
		$.ajax({
		  type : "POST",
		  url : "index.php?" + post,
		  beforeSend : function (xhr) {
			xhr.overrideMimeType("text/plain; charset=windows-1251");
		  },
		  success : function (data) {
			var result = data.toString().match(/<div class="pformstrip">(.*?)<\/div>/);
			if (result != null) {
			  if ((result.toString().toLowerCase().indexOf(name.toLowerCase()) == -1) & (name != '')) {

				if (cur_name == '')
				  result = prompt('Добавлен куратор "' + name + '". Оповестить в теме?', '[mod]Куратором темы назначен [b]' + link + '[/b][/mod]');
				else if (name.toLowerCase() != cur_name.toLowerCase())
				  result = prompt('Добавлен куратор "' + name + '". Оповестить в теме?', '[MOD][I][B]' + link + '[/B] освобожден от должности куратора. Спасибо за проделанную работу!\r\nКуратором темы назначен [b]' + link + '[/b][/I][/MOD]');
			  } else if (name.toLowerCase() != cur_name.toLowerCase())
				result = prompt('Куратор удалён.', '[MOD][I][B]' + link + '[/B] освобожден от должности куратора. Спасибо за проделанную работу![/I][/MOD]');
			  else
				result = false;
			  if (result) {
				ipsclass.add_editor_contents(result);
				$('input[value="Отправить"]').click();
			  } else
				location.reload();
			} else {
			  result = data.toString().match(/class="errorwrap">([\s\S]*?)<p>(.*?)<\/p>/);
			  if (result != null)
				alert(result[2].replace(/<(.*?)>/g, ''));
			  else
				alert(data.substr(data.indexOf('<h3>'), data.lenght));
			}
		  }
		});
	  }
	});
	return false
