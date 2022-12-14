import { formatTime } from "../../formatTime"

export default class EndGame extends Phaser.Scene {
    bg: Phaser.GameObjects.Sprite
    tempo: number
    timeText: Phaser.GameObjects.Text
    vitoria: Phaser.GameObjects.Image
    timeString: String
  
    init( data: {tempo: number} ) {
        //this.add.text(300, 160, 'VITÓRIA', {fontFamily: 'Roboto', fontSize: '50px', strokeThickness: 4, stroke: '#4C3641'})
        
        this.timeString = String('SEU TEMPO: '+formatTime(data.tempo))
	    }

    constructor() {
        super('EndGame')
    }

    preload() {

      this.load.image('vitoria', 'assets/vitoria.png')

        this.load.spritesheet('bg', 'assets/spritesheet_bg.png', {
          frameWidth: 640,
          frameHeight: 360
        })
    }
    
      create() {

        const { width, height } = this.scale
    
        const middleX = width / 2
        const middleY = height / 2

        this.vitoria = this.add.image(middleX, middleY, 'vitoria')
        this.vitoria.scale = 0.8

        this.timeText = this.add.text(middleX-150, middleY+40, this.timeString.toString(), {fontFamily: 'Roboto', fontSize: '40px', strokeThickness: 4, stroke: '#4C3641'})
        

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