const nameArr = [
    {
        name: "Bikram Sah",
        children: [
            {
                name: "Sitaram Sah",
                children: [
                    { name: "Rajender Sah", relation: "Son" },
                    { name: "Mahender Sah", relation: "Son" },
                    { name: "Shankar Sah", relation: "Son" },
                    { name: "Chotan Sah", relation: "Son" },
                ],
            },
            {
                name: "Chandu Sah",
                children: [
                    {
                        name: "Bhola Prasad",
                        relation: "Son",
                        children: [
                            { name: "Premendra Kumar", relation: "Son" },
                            {
                                name: "Narendra Kumar",
                                relation: "Son",
                                children: [{ name: "Nandini Kumari", relation: "Daughter" }],
                            },
                            {
                                name: "Rimjhim Kumari",
                                relation: "Daughter",
                                children: [{ name: "Shaarvi Kumari", relation: "Daughter" }],
                            },
                        ],
                    },
                    {
                        name: "Koshalya Devi",
                        relation: "Daughter",
                        children: [
                            { name: "Ravi Ranjan", relation: "Son" },
                            { name: "Rajeev Ranjan", relation: "Son" },
                            { name: "Poonam Kumari", relation: "Daughter" },
                        ],
                    },
                ],
            },
            { name: "Nagina Sah", relation: "Son" },
            { name: "Mangal Sah", relation: "Son" },
        ],
    },
    {
        name: "Shrikrishna Sah",
        children: [
            { name: "Vijay Sah", relation: "Son" },
            { name: "Vinay Sah", relation: "Son" },
            { name: "Chilranji Lal Sah", relation: "Son" },
            { name: "Kanhaiya Sah", relation: "Son" },
        ],
    },
];

const mughalDynasty = [
    {
        name: "Babur",
        children: [
            {
                name: "Humayun",
                children: [
                    {
                        name: "Akbar",
                        children: [
                            {
                                name: "Jahangir",
                                children: [
                                    {
                                        name: "Shah Jahan",
                                        children: [
                                            {
                                                name: "Dara Shikoh",
                                                children: [],
                                            },
                                            {
                                                name: "Aurangzeb",
                                                children: [],
                                            },
                                            {
                                                name: "Shah Shuja",
                                                children: [],
                                            },
                                            {
                                                name: "Murad Baksh",
                                                children: [],
                                            },
                                        ],
                                    },
                                    {
                                        name: "Shahzada Khusrau",
                                        children: [],
                                    },
                                ],
                            },
                            {
                                name: "Daniyal Mirza",
                                children: [],
                            },
                            {
                                name: "Murad Mirza",
                                children: [],
                            },
                        ],
                    },
                    {
                        name: "Mirza Muhammad Hakim",
                        children: [],
                    },
                ],
            },
            {
                name: "Kamran Mirza",
                children: [],
            },
            {
                name: "Askari Mirza",
                children: [],
            },
            {
                name: "Hindal Mirza",
                children: [],
            },
        ],
    },
];

const ambaniFamily = [
    {
        name: "Dhirubhai Ambani",
        children: [
            {
                name: "Mukesh Ambani",
                children: [
                    {
                        name: "Akash Ambani",
                        children: [],
                    },
                    {
                        name: "Isha Ambani",
                        children: [],
                    },
                    {
                        name: "Anant Ambani",
                        children: [],
                    },
                ],
            },
            {
                name: "Anil Ambani",
                children: [
                    {
                        name: "Jai Anmol Ambani",
                        children: [],
                    },
                    {
                        name: "Jai Anshul Ambani",
                        children: [],
                    },
                ],
            },
            {
                name: "Nina Kothari",
                children: [
                    {
                        name: "Arjun Kothari",
                        children: [],
                    },
                    {
                        name: "Nayantara Kothari",
                        children: [],
                    },
                ],
            },
            {
                name: "Deepti Salgaocar",
                children: [
                    {
                        name: "Vivek Salgaocar",
                        children: [],
                    },
                    {
                        name: "Geetanjali Salgaocar",
                        children: [],
                    },
                ],
            },
        ],
    },
];

const britishRoyalFamily = [
    {
        name: "Queen Victoria",
        children: [
            {
                name: "Edward VII",
                relation: "Son",
                children: [
                    {
                        name: "George V",
                        relation: "Son",
                        children: [
                            {
                                name: "Edward VIII",
                                relation: "Son",
                                children: [],
                            },
                            {
                                name: "George VI",
                                relation: "Son",
                                children: [
                                    {
                                        name: "Queen Elizabeth II",
                                        relation: "Daughter",
                                        children: [
                                            {
                                                name: "Charles III",
                                                relation: "Son",
                                                children: [
                                                    {
                                                        name: "William, Prince of Wales",
                                                        relation: "Son",
                                                        children: [
                                                            {
                                                                name: "Prince George",
                                                                relation: "Son",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Princess Charlotte",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Prince Louis",
                                                                relation: "Son",
                                                                children: [],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        name: "Prince Harry, Duke of Sussex",
                                                        relation: "Son",
                                                        children: [
                                                            {
                                                                name: "Archie Mountbatten-Windsor",
                                                                relation: "Son",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Lilibet Mountbatten-Windsor",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Princess Anne",
                                                relation: "Daughter",
                                                children: [
                                                    {
                                                        name: "Peter Phillips",
                                                        relation: "Son",
                                                        children: [
                                                            {
                                                                name: "Savannah Phillips",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Isla Phillips",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        name: "Zara Tindall",
                                                        relation: "Daughter",
                                                        children: [
                                                            {
                                                                name: "Mia Tindall",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Lena Tindall",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Lucas Tindall",
                                                                relation: "Son",
                                                                children: [],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Prince Andrew, Duke of York",
                                                relation: "Son",
                                                children: [
                                                    {
                                                        name: "Princess Beatrice",
                                                        relation: "Daughter",
                                                        children: [
                                                            {
                                                                name: "Sienna Mapelli Mozzi",
                                                                relation: "Daughter",
                                                                children: [],
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        name: "Princess Eugenie",
                                                        relation: "Daughter",
                                                        children: [
                                                            {
                                                                name: "August Brooksbank",
                                                                relation: "Son",
                                                                children: [],
                                                            },
                                                            {
                                                                name: "Ernest Brooksbank",
                                                                relation: "Son",
                                                                children: [],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Prince Edward, Duke of Edinburgh",
                                                relation: "Son",
                                                children: [
                                                    {
                                                        name: "Lady Louise Windsor",
                                                        relation: "Daughter",
                                                        children: [],
                                                    },
                                                    {
                                                        name: "James, Earl of Wessex",
                                                        relation: "Son",
                                                        children: [],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: "Mary, Princess Royal",
                                relation: "Daughter",
                                children: [],
                            },
                            {
                                name: "Prince Henry, Duke of Gloucester",
                                relation: "Son",
                                children: [],
                            },
                            {
                                name: "Prince George, Duke of Kent",
                                relation: "Son",
                                children: [],
                            },
                            {
                                name: "Prince John",
                                relation: "Son",
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

const designPatternsTreeData = [
    {
        name: "Design Patterns",
        uniqueId: "root",
        relation: "root",
        definition:
            "General reusable solutions to common problems in software design.",
        children: [
            {
                name: "Creational Patterns",
                uniqueId: "creational",
                parentId: "root",
                relation: "contains",
                definition:
                    "Design patterns that deal with object creation mechanisms.",
                children: [
                    {
                        name: "Singleton",
                        uniqueId: "singleton",
                        parentId: "creational",
                        relation: "is a type of",
                        definition:
                            "Ensures a class has only one instance and provides a global point of access.",
                        children: [],
                    },
                    {
                        name: "Factory Method",
                        uniqueId: "factory-method",
                        parentId: "creational",
                        relation: "is a type of",
                        definition:
                            "Defines an interface for creating an object but lets subclasses alter the type of objects that will be created.",
                        children: [],
                    },
                    {
                        name: "Abstract Factory",
                        uniqueId: "abstract-factory",
                        parentId: "creational",
                        relation: "is a type of",
                        definition:
                            "Provides an interface for creating families of related or dependent objects without specifying their concrete classes.",
                        children: [],
                    },
                    {
                        name: "Builder",
                        uniqueId: "builder",
                        parentId: "creational",
                        relation: "is a type of",
                        definition:
                            "Constructs complex objects step by step, allowing for different representations of the object.",
                        children: [],
                    },
                    {
                        name: "Prototype",
                        uniqueId: "prototype",
                        parentId: "creational",
                        relation: "is a type of",
                        definition:
                            "Creates new objects by copying an existing object, known as the prototype.",
                        children: [],
                    },
                ],
            },
            {
                name: "Structural Patterns",
                uniqueId: "structural",
                parentId: "root",
                relation: "contains",
                definition:
                    "Design patterns that ease the design by identifying a simple way to realize relationships among entities.",
                children: [
                    {
                        name: "Adapter",
                        uniqueId: "adapter",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Allows incompatible interfaces to work together by acting as a bridge.",
                        children: [],
                    },
                    {
                        name: "Bridge",
                        uniqueId: "bridge",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Separates an abstraction from its implementation so that the two can vary independently.",
                        children: [],
                    },
                    {
                        name: "Composite",
                        uniqueId: "composite",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Allows individual objects and compositions of objects to be treated uniformly.",
                        children: [],
                    },
                    {
                        name: "Decorator",
                        uniqueId: "decorator",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Adds additional responsibilities to an object dynamically.",
                        children: [],
                    },
                    {
                        name: "Facade",
                        uniqueId: "facade",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Provides a simplified interface to a complex subsystem.",
                        children: [],
                    },
                    {
                        name: "Flyweight",
                        uniqueId: "flyweight",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Reduces the cost of creating and manipulating a large number of similar objects.",
                        children: [],
                    },
                    {
                        name: "Proxy",
                        uniqueId: "proxy",
                        parentId: "structural",
                        relation: "is a type of",
                        definition:
                            "Provides a surrogate or placeholder for another object to control access to it.",
                        children: [],
                    },
                ],
            },
            {
                name: "Behavioral Patterns",
                uniqueId: "behavioral",
                parentId: "root",
                relation: "contains",
                definition:
                    "Design patterns that focus on communication between objects.",
                children: [
                    {
                        name: "Chain of Responsibility",
                        uniqueId: "chain-of-responsibility",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Passes a request along a chain of handlers until it is handled.",
                        children: [],
                    },
                    {
                        name: "Command",
                        uniqueId: "command",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Encapsulates a request as an object, thereby allowing for parameterization and queuing of requests.",
                        children: [],
                    },
                    {
                        name: "Interpreter",
                        uniqueId: "interpreter",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Defines a grammar for interpreting sentences in a language.",
                        children: [],
                    },
                    {
                        name: "Iterator",
                        uniqueId: "iterator",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.",
                        children: [],
                    },
                    {
                        name: "Mediator",
                        uniqueId: "mediator",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Defines an object that encapsulates how a set of objects interact.",
                        children: [],
                    },
                    {
                        name: "Memento",
                        uniqueId: "memento",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Allows an object to capture and restore its internal state without exposing its implementation details.",
                        children: [],
                    },
                    {
                        name: "Observer",
                        uniqueId: "observer",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Defines a dependency between objects so that when one object changes state, all its dependents are notified.",
                        children: [],
                    },
                    {
                        name: "State",
                        uniqueId: "state",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Allows an object to alter its behavior when its internal state changes.",
                        children: [],
                    },
                    {
                        name: "Strategy",
                        uniqueId: "strategy",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Defines a family of algorithms, encapsulates each one, and makes them interchangeable.",
                        children: [],
                    },
                    {
                        name: "Template Method",
                        uniqueId: "template-method",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Defines the skeleton of an algorithm in a method, deferring some steps to subclasses.",
                        children: [],
                    },
                    {
                        name: "Visitor",
                        uniqueId: "visitor",
                        parentId: "behavioral",
                        relation: "is a type of",
                        definition:
                            "Separates algorithms from the objects on which they operate by defining a new operation without changing the classes of the elements.",
                        children: [],
                    },
                ],
            },
        ],
    },
];

const continentData = [
    {
        uniqueId: "1",
        name: "Africa",
        children: [
            {
                uniqueId: "1-1",
                name: "Nigeria",
                relation: "Country",
                children: [
                    {
                        uniqueId: "1-1-1",
                        name: "Lagos",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "1-1-2",
                        name: "Kano",
                        relation: "State",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "1-2",
                name: "Egypt",
                relation: "Country",
                children: [
                    {
                        uniqueId: "1-2-1",
                        name: "Cairo",
                        relation: "City",
                        children: [],
                    },
                    {
                        uniqueId: "1-2-2",
                        name: "Alexandria",
                        relation: "City",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "1-3",
                name: "South Africa",
                relation: "Country",
                children: [
                    {
                        uniqueId: "1-3-1",
                        name: "Gauteng",
                        relation: "Province",
                        children: [],
                    },
                    {
                        uniqueId: "1-3-2",
                        name: "Western Cape",
                        relation: "Province",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        uniqueId: "2",
        name: "Asia",
        children: [
            {
                uniqueId: "2-1",
                name: "China",
                relation: "Country",
                children: [
                    {
                        uniqueId: "2-1-1",
                        name: "Beijing",
                        relation: "City",
                        children: [],
                    },
                    {
                        uniqueId: "2-1-2",
                        name: "Shanghai",
                        relation: "City",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "2-2",
                name: "India",
                relation: "Country",
                children: [
                    {
                        uniqueId: "2-2-1",
                        name: "Maharashtra",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "2-2-2",
                        name: "Delhi",
                        relation: "State",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "2-3",
                name: "Japan",
                relation: "Country",
                children: [
                    {
                        uniqueId: "2-3-1",
                        name: "Tokyo",
                        relation: "Prefecture",
                        children: [],
                    },
                    {
                        uniqueId: "2-3-2",
                        name: "Osaka",
                        relation: "Prefecture",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        uniqueId: "3",
        name: "Europe",
        children: [
            {
                uniqueId: "3-1",
                name: "Germany",
                relation: "Country",
                children: [
                    {
                        uniqueId: "3-1-1",
                        name: "Bavaria",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "3-1-2",
                        name: "Berlin",
                        relation: "State",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "3-2",
                name: "France",
                relation: "Country",
                children: [
                    {
                        uniqueId: "3-2-1",
                        name: "Île-de-France",
                        relation: "Region",
                        children: [],
                    },
                    {
                        uniqueId: "3-2-2",
                        name: "Provence-Alpes-Côte d'Azur",
                        relation: "Region",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "3-3",
                name: "United Kingdom",
                relation: "Country",
                children: [
                    {
                        uniqueId: "3-3-1",
                        name: "England",
                        relation: "Country",
                        children: [],
                    },
                    {
                        uniqueId: "3-3-2",
                        name: "Scotland",
                        relation: "Country",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        uniqueId: "4",
        name: "North America",
        children: [
            {
                uniqueId: "4-1",
                name: "United States",
                relation: "Country",
                children: [
                    {
                        uniqueId: "4-1-1",
                        name: "California",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "4-1-2",
                        name: "New York",
                        relation: "State",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "4-2",
                name: "Canada",
                relation: "Country",
                children: [
                    {
                        uniqueId: "4-2-1",
                        name: "Ontario",
                        relation: "Province",
                        children: [],
                    },
                    {
                        uniqueId: "4-2-2",
                        name: "British Columbia",
                        relation: "Province",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "4-3",
                name: "Mexico",
                relation: "Country",
                children: [
                    {
                        uniqueId: "4-3-1",
                        name: "Jalisco",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "4-3-2",
                        name: "Nuevo León",
                        relation: "State",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        uniqueId: "5",
        name: "Oceania",
        children: [
            {
                uniqueId: "5-1",
                name: "Australia",
                relation: "Country",
                children: [
                    {
                        uniqueId: "5-1-1",
                        name: "New South Wales",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "5-1-2",
                        name: "Queensland",
                        relation: "State",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "5-2",
                name: "New Zealand",
                relation: "Country",
                children: [
                    {
                        uniqueId: "5-2-1",
                        name: "Auckland",
                        relation: "Region",
                        children: [],
                    },
                    {
                        uniqueId: "5-2-2",
                        name: "Wellington",
                        relation: "Region",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        uniqueId: "6",
        name: "South America",
        children: [
            {
                uniqueId: "6-1",
                name: "Brazil",
                relation: "Country",
                children: [
                    {
                        uniqueId: "6-1-1",
                        name: "São Paulo",
                        relation: "State",
                        children: [],
                    },
                    {
                        uniqueId: "6-1-2",
                        name: "Rio de Janeiro",
                        relation: "State",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "6-2",
                name: "Argentina",
                relation: "Country",
                children: [
                    {
                        uniqueId: "6-2-1",
                        name: "Buenos Aires",
                        relation: "City",
                        children: [],
                    },
                    {
                        uniqueId: "6-2-2",
                        name: "Mendoza",
                        relation: "City",
                        children: [],
                    },
                ],
            },
            {
                uniqueId: "6-3",
                name: "Colombia",
                relation: "Country",
                children: [
                    {
                        uniqueId: "6-3-1",
                        name: "Bogotá",
                        relation: "City",
                        children: [],
                    },
                    {
                        uniqueId: "6-3-2",
                        name: "Medellín",
                        relation: "City",
                        children: [],
                    },
                ],
            },
        ],
    },
];

const treeDataProcessAndDisplayWithReactArcherSteps = [
    {
        name: "Steps to process a given Tree Data, to show it in Memory maps with React Archer",
        children: [
            {
                name: "Pre-requisites",
                children: [
                    {
                        name: 'In the given Tree-Data, all node objects should have "name" and "children" fields.',
                    },
                    {
                        name: 'Each node should have a unique identifier (e.g., "uniqueId").',
                    },
                    {
                        name: "React Archer library should be installed and configured in the project.",
                    },
                ],
            },
            {
                name: "Steps",
                children: [
                    {
                        name: "1. Add Level and Parent ID Fields",
                        children: [
                            {
                                name: 'Use a utility function to add "level", "parentId" and "showChildren" fields to each node.',
                            },
                            {
                                name: 'Initialize the "showChildren" field to control the visibility of child nodes.',
                            },
                        ],
                    },
                    {
                        name: "2. Flatten Tree Data",
                        children: [
                            {
                                name: "Convert the hierarchical tree data into a flattened array for easier manipulation.",
                            },
                            {
                                name: "Ensure only nodes with `showChildren` set to true are expanded.",
                            },
                        ],
                    },
                    {
                        name: "3. Extract Levels and Parent IDs",
                        children: [
                            {
                                name: "Generate arrays of distinct levels and parent IDs from the flattened data.",
                            },
                            {
                                name: "This will help in rendering nodes level by level.",
                            },
                        ],
                    },
                    {
                        name: "4. Render Nodes and Connections",
                        children: [
                            {
                                name: "Use React components to render nodes according to their levels.",
                            },
                            {
                                name: "Render connections between nodes using React Archer’s arrows.",
                            },
                            {
                                name: "Use React Archer's `ArcherElement` and `ArcherContainer` to manage connections.",
                            },
                        ],
                    },
                    {
                        name: "5. Implement Toggle Functionality",
                        children: [
                            {
                                name: "Add toggle functionality to show or hide children of a node.",
                            },
                            {
                                name: "Update the flattened data when toggling the visibility of child nodes.",
                            },
                        ],
                    },
                    {
                        name: "6. Style Nodes and Connections",
                        children: [
                            {
                                name: "Apply custom styles to nodes and connections for better visualization.",
                            },
                            {
                                name: "Use the `styles` configuration to adjust node and arrow appearances.",
                            },
                        ],
                    },
                    {
                        name: "7. Handle Updates",
                        children: [
                            {
                                name: "Ensure the tree structure updates properly when new data is provided.",
                            },
                            {
                                name: "Use `useEffect` or similar hooks to watch for data changes.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Optional",
                children: [
                    {
                        name: "Add animations or transitions to enhance the user experience when expanding or collapsing nodes.",
                    },
                    {
                        name: "Implement search functionality to find specific nodes within the tree.",
                    },
                ],
            },
        ],
    },
];

const programmingLanguagesTreeData = [
    {
        name: "Programming Paradigms",
        uniqueId: "root",
        // parentId: 'super-parent',
        level: 0,
        relation: "contains",
        definition: "Fundamental styles of programming.",
        children: [
            {
                name: "Object-Oriented Programming",
                uniqueId: "oop",
                parentId: "root",
                level: 1,
                relation: "is a type of",
                definition: "A paradigm based on the concept of objects.",
                children: [
                    {
                        name: "Java",
                        uniqueId: "java",
                        parentId: "oop",
                        level: 2,
                        relation: "is a language of",
                        definition:
                            "A high-level, class-based, object-oriented programming language.",
                        children: [
                            {
                                name: "Inheritance",
                                uniqueId: "java-inheritance",
                                parentId: "java",
                                level: 3,
                                relation: "is a concept of",
                                definition:
                                    "Mechanism by which one class can inherit properties and behaviors of another.",
                                children: [
                                    {
                                        name: "Spring Framework",
                                        uniqueId: "spring-framework",
                                        parentId: "java-inheritance",
                                        level: 4,
                                        relation: "is implemented by",
                                        definition:
                                            "A comprehensive framework for enterprise Java development.",
                                        children: [],
                                    },
                                ],
                            },
                            {
                                name: "Polymorphism",
                                uniqueId: "java-polymorphism",
                                parentId: "java",
                                level: 3,
                                relation: "is a concept of",
                                definition: "Ability of objects to take on multiple forms.",
                                children: [
                                    {
                                        name: "Hibernate",
                                        uniqueId: "hibernate",
                                        parentId: "java-polymorphism",
                                        level: 4,
                                        relation: "is implemented by",
                                        definition:
                                            "A framework for mapping an object-oriented domain model to a relational database.",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "C#",
                        uniqueId: "csharp",
                        parentId: "oop",
                        level: 2,
                        relation: "is a language of",
                        definition:
                            "A modern, object-oriented programming language developed by Microsoft.",
                        children: [
                            {
                                name: "Encapsulation",
                                uniqueId: "csharp-encapsulation",
                                parentId: "csharp",
                                level: 3,
                                relation: "is a concept of",
                                definition:
                                    "Bundling of data and methods that operate on the data within a single unit.",
                                children: [
                                    {
                                        name: ".NET Framework",
                                        uniqueId: "dotnet-framework",
                                        parentId: "csharp-encapsulation",
                                        level: 4,
                                        relation: "is implemented by",
                                        definition:
                                            "A software framework developed by Microsoft that supports building and running applications.",
                                        children: [],
                                    },
                                ],
                            },
                            {
                                name: "Abstraction",
                                uniqueId: "csharp-abstraction",
                                parentId: "csharp",
                                level: 3,
                                relation: "is a concept of",
                                definition:
                                    "Hiding complex implementation details and showing only essential features of an object.",
                                children: [
                                    {
                                        name: "ASP.NET",
                                        uniqueId: "asp-net",
                                        parentId: "csharp-abstraction",
                                        level: 4,
                                        relation: "is implemented by",
                                        definition:
                                            "A web application framework designed for web development to produce dynamic web pages.",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "Functional Programming",
                uniqueId: "fp",
                parentId: "root",
                level: 1,
                relation: "is a type of",
                definition:
                    "A paradigm where programs are constructed by applying and composing functions.",
                children: [
                    {
                        name: "Haskell",
                        uniqueId: "haskell",
                        parentId: "fp",
                        level: 2,
                        relation: "is a language of",
                        definition:
                            "A statically typed, purely functional programming language.",
                        children: [
                            {
                                name: "Pure Functions",
                                uniqueId: "haskell-pure-functions",
                                parentId: "haskell",
                                level: 3,
                                relation: "is a concept of",
                                definition:
                                    "Functions that have no side effects and always produce the same output for the same input.",
                                children: [],
                            },
                            {
                                name: "Monads",
                                uniqueId: "haskell-monads",
                                parentId: "haskell",
                                level: 3,
                                relation: "is a concept of",
                                definition:
                                    "Structures that represent computations as sequences of steps.",
                                children: [],
                            },
                        ],
                    },
                    {
                        name: "Scala",
                        uniqueId: "scala",
                        parentId: "fp",
                        level: 2,
                        relation: "is a language of",
                        definition:
                            "A hybrid functional programming language that runs on the JVM.",
                        children: [
                            {
                                name: "Immutability",
                                uniqueId: "scala-immutability",
                                parentId: "scala",
                                level: 3,
                                relation: "is a concept of",
                                definition: "Data that cannot be modified after it is created.",
                                children: [],
                            },
                            {
                                name: "Higher-Order Functions",
                                uniqueId: "scala-higher-order-functions",
                                parentId: "scala",
                                level: 3,
                                relation: "is a concept of",
                                definition:
                                    "Functions that take other functions as parameters or return them as results.",
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

const oldRussianKingdom = [
    {
        name: "Old Russian Kingdom",
        children: [
            {
                name: "Kievan Rus",
                children: [
                    {
                        name: "Principality of Kiev",
                        children: [
                            { name: "City of Kiev" },
                            { name: "City of Chernigov" },
                            { name: "City of Pereyaslavl" },
                        ],
                    },
                    {
                        name: "Principality of Novgorod",
                        children: [{ name: "City of Novgorod" }, { name: "City of Pskov" }],
                    },
                    {
                        name: "Principality of Polotsk",
                        children: [
                            { name: "City of Polotsk" },
                            { name: "City of Vitebsk" },
                        ],
                    },
                ],
            },
            {
                name: "Grand Duchy of Vladimir",
                children: [
                    {
                        name: "Principality of Vladimir-Suzdal",
                        children: [
                            { name: "City of Vladimir" },
                            { name: "City of Suzdal" },
                            { name: "City of Rostov" },
                        ],
                    },
                    {
                        name: "Principality of Yaroslavl",
                        children: [
                            { name: "City of Yaroslavl" },
                            { name: "City of Kostroma" },
                        ],
                    },
                ],
            },
            {
                name: "Grand Duchy of Moscow",
                children: [
                    {
                        name: "Principality of Moscow",
                        children: [
                            { name: "City of Moscow" },
                            { name: "City of Kolomna" },
                            { name: "City of Zvenigorod" },
                        ],
                    },
                    {
                        name: "Principality of Tver",
                        children: [{ name: "City of Tver" }, { name: "City of Kashin" }],
                    },
                ],
            },
            {
                name: "Grand Duchy of Lithuania",
                children: [
                    {
                        name: "Principality of Smolensk",
                        children: [
                            { name: "City of Smolensk" },
                            { name: "City of Vyazma" },
                        ],
                    },
                    {
                        name: "Principality of Polotsk",
                        children: [
                            { name: "City of Polotsk" },
                            { name: "City of Vitebsk" },
                        ],
                    },
                ],
            },
        ],
    },
];

const primeMinistersOfIndia = [
    {
        name: "Prime Ministers of India",
        children: [
            {
                name: "Jawaharlal Nehru",
                tenure: "1947-1964",
                children: [
                    { name: "First Term", tenure: "1947-1952" },
                    { name: "Second Term", tenure: "1952-1957" },
                    { name: "Third Term", tenure: "1957-1962" },
                    { name: "Fourth Term", tenure: "1962-1964" },
                ],
            },
            {
                name: "Gulzarilal Nanda",
                tenure: "1964 (Acting)",
                children: [
                    { name: "First Term", tenure: "May 1964 - June 1964" },
                    { name: "Second Term", tenure: "January 1966 - March 1966" },
                ],
            },
            {
                name: "Lal Bahadur Shastri",
                tenure: "1964-1966",
            },
            {
                name: "Indira Gandhi",
                tenure: "1966-1977, 1980-1984",
                children: [
                    { name: "First Term", tenure: "1966-1971" },
                    { name: "Second Term", tenure: "1971-1977" },
                    { name: "Third Term", tenure: "1980-1984" },
                ],
            },
            {
                name: "Morarji Desai",
                tenure: "1977-1979",
            },
            {
                name: "Charan Singh",
                tenure: "1979-1980",
            },
            {
                name: "Rajiv Gandhi",
                tenure: "1984-1989",
            },
            {
                name: "Vishwanath Pratap Singh",
                tenure: "1989-1990",
            },
            {
                name: "Chandra Shekhar",
                tenure: "1990-1991",
            },
            {
                name: "P. V. Narasimha Rao",
                tenure: "1991-1996",
            },
            {
                name: "Atal Bihari Vajpayee",
                tenure: "1996, 1998-2004",
                children: [
                    { name: "First Term", tenure: "May 1996 - June 1996" },
                    { name: "Second Term", tenure: "1998-1999" },
                    { name: "Third Term", tenure: "1999-2004" },
                ],
            },
            {
                name: "H. D. Deve Gowda",
                tenure: "1996-1997",
            },
            {
                name: "I. K. Gujral",
                tenure: "1997-1998",
            },
            {
                name: "Manmohan Singh",
                tenure: "2004-2014",
                children: [
                    { name: "First Term", tenure: "2004-2009" },
                    { name: "Second Term", tenure: "2009-2014" },
                ],
            },
            {
                name: "Narendra Modi",
                tenure: "2014-Present",
                children: [
                    { name: "First Term", tenure: "2014-2019" },
                    { name: "Second Term", tenure: "2019-Present" },
                ],
            },
        ],
    },
];

const chiefMinistersOfBihar = [
    {
        name: "Chief Ministers of Bihar",
        children: [
            {
                name: "Shri Krishna Sinha",
                tenure: "1946-1961",
            },
            {
                name: "Deep Narayan Singh",
                tenure: "1961-1961",
            },
            {
                name: "Binodanand Jha",
                tenure: "1961-1963",
            },
            {
                name: "K. B. Sahay",
                tenure: "1963-1967",
            },
            {
                name: "Mahamaya Prasad Sinha",
                tenure: "1967-1968",
            },
            {
                name: "Satish Prasad Singh",
                tenure: "1968-1968",
            },
            {
                name: "Bhola Paswan Shastri",
                tenure: "1968-1968",
            },
            {
                name: "Harihar Singh",
                tenure: "1969-1969",
            },
            {
                name: "B. P. Mandal",
                tenure: "1968-1968",
            },
            {
                name: "Daroga Prasad Rai",
                tenure: "1970-1971",
            },
            {
                name: "Kedar Pandey",
                tenure: "1972-1973",
            },
            {
                name: "Abdul Ghafoor",
                tenure: "1973-1975",
            },
            {
                name: "Jagannath Mishra",
                tenure: "1975-1977, 1980-1983, 1989-1990",
                children: [
                    { name: "First Term", tenure: "1975-1977" },
                    { name: "Second Term", tenure: "1980-1983" },
                    { name: "Third Term", tenure: "1989-1990" },
                ],
            },
            {
                name: "Ram Sunder Das",
                tenure: "1979-1980",
            },
            {
                name: "Chandrashekhar Singh",
                tenure: "1983-1985",
            },
            {
                name: "Bindeshwari Dubey",
                tenure: "1985-1988",
            },
            {
                name: "Bhagwat Jha Azad",
                tenure: "1988-1989",
            },
            {
                name: "Lalu Prasad Yadav",
                tenure: "1990-1997",
            },
            {
                name: "Rabri Devi",
                tenure: "1997-1999, 1999-2000, 2000-2005",
                children: [
                    { name: "First Term", tenure: "1997-1999" },
                    { name: "Second Term", tenure: "1999-2000" },
                    { name: "Third Term", tenure: "2000-2005" },
                ],
            },
            {
                name: "Nitish Kumar",
                tenure: "2000, 2005-2014, 2015-Present",
                children: [
                    { name: "First Term", tenure: "2000-2000" },
                    { name: "Second Term", tenure: "2005-2010" },
                    { name: "Third Term", tenure: "2010-2014" },
                    { name: "Fourth Term", tenure: "2015-2017" },
                    { name: "Fifth Term", tenure: "2017-Present" },
                ],
            },
            {
                name: "Jitan Ram Manjhi",
                tenure: "2014-2015",
            },
        ],
    },
];

const StaticArrayTypes = {
    NAME_ARR: "NAME_ARR",
    MUGHAL_DYNASTY: "MUGHAL_DYNASTY",
    AMBANI_FAMILY: "AMBANI_FAMILY",
    BRITISH_ROYAL_FAMILY: "BRITISH_ROYAL_FAMILY",
    DESIGN_PATTERNS_TREE_DATA: "DESIGN_PATTERNS_TREE_DATA",
    CONTINENT_DATA: "CONTINENT_DATA",
    TREE_DATA_PROCESS_REACT_ARCHER_STEPS: "TREE_DATA_PROCESS_REACT_ARCHER_STEPS",
    PROGRAMMING_LANGUAGES_TREE_DATA: "PROGRAMMING_LANGUAGES_TREE_DATA",
    OLD_RUSSIAN_KINGDOM: "OLD_RUSSIAN_KINGDOM",
    PRIME_MINISTERS_OF_INDIA: "PRIME_MINISTERS_OF_INDIA",
    CHIEF_MINISTERS_OF_BIHAR: "CHIEF_MINISTERS_OF_BIHAR",
};

const StaticArrays = [
    {
        name: StaticArrayTypes.NAME_ARR,
        value: [...nameArr],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.MUGHAL_DYNASTY,
        value: [...mughalDynasty],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.AMBANI_FAMILY,
        value: [...ambaniFamily],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.BRITISH_ROYAL_FAMILY,
        value: [...britishRoyalFamily],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.DESIGN_PATTERNS_TREE_DATA,
        value: [...designPatternsTreeData],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.CONTINENT_DATA,
        value: [...continentData],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.TREE_DATA_PROCESS_REACT_ARCHER_STEPS,
        value: [...treeDataProcessAndDisplayWithReactArcherSteps],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.PROGRAMMING_LANGUAGES_TREE_DATA,
        value: [...programmingLanguagesTreeData],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.OLD_RUSSIAN_KINGDOM,
        value: [...oldRussianKingdom],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.PRIME_MINISTERS_OF_INDIA,
        value: [...primeMinistersOfIndia],
        type: "STATIC_ARRAY",
    },
    {
        name: StaticArrayTypes.CHIEF_MINISTERS_OF_BIHAR,
        value: [...chiefMinistersOfBihar],
        type: "STATIC_ARRAY",
    },
];

const getStaticArrayForType = (type) => {
    return StaticArrays.find((array) => array.name === type)?.value || [];
};

export { StaticArrayTypes, getStaticArrayForType };