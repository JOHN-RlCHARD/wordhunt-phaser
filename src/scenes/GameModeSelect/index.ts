export default class GameModeSelect extends Phaser.Scene {

  constructor() {
    super('GameModeSelect')
  }

  preload() {}

  create() {

    const { width, height } = this.scale

    const middleX = width / 2
    const middleY = height / 2

    const background = this.add.rectangle(middleX, middleY, width, height, 0x999999)
    background.setDepth(-1)

    this.start()
  }

  async start() {

    const { width, height } = this.scale

    const middleX = width / 2
    const middleY = height / 2

    const buttonFacil = this.add.rectangle(middleX, middleY - 150, 240, 50, 0x888888, 0.5)
    buttonFacil.setInteractive()
    this.add.text(middleX, middleY - 150, 'Facil', { fontSize: '32px', color: '#fff' }).setOrigin(0.5)

    const buttonMedio = this.add.rectangle(middleX, middleY - 50, 240, 50, 0x888888, 0.5)
    buttonMedio.setInteractive()
    this.add.text(middleX, middleY - 50, 'Medio', { fontSize: '32px', color: '#fff' }).setOrigin(0.5)

    const buttonDificil = this.add.rectangle(middleX, middleY + 50, 240, 50, 0x888888, 0.5)
    buttonDificil.setInteractive()
    this.add.text(middleX, middleY + 50, 'Dificil', { fontSize: '32px', color: '#fff' }).setOrigin(0.5)


    buttonFacil.on('pointerdown', () => {
        this.scene.start('WordHunt', [7,3])
        this.scene.stop()
    })
    buttonMedio.on('pointerdown', () => {
        this.scene.start('WordHunt', [10,5])
        this.scene.stop()
    })
    buttonDificil.on('pointerdown', () => {
        this.scene.start('WordHunt', [13,7])
        this.scene.stop()
    })

  }
}