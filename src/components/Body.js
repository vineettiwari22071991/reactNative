import resList from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerUI from "./ShimmerUI";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [fliterRestaurants, setfliterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurantsList();
  }, []);

  async function getRestaurantsList() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.911862&lng=77.6445923&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setfliterRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  return (
    <div className="body">
      <div className="filter">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="filter-btn"
          onClick={() => {
            const filterList = filterData(searchText, allRestaurants);
            setfliterRestaurants(filterList);
          }}
        >
          Search
        </button>
        <button
          className="all-item"
          onClick={() => {
            setSearchText("")
            setfliterRestaurants(allRestaurants);
          }}
        >
          Get All Item
        </button>
      </div>
      <div className="res-container">
        {(() => {
          if (allRestaurants.length !== 0) {
            if (fliterRestaurants.length === 0) {
              return <h1>No Restraurants match found!!!</h1>;
            } else {
             return fliterRestaurants.map((restaurant) => (
                <RestaurantCard resData={restaurant} key={restaurant.data.id} />
              ));
            }
          } else {
            return <ShimmerUI />;
          }
        })()}
      </div>
    </div>
  );
};

export default Body;
