var PUBLIC_KEY = "a9abd52676582389711bcf535629ef07";
var PRIV_KEY = "d3588c414a8ff09ed74a26670885f5bbc9411c7f";

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w'];
var hasImage = [];

var main = document.querySelector('#main');

var enemyWrapper = document.createElement('div');
enemyWrapper.className = "enemy-wrapper";
main.appendChild(enemyWrapper);

var characterWrapper = document.createElement('div');
characterWrapper.className = "character-wrapper";
main.appendChild(characterWrapper);

function renderEnemy(chosenEnemy){
  var enemyContainer = document.createElement('div');
  enemyContainer.className = "enemy-container";
  enemyWrapper.appendChild(enemyContainer);
  var title = document.createElement('h2');
  title.className = 'title';
  title.textContent = chosenEnemy.name;
  enemyContainer.appendChild(title);
  var enemyThumb = document.createElement('img');
  var thumbLink = chosenEnemy.thumbnail.path;
  var thumbExtension = chosenEnemy.thumbnail.extension;
  enemyThumb.src = thumbLink + '/portrait_medium.' + thumbExtension;
  enemyContainer.appendChild(enemyThumb);
  var stats = document.createElement('ul');
  stats.className = "stats";
  enemyContainer.appendChild(stats);
  var health = document.createElement('li');
  health.textContent = 'health: ' + //RANDOMIZED STAT;
  stats.appendChild(health);
  var damage = document.createElement('li');
  damage.textContent = 'damage: ' + //RANDOMIZED STAT;
  stats.appendChild(damage);
  var speed = document.createElement('li');
  speed.textContent = 'speed: ' + //RANDOMIZED STAT;
  stats.appendChild(speed);
}

function generateEnemy(letters){
  var startLetter = letters[Math.floor(Math.random() * alphabet.length)];
  getMarvelEnemy(startLetter);
}

function pathCheck(currentResult){
    var imagePathString = currentResult.thumbnail.path;
    imagePathString = imagePathString.substring(imagePathString.lastIndexOf('/') + 1, imagePathString.length);
    console.log(imagePathString);
    imageCheck(imagePathString, currentResult);
  }

function imageCheck(pathString, currentResult){
  if(pathString != "image_not_available"){
    hasImage.push(currentResult);
  }
}

function buildEnemy(enemyData){
  for (var i = 0; i < enemyData.data.results.length; i++) {
    var currentResult = enemyData.data.results[i];
    pathCheck(currentResult);
    console.log(hasImage);
    }
    renderEnemy(hasImage[Math.floor(Math.random() * hasImage.length)]);
  }



function buildPlayable(data, character){
  var currentCharacter = data.data.results[0];
  var characterContainer = document.createElement('div');
  characterContainer.className = "character-container";
  characterWrapper.appendChild(characterContainer);
  var title = document.createElement('h2');
  title.className = 'title';
  title.textContent = data.data.results[0].name;
  characterContainer.appendChild(title);
  var characterThumb = document.createElement('img');
  var thumbLink = data.data.results[0].thumbnail.path;

  var thumbExtension = data.data.results[0].thumbnail.extension;

  characterThumb.src = thumbLink + '/portrait_medium.' + thumbExtension;
  characterContainer.appendChild(characterThumb);
  var stats = document.createElement('ul');
  stats.className = "stats";
  characterContainer.appendChild(stats);
  var health = document.createElement('li');
  health.textContent = 'health: ' + character.health;
  stats.appendChild(health);
  var damage = document.createElement('li');
  damage.textContent = 'damage: ' + character.damage;
  stats.appendChild(damage);
  var speed = document.createElement('li');
  speed.textContent = 'speed: ' + character.speed;
  stats.appendChild(speed);
  return data.data.results[0];

}

function getMarvelEnemy(char) {

  var ts = new Date().getTime();
  var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url = 'http://gateway.marvel.com:80/v1/public/characters';
  var nameStartsWith = char;

  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    nameStartsWith: nameStartsWith
    })
    .done(function(data) {
      console.log('no problem yet');
      console.log(data);
      buildEnemy(data);
})
.fail(function(err){
  console.log(err);
});
}



function getMarvelResponse(character) {

  var ts = new Date().getTime();
  var hash = md5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url = 'http://gateway.marvel.com:80/v1/public/characters';
  var name = character.name;

  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    name: character.name
    })
    .done(function(data) {
        console.log(data.data.results[0]);
        buildPlayable(data, character);

    })
    .fail(function(err){
      console.log(err);
    });
};

// getMarvelResponse();

var playable = [
  {
    name: "punisher",
    health: 160,
    damage: 200,
    speed: 40
  },
  {
    name: "bishop",
    health: 180,
    damage: 200,
    speed: 20
  },
  {
    name: "quicksilver",
    health: 120,
    damage: 120,
    speed: 160
  },
  {
    name: "luke cage",
    health: 220,
    damage: 140,
    speed: 40
  },
  {
    name: "elektra",
    health: 140,
    damage: 180,
    speed: 80
  },
  {
    name: "longshot",
    health: 100,
    damage: 250,
    speed: 40
  },
  {
    name: "toxin",
    health: 190,
    damage: 140,
    speed: 70
  },
  {
    name: "storm",
    health: 180,
    damage: 180,
    speed: 40
  },
  {
    name: "doctor doom",
    health: 240,
    damage: 150,
    speed: 10
  }];

function generate(array){
  for (var i = 0; i < array.length; i++) {
   getMarvelResponse(array[i]);

 }
}

generate(playable);
