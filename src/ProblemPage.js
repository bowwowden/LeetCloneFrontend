import config from "./config"; // Adjust the path based on your project structure
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { langs } from '@uiw/codemirror-extensions-langs';
import DropdownMenu from "./DropdownMenu";

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [testcases, setTestCases] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Python");
  const [selectedExtension, setSelectedExtension] = useState(langs.python());
  const url = `${config.apiUrl}`;
  const [view, setView] = useState('output'); // Default view is 'output'
  const [selectedInputIndex, setSelectedInputIndex] = useState(0); // Default selected input index
  const [newTestCase, setNewTestCase] = useState({ input: [], output: [] });

  // Function to add a new test case to the list
  const addNewTestCase = () => {
    setTestCases([...testcases, newTestCase]);
    setNewTestCase({ input: [], output: [] }); // Clear the input fields after adding a test case
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleInputButtonClick = (index) => {
    setSelectedInputIndex(index);
  };

  // Callback function to update the selected value
  const handleDropdownChange = (value) => {
    setSelectedValue(value);

  };
 
  // function for mapping it to langs.CommonLisp, rust, python etc

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`${url}/getproblem/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProblem(data);
        // Clean up and set the default code from the problem details
        setCode(data && data.code ? data.code.replace(/\\n/g, '\n').replace(/\\t/g, '\t') : "");
        setTestCases(data.input_arrays || []);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id, url]);

  const onChange = (val) => {
    setCode(val);
  };

  // Submit Code
  const submitCode = () => {
    console.log("Code: " + code);
    // const code = "your_code_here"; // Replace with the actual code you want to send

    // Set the buttonClicked state to true on click
    setButtonClicked(true);

    const postData = {
      code: code,
      language: selectedValue,
      input: JSON.stringify(testcases[selectedInputIndex]?.input)
      // Add other data as needed
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
      body: JSON.stringify(postData),
    };
  
    fetch(`${url}/submit/`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // You can also use response.text() or other methods based on the expected response format
      })
      .then(data => {
        console.log('Success! Response data:');
        console.log(JSON.stringify(data, null, 2)); // Pretty-print with an indentation of 2 spaces
        setApiResponse(data); // Set the API response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors here
      });
    
  }


  useEffect(() => {
    if (selectedValue === "Common Lisp") {
      setSelectedExtension(langs.commonLisp());
    } else if (selectedValue === "Rust") {
      setSelectedExtension(langs.rust());
    } else if (selectedValue === "Python") {
      setSelectedExtension(langs.python());
    }
    console.log("Selected value: " + selectedValue);
  }, [selectedValue]);

  const runAgain = () => {
    setButtonClicked(false); // Reset the buttonClicked state
    setApiResponse(null); // Clear the previous API response
  };

  return (
  
    <div className="App">

      <header className="App-header">
      {/* <div className="flex items-center justify-center h-screen"> */}

          <div className="absolute top-20 bottom-40 left-10 right-10 text-left">
            <div className="problem-title"> Problem {id} </div>
            <div className="problem-body">
              <p>{problem && problem.description}</p>
              {/* Other problem details... */}
            </div>
            <div className="code-mirror-container">
            <CodeMirror
              value={code}
              theme={dracula}
              className="code-mirror"
              basicSetup={{
                highlightActiveLine: false, 
                format: true, // Enable formatting
              }}
              extensions={selectedExtension} 
              onChange = {onChange}
              />  
            </div>

              <div
                className={`border-2 ${buttonClicked ? "bg-red-500" : "bg-green-500"}`}
                onClick={buttonClicked ? runAgain : submitCode}
              >
                {buttonClicked ? "Run Again!" : "Submit Code"}
              </div>
              <DropdownMenu onDropdownChange={handleDropdownChange}/>
              
              <div className="container">
                  <div className="buttons-container">
                    <button
                      onClick={() => handleViewChange('output')}
                      className={view === 'output' ? 'active' : ''}
                    >
                      Output
                    </button>
                    <button
                      onClick={() => handleViewChange('test-cases')}
                      className={view === 'test-cases' ? 'active' : ''}
                    >
                      Test Cases
                    </button>
                  </div>
                  <div className="result-container">
                   

                    {view === 'test-cases' && (
                      <div className="input-buttons">
                        {testcases.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleInputButtonClick(index)}
                            className={selectedInputIndex === index ? 'active' : ''}
                          >
                            Case {index + 1}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    
                    {/* Input field for the new test case */}
                    {view === 'test-cases' && (
                        <div>
                          <label>New Test Case:</label>
                          <input
                            type="text"
                            placeholder="Input (e.g., [1, 2, 3])"
                            value={newTestCase.input.join(', ')}
                            onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value.split(',').map(Number) })}
                          />
                          <input
                            type="text"
                            placeholder="Output (e.g., [1, 2, 3])"
                            value={newTestCase.output.join(', ')}
                            onChange={(e) => setNewTestCase({ ...newTestCase, output: e.target.value.split(',').map(Number) })}
                          />
                          <button onClick={addNewTestCase}>Add Test Case</button>
                        </div>
                      )}


                    <pre>
                      {view === 'output'
                        ? (
                          <div>
                            Output: {apiResponse
                              ? apiResponse.output.replace(/\s/g, '') === JSON.stringify(testcases[selectedInputIndex]?.output).replace(/\s/g, '')
                                  ? `✅ ${apiResponse.output.trim()}  ` 
                                  : `❌ ${apiResponse.output.trim()}  `
                              : ""}
                          </div>
                        ) : (
                          <div>
                            <div>Input: {JSON.stringify(testcases[selectedInputIndex]?.input)}</div>
                            <div>Expected: {JSON.stringify(testcases[selectedInputIndex]?.output)}</div>
                          </div>
                        )}
                    </pre>
                                    

                  </div>
                </div>
            </div>
      </header>

    </div>
  );
}

export default ProblemPage;
