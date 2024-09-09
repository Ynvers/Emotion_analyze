import axios from "axios";
import { useState } from "react";

function Analyse() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    //Fonction pour gérer le chargement du fichier
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Lire le fichier comme une chaîne de caractères
        const reader = new FileReader();
        reader.onload = (event) => {
            setComment(event.target.result);
        };
        reader.readAsText(selectedFile);
    };

    //Fonction pour gérer le changzmznt du texte
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let apiResponse;
            if (selectedOption === 'file' || selectedOption === 'text') {
                apiResponse = await axios.post('http://127.0.0.1:8000/api/analyse-comment', { comment });
            }

            setResponse(apiResponse.data);
            setError(null);

            // Afficher la réponse dans la console
            console.log('Réponse de l\'API:', apiResponse.data);

        } catch (error) {
            setError('Erreur lors de l\'envoi : ' + error.message);
            setResponse(null);
            console.error('Erreur lors de l\'envoi :', error);
        }
    }

    return (
        <div>
            <h1>Analyser un commentaire</h1>
            <div>
                <button onClick={() => setSelectedOption('file')}>Charger un fichier</button>
                <button onClick={() => setSelectedOption('text')}>Ecrire du texte</button>
            </div>

            {selectedOption === 'file' && (
                <div>
                    <input type="file" onChange={handleFileChange} ></input>
                </div>
            )}

            {selectedOption === 'text' && (
                <div>
                    <textarea  
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Entrez un commentaire"
                        rows="4"
                        cols="50"
                    >
                    </textarea>
                </div>
            )}

            <button onClick={handleSubmit}>Analyser</button>

            {response && (
                <div>
                    <h2>Confirmation</h2>
                    <p>Les données ont été envoyées avec succès.</p>
                </div>
            )}

            {error && (
                <div>
                    <h2>Erreur</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}

export default Analyse;