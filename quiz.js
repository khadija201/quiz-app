
// quiz app!

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf2HRlfK_Rkr06edpUpfeB03hoXTmpyP0",
  authDomain: "quiz-app-d4151.firebaseapp.com",
  projectId: "quiz-app-d4151",
  databaseURL: "https://quiz-app-d4151-default-rtdb.firebaseio.com",
  storageBucket: "quiz-app-d4151.appspot.com",
  messagingSenderId: "571450421942",
  appId: "1:571450421942:web:ec6853c227f50a858f2c17",
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// Reference to the quiz questions in the database
var questionsRef = firebase.database().ref("quiz/questions/");

var questions;

// Fetch questions data
questionsRef
  .once("value")
  .then(function (snapshot) {
    var quiz = snapshot.val();
    console.log("Quiz Questions: ", quiz.questions);
    questions = quiz.questions;
    nextQuestion()
    // displayQuiz(quiz.questions);
  })
  .catch(function (error) {
    console.error("Error fetching quiz questions: ", error);
  });

// var quiz = {
//   questions,
// };
// firebase.database().ref("quiz/questions/").set(quiz);

var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById("timer");
var index = 0;
var score = 0;
var min = 1;
var sec = 29;

var interval = setInterval(function () {
  timer.innerHTML = `${min}:${sec}`;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}, 100);

function nextQuestion() {
  var getOptions = document.getElementsByName("option");

  for (var i = 0; i < getOptions.length; i++) {
    if (getOptions[i].checked) {
      var selectedAns = getOptions[i].value;
      //   var selectedQues = questions[index - 1].question;
      var selectedOpt = questions[index - 1][`option${selectedAns}`];
      var correctAns = questions[index - 1]["corrAnswer"];

      if (selectedOpt == correctAns) {
        score++;
      }
    }

    getOptions[i].checked = false;
  }
  btn.disabled = true;

  if (index > questions.length - 1) {
    Swal.fire({
      title: "Good job! your percentage is..",
      text: ((score / questions.length) * 100).toFixed(2),
      icon: "success",
    });
    clearInterval(interval);
  } else {
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    index++;
    min = 1;
    sec = 29;
  }
}

function target() {
  btn.disabled = false;
}

// var questions = [
//   {
//     question: "Q: HTML Stands for",
//     option1: "Hyper Text Markup Language",
//     option2: "Hyper Tech Markup Language",
//     option3: "Hyper Touch Markup Language",
//     corrAnswer: "Hyper Text Markup Language",
//   },
//   {
//     question: "Q: CSS Stands for",
//     option1: " Cascoding Style Sheets",
//     option2: "Cascading Style Sheets",
//     option3: "Cascating Style Sheets",
//     corrAnswer: "Cascading Style Sheets",
//   },
//   {
//     question: "Q: Which tag is used for most large heading",
//     option1: "<h6>",
//     option2: "<h2>",
//     option3: "<h1>",
//     corrAnswer: "<h1>",
//   },
//   {
//     question: "Q: Which tag is used to make element unique ",
//     option1: "id",
//     option2: "class  ",
//     option3: "label",
//     corrAnswer: "id",
//   },
//   {
//     question: "Q: Any element assigned with id, can be get in css ",
//     option1: "by # tag",
//     option2: "by @ tag",
//     option3: "by & tag",
//     corrAnswer: "by # tag",
//   },
//   {
//     question: "Q: CSS can be used with ______ methods ",
//     option1: "8",
//     option2: "3",
//     option3: "4",
//     corrAnswer: "3",
//   },
//   {
//     question: "Q: In JS variable types are ____________ ",
//     option1: "6",
//     option2: "3",
//     option3: "8",
//     corrAnswer: "8",
//   },
//   {
//     question: "Q: In array we can use key name and value ",
//     option1: "True",
//     option2: "False",
//     option3: "None of above",
//     corrAnswer: "False",
//   },
//   {
//     question: "Q:toFixed() is used to define length of decimal ",
//     option1: "True",
//     option2: "False",
//     option3: "None of above",
//     corrAnswer: "True",
//   },
//   {
//     question: "Q: push() method is used to add element in the start of array ",
//     option1: "True",
//     option2: "False",
//     option3: "None of above",
//     corrAnswer: "False",
//   },
// ];



