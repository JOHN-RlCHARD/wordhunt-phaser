export default class Box {
    scene: Phaser.Scene
    letra: string
    x: number
    y: number
    isRandomLetter: boolean
    boxColor: number
    container: Phaser.GameObjects.Container
    background: Phaser.GameObjects.Image
    backgroundCorrect: Phaser.GameObjects.Image
    text: Phaser.GameObjects.Text
    animation: Phaser.GameObjects.Sprite

    //MAKE CLICKABLE
    clickArea: Phaser.GameObjects.Rectangle
    isLocked: boolean
    isSelected: boolean

    constructor(scene: Phaser.Scene, x: number, y: number, letra: string, isRandomLetter: boolean) {
        this.scene = scene
        this.x = x
        this.y = y
        this.isRandomLetter = isRandomLetter
        this.letra = letra

        this.background = this.scene.add.image(0, 0, 'box')
        this.background.scale = 0.645

        this.backgroundCorrect = this.scene.add.image(0, 0, 'boxRed')
        this.backgroundCorrect.scale = 0.645
        this.backgroundCorrect.visible = false

        this.text = this.scene.add.text(-5, -7, letra, { fontFamily: 'Roboto' })
        this.text.setTint(0x000000)

        this.clickArea = this.scene.add.rectangle(0, 0, 40, 40, 0x000000, 0)
        this.clickArea.setInteractive()
        this.isLocked = false

        this.animation = this.scene.add.sprite(0, 0, 'correct')
        this.animation.scale = 0.645
        this.animation.visible = false
        this.animation.setDepth(100)
		
		this.scene.anims.create({
			key: 'correct_anim',
			frames: this.scene.anims.generateFrameNames('correct'),
			frameRate: 12,
			repeat: 0,
		})

        this.container = this.scene.add.container(
            this.x,
            this.y,
            [this.background, this.backgroundCorrect, this.animation, this.text, this.clickArea]
        )
    }

    async select() {
        this.isSelected = true
        this.backgroundCorrect.visible = true
        this.background.visible = false
    }

    async clear() {
        this.isSelected = false
        this.isLocked = false
        this.backgroundCorrect.visible = false
        this.background.visible = true
    }

    setText(text:string) {
        this.text.text = text 
        this.letra = text
        this.isRandomLetter = false
    }
}