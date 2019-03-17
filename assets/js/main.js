const sheety_link = "https://api.sheety.co/1d07bd24-d642-49cb-b0e9-96e262386569";
var items;
var items_backup; // will stay untouched while items is being edited
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
	if (items.length == 0) {
		items = items_backup.slice()
	}
	var new_index = Math.floor(Math.random() * items.length);
	var newItem = items[new_index];
	var context = "";
	if (bookTitles[newItem.book]) {
		context = bookTitles[newItem.book];
	}
	$('#quote').html(format(newItem.quote));
	$('#context').text(context);
	scroll.animateScroll(0);
	// this way, we don't get any repeats
	items.splice(new_index, 1); // 1 is the number of elements to remove
}

jQuery(window).on("load", function(){
    $.getJSON(sheety_link, function(data) {
		items = data.slice();
		items_backup = data.slice();
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