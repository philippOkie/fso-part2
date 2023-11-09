import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`;
    try {
      const res = await axios.get(baseUrl);
      setCountries(res.data);
    } catch (error) {
      console.error(`Error fetching data`, error);
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
  };

  const handleShowClick = (props) => {
    setQuery(props.name.common);
  };

  return (
    <>
      <Filter handleQueryChange={handleQueryChange} query={query} />
      <Countries
        props={countries}
        query={query}
        handleShowClick={handleShowClick}
      />
    </>
  );
}

export default App;
