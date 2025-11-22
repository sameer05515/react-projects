const { taskResponseDTO } = require("./Response.dtos");

describe("Response.dtos taskResponseDTO", () => {
  it("maps object to response shape with all fields", () => {
    const obj = {
      _id: "id1",
      uniqueId: "u1",
      title: "Task",
      parentId: "p1",
      description: "Desc",
      createdDate: new Date("2024-01-01"),
      updatedDate: new Date("2024-01-02"),
      taskStatus: "open",
      children: [{ uniqueId: "c1" }],
      ancestors: [{ uniqueId: "a1" }],
      tags: ["t1"],
      linkedTasks: ["lt1"],
    };
    const result = taskResponseDTO(obj);
    expect(result).toEqual({
      _id: "id1",
      uniqueId: "u1",
      title: "Task",
      parentId: "p1",
      description: "Desc",
      createdDate: obj.createdDate,
      updatedDate: obj.updatedDate,
      taskStatus: "open",
      children: [{ uniqueId: "c1" }],
      ancestors: [{ uniqueId: "a1" }],
      tags: ["t1"],
      linkedTasks: ["lt1"],
    });
  });

  it("defaults children to [] when missing", () => {
    const obj = {
      _id: "id1",
      uniqueId: "u1",
      title: "T",
      parentId: null,
      description: "",
      createdDate: new Date(),
      updatedDate: new Date(),
      taskStatus: "open",
    };
    const result = taskResponseDTO(obj);
    expect(result.children).toEqual([]);
    expect(result.ancestors).toEqual([]);
    expect(result.tags).toEqual([]);
    expect(result.linkedTasks).toEqual([]);
  });

  it("defaults ancestors, tags, linkedTasks to [] when missing", () => {
    const obj = {
      _id: "x",
      uniqueId: "u",
      title: "T",
      parentId: "p",
      description: "d",
      createdDate: new Date(),
      updatedDate: new Date(),
      taskStatus: "close",
    };
    const result = taskResponseDTO(obj);
    expect(result.ancestors).toEqual([]);
    expect(result.tags).toEqual([]);
    expect(result.linkedTasks).toEqual([]);
  });
});
