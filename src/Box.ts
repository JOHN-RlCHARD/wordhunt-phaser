import BoxData from "./BoxData"

export default class Box {
    scene: Phaser.Scene
    boxData: BoxData
    x: number
    y: number
    isRandomLetter: boolean
    boxColor: number
    container: Phaser.GameObjects.Container
    background: Phaser.GameObjects.Image
    backgroundCorrect: Phaser.GameObjects.Image
    text: Phaser.GameObjects.Text

    //MAKE CLICKABLE
    clickArea: Phaser.GameObjects.Rectangle
    isLocked: boolean

    constructor(scene: Phaser.Scene, x: number, y: number, boxData: BoxData, isRandomLetter: boolean) {
        this.scene = scene
        this.x = x
        this.y = y
        this.boxData = boxData
        this.isRandomLetter = isRandomLetter

        this.background = this.scene.add.image(0, 0, 'box')
        this.background.scale = 0.5

        this.backgroundCorrect = this.scene.add.image(0, 0, 'boxRed')
        this.backgroundCorrect.scale = 0.5
        this.backgroundCorrect.visible = false

        this.text = this.scene.add.text(0, 0, boxData.content)

        this.clickArea = this.scene.add.rectangle(0, 0, 40, 40, 0x000000, 0)
        this.clickArea.setInteractive()
        this.isLocked = false

        this.container = this.scene.add.container(
            this.x,
            this.y,
            [this.background, this.backgroundCorrect, this.text, this.clickArea]
        )
    }

    async select() {
        this.isLocked = !this.isLocked
        this.backgroundCorrect.visible = !this.backgroundCorrect.visible
        this.background.visible = !this.background.visible
    }

    setText(text:string) {
        this.text.text = text 
        this.isRandomLetter = false
    }
}