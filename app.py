from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretKey'

boggle_game = Boggle()

@app.route('/')
def home():
  board = boggle_game.make_board()
  session['board'] = board
  return render_template('index.html', board=board)



# submit_guess

# post_data