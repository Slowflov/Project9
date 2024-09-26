import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Simulation de l'appel API de contact
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 900); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false); // État pour savoir si le formulaire est en cours d'envoi
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    type: '',
    message: ''
  });
  const [error, setError] = useState(''); // État pour stocker les messages d'erreur
  const [selectKey, setSelectKey] = useState(Date.now()); // Clé pour forcer le re-rendu du sélecteur

  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    let isValid = true;
    let errorMessage = '';

    // Vérifie chaque champ pour les erreurs
    if (!formData.nom) {
      errorMessage = 'Nom ; ';
      isValid = false;
    }
    if (!formData.prenom) {
      errorMessage += 'Prénom ; ';
      isValid = false;
    }
    if (!formData.email) {
      errorMessage += 'Email ; ';
      isValid = false;
    }
    if (!formData.type) {
      errorMessage += 'Type : Personel / Entreprise ; ';
      isValid = false;
    }
    if (!formData.message) {
      errorMessage += 'Message ; ';
      isValid = false;
    }

    setError(errorMessage.trim());
    return isValid;
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour gérer les changements dans le sélecteur
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value
    }));
  };

  // Fonction pour envoyer les données du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault(); // Empêche le comportement par défaut du formulaire
      if (!validateForm()) return; // Valide le formulaire avant d'envoyer

      setSending(true); // Indique que l'envoi est en cours
      try {
        await mockContactApi(); // Simule l'envoi des données
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          type: '',
          message: ''
        }); // Réinitialise les données du formulaire
        setError(''); // Réinitialise les messages d'erreur
        setSending(false); // Indique que l'envoi est terminé
        setSelectKey(Date.now()); // Met à jour la clé du sélecteur pour le re-rendu
        onSuccess(); // Appelle la fonction de succès
      } catch (err) {
        setSending(false); // Indique que l'envoi a échoué
        onError(err); // Appelle la fonction d'erreur
      }
      setSending(false); // Indique que l'envoi est terminé
    },
    [formData, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact} data-testid="form-testid">
      <div className="row">
        <div className="col">
          <Field
            name="nom"
            placeholder=""
            label="Nom"
            value={formData.nom}
            onChange={handleChange}
          />
          <Field
            name="prenom"
            placeholder=""
            label="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />
          <Select
            key={selectKey} // Force le re-rendu du sélecteur
            selection={["Personel", "Entreprise"]}
            onChange={handleSelectChange}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
          />
          <Field
            name="email"
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
      {error && <div className="error-general">Merci de remplir les champs suivants pour envoyer le formulaire : {error}</div>}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;


