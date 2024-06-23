const getAllBooks = () => {

  fetch("http://localhost:3009/books")
    .then((response) => {
      // console.log(response);
      if (!response.ok) {
        console.log('Something bad happened');
        throw new Error(`Failed to fetch data : Response Status: ${response.status}`);
        // return;
      }
      return response.json();

    })
    .then((data) => console.log(`data: ${JSON.stringify(data, null, 2)}`))
    .catch(error => console.log(error));
}

const getAllBooksWithAsyncAwait = async () => {
  const url = "http://localhost:3009/books";
  const options = {};
  try {
    //console.log(`fetchData: `, new Date() , url);  
    // setLoading(true);    
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log('Something bad happened');
      //   throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    console.log(`data: ${JSON.stringify(result, null, 2)}`);
    console.log(response);
    return result;

    //setData(result);
  } catch (error) {
    //setError(error);
    console.log(error);
  } finally {
    //setLoading(false);
  }
}

module.exports = { getAllBooks, getAllBooksWithAsyncAwait };