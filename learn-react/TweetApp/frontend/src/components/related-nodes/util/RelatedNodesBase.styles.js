const styles = {
    greenBorder: { border: "1px solid green" },
    columnContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "20px",
        padding: "0 20px",
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        marginTop: "10px",
    },
    onHoverStyle: {
        backgroundColor: "#0056b3",
    },
    onFocusStyle: {
        outline: "2px solid #0056b3",
    },
    errorMessage: {
        color: "red",
        fontWeight: "bold",
        marginBottom: "10px",
    },
};

export {styles as RelatedNodesBaseStyles};