import { useLocation } from "react-router-dom";

function Resultats() {
    const location = useLocation();
    const { result } = location.state || {};
    //Vérifier si les données de réponse sont présentes
    if (!result) {
        return <p>Aucune résultats disponible.</p>;
    }

    return (
        <div>
            <h2>Résultats de l&rsquo;analyse</h2>
            <p><strong>Emotion :</strong> {result.emotion}</p>
            <p><strong>Polarité :</strong> {result.polarity}</p>
            <p><strong>Score Positif :</strong> {result.positive_score}</p>
            <p><strong>Score Négatif :</strong> {result.negative_score}</p>
            <p><strong>Score Neutre :</strong> {result.neutral_score}</p>
        </div>
    );
}

export default Resultats;