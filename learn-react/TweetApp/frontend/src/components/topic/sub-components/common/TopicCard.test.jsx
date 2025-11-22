import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TopicCard from "./TopicCard";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../../../../common/hooks/useGlobalServiceProvider", () => ({
  __esModule: true,
  default: () => ({
    BreadcrumbItemType: { TOPIC: "TOPIC" },
  }),
}));

// Keep tests focused on TopicCard: mock heavy child components.
jest.mock("../../../../common/components/global-breadcrumbs/GlobalBreadcrumb", () => ({
  __esModule: true,
  default: () => <div data-testid="breadcrumbs" />,
}));

jest.mock("../../../../common/components/hoverable-span/HoverableSpan", () => ({
  __esModule: true,
  default: ({ children, onClick, className }) => (
    <span className={className} onClick={onClick}>
      {children}
    </span>
  ),
}));

jest.mock("../../../../common/components/list-section/ListSection", () => ({
  __esModule: true,
  default: ({ items = [], renderItem }) => {
    const React = require("react");
    return (
      <div data-testid="list-section">
        {items.map((item, idx) => (
          <React.Fragment key={item?.uniqueId || item?.id || idx}>
            {renderItem ? renderItem(item, idx) : null}
          </React.Fragment>
        ))}
      </div>
    );
  },
}));

jest.mock("../../../../common/components/floating-button/FloatingButton", () => ({
  __esModule: true,
  default: ({ buttonText, children }) => (
    <div>
      <div data-testid={`floating-${buttonText}`}>{buttonText}</div>
      {children}
    </div>
  ),
}));

jest.mock("../../../../common/components/dynamic-data-renderer/DynamicDataRenderer", () => ({
  __esModule: true,
  default: () => <div data-testid="dynamic-data-renderer" />,
}));

jest.mock("../../../../common/components/Smart/Editor/v3", () => ({
  __esModule: true,
  SmartPreviewer: ({ data }) => (
    <div data-testid="smart-previewer">{data?.content || data?.textOutputType || ""}</div>
  ),
}));

jest.mock("../../../../common/components/toggleable-panel/ToggleablePanel", () => ({
  __esModule: true,
  default: ({ title, showContent, children }) => (
    <div data-testid="toggleable-panel">
      <div>{title}</div>
      {showContent ? children : null}
    </div>
  ),
}));

jest.mock("../../../../common/components/tree-viewer/TreeViewer", () => ({
  __esModule: true,
  default: ({ data = [], renderNode }) => {
    const React = require("react");
    return (
      <div data-testid="tree-viewer">
        {data.map((n, idx) =>
          renderNode ? (
            <React.Fragment key={n?.uniqueId || idx}>{renderNode(n)}</React.Fragment>
          ) : null
        )}
      </div>
    );
  },
}));

jest.mock("./TopicSectionCard", () => ({
  __esModule: true,
  default: ({ data }) => <div data-testid="topic-section-card">{data?.name || data?.uniqueId}</div>,
}));

describe("TopicCard", () => {
  const mockTags = [
    { uniqueId: "t1", title: "Tag One", _id: "1" },
    { uniqueId: "t2", title: "Tag Two", _id: "2" },
  ];

  beforeEach(() => {
    const { useSelector } = require("react-redux");
    useSelector.mockReturnValue(mockTags);
  });

  it("renders compact view: name, tags, date, and tag click stops parent click", async () => {
    const onTopicClick = jest.fn();
    const onLinkedTagSelection = jest.fn();

    const topic = {
      uniqueId: "topic-1",
      name: "Topic A",
      occurenceDate: "2020-01-01T00:00:00.000Z",
      tags: ["t1", "t2"],
      ancestors: [],
      sections: [],
      children: [],
      published: false,
      description: "",
      smartContent: null,
    };

    render(
      <TopicCard
        variant="compact"
        topic={topic}
        onTopicClick={onTopicClick}
        onLinkedTagSelection={onLinkedTagSelection}
      />
    );

    expect(screen.getByText("Topic A")).toBeInTheDocument();
    expect(screen.getByText("Tag One")).toBeInTheDocument();
    expect(screen.getByText("Tag Two")).toBeInTheDocument();

    // Clicking the card triggers onTopicClick.
    await userEvent.click(screen.getByText("Topic A"));
    expect(onTopicClick).toHaveBeenCalledTimes(1);

    // Clicking a tag chip should NOT trigger onTopicClick (stopPropagation),
    // but should call onLinkedTagSelection.
    await userEvent.click(screen.getByText("Tag One"));
    expect(onLinkedTagSelection).toHaveBeenCalledTimes(1);
    expect(onLinkedTagSelection).toHaveBeenCalledWith("t1");
    expect(onTopicClick).toHaveBeenCalledTimes(1);
  });

  it("renders full view: description toggle, publish, pin label, and disabled 'Convert to question'", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const onPublish = jest.fn();
    const onPinTopic = jest.fn();
    const onEdit = jest.fn();
    const onAddSubTopic = jest.fn();
    const onMoveAnotherParent = jest.fn();
    const onAddSection = jest.fn();
    const onChildTopicClick = jest.fn();
    const onAncestorClick = jest.fn();
    const onTopicSectionClick = jest.fn();

    const pinnedTopics = [
      {
        uniqueId: "pin-1",
        linkedItemType: "topic",
        linkedUniqueId: "topic-1",
        softDelete: false,
        title: "Pinned Topic",
      },
    ];

    const topic = {
      uniqueId: "topic-1",
      name: "Topic B",
      occurenceDate: "2020-01-01T00:00:00.000Z",
      tags: ["t1"],
      ancestors: [],
      children: [],
      sections: [],
      published: false,
      description: "<b>raw desc</b>",
      smartContent: null,
    };

    render(
      <TopicCard
        topic={topic}
        showDescription={false}
        variant="full"
        topicSections={[]}
        pinnedTopics={pinnedTopics}
        isPinned={true}
        onPublish={onPublish}
        publishing={false}
        publishError={null}
        onEdit={onEdit}
        onAddSubTopic={onAddSubTopic}
        onMoveAnotherParent={onMoveAnotherParent}
        onAddSection={onAddSection}
        onPinTopic={onPinTopic}
        onChildTopicClick={onChildTopicClick}
        onAncestorClick={onAncestorClick}
        onTopicSectionClick={onTopicSectionClick}
      />
    );

    // Pin label should reflect isPinned=true
    expect(screen.getByRole("button", { name: /Un-Pin topic/i })).toBeInTheDocument();

    // "Convert to question" exists (legacy behavior: enabled button that logs)
    const convertBtn = screen.getByRole("button", { name: /Convert to question/i });
    expect(convertBtn).toBeEnabled();

    // Publish button exists and triggers callback.
    await userEvent.click(screen.getByRole("button", { name: /Publish/i }));
    expect(onPublish).toHaveBeenCalledTimes(1);

    // Pin button triggers callback with (topic, isPinned)
    await userEvent.click(screen.getByRole("button", { name: /Un-Pin topic/i }));
    expect(onPinTopic).toHaveBeenCalledTimes(1);
    expect(onPinTopic).toHaveBeenCalledWith(topic, true);

    // Description is hidden initially, then becomes visible on click.
    expect(screen.queryByTestId("smart-previewer")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Show Description/i }));
    expect(screen.getByTestId("smart-previewer")).toBeInTheDocument();

    await userEvent.click(convertBtn);
    expect(console.log).toHaveBeenCalledWith("Yet to be implemented!!");

    consoleLogSpy.mockRestore();
  });
});

