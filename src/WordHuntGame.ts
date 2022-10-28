import Phaser from 'phaser'
import Box from './Box'

export default class WordHuntGame extends Phaser.Scene {

	acertosText: Phaser.GameObjects.Text
	palavrasText: Phaser.GameObjects.Text[] = []
	tableSize: number
	qtdPalavras: number

	init(data: { tableSize: number, qtdPalavras: number }) {
		this.tableSize = data.tableSize
		this.qtdPalavras = data.qtdPalavras
	}

	constructor() {
		super('WordHunt')
	}

	preload() {
		this.load.image('box', 'assets/rect.jpg')
		this.load.image('boxRed', 'assets/rect_red.jpg')
	}

	create() {

		const qtdPalavras = this.qtdPalavras
		const tableSize = this.tableSize

		function insertPalavras(palavras: string[]) {

			const lines:number[] = []
			const cols:number[] = []

			//CALCULAR NUMERO DE HORIZONTAIS E VERTICAIS
			const horizontais = Math.floor(palavras.length/2)
			const verticais = palavras.length - horizontais

			//POPULAR ARRAY DE LINHAS E COLUNAS COM O TAMANHO DO QUADRO
			for (let t=0; t<tableSize; t++) {
				lines.push(t)
				cols.push(t)
			}

			//INSERCAO DAS PALAVRAS HORIZONTAIS
			for (let i=0; i<horizontais; i++) {
				//CALCULAR LINHA ALEATORIA COM BASE NA ARRAY DE LINHAS
				const rndLine = lines[randomIntFromInterval(0, tableSize-1-i)]

				//REMOVER LINHA USADA DA ARRAY DE LINHAS
				const index = lines.indexOf(rndLine)
				if (index !== -1) {
					lines.splice(index,1)
				}

				//CALCULAR COORDENADA X INICIAL ALEATORIA
				const rndX = randomIntFromInterval(0,tableSize-palavras[i].length)

				//INSERIR PALAVRA COM AS COORDENADAS ALEATORIAS
				for (let j=0; j<palavras[i].length;j++) {
					boxes[rndLine][rndX+j].setText(palavras[i][j])
				}

				//REMOVER PALAVRA USADA DA ARRAY DE PALAVRAS
				const indexPalavra = palavras.indexOf(palavras[i])
				if (index !== -1) {
					palavras.splice(indexPalavra,1)
				}
			}

			//INSERCAO DAS PALAVRAS VERTICAIS
			for (let i=0;i<verticais;i++) {

				//FUNCAO QUE VERIFICA A COLISAO DE PALAVRAS
				function checkCoords(rndCol: number, rndY: number) {

					//VERIFICAR COLISAO
					for (let j=0; j<palavras[i].length;j++) {
						if ( boxes[rndY+j][rndCol].isRandomLetter == false ) {
							// console.log("Boxes: "+String(boxes[rndY+j][rndCol].text.text))
							// console.log("Palavras: "+String(palavras[i][j]))
							if (String(boxes[rndY+j][rndCol].text.text) != String(palavras[i][j])) return true
							// console.log("return false")
						}
					}
					return false
				}

				//CALCULAR COORDENADAS ALEATORIAS
				function calculateRandomCoords(colsRange: number) {
					//CALCULAR COLUNA ALEATORIA COM BASE NA ARRAY DE COLUNAS
					const rndCol = cols[randomIntFromInterval(0, colsRange)]
					const rndY = randomIntFromInterval(0,tableSize-palavras[i].length)

					return [rndCol, rndY]
				}

				let colsRange = tableSize-1-i

				let rndCoords = calculateRandomCoords(colsRange)

				while (checkCoords(rndCoords[0], rndCoords[1])) {
					rndCoords = calculateRandomCoords(colsRange)
				}

				//REMOVER COLUNA USADA DA ARRAY DE LINHAS
				const index = cols.indexOf(rndCoords[0])
				if (index !== -1) {
					cols.splice(index,1)
				}

				//INSERIR A PALAVRA COM AS COORDENADAS ALEATORIAS
				for (let j=0; j<palavras[i].length;j++) {
					boxes[rndCoords[1]+j][rndCoords[0]].setText(palavras[i][j])
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

		let isClicked = false
		let selectedLetters = []
		let selectedBoxes = []
		let acertos = 0

		//CRIAR QUADRO COM LETRAS ALEATORIAS
		for (let y = 0; y < tableSize; y++) {
			boxes[y] = []
			for (let x = 0; x < tableSize; x++) {
				const posX = ((x * boxWidth) - (totalWidth - boxWidth) / 2)+100
				const posY = (y * boxHeight) - (totalHeight - boxHeight) / 2
				
				 
				const rndInt = randomIntFromInterval(0, letras.length-1)
				const randomBox = new Box(this, posX, posY,  letras[rndInt], true)

				boxes[y][x] = randomBox

				boxes[y][x].clickArea.on('pointerdown', ()=> {
					if (isClicked) {
						for(let i=0; i<selectedBoxes.length; i++) {
							selectedBoxes[i].clear()
						}
						selectedBoxes = []
						isClicked = false
						return
					} else {
						boxes[y][x].select()
						selectedLetters.push(boxes[y][x].text.text)
						selectedBoxes.push(boxes[y][x])
						isClicked = true
					}
					
				})
				boxes[y][x].clickArea.on('pointerover', ()=> {
					if (isClicked) {
						
						selectedLetters.push(boxes[y][x].text.text)
						selectedBoxes.push(boxes[y][x])
						boxes[y][x].select()

						if (boxes[y][x].x < selectedBoxes[0].x 
							|| boxes[y][x].y < selectedBoxes[0].y 
							|| (
								boxes[y][x].x != selectedBoxes[0].x 
								&& boxes[y][x].y != selectedBoxes[0].y
							) ) {
							for(let i=0; i<selectedBoxes.length; i++) {
								if (!selectedBoxes[i].isLocked) {
									selectedBoxes[i].clear()
								}
							}
							selectedBoxes = []
							isClicked = false
						}
					}
				})
				boxes[y][x].clickArea.on('pointerup', ()=> {
					let isCorrect = false
					if (isClicked == true) {
						isClicked = false

						const selectedPalavra = selectedLetters.join("")

						for (let i=0; i<palavras.length; i++) {
							if (String(palavras[i])==String(selectedPalavra)) {
								isCorrect = true
								acertos++
								if (acertos == qtdPalavras) this.acertosText.setTint(0x00FF00)
								this.acertosText.text = String("ACERTOS "+acertos+"/"+qtdPalavras)
								this.palavrasText[i].setTint(0x00FF00)

								palavras[i] = "1"

								// const index = palavras.indexOf(palavras[i])
								// if (index !== -1) {
								// 	palavras.splice(index,1)
								// }

							}
						}
						if (!isCorrect) {
							for(let i=0; i<selectedBoxes.length; i++) {
								if (!selectedBoxes[i].isLocked) {
									console.log(selectedBoxes[i].letra+" "+selectedBoxes[i].isLocked)
									selectedBoxes[i].clear()
								}
							}
						} else {
							for (let i=0; i<selectedBoxes.length;i++){
								selectedBoxes[i].isLocked = true
							}
						}
					}
					selectedBoxes = []
					selectedLetters = []
				})
				boxesContainer.add(randomBox.container)
			}
		}

		const palavras:string [] = generatePalavras(qtdPalavras)
		const palavrasClone = palavras.slice()

		insertPalavras(palavras.slice())

		this.acertosText = this.add.text(40, 40, "ACERTOS "+acertos+"/"+qtdPalavras)
		this.acertosText.setTint(0x000000)

		for (let i=0; i<palavrasClone.length; i++) {
			this.palavrasText[i] = this.add.text(40, 60+(i*15), palavrasClone[i]).setTint(0x000000)
		}

		function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
	}
}

