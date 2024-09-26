import PropTypes from "prop-types"; // Importation de PropTypes pour la validation des props
import { getMonth } from "../../helpers/Date"; // Importation de la fonction getMonth pour obtenir le mois
import "./style.scss"; // Importation du fichier de style

const EventCard = ({
  imageSrc, // Source de l'image
  imageAlt, // Texte alternatif de l'image
  date = new Date(), // Date par défaut est la date actuelle
  title, // Titre de l'événement
  label, // Étiquette de l'événement
  small = false, // Indicateur de taille
  ...props // Autres propriétés
}) => (
  <div
    data-testid="card-testid" // Test ID pour le test
    className={`EventCard${small ? " EventCard--small" : ""}`} // Classe conditionnelle pour le style
    {...props} // Autres propriétés ajoutées ici
  >
    <div className="EventCard__imageContainer"> {/* Conteneur pour l'image */}
      <img 
        data-testid="card-image-testid" // Test ID pour l'image
        src={imageSrc} // Source de l'image
        alt={imageAlt} // Texte alternatif de l'image
      />
      <div className="EventCard__label"> {/* Conteneur pour l'étiquette */}
        {label} {/* Affichage de l'étiquette */}
      </div>
    </div>
    <div className="EventCard__descriptionContainer"> {/* Conteneur pour la description */}
      <div className="EventCard__title"> {/* Conteneur pour le titre */}
        {title} {/* Affichage du titre */}
      </div>
      <div className="EventCard__month"> {/* Conteneur pour le mois */}
        {getMonth(date)} {/* Affichage du mois */}
      </div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired, // Validation pour la source de l'image
  imageAlt: PropTypes.string, // Validation pour le texte alternatif de l'image
  date: PropTypes.instanceOf(Date).isRequired, // Validation pour la date
  title: PropTypes.string.isRequired, // Validation pour le titre
  small: PropTypes.bool, // Validation pour l'indicateur de taille
  label: PropTypes.string.isRequired, // Validation pour l'étiquette
};

EventCard.defaultProps = {
  imageAlt: "", // Valeur par défaut pour le texte alternatif
  small: false, // Valeur par défaut pour l'indicateur de taille
};

export default EventCard; // Exportation du composant


