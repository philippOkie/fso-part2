const Filter = ({ query, handleQueryChange }) => {
  return (
    <div>
      <p>
        Filter shown with <input value={query} onChange={handleQueryChange} />
      </p>
    </div>
  );
};

export default Filter;
