import React, { useState, useEffect } from "react";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const url = 'http://172.21.0.3:80/getproblems/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProblems(data); // Assuming the response is a JSON array of problems
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (

    <div className="App problem-app">

    <header className="App-header problem-header">

        <div className="absolute top-20 bottom-40 left-10 right-10 text-left">

        <h2>Problems Page</h2>

        <ul className="problems-ul">
            {problems.map((problem) => (
            <li className="problems-li" 
                key={problem.id}>
                {/* Display each problem on a separate line */}
                <p>ID: {problem.id}, Text: {problem.text}</p>
                {/* Add more fields as needed */}
            </li>
            ))}
        </ul>
        </div>
    </header>
    </div>
  );
};

export default Problems;
