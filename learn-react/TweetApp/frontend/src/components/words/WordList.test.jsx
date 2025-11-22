import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

import axios from "axios";
import wordsReducer from "../../redux/slices/wordsSlice";
import WordList from "./WordList";

jest.mock("../../common/components/Smart/Editor/v3", () => ({
  __esModule: true,
  SmartPreviewer: ({ data }) => (
    <div data-testid="previewer">{data?.content ?? ""}</div>
  ),
}));

describe("components/words/WordList", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("shows words after fetch succeeds", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: "w1",
          word: "alpha",
          type: "term",
          details: "<p>detail</p>",
        },
      ],
    });

    const store = configureStore({
      reducer: { words: wordsReducer },
    });

    render(
      <Provider store={store}>
        <WordList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("alpha")).toBeInTheDocument();
    });

    expect(screen.getByText("term")).toBeInTheDocument();
    expect(screen.getByTestId("previewer")).toHaveTextContent("detail");
  });
});
