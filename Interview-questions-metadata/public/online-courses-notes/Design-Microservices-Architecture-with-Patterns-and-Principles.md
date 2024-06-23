# Design Microservices Architecture with Patterns and Principles
Udemy course  
Started on: 01 May 2024  
Completed on:  
Last Read: Lecture 198
link: https://www.udemy.com/course/design-microservices-architecture-with-patterns-principles/learn/lecture/36034166#content

## Monolithic Architecture

## Layered (N-Layer) Monolithic Architecture

## Clean Architecture
 - **Goal :** To achieve Separation of concerns and making it scalable, testable, and maintainable.
 - The layers of Clean Architecture are: Presentation Layer, Application Layer, Domain Layer, and Infrastructure Layer. The Presentation Layer handles user interface and user interactions, the Application Layer handles business logic, the Domain Layer contains the core entities and business rules, and the Infrastructure Layer contains the low-level technical details such as databases, APIs, and external services.
 - Clean Architecture has really good advantages to organize code and increase testability. But when it comes to adding new feature into application that written with Clean Architecture, It's hard to develop new feature that required to touch all layers, even a small changes we have to locate Domain, Application, UI and Infrastructure layers.
 - While Clean Architecture offers many benefits for scalability and maintainability, it can introduce unnecessary complexity for smaller, simpler applications.
 - **Problem identified:** Scalability issue

## Scalability
- Scalability is primarily about handling growth, whether that's more users, more transactions, or increased data.
- Vertical scaling, often known as "scaling up", involves increasing the resources of an existing server or instance.
- Horizontal scaling, known as "scaling out", involves adding more servers or instances to distribute the load.
- Vertical scaling is typically used when a single node has reached its maximum capacity but still has available resources such as unused CPU or memory, it can be a good option to upgrade that node rather than adding a new one.
- Horizontal scaling is typically used when a system has reached its maximum capacity and can no longer be upgraded vertically, or when the system requires a higher level of redundancy, availability or scalability.
- A load balancer ensures that no single server is overwhelmed with too much traffic, thereby distributing requests efficiently.
- By separating concerns, each component (database, application server, etc.) can be scaled based on its individual needs.
- The Load Balancer sits between incoming traffic (from the internet) and the application servers, distributing requests as needed.

## Modular monolithic architecture

- **Problem :** - Agility of New Features, Split Agile Teams
- Modular monolithic architecture is the solution for above problem. 
- A Modular Monolithic Architecture divides the application into modules that encapsulate specific functionality, but all run in a single process space.
- By compartmentalizing functionality into modules, development can progress in a structured manner with reduced complexities.
- If not carefully managed, the modules might lose their encapsulation, leading to a tightly coupled and hard-to-maintain system.
- The modular approach allows developers to start simple while maintaining the flexibility to evolve the architecture as needs become clearer.
- The goal of Monolithic First is to start with a simple, easy-to-understand architecture and gradually add more complexity as the application's requirements evolve, rather than trying to design a complex, modular architecture from the start.
- Since everything in a monolithic application runs in a single process space, communication between modules is typically through direct method or function calls.
- In a monolithic architecture, transaction management is typically handled within the same process and service as the rest of the application. The central component of the application, which is responsible for transaction management, communicates with other parts of the application within the same process.
- In a monolithic architecture, transactions typically occur within the context of a single process, so that is inter-process communication to manage transactions. This can make transaction management simpler and more straightforward compared to a microservices architecture, where transactions often involve coordination between multiple modules and services.
- One of the challenges with monoliths is that a change in any part of the code often necessitates redeploying the entire application.
- In a headless architecture, the frontend (or "head") is separated from the backend, often communicating via APIs. This allows for greater flexibility in frontend choices and can improve scalability and maintainability. Also allowing the front-end to be developed and deployed independently.
- **Problem identified:** - Scale and Deploy independently
- **Solution:** - Microservices architecture

## Microservices architecture
 - Microservices are small, autonomous services that work together. Each microservice runs a unique process and communicates through a well-defined, lightweight mechanism (typically an HTTP resource API) to serve a business goal.
 - Microservices are designed to be loosely coupled, meaning that they operate independently of one another.
 - One of the advantages of microservices is the ability to scale services based on their individual demand, without affecting the entirety of the application.
 - Due to the distributed nature of microservices, managing data consistency can be more complex compared to monolithic applications.
 - For smaller applications with no high scaling requirements or complexity, the overhead introduced by microservices may not be justified.
 - One of the advantages of microservices is the flexibility to use the best tools (databases, programming languages) suited for each service's specific needs.
 - The Database-per-Service pattern emphasizes that each microservice should own and control its underlying database to maintain decoupling.
 - As you break an application into distributed microservices, the communication across services over a network introduces latency and the potential for network failures.
 - Starting with a monolith can help teams validate business assumptions quickly without getting bogged down in the complexities of microservices. Only when scaling or other concerns emerge do they consider breaking the monolith into microservices.
 - Sharing data schema across services can lead to tight coupling, which is something microservices aim to avoid. Each service should own and control its data to maintain independence.
 - Polyglot Persistence means that different services can use different databases that are best suited to their specific needs.
 - One of the biggest challenges in the transition is determining the boundaries of each service, ensuring they are coherent, and avoiding tight inter-service dependencies.
 - Product recommendation is a distinct domain with specific challenges, data sources, and requirements, making it a good candidate for its own service. Combining unrelated domains, as in the other options, may lead to unnecessary complexities.
 - In a microservices architecture, different aspects of a system (like cart management, payment processing, and shipping) would typically be handled by distinct services to maintain separation of concerns.
 - One of the benefits of microservices is the ability to scale individual services independently. If a product becomes popular, you can scale only the services that are most affected, like Inventory and Order Processing, without having to scale the entire system.
 

# Decomposition of Microservices Architecture
 - Decomposition by Business Capability
 - Decomposition by sub-domain
 - Decomposition is key in microservices to break down a complex application into smaller, manageable, and loosely-coupled services that align with specific business capabilities or domains.
 - The Y-axis of the Scale Cube represents functional decomposition, where applications are split based on functionality or business capability, typically resulting in microservices.
 - Decomposing by business capability focuses on creating services around business functions or capabilities, leading to services that are more aligned with business goals.
 - In DDD, a Bounded Context sets the boundaries for a specific domain model, ensuring clarity and avoiding ambiguity by delineating where a model can be used and how it's interpreted.
 - Bounded Contexts help in ensuring that models are consistent within their boundaries and that there's no ambiguity in their interpretation.
 - Decomposing by subdomain focuses on breaking down the system into services that align with distinct business areas or subdomains within the broader domain.
 - One of the main advantages of microservices is the independence of services. After decomposition, services should ideally be able to operate, scale, and evolve independently of one another.
 

# Microservices communication - The basics
 - Types of communication
    - Synchronous communication
      - HTTP
      - REST
      - GraphQL
      - gRPC
      - WebSocket API
    - Asynchronous comunication
 - In monolithic applications, modules communicate through in-process calls, but in microservices, these have to be replaced by inter-service communication due to the distributed nature of the architecture.
 - In synchronous communication, the sender sends a message and waits for a response from the receiver before continuing.
 - In a Request-Driven architecture, services explicitly request data or actions from other services, often awaiting responses.
 - RESTful APIs commonly use the HTTP/HTTPS protocols for communication, leveraging standard methods like GET, POST, PUT, and DELETE.
 - In designing a RESTful API for e-commerce microservices, what would a GET request to `/products/12345` likely retrieve?
    - The URI structure indicates a request for a specific product resource, identified by its ID, which is 12345 in this case.
 - RESTful API design emphasizes clarity, simplicity, and resource-orientation. Thus, URIs should be consistent and focused on resources.
 - As microservices evolve, changes to their APIs might be required. Versioning ensures that existing clients can still function as expected while accommodating new features or changes.
 - If the orders microservice directly requests data from products, it is initiating a direct request for data, characteristic of Request-Driven communication.
 - One of the major benefits of GraphQL is that it gives clients the power to ask for precisely what they need, which can reduce the amount of over-fetching or under-fetching of data.
 - GraphQL schemas define the capabilities of the API by specifying data types and the relationships between them.
 - One challenge of GraphQL is that allowing clients to make arbitrary queries can lead to performance issues, especially if clients request deep nested data.
 - GraphQL promotes the idea of continuously evolving the schema rather than creating new versions of the API.
 - gRPC is an open-source framework designed by Google to facilitate high-performance remote procedure calls using HTTP/2 for transport.
 - gRPC uses Protocol Buffers(protobufs) as the interface definition language. This allows for the specification of services and their methods.
 - gRPC is highly efficient and optimized for performance, making it a suitable choice when low latency and efficiency are priorities.
 - WebSockets allow for real-time bidirectional communication, making it a suitable choice for chat applications.

 # Microservices Communication Patterns - API Gateways
 - The API Gateway pattern is a common design pattern in microservices architecture. It involves the use of a single entry point, such as a gateway server, to receive requests and route them to the appropriate microservice. This can help to reduce complexity and improve performance by offloading some of the routing and request handling responsibilities from the individual microservices.
 - An API Gateway sits between a client and a collection of backend services, and is responsible for routing requests to the appropriate service based on the request URL and other parameters.
 - API Gateway in a microservice-based application provides lots of benefits that we can listed; Using for a single, consistent interface for external clients to access the microservices Using for offload tasks such as routing and authentication from the microservices Using for caching and request aggregation
 - API Gateway is not typically responsible for storing application data. This is typically the responsibility of the backend services that the API Gateway is proxying requests to. An API Gateway's primary responsibilities include routing requests, enforcing security and throttling policies, and providing authentication and authorization mechanisms.
 - API Gateway can help to improve the performance of a microservice-based application through features such as caching and request aggregation. For example, the API Gateway can cache the responses from microservices, reducing the number of times a microservice needs to be called to handle a request. This can help to improve the overall performance of the application.
 - There are 3 main pattern which becomes an API Gateway feautures, that are; 
   - **Gateway Routing pattern:** Gateway Routing pattern is Route requests to multiple microservices with exposing a single endpoint. 
   - **Gateway Aggregation pattern:** It provide to aggregate multiple individual requests towards to internal microservices with exposing a single request to the client. 
   - **Gateway Offloading pattern:** It offers to combine commonly used shared functionalities into a gateway proxy services.
 - The API Gateway uses various techniques to apply rate limiting, such as limiting the number of requests per second or per minute that a specific client can make. This can help prevent denial of service attacks and ensure that the application remains available and responsive for all users.
 - API Gateway can be used to apply authentication and authorization to incoming requests. For example, it can verify the user's credentials and determine whether they have the appropriate permissions to access the requested resource. This helps ensure that only authorized users can access sensitive data or perform actions within the application.
 - The BFF pattern involves creating specific backends for each frontend application, tailored to the specific needs and requirements of that frontend. This allows for optimized communication and feature sets for each type of client (e.g., mobile, web).
 - One benefit of using the BFF pattern is improved user experience for frontend applications and avoids single-point-of failure.
 - The BFF pattern is beneficial because it allows the creation of dedicated backend services for each type of frontend application (e.g., mobile, web). This customization enables the backend services to be optimized for the specific requirements and features of each frontend, improving performance and enhancing the user experience.
 - The Service aggregator design pattern is receives a request from the client or API Gateway,  and then dispatches requests of multiple internal backend microservices, and then combines the results and responds back to the initiating request in 1 response structure.
 - The Service aggregator design pattern is receives a request from the client or API Gateway,  and then dispatches requests of multiple internal backend microservices, and then combines the results and responds back to the initiating request in 1 response structure.
 - The Service Registry pattern is a common design pattern in microservices architecture. It involves the use of a registry service, which is a component that maintains a list of all the available microservices and their current status. This can help to facilitate discovery and communication among the various microservices, and to manage the lifecycle of microservices, such as registration, health checks, and de-registration.
 - The primary purpose of the Service Registry in the Service Registry/Discovery Pattern is to maintain a dynamic, real-time list of all active service instances and their network locations (such as IP addresses and ports). This allows microservices to discover and communicate with each other dynamically, which is essential for scalability, load balancing, and resilience in a microservices architecture.
 - if several microservices call each other synchronously to perform a use case, It causes chain of requests and highly coupled dependent microservices. With the asynchronous communication, this problem can be solve.
 - The API Gateway serves as a unified entry point for all client requests, simplifying client-side communication. It routes requests to the appropriate microservices, reducing the complexity clients would face if they had to communicate with each service directly.
 - An API Gateway centralizes common tasks that need to be performed across requests and services, such as authentication, SSL termination, and rate limiting. This approach helps in managing these aspects efficiently without duplicating effort across microservices.
 - After receiving a request from a client, the API Gateway routes it to the appropriate microservices based on the request path, method, and other criteria. It acts as an intermediary that directs client requests to the correct destination within the microservices architecture.
 - The Service Registry/Discovery Pattern helps microservices discover and communicate with each other by maintaining a dynamic list of service instances and their network locations. This enables services to query the registry and find the network addresses of other services they need to communicate with, facilitating dynamic scaling and deployment.
 

 # Section 12: Microservices Asynchronous Message-Based Communication
- Asynchronous communication in microservices has lots of benefit but the main advantage is decoupling services and continue their operation without any wait time.
- Asynchronous communication in microservices communicates on messaging and queues to provide decouple services and not to be available at the same time that is also increase scalability.
- Some benefits of using asynchronous communication in a microservices architecture include: allowing each service to operate independently, improving the overall performance and scalability of the system, and ensuring that messages are delivered even if the services are not immediately available to receive them.
- All of the examples listed in the answer choices are examples of asynchronous communication in microservices. In each case, the system uses microservices to handle different aspects of the user or customer experience, and asynchronous communication is used to allow the services to communicate with each other without the need for them to be actively available at the same time.
- When a customer places an order on the website is an example of asynchronous communication in an e-commerce application. When the customer submits their order, the microservice that handles the order sends a message to a separate microservice that handles payment processing. The payment microservice processes the payment and sends a confirmation message back to the order microservice, which updates the order status and sends a confirmation email to the customer. This process involves asynchronous communication between the two microservices.
- There are two kinds of asynchronous messaging communication: Single receiver message-based communication that we can say one-to-one model or Point-to-point model, Multiple receivers message-based communication that we say one-to-many(topic) or publish/subscribe model.
- In One-to-one asynchronous communication, the sender microservice requests specific information or data from the recipient microservice, and the recipient microservice processes the message and sends a response back.
- One-to-many asynchronous communication in microservices is a scenario where one microservice sends a message to multiple other microservices. In this type of communication, the sender microservice broadcasts a message to multiple recipient microservices in order to coordinate a group action or process. Each recipient microservice processes the message and sends a response back to the sender microservice.
- When the order microservice sends a message to multiple fulfillment microservices to coordinate the packing and shipping of an order is an example of one-to-many asynchronous communication in an e-commerce application. In this scenario, the order microservice sends a message to multiple fulfillment microservices to coordinate the process of packing and shipping an order to a customer. Each fulfillment microservice receives the message, processes it, and sends a confirmation message back to the order microservice. This process involves one-to-many asynchronous communication.
- The Publish/Subscribe Pattern is a messaging pattern where a single microservice, known as the publisher, sends messages to a message broker or messaging queue, which then distributes the message to multiple other microservices, known as subscribers. Each subscriber receives the message and processes it independently, without the need for real-time interaction with the publisher.
- Both Kafka and RabbitMQ can be used for implementing the Publish/Subscribe Pattern in microservices. Kafka is a popular open-source stream processing platform that provides a Publish/Subscribe messaging system, and RabbitMQ is another popular open-source message broker that provides a similar system.
- There are Serverless cloud options for asynchronous integration. Amazon EventBridge for Event-driven applications that you can define your custom event-bus Amazon SNS Google Pub/Sub Azure Service Bus Services Amazon Kinesis for event streaming.


# Section 13: [OPTIONAL] Kafka and RabbitMQ Architectures


# Section 14: Scale the Microservices Architecture Design
- Microservices architecture supports horizontal scaling, which means you can scale out specific services independently based on their individual load or performance requirements. This is more flexible and often more cost-effective than vertical scaling, where the entire application must be scaled.
- The A-axis does not exist in the Scale Cube. The Scale Cube consists of three dimensions: the X-axis represents the horizontal scaling of a system, the Y-axis represents the vertical scaling of a system, and the Z-axis represents the functional decomposition of a system.
- Stateless applications do not retain session state between requests, which means any instance of the application can handle any request. This makes it easier to add or remove instances in response to demand without worrying about a user's state.
- For stateful applications, you can use a distributed cache (like Redis) or persistent storage to share session state across instances. This allows you to scale horizontally by adding more instances while maintaining state.
- Scaling all services at the same rate is not efficient and can be costly. Microservices should be scaled based on their specific load and performance metrics, which allows for more efficient use of resources.

# Section 15: Microservices Data Management - Choosing Right Database
- The database-per-service pattern is a design pattern in which each microservice has its own dedicated database, rather than sharing a single database across the entire system. This pattern allows for greater flexibility and scalability, but it can also be more complex to implement and to maintain.
- Polyglot Persistence is an approach to designing and implementing a data storage solution for microservices applications. It involves using multiple, different types of data storage technologies, each optimized for a specific purpose or workload, rather than using a single, monolithic database.
- The Shared Database principle is a design approach for microservices that requires all microservices to use a single, shared database for data storage. It is considered an anti-pattern because it goes against the core principles and design goals of microservices architecture.
- The Shared Database principle is considered an anti-pattern for microservices. It goes against the core principles and design goals of microservices architecture, and it creates a single point of failure and can affect the entire system.
- Some characteristics of relational databases are strong data integrity and consistency, and support for complex queries and transactions. They are typically not as scalable or performant as other types of databases, such as NoSQL databases, but they can support a wide range of data types and structures.
- Relational databases are not designed for the high-volume, high-velocity workloads that are common in microservices, and they can create a tight coupling between the microservices that use them, which can make it difficult to develop and update each microservice independently. And a single point of failure and difficulty in scaling each microservice independently. These issues can make it difficult to design, implement, and maintain a microservices application that uses relational databases.
- No-SQL databases has different types of stored data and data models. NoSQL databases - Document, Key-value, Graph-based, Column-based databases.
- The key difference between relational and NoSQL databases is how they store and manage data. Relational databases use a structured approach, where data is organized into tables and relationships are defined between different tables. NoSQL databases, on the other hand, use a more flexible approach, often using document-based or key-value-based storage. Also NoSQL databases are horizontally scalable, while Relational databases are not and Relational databases support transactions, while NoSQL databases do not. Both database can be open sources, so this is not a different point at all.
- The main advantages of Relational database is ACID compliance. The common principle is if one change fails on database, the whole transaction is going to fail. If you have an application that the data is predictable, according to structure, size, and frequency of access, relational databases are still the best choice. Relational Database has a fixed schema. So, If your data is highly structured and requires referential integrity, its good to continue with Relational Databases.
- NoSQL Databases has Flexible Schema that is one of the biggest advantage. NoSQL Database has no fixed schema. If you have high volume workloads and needs to horizontal scale with low latency its good to continue with No-SQL Databases. NoSQL Databases has flexible schema so data retrieve operations are simple and performs without table joins.
- A microservice that handles orders and transactions in an e-commerce system may benefit from the structured data model and support for complex transactions provided by a relational database. This can help to ensure data consistency and integrity, and it can make it easier to query and manipulate the data.
- A microservice that handles product catalogs and user profiles may benefit from the flexibility and scalability of a NoSQL database. This can make it easier to adapt to changing requirements and handle large amounts of data.
- The CAP theorem states that it is impossible for a distributed system to be always consistent, always available, and able to tolerate partitions at the same time. In other words, it is necessary to make trade-offs between different guarantees in order to design and implement a distributed system.
- The main implication of the CAP theorem for microservices is that it is necessary to sacrifice some guarantees in order to achieve others. For example, if strong consistency is a priority, then it may be necessary to sacrifice some availability or partition tolerance.
- Horizontal partitioning, also known as sharding, involves dividing a dataset into smaller pieces based on a specific criterion, such as a unique identifier or a certain attribute of the data. This can make it easier to manage and query the data, and it can improve performance by allowing different partitions to be accessed and processed in parallel.
- Vertical partitioning, also known as columnar partitioning, involves dividing a dataset into smaller pieces based on the columns or attributes of the data. This can reduce the amount of data that needs to be accessed and processed for a given query, and it can improve the performance of certain types of queries.
- In microservices, database sharding pattern can be used to improve the performance and scalability of the databases used by the different services. By dividing the data into smaller pieces that can be managed and accessed more efficiently.
- Cassandra is a popular NoSQL database that is often used in microservices architectures due to its ability to handle large amounts of data, support for distributed environments, and high availability. Some benefits of using Cassandra in microservices include scalability, fault tolerance, data model flexibility, and query language support with data partitioning, sharding, and distributed architecture.

# Section 16: Microservices Data Management - Commands and Queries
- 


