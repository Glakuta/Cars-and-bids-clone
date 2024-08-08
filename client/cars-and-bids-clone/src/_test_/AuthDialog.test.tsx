import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import NavBar from "../components/NavBar";
import "@testing-library/jest-dom";

jest.mock(".././assets/cars-logo.png", () => "cars-logo.png");

describe()