import logo from "/src/assets/Logo/Logo-PNG/FilmFlow-logo3.png";
import styles from "./Navbar.module.css";
import { BiBookmarkHeart, HiMagnifyingGlass } from "react-icons/all";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarreDeRecherche } from "../barre-recherche/barrerecherche";

export const Nav = () => {
  // recuperer le chemin de la page sur laquelle je navigue grâce au pathname qui est un  un hook qui permet d'accéder à l'objet location de React Router.
  const { pathname } = useLocation();

  // Je créer un setter pour pouvoir changer la visibilité en (montrer et caché (true & false))
  const [visibility, setVisibility] = useState(false);

  // Je créer un useEffect pour qu'à chaque changement de page (via pathname) grâce au tableau qui permet cela de passer visibility en false
  useEffect(() => {
    setVisibility(false);
  }, [pathname]);

  // Je créer une variable handleClick pour qu'à chaque click sur la loupe, ça me change la valeur boolean qui me permet d'afficher ou non la barre de recherche
  const handleClick = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      <nav className={styles.nav}>
        <Link to={"/"}>
          {" "}
          <img src={logo} />
        </Link>
        {/* null / false est une valeur null donc il ne met rien par defaut si je suis sur la page d'accueil grâce au pathname === '/' */}
        {pathname === "/" ? (
          false
        ) : (
          <HiMagnifyingGlass onClick={handleClick} className={styles.loop} />
        )}
        <BiBookmarkHeart />
      </nav>
      {/* Je créer ma condition si visibility est à sa valeur initial, alors il m'affiche la loop, sinon, il me met null, donc il ne l'affiche pas. */}
      {visibility ? <BarreDeRecherche /> : null}
    </>
  );
};
