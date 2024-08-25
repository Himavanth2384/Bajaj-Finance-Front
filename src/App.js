import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) {
        throw new Error('Invalid JSON format. Missing "data" key.');
      }

      setError("");
      const res = await axios.post(
        "https://bajaj-finance-lime.vercel.app/bfhl",
        parsedData
      );
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON format or server error.");
      setResponse(null);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    if (selectedOptions.length === 0) {
      return (
        <div>
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      );
    } else {
      let filteredResponse = {};
      selectedOptions.forEach((option) => {
        filteredResponse[option.value] = response[option.value];
      });

      return (
        <div>
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      );
    }
  };

  useEffect(() => {
    document.title = "21BEC2184";
  }, []);

  return (
    <div className="container">
      <h1>21BEC2184</h1>
      <div className="form-group">
        <label>API Input</label>
        <textarea
          className="form-control"
          placeholder="Enter JSON input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {response && (
        <>
          <div className="form-group">
            <label>Multi Filter</label>
            <Select
              isMulti
              value={selectedOptions}
              onChange={handleSelectChange}
              options={options}
            />
          </div>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
