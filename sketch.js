const VIEW_W = 800;
const VIEW_H = 480;

let allLevelsData;
let levelIndex = 0;

let level;
let player;
let cam;

// Coins
let coins = [];
const NUM_COINS = 15;

function preload() {
  allLevelsData = loadJSON("levels.json");
}

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");
  textSize(14);

  cam = new Camera2D(width, height);
  loadLevel(levelIndex);
}

function loadLevel(i) {
  level = LevelLoader.fromLevelsJson(allLevelsData, i);

  player = new BlobPlayer();
  player.spawnFromLevel(level);

  cam.x = player.x - width / 2;
  cam.y = 0;
  cam.clampToWorld(level.w, level.h);

  spawnCoins();
}

// Spawn coins on random platforms
function spawnCoins() {
  coins = [];
  for (let i = 0; i < NUM_COINS; i++) {
    let p = random(level.platforms);
    let x = random(p.x + 10, p.x + p.w - 10);
    let y = p.y - 10;
    coins.push({ x, y, r: 10 });
  }
}

function draw() {
  player.update(level);

  // Fall death → respawn
  if (player.y - player.r > level.deathY) {
    loadLevel(levelIndex);
    return;
  }

  // Camera
  cam.followSideScrollerX(player.x, level.camLerp);
  cam.y = 0;
  cam.clampToWorld(level.w, level.h);

  cam.begin();
  level.drawWorld();

  // Draw coins
  fill("#FFD700");
  noStroke();
  for (let c of coins) ellipse(c.x, c.y, c.r * 2);

  // Collect coins
  for (let i = coins.length - 1; i >= 0; i--) {
    let c = coins[i];
    let d = dist(player.x, player.y, c.x, c.y);
    if (d < player.r + c.r) {
      coins.splice(i, 1);
      // Respawn on random platform
      let p = random(level.platforms);
      let x = random(p.x + 10, p.x + p.w - 10);
      let y = p.y - 10;
      coins.push({ x, y, r: 10 });
    }
  }

  player.draw();
  cam.end();

  // HUD
  fill(0);
  noStroke();
  text(level.name + " (Example 5)", 10, 18);
  text("A/D or ←/→ move • Space/W/↑ jump • Fall = respawn", 10, 36);
  text("Coins: " + coins.length, 10, 54);
}

function keyPressed() {
  if (key === " " || key === "W" || key === "w" || keyCode === UP_ARROW) {
    player.tryJump();
  }
  if (key === "r" || key === "R") loadLevel(levelIndex);
}
