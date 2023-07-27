import { useState } from "react";
import "./index.css"; // Create this CSS file for styling the pop-up form.

const PopUpForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", body: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-btn" onClick={onClose}>
          &times;
        </div>
        <h2>Add Post</h2>
        <form className="popUpForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PopUpForm;
