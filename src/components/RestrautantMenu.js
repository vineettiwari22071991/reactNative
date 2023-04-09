import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CDN_URL } from "../utils/consants";

const RestaurantMenu = () => {
  const params = useParams();
  const { id } = params;
  const [restrautantDetail, setRestrautantDetail] = useState({});
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    callRestrautantApi();
  }, []);

  useEffect(() => {
    getMenuList();
  }, []);

  async function getRestrautantDetail() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.911862&lng=77.6445923&restaurantId=" +
        id +
        "&submitAction=ENTER"
    );
    const jsonData = await data.json();
    setRestrautantDetail(jsonData?.data?.cards[0]?.card?.card?.info);
  }

  async function getMenuList() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/quick?menuId=" + id + "&categories=true"
    );
    const json = await data.json();
    setMenuList(Object.values(json?.data?.menu?.items));
  }

  async function callRestrautantApi() {
    await getRestrautantDetail();
  }

  return (
    <div>
      <div>
        <img src={CDN_URL + restrautantDetail.cloudinaryImageId} />
        <h1>{restrautantDetail?.name}</h1>
        <h3>{restrautantDetail?.areaName}</h3>
        <h3>{restrautantDetail?.locality}</h3>
        <h3>{restrautantDetail?.avgRating}</h3>
        <h3>{restrautantDetail?.costForTwoMessage}</h3>
        <h3>{restrautantDetail?.cuisines?.join(", ")}</h3>
      </div>
      <div>
        <h1>Menu</h1>
        <ul>
          {menuList?.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
