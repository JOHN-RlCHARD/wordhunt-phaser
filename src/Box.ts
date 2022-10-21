import BoxData from "./BoxData"

export default class Box {
    scene: Phaser.Scene
    boxData: BoxData
    x: number
    y: number
    boxColor: number
    container: Phaser.GameObjects.Container
    background: Phaser.GameObjects.Image
    backgroundCorrect: Phaser.GameObjects.Image
    text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, boxData: BoxData) {
        this.scene = scene
        this.x = x
        this.y = y
        this.boxData = boxData

        this.background = this.scene.add.image(0, 0, 'box')
        this.background.scale = 0.5

        this.backgroundCorrect = this.scene.add.image(0, 0, 'boxRed')
        this.backgroundCorrect.scale = 0.5
        this.backgroundCorrect.visible = false

        this.text = this.scene.add.text(0, 0, boxData.content)

        this.container = this.scene.add.container(
            this.x,
            this.y,
            [this.background, this.backgroundCorrect, this.text]
        )
    }
    setText(text:string) {
        this.text.text = text 
        this.setCorrect()
    }

    setCorrect() {
        this.background.visible = false
        this.backgroundCorrect.visible = true
    }
}