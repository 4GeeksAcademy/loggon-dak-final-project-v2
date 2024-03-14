import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import { PostDealCard } from "../component/postDealCard";

import { Context } from "../store/appContext";

export const PostDeal = (props) => {
  const { store, actions } = useContext(Context);
  const {username} = useParams();
  const navigate = useNavigate();

  const [deal, setDeal] = useState({
    user_id: store.user.id,
    image_url: "",
    game_title: "",
    platform: "PC",
    type: "Game",
    format: "Digital",
    original_price: "",
    offer_price: "",
    expiration_date: null,
    promo_code: "",
    offer_link: "",
    scheduled_date: null,
    scheduled_time: null,
    scheduled: false, 
    rating: 0
  });
  const [additionalDeals, setAdditionalDeals] = useState([]);

  function handleInputChange(e, item) {
    setDeal({ ...deal, [item]: e.target.value });
  }

  function addDeal() {
    setAdditionalDeals([...additionalDeals, {}]);
  }

  function deleteDeal(index, e) {
    e.preventDefault();
    const updatedDeals = additionalDeals.filter((_, i) => i !== index);
    setAdditionalDeals(updatedDeals);
  }

  function handlePostDeal(e, deal) {
    e.preventDefault();
    if (
      deal.game_title == "" ||
      deal.platform == "" ||
      deal.type == "" ||
      deal.format == "" ||
      deal.original_price == "" ||
      deal.offer_price == "" ||
      deal.offer_link == ""
    ) {
      alert("Please fill out all required fields");
      return;
    } else {
      actions.postDeal(deal);
      //navigate(`/myprofile/${username}`);
    }
  }

  if (store.loggedIn === false) {
    navigate("/login");
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center w-100 mt-3">
        <div className="d-flex flex-column  text-white">
          <h3 className="m-auto my-3">Post Deal</h3>
          <PostDealCard
            gameTitle={deal.game_title}
            onInputChange={handleInputChange}
          />
          {additionalDeals.map((deal, index) => (
            <PostDealCard
              key={index}
              onClick={(e) => deleteDeal(index, e)}
              isAdditional={true}
            />
          ))}
          {/*---------------------------------------BUTTONS---------------------------------*/}
          <div className="grid gap-3 d-flex justify-content-end mb-4">
            <button
              type="button"
              className="btn"
              style={{ background: "#992899" }}
              onClick={addDeal}
            >
              <i className="fa-solid fa-plus text-white"></i>
            </button>
            <button
              type="button"
              className="btn text-white"
              style={{ background: "#992899" }}
              onClick={(e) => handlePostDeal(e, deal)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
