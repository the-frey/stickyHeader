function queryWidth(el){
	var width = $(el).width() + Number($(el).css('padding-left').replace(/px/ig,"")) + Number($(el).css('padding-right').replace(/px/ig,"")) + Number($(el).css('border-left-width').replace(/px/ig,"")) + Number($(el).css('border-right-width').replace(/px/ig,""));;
	return width;
};

function queryHeight(el){
	var height = $(el).height();
	return height;
};

$(document).ready(function () {
	var tables = $('table.stickyHeader');
	tables.each(function(i){
		var table = tables[i];
		var tableClone = $(table).clone(true).empty().removeClass('stickyHeader');
		var theadClone = $(table).find('thead').clone(true);
		var stickyHeader =  $('<div></div>').addClass('stickyHeader hide').attr('aria-hidden', 'true');
		stickyHeader.append(tableClone).find('table').append(theadClone);
		$(table).after(stickyHeader);
		
		var headerCells = $(table).find('thead th');
		var headerCellHeight = $(headerCells[0]).height();
		
		var no_fixed_support = false;
		if (stickyHeader.css('position') == "absolute") {
			no_fixed_support = true;
		}
		
		var stickyHeaderCells = stickyHeader.find('th');

		var cellWidths = [];
		for (var i = 0, l = headerCells.length; i < l; i++) {
			cellWidths[i] = $(headerCells[i]).width();
		}
		for (var i = 0, l = headerCells.length; i < l; i++) {
			$(stickyHeaderCells[i]).css('width', cellWidths[i]);
		}
		
		var cutoffTop = $(table).offset().top;
		
		$(window).scroll(function() { 
			tableHeight = queryHeight(table);
			var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
			var currentPosition = $(window).scrollTop();
			if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
				stickyHeader.css('width', queryWidth(table));
				stickyHeader.removeClass('hide');
				if (no_fixed_support) {
					stickyHeader.css('top', currentPosition + 'px');
				}
			}
			else {
				stickyHeader.addClass('hide');
			}
		});

		$(window).resize(function() {
		  stickyHeader.css('width', queryWidth(table));
		});
	});
});
