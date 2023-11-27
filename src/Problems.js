import config from "./config"; // Adjust the path based on your project structure
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const url = `${config.apiUrl}/getproblems/`;

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
        console.log("data");
        console.log(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Filter problems based on the search term for id, title, and category
  const filteredProblems = problems.filter(problem =>
    String(problem.id).includes(searchTerm) ||
    problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App problem-app">
      <header className="problem-header">
        <h2>Problems Page</h2>

        {/* Search bar */}
        <input
          className="search-bar"
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table to display problems */}
        <table className="problems-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.id}>
              <td>
                <Link to={`/problems/${problem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {problem.id}
                </Link>
              </td>
              <td>
                <Link to={`/problems/${problem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {problem.title}
                </Link>
              </td>
              <td>
                <Link to={`/problems/${problem.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {problem.category}
                </Link>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        
      </header>
    </div>
  );
};

export default Problems;
