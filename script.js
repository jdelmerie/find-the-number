let random;
let introMsg = document.getElementById("introMsg");
let result = document.getElementById("result");
let input = document.getElementById("userNb");
let chance = document.getElementById("chance");
let validate = document.getElementById("validate");
let getNb = document.getElementById("getNb");
let playbox = document.getElementById("playbox");
let selectLevel = document.getElementById("submit");
let levelChoiceBlock = document.getElementById("levelChoice");
let letter = 0;
let title = "Find The Number";
getNb.style.visibility = "hidden";
let life = 0;
function showGenerateNumber(){
    let level = document.getElementById("levels").value;
    switch(level) {
        case "Facile":
          life = 15;
          break;
        case "Moyen":
          life = 10;
          break;
        case "Difficile":
          life = 5;
          break;
        default:
          // code block
    }

    levelChoiceBlock.style.visibility = "hidden";
    introMsg.innerHTML = "Vous êtes sur un niveau <strong style='color:orange;'>"+ level+"</strong> <br> Vous avez <strong style='color:orange;'>"+ life+"</strong> tentatives à jouer"
    getNb.style.visibility = "visible";
    levelChoiceBlock.replaceWith(getNb); 
}


getNb.addEventListener("click", () => {
    random = Math.floor(Math.random() * 100) + 1;
    playbox.classList.replace("hide", "show");
    getNb.disabled = true;
});

getNb.addEventListener("click", play)

function play() {

    let gameDone = 0;
    let reset = "Appuyez sur la touche Echap pour rejouer"
    
    document.body.addEventListener("keydown", function (e) {
        let userNb = input.value
        let x = parseInt(userNb); // numéro saisi
        let y = random // numéro aléatoire

        if (e.key === "Enter") {
            if (isNaN(userNb) || userNb === "") {
                error("Veuillez saisir un nombre !");
                input.value = ""
            } else if (userNb < 1 || userNb > 100) {
                error("Veuillez saisir un nombre compris en 1 et 100 !")
                input.value = ""
            } else if (x < y) {
                error("C'est plus !")
                life -= 1;
                input.value = ""
            } else if (x > y) {
                error("C'est moins !")
                life -= 1;
                input.value = ""
            } else if (x === y) {
                input.disabled = true
                win(`C'est gagné, bien joué ! <br> ${reset}`)
                replay()
            }

            chance.innerHTML = `Il vous reste ${life} tentatives`

            if (life == gameDone) {
                error(`GAME OVER<br>Il fallait trouver ${random}<br>${reset}`)
                input.disabled = true;
                chance.innerHTML = ""
                replay();
            }
        }
        replay()
    });
}

function error(text) {
    result.style.color = "red"
    result.style.fontWeight = "bold"
    result.innerHTML = text
}

function win(text) {
    result.style.color = "green"
    result.style.fontWeight = "bold"
    result.style.fontSize = "20px"
    result.innerHTML = text
}

function reset(timeUp) {
    setTimeout("location.reload(true);", timeUp);
}

function replay() {
    document.body.addEventListener("keydown", function (e) {
        if (e.key == "Escape") {
            window.onload = reset(500);
        }
    })
}



function animateTitle() {
    if (letter < title.length) {
        document.getElementById("title").innerHTML += title.charAt(letter);
        letter++;
        setTimeout(animateTitle, 50)
    }
}
window.addEventListener("load", animateTitle)
