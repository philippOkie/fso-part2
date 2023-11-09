const Person = ({ props }) => {
  return (
    <div>
      <li>
        {props.name} {props.number}
      </li>
    </div>
  );
};

export default Person;
