const sheety_link = "https://api.sheety.co/5bed7374-8da0-4329-bf1b-6a96532b85a4";
var items;
var scroll = new SmoothScroll('a[href*="#"]');
var current_index;

function format(text) {
	return text.replace(/\n/g, "<div class='spacer'></div>")
}

const bookTitles = {
	"I": "Harry Potter and the Sorcerer's Stone",
	"II": "Harry Potter and the Chamber of Secrets",
	"III": "Harry Potter and the Prisoner of Azkaban",
	"IV": "Harry Potter and the Goblet of Fire",
	"V": "Harry Potter and the Order of the Phoenix",
	"VI": "Harry Potter and the Half-Blood Prince",
	"VII": "Harry Potter and the Deathly Hallows"
}


function getNew() {
	var new_index = Math.floor(Math.random() * items.length);
	while (new_index == current_index) {
		new_index = Math.floor(Math.random() * items.length);
	}
	current_index = new_index;
	var newItem = items[new_index];

	var context = "";
	if (bookTitles[newItem.book]) {
		context = bookTitles[newItem.book];
	}

	if (newItem.page) {
		context += ", page " + newItem.page;
	}
	$('#quote').html(format(newItem.quote));
	$('#context').text(context);
	scroll.animateScroll(0);
}

jQuery(window).on("load", function(){
    $.getJSON(sheety_link, function(data) {
		items = data;
		getNew()
		$('.initially-hidden').css({
	        opacity: 1,
	    })
	})
});

$('#reload').on("click",function(){
	getNew()
})

$(document).keypress(function(e) {
  getNew()
});

$("body").keydown(function(e) {
  if(e.keyCode == 39) { // right
    getNew()
  }
});