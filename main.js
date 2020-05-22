let rad=$('[name="kindjokes"]'),
	radc=$('[name="ctg"]'),
	favoriteArray = localStorage.getItem('fav'),
	kind,
	catg;

//=================================================================================
$("form").submit(function(e){
    e.preventDefault();
    for (var i = 0; i < rad.length; i++) {
   		if (rad[i].checked) {
       		kind = rad[i].value;
       		break;           		
	    }
	};
	if (kind == 'Random') {
		$.ajax({
		    url: 'https://api.chucknorris.io/jokes/random',
		    method: 'GET',
		    dataType: 'json',
		    success: function(data){ 
		      $("#data").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart" data-url="${data.url}" id='${data.id}' onclick='I(this)' > </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href="  ${data.url} " class="joke__idlink"> ${data.id} </a></div> ${data.value} <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(data.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);
		      console.log(data)
		    },
		    error: function(data){ //error function
		      console.log(data)
		    }
  		});
	};

	if (kind == 'categories') {
		for (var i = 0; i < radc.length; i++) {
			if (radc[i].checked) {
			    catg = radc[i].value;   			    		
			};
		}; 	    			
	   	$.ajax({
		    url: 'https://api.chucknorris.io/jokes/random?category=' + catg,
		    method: 'GET',
		    dataType: 'json',
		    success: function(data){ 
		      $("#data").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart" data-url="${data.url}" onclick='I(this)'> </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href=" ${data.url} " class="joke__idlink">   ${data.id} </a></div>  ${data.value} <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(data.updated_at))/3600000)}  hours ago</div> <div class="joke__category"> ${catg} </div> </div> </div> </div>`);
		      console.log(data)
		    },
		    error: function(data){ //error function
		      console.log(data)
		    }
  		});
	   	
	};

	if (kind == 'Search') {
		    $.ajax({
		    	url: 'https://api.chucknorris.io/jokes/search?query=' + document.getElementById('pole').value,
			    method: 'GET',
			    dataType: 'json',
			    success: function(data){ 
			    	let count = Math.floor(Math.random() * data.total);
			    	let joke = data.result[count];
			    	$("#data").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart" data-url="${joke.url}" onclick='I(this)'> </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href="  ${joke.url} " class="joke__idlink"> ${joke.id} </a></div> ${joke.value} <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(joke.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);
			    	console.log(data)
			    },
			    error: function(data){ //error function
			      console.log(data)
			    }
  			});
			
	};	

	

  

});
//=================================================================================

$('#random').click(function(){
	$('.content__search').css('display', 'none');
	$('.content__categories').css('display', 'none');
});

$('#ctgrs').click(function(){
	$('.content__search').css('display', 'none');
	$('.content__categories').css('display', 'block');
});
	 	
$('#search').click(function(){
	$('.content__search').css('display', 'inline-block');
	$('.content__categories').css('display', 'none');
});


function ajax_get(url, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        console.log('responseText:' + xmlhttp.responseText);
	        try {
		        var data = JSON.parse(xmlhttp.responseText);
	        } catch(err) {
		        console.log(err.message + " in " + xmlhttp.responseText);
		    	return;
		    }
		    callback(data);
		}
	};
		 
	xmlhttp.open("GET", url, true);
    xmlhttp.send();
};


function I(x) {
	if (x.classList.contains('joke__heart_active')) {
		$(x).removeClass('joke__heart_active');
	} else {
		$(x).addClass('joke__heart_active');
		let 	url1 = x.dataset.url;
		ajax_get(url1, function(data) {
			$("#data1").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart joke__heart_active" data-url="${data.url}" id='${data.id}' onclick='I(this)' > </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href="  ${data.url} " class="joke__idlink"> ${data.id} </a></div> ${data.value} <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(data.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);		    			
		});
	}
};		
	    
function setup_for_width(tabl) {
	if (tabl.matches) {
		$('#exampleModal').addClass("modal left fade");
		$('#exampleModal').removeClass("col-md-4 offset-md-1");
		$('#test11 ').css('display','flex');
		$('#exampleModal').css('display','none');
		$('.favorite').css('width','480px');
		$('.favorite').css('background','');
		$('.favorite__btnmenu').css('display','inline-block');
		$('.modal-content').css('padding','40px');
		$('.favorite__favorite').css('justify-content','flex-end');
	} else {
		$('#exampleModal').css('display','block');
		$('#exampleModal').addClass("col-md-4 offset-md-1");
		$('#exampleModal').removeClass("modal left fade");
		$('#test11 ').css('display','none');
		$('.favorite').css('width','');
		$('.favorite__btnmenu').css('display','none');
		$('.favorite').css('background','#f8f8f8');
		$('.modal-content').css('padding','');
		$('.favorite__favorite').css('justify-content','flex-start');


	}
};

var tabl = window.matchMedia("screen and (max-width: 768px)");
var phon = window.matchMedia("screen and (min-width: 576px)");

tabl.addListener(setup_for_width); // Добавим прослушку на смену результата

setup_for_width(tabl); // Вызовем нашу функцию