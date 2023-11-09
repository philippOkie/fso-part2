const Filter = ({ query, handleQueryChange }) => {
  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleQueryChange} />
      </p>
    </div>
  );
};

export default Filter;
