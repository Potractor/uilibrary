import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = () => {
  const initialState = { msg: "", variant: null };
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(initialState);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [number, setNumber] = useState("");
  const renderValues = ["1", "2", "3", "4", "5", "6"];
  useEffect(() => {
    setShow(true);
    const x = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearTimeout(x);
    };
  }, [alert?.msg]);
  const submitHandler = async () => {
    setAlert(initialState);
    setLoading(true);
    const formData = new FormData();
    formData.append("document", file, file?.name);
    try {
      await axios.post("http://localhost:5000/api/files", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted); // Update the React state
        },
      });
      setAlert({ msg: "file Uploaded successfully", variant: "success" });
    } catch (e) {
      setAlert({
        msg: e.data.message || "unexpected error",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        {renderValues.map((item) => {
          return (
            <input
              type="radio"
              value={item}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              checked={number === item}
            />
          );
        })}
      </div>
      <div className="alert-container">
        {alert?.msg && show && (
          <div
            style={{ position: "absolute", top: 0 }}
            className={`alert ${alert?.variant ? alert?.variant : ""}`}
          >
            {alert?.msg}
          </div>
        )}
      </div>
      {!loading && (
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setUploadProgress(0);
          }}
        />
      )}
      {loading && (
        <div style={{ marginTop: "10px" }}>
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      <button disabled={loading} onClick={submitHandler}>
        submit
      </button>
    </div>
  );
};

export default FileUpload;
