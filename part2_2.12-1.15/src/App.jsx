import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import service from "./services/service";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [query, setQuery] = useState("");
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedStyle, setAppliedStyle] = useState({});

  useEffect(() => {
    service
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isSuccess = {
    color: "green",
    border: "green 2px solid",
  };

  const isntSuccess = {
    color: "red",
    border: "red 2px solid",
  };
  // to be in "service" module
  const update = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const person = persons.find((p) => p.id === id);
    const changedPerson = { ...person, number: newNum };

    axios.put(url, changedPerson).then((res) => {
      setPersons(persons.map((p) => (p.id !== id ? p : res.data)));
    });
  };

  const clearForm = () => {
    setNewName("");
    setNewNum("");
  };

  const addContact = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Do you want to change the number?`
        )
      ) {
        let person = persons.find((person) => person.name == newName);
        update(person.id);
        clearForm();
        setErrorMessage(`Changed ${newName}'s number to ${newNum}`);
        setAppliedStyle(isSuccess);
        return;
      } else {
        clearForm();
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNum,
    };

    service.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      clearForm();
    });

    setErrorMessage(`Added ${newPerson.name}`);
    setAppliedStyle(isSuccess);
  };
  // to be in "service" module
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete this person ${name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage(`Deleted ${name}`);
          setAppliedStyle(isntSuccess);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setErrorMessage(`something went wrong`);
          setAppliedStyle(isntSuccess);
        });
    }
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleDeleteClick = (person) => {
    deletePerson(person.id, person.name);
  };

  return (
    <div className="general-container">
      <h2>Phonebook</h2>
      <Notification message={errorMessage} appliedStyle={appliedStyle} />
      <Filter query={query} handleQueryChange={handleQueryChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleNewNameChange={handleNewNameChange}
        handleNewNumChange={handleNewNumChange}
        addContact={addContact}
        newName={newName}
        newNum={newNum}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        query={query}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default App;
