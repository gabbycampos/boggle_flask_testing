// Make HTTP request without refreshing the page. Use AJAX
//   intercept and send it via AJAX to server and server can respond with JSON

// Take form value and make an AJAX request to send it to the server
// On the server take the form value and check if it is a valid word in the dictionary using the variable in app.py
// Make sure the word is valid on the board using the check_valid_word function from boggle class
// Will need to respond with json with AJAX and send JSON response on app.py {'result': 'ok'} or {'result': 'not-on-board'}


let score = 0;
let wordsArr = [];
// Access info from query string
// get guess from form
$('#word-form').submit(function(event) {
  event.preventDefault();
  let query = $('#word-submit').val()
  checkWord(query)
  $('form :input').val('');
});

// if word hasn't been used it sends it to the server
function checkAddedWord(query) {
  if (wordsArr.includes(`${query}`)) {
    $('#message').html(`Already found ${query}`, 'err')
    return
  }
  else {
    checkWord(query)
  }
}

// sends word to server to check if it's valid, post on front-end
async function checkWord(query) {
  let guess = query
  const response = await axios.get('http://127.0.0.1:5000/check-word', {params: {word: guess}})
  if (response.data.result === 'not-word') {
    $('#message').html(`${guess} is not a valid word!`, 'err');
  }
  else if (response.data.result === 'not-on-board') {
    $('#message').html(`${guess} is not a valid word on this board!`);
  }
  else {
    score += guess.length;
    $('#score').html(score)
    $('#added_words').append(`<li>${guess}</li>`)
    wordsArr.push(`${guess}`)
    $('#message').html(`Added: ${guess}!`);
  }
}

// score checker and setter
async function scoreGame() {
  const response = await axios.post('/post-score', {score: score});
  if (response.data.brokeRecord) {
    $('#message').html(`New Record: ${score}`, 'ok');
  }
  else {
    $('#message').html(`Final Score: ${score}`, 'ok')
  }
}

function endGame() {
  scoreGame()
}

$('#reset').click(function() {
  location.reload(true)
})

// start game
setTimeout(endGame, 60000)
