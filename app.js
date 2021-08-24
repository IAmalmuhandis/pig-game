/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var roundScore, scores, activePlayer , gamePlaying , count, lastRoll;
count = 0;
lastRoll = 0;
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
 // 1. Random number
    var  dice = Math.floor(Math.random() * 6) +1;
    var currentRoll = dice;
    if(dice == 6){
        lastRoll = 6;
        count += 1;
    }else{
        lastRoll = 0;
        count = 0;
    }
 
//     // 2. display the result
   var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png'; 
    //3. update roundscore IF rolled number was NOT a 1
     if((currentRoll == 6 && lastRoll == 6 && count == 2 ) || dice == 1){
         // add score
        
       nextPlayer();
     }else{
        roundScore += dice;
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
    
    // Check if the player won the game
    if(scores[activePlayer] >= 25){
        
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
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
document.querySelector('.dice').style.display = 'none';
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
 document.querySelector('.dice').style.display = 'none';
 document.getElementById('current-0').textContent = '0';
 document.getElementById('current-1').textContent = '0';
 document.querySelector('.player-0-panel').classList.toggle('active');
 document.querySelector('.player-1-panel').classList.toggle('active');

}