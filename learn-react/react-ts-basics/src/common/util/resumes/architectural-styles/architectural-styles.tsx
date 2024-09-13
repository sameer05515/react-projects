import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";
import { ArchitecturalStyles } from "../initial-records";

interface ArchitecturalStyleBasicDetails {
  name: string;
  about: string;
  useCases: string[];
  examples: string[];
  keyFeatures: string[];
  advantages: string[];
  disadvantages: string[];
}

const ArchitecturalStyleBasicDetails: Record<
  string,
  ArchitecturalStyleBasicDetails
> = {
  [ArchitecturalStyles.Layered_Architecture]: {
    name: "Layered Architecture",
    about:
      "Organizes the system into layers, each layer performing a specific role (e.g., presentation, business logic, data access)",
    useCases: ["Enterprise applications", "web applications."],
    examples: ["MVC (Model-View-Controller)."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Client_Server_Architecture]: {
    name: "Client Server Architecture",
    about:
      "Divides the system into clients (requesters of services) and servers (providers of services).",
    useCases: ["Web applications", "database applications."],
    examples: ["A web browser (client) communicating with a web server."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Microservices_Architecture]: {
    name: "Microservices Architecture",
    about:
      "Breaks an application into smaller, independently deployable services, each responsible for a specific business function.",
    useCases: ["Large-scale systems, scalable and distributed applications."],
    examples: ["E-commerce platforms."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Event_Driven_Architecture]: {
    name: "Event Driven Architecture",
    about:
      "Uses events as the primary way to trigger and communicate between services or components.",
    useCases: ["Real-time systems", "IoT applications."],
    examples: ["Kafka-based systems."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.SOA_Service_Oriented_Architecture]: {
    name: "SOA Service Oriented Architecture",
    about:
      "Similar to microservices but services are larger and focus on reusability and interoperability.",
    useCases: ["Enterprise systems with diverse integrations."],
    examples: ["SOAP-based web services."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Monolithic_Architecture]: {
    name: "Monolithic Architecture",
    about: "The entire application is built as a single, unified unit.",
    useCases: ["Small-scale applications", "startups"],
    examples: ["Traditional web applications"],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Monolithic_Modular_Architecture]: {
    name: "Monolithic Modular Architecture",
    about: `
      Monolithic Modular Architecture organizes a monolithic application into distinct, loosely coupled modules or components within the same deployable unit. Each module has a clear separation of concerns, with well-defined interfaces to communicate with other modules. The goal is to combine the simplicity of a monolithic application with the flexibility and maintainability of modular design.
      
      This architecture is often used as a stepping stone towards microservices or when teams need simplicity and modularity without the overhead of distributed systems.

      **Comparison to Microservices**:  
      While microservices split the application into independently deployable services, Monolithic Modular Architecture keeps everything within a single unit. However, the internal modularity provides some of the benefits of microservices without the operational complexity. 
      `,
    useCases: [
      "Applications with low complexity that still require modularity for future scalability.",
      "Enterprise applications in early development phases aiming for gradual transition to microservices.",
      "Systems with shared business logic that don’t require separate deployment.",
    ],
    examples: [
      "A large enterprise system like an e-commerce platform where modules are structured as 'User Management Module', 'Inventory Management Module', 'Order Processing Module', 'Payment Processing Module'. These modules exist within the same deployable artifact but are logically separated, enabling better organization and team collaboration.",
    ],
    keyFeatures: [
      "Single deployable artifact (e.g., a single JAR, WAR, or executable).",
      "Internally organized into modules for better maintainability.",
      "Strong encapsulation of functionality within modules.",
      "Shared memory and a unified codebase.",
      "Modular dependencies managed at build-time (e.g., using Maven, Gradle).",
    ],
    advantages: [
      "**Simplicity**: Easier to develop, test, and deploy compared to fully distributed systems.",
      "**Maintainability**: Modular design improves code organization, making the system easier to extend and maintain.",
      "**Performance**: No network overhead since all modules communicate in-process.",
      "**Transition-Friendly**: Easier to evolve into microservices later, as modules can be independently extracted.",
    ],
    disadvantages: [
      "**Scaling Limitations**: Vertical scaling is required, as all modules are deployed together. ",
      "**Coupling Risk**: Poor module boundaries can lead to tight coupling over time. ",
      "**Deployment Overhead**: Any change requires redeploying the entire application.",
    ],
  },
  [ArchitecturalStyles.Event_Sourcing_Architecture]: {
    name: "Event Sourcing Architecture",
    about:
      "All changes to an application’s state are stored as a sequence of events.",
    useCases: [
      "Applications requiring audit trails or time-based state reconstruction.",
    ],
    examples: ["Financial transaction systems."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Serverless_Architecture]: {
    name: "Serverless Architecture",
    about:
      "Relies on cloud providers to manage the infrastructure, focusing only on code (functions) and its execution.",
    useCases: ["Scalable, event-driven applications."],
    examples: ["AWS Lambda-based systems."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Component_Based_Architecture]: {
    name: "Component Based Architecture",
    about:
      "Decomposes the system into reusable and interchangeable components.",
    useCases: ["Modular applications."],
    examples: ["React or Angular component-based UIs."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Peer_To_Peer_Architecture]: {
    name: "Peer To Peer Architecture",
    about:
      "All nodes act as both clients and servers, sharing resources directly without a central server.",
    useCases: ["File-sharing systems", "blockchain networks."],
    examples: ["BitTorrent", "Bitcoin."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Hexagonal_Architecture]: {
    name: "Hexagonal Architecture",
    about:
      "Focuses on decoupling the core logic from external systems via ports and adapters.",
    useCases: ["Testable and maintainable systems."],
    examples: ["Domain-driven design implementations."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.CQRS_Command_Query_Responsibility_Segregation]: {
    name: "CQRS Command Query Responsibility Segregation",
    about:
      "Separates the responsibility of handling commands (write operations) from queries (read operations).",
    useCases: ["High-performance systems with complex querying needs."],
    examples: ["E-commerce with high read/write throughput."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Pipe_and_Filter_Architecture]: {
    name: "Pipe and Filter Architecture",
    about:
      "Processes data through a series of transformations (filters) connected by pipes.",
    useCases: ["Data processing systems."],
    examples: ["UNIX pipelines."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
  [ArchitecturalStyles.Distributed_Architecture]: {
    name: "Distributed Architecture",
    about:
      "Components of the system are distributed across different networked environments.",
    useCases: ["Scalable systems", "cloud-native applications."],
    examples: ["Distributed databases like Cassandra."],
    keyFeatures: [],
    advantages: [],
    disadvantages: [],
  },
};

export interface ArchitecturalStyleData {
  uniqueId: string;
  name: string;
  about: string;
  useCases: string[];
  examples: string[];
  keyFeatures: string[];
  advantages: string[];
  disadvantages: string[];
}

export const getComapnyDomainName = (uniqueId: string) =>
  ArchitecturalStyleBasicDetails[uniqueId]?.name || "";

export const getArchitecturalStyleData = (
  uniqueId: string
): ArchitecturalStyleData | null => {
  const details = ArchitecturalStyleBasicDetails[uniqueId];
  if (!details) return null;
  return {
    uniqueId: uniqueId,
    ...details,
  };
};

export const getAllArchitecturalStyles = () => {
  let computedCompanies: ArchitecturalStyleData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(ArchitecturalStyles);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedCompanies = Object.values(ArchitecturalStyles).reduce(
      (acc: ArchitecturalStyleData[], uniqueId) => {
        const data = getArchitecturalStyleData(uniqueId);
        if (data) {
          acc.push(data);
        }
        return acc;
      },
      []
    );

    return { success: true, data: computedCompanies, messages: [] };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { success: false, data: [], messages: e.data };
    }
  }
};
