import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale", "2 espaces de restaurations", "1 site web dédié"],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event cards is displayed", async () => {
    jest.setTimeout(10000); // Увеличьте тайм-аут, если нужно
    api.loadData = jest.fn().mockReturnValue(Promise.resolve(data));
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );

    // Ожидание появления элементов
    await waitFor(() => {
      const elements = screen.queryAllByText("avril");
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  describe("and we select a category", () => {
    it("a filtered list is displayed", async () => {
      jest.setTimeout(10000); // Увеличьте тайм-аут, если нужно
      api.loadData = jest.fn().mockReturnValue(Promise.resolve(data));
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Открытие списка категорий
      const collapseButton = await screen.findByTestId("collapse-button-testid");
      fireEvent.click(collapseButton);
      console.log('Clicked collapse button');

      // Найдите все элементы с текстом "soirée entreprise"
      const categoryElements = await screen.findAllByText("soirée entreprise");
      
      // Найдите элемент <li> с соответствующим текстом
      const categoryElement = categoryElements.find((element) => element.tagName === "LI");

      if (categoryElement) {
        // Найдите радиокнопку внутри <li> и кликните по ней
        const radioInput = categoryElement.querySelector('input[type="radio"]');
        fireEvent.click(radioInput);
        console.log('Selected category');

        // Ожидание фильтрации
        await waitFor(() => {
          expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
          expect(screen.queryByText("Conférence #productCON")).toBeInTheDocument();
        });
      } else {
        throw new Error('Category element not found');
      }
    });
  });
});





