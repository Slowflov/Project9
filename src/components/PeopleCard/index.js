import PropTypes from "prop-types";

import "./style.scss";

// Composant PeopleCard
const PeopleCard = ({ imageSrc, imageAlt, position, name }) => (
  <div className="PeopleCard" data-testid="people-card">
    {/* Conteneur pour l'image */}
    <div className="PeopleCard__imageContainer">
      <img 
        data-testid="card-image-testid"  // Identifiant pour les tests
        src={imageSrc}  // Source de l'image
        alt={imageAlt}  // Texte alternatif de l'image
      />
    </div>
    {/* Conteneur pour la description */}
    <div className="PeopleCard__descriptionContainer">
      <div className="PeopleCard__name">{name}</div>  {/* Nom de la personne */}
      <div className="PeopleCard__position">{position}</div>  {/* Position de la personne */}
    </div>
  </div>
);

// Définition des types de propriétés attendues
PeopleCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,  // URL de l'image
  imageAlt: PropTypes.string,  // Texte alternatif pour l'image
  name: PropTypes.string.isRequired,  // Nom de la personne
  position: PropTypes.string.isRequired,  // Position de la personne
};

// Valeurs par défaut des propriétés
PeopleCard.defaultProps = {
  imageAlt: "",  // Valeur par défaut pour le texte alternatif de l'image
}

export default PeopleCard;

