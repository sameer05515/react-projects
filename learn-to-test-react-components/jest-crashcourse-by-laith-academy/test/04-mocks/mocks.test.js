const axios = require("axios");
const fetchData = require("../../src/02-async/async");

const forEach = (items, callback) => {
    for (let i = 0; i < items.length; i++) {
        callback(items[i]);
    }
};

it("mock callback", () => {
    const mockCallback = jest.fn((x) => 100 + x);
    forEach([1, 2, 3], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(3);
    expect(mockCallback.mock.calls[0][0]).toBe(1);
    expect(mockCallback.mock.calls[1][0]).toBe(2);
    expect(mockCallback.mock.calls[2][0]).toBe(3);

    expect(mockCallback.mock.results[0].value - 100).toBe(1);
    expect(mockCallback.mock.results[1].value - 100).toBe(2);
    expect(mockCallback.mock.results[2].value - 100).toBe(3);
});

it("mock return", () => {
    const mock = jest.fn();
    mock
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce("Premendra")
        .mockReturnValueOnce({ name: "Premendra Kumar" });

    const results = mock();
    const results2 = mock();
    const results3 = mock();
    const results4 = mock();

    expect(results).toBe(true);
    expect(results2).toBe(false);
    expect(results3).toBe("Premendra");
    expect(results4).not.toBe({ name: "Premendra Kumar" });
    expect(results4).toEqual({ name: "Premendra Kumar" });
});

it.only("mock axios",async()=>{
    jest.spyOn(axios, "get").mockReturnValueOnce({
        data:{
            id: 1,
            todo: "Create a typescript libray, for utility and react components and hooks, post doing junit testing"
        }
    });

    const {data:results} = await fetchData(1);
    const {data:results2} = await fetchData(2);

    expect(results.id).toBe(1);
    expect(results2.id).toBe(2);
    console.log('results: ',results);
    console.log('results2: ',results2);

})
