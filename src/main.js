import Phaser from 'phaser'

import HelloWorldScene from './HelloWorldScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)
