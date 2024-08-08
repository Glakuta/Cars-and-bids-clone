import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import NavBar from "../components/NavBar";
import "@testing-library/jest-dom";

jest.mock(".././assets/cars-logo.png", () => "cars-logo.png");

describe("NavBar", () => {
  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <NavBar />
      </Provider>
    );

    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();

    const signInMenuItem = screen.queryByText("Sign in");
    expect(signInMenuItem).toBeInTheDocument();

    if (signInMenuItem) {
      fireEvent.click(signInMenuItem);

      const authDialog = screen.getByTestId("auth-dialog");
      expect(authDialog).toBeInTheDocument();
    }

    const userProfileMenu = screen.queryByLabelText("Profile");
    expect(userProfileMenu).not.toBeInTheDocument();
  });
});
