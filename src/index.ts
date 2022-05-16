import Phaser from 'phaser';
import config from './config';
import MenuScene from './scenes/MenuScene';
import PlayScene from './scenes/PlayScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [MenuScene, PlayScene]
  })
);
