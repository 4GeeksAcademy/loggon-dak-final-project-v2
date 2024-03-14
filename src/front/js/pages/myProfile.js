import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import { EditableDealCard } from "../component/editableDealCard";
import { DealCard } from "../component/dealCard";

import { Context } from "../store/appContext";

export const MyProfile = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(store.user);
  /*const [newUserData, setNewUserData] = useState({
    username: "",
    imageUrl: "",
    steamUsername: "",
    twitchUsername: "",
    newInterest: "",
  });*/
  const [newUsername, setNewUsername] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [newSteamUsername, setNewSteamUsername] = useState("");
  const [newTwitchUsername, setTwitchUsername] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    console.log(store.user)
    setUser(store.user);
    setNewUsername(store.user.username);
    setNewUserImage(store.user.image_url);
    setNewSteamUsername(store.user.steam_username);
    setTwitchUsername(store.user.twitch_username);
  }, []);

  useEffect(() => {
    setUser(store.user);
  }, [store.user]);

 
  function updateItem(e, newItem, itemType) {
    e.preventDefault();
    if (
      newItem.trim() == "" &&
      (itemType != "steam_username" || itemType != "twitch_username")
    ) {
      setUser(store.user);
      setClicked("");
    } else {
      setUser((prevState) => ({
        ...prevState,
        [itemType]: newItem,
      }));
      actions.updateItem(newItem, itemType);
    }
    setClicked("");
  }

  //The interests get updated in the store but the page doesn't re-render when deleted, function in line 346
  function updateInterests(e) {
    e.preventDefault();
    actions.addInterest(newInterest);
    setUser((prevState) => ({
      ...prevState,
      interests: [...prevState.interests, newInterest],
    }));
    setNewInterest("");
  }

  if (store.loggedIn === false) {
    navigate("/login");
  }

  return (
    <div className="container-fluid m-auto">
      {/*---------------------------------------PROFILE DETAILS---------------------------------*/}
      <div className="d-flex justify-content-center w-100 mt-3">
        <div className="d-flex flex-column text-white">
          <h3 className="m-auto ps-4">My Profile</h3>{" "}
          {/*--------falta de centralización----------*/}
          <div className="d-flex flex-row flex-wrap ">
            <form>
              {clicked == "image" ? (
                <div>
                  <button
                    className="btn py-0"
                    onClick={(e) => {
                      updateItem(e, newUserImage, "image_url");
                    }}
                  >
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "#992899" }}
                    ></i>
                  </button>
                  <input
                    type="text"
                    className="img-fluid"
                    value={newUserImage}
                    onChange={(e) => setNewUserImage(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <button
                    className="btn py-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setClicked("image");
                    }}
                  >
                    <i
                      className="fa-solid fa-pencil fa-flip-horizontal"
                      style={{ color: "#992899" }}
                    ></i>
                  </button>
                  <img
                    style={{ maxWidth: "500px", maxHeight: "500px" }}
                    className="rounded-circle img-fluid p-5 image-container"
                    src={user.image_url}
                  />
                </div>
              )}
            </form>

            <ul className="list-group m-auto">
              {/*---------------------------------------Username---------------------------------*/}
              <div style={{ fontSize: "12px", color: "#992899" }}>Username</div>
              <li className="list-group-item rounded-5 my-2 text-white bg-transparent d-flex flex-row">
                <div className="w-100">
                  {clicked == "username" ? (
                    <input
                      className="form-control border-0 text-white bg-transparent"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  ) : (
                    <p className="fw-bold mb-0">@{user.username}</p>
                  )}
                </div>
                <div className="ms-auto">
                  {clicked == "username" ? (
                    <button
                      className="btn py-0"
                      onClick={(e) => {
                        updateItem(e, newUsername, "username");
                      }}
                    >
                      <i
                        className="fa-solid fa-circle-check"
                        style={{ color: "#992899" }}
                      ></i>
                    </button>
                  ) : (
                    <button
                      className="btn py-0"
                      onClick={(e) => {
                        e.preventDefault();
                        setClicked("username");
                      }}
                    >
                      <i
                        className="fa-solid fa-pencil"
                        style={{ color: "#992899" }}
                      ></i>
                    </button>
                  )}
                </div>
              </li>
              {/*---------------------------------------Email---------------------------------*/}
              <div style={{ fontSize: "12px", color: "#992899" }}>Email</div>
              <li className="list-group-item rounded-5 my-2 text-white bg-transparent d-flex flex-row">
                <div className="w-100">
                  <p className="fw-bold mb-0">{user.email}</p>
                </div>
              </li>
              {/*---------------------------------------Password---------------------------------*/}
              {/*Cuadrar el boton. Onclick el boton redirige al mismo workflow de "Forgot password"*/}
              <div style={{ fontSize: "12px", color: "#992899" }}>Password</div>
              <div className="d-flex flex-row">
                <li className="list-group-item rounded-5 my-2 text-white bg-transparent">
                  <div className="me-auto">
                    <p className="fw-bold mb-0">*********</p>
                  </div>
                </li>
                <Link to={`/password_recovery/${user.username}`}>
                  <button
                    className="btn text-white rounded-5 ms-3"
                    style={{ background: "#992899" }}
                  >
                    Change
                  </button>
                </Link>
              </div>
              {/*---------------------------------------Platforms usernames---------------------------------*/}
              <div style={{ fontSize: "12px", color: "#992899" }}>Link</div>
              <li className="list-group-item border-0 my-2 text-white bg-transparent d-flex flex-row">
                {/*---------------------------------------Steam---------------------------------*/}
                <p className="me-2">
                  <a
                    className="btn p-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSteam"
                    aria-expanded="false"
                    aria-controls="collapseSteam"
                  >
                    <i className="fa-brands fa-steam text-white fs-3"></i>
                  </a>
                </p>
                <div style={{ minHeight: "50px" }}>
                  <div
                    className="collapse collapse-horizontal"
                    id="collapseSteam"
                  >
                    <div className="d-flex flex-row">
                      <input
                        type="text"
                        className="form-control rounded-5 text-black w-auto"
                        style={{ maxHeight: "30px" }}
                        value={newSteamUsername}
                        onChange={(e) => setNewSteamUsername(e.target.value)}
                      />
                      <button
                        className="btn py-0"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSteam"
                        aria-expanded="false"
                        aria-controls="collapseSteam"
                        onClick={(e) => {
                          updateItem(e, newSteamUsername, "steam_username");
                        }}
                      >
                        <i
                          className="fa-solid fa-circle-check"
                          style={{ color: "#992899" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/*---------------------------------------Twitch---------------------------------*/}
                <p className="mx-2">
                  <button
                    className="btn p-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwitch"
                    aria-expanded="false"
                    aria-controls="collapseTwitch"
                  >
                    <i className="fa-brands fa-twitch text-white fs-3"></i>
                  </button>
                </p>
                <div style={{ minHeight: "50px" }}>
                  <div
                    className="collapse collapse-horizontal"
                    id="collapseTwitch"
                  >
                    <div className="d-flex flex-row">
                      <input
                        type="text"
                        className="form-control rounded-5 text-black w-auto"
                        style={{ maxHeight: "30px" }}
                        value={newTwitchUsername}
                        onChange={(e) => setTwitchUsername(e.target.value)}
                      />
                      <button
                        className="btn py-0"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwitch"
                        aria-expanded="false"
                        aria-controls="collapseTwitch"
                        onClick={(e) => {
                          updateItem(e, newTwitchUsername, "twitch_username");
                        }}
                      >
                        <i
                          className="fa-solid fa-circle-check"
                          style={{ color: "#992899" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              {/*---------------------------------------Interests---------------------------------*/}
              <div style={{ fontSize: "12px", color: "#992899" }}>
                Interests
              </div>
              <li className="list-group-item border-0 my-2 text-white bg-transparent d-flex flex-row">
                {/*!!!!!BUG!!!!!!!--------Creo que el problema cuando se añade más intereses y la página empieza a bailar está aquí */}
                <div className="d-flex flex-wrap gap-2">
                  {(!user || !user.interests || user.interests.length === 0) ? (
                    <p className="bg-transparent p-2">No Interests Added</p>
                  ) : (
                    user.interests.map((interest, index) => (
                      <p
                        className="bg-transparent rounded-5 border-white border p-2"
                        key={index}
                      >
                        {interest}
                      </p>
                    ))
                  )}
                </div>
                {/*----------------------------Modify Interests Modal Trigger Button-----------------------*/}
                <div className="ms-3">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#modifyInterestsModal"
                  >
                    <i
                      className="fa-solid fa-pencil"
                      style={{ color: "#992899" }}
                    ></i>
                  </button>
                </div>
                {/*----------------------------Modify Interests Modal-------------------------------*/}
                <div
                  className="modal fade"
                  id="modifyInterestsModal"
                  tabIndex="-1"
                  aria-labelledby="modifyInterestsModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div
                      className="modal-content"
                      style={{ background: "#020D19" }}
                    >
                      <div className="modal-header border-0">
                        <h1
                          className="modal-title fs-5"
                          id="modifyInterestsModalLabel"
                        >
                          Interests
                        </h1>
                        <div className="ms-auto" data-bs-theme="dark">
                          <button
                            type="button"
                            className="btn-close "
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={updateInterests}>
                          <input
                            type="search"
                            className="form-control rounded-5 bg-transparent text-white mb-3"
                            value={newInterest}
                            onChange={(e) => {
                              setNewInterest(e.target.value);
                            }}
                          ></input>
                        </form>
                        <small>My interests</small>
                        <ul className="list-group border-0 my-2 bg-transparent d-flex flex-row">
                          <div className="d-flex flex-wrap gap-2 justify-content-center">
                            {(!user || !user.interests || user.interests.length === 0) ? (
                              <p className="bg-transparent p-2">
                                No Interests Added
                              </p>
                            ) : (
                              user.interests.map((interest, index) => (
                                <li
                                  className="list-group-item bg-transparent text-white rounded-5 border-white border p-2"
                                  key={index}
                                >
                                  {interest}
                                  <button
                                    className="btn border-0 p-0 ms-2"
                                    onClick={() => {
                                      actions.deleteInterest(index);
                                      setUser((prevState) => ({
                                        ...prevState,
                                        interests: prevState.interests.filter(
                                          (_, i) => i !== index
                                        ),
                                      }));
                                    }}
                                  >
                                    <i className="fa-solid fa-xmark"></i>
                                  </button>
                                </li>
                              ))
                            )}
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*---------------------------------------TABS---------------------------------*/}
      <div className="row mt-3 m-auto">
        <nav className="d-flex justify-content-center">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-my-posts-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-my-posts"
              type="button"
              role="tab"
              aria-controls="nav-my-posts"
              aria-selected="true"
              style={{ color: "#992899" }}
            >
              My deals
            </button>
            <button
              className="nav-link"
              id="nav-saved-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-saved"
              type="button"
              role="tab"
              aria-controls="nav-saved"
              aria-selected="false"
              style={{ color: "#992899" }}
            >
              Saved
            </button>
            <button
              className="nav-link"
              id="nav-alerts-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-alerts"
              type="button"
              role="tab"
              aria-controls="nav-alerts"
              aria-selected="false"
              style={{ color: "#992899" }}
            >
              Alerts
            </button>
          </div>
        </nav>
        {/*---------------------------------------TABS CONTENT---------------------------------*/}
        <div className="tab-content text-white" id="nav-tabContent pb-4">
          {/*---------------------------------------My deals---------------------------------*/}
          <div
            className="tab-pane fade show active "
            id="nav-my-posts"
            role="tabpanel"
            aria-labelledby="nav-my-posts-tab"
            tabIndex="0"
          >
            <div className="container text-center ">
              <div className="row row-cols-auto justify-content-center">
                {(!user || !user.posts || user.posts.length === 0) ? (
                  <p className="bg-transparent p-2">No posts</p>
                ) : (
                  user.posts.map((post, index) => (
                    <div className="col mx-2 my-4" key={index}>
                      <EditableDealCard
                        id={post.id}
                        gameTitle={post.game_title}
                        itemType={post.item_type}
                        format={post.format}
                        rating={post.rating}
                        imageUrl={post.image_url}
                        offerLink={post.offer_link}
                        originalPrice={post.original_price}
                        offerPrice={post.offer_price}
                        expirationDate={post.expiration_date}
                        promoCode={post.promo_code}
                        scheduledDate={post.sheduled_date}
                        scheduledTime={post.sheduled_time}
                        userId={post.user_id}
                      />
                    </div>
                  ))
                  )}
              </div>
            </div>
          </div>
          {/*---------------------------------------Saved---------------------------------*/}
          <div
            className="tab-pane fade"
            id="nav-saved"
            role="tabpanel"
            aria-labelledby="nav-saved-tab"
            tabIndex="0"
          >
            <div className="container text-center">
              <div className="row row-cols-auto">
                {(!user || !user.saved || user.saved.length === 0) ? (
                  <p className="bg-transparent p-2">No saved deals</p>
                ) : (
                  user.saved.map((deal, index) => (
                    <div className="col mx-2 my-4" key={index}>
                      <DealCard
                        id={deal.id}
                        gameTitle={deal.game_title}
                        imageUrl={deal.image_url}
                        itemType={deal.item_type}
                        platform={deal.platform}
                        format={deal.format}
                        originalPrice={deal.original_price}
                        offerPrice={deal.offer_price}
                        expirationDate={deal.expiration_date}
                        promoCode={deal.promo_code}
                        offerLink={deal.offer_link}
                        gameTags={deal.game_tags}
                        rating={deal.rating}
                      />
                    </div>
                  ))
                  )}
              </div>
            </div>
          </div>
          {/*---------------------------------------Alerts---------------------------------*/}
          <div
            className="tab-pane fade"
            id="nav-alerts"
            role="tabpanel"
            aria-labelledby="nav-alerts-tab"
            tabIndex="0"
          >
            <div className="container text-center">
              <div className="row row-cols-auto">
                {(!user || !user.alerts || user.alerts.length === 0) ? (
                  <p className="bg-transparent p-2">No alerts</p>
                ) : (
                  user.alerts.map((alert, index) => (
                    <div className="col mx-2 my-4"key={index}>
                      <DealCard
                        id={alert.id}
                        gameTitle={alert.game_title}
                        imageUrl={alert.image_url}
                        itemType={alert.item_type}
                        platform={alert.platform}
                        format={alert.format}
                        originalPrice={alert.original_price}
                        offerPrice={alert.offer_price}
                        expirationDate={alert.expiration_date}
                        promoCode={alert.promo_code}
                        offerLink={alert.offer_link}
                        gameTags={alert.game_tags}
                        rating={alert.rating}
                      />
                    </div>
                  ))
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
