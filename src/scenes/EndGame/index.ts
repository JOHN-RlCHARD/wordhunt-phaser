import { formatTime } from "../../formatTime"

export default class EndGame extends Phaser.Scene {
    bg: Phaser.GameObjects.Sprite
    tempo: number
    timeText: Phaser.GameObjects.Text
  
    init( data: {tempo: number} ) {
        this.add.text(600-150, 360-100, 'VITÓRIA', {fontFamily: 'Roboto', fontSize: '50px', strokeThickness: 4, stroke: '#4C3641'})
        this.timeText = this.add.text(600-150, 360-25, 'SEU TEMPO: '+formatTime(data.tempo), {fontFamily: 'Roboto', fontSize: '30px', strokeThickness: 4, stroke: '#4C3641'})
	    }

    constructor() {
        super('EndGame')
    }

    preload() {
        this.load.spritesheet('bg', 'assets/spritesheet_bg.png', {
            frameWidth: 1280,
            frameHeight: 720
        })
    }
    
      create() {

        const { width, height } = this.scale
    
        const middleX = width / 2
        const middleY = height / 2
  
        this.bg = this.add.sprite(middleX, middleY, 'bg')
        this.bg.scale = 1
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