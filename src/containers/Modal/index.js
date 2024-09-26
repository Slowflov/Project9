import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "../../components/Icon";
import "./style.scss";

const Modal = ({ opened, Content, children }) => {
  const [isOpened, setIsOpened] = useState(opened); // État pour savoir si la modale est ouverte ou non

  return (
    <>
      {/* Utilisation de la fonction enfant pour obtenir le contrôle de la modale */}
      {children({ isOpened, setIsOpened })}
      
      {/* Affichage de la modale si elle est ouverte */}
      {isOpened && (
        <div className="modal">
          <div className="content">
            {Content} {/* Contenu de la modale */}
            <button
              type="button"
              data-testid="close-modal" // Identifiant pour les tests
              onClick={() => setIsOpened(false)} // Fonction pour fermer la modale
            >
              <Icon name="close" /> {/* Icône de fermeture */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Définition des propriétés par défaut
Modal.defaultProps = {
  opened: false, // La modale est fermée par défaut
};

// Définition des types de propriétés attendues
Modal.propTypes = {
  opened: PropTypes.bool, // Propriété 'opened' est un booléen
  Content: PropTypes.node.isRequired, // Propriété 'Content' est requise et doit être un noeud React
  children: PropTypes.func.isRequired, // Propriété 'children' est requise et doit être une fonction
};

export default Modal;

