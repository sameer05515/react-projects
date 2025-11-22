import React, { useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useFetchByUrl from "./v1";
import { fetchFnWrapper } from "./utils";

jest.mock("./utils", () => ({
  __esModule: true,
  ...jest.requireActual("./utils"),
  fetchFnWrapper: jest.fn(),
}));

function Probe({ url = "https://api.example/items" }) {
  const { data, loading, error, refetch } = useFetchByUrl({ url, source: "probe" });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div data-testid="state">loading</div>;
  if (error) return <div data-testid="state">error:{error}</div>;
  return <div data-testid="state">data:{data ? JSON.stringify(data) : "null"}</div>;
}

describe("useFetchByUrl (v1)", () => {
  beforeEach(() => {
    jest.mocked(fetchFnWrapper).mockReset();
  });

  it("sets data from fetchFnWrapper on refetch", async () => {
    jest.mocked(fetchFnWrapper).mockResolvedValue({
      data: { ok: true },
      isError: false,
      message: "",
    });

    render(<Probe />);

    await waitFor(() => {
      expect(screen.getByTestId("state").textContent).toContain("data:{\"ok\":true}");
    });
    expect(fetchFnWrapper).toHaveBeenCalledWith({
      url: "https://api.example/items",
      options: {},
    });
  });

  it("surfaces message as error state when fetchFnWrapper returns isError", async () => {
    jest.mocked(fetchFnWrapper).mockResolvedValue({
      data: null,
      isError: true,
      message: "Bad request",
    });

    render(<Probe />);

    await waitFor(() => {
      expect(screen.getByTestId("state").textContent).toContain("error:Bad request");
    });
  });
});
