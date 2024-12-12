import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./infoActeur.module.css";

export const InfoActor = () => {
  
    const [actor, setData] = useState();

  const { state } = useLocation();

  //console.log(state);

  useEffect(() => {
    fetch(
      `https://api.tvmaze.com/people/${state?.actor?.person?.id}/castcredits?embed=show`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(actor);
  return (
    <section className={styles.actor}>
      <div className={styles.info_actor}>
        <img src={state?.actor.person?.image?.medium} />
        <div className={styles.name_birthday}>
          <h1>
            {state?.actor?.person.name}
          </h1>
          <p>
            {state?.actor?.birthday === null
              ? state?.actor?.gender === "Male"
                ? `This actor's birthday is unknown.`
                : `The birthday of this actress is not known`
              : state?.actor?.gender === "Male"
              ? `Birthday of this actor : ${state?.actor?.person.birthday}`
              : `Birthday of this actress : ${state?.actor?.person.birthday} `}
          </p>
          <p>
            {state?.actor?.deathday === undefined
              ? state?.actor?.gender === "Male"
                ? `This actor's deathday is unknown.`
                : `The deathday of this actress is not known`
              : state?.actor?.gender === "Male"
              ? `deathday of this actor : ${state?.actor?.person.deathday}`
              : `deathday of this actress : ${state?.actor?.person.deathday} `}
          </p>
        </div>
      </div>

      <div className={styles.serie_actor}>
        {state?.actor?.gender === "Male" ? <h5>Series in which he plays :</h5> : <h5>Series in which she plays :</h5> }
        {actor?.map( (uneserie, index) => 
          <Link  key={index}  to='/resultat-serie-cliquer' state={{ data : {id : uneserie._embedded?.show?.id }}} className={styles.une_serie}>  
              <img src={uneserie._embedded.show.image.medium} alt=""/>
                <span dangerouslySetInnerHTML={{ __html: uneserie._embedded.show.summary}}></span>
          </Link> 
        )}
        </div>
    </section>
  );
};