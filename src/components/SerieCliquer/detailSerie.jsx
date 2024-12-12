// Composant pour afficher les details de la série
/* Mon composent une fois avoir cliqué sur une des 10 série max affiché lors de la recherche  :



    -Afficher les informations d'une série
    -Afficher le casting d'une série
    -Afficher les saisons / épisodes d'une série



*/





// Ici, j'import les Hooks (fonctions) de React
import { useEffect, useState } from "react";
// Ici, j'importe l'objet useLocation via le react-router-dom installer dans le package.json
import { useLocation } from "react-router-dom";
// J'importe la librairie d'icon de React
import { AiOutlineStar, FaHeart, FaRegHeart } from "react-icons/all";
// J'importe les toasts au moment de l'ajout d'une série en favoris
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Casting } from "../Casting/Casting";
// J'importe mon style qui est unique à se composant
import styles from "./detailSerie.module.css";
import { Season } from "../Season/Season";
import noImageFound from '../../assets/img/No-image-found.jpg'


export const SerieCliquer = () => {

  const { state } = useLocation();

  // La où je stock mes données Json du fetch
  const [data, setData] = useState();

  // Mon setter qui me permets de voir si le bouton est cliqué ou non
  const [clicked, setClicked] = useState(false);

  // Mon setter qui me permets de voir si le bouton Casting est cliqué ou non
  const [castingClicked, setCastingClicked] = useState(false);

  // Mon setter qui me permets de voir si le bouton season est cliqué ou non
  const [seasonClicked, setSeasonClicked] = useState(false);


  
  useEffect(() => {
    console.log(state);
    fetch(
      `http://api.tvmaze.com/shows/${state.data.id}?embed[]=cast&embed[]=seasons`)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Ma foncton qui me permet l'afficjhage des toasts
  function handleClickFav() {
    setClicked(!clicked);

    if (clicked) {
      toast(`You just removed ${data?.name} of your favorites !`);
    } else {
      toast(`You just added ${data?.name} to your favorites !`);
    }
  }

  // Ma fonction pour gérer la visibilité de la section de mon composant Casting via mon setter true & false
  // à chaqie clique sur mon bouton Casting, je le mets à l'invers de sa valeur actuel pour soit le monter où le cacher
  function handleCastingClicked() {
    setSeasonClicked(false);
    setCastingClicked(!castingClicked);
  }

  // Ma fonction pour gérer la visibilité de la section de mon composant Casting via mon setter true & false
  // à chaqie clique sur mon bouton Casting, je le mets à l'invers de sa valeur actuel pour soit le monter où le cacher
  function handleSeasonClicked() {
    setCastingClicked(false);
    setSeasonClicked(!seasonClicked);
  }

  return (
    <section>
      {/* Info serie */}
      <div className={styles.name_picture_rating_summary_buttonfav}>
        <div className={styles.nameserie_picture_rating}>
          <h1>{data?.name}</h1>
          {data?.image != null ? <img src={data?.image?.medium} alt={data?.name} /> : <img src={noImageFound} alt={data?.name}/> }
          <p className={styles.rating}>
            {data?.rating.average != null ?  data?.rating.average + ' / 10 ' : null}<AiOutlineStar/> 
          </p>
        </div>
        <div className={styles.summary_buttonfav}>
          {/* Ma description */}
          <span dangerouslySetInnerHTML={{ __html: data?.summary }}></span>
          {/* Mon bouton ajouter aux favoris  */}
          <button onClick={handleClickFav} value={clicked}>
            {" "}
            {clicked ? (
              <span>
                Remove from favorites <FaRegHeart />{" "}
              </span>
            ) : (
              <span>
                Add to favorites <FaHeart />
              </span>
            )}
          </button>
          <ToastContainer />
        </div>
      </div>
      {/* ******************* */}

      {/* Genres & Type  */}
      <div className={styles.genre_type}>
        <div className={styles.genres}>
          <h2>GENRES : </h2>
          <span>
            {data?.genres[0] != undefined ? (
              <>
                <p> #{data?.genres[0]}</p>
              </>
            ) : null}
          </span>
          <span>
            {data?.genres[1] != undefined ? (
              <>
                <p className={styles.separator}>-</p>
                <p> #{data?.genres[1]}</p>
              </>
            ) : null}
          </span>
          <span>
            {data?.genres[2] != undefined ? (
              <>
                <p className={styles.separator}>-</p>
                <p> #{data?.genres[2]}</p>
              </>
            ) : null}
          </span>
          <span>
            {data?.genres[3] != undefined ? (
              <>
                <p className={styles.separator}>-</p>
                <p> #{data?.genres[3]}</p>
              </>
            ) : null}
          </span>
        </div>
        <hr />
        <div className={styles.type}>
          <h2>TYPE : </h2> <p> {data?.type} </p>
        </div>
      </div>
      {/* ******************* */}


      {/* Buttons Casting & Season */}
      <div className={styles.casting_saison}>
        <button
          disabled={data?.type != "Scripted"}
          onClick={handleCastingClicked}
          value={castingClicked}
        >
          <span>CASTING</span>
        </button>
        <button disabled={data?.type != "Scripted"} onClick={handleSeasonClicked} value={seasonClicked}>
          <span>SEASONS</span>
        </button>
      </div>
      {/* ******************* */}


      {castingClicked ? <Casting casting={data?._embedded.cast} /> : null}
      {seasonClicked ? <Season seasons={data?._embedded.seasons} /> : null}
    </section>
  );
};
