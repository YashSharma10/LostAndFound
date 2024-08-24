import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./Lost.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../context/GlobalContextProvider";

export default function Found() {

  const { globalBackendUrl } = useGlobalContext();
  const [search, setSearch] = useState("Search Item");
  const [selectCategory, setSelectCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // State for current user

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch lost items
        const response = await axios.get(
          `${globalBackendUrl}/api/reports/lost`,
          { withCredentials: true }
        );
        setData(response.data);

        // Fetch current user data
        const userResponse = await axios.get(
          `${globalBackendUrl}/api/auth/user`,
          { withCredentials: true }
        );
        setCurrentUser(userResponse.data); // Store current user data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [globalBackendUrl]);

  useEffect(() => {
    setFilteredData(
      selectCategory === "All"
        ? data
        : data.filter((item) => item.itemStatus === selectCategory)
    );
  }, [selectCategory, data]);

  function handleSearch() {
    const searchLower = search.toLowerCase();
    const searchResults = data.filter((item) =>
      item.itemName.toLowerCase().includes(searchLower)
    );
    setFilteredData(searchResults);
  }

  function sortItem(e) {
    e.preventDefault();
    // Implement sorting logic if needed
  }

  function handleClaim(itemId) {
    toast.warn(
      "You must be a real user to claim items. Please confirm your action.",
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        onClose: () => {
          return;
        },
        onClick: () => {
          axios
            .put(
              `${globalBackendUrl}/api/reports/lost/${itemId}`,
              { id: itemId },
              { withCredentials: true }
            )
            .then((response) => {
              if (response.status === 201) {
                toast.success("Item claimed successfully!");
                setData((prevData) =>
                  prevData.map((item) =>
                    item._id === itemId ? response.data.item : item
                  )
                );
              }
            })
            .catch((error) => {
              console.error("Error claiming item:", error);
              toast.error("An error occurred while claiming the item.");
            });
        },
      }
    );
  }

  async function handleDelete(itemId) {
    try {
      const response = await axios.delete(
        `${globalBackendUrl}/api/reports/item/${itemId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Item deleted successfully");
        setData((prevData) => prevData.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    }
  }

  return (
    <div className="container-lost">
      <ToastContainer />
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
            key={item._id}
            className={`itemCard ${item.dark ? "dark" : ""}`}
          >
            <section className="img-section">
              <img
                src={item.images[0] || "./src/Assets/Rectangle 14.png"}
                className="itemImage"
                alt="item"
              />
            </section>
            <section className="itemDetails">
              <h1 className="itemTitle">{item.itemName}</h1>
              <p className="itemDesc">{item.description}</p>
              <section className="itemInfo">
                <section>
                  <p>Status : {item.status}</p>
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
                <section className="claimInfo">
                  {item.status !== "claimed" && currentUser && item.user !== currentUser._id && (
                    <button
                      className="claimButton"
                      onClick={() => handleClaim(item._id)}
                    >
                      Claim
                    </button>
                  )}
                </section>
                {/* Add delete button if the logged-in user is the owner of the item */}
                {currentUser && item.user === currentUser._id && (
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                )}
              </section>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
