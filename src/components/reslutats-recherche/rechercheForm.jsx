/* Mon composent une fois avoir recherché via la barre de recherche pour :



    -Afficher les 10 séries maximum qui ont un des mot recherché
    -La desription de la série
    -Permettre de cliquer sur une des série pour avoir le détail de cette série



*/





import { Link, useLocation } from "react-router-dom";
import styles from "./rechercheForm.module.css";



// Le component où je veux que l'utilisateur soit redirigé après le submit du formulaire de recherche :
export const Result = () => {
  
  const { state } = useLocation();

  // console.log(state.result);






  return (
    <div className={styles.result}>
      {state?.result?.slice(0, 10).map((serie) => (
        <Link to={`/resultat-serie-cliquer`} key={serie?.show.id} state={{ data : serie?.show }}>
          <div className={styles.resultsearch} >
              <img src={serie?.show.image.medium} alt={serie?.show.name} />
              {/* Je verfifie s'il y a une description : */}
              {serie?.show.summary ? ( <span dangerouslySetInnerHTML={{ __html: serie?.show.summary }} />) : (<p>Cette série ne contient pas de déscription.</p>)}
          </div>
        </Link>
      ))}
    </div>
  );
};