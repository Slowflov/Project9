import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData(); // Récupération des données du contexte
  const [index, setIndex] = useState(0); // État pour l'index du slide
  const [isPaused, setIsPaused] = useState(false); // Ajout de l'état pour la pause

  const byDateDesc = (data?.focus || []).sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 // Tri des événements par date
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") { // Vérification de l'appui sur la barre d'espace
        event.preventDefault(); // Empêcher le comportement par défaut (défilement de la page)
        setIsPaused((prev) => !prev); // Changement de l'état de pause
      }
    };

    document.addEventListener("keydown", handleKeyDown); // Ajout de l'écouteur d'événements

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Nettoyage de l'écouteur d'événements
    };
  }, []);

  useEffect(() => {
    let interval;
    if (!isPaused && byDateDesc.length > 0) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length); // Changement automatique de slide
      }, 5000);
    }
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [isPaused, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || idx} // Utiliser un id unique ou l'index comme clé si l'id est absent
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`} // Gestion de la visibilité du slide
        >
          <img src={event.cover} alt="forum" /> {/* Image de l'événement */}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3> {/* Titre de l'événement */}
              <p>{event.description}</p> {/* Description de l'événement */}
              <div>{getMonth(new Date(event.date))}</div> {/* Affichage du mois */}
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id || radioIdx} // Utiliser l'id ou l'index unique comme clé
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Vérification de l'état sélectionné
              onChange={() => setIndex(radioIdx)} // Gestion du changement de slide
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;



