isAutoPlaying = true ;
console.log(isAutoPlaying);
console.log(!isAutoPlaying);
let intervalId ;

let buttonElement3 = document.querySelector('.auto-play-button');
buttonElement3.addEventListener('click', () => {
  autoPlay();
});

function autoPlay(){
  let autoPlayButtonElement = document.querySelector('.auto-play-button');
  if(!isAutoPlaying ){
    autoPlayButtonElement.innerText = 'Stop';

    intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true ;
  } else{
    autoPlayButtonElement.innerText = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

//for reset the score
let buttonElement4 = document.querySelector('.reset-score-button');
buttonElement4.addEventListener('click', () => {
  score.wins = 0;
  score.tie = 0;
  score.lose = 0 ;
  localStorage.removeItem('score');
  updateScoreElement();
});

// object created

// const score ={
//   wins : 0,
//   lose : 0,
//   tie : 0  
// };


let score = JSON.parse(localStorage.getItem('score')) || {wins : 0,lose : 0, tie : 0};

// function for update score
updateScoreElement();

//Using EventListner instead of onclick="";
let buttonElement = document.querySelector('.js-rock-button');
buttonElement.addEventListener('click', () => {
  playGame('Rock');
});

let buttonElement1 = document.querySelector('.js-paper-button');
buttonElement1.addEventListener('click', () => {
  playGame('Paper')
});

let buttonElement2 = document.querySelector('.js-scissor-button');
buttonElement2.addEventListener('click', () => {
  playGame('Scissor')
})

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's'){
    playGame('Scissor');
  } else if(event.key === 'a'){
    autoPlay();
  }
})

function playGame(playerMove){ 

  const computerMove = pickComputerMove(); 
  let result = '';

  if(playerMove === 'Scissor'){
    if(computerMove === 'Rock'){
      result = 'You Lose';
    } else if(computerMove === 'Paper'){
      result = 'You Win';
    } else if(computerMove === 'Scissor'){
      result = 'Tie';
    }
  } else if(playerMove === 'Paper'){
      if(computerMove === 'Rock'){
        result = 'You Win';
      } else if(computerMove === 'Paper'){
        result = 'Tie';
      } else if(computerMove === 'Scissor'){
        result = 'You Lose';
      }
   
    } else if(playerMove === 'Rock'){
      if(computerMove === 'Rock'){
        result = 'Tie';
      } else if(computerMove === 'Paper'){
        result = 'You Lose';
      } else if(computerMove === 'Scissor'){
        result = 'You Win';
      } 
    }

  if(result === 'You Win'){
      score.wins += 1;
  } else if(result === 'You Lose'){
      score.lose += 1;
  }else if(result === 'Tie'){
      score.tie += 1;
  }

  //result save in local storage and convt obj to string.
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  //calling for show result
  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You Choosed
  <img src="${playerMove}-emoji.png" class="btn-2box">
  <img src="${computerMove}-emoji.png" class="btn-2box">
   Choosed By Computer`;

}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `wins : ${score.wins}. lose : ${score.lose}. Ties :${score.tie}`;
}

function pickComputerMove(){
  let computerMove = '';

  const randomNumber = Math.random();
 
  if(randomNumber >=0 && randomNumber <= 1/3){
    computerMove = 'Rock';
  } else if(randomNumber >=1/3 && randomNumber <=2/3){
     computerMove = 'Paper';
  } else if(randomNumber >=2/3 && randomNumber <=1){
     computerMove = 'Scissor';
  }
  
  return computerMove;
}
