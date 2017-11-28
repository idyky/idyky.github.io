$(document).ready(function() {
	var inputText = '';
	var wordsArray = '';
	var word;
	var numberOfLetters;
	var pressed;
	
	//split all the words
	$(document).on("mouseenter", '.words', function(){
		word = $(this).text();
		pressed = false;
		$(document).on("keyup",function(e) {
			if (pressed == false) {
				if(e.keyCode == 220) {
					for (var i = 0; i < word.length; i++) {
						$('.wrap').append('<div class="words">' + word.charAt(i) + '</div>');
					}
					$(this).remove();
					pressed = true;
				}
			}
		});
	});
	
	//remove a term
	$(document).on('click', '.words', function(){ 
		word = $(this).text();
		//change background
		$(this).css('background', '#ff7c7c');
		//fade out
		$(this).fadeOut(600);
	}); 
	
	//make words draggable and droppable
	$(document).on('mouseenter', '.wrap', function(){ 
		//drag
		$('.words').draggable();
		//drop
		Combine();
	}); 
	
	//split the word on click	
	$(document).on('dblclick', '.words', function(){ 
		word = $(this).text();
		//only split words that can be split
		if (word.length > 1) {
			numberOfLetters = Math.round(word.length / 2);
			var firstWord = '';
			var secondWord = '';
			for (var i = 0; i < numberOfLetters; i++) {
				firstWord += word.charAt(i);
			}
			for (var i = numberOfLetters; i < word.length; i++) {
				secondWord += word.charAt(i);
			}
			//append the split words
			$('.wrap').append('<div class="words">' + firstWord + '</div>');
			$('.wrap').append('<div class="words">' + secondWord + '</div>');
			//remove original
			$(this).remove();
		}
	}); 	
	
	//on key up break the value of text into words
	$('#searchInput').keyup(function (e) {
		//get input text
		inputText = $('#searchInput').val();
		//break it up into a word array
		wordsArray = inputText.match(/\b(\w+)\b/g);
		//clear the container
		$('.wrap').empty();
		//loop and display all the words
		for (var i = 0; i < wordsArray.length; i++) {
			$('.wrap').append('<div class="words">' + wordsArray[i] + '</div>');
		}
	});
});

//method to combine words
function Combine() {
	$('.words').droppable({drop: function(event, ui) {
			var drop = $(this), 
				drag = $(ui.draggable);
				var combined = drop.text() + drag.text();
				//append combined word
				$('.wrap').append('<div class="words">' + combined + '</div>');
				//remove both of the words
				$(this).remove();
				$(ui.draggable).remove();
	}});	
};