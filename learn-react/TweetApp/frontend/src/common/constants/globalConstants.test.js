import {
  BACKEND_APPLICATION_BASE_URL,
  getStatusLabelForId,
  taskStatusList,
} from "./globalConstants";

describe("globalConstants", () => {
  it("getStatusLabelForId returns label for known id", () => {
    expect(getStatusLabelForId("open")).toBe("Open");
    expect(getStatusLabelForId("in_progress")).toBe("In Progress");
  });

  it("getStatusLabelForId returns fallback message for unknown id", () => {
    expect(getStatusLabelForId("unknown_xyz")).toBe(
      "Status not found for id: unknown_xyz"
    );
  });

  it("taskStatusList has expected ids", () => {
    const ids = taskStatusList.map((t) => t.id);
    expect(ids).toEqual(
      expect.arrayContaining(["open", "close", "in_progress", "on_hold"])
    );
  });

  it("BACKEND_APPLICATION_BASE_URL is a non-empty string", () => {
    expect(typeof BACKEND_APPLICATION_BASE_URL).toBe("string");
    expect(BACKEND_APPLICATION_BASE_URL.length).toBeGreaterThan(0);
  });
});
