var squareDiv = document.getElementById("square");
var halfDiv = document.getElementById("half");
var percentDiv = document.getElementById("percent");
var circleAreaDiv = document.getElementById("circleArea");
var oneArgumentDiv = document.getElementById("oneArgument");

var num;
var num2;
var half;
var squared;
var areaOfNumber;
var percentOfArea;

function run() {
	num = document.getElementById('number1').value;
	num2 = document.getElementById('number2').value;
	storeResults(num);
	console.log("First number is: " + num + ". Second number is: " + num2);
	squareNumber(num);
	halfNumber(num);
	percentOf(num, num2);
	areaOfCircle(num);
}

function squareNumber(number) {
	var numberSquared = number * number;
	console.log("The result of squaring the number " + number + " is " + numberSquared + ".");
	squareDiv.innerText = "The result of squaring the number " + number + " is " + numberSquared + ".";
	return numberSquared;
}

function halfNumber(number) {
	var halfedNumber = number / 2;
	console.log("Half of " + number + " is " + halfedNumber + ".");
	halfDiv.innerText = "Half of " + number + " is " + halfedNumber + ".";
	return halfedNumber;
}

function percentOf(number1, number2) {
	var percent = (number1 / number2) * 100;
	console.log(number1 + " is " + percent + "% of " + number2);
	percentDiv.innerText = number1 + " is " + percent + "% of " + number2;
	return percent;
}

function areaOfCircle(radius) {
	var circleArea = Math.PI * squareNumber(radius);
	circleArea = Math.round(circleArea * 100) / 100;
	console.log("The area for a circle with radius " + num + " is " + circleArea);
	circleAreaDiv.innerText = "The area for a circle with radius " + num + " is " + circleArea;
	return circleArea;
}

function storeResults(number) {
	half = halfNumber(num);
	squared = squareNumber(half);
	areaOfNumber = areaOfCircle(squared);
	percentOfArea = percentOf(areaOfNumber, squared);
	oneArgumentDiv.innerText = "Half of the number: " + half + " | Squared: " + squared + " | Area: " + areaOfNumber + " | Percentage of area: " + percentOfArea + "%";
}