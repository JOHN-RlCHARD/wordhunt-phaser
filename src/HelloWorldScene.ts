import Phaser from 'phaser'
import Box from './Box'
import BoxData from './BoxData'

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.image('box', 'assets/rect.jpg')
		this.load.image('boxRed', 'assets/rect_red.jpg')
	}

	create() {
		const { width, height } = this.scale

		let tableSize = 12

		const middleX = width / 2
		const middleY = height / 2

		const boxWidth = 40
		const boxHeight = 40

		const totalWidth = tableSize * boxWidth
    	const totalHeight = tableSize * boxHeight

		const background = this.add.rectangle(middleX, middleY, width, height, 0x999999)
    	background.setDepth(-1)

		const boxes: Box[] = []

		const letras: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']

		const palavras: string[] = ['BALA', 'AINDA', 'CRIA', 'PAPORETO']
		const rndCol = randomIntFromInterval(0,tableSize-1)
		const rndLine = randomIntFromInterval(0,tableSize-1)
		const palavra = 'AINDA'

		let boxCounter = 1
		for (let y = 0; y < tableSize; y++) {

			const rndX = randomIntFromInterval(0,tableSize-palavra.length)
			
			for (let x = 0; x < tableSize; x++) {
				const posX = (x * boxWidth) - (totalWidth - boxWidth) / 2
				const posY = (y * boxHeight) - (totalHeight - boxHeight) / 2
				
				if (x>=rndX && x<rndX+palavra.length && y==rndLine) {
					const palavraBox = new Box(this, posX, posY, 1, {id: boxCounter, content: palavra[x-rndX]})

					boxCounter++
					boxes.push(palavraBox)
					
				} else {
					const rndInt = randomIntFromInterval(0, letras.length-1)
					const randomBox = new Box(this, posX, posY, 0, {id: boxCounter, content: letras[rndInt]})

					boxCounter++
					boxes.push(randomBox)
				}
			}
		}

		const boxesContainer = this.add.container(middleX, middleY, boxes.map((box)=>box.container))

		function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
	}
}
