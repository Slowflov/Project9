import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Home from "./index";

describe("Page d'accueil avec un formulaire", () => {
  it("affiche une liste de champs du formulaire", async () => {
    render(<Home />);
    screen.debug(); // Affiche l'état du DOM pour le débogage

    // Vérifie que le conteneur du formulaire est présent
    await waitFor(() => {
      expect(screen.getByTestId("container-form-testId")).toBeInTheDocument();
    });

    // Vérifie la présence des éléments de texte dans le formulaire
    await waitFor(() => {
      expect(screen.findByText("Nom")).resolves.toBeInTheDocument();
      expect(screen.findByText("Prénom")).resolves.toBeInTheDocument();
      expect(screen.findByText("Personel / Entreprise")).resolves.toBeInTheDocument();
      expect(screen.findByText("Email")).resolves.toBeInTheDocument();
    });
  });

  describe("Interactions avec le formulaire", () => {
    it("affiche 'En cours', montre le message de succès et met à jour le texte du bouton", async () => {
      render(<Home />);
      screen.debug(); // Affiche l'état initial du DOM

      // Remplit les champs du formulaire
      const fields = await screen.queryAllByTestId("field-testid");
      fields.forEach(field => {
        fireEvent.change(field, { target: { value: 'Test' } });
      });

      // Simule la sélection dans le composant Select
      const form = await screen.getByTestId("container-form-testId");
      fireEvent.click(within(form).getByTestId("collapse-button-testid"));
      fireEvent.click(screen.getByText('Personel'));

      // Soumet le formulaire
      fireEvent.click(within(form).getByTestId("button-test-id"));

      // Affiche l'état du DOM après la soumission
      screen.debug(); 

      // Vérifie que le texte "En cours" est affiché après la soumission
      await waitFor(() => {
        expect(screen.getByText("En cours")).toBeInTheDocument();
      });

      // Vérifie que la modale de succès est affichée
      await waitFor(() => {
        expect(screen.queryByText("Message envoyé !")).toBeInTheDocument();
      });

      // Vérifie que le texte du bouton est revenu à "Envoyer"
      await waitFor(() => {
        expect(screen.queryByText("Envoyer")).toBeInTheDocument();
      });
    });
  });
});

describe("Affichage des éléments de la page", () => {
  it("affiche une liste d'événements", async () => {
    render(<Home />);

    // Vérifie la présence du titre, du filtre et des cartes d'événements
    await waitFor(() => {
      expect(screen.getByTestId("realisation-title")).toBeInTheDocument();
    });
    await screen.queryAllByTestId("select-testid");
    await screen.queryAllByTestId("card-testid");
  });

  it("affiche une liste de personnes", async () => {
    render(<Home />);

    // Vérifie que le titre de l'équipe est affiché
    await waitFor(() => {
      expect(screen.getByTestId("equipe-title")).toBeInTheDocument();
    });

    // Vérifie que les cartes des membres de l'équipe sont affichées
    const peopleCards = screen.getAllByTestId("people-card");
    expect(peopleCards.length).toBeGreaterThan(0);
  });

  it("affiche le pied de page", async () => {
    render(<Home />);

    // Vérifie que le pied de page contient le titre et des éléments de contenu
    await waitFor(() => {
      expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
      expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText((content, element) => 
        element.tagName.toLowerCase() === 'p' && content.includes("Une agence événementielle propose")
      )).toBeInTheDocument();
    });
  });

  it("affiche une carte de l'événement le plus récent", async () => {
    render(<Home />);

    // Vérifie la présence de la carte pour le dernier événement
    const lastEvent = screen.queryByTestId("last-event-card"); // Assurez-vous que `EventCard` a `data-testid="last-event-card"`

    if (lastEvent) {
      await waitFor(() => {
        expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
        expect(lastEvent).toBeInTheDocument();
      });
    } else {
      await waitFor(() => {
        expect(screen.getByText("Aucune prestation disponible pour le moment.")).toBeInTheDocument();
      });
    }
  });
});
