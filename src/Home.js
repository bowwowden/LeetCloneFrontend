import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useEffect, useState, useCallback } from "react";
import DropdownMenu from "./DropdownMenu";
import config from "./config"; // Import config.js

function Home() {

  const [code, setCode] = useState("def sort(numbers): \n\treturn None");
  const [apiResponse, setApiResponse] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setCode(val);
  }, []);

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
  
  
    const url = `${config.apiUrl}/submit/`; // Replace with the actual URL
  
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

  const [selectedValue, setSelectedValue] = useState("Python"); // Initialize with an empty string

  // Callback function to update the selected value
  const handleDropdownChange = (value) => {
    setSelectedValue(value);

  };
 
  // function for mapping it to langs.CommonLisp, rust, python etc
  const [selectedExtension, setSelectedExtension] = useState(langs.commonLisp()); // Initialize with null

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

            <div className="problem-title"> Problem 001 </div>
            <div className="problem-body">
              <p> Create a function to sort the numbers in an array</p>
              <p>Example: [1 34 5 2] should return [1 2 5 34]</p>

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

export default Home;
