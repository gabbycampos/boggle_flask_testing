// Make HTTP request without refreshing the page. Use AJAX

// Take form value and make an AJAX request to send it to the server
// On the server take the form value and check if it is a valid word in the dictionary using the variable in app.py
// Make sure the word is valid on the board using the check_valid_word function from boggle class
// Will need to respond with json with AJAX and send JSON response on app.py {'result': 'ok'} or {'result': 'not-on-board'}

// Access info from query string
// get guess from form
$('#word-form').submit(function(event) {
  event.preventDefault();
  let query = $('#word-submit').val()
  checkWord(query)
  //console.log(query)
  $('form: input').val('');

});

let score = 0;
let wordsArr = [];
// sends word to server to check if it's valid, post on front-end
async function checkWord(query) {
  let word_guess = query
  const response = await axios.get('http://127.0.0.1.5000/submit-guess', {params: {word: word_guess}})
  if (response.data.result === 'not-word') {
    $('#message').html(`${word_guess} is not a valid word!`);
  }
  else if (response.data.result === 'not-on-board') {
    $('#message').html(`${word_guess} is not a valid word on this board!`);
  }
  else {
    $('#score').html(score)
    $('#your-words').append(`<li>${word_guess}</li>`)
    wordsArr.push(`${word_guess}`)
    $('#message').html(`Added: ${word_guess}!`);
  }
}

//checkWord()