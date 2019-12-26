//////////////////////////////////////////////////////////Bomberman developed by MONTMIRAIL ANTHONY With ACS @ 2019////////////////////////////////////////////////
/////////////////////////////////////////////Définition des variables////////////////////////////////////////////////////

const directions = ["left", "up", "right", "down"];
const bomberman = document.getElementById("bomberman");
const plateau = document.getElementById("plateau");
let liv = document.getElementById("live");
let grille = [];
let tabRotate = [];
let tabEnnemis = [];
let nb_ennemis = 16;
let level = 1;
let px = `${"px"}`;
let itv = 0;
let score = 0;
let point = 0;
let pointNiveau = 100;
let pause = false;
let live = 6;
let speed = 800;
let bonusCmpt = 0;
let deplaceVal = 50;
let setDisplay = false;

///////////////////Définition des options///////////////////
let speeds = document.getElementById("speeds");
let lives = document.getElementById("lives");

speeds.addEventListener("change", e => {
  speed = speeds.value;
});

lives.addEventListener("change", e => {
  live = lives.value;
  liv.innerHTML = lives.value;
});
/////////////////////////////////////////////////////////////
//Constructeur d'ennemi
class Phantom {
  constructor(top, left, width, height, position, img) {
    this.element = document.createElement("div");
    this.top = top + px;
    this.left = left + px;
    this.width = width + px;
    this.height = height + px;
    this.position = position;
    this.element.setAttribute(
      "style",
      `top:${this.top}; left:${this.left}; width:${this.width}; height:${this.height}; position:${this.position}`
    );
    this.element.innerHTML = img;
  }
  ennem() {
    return this.element;
  }
}
//Affichage du passage de Level
class displayLevel {
  constructor(niveau) {
    //Je défini les constantes
    this.niveau = niveau;
    const message = document.getElementById("message");
    const dispLevel = document.getElementById("displayLevel");
    dispLevel.innerHTML = `${this.niveau}`;
    //J'affiche le message du changement de level
    message.innerHTML = `<div class="message">Niveau ${this.niveau}</div>`;
    //Je retire le message au bout de 3secondes
    setTimeout(() => {
      message.innerHTML = "";
    }, 8000);
  }
}
const tabLevel = [
  //Tableau qui détermine les Levels
  [0, 0],
  [50, 50],
  [650, 650],
  [650, 50],
  [50, 650],
  [350, 50],
  [350, 650],
  [50, 350],
  [650, 350],
  [200, 500],
  [500, 200],
  [200, 200],
  [500, 500],
  [350, 350],
  [200, 50],
  [500, 650],
  [200, 650],
  [500, 50],
  [50, 200],
  [650, 500],
  [50, 500],
  [650, 200],
  [50, 50],
  [650, 650],
  [650, 50],
  [50, 650],
  [50, 350],
  [650, 350],
  [350, 50],
  [350, 650],
  [200, 200],
  [500, 500],
  [200, 500],
  [500, 200]
];

(() => {
  levelStage(level);
  btnStart();
  liv.innerHTML = "Vie: " + " " + live;
  setting();
})();

function levelStage() {
  let levelstage = new displayLevel(level);
   live++;
   speed += 50;
   pointNiveau += 20;
   displayLevel.innerHTML = levelstage

  //Chaque case est un level, appelant le remplissage du tableau selon un certain nombres d'ennemi
  //J'ajoute une vie a chaque passage de level
  //j'augmente la vitesse de déplacement des ennemis a chaque level
  switch (level) {
    case 1:
      nb_ennemis = 16;
      remplirTabEnnemis();
      break;
    case 2:
      nb_ennemis = 24;
      remplirTabEnnemis();
      break;
    case 3:
      nb_ennemis = 32;
      remplirTabEnnemis();
      break;
    case 4:
      nb_ennemis = 40;
      remplirTabEnnemis();
      break;
    case 5:
      nb_ennemis = 48;
      remplirTabEnnemis();
      break;
    case 6:
      nb_ennemis = 60;
      remplirTabEnnemis();
      break;
    case 7:
      nb_ennemis = 68;
      remplirTabEnnemis();
      break;
    case 8:
      nb_ennemis = 76;
      remplirTabEnnemis();
      break;
    case 9:
      nb_ennemis = 84;
      remplirTabEnnemis();
      break;
    case 10:
      nb_ennemis = 92;
      remplirTabEnnemis();
      break;
    case 11:
      nb_ennemis = 100;
      remplirTabEnnemis();
      break;
    case 12:
      nb_ennemis = 108;
      remplirTabEnnemis();
      break;
    case 13:
      nb_ennemis = 116;
      remplirTabEnnemis();
      break;
    case 14:
      nb_ennemis = 124;
      remplirTabEnnemis();
      break;
    case 15:
      nb_ennemis = 132;
      remplirTabEnnemis();
      break;
  }
}
function set(){
  //Si le bouton setting est cliqué en passe le boléan a true et appel la fonction btnPause
  setDisplay = true;
  btnPause();
}
function setting() {
  //Affichage du bouton setting
  const set = document.getElementById("setting");
  set.innerHTML =
    '<button type="button" class="button" onclick="set()">Paramètres</button>';
}
function btnPause() {
  const displaySet = document.getElementById("settings");
  const set = document.getElementById("setting");
  const btn = document.getElementById("btn");
  //Si le bouton setting est cliqué on mets en pause et affiche les options
  if (displaySet.style.display === "none" && setDisplay === true) {
    set.innerHTML =
      '<button type="button" class="button" onclick="btnStart()">Reprendre</button>';
    displaySet.style.display = "block";
    //Le boléan repasse a false
    setDisplay = false;
  } else {
  // Sinon c'est le bouton mise en pause qui est déclancher et on change son contenu
  btn.innerHTML =
    '<button type="button" class="button" onclick="btnStart()">Démarrer</button>';
  }
  //dans les deux cas on mets en pause 
  clearInterval(itv);
  //j'initailise le compteur pour setInterval
  itv = 0;
  //je change ma variable pause
  pause = false;
}
function btnStart() {
  const btn = document.getElementById("btn");
  const set = document.getElementById("setting");
  const displaySet = document.getElementById("settings");

  if (displaySet.style.display === "block") {
    set.innerHTML =
      '<button type="button" class="button" onclick="set()">Paramètres</button>';
    displaySet.style.display = "none";
  } else {
    btn.innerHTML =
      '<button type="button" class="button" onclick="btnPause()">Pause</button>';
  }
  //si je clic je démarre
  if (pause == false) {
    itv = setInterval(start, speed);
    //je change ma variable pause
    pause = true;
  }
}
function restart() {
  //Je crée un élément div
  let btn = document.createElement("div");
  //Je lui ajoute une class flex
  btn.classList.add("btnFlex");
  //j'y introduit un btn
  btn.innerHTML =
    '<button type="button" id="btnStart" class="button" onclick="document.location.reload()">Recommencer</button>';
  //J'ajoute mon élément
  document.getElementById("btnRestart").appendChild(btn);
}
function rotation_48_a_132(x, top, left, rotate) {
  //je switch et place autour de mon ennemi référents 4 autres ennemis
  switch (rotate) {
    case 0:
      top -= x;
      left = left;
      break;
    case 1:
      top += x;
      left = left;
      break;
    case 2:
      top = top;
      left -= x;
      break;
    case 3:
      top = top;
      left += x;
      break;
  }
  //Je remplis tabRotate des 4 positions des ennemis
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      tabRotate[i] = top;
    } else if (i === 1) {
      tabRotate[i] = left;
    }
  }
}
function rotation_8_a_48(x, top, left, rotate) {
  //je switch et place autour de mon ennemi référents 4 autres ennemis
  switch (rotate) {
    case 0:
      top += x;
      left += x;
      break;
    case 1:
      top -= x;
      left -= x;
      break;
    case 2:
      top -= x;
      left += x;
      break;
    case 3:
      top += x;
      left -= x;
      break;
  }
  //Je remplis tabRotate des 4 positions des ennemis
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      tabRotate[i] = top;
    } else if (i === 1) {
      tabRotate[i] = left;
    }
  }
}
function remplirTabEnnemis() {
  let img;
  //Compteur pour le tableau Level
  let a = 0;
  //Opérer un choix de position dans le Switch rotation
  let b = 0;
  //Valeur de référence pour calculer un emplacement dans les fonctions Rotation
  let x = 50;
  for (let i = 0; i < nb_ennemis; i++) {
    //Je crée un tableau qui contiendra des tableaux a deux position
    grille[i] = new Array();
    //Tous les 4 ennemis j'interoge le tabLevel pour définir une position de mon ennemi référent
    if (i % 4 === 0) {
      //Tous les 4 ennemis je réinitialise la variable pour la rotation
      b = 0;
      //J'incrémente la variable (a) tous les 4 ennemis pour chercher les valeurs de positionnement dans le tabLevel
      a++;
    }
    if (i < 48) {
      //Jusqu'à 48 ennemis
      //Je transmet a la fonction rotate les valeurs auxquelles des quels il faut placé les positions ennemis
      rotation_8_a_48(x, tabLevel[a][0], tabLevel[a][1], b);
    } else if (i >= 48 && i < 52) {
      //de 48 à 52 ennemis
      x = 150;
      rotation_48_a_132(x, tabLevel[a][0], tabLevel[a][1], b);
    } else {
      //de 52 a 132 ennemis
      x = 50;
      rotation_48_a_132(x, tabLevel[a][0], tabLevel[a][1], b);
    }
    if (
      (i === 16 || i === 32 || i === 64 || i === 128) &&
      (i % 16 === 0 || i % 32 === 0 || i % 64 === 0 || i === 128)
    ) {
      img =
        '<img id="' + i + '" class="sizeImg" src="assets/sprit/sprit2.png">';
      bonusCmpt++;
    } else {
      img = '<img id="' + i + '" class="sizeImg" src="assets/sprit/sprit.png">';
    }
    for (let j = 0; j < 1; j++) {
      //Je créer des tableaux a deux positions
      grille[i][j] = new Array(2);
      //Je remplis les tableaux des valeurs retourné par les fonctions Rotation
      grille[i][j][0] = tabRotate[0];
      grille[i][j][1] = tabRotate[1];
      //Je transmets ces valeurs a ma Classe Phantom pour créer les nouveaux ennemis
      ennemi = new Phantom(
        grille[i][j][0],
        grille[i][j][1],
        "50",
        "50",
        "absolute",
        img
      );
      //J'ajoute mes nouveaux ennemis a un nouveau tableau pour les déplacés
      tabEnnemis[i] = ennemi.ennem();
      //J'ajoute ces nouveaux ennemis au plateau de jeu
      plateau.appendChild(tabEnnemis[i]);
      //j'incrémente cette variable pour permettre la rotation de positionnement
      b++;
    }
  }
}
function start() {
  //je boucle sur le tableau des ennemis
  for (let i = 0; i < tabEnnemis.length; i++) {
    //une direction est choisis selon le numéro tiré au sort par son index de position et le retour
    //de la function searchAleatory
    let selectDirection = directions[searchAleatory(3, 0)];
    //personnage par personnage je transmet une direction
    deplacer(tabEnnemis[i], selectDirection);
  }
}
function gameover() {
  let message = document.getElementById("gameover");
  plateau.innerHTML = "";

  message.innerHTML = '<div class="gameover">Oups...Game over !!!</div>';
  setTimeout(() => {
    message.innerHTML = "";
  }, 8000);

  restart();
}
function touchEnnemi() {
  //je récupère la position de bomberman
  const bombermanLeft = indiqueProprieter(bomberman, "left");
  const bombermanTop = indiqueProprieter(bomberman, "top");

  for (let i = 0; i < tabEnnemis.length; i++) {
    //je récupère la position de tous les ennemis
    const pos_left_ennemis = indiqueProprieter(tabEnnemis[i], "left");
    const pos_top_ennemis = indiqueProprieter(tabEnnemis[i], "top");
    //je vérifie s'il y'a colision
    if (
      bombermanLeft >= pos_left_ennemis &&
      bombermanLeft <= pos_left_ennemis &&
      bombermanTop >= pos_top_ennemis &&
      bombermanTop <= pos_top_ennemis
    ) {
      //Je retir une vie a chaque fois que bomberman touche un ennemi
      live--;
      //Affichage du nouveau nombre de vie
      liv.innerHTML = "Vie " + " " + live;
      //Si plus de vie Game Over
      if (live === 0) {
        gameover();
      }
    }
  }
}
function bonusPhantom(bonus) {
  switch (bonus) {
    case 0:
      //id bonnus 1 a partir de 16 phatom
      return document.getElementById("16");
    case 1:
      //id bonnus 1 a partir de 32 phatom
      return document.getElementById("32");
    case 2:
      //id bonnus 1 a partir de 64 phatom
      return document.getElementById("64");
    case 3:
      //id bonnus 1 a partir de 128 phatom
      return document.getElementById("128");
  }
}
function detectExplosion(stage) {
  let displayScore = document.getElementById("displayScore");
  const message = document.getElementById("message");
  for (let i = 0; i < tabEnnemis.length; i++) {
    //je récupère la position de tous les ennemis
    const pos_left_ennemis = indiqueProprieter(tabEnnemis[i], "left");
    const pos_top_ennemis = indiqueProprieter(tabEnnemis[i], "top");
    if (
      pos_left_ennemis >= parseInt(stage.style.left) - 12.5 &&
      pos_left_ennemis <= parseInt(stage.style.left) &&
      pos_top_ennemis >= parseInt(stage.style.top) - 12.5 &&
      pos_top_ennemis <= parseInt(stage.style.top)
    ) {
      //je retire l'ennemi du plateau
      plateau.removeChild(tabEnnemis[i]);
      tabEnnemis.splice(i, 1);
      //Je vérifie si l'ennemis était un bonus
      for (let j = 0; j < bonusCmpt; j++) {
        let element;
        //J'interoge la fonction bonusPhantom pour voir sir j'ai touché un id bonus
        element = bonusPhantom(j);
        if (element == null) {
          //Si l'élément n'existe plus je gagne des point en plus
          message.innerHTML = '<div class="message">Point Bonus</div>';
          score += 4;
          setTimeout(() => {
            message.innerHTML = "";
          }, 400);
        }
      }
      score++;
      //je multiplie le point en fonction du niveau (+ 100 par niveau)
      point = score * pointNiveau;
      //j'affiche le score
      displayScore.innerHTML = point;
      if (tabEnnemis.length === 0) {
        displayLevel(level + 1);
        setTimeout(() => {
          level++;
          levelStage(level);
        }, 8000);
      }
    }
  }
}
function explosion(stage) {
  setTimeout(() => {
    //j'ajoute la class exp
    stage.classList.add("spawn");
    //je retire la classe de la bombelosion
    stage.classList.remove("bombe");
    //j'ajoute la div explosion
    stage.innerHTML = '<div class="spawn" >💥</div>';
    //je vérifie si l'explosion touche un ennemi
    detectExplosion(stage);
    setTimeout(() => {
      //je fais disparaitre l'explosion
      stage.style.display = "none";
      plateau.removeChild(stage);
    }, 1000);
  }, 2000);
}
function poserBombe(bomberman) {
  //je créer une bombe
  const bombe = '<div class="bombe"></div>';
  //je demande la position de bomberman
  const pos_left_person = indiqueProprieter(bomberman, "left");
  const pos_top_person = indiqueProprieter(bomberman, "top");
  //je créer un container pour le style de ma bombe
  let stage = document.createElement("div");
  //je lui attribut une class de style
  stage.setAttribute("class", "stage");
  //je concatainise ma bombe a son container
  stage.innerHTML = bombe;
  //je lui indique la position de bomberman
  stage.style.left = pos_left_person + 12.5 + px;
  stage.style.top = pos_top_person + 12.5 + px;
  //je l'affiche
  stage.style.display = "block";
  //le l'intègre au plateau
  plateau.appendChild(stage);
  explosion(stage);
}
function indiqueProprieter(personnage, proprieter) {
  //je récupére la valeur de la propriété demander, pour le personnage demander
  let val = window.getComputedStyle(personnage).getPropertyValue(proprieter);
  //je force a convertir la chaine en nombre
  return parseInt(val);
}
function colision(ennemiI) {
  //je crée une div alert aieeeee
  let aie = document.createElement("div");
  //je lui ajoute une class
  aie.classList.add("aie");
  //j'ajoute un message
  aie.innerHTML = "aie!!!";
  //je l'affiche
  ennemiI.appendChild(aie);
  //je le retire après 3/10eme de seconde
  setTimeout(() => {
    //je retire le message
    ennemiI.removeChild(aie);
  }, 300);
}

function colisionEnnemi(direction, position, position2) {
  for (let i = 0; i < tabEnnemis.length; i++) {
    //je récupère la position de tous les ennemis
    const pos_left_ennemis = indiqueProprieter(tabEnnemis[i], "left");
    const pos_top_ennemis = indiqueProprieter(tabEnnemis[i], "top");

    if (direction == "left") {
      if (pos_left_ennemis == position && position2 == pos_top_ennemis) {
        colision(tabEnnemis[i]);
      }
    } else if (direction == "up") {
      if (pos_top_ennemis == position && position2 == pos_left_ennemis) {
        colision(tabEnnemis[i]);
      }
    } else if (direction == "right") {
      if (pos_left_ennemis == position && position2 == pos_top_ennemis) {
        colision(tabEnnemis[i]);
      }
    } else if (direction == "down") {
      if (pos_top_ennemis == position && position2 == pos_left_ennemis) {
        colision(tabEnnemis[i]);
      }
    }
  }
}
function deplacer(personnage, direction) {
  //je récupére la position actuel du personnage(joueur ou ennemis)
  const pos_left_person = indiqueProprieter(personnage, "left");
  const pos_top_person = indiqueProprieter(personnage, "top");
  //suivant la direction tiré au hasard
  switch (direction) {
    case "left":
      //si le personnage n'est pas deja tout a gauche
      if (pos_left_person > 0) {
        colisionEnnemi(direction, pos_left_person - deplaceVal, pos_top_person);
        //je deplace le personnage vers la gauche
        personnage.style.left = pos_left_person - deplaceVal + px;
      }
      break;
    case "up":
      //si le personnage n'est pas deja tout en haut
      if (pos_top_person > 0) {
        colisionEnnemi(direction, pos_top_person - deplaceVal, pos_left_person);
        //je deplace le personnage vers le haut
        personnage.style.top = pos_top_person - deplaceVal + px;
      }
      break;
    case "right":
      //si le personnage n'est pas deja tout a droite
      if (pos_left_person < 700) {
        colisionEnnemi(direction, pos_left_person + deplaceVal, pos_top_person);
        //je deplace le personnage vers la droite
        personnage.style.left = pos_left_person + deplaceVal + px;
      }
      break;
    case "down":
      //si le personnage n'est pas deja tout en bas
      if (pos_top_person < 700) {
        colisionEnnemi(direction, pos_top_person + deplaceVal, pos_left_person);
        //je deplace le personnage vers le bas
        personnage.style.top = pos_top_person + deplaceVal + px;
      }
      break;
  }
}
document.onkeyup = event => {
  //je récupère l'évennement saisie au clavier
  event = event || window.event;
  //j'appel le selecteur de déplacement
  action(event);
};

function action(event) {
  event = event || window.event;

  switch (event.keyCode) {
    //en fonction du code clavier je déplace mon personnage principale
    case 37:
      deplacer(bomberman, "left");
      break;
    case 38:
      deplacer(bomberman, "up");
      break;
    case 39:
      deplacer(bomberman, "right");
      break;
    case 40:
      deplacer(bomberman, "down");
      break;
    case 32:
      poserBombe(bomberman);
      break;
  }
  //j'appel la fonction qui vérifie s'il y'a colision entre bomberman et les ennemis
  touchEnnemi();
}

function searchAleatory(max, min) {
  //tirage au sort d'un numéro entre 3 et 0 pour choisir une direction
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
