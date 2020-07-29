import React from "react";
import "./App.css";
import csvToJson from "convert-csv-to-json";

function App() {
  const handleButtonClick = () => {
    const file = "../public/emails.csv";
    // fetch file
    fetch(file)
      .then((res) => {
        return res.body;
      })
      .then((resp) => {
        return csvToJson(resp);
      })
      .then(getUniqueEmails(resp));
      .then(getCountPerDomain());
  };

  const getUniqueEmails = (mails) => {
    var dict = {}
    for ( let i =0; i< mails; i++) {
      if (dict[mails[i]] !== mails[i]) {
        // include in dictionary
        dict[mails[i] = mails[i]];
      }
    }
    return dict{}
  };

  const getCountPerDomain = (uniqueEmails) => {
    // parse each mail
    // split domain at @
    // return user count
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => handleButtonClick()}>Process Emails.</button>
        <div className="mails container">

        </div>
      </header>
    </div>
  );
}

export default App;
