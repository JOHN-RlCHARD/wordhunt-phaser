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
		
		function insertPalavras(palavras: string[]) {

			const lines:number[] = []

			//POPULAR ARRAY COM O TAMANHO DO QUADRO
			for (let t=0; t<tableSize; t++) {
				lines.push(t)
			}

			for (let i=0; i<palavras.length; i++) {
				//CALCULAR LINHA ALEATORIA COM BASE NA ARRAY DE LINHAS
				const rndLine = lines[randomIntFromInterval(0, tableSize-1-i)]

				//REMOVER LINHA USADA DA ARRAY DE LINHAS
				const index = lines.indexOf(rndLine)
				if (index !== -1) {
					lines.splice(index,1)
				}

				//CALCULAR COORDENADA X INICIAL ALEATORIA
				const rndX = randomIntFromInterval(0,tableSize-palavras[i].length)

				console.log(rndX)
				for (let j=0; j<palavras[i].length;j++) {
					boxes[rndLine][rndX+j].setText(palavras[i][j])
				}
			}

		}

		function generatePalavras(qtd: number) {

			//BANCO DE PALAVRAS
			let bancoPalavras: string[] = ['PLANTA', 'AREIA', 'MESA', 'PIZZA', 'GELEIA', 'CUBO', 'FUTEBOL', 'DAVID']
			
			const palavras:string[] = []

			for(let i=0;i<qtd;i++) {
				const rndInt = randomIntFromInterval(0,bancoPalavras.length-1)
				let palavra = bancoPalavras[rndInt]

				const index = bancoPalavras.indexOf(palavra)

				if (index !== -1) {
					bancoPalavras.splice(index,1)
				}

				palavras.push(palavra)
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

		const boxes: Box[][] = [[]]

		const letras: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']

		const boxesContainer = this.add.container(middleX, middleY)

		let boxCounter = 1
		for (let y = 0; y < tableSize; y++) {
			boxes[y] = []
			for (let x = 0; x < tableSize; x++) {
				const posX = (x * boxWidth) - (totalWidth - boxWidth) / 2
				const posY = (y * boxHeight) - (totalHeight - boxHeight) / 2
				
				 
				const rndInt = randomIntFromInterval(0, letras.length-1)
				const randomBox = new Box(this, posX, posY, {id: boxCounter, content: letras[rndInt]})

				boxes[y][x] = randomBox
				boxesContainer.add(randomBox.container)
			}
		}

		insertPalavras(generatePalavras(3))


		function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
	}
}
