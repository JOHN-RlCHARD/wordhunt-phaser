export default class GameModeSelect extends Phaser.Scene {

  bg: Phaser.GameObjects.Sprite

  constructor() {
    super('GameModeSelect')
  }

  preload() {
    this.load.image('button', 'assets/button.png')
    this.load.spritesheet('bg', 'assets/spritesheet_bg.png', {
      frameWidth: 640,
      frameHeight: 360
    })
  }

  create() {

    const { width, height } = this.scale

    const middleX = width / 2
    const middleY = height / 2

    const background = this.add.rectangle(middleX, middleY, width, height, 0x000000)
    background.setDepth(-1)

    this.start()
  }

  async start() {

    const { width, height } = this.scale

    const middleX = width / 2
    const middleY = height / 2

    const buttonFacil = this.add.image(middleX, middleY - 150, 'button')
    buttonFacil.setInteractive()
    this.add.text(middleX, middleY - 153, 'Facil', { fontSize: '32px', color: '#fff', fontFamily: 'Roboto' }).setOrigin(0.5)

    const buttonMedio = this.add.image(middleX, middleY - 50, 'button')
    buttonMedio.setInteractive()
    this.add.text(middleX, middleY - 53, 'Medio', { fontSize: '32px', color: '#fff', fontFamily: 'Roboto' }).setOrigin(0.5)

    const buttonDificil = this.add.image(middleX, middleY + 50, 'button')
    buttonDificil.setInteractive()
    this.add.text(middleX, middleY + 47, 'Dificil', { fontSize: '32px', color: '#fff', fontFamily: 'Roboto' }).setOrigin(0.5)


    buttonFacil.on('pointerdown', () => {
        this.scene.start('WordHunt', { tableSize: 8, qtdPalavras: 3})
        this.scene.stop()
    })
    buttonMedio.on('pointerdown', () => {
        this.scene.start('WordHunt', { tableSize: 10, qtdPalavras: 5})
        this.scene.stop()
    })
    buttonDificil.on('pointerdown', () => {
        this.scene.start('WordHunt', { tableSize: 13, qtdPalavras: 7})
        this.scene.stop()
    })
    this.bg = this.add.sprite(middleX, middleY, 'bg')
    this.bg.scale = 1.3333333
    this.bg.setDepth(-1)

    this.anims.create({
      key: 'bg_anim',
      frames: this.anims.generateFrameNames('bg'),
      frameRate: 8,
      repeat: -1
    })

    this.bg.play('bg_anim')
  }
}