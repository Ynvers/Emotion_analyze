<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class EmotionController extends Controller
{
    public function analyseComment(Request $request)
    {
        //Log les données reçues
        Log::info('Données reçues:', $reqest->all());
        
        $request->validate([
            'comment' => 'nullable|string',
            'file' => 'nullable|file'
        ]);

        $client = new Client();
        $comment = '';
        
        try {
            if ($request->has('file')) {
                //Lire le contenu du fichier et le convertir en texte
                $file = $request->file('file');
                $comment = file_get_contents($file);

                //Enlever les espaces surperflus pour éviter des erreurs d'analyse
                $comment = trim($comment);
            } elseif ($request->has('comment')) {
                //Utilisation du commentaire fourni
                $comment = $reqest->input('comment');
            } else {
                return response()->json(['error' => 'Aucun commentaire ou fiichier fourni.'], 400);
            }

            // Appel à l'API Python
            $response = $client->post('http://127.0.0.1:5000/predict_emotion', [
                'json' => ['comment' => $comment]
            ]);

            // Décodage de la réponse JSON
            $responseBody = json_decode($response->getBody(), true);

            // Retour de la réponse JSON au client
            return response()->json([
                'emotion' => $responseBody['emotion'],
                'polarity' => $responseBody['polarity'],
                'positive_score' => $responseBody['positive_score'],
                'negative_score' => $responseBody['negative_score'],
                'neutral_score' => $responseBody['neutral_score']
            ]);

        } catch (RequestException $e) {
            // Gestion des erreurs
            return response()->json([
                'error' => 'Erreur de communication avec le serveur d\'analyse.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
