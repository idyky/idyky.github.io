$(document).ready(function() {
	//clear input on refresh
	$('.input').val('');
	//tab the text box over when it hits max length
	$(".input").keyup(function () {
		if (this.value.length == this.maxLength) {
		  $(this).next('.input').focus();
		}
	});
	//force it to only use numbers
	$(".input").ForceNumericOnly();
});

/*
This function is not my code, I got it from stackoverflow to make sure only numbers are entered into the textboxes
This is better than using type = number
When you use the number type the little selector on the side pops up.
I couldn't hide it without making it crash in chrome.
*/
jQuery.fn.ForceNumericOnly = function() {
	return this.each(function() {
		$(this).keydown(function(e) {
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
			// home, end, period, and numpad decimal
			return (
			key == 8 || 
			key == 9 ||
			key == 13 ||
			key == 46 ||
			key == 110 ||
			key == 190 ||
			(key >= 35 && key <= 40) ||
			(key >= 48 && key <= 57) ||
			(key >= 96 && key <= 105));
		});
	});
};