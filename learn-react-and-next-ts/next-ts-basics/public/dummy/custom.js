const urls = [
    {
        name: "Url to fetch streaming data",
        url: "http://localhost:8080/streaming/data",
    },
    {
        name: "Url to fetch a general data",
        url: "http://localhost:8080/success",
    },
];

let selectedIndex = 0;

function getNextUrl(num) {
    return (num + 1 + urls.length) % urls.length;
}

const clickMe = () => {
    $(".greeting-id").empty();
    $(".greeting-content").empty();
    $(".greeting-jqxhr").empty();
    const nextWalaUrlIdx = getNextUrl(selectedIndex);
    const nextWalaUrl = urls[selectedIndex];
    selectedIndex = nextWalaUrlIdx;
    $(".greeting-id").append("Refetching : <br/>" + nextWalaUrl.name);

    console.log("Refetching");
    $.ajax({
        url: nextWalaUrl.url,
    }).then(function (data, status, jqxhr) {
        $(".greeting-id").append('<br/>' + (data.status || "status not received"));
        $(".greeting-content").append(JSON.stringify(data, null, 2));
        $(".greeting-jqxhr").append(JSON.stringify(jqxhr, null, 2));
        console.log(jqxhr);
    });
};

$(document).ready(() => {
    clickMe();
});