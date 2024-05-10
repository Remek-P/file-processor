import styles from "./input.module.scss";

function Input({ type,
                 id,
                 name = id,
                 accept = null,
                 onChange = null,
                 buttonClass = null,
                 children,
                 isFileNameVisible = false,
                 fileName = null,
                 clickRef
}) {

  const displayFileName = fileName
      ? <div>{fileName}</div>
      : <div>Please select a file</div>

  const showFileName = isFileNameVisible && displayFileName;

  console.log("Input")

  return (
      <div className={`${styles.container} ${buttonClass}`}>
        <label htmlFor="filepicker"
               className={`${styles.label} red`}
        >{ children }</label>
        <input type={type}
               id={id}
               name={name} accept={accept}
               onChange={onChange}
               className={styles.input}
               ref={clickRef}
        />
        { showFileName }
      </div>
  );
}

export default Input;