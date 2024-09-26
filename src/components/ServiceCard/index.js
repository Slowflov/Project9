import PropTypes from "prop-types";
import "./style.scss";

// Composant ServiceCard pour afficher une carte de service
const ServiceCard = ({ imageSrc, imageAlt, children }) => (
  <div className="ServiceCard">
    {/* Conteneur pour l'image du service */}
    <div className="ServiceCard__imageContainer">
      <img
        data-testid="card-image-testid" // Identifiant pour les tests
        src={imageSrc} // Source de l'image
        alt={imageAlt} // Texte alternatif pour l'image
      />
    </div>

    {/* Conteneur pour le texte du service */}
    <div className="ServiceCard__textContainer">
      {children} {/* Contenu texte ou autre éléments enfants */}
    </div>
  </div>
);

// Définition des types de propriétés attendues
ServiceCard.propTypes = {
  imageSrc: PropTypes.string.isRequired, // Source de l'image (obligatoire)
  imageAlt: PropTypes.string, // Texte alternatif pour l'image (optionnel)
  children: PropTypes.node.isRequired, // Contenu ou éléments enfants (obligatoire)
};

// Valeurs par défaut pour les propriétés
ServiceCard.defaultProps = {
  imageAlt: "image", // Valeur par défaut pour le texte alternatif
};

export default ServiceCard;

