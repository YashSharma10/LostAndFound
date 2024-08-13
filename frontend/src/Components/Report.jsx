import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ReportForm.css";

export default function ReportForm() {
  const [reportType, setReportType] = useState("lost");
  const [location, setLocation] = useState("Location");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Category");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume user is authenticated initially

  // Check authentication status
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await axios.get("http://localhost:6005/auth/status", { withCredentials: true });
        console.log("Authentication Status:", response.data);
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false); // If there's an error, assume not authenticated
      }
    }
  
    checkAuthStatus();
  }, []);
  

  function clearForm() {
    setReportType("lost");
    setLocation("Location");
    setCategory("Category");
    setItemName("");
    setDate("");
    setDesc("");
    setImages([]);
  }

  function handleImage(e) {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  }

  function validateForm() {
    if (!itemName.trim()) {
      toast.error("Item name is required.");
      return false;
    }
    if (location === "Location") {
      toast.error("Please select a location.");
      return false;
    }
    if (category === "Category") {
      toast.error("Please select a category.");
      return false;
    }
    if (!date) {
      toast.error("Please select a date.");
      return false;
    }
    if (!desc.trim()) {
      toast.error("Description is required.");
      return false;
    }
    return true;
  }

  async function handleReport(e) {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You must be logged in to submit a report.");
      return;
    }

    if (!validateForm()) return;

    const report = {
      location,
      itemName,
      category,
      date,
      description: desc,
      images,
    };

    const endpoint =
      reportType === "lost"
        ? "http://localhost:6005/api/reports/lost"
        : "http://localhost:6005/api/reports/found";

    try {
      await axios.post(endpoint, report, { withCredentials: true });
      toast.success("Item reported successfully!");
      clearForm();
    } catch (error) {
      toast.error("There was an error submitting the report!");
    }
  }

  return (
    <div className="Form">
      <ToastContainer />
      <div className="container1">
        <div className="form-wrapper">
          <h1 className="form-title">REPORT AN ITEM</h1>
          <form onSubmit={handleReport} className="form">
            <div className="check-box">
              <label>
                <input
                  type="radio"
                  value="found"
                  checked={reportType === "found"}
                  onChange={() => setReportType("found")}
                />
                Found
              </label>
              <label>
                <input
                  type="radio"
                  value="lost"
                  checked={reportType === "lost"}
                  onChange={() => setReportType("lost")}
                />
                Lost
              </label>
            </div>
            <input
              type="text"
              value={itemName}
              placeholder="Item Name"
              onChange={(e) => setItemName(e.target.value)}
              className="input"
            />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
            >
              <option value="Location" disabled>
                Location
              </option>
              <option value="sportRoom">Sport Room</option>
              <option value="cricketGround">Cricket Ground</option>
              <option value="cafe10">Cafe 10</option>
              <option value="cafe1">Cafe 1</option>
              <option value="cadLab">Cad Lab</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              <option value="Category" disabled>
                Category
              </option>
              <option value="electronic">Electronic</option>
              <option value="notebook">Stationery</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="sport">Sport</option>
            </select>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="input"
            />
            <input
              type="file"
              multiple
              onChange={handleImage}
              className="input"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="5"
              className="textarea"
              placeholder="Add description..."
            ></textarea>
            {images.length > 0 && (
              <div className="image-preview">
                {images.map((image, index) => (
                  <img key={index} src={image} alt={`preview ${index}`} />
                ))}
              </div>
            )}
            <div className="button-group">
              <input
                type="submit"
                value="Submit"
                className="button21 submit-button"
              />
              <input
                type="button"
                value="Cancel"
                onClick={(e) => {
                  e.preventDefault();
                  clearForm();
                }}
                className="button21 cancel-button"
              />
            </div>
          </form>
        </div>
        <div className="balls21">
          <div className="ball21 ballz1"></div>
          <div className="ball21 ballz2"></div>
        </div>
      </div>
    </div>
  );
}
