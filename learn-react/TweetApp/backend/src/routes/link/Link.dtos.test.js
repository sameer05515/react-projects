const { linkResponseDTO } = require("./Link.dtos");

describe("Link.dtos linkResponseDTO", () => {
  it("maps linkData to response shape with uniqueId, name, parentId, linkType, linkUrl, descriptions, children, ancestors", () => {
    const linkData = {
      uniqueId: "u1",
      name: "My Link",
      parentId: "p1",
      linkType: "EXTERNAL-WEB",
      linkUrl: "https://example.com",
      descriptions: [{ content: "desc" }],
      children: [{ uniqueId: "c1" }],
      ancestors: [{ uniqueId: "a1", name: "Parent" }],
    };
    const result = linkResponseDTO(linkData);
    expect(result).toEqual({
      uniqueId: "u1",
      name: "My Link",
      parentId: "p1",
      linkType: "EXTERNAL-WEB",
      linkUrl: "https://example.com",
      descriptions: [{ content: "desc" }],
      children: [{ uniqueId: "c1" }],
      ancestors: [{ uniqueId: "a1", name: "Parent" }],
    });
  });

  it("defaults children to [] when missing", () => {
    const linkData = {
      uniqueId: "u1",
      name: "Link",
      parentId: null,
      linkType: "EXTERNAL-WEB",
      linkUrl: "https://x.com",
      descriptions: [],
    };
    const result = linkResponseDTO(linkData);
    expect(result.children).toEqual([]);
    expect(result.ancestors).toEqual([]);
  });

  it("defaults ancestors to [] when missing", () => {
    const linkData = {
      uniqueId: "u2",
      name: "Other",
      parentId: "p1",
      linkType: "EXTERNAL-WEB",
      linkUrl: "",
      descriptions: [],
      children: [],
    };
    const result = linkResponseDTO(linkData);
    expect(result.ancestors).toEqual([]);
  });
});
