import Phaser from 'phaser'
import Box from './Box'
import { formatTime } from './formatTime'

export default class WordHuntGame extends Phaser.Scene {

	acertosText: Phaser.GameObjects.Text
	palavrasText: Phaser.GameObjects.Text[] = []
	tableSize: number
	qtdPalavras: number
	bg: Phaser.GameObjects.Sprite
	timer: Phaser.GameObjects.Text

	init(data: { tableSize: number, qtdPalavras: number }) {
		this.tableSize = data.tableSize
		this.qtdPalavras = data.qtdPalavras
	}

	constructor() {
		super('WordHunt')
	}

	preload() {
		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(600-180, 360-25, 320, 50);

		var width = this.cameras.main.width;
		var height = this.cameras.main.height;
		var loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		var percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
			}
		});
		percentText.setOrigin(0.5, 0.2);


		this.load.image('box', 'assets/rect.png')
		this.load.image('boxRed', 'assets/rect_red.png')
		//this.load.image('bg', 'assets/bg.gif')
		this.load.spritesheet('bg', 'assets/spritesheet_bg.png', {
			frameWidth: 1280,
			frameHeight: 720
		})

		this.bg = this.add.sprite(600, 360, 'bg')
		this.bg.scale = 1
		this.bg.setDepth(-1)

		this.anims.create({
			key: 'bg_anim',
			frames: this.anims.generateFrameNames('bg'),
			frameRate: 8,
			repeat: -1
		})

		this.bg.play('bg_anim')		

		this.load.spritesheet('correct', 'assets/spritesheet_correct.png', {
			frameWidth: 53,
			frameHeight: 53
		})
		this.load.on('progress', function (value) {
			console.log(value);
			percentText.setText(parseInt((value * 100).toString()) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(600-150, 360-15, 300 * value, 30);
		});
					
		this.load.on('fileprogress', function (file) {
			console.log(file.src);
		});
		this.load.on('complete', function () {
			console.log('complete');
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
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

		const boxes: Box[][] = [[]]

		const letras: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']

		const boxesContainer = this.add.container(middleX+100, middleY)

		let isClicked = false
		let selectedLetters = []
		let selectedBoxes = []
		let acertos = 0

		//CRIAR QUADRO COM LETRAS ALEATORIAS
		for (let y = 0; y < tableSize; y++) {
			boxes[y] = []
			for (let x = 0; x < tableSize; x++) {
				const posX = ((x * boxWidth) - (totalWidth - boxWidth) / 2)
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
								if (acertos == qtdPalavras) this.acertosText.setTint(0x76E072)
								this.acertosText.text = String("ACERTOS "+acertos+"/"+qtdPalavras)
								this.palavrasText[i].setTint(0x76E072)

								palavras[i] = "1"

								let delay = 0

								for(let i=0; i<selectedBoxes.length; i++) {
									if (!selectedBoxes[i].isLocked) {
										selectedBoxes[i].animation.visible = true
										selectedBoxes[i].animation.playAfterDelay('correct_anim',delay)

										delay = i + i*200
										
									}
								}

								// const index = palavras.indexOf(palavras[i])
								// if (index !== -1) {
								// 	palavras.splice(index,1)
								// }

							}
						}
						if (!isCorrect) {
							for(let i=0; i<selectedBoxes.length; i++) {
								if (!selectedBoxes[i].isLocked) {
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

		this.acertosText = this.add.text(middleX - 400, middleY-140, "ACERTOS "+acertos+"/"+qtdPalavras, {fontFamily: 'Roboto', fontSize: '30px', strokeThickness: 4, stroke: '#4C3641'})
		this.acertosText.setTint(0xFCE9ED)

		for (let i=0; i<palavrasClone.length; i++) {
			this.palavrasText[i] = this.add.text(middleX - 400, middleY-100+(i*30), palavrasClone[i], {fontFamily: 'Roboto', fontSize: '20px', stroke: '#4C3641', strokeThickness: 4}).setTint(0xFCE9ED)
		}

		function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

		// TIMER POSITION
		var correct
		if (tableSize==8) correct = correct = 70
		if (tableSize==10) correct = correct = 110
		if (tableSize==13) correct = correct = 170

		//TIMER
		this.timer=this.add.text(middleX+100-(tableSize*40)/2+correct,middleY-(tableSize*40)/2-50,'TEMPO: 0:00', {fontFamily: 'Roboto', fontSize: '30px', strokeThickness: 4, stroke: '#4C3641'})
		// this.startTime = this.time.now

		let timeTaken = 0

		const timeout = () => {
			if (acertos<palavrasClone.length) {
			  timeTaken += 1
	  
			  this.timer.setText('TEMPO: '+formatTime(String(timeTaken)))
			// this.timer.text = `Tempo: ${timeTaken}`
	  
			  setTimeout(timeout, 1000)
			} else {
				this.scene.start('EndGame', {tempo: timeTaken})
			}
		  }
		setTimeout(timeout, 1000) 

	}
	
}


