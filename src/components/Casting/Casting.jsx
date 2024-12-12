import { useState } from "react";
import { Link } from "react-router-dom";
import { InfoActor } from "../Info-Acteur/infoActeur";
import styles from "./Casting.module.css";

export const Casting = ({ casting }) => {
  // Je récupere mes fichiers Json de mon composant detailsSerie.js
  console.log(casting);

  return (
    <div className={styles.sectioncasting}>
      <h5>Casting</h5>

      <div className={styles.listeacteur}>
        {casting.map((cast, index) => (
          <Link  key={index}  state={{actor : cast}} to='/info-actor'> 
          <div className={styles.unActeur}>
            <img
              src={cast.person.image.medium}
              alt={cast.person.name}
            />
            <span className={styles.nameActeur}>
              {cast.person.gender === "Male"
                ? `Name of this actor : ${cast.person.name}`
                : `Name of this actress : ${cast.person.name} `}{" "}
            </span>
            <span className={styles.birthdayActeur}>
              {cast.person.birthday === null
                ? cast.person.gender === "Male"
                  ? `This actor's birthday is unknown.`
                  : `The birthday of this actress is not known`
                : cast.person.gender === "Male"
                ? `Birthday of this actor : ${cast.person.birthday}`
                : `Birthday of this actress : ${cast.person.birthday} `}
            </span>
          </div></Link>
        ))}
      </div>
    </div>
  );
};
