export default class MainMenu extends Phaser.Scene {
    constructor() {
      super('MainMenu')
    }
  
    preload() {
      this.load.image('logo', 'assets/prince.jpg')
    }
  
    create() {
      const camera = this.cameras.main
      const { width, height } = this.scale
  
      const middleX = width / 2
      const middleY = height / 2
  
      const button = this.add.rectangle(middleX, middleY - 100, 240, 50, 0x888888, 0.5)
      button.setInteractive()
      this.add.text(middleX, middleY - 100, 'Iniciar', { fontSize: '32px', color: '#fff' }).setOrigin(0.5)
  
      button.on('pointerdown', () => {
        this.scene.start('GameModeSelect')
        this.scene.stop()
      })
    }
  }