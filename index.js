class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Quelle méthode Javascript permet de filtrer les éléments d'un tableau", ["indexOf()", "map()", "filter()", "reduce()"], "filter()"),
    new Question("Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau", ["isNaN()","includes()", "findIndex()", "isOdd()"], "includes()"),
    new Question("Quelle méthode transforme du JSON en un objet Javascript ?", ["JSON.parse()","JSON.stringify()", "JSON.object()", "JSON.toJS"], "JSON.parse()"),
    new Question("Quel objet Javascript permet d'arrondir à l'entier le plus proche", ["Math.ceil()","Math.floor()", "Math.round()", "Math.random()"], "Math.round()"),
    new Question("Quelle fonction javascript permet de selectionner la première class sur une liste dans un document html", ["setAttribute()", "querySelector()", "querySelectorAll()", "getElementById()", "getElementByClassName()", "querySelector()"]),
    new Question("Quelle propriété CSS est utilisée pour ajouter l'espace à l'intérieur des éléments", ["margin", "padding", "border", "space"], "padding"),
    new Question("Quelle propriété css est utilisée pour changer la couleur du texte", ["font-color", "text-color", "color", "text-style"], "color"),
    new Question("Quel sélecteur CSS sélectionne un élément avec l'ID :main", ["#main", "main", ".main", "*main"],"#main" ),
    new Question("Quelle méthode est utilisée pour ajouter un élément à la fin d'un tableau", ["push()", "pop()","append()","add()"],"push()" )
  ];
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    startQuiz: function() {
      debutQuizHTML = `
        <h1><span>Q</span>uiz <i class="far fa-question-circle"></i></h1>

      <h2 id="question"></h2>
        
      <h3 id="score"></h3>

      <div class="choices">
        <button id="guess0" class="btn">        
          <p id="choice0"></p>
        </button>

        <button id="guess1" class="btn">
          <p id="choice1"></p>
        </button>
          
        <button id="guess2" class="btn">
          <p id="choice2"></p>
        </button>
          
        <button id="guess3" class="btn">
          <p id="choice3"></p>
        </button>
      </div>

      <p id="progress"></p>

        `;
      this.elementShown("quiz", debutQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();


  //declaration des variables
const boite=document.getElementById("boite_dialogue");
const fermetureBouton=document.getElementById("btn");
const lien = document.getElementById("lien");
const resetBtn = document.getElementById("resetBtn");

//creqtion des evenements
window.addEventListener("load",Affiche);
fermetureBouton.addEventListener("click",Fermer);
lien.addEventListener("click", NePlusAfficher);
resetBtn.addEventListener("click", ReprendreJeu)


//creation des fonctions

/**
 * Fonction pour afficher la boite de dialogue
 */
function Affiche()
{
  if(localStorage.getItem("verificateur", "true")){
    Fermer()
  }
  else{
    boite.showModal();
  }
}
/**
 * Fonction pour fermer la boite de dialogue
 */
function Fermer(){
  boite.showModal();
  boite.close();
}
/**
 * fonction pour ne plus afficher la boite de dialogue
 */
function NePlusAfficher(){
  
  localStorage.setItem("verificateur", "true");
  boite.close();
  
}
/**
 * fonction pour recommencer le jeu
 */
function ReprendreJeu(){
  quiz.score = 0;
  quiz.currentQuestionIndex = 0;
  display.startQuiz();
  quizApp();
}






















  

