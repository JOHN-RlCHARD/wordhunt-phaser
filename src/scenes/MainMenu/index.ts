export default class MainMenu extends Phaser.Scene {
  bg: Phaser.GameObjects.Sprite

    constructor() {
      super('MainMenu')
    }
  
    preload() {
      this.load.audio('phonky_tribu', ['assets/phonky_tribu.mp3'])
      this.load.image('button', 'assets/button.png')
      this.load.spritesheet(
        'buttons', 'assets/buttons.png', {
          frameWidth: 124,
          frameHeight: 40
        }
      )
      this.load.spritesheet('bg', 'assets/spritesheet_bg.png', {
        frameWidth: 640,
        frameHeight: 360
      })
    }
  
    create() {
      var music = this.sound.add('phonky_tribu', {volume: 0.2})
      music.play()

      const camera = this.cameras.main
      const { width, height } = this.scale
  
      const middleX = width / 2
      const middleY = height / 2
  
      const button = this.add.sprite(middleX, middleY-(20*1.2), 'buttons', 0)
      button.scale = 1.6
      button.setInteractive()

      button.on('pointerdown', () => {
        this.scene.start('GameModeSelect')
        this.scene.stop()
      })

      this.bg = this.add.sprite(middleX, middleY, 'bg')
      this.bg.scale = 1.35
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