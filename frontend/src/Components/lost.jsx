import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios"; // Import axios to fetch data
import "./Lost.css";

export default function Found() {
  const [search, setSearch] = useState("Search Item");
  const [selectCategory, setSelectCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/api/reports/lost", { withCredentials: true });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      selectCategory === "All"
        ? data
        : data.filter((item) => item.itemStatus === selectCategory)
    );
  }, [selectCategory, data]);

  function handleSearch() {
    const searchLower = search.toLowerCase();
    const searchResults = data.filter(item =>
      item.itemName.toLowerCase().includes(searchLower)
    );
    setFilteredData(searchResults);
  }

  function sortItem(e) {
    e.preventDefault();
    // Implement sorting logic if needed
  }

  return (
    <div className="container-lost">
      <div className="header-lost">
        <h1 className="found-title">Lost Inventory</h1>
        <h6 className="subtitle">List of items that are Lost</h6>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <span className="searchForm">
            <input
              type="text"
              value={search}
              placeholder={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              className="inputBox"
            />
            <FaSearch onClick={handleSearch} />
          </span>
        </form>
      </div>
      <div className="buttonContainer">
        <button className="btn-lost">
          <img
            src="./src/Assets/image 20.png"
            alt="Specs"
            className="img-btn"
          />
          <h1 className="search-btn">Specs</h1>
        </button>
        <button className="btn-lost">
          <img
            src="./src/Assets/image 21.png"
            alt="Key"
            className="img-btn"
          />
          <h1 className="search-btn">Key</h1>
        </button>
        <button className="btn-lost">
          <img
            src="./src/Assets/image 29.png"
            alt="Bag"
            className="img-btn"
          />
          <h1 className="search-btn">Bag</h1>
        </button>
        <button className="btn-lost">
          <img
            src="./src/Assets/image 31.png"
            alt="Mobile"
            className="img-btn"
          />
          <h1 className="search-btn">Mobile</h1>
        </button>
        <button className="btn-lost">
          <img
            src="./src/Assets/image 37.png"
            alt="Purse"
            className="img-btn"
          />
          <h1 className="search-btn">Purse</h1>
        </button>
      </div>
      <div className="divider"></div>
      <section className="sortForm">
        <form onSubmit={sortItem}>
          <select
            className="selectBox"
            name=""
            id="sortId"
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            <option value="All">ALL</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="claimed">Claimed</option>
            <option value="unclaimed">Unclaimed</option>
          </select>
        </form>
      </section>
      <div className="itemList">
        {filteredData.map((item) => (
          <div
            key={item._id} // Use unique identifier from your data
            className={`itemCard ${item.dark ? "dark" : ""}`}
          >
            <section className="img-section">
              <img
                src={item.images[0] || "./src/Assets/Rectangle 14.png"} // Display the first image or a placeholder
                className="itemImage"
                alt="item"
              />
            </section>
            <section className="itemDetails">
              <h1 className="itemTitle">{item.itemName}</h1>
              <p className="itemDesc">{item.description}</p>
              <section className="itemInfo">
                <section>
                  <p>Status : {item.itemStatus}</p>
                  <p>Category : {item.category}</p>
                </section>
                <section>
                  <p>Location : {item.location}</p>
                  <p>Date Lost : {item.date}</p>
                </section>
              </section>
              <section className="dividerSmall"></section>
              <section className="claimInfo">
                <section>
                  <p>Claimed By : {item.claimedBy || "N/A"}</p>
                  <p>Email ID : {item.email || "N/A"}</p>
                  <p>Phone NO : {item.phone || "N/A"}</p>
                </section>
                <button className="claimButton">Claim</button>
              </section>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
