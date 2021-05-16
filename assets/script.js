// Variables & Setup
const transitionSpeed = 15
var canvas, logo, logoImg, card, github, youtube
var center = {x: innerWidth/2, y: innerHeight/2}
var mouse = {x:0,y:0,hold:false}
var loaded = false
var mobile = false
var icons = []

function preload() {
	logoImg = loadImage('./images/icon.png')
	github = loadImage('./images/github.png')
	youtube = loadImage('./images/youtube.png')
}

function setup() {
	canvas = createCanvas(innerWidth, innerHeight)
	canvas.position(0, 0)

	logo = new Logo(logoImg,250)
	card = new Card()
	icons.push(new Icon(github,'https://github.com/KyleRifqi',45,'(card.x+(card.w/2))-((500-(logo.ps/4))/2)-30'))
	icons.push(new Icon(youtube,'https://www.youtube.com/channel/UCAZa5skhLwfK-Dh9mmsZphw',45,'(card.x+(card.w/2))-((500-(logo.ps/4))/2)+30'))

	// Mask circle onto icon, this took way longer to do than it should have wtf
	temp = createImage(logoImg.width, logoImg.height);
	maskImage = createGraphics(logoImg.width, logoImg.height);
	let w = maskImage.width
	let h = maskImage.height
	maskImage.ellipse(w/2,h/2,w,h)
	temp.copy(maskImage, 0, 0, w, h, 0, 0, w, h)
	logoImg.mask(temp)

	init()
	loaded = true
}

function init() {
	center = {x: innerWidth/2, y: innerHeight/2}
	resizeCanvas(innerWidth, innerHeight)

	logo.cx = center.x
	logo.cy = center.y

	if (innerWidth < innerHeight) {
		mobile = true
		alert('Warning: This website is not optimized for mobile! Check out this website on a computer. If you cant, you can flip your device horizontally but dont expect much.')
	}
}

// Event Listeners
addEventListener('resize',init)

const click = (x,y)=> {
	if (!loaded) return

	if (circleHitbox(x,y,logo.x,logo.y,logo.ps)) {
		if (logo.spin) return
		logo.spin = true
		logo.winded = !logo.winded
	}

	for (i of icons) {
		if (circleHitbox(x,y,i.x,logo.y,i.ps)) return open(i.link, '_blank')
	}
}
addEventListener('click',e=>{click(e.x,e.y)})
addEventListener('touchstart',e=>{
	t = e.touches[0]
	click(t.clientX,t.clientY)
})
addEventListener('touchmove',e=>{ t = e.touches[0]; mouse.x = t.clientX; mouse.y = t.clientY })
addEventListener('mousemove',e=>{ mouse.x = e.x; mouse.y = e.y })
addEventListener('touchstart',e=>{ mouse.hold = true })
addEventListener('mousedown',e=>{ mouse.hold = true })
addEventListener('touchend',e=>{ mouse.hold = false })
addEventListener('mouseup',e=>{ mouse.hold = false })

// Objects
class Logo {
	constructor(img,s) {
		this.img = img
		this.cx = center.x
		this.y = center.y
		this.x = this.cx
		this.s = s
		this.ps = s
		this.spin = true
		this.winded = true
		this.wasWinded = false
		this.a = 0
	}

	draw() {
		push()
		imageMode(CENTER)
		angleMode(DEGREES)
		translate(this.x,this.y)
		rotate(this.a)
		image(logoImg, 0, 0, this.s, this.s);
		pop()
	}

	update() {
		if (circleHitbox(mouse.x,mouse.y,this.x,this.y,this.ps)) {
			this.s += ((this.ps+15)-this.s)/5
		} else this.s += (this.ps-this.s)/5

		if (this.spin) {
			// this.a += this.wasWinded?-7:7
			if (this.wasWinded) {
				this.a -= (this.a+1)/transitionSpeed
			} else this.a += (361-this.a)/transitionSpeed
			if (this.a > 360 || (this.a < 0 && this.wasWinded)) {
				if (this.a < 0 && this.wasWinded) this.a = 0
				this.spin = false
				this.wasWinded = !this.wasWinded
			}
		}

		if (this.winded) {
			this.x += ((this.cx-250)-this.x)/transitionSpeed
		} else this.x += (this.cx-this.x)/transitionSpeed

		this.y = center.y
		this.draw()
	}
}

class Card {
	constructor() {
		this.x = 0
		this.y = 0
		this.w = 0
	}

	draw() {
		push()
		strokeWeight(10)
		rectMode(CENTER)
		stroke(0)
		fill(0)
		rect(this.x,this.y,this.w,logo.ps/1.15, 0, 30, 30, 0)
		fill(30)
		stroke(255)
		rect(this.x,this.y,this.w-25,logo.ps/1.3, 0, 20, 20, 0)
		pop()
	}

	update() {
		if (logo.winded) {
			this.w += (500-this.w)/transitionSpeed
		} else this.w -= (this.w)/transitionSpeed

		this.x = logo.cx
		this.y = logo.y
		if (this.w > 100) this.draw()
	}
}

class Icon {
	constructor(img,link,s,ex) {
		this.ex = ex
		this.img = img
		this.link = link
		this.x = 0
		this.s = s
		this.ps = s
	}

	draw() {
		imageMode(CENTER)
		image(this.img,this.x,logo.y,this.s,this.s)
	}

	update() {
		if (circleHitbox(mouse.x,mouse.y,this.x,logo.y,this.ps)) {
			this.s += ((this.ps+7.5)-this.s)/10
		} else this.s += (this.ps-this.s)/10

		this.x = eval(this.ex)
		if (this.x < logo.x) return
		this.draw()
	}
}

// Animation
function draw() {
	clear()

	card.update()

	for (x of icons) {
		x.update()
	}

	logo.update()
}

//(card.x+(card.w/2))-((500-(logo.ps/4))/2)