$(document).ready(function () {
	var items = $("#gallery li"),
	itemsbyTags = {};

	// loop through tags
	items.each(function(i) {
		var elem = $(this),
		tags = elem.data("tags").split(",");

		// add data attribute for quicksand
		elem.attr("data-id",i);

		$.each(tags, function(key,value){
			// remove whitespace
			value = $.trim(value);

			if(!(value in itemsbyTags)){
				// add empty value
				itemsbyTags[value] = [];
			}

			// add image to array
			itemsbyTags[value].push(elem);
		});
	});

	// create "all items" option
	createList("All Items",items);

	$.each(itemsbyTags, function(k,v){
		createList(k,v);
	});

	// click handler
	$("#navbar a").live("click", function(e){
		var link = $(this);

		// add active class
		link.addClass("active").siblings().removeClass("active");

		$("#gallery").quicksand(link.data("list").find("li"));
		e.preventDefault();
	});


	$("#navbar a:first").click();

	// create the lists
	function createList(text,items){
		// create empty unordered list
		var ul = $("<ul>",{"class":"hidden"});

		$.each(items, function(){
			$(this).clone().appendTo(ul);
		});

		// add gallery div
		ul.appendTo("#gallery");

		// create menu item
		var a = $("<a>",{
			html:text,
			href: "#",
			data:{list:ul}
		}).appendTo("#navbar");		
	}
});