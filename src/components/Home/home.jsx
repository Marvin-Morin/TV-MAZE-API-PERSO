/* Mon composent pour :



    -Afficher la barre de recherche;
    -Le carousel des 10 dernières séries ajoutées dans l'API
    -La citation 



*/





// Ici, j'import les icons des boutons retour et suivant du carousel
import { SlArrowLeft, SlArrowRight } from 'react-icons/all'
// Ici, j'import les Hooks (fonctions) de React
import React, { useEffect, useState } from 'react'
// Ici, j'importe mon module CSS de ce composant là uniquement
import styles from './home.module.css'
// Ici, j'import ma barre de recherhce
import { BarreDeRecherche } from '../barre-recherche/barrerecherche';
import { Link } from 'react-router-dom';




// Ma page d'accueil
export const Home = () => {

    // Pour stocker la position du carousel des 10 dernière affiches de l'API
    // Et pouvoir switch back && next grâce aux boutons
    const [currentImage, setCurrentImage] = useState(0);



    //Pour afficher les 10 dernières séries sur la page d'accueil et les stocker ici
    const [serie, setSeries] = useState([]);

    useEffect(() => {
        fetch(`http://api.tvmaze.com/shows`)
            .then(response => response.json())
            .then(data => {
                // Je crée ici une variable pour stocker uniquement les 10 derniers résultats de tout les résultats de l'API
                const latestShows = data.slice(-10);
                // Que j'ajoute ensuite à l'endroit où je stock les datas de mon fetch (donc il me restera que les 10 dernières affiches de l'API)
                setSeries(latestShows);
            })
            .catch(error => console.log(error))
            // Le petit tableau est pour re-fetch lors d'un changement de propriété dans le fetch (ici on en a pas besoin)
    }, [])





    // Je créer mes fonctions next et back du carousel des 10 premières affiches
    const handleNext = () => {
        setCurrentImage(currentImage === serie.length - 1 ? 0 : currentImage + 1);
    };
    const handleBack = () => {
        setCurrentImage(currentImage === 0 ? serie.length - 1 : currentImage - 1);
    }

    



    return (
        <>
            {/* Mon formulaire de recherche :  */}
            <BarreDeRecherche/>
                {/* Ma div où afficher le carousel des 10 dernières série de l'API */}
                <div className={styles.seriehome}>
                    <h2>Les 10 dèrnières séries ajoutées :</h2>
                        <div className={styles.carousel}>
                            <button onClick={handleBack}>{<SlArrowLeft />}</button>
                                <Link to='/resultat-serie-cliquer' state={{data : serie[currentImage]} }><img src={serie[currentImage]?.image.medium} alt={`Image ${currentImage + 1}`} /></Link>
                            <button onClick={handleNext} >{<SlArrowRight />}</button>
                        </div>
                    <blockquote>
                        <p>" Dive into the endless world of
                            entertainment: find your next favorite series with FilmFlow "</p>
                    </blockquote>
                </div>
        </>
    )
};