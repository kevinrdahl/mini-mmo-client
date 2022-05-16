import config from './config';
import MMOGame from './MMOGame';
import MenuScene from './scenes/MenuScene';
import PlayScene from './scenes/PlayScene';

new MMOGame(
  Object.assign(config, {
    scene: [MenuScene, PlayScene]
  })
);
