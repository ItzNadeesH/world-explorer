import { render, screen, waitFor } from "@testing-library/react";
import Favorites from "@/app/(root)/favorites/page";
import { Country } from "@/types/country";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

// Mock the necessary components
jest.mock("../components/Spinner", () => () => <div>Loading...</div>);
jest.mock("../components/CountryCard", () => ({ country }: { country: Country }) => (
  <div>{country.name.common}</div>
));

describe("Favorites", () => {
  it("displays 'No Favorites Found!' when there are no countries", async () => {
    // Mocking the fetch response with no favorites
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText("No Favorites Found!")).toBeInTheDocument();
    });
  });

  it("displays countries after data is fetched", async () => {
    const countries: Country[] = [
      {
        name: { common: "Australia", official: "Australia" },
        region: "Oceania",
        population: 25000000,
        capital: ["Canberra"],
        cca3: "AUS",
        flags: { png: "https://example.com/australia-flag.png" },
        isFavorite: true,
        car: { side: "left" },
        independent: true,
        startOfWeek: "Monday",
      },
    ];

    // Mocking the fetch response with countries data
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(countries),
    });

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText("Australia")).toBeInTheDocument();
    });
  });

  it("renders multiple countries correctly", async () => {
    const countries: Country[] = [
      {
        name: { common: "Australia", official: "Australia" },
        region: "Oceania",
        population: 25000000,
        capital: ["Canberra"],
        cca3: "AUS",
        flags: { png: "https://example.com/australia-flag.png" },
        isFavorite: true,
        car: { side: "left" },
        independent: true,
        startOfWeek: "Monday",
      },
      {
        name: { common: "Canada", official: "Canada" },
        region: "Americas",
        population: 38000000,
        capital: ["Ottawa"],
        cca3: "CAN",
        flags: { png: "https://example.com/canada-flag.png" },
        isFavorite: true,
        car: { side: "right" },
        independent: true,
        startOfWeek: "Monday",
      },
    ];

    // Mocking the fetch response with multiple countries
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(countries),
    });

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText("Australia")).toBeInTheDocument();
      expect(screen.getByText("Canada")).toBeInTheDocument();
    });
  });
});
