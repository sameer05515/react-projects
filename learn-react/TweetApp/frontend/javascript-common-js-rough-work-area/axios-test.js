const axios = require("axios");

async function fetchNoticesDataWithBasicAuth() {
  try {
    const response = await axios.get("http://localhost:8080/notices", {
      //   auth: {
      //     username: 'user1@example.com',
      //     password: 'user1'
      //   }
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function registerNewUser() {
  try {
    const response = await axios.post("http://localhost:8080/register", {
        email: "user3@example.com",
        pwd: "user3",
        role: "read",
      },);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchMyAccountsDataWithBasicAuth() {
  try {
    const response = await axios.get("http://localhost:8080/myAccounts", {
      auth: {
        username: "user3@example.com",
        password: "user3",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchNoticesDataWithBasicAuth();
// registerNewUser();
fetchMyAccountsDataWithBasicAuth();
