import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Bienvenue sur l&rsquo;analyseur de sentiments textuels</h1>
            <p>Choisissez une action :</p>
            <Link to="/analyse">
                <button>Analyser un commentaire ou un fichier</button>
            </Link>
            <br />
            <Link to="/historique">
                <button>Voir l&rsquo;historique des analyses</button>    
            </Link>
        </div>
    );
}

export default Home;