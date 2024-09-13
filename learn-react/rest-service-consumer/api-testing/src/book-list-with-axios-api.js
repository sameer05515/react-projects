const axios = require('axios');

const getAllBooksWithAxiosAndAsyncAwait = async () => {
    const url = "http://localhost:3009/books";
    try {
        const response = await axios.get(url);
        const result = response.data;
        console.log(`data: ${JSON.stringify(result, null, 2)}`);
        console.log(response);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const getAllBooksWithAxios=()=>{
    
    axios.get("http://localhost:3009/books")
            .then((response) => {
                console.log(response);
                if(!response.ok){
                    console.log('Something bad happened');
                    throw new Error("Failed to fetch data");
                    // return;
                }
                return response.json();
                
            })
            .catch(error=> console.log(error));
};

const getAllBooksWithThenCatch = () => {
    const url = "http://localhost:3009/books";
    
    axios.get(url)
        .then(response => {
            const result = response.data;
            console.log(`data: ${JSON.stringify(result, null, 2)}`);
            // console.log(response);
            return result;
        })
        .catch(error => {
            console.log(error);
        });
};

// Example usage
// getAllBooksWithAsyncAwait();
module.exports={getAllBooksWithAxiosAndAsyncAwait,getAllBooksWithAxios, getAllBooksWithThenCatch};
