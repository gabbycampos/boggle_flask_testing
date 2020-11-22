from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretKey'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


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


@app.route('/check-word')
def check_word():
    """ receives word from user, checks if valid, returns json response """

    word = request.args['word']
    board = session['board']
    res = boggle_game.check_valid_word(board, word)

    # import pdb
    # pdb.set_trace()
    # raise
    return jsonify(({'result': res}))


# post_score
@app.route('/post-score', methods=['POST'])
def post_score():
    """ receives score and updates highest score """

    score = request.json["score"]
    highscore = session.get("highscore", 0)
    nplays = session.get("nplays", 0)

    session['nplays'] = nplays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)
