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

  console.log(query)
})