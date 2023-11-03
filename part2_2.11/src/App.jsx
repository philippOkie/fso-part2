import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [idNum, setIdNum] = useState(5);
  const [showAll, setShowAll] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
      })
      .then(() => {
        setShowAll(persons);
      });
  }, []);
  console.log("render", persons.length, "persons");

  const addContact = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const contactObject = {
      name: newName,
      id: idNum,
      number: newNum,
    };

    setPersons(persons.concat(contactObject));
    setNewName("");
    setNewNum("");
    setIdNum(idNum + 1);
    setShowAll([...persons, contactObject]);
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
    setShowAll(persons);
  };

  const handleNewNumChange = (e) => {
    setNewNum(e.target.value);
    setShowAll(persons);
  };

  const handleFilterChange = (filteredPersons) => {
    setShowAll(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} onFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleNewNameChange={handleNewNameChange}
        handleNewNumChange={handleNewNumChange}
        addContact={addContact}
        newName={newName}
        newNum={newNum}
      />
      <h2>Numbers</h2>
      <Persons showAll={showAll} />
    </div>
  );
};

export default App;
