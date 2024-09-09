import joblib
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask import Flask, request, jsonify

# Assurer que le lexique est téléchargé
nltk.download('vader_lexicon')


#Initialisation de Flask
app = Flask(__name__)

# Charger le modèle de pipeline
pipe_svm = joblib.load('text_emotion.plk')

# Fonction d'analyse des sentiments
def analyze_sentiment(text):
    analyser = SentimentIntensityAnalyzer()
    sentiment = analyser.polarity_scores(text)
    polarity_score = sentiment['compound']
    score_pos = sentiment['pos']
    score_neg = sentiment['neg']
    score_neu = sentiment['neu']
    
    if polarity_score > 0:
        polarity = 'Positive'
    elif polarity_score < 0:
        polarity = 'Negative'
    else:
        polarity = 'Neutral'
    
    return {
        'polarity_score': polarity,
        'positive_score': score_pos,
        'negative_score': score_neg,
        'neutral_score': score_neu
    }

@app.route('/predict_emotion', methods=['POST'])

# Fonction de prédiction des émotions
def predict_emotion():
    data = request.json
    comment = data.get('text', '')

    # Utilisation du modèle pour prédire l'émotion
    emotion = pipe_svm.predict([comment])[0]

    # Analyse de la polarité
    sentiment_analysis = analyze_sentiment(comment)
    # Renvoi de la réponse JSON
    return jsonify({
        'emotion': emotion,
        'polarity': sentiment_analysis['polarity_score'],
        'positive_score': sentiment_analysis['positive_score'],
        'negative_score': sentiment_analysis['negative_score'],
        'neutral_score': sentiment_analysis['neutral_score']
    })

if __name__ == "__main__":
    app.run(port=5000)