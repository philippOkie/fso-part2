import Person from "./Person";

const Persons = ({ persons, query, handleDeleteClick }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(query))
        .map((person) => (
          <div key={person.id}>
            <Person props={person} />
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(person)}
            >
              delete
            </button>
          </div>
        ))}
    </ul>
  );
};

export default Persons;
