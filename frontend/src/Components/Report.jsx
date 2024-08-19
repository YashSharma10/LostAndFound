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
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await axios.get("http://localhost:6005/auth/status", { withCredentials: true });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
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
    setImages(e.target.files);
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

    const formData = new FormData();
    formData.append('location', location);
    formData.append('itemName', itemName);
    formData.append('category', category);
    formData.append('date', date);
    formData.append('description', desc);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const endpoint = reportType === "lost"
      ? "http://localhost:6005/api/reports/lost"
      : "http://localhost:6005/api/reports/found";

    try {
      await axios.post(endpoint, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
              placeholder="Description"
            />
            <div className="button-group">
              <button type="button" className="button21 cancel-button" onClick={clearForm}>
                Clear
              </button>
              <button type="submit" className="button21 submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="balls21">
          <div className="ball21" style={{ width: '120px', height: '120px', top: '650px', left: '-500px' , backgroundColor:'#ff4d4f' }}></div>
          <div className="ball21" style={{ width: '80px', height: '80px', top: '300px', left: '-600px', backgroundColor:'#36cfc9' }}></div>
          <div className="ball21" style={{ width: '100px', height: '100px', top: '80px', left: '-1050px', backgroundColor:'#ffd666' }}></div>
        </div>
      </div>
    </div>
  );
}
