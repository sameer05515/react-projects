const GlobalConstants = {
    tweetsApplicationBaseURL: "http://127.0.0.1:3003",
};

export const BACKEND_APPLICATION_BASE_URL =
    process.env.BACKEND_APPLICATION_BASE_URL || "http://127.0.0.1:3003";

export const taskStatusList = [
    { id: "open", label: "Open" },
    { id: "close", label: "Close" },
    { id: "in_progress", label: "In Progress" },
    { id: "on_hold", label: "On Hold" },
];

export const getStatusLabelForId = (id) => {
    const data =
        taskStatusList.find((task) => task.id === id)?.label ||
        `Status not found for id: ${id}`;
    return data;
};

export const activityList = [
    {
      id: "1",
      label: "All",
      active: true,
      filteringLogic: (item) => {
        return true;
      },
    },
    {
      id: "2",
      label: "Comments",
      active: true,
      filteringLogic: (item) => {
        return item.type === "comment";
      },
    },
    {
      id: "3",
      label: "History",
      active: false,
      filteringLogic: (item) => {
        return item.type === "history";
      },
    },
    {
      id: "4",
      label: "Worklog",
      active: false,
      filteringLogic: (item) => {
        return item.type === "worklog";
      },
    },
    {
      id: "5",
      label: "Approvals",
      active: false,
      filteringLogic: (item) => {
        return item.type === "approvals";
      },
    },
  ];

export default GlobalConstants;
