const Person = ({ props }) => {
  return (
    <div>
      <li>
        {props.name} {props.number}
      </li>
    </div>
  );
};

const Persons = ({ showAll }) => {
  return (
    <ul>
      {showAll.map((person) => (
        <Person key={person.id} props={person} />
      ))}
    </ul>
  );
};

export default Persons;
