const styleElem = document.createElement('style')
var css = '.icon:hover { transform: scale(1.1) }'
document.head.appendChild(styleElem)
styleElem.type = 'text/css'
if (styleElem.styleSheet){
	styleElem.styleSheet.cssText = css
} else {
	styleElem.appendChild(document.createTextNode(css))
}

var folding = false
const icon = document.getElementsByClassName('icon')[0]
const card = document.getElementsByClassName('card')[0]

let a = icon.style.animation
let b = 'fold 1s ease'
let c = 'reveal 1s ease 0s 1 normal forwards'
a.includes('unfold')?(icon.style.animation=b,card.style.animation='un'+c,icon.style.left='0px'):(icon.style.animation='un'+b,card.style.animation=c,icon.style.left='-250px')
window.onload = function() {
	icon.onclick = function () {
		if (folding) return;
		folding = true
		styleElem.innerHTML = ''
		let a = icon.style.animation
		let b = 'fold 1s ease'
		let c = 'reveal 1s ease 0s 1 normal forwards'
		a.includes('unfold')?(icon.style.animation=b,card.style.animation='un'+c,icon.style.left='0px'):(icon.style.animation='un'+b,card.style.animation=c,icon.style.left='-250px')
		setTimeout(function() {
			styleElem.innerHTML = css
			folding = false
		},1100)
	}
}