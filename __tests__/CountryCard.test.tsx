import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CountryCard from "@/components/CountryCard"; // Adjust the path if necessary
import { Country } from "@/types/country"; // Adjust the path if necessary
import "@testing-library/jest-dom";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe("CountryCard", () => {
  const country: Country = {
    name: { common: "Australia", official: "Commonwealth of Australia" },
    region: "Oceania",
    population: 25000000,
    capital: ["Canberra"],
    cca3: "AUS",
    flags: { png: "https://example.com/australia-flag.png" },
    isFavorite: false,
    car: {
      side: "left",
    },
    independent: true,
    startOfWeek: "Monday",
  };

  it("renders country details correctly", () => {
    render(<CountryCard country={country} />);

    expect(screen.getByText("Australia")).toBeInTheDocument();
    expect(screen.getByText("Oceania")).toBeInTheDocument();
    expect(screen.getByText("25,000,000")).toBeInTheDocument();
    expect(screen.getByText("Canberra")).toBeInTheDocument();
  });

  it("toggles the favorite state when heart icon is clicked", async () => {
    render(<CountryCard country={country} />);

    // Get the heart icon by role (button element) and find the SVG inside it
    const heartIconButton = screen.getByRole("button");
    const heartIcon = heartIconButton.querySelector("svg");

    // Initially not favorite (should be black)
    expect(heartIcon).toHaveAttribute("fill", "none");

    // Simulate clicking the heart icon
    fireEvent.click(heartIconButton);

    await waitFor(() => {
      // After clicking, the heart icon should be red
      expect(heartIcon).toHaveAttribute("fill", "red");
    });
  });

  it("navigates to the country details page when 'View Details' is clicked", () => {
    render(<CountryCard country={country} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/country/AUS");
  });
});
