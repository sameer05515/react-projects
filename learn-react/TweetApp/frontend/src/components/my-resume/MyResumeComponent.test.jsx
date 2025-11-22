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
import myResumeReducer from "../../redux/slices/myResumeSlice";
import MyResumeComponent from "./MyResumeComponent";

describe("components/my-resume/MyResumeComponent", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("renders resume data after fetch succeeds", async () => {
    axios.get.mockResolvedValue({
      data: {
        uniqueName: "My CV",
        expertiseSet: ["React", "Node"],
        createdDate: "2020-01-01T00:00:00.000Z",
        lastModifiedDate: "2021-06-15T00:00:00.000Z",
      },
    });

    const store = configureStore({
      reducer: { myResume: myResumeReducer },
    });

    render(
      <Provider store={store}>
        <MyResumeComponent uniqueId="resume-1" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /My CV/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Expertise:/i)).toHaveTextContent("React");
    expect(screen.getByText(/Expertise:/i)).toHaveTextContent("Node");
  });
});
