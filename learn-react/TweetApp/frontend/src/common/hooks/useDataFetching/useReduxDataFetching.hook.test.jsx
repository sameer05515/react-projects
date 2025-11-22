import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useReduxDataFetching from "./v2.js";

const fetchDemo = createAsyncThunk("demo/fetch", async () => [{ id: 1, name: "item" }]);

const demoSlice = createSlice({
  name: "demo",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemo.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchDemo.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchDemo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error?.message || "failed";
      });
  },
});

function HookConsumer() {
  const { data, loading, hasData, isSuccess } = useReduxDataFetching(
    fetchDemo,
    (state) => state.demo
  );
  return (
    <div>
      <span data-testid="loading">{loading ? "yes" : "no"}</span>
      <span data-testid="hasData">{hasData ? "yes" : "no"}</span>
      <span data-testid="success">{isSuccess ? "yes" : "no"}</span>
      <span data-testid="len">{Array.isArray(data) ? data.length : 0}</span>
    </div>
  );
}

function renderWithStore(ui) {
  const store = configureStore({ reducer: { demo: demoSlice.reducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("useReduxDataFetching (v2)", () => {
  it("dispatches thunk on mount when idle with no data and exposes loaded state", async () => {
    renderWithStore(<HookConsumer />);

    await waitFor(() => {
      expect(screen.getByTestId("len").textContent).toBe("1");
    });
    expect(screen.getByTestId("hasData").textContent).toBe("yes");
    expect(screen.getByTestId("success").textContent).toBe("yes");
    expect(screen.getByTestId("loading").textContent).toBe("no");
  });
});
