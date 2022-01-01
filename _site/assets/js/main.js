const sheety_link = "https://opensheet.elk.sh/1S0lMO2Jgl9Ew6t_17ZysBtFYvj1stdNef-F9imQpPaA/Quotes";
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
	if (bookTitles[newItem["Book"]]) {
		context = bookTitles[newItem["Book"]];
	}
	$('#quote').html(format(newItem["Quote"]));
	$('#context').text(context);
	scroll.animateScroll(0);
	// this way, we don't get any repeats
	items.splice(new_index, 1); // 1 is the number of elements to remove
}

jQuery(window).on("load", function(){
    $.getJSON(sheety_link, function(data) {
		items = data.slice();
		console.log(items)
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

$("body").keydown(function(e) {
	if(e.keyCode == 39) {
		getNew()
	}
	if (e.which == 32) {
		getNew()
	    return false;
	}
});