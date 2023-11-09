const PersonForm = ({
  handleNewNameChange,
  handleNewNumChange,
  addContact,
  newName,
  newNum,
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        Name: <input value={newName} onChange={handleNewNameChange} required />
      </div>
      <div>
        Number: <input value={newNum} onChange={handleNewNumChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
