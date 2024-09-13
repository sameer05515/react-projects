const getData = async ()=> {
    // const url = "https://example.org/products.json";
    const url= "http://localhost:3009/books";
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        
        console.log(json);
        console.log('response',response);
    } catch (error) {
        console.error(error.message);
    }
}


module.exports={getData}