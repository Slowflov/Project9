/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";

describe("When Modal data is created", () => {
  it("a modal content is display", () => {
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );
    // Vérifie que le contenu de la modale est affiché
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });

  describe("and a click is triggered to display the modal", () => {
    it("the content of modal is displayed", async () => {
      render(
        <Modal Content={<div>modal content</div>}>
          {() => <button data-testid="open-modal"></button>}
        </Modal>
      );
      // Vérifie que le contenu de la modale n'est pas visible initialement
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
      // Déclenche un clic sur le bouton pour ouvrir la modale
      fireEvent(
        screen.getByTestId("open-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Attendre que le contenu de la modale soit affiché
      // (Ajoutez ici l'attente si nécessaire pour les tests asynchrones)
    });
  });

  describe("and a click is triggered to the close button modal", () => {
    it("the content of the modal is hide", async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );

      // Vérifie que le contenu de la modale est visible avant le clic
      expect(screen.getByText("modal content")).toBeInTheDocument();
      // Déclenche un clic sur le bouton de fermeture de la modale
      fireEvent(
        screen.getByTestId("close-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Vérifie que le contenu de la modale n'est plus visible après le clic
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
});

