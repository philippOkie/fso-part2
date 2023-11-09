const Country = ({ props, handleShowClick }) => {
  return (
    <>
      <ul>
        {props.flag} {props.name.common}{" "}
        <button className="delete-btn" onClick={() => handleShowClick(props)}>
          show more
        </button>
      </ul>
    </>
  );
};

export default Country;
