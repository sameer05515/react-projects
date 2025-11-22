import {
  isSliceFetchSuccess,
  isSliceIdle,
  isSliceLoading,
} from "./sliceFetchState";

describe("sliceFetchState", () => {
  it("isSliceLoading covers status and loading field variants", () => {
    expect(isSliceLoading({ status: "loading" })).toBe(true);
    expect(isSliceLoading({ status: "pending" })).toBe(true);
    expect(isSliceLoading({ loading: "pending" })).toBe(true);
    expect(isSliceLoading({ loading: "loading" })).toBe(true);
    expect(
      isSliceLoading({
        fetchCategoryTreeResponse: { loading: "pending" },
      })
    ).toBe(true);
    expect(isSliceLoading({ status: "idle" })).toBe(false);
  });

  it("isSliceIdle", () => {
    expect(isSliceIdle({ status: "idle" })).toBe(true);
    expect(isSliceIdle({ loading: "idle" })).toBe(true);
    expect(
      isSliceIdle({
        fetchCategoryTreeResponse: { loading: "idle" },
      })
    ).toBe(true);
    expect(isSliceIdle({ status: "pending" })).toBe(false);
  });

  it("isSliceFetchSuccess", () => {
    expect(isSliceFetchSuccess({ status: "succeeded" })).toBe(true);
    expect(isSliceFetchSuccess({ status: "fulfilled" })).toBe(true);
    expect(isSliceFetchSuccess({ loading: "fulfilled" })).toBe(true);
    expect(
      isSliceFetchSuccess({
        fetchCategoryTreeResponse: { loading: "fulfilled" },
      })
    ).toBe(true);
    expect(isSliceFetchSuccess({ status: "idle" })).toBe(false);
  });
});
