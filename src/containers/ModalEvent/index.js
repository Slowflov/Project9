import PropTypes from "prop-types";
import "./style.scss";

// Composant ModalEvent affichant les détails d'un événement
const ModalEvent = ({ event }) => (
  <div className="ModalEvent">
    {/* Conteneur pour l'image de l'événement */}
    <div className="ModalEvent__imageContainer">
      <img
        data-testid="card-image-testid" // Identifiant pour les tests
        src={event.cover} // Source de l'image de l'événement
        alt={event.title} // Texte alternatif pour l'image
      />
    </div>

    {/* Conteneur pour le titre et la période de l'événement */}
    <div className="ModalEvent__title">
      <div className="ModalEvent__titleLabel">
        {event.title} {/* Titre de l'événement */}
      </div>
      <div className="ModalEvent__titlePeriode">
        {event.periode} {/* Période de l'événement */}
      </div>
    </div>

    {/* Conteneur pour la description de l'événement */}
    <div className="ModalEvent__descriptionContainer">
      <h3>Description</h3> {/* Titre de la section description */}
      <div>
        {event.description} {/* Description de l'événement */}
      </div>
    </div>

    {/* Conteneur pour le nombre de participants */}
    <div className="ModalEvent__descriptionContainer">
      <h3>Participants</h3> {/* Titre de la section participants */}
      <div>
        {event.nb_guesses} participants {/* Nombre de participants */}
      </div>
    </div>

    {/* Conteneur pour les prestations */}
    <div className="ModalEvent__descriptionContainer">
      <h3>Prestations</h3> {/* Titre de la section prestations */}
      {event.prestations.map((presta) => (
        <div key={presta}>{presta}</div> // Liste des prestations
      ))}
    </div>
  </div>
);

// Définition des types de propriétés attendues
ModalEvent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.any.isRequired, // Propriété 'event' est requise et peut être de tout type
};

export default ModalEvent;

