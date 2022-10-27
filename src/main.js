import Phaser from 'phaser'
import GameModeSelect from './scenes/GameModeSelect'
import MainMenu from './scenes/MainMenu'
import WordHuntGame from './WordHuntGame'

import HelloWorldScene from './WordHuntGame'

const config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 720,
	scene: [MainMenu, GameModeSelect, WordHuntGame],
}

export default new Phaser.Game(config)
