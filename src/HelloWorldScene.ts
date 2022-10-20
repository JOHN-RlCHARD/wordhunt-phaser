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

		class Palavra {
			i: number
			j: number
			letra: string

			constructor(i: number, j: number, letra: string) {
				this.i = i
				this.j = j
				this.letra = letra
			}
		}

		function generatePalavras(qtd: number) {

			//BANCO DE PALAVRAS
			const bancoPalavras: string[] = ['PLANTA', 'AREIA', 'MESA', 'PIZZA', 'GELEIA', 'CUBO', 'FUTEBOL', 'DAVID']
			
			const palavras = []

			for (let i = 0; i<qtd; i++) {
				// GERAR NUMERO RANDOM PARA COLUNA E LINHA
				const rndCol = randomIntFromInterval(0,tableSize-1)
				const rndLine = randomIntFromInterval(0,tableSize-1)

				//CRIAR PALAVRA ALEATORIA
				const rndInt = randomIntFromInterval(0,bancoPalavras.length)
				const palavra = bancoPalavras[rndInt]

				const rndX = randomIntFromInterval(0,tableSize-palavra.length)

				const palavraArray: Palavra[] = []

				for (let z=0; z<palavra.length; z++) {
					const p = new Palavra(rndX+z, rndLine, palavra[z])
					palavraArray.push(p)
					// // PRINTAR CONTEUDO DA ARRAY
					// const text1 = String('x: '+palavraArray[z].i+' y: '+palavraArray[z].j+' letra: '+palavraArray[z].letra)
					// this.add.text(0,(z*15)+20,text1)
				}
				palavras.push(palavraArray)
			}
			return palavras
		}

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

		const palavras = generatePalavras(2)

		let boxCounter = 1
		for (let y = 0; y < tableSize; y++) {
			for (let x = 0; x < tableSize; x++) {
				const posX = (x * boxWidth) - (totalWidth - boxWidth) / 2
				const posY = (y * boxHeight) - (totalHeight - boxHeight) / 2
				
				 
				const rndInt = randomIntFromInterval(0, letras.length-1)
				const randomBox = new Box(this, posX, posY, 0, {id: boxCounter, content: letras[rndInt]})

				boxCounter++
				boxes.push(randomBox)
			}
		}

		const boxesContainer = this.add.container(middleX, middleY, boxes.map((box)=>box.container))

		function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
	}
}
