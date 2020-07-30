import React, { useState } from "react";
import "./App.css";

function App() {
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const [addressesPerDomain, setAddressPerDomain] = useState([]);

  const handleButtonClick = () => {
    const file = "/emails.csv";
    // fetch file
    fetch(file)
      .then((res) => {
        return res.text();
      })
      .then((resp) => {
        return csvToArray(resp);
      })
      .then((mailArray) => {
        let uqEmails = getUniqueEmails(mailArray);
        setUniqueEmails(uqEmails);
        return uqEmails;
      })
      .then((uniques => getCountPerDomain(uniques))
      )
  };
  const csvToArray = (csv) => {
    let emails = csv.split("\n");
    return emails;
  };

  const getUniqueEmails = (mails) => {
    let dict = {};
    let uniqueEmails = [];
    for (let i = 0; i < mails.length; i++) {
      if (dict[mails[i]] !== mails[i]) {
        uniqueEmails.push(mails[i]);
      }
    }
    return uniqueEmails;
  };

  const getCountPerDomain = (uniqueEmails) => {

    let dict = {}
    for (let i = 0; i < uniqueEmails.length; i++) {
      let email = uniqueEmails[i].split("@");
      if (email != "") {
        let domain = email[1].split('.')[0];
        if (dict[domain] === undefined) {

          dict[domain] = 1;
        } else {

          dict[domain] += 1;
        }
      }
    }
    setAddressPerDomain(dict);
    return dict;
  };



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => handleButtonClick()}>Process Emails.</button>
        <div className="mails container"></div>
      </header>
    </div>
  );
}

export default App;
