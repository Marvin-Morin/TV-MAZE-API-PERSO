import styles from './Season.module.css';
import noImageFound from '../../assets/img/No-image-found.jpg'
import { Link } from 'react-router-dom';



export const Season = ({ seasons }) => {

    // console.log(seasons);

    return (
        <section className={styles.season} >
            <h5>THEY SEASON</h5>
            <div className={styles.all_seasons}>
                {seasons.map((season, index) =>
                    <div key={index} className={styles.one_season}>
                        <div className={styles.season_number_image}>
                            <p className={styles.season_number}>Season number : {season.number}</p>
                            {season?.image != null ? <img src={season?.image?.medium} /> : <img src={noImageFound} alt="" />}
                        </div>
                        {season?.summary != null ? <span dangerouslySetInnerHTML={{ __html: season?.summary }}></span> : <span><p className={styles.no_found}>Summary not found.</p></span>}
                    </div>
                )}
            </div>
        </section>
    )
}