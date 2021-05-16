/*
Custom module for custom functions, variables etc
By KyleRifqi

ChangeLog:
 • May 15 2021
   Added RandomInt and RandomNum to replace Random because
   Random was not accurate down to the decimal. RandomNum to
   get a floored/rounded number and RandomInt to get a non rounded number

 • May 17 202
   Added a section for custom p5js functions and a system
   to detect if p5js exists, though it would fail if
   a variable named p5 exists :P
*/

// Variable Aliases
const Log = console.log

// Functions
function RandomInt(min, max) { // Random full number between min and max (rounded to lowest integer)
	return Math.floor(Math.random() * (max - min + 1) ) + min
}

function RandomNum(min, max) { // Random number between min and max (max not included)
	return Math.random() * (max - min) + min
}

function RanBool() { // Random boolean (true/false)
	return Math.random() < 0.5
}

function Between(num, min, max) { // Check if num is between min and max
	return min-1 < num && num < max+1
}

function Ratio(n1, n2) { // Get ratio of n1 to n2
	for(let n = n2; n>1; n--) {
		if((n1 % n) == 0 && (n2 % n) == 0) {
			n1=n1/n
			n2=n2/n
		}
	}
	return [n1,n2]
}

// P5js Functions
if (typeof p5 !== 'undefined') { // If p5 exists, continue

function circleHitbox(x1,y1,x2,y2,objSize) {
	return dist(x1,y1,x2,y2) < objSize/2
}

}