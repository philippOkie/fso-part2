import { useState } from "react";

const Filter = ({ persons, onFilterChange }) => {
  const [findName, setFindName] = useState("");

  const handleFindNameChange = (e) => {
    const searchName = e.target.value;
    setFindName(searchName);
    const searchNameLowercase = searchName.toLowerCase();

    if (searchName === "") {
      onFilterChange(persons);
    } else {
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().startsWith(searchNameLowercase)
      );
      onFilterChange(filteredPersons);
    }
  };

  return (
    <div>
      <p>
        Filter shown with{" "}
        <input value={findName} onChange={handleFindNameChange} />
      </p>
    </div>
  );
};

export default Filter;
