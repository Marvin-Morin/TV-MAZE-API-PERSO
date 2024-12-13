/* Mon composent pour :



    -Créer la barre de recherche;
    -Créer le fetch avec le query paramater qui va être le résultat (la value) de l'input qui va s'éxecuter au moment du submit sur mon form



*/





// Ici, j'importe le HOOK
import { useState } from "react";
// Ici, j'importe la navigation qui est une fonction pour "link to" via le react-router-dom installer dans le package.json
import { useNavigate } from "react-router-dom";
// Ici, j'importe le style de ce composant uniquement
import styles from "./barrerecherche.module.css";
// Ici j'importe l'icon "loop" qui va se trouver à droite de mon input
import { HiMagnifyingGlass } from 'react-icons/all'



// Ma barre de recherche
export const BarreDeRecherche = () => {

  // L'endroit où je stock la Valeur de l'Input
  const [valeur, setValue] = useState("");

  // Pour pouvoir envoyer mes donnée du fetch à ma page result
  const navigation = useNavigate();

  // Fonction au moment du onSubmit sur le form
  const handleSearch = (e) => {

    e.preventDefault();

    fetch(`https://api.tvmaze.com/search/shows?q=${valeur}`)
      .then((response) => response.json())
      .then((data) => navigation("/series-recherchées", { state: { result: data } }))
      .catch((error) => console.log(error)),
      // Le petit tableau est pour re-fetch lors d'un changement de propriété (query-parameter) dans le fetch 
      []};

  return (
    <form className={styles.form} onSubmit={(e) => handleSearch(e)}>
        <input type="text" placeholder="Entrez une série" value={valeur} onChange={e => setValue(e.target.value)}/>
        <HiMagnifyingGlass onClick={handleSearch} type="submit"/>
    </form>
  );
};
