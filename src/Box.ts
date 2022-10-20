import BoxData from "./BoxData"

export default class Box {
    scene: Phaser.Scene
    boxData: BoxData
    x: number
    y: number
    boxColor: number
    container: Phaser.GameObjects.Container
    background: Phaser.GameObjects.Image
    text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, boxColor: number, boxData: BoxData) {
        this.scene = scene
        this.x = x
        this.y = y
        this.boxData = boxData

        if (boxColor==0) this.background = this.scene.add.image(0, 0, 'box')
        if (boxColor==1) this.background = this.scene.add.image(0, 0, 'boxRed')
        this.background.scale = 0.5

        this.text = this.scene.add.text(0, 0, boxData.content)
        this.text.depth = 1

        this.container = this.scene.add.container(
            this.x,
            this.y,
            [this.background, this.text]
        )
    }
    setText(text:string) {
        this.text.text = text
    }
}