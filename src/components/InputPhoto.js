import React, { useState } from "react";

function InputPhoto(props) {
  const [fileName, setFileName] = useState("Upload your photo");
  const [display, setDisplay] = useState({ display: "none" });
  const [loaded, setLoaded] = useState({ display: "none" });
  const [border, setBorder] = useState({});

  const styles = {
    hide: { display: "none" },
    show: { display: "block" },
    borderError: {
      border: "1px solid #CB3D40",
      boxShadow: "0 0 0 1px #CB3D40",
    },
    borderValid: {
      border: "1px solid green",
      boxShadow: "0 0 0 1px green",
    },
  };

  function readFile(event) {
    const file = event.target.files[0];
    const sizeInMegabytes = file.size / 1e6;

    setFileName(file.name);
    if (sizeInMegabytes > 5) {
      props.getFile("");
      console.log("IMAGE TO LARGE");
      setDisplay(styles.show);
      setLoaded(styles.hide);
      setBorder(styles.borderError);
      return;
    }
    setDisplay(styles.hide);
    setLoaded(styles.show);
    setBorder(styles.borderValid);
    props.getFile(file);
  }

  return (
    <div className="photo-input">
      <input
        name={"photo"}
        type="file"
        id="photo-input"
        onChange={readFile}
        accept=".jpg, .jpeg"
      />
      <label className="photo-input__inner" htmlFor="photo-input">
        <div className="photo-input__button" style={border}>
          Upload
        </div>
        <div className="photo-input__text" style={border}>
          {fileName}
          <p className="image-loaded" style={loaded}>
            ✓
          </p>
        </div>
      </label>
      <div className="errors" style={display}>
        <p className="error-text">File size must not exceed 5MB {}</p>
        <p className="error-text">Picture resolution at least 70x70px</p>
      </div>
    </div>
  );
}

export default InputPhoto;
