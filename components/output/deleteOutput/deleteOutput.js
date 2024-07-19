function DeleteOutput({ index, handleDeleteChecked }) {
  return (
      <div key={index}>
        <label htmlFor={`output${index}`}>
          Delete
        </label>
        <input type="checkbox"
               name="output"
               id={`output${index}`}
               value={index}
               onChange={handleDeleteChecked}
               className="visually-hidden"
        />
      </div>
  );
}

export default DeleteOutput;