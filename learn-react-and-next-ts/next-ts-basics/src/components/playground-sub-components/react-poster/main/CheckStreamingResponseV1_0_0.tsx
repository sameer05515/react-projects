import React, { useState, useEffect, useMemo } from "react";

interface User {
  name: string;
  email: string;
  age: number;
}

const BaseURL = "http://localhost:8080/users/stream";

const urls = [
  `${BaseURL}/v1`,
  `${BaseURL}/v2`,
  `${BaseURL}/v3`,
  // 'http://localhost:8080/streaming/data'
];

function getRandomNumberBetween0andGivenNumber(num: number): number {
  return Math.floor(Math.random() * num);
}

function getNextUrl(num: number): number {
  return (num+1+urls.length)%urls.length;
}

const AppWithCheckStreamingResponseV1_0_0: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUrlIndex, setSelectedUrlIndex]=useState(0);

  const selectedUrl= useMemo(()=>{
    return urls[selectedUrlIndex];
  },[selectedUrlIndex]);

  // useEffect(() => {
  //   reload();
  // }, []);

  const reload = async () => {
    setUsers([]);
    setLoading(true);
    try {
      const nxt=getNextUrl(selectedUrlIndex);
      setSelectedUrlIndex(()=>nxt);
      const response = await fetch(urls[nxt]);
      if (!response.body) {
        throw new Error("ReadableStream is not supported in this browser");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let chunk = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunk += decoder.decode(value, { stream: true });

        // Split the chunk into individual JSON objects
        const userChunks = chunk.split("\n").filter(Boolean);

        userChunks.forEach((userChunk) => {
          try {
            const user: User = JSON.parse(userChunk);
            setUsers((prevUsers) => [...prevUsers, user]);
          } catch (e) {
            console.error("Error parsing user chunk", e);
          }
        });

        // Clear the chunk after processing to avoid duplicates
        chunk = "";
      }
      setLoading(false);
    } catch (err) {
      // setError(err?.message||'');
      setError("Some error occurred!!");
      setLoading(false);
    }
  };

  const renderStatusResponseJSX=()=>{
    if (loading) return <div>Loading users... from selectedUrl {selectedUrl}</div>;
    if (error) return <div>Error: {error}, from selectedUrl {selectedUrl}</div>;
  }

  return (
    <div>
      <h1>Streamed User Data</h1>
      <h2>selectedUrl: {selectedUrl}</h2>
      <button onClick={reload} disabled={loading}>{"Fetch All Tweets"}</button>
      {renderStatusResponseJSX()}
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>{user.name}</strong> - {user.email} - Age: {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppWithCheckStreamingResponseV1_0_0;
