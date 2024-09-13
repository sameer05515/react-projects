function formatUnixTimestamp(timestamp) {
    // Convert timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a Date object
    const date = new Date(milliseconds);

    // Get day, month, year, hours, minutes, and seconds
    // const day = ("0" + date.getDate()).slice(-2);
    // const month = ("0" + (date.getMonth() + 1)).slice(-2);
    // const year = date.getFullYear();
    // const hours = ("0" + date.getHours()).slice(-2);
    // const minutes = ("0" + date.getMinutes()).slice(-2);
    // const seconds = ("0" + date.getSeconds()).slice(-2);

    // // Define month names
    // const monthNames = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    // ];

    // // Create formatted date string
    // const formattedDate = `${day}-${monthNames[parseInt(month, 10) - 1]
    //     }-${year} ${hours}:${minutes}:${seconds}`;

    return date;
}

const getConversationMessages = (conversation) => {
    const messages = [];
    let currentNode = conversation.current_node;
    while (currentNode !== null) {
        const node = conversation.mapping[currentNode];
        if (
            node.message &&
            node.message.content &&
            node.message.content.content_type === "text" &&
            node.message.content.parts.length > 0 &&
            node.message.content.parts[0].length > 0 &&
            (node.message.author.role !== "system" ||
                node.message.metadata.is_user_system_message)
        ) {
            let author = node.message.author.role;
            if (author === "assistant") {
                author = "ChatGPT";
            } else if (
                author === "system" &&
                node.message.metadata.is_user_system_message
            ) {
                author = "Custom user info";
            }
            messages.push({
                uniqueId: node.id,
                author,
                text: node.message.content.parts[0],
                createdOn: node.create_time
                    ? formatUnixTimestamp(node.create_time)
                    : `'${node.create_time}'`,
                updatedOn: node.update_time
                    ? formatUnixTimestamp(node.update_time)
                    : `'${node.update_time}'`,
            });
        }
        currentNode = node.parent;
    }
    return messages.reverse();
};

// Reusable utility functions
const fetchJsonData = async (selectedFile) => {
    if (!selectedFile) return;

    try {
        const response = await fetch("http://localhost:5000" + selectedFile);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const formattedData = data
            .filter((d) => d !== null)
            .map((conv, index) => ({
                uniqueId: conv.id,
                name: conv.title,
                // current_node: conv.current_node,
                // mappingFirstValue: conv.mapping ? conv.mapping[conv.current_node] : null,
                // mapping: conv.mapping,
                messages: getConversationMessages(conv) || [],
                createdOn: conv.create_time
                    ? formatUnixTimestamp(conv.create_time)
                    : `'${conv.create_time}'`,
                updatedOn: conv.update_time
                    ? formatUnixTimestamp(conv.update_time)
                    : `'${conv.update_time}'`,
            }));

        // setJsonData(formattedData);
        return formattedData;
    } catch (error) {
        // console.error("Error fetching data:", error);
        return [];
    }
};

module.exports = { fetchJsonData };
