from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretKey'

debug = DebugToolbarExtension(app)

# instance of class Boggle
boggle_game = Boggle()

@app.route('/')
def home():
  """ Home route with board """
  board = boggle_game.make_board()
  session['board'] = board
  return render_template('index.html', board=board)

# submit_guess
@app.route('/submit-guess')
def submit_guess():
  """ receives word from user, checks if valid, returns json response """

  word = request.args['word']
  board = session['board']
  res = boggle_game.check_valid_word(board, word)

  return jsonify(({'result': res}))


# post_score
@app.route('/post-score', methods=['POST'])
def post_score():
  """ receives score and updates highest score """
