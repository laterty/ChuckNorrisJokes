let rad=$('[name="kindjokes"]'),//to know what way to get a joke was chosen
	radc=$('[name="ctg"]'), //to know what category was chosen
	jokes = {}, //jokes on the page exept favorites
	favjokes = {}, // key = id of fav.joke, value = true
	kind,
	catg;


// =================================display favjokes after reloading=======================================================================
for (let i = 0, length = localStorage.length,jk; i < length; i++) {
	jk = JSON.parse(localStorage.getItem(localStorage.key(i)));
	$("#data1").prepend(`<div class="favjoke" name = "${jk.id}">  <div class="joke__like"><div class="joke__heart joke__heart_active"  data-idfav='${jk.id}' onclick='O(this)' > </div> </div> <div class="favjoke__container"> <div class="joke__id"> ID: <a href="  ${jk.url} " class="joke__idlink"> ${jk.id} </a></div> <div class="joke__text"> ${jk.value} </div> <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(jk.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);
	favjokes[jk.id] = true;
}

//=============================GETJOKE====================================================
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
		    	$("#data").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart"  id='${data.id}' onclick='I(this)' > </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href="  ${data.url} " class="joke__idlink"> ${data.id} </a></div> <div class="joke__text"> ${data.value} </div> <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(data.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);
		     	console.log(data);
		    	jokes[data.id] = data;
				if (favjokes[data.id]) {$(`#${data.id}`).addClass('joke__heart_active')}; 
		    },
		    error: function(data){ 
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
		    	$("#data").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart" id='${data.id}' onclick='I(this)'> </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href=" ${data.url} " class="joke__idlink">   ${data.id} </a></div> <div class="joke__text">  ${data.value} </div> <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(data['updated_at']))/3600000)}  hours ago</div> <div class="joke__category"> ${catg} </div> </div> </div> </div>`);
		      		console.log(data);
		      		jokes[data.id] = data;
					if (favjokes[data.id]) {$(`#${data.id}`).addClass('joke__heart_active')};		      
		    },
		    error: function(data){ 
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
			    	$("#data").prepend(`<div class="joke">  <div class="joke__like"><div class="joke__heart" id='${joke.id}' onclick='I(this)'> </div> </div> <div class="joke__container"> <div class="joke__id"> ID: <a href="  ${joke.url} " class="joke__idlink"> ${joke.id} </a></div> <div class="joke__text"> ${joke.value} </div> <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(joke.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);
			    	jokes[joke.id] = joke;
			    	if (favjokes[joke.id]) {$(`#${joke.id}`).addClass('joke__heart_active')}; 

			    },
			    error: function(data){ 
			      console.log(data)
			    }
  			});
		
	};

});	
//==================================controles how forms are displayed ===============================================



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

// ==================================callback listener for jokes hearts exept favorites================================================


function I(x) {
	let jk = jokes[x.getAttribute('id')],
		jkid = jk.id;
	if (x.classList.contains('joke__heart_active')) {
		$(x).removeClass('joke__heart_active');
		$(`[name =${jkid}]`).remove();
		localStorage.removeItem(`${jkid}`);
		delete favjokes[jkid];
	} else {
		$(x).addClass('joke__heart_active');	
		$("#data1").prepend(`<div class="favjoke" name = "${jkid}">  <div class="joke__like"><div class="joke__heart joke__heart_active"  data-idfav='${jk.id}' onclick='O(this)' > </div> </div> <div class="favjoke__container"> <div class="joke__id"> ID: <a href="  ${jk.url} " class="joke__idlink"> ${jk.id} </a></div> <div class="joke__text"> ${jk.value} </div> <div class="joke__bottomrow"><div class="joke__timeupdated"> Last update: ${Math.floor((Date.now() - Date.parse(jk.updated_at))/3600000)}  hours ago</div>  </div> </div> </div>`);		    			
		localStorage.setItem(`${jkid}`, JSON.stringify(jk));
		favjokes[jkid] = true;
	}
};	
//================================callback listener for favorite jokes hearts=================================================
function O(x){
	let ids = x.dataset.idfav;
	$(`[name =${ids}]`).remove();
	$(`#${ids}`).removeClass('joke__heart_active');
	localStorage.removeItem(`${ids}`);
	delete favjokes[ids];
}	

//===============================adaptive======================================================
	    
function setup_for_width(x) {
	if (x.matches) {
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

var tabl = window.matchMedia("screen and (max-width: 767px)");
// var phon = window.matchMedia("screen and (min-width: 576px)");

setup_for_width(tabl);

tabl.addListener(setup_for_width); // Добавим прослушку на смену результата

 // Вызовем нашу функцию