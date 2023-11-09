import Country from "./Country";
import CountryMoreInfo from "./CountryMoreInfo";

const Countries = ({ props, query, handleShowClick }) => {
  const filteredCountries = props.filter((person) =>
    person.name.common.includes(query)
  );

  if (filteredCountries.length > 10 && query !== "") {
    return (
      <>
        <ul>Too many matches, specify another filter</ul>
      </>
    );
  } else if (query === "" && filteredCountries.length > 10) {
    return (
      <>
        <ul>Start typing into the prompt to find a country!</ul>
      </>
    );
  } else if (
    filteredCountries.length <= 10 &&
    query !== "" &&
    filteredCountries.length != 1
  ) {
    return (
      <>
        <ul>
          {props
            .filter((person) => person.name.common.includes(query))
            .map((country) => (
              <div key={country.name.common}>
                <Country props={country} handleShowClick={handleShowClick} />
              </div>
            ))}
        </ul>
      </>
    );
  } else if (filteredCountries.length == 1 && query !== "") {
    return (
      <>
        <ul>
          {props
            .filter((person) => person.name.common.includes(query))
            .map((country) => (
              <div key={country.name.common}>
                <CountryMoreInfo props={country} />
              </div>
            ))}
        </ul>
      </>
    );
  }
};

export default Countries;
