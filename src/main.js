import Phaser from 'phaser'
import EndGame from './scenes/EndGame'
import GameModeSelect from './scenes/GameModeSelect'
import MainMenu from './scenes/MainMenu'
import WordHuntGame from './WordHuntGame'

const config = {
	type: Phaser.AUTO,
	width: 854,
	height: 480,
	scene: [MainMenu, GameModeSelect, WordHuntGame, EndGame],
}

export default new Phaser.Game(config)
