import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_2";

interface TopicData {
  _id: string;
  parentId: string;
  name: string;
  uniqueId: string;
  children: TopicData[] | null;
}

export interface GraphNode {
  uniqueId: string;
  name?: string;
  isRootNode: boolean;
  previousNodes: { relationName?: string; uniqueId: string }[];
  nextNodes: { relationName?: string; uniqueId: string }[];
}

const urls = [
  "http://127.0.0.1:3003/topics",
  "http://127.0.0.1:3003/intvw-mgmt/v2/questions",
  "http://127.0.0.1:3003/tasks",
  "http://127.0.0.1:3003/tags",
];

export async function fetchTopics() {
  const data = await fetchGeneric<TopicData[]>(urls[0]);
  return data;
}

export async function topicsAsGraphNode(): Promise<GraphNode[]> {
  const data = await fetchTopics();
  const finalData: GraphNode[] = [];
  mapTopicToGNode(data, finalData, null);
  return finalData;
}

function mapTopicToGNode(
  data: TopicData[],
  gArr: GraphNode[],
  parentId: string | null
) {
  data.forEach((d) => {
    const graphNode: GraphNode = {
      uniqueId: d.uniqueId,
      name: d.name,
      isRootNode: !parentId, // If no parentId, it's the root node
      previousNodes: parentId
        ? [{ uniqueId: parentId, relationName: "Parent-Child" }]
        : [],
      nextNodes: [],
    };

    // Add current node to the graph array
    gArr.push(graphNode);

    // If there are children, recursively map them as well
    if (d.children && d.children.length > 0) {
      d.children.forEach((child) => {
        graphNode.nextNodes.push({
          uniqueId: child.uniqueId,
          relationName: "Parent-Child",
        });
      });
      // Recursive call for children
      mapTopicToGNode(d.children, gArr, d.uniqueId);
    }
  });
}

export const validateYaml = (yamlText: string = ``) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const raw: string = yamlText || "name: John\r\nage: 30\r\nlauda: 55cm\r\n";
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("http://127.0.0.1:8080/api/validateYaml", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

export const validateYamlV2 = async (yamlText: string = ``) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  const raw: string =
    yamlText ||
    `name: John\r\nage: 30\r\ndepartment: 55cm${new Date().toString()} \r\n`;

  const data = await fetchGeneric("http://127.0.0.1:8080/api/validateYaml", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: raw,
  });

  return data;
};
