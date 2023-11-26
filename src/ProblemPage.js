import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { langs } from '@uiw/codemirror-extensions-langs';
import DropdownMenu from "./DropdownMenu";

const ProblemPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("def sort(numbers): \n\treturn None");
  const [apiResponse, setApiResponse] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Python");
  const [selectedExtension, setSelectedExtension] = useState(langs.python());


  // const [selectedValue, setSelectedValue] = useState("Python"); // Initialize with an empty string

  // Callback function to update the selected value
  const handleDropdownChange = (value) => {
    setSelectedValue(value);

  };
 
  // function for mapping it to langs.CommonLisp, rust, python etc
  // const [selectedExtension, setSelectedExtension] = useState(langs.commonLisp()); // Initialize with null

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://172.22.0.3:80/getproblem/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProblem(data);
         // Set the default code from the problem details
        setCode(data && data.defaultcode ? data.defaultcode : "");
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [id]);

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
      language: selectedValue
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
  
  
    const url = 'http://172.22.0.3:80/submit/'; // Replace with the actual URL
  
    fetch(url, requestOptions)
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
              
              
              {/* Display results below everything */}
              {apiResponse && (
                <div className="result-container">
                  <h2>API Response:</h2>
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
              )}
                
       </div>
 
      </header>

    </div>
  );
}

export default ProblemPage;
