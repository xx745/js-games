// Create a Pixi Appli_sition
const app = new PIXI.Application({ 
  width: 500,
  height: 500,
  antialias: true,
});

document.body.appendChild(app.view);

app.stop();

let _sit, _run, state;

PIXI.Loader.shared
  .add('sprites/sit.png')
  .load(setup);

function setup() {
  // 300 x 203
  _sit = new PIXI.Sprite(
    PIXI.Loader.shared.resources['sprites/sit.png'].texture
  );
  
  _sit.x = 100;
  _sit.y = 200;
  _sit.scale.set(0.5, 0.5);
  _sit.vx = 0;
  _sit.vy = 0;

  app.stage.addChild(_sit);

  const left = keyboard("ArrowLeft");
  const up = keyboard("ArrowUp");
  const right = keyboard("ArrowRight");
  const down = keyboard("ArrowDown");

  //Left arrow key `press` method
  left.press = () => {
    //Change the _sit's velocity when the key is pressed
    _sit.vx = -5;
    _sit.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the _sit isn't moving vertically:
    //Stop the _sit
    if (!right.isDown && _sit.vy === 0) {
      _sit.vx = 0;
    }
  };

  //Up
  up.press = () => {
    _sit.vy = -5;
    _sit.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && _sit.vx === 0) {
      _sit.vy = 0;
    }
  };

  //Right
  right.press = () => {
    _sit.vx = 5;
    _sit.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && _sit.vy === 0) {
      _sit.vx = 0;
    }
  };

  //Down
  down.press = () => {
    _sit.vy = 5;
    _sit.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && _sit.vx === 0) {
      _sit.vy = 0;
    }
  };

  state = play;

  //Start the game loop 
  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
}

function play(delta) {
  //Use the _sit's velocity to make it move
  _sit.x += _sit.vx;
  _sit.y += _sit.vy;
}

function keyboard(value) {
  const key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}