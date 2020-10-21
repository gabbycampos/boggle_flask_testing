from boggle import Boggle
from flask import Flask, request, render_template, redirect, session

app = Flask(__name__)

boggle_game = Boggle()

@app.route('/')
def home():
  board = boggle_game.make_board()
  return render_template('index.html', board=board)



# submit_guess

# post_data