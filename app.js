/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var roundScore, scores, activePlayer , gamePlaying , counter, previousRoll, currentRoll, submitBtn,winscore;
counter = 0;
lastRoll = 0;

init();


document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
 // 1. Random number
    var  dice1 = Math.floor(Math.random() * 6) +1;
    var  dice2 = Math.floor(Math.random() * 6) +1;
//     // 2. display the result
   var diceDom1 = document.querySelector('.dice-1');
   var diceDom2 = document.querySelector('.dice-2');
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom1.src = 'dice-' + dice1 + '.png'; 
    diceDom2.src = 'dice-' + dice2 + '.png'; 
    //3. update roundscore IF rolled number was NOT a 1
     if(dice1 == 1 && dice2 == 1){
         // add score
        
       nextPlayer();
     }else{
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
     }
     }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    document.querySelector('.btn-submit').addEventListener('click', function(){
        var finalScore ;
        if(submitBtn){
          winscore = document.getElementById('winner-score').value;
        }
     });
     if(winscore){
         finalScore = winscore;

     }else{
         finalScore = 100;
     }
     
    // Check if the player won the game
    if(scores[activePlayer] >= finalScore){
        
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        submitBtn = false;
    }else{
        nextPlayer(); 
    }
    // scores[activePlayer] == 100 ?  :
    // //next player
    //  nextPlayer();
    }
});
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
submitBtn = true;
document.querySelector('.dice-1').style.display = 'none';
document.querySelector('.dice-2').style.display = 'none';
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}
function nextPlayer(){
 // next player
 activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
 roundScore = 0;
 document.querySelector('.dice-1').style.display = 'none';
 document.querySelector('.dice-2').style.display = 'none';
 document.getElementById('current-0').textContent = '0';
 document.getElementById('current-1').textContent = '0';
 document.querySelector('.player-0-panel').classList.toggle('active');
 document.querySelector('.player-1-panel').classList.toggle('active');

}


 // currentRoll = dice;
    // if(dice == 6){
    //     previousRoll = 6;
    //     counter += 1;
    // }else{
    //     previousRoll = 0;
    //     counter = 0;
    // }
   // (currentRoll == 6 && previousRoll == 6 && counter == 2 ) || 