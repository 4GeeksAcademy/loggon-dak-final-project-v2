import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//import loggonBn from "/workspaces/loggon-dak-final-project-v2/src/front/img/loggonBn.png";
import '../../styles/icons.css';

import { LoadingSpinner } from "../component/loadingSpinner";
import { DealCard } from "../component/dealCard";
import { Filters } from "../component/filters";

import bn1 from "../../img/bn1.png";

// import bn1 from 'src/front/img/bn1.png';

import { Context } from "../store/appContext";

export const Feed = () => {
  const { store, actions } = useContext(Context);
  const [deals, setDeals] = useState([]);

  //Cambiar strings segun los datos de API
  const psDeals = deals.filter(
    (deal) => deal.platform === "PS4" || deal.platform === "PS5"
  );
  const xboxDeals = deals.filter((deal) => deal.platform === "Xbox");
  const pcDeals = deals.filter((deal) => deal.platform === "PC");
  const nintendoDeals = deals.filter((deal) => deal.platform === "Nintendo");

  useEffect(() => {
    let activeElement = null;
    const handleClick = (event) => {
      if (activeElement) activeElement.classList.remove("active");
      if (
        event.target.matches(
          ".ps-effect, .xbox-effect, .pc-effect, .nintendo-effect"
        )
      ) {
        activeElement = event.target;
        activeElement.classList.add("active");
      }
    };
    document.addEventListener("click", handleClick);

    // Agregar la clase 'active' al primer elemento con la clase 'ps-effect'
    const psElement = document.querySelector(".ps-effect");
    if (psElement) {
      psElement.classList.add("active");
      activeElement = psElement;
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    console.log("store.deals", store.deals);
    setDeals(store.deals);
  }, [store.deals]);

  if (!store.deals || store.deals.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/*------------------------------------LOGO---------------------------------*/}
      <div className="container  py-5 d-flex flex-row justify-content-center">
        <img
          src={bn1}
          alt="bn"
          width="auto"
          height="auto"
          className="mt-1 me-2 sombra rounded-4 bn-effect"
        />
        {/* <img
          src="https://static.vecteezy.com/system/resources/previews/026/852/558/large_2x/neon-glowing-forward-arrows-showing-right-png.png"
          alt="Descrição da Imagem"
          className="img-fluid opacity-50"
          style={{height: "100px"}}
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/026/852/558/large_2x/neon-glowing-forward-arrows-showing-right-png.png"
          alt="Descrição da Imagem"
          className="img-fluid opacity-50"
          style={{height: "100px"}}
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/026/852/558/large_2x/neon-glowing-forward-arrows-showing-right-png.png"
          alt="Descrição da Imagem"
          className="img-fluid opacity-50"
          style={{height: "100px", transform: "scaleX(-1)"}}
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/026/852/558/large_2x/neon-glowing-forward-arrows-showing-right-png.png"
          alt="Descrição da Imagem"
          className="img-fluid opacity-50"
          style={{height: "100px", transform: "scaleX(-1)"}}
        /> */}
      </div>
      <div className="d-flex justify-content-end pt-4">{/*<Filters />*/}</div>
      {/*---------------------------------------PLATFORMS TABS---------------------------------*/}
      <div className="row m-auto">
        <nav className="d-flex justify-content-center">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="bg-color border-0 "
              id="nav-ps-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-ps"
              type="button"
              role="tab"
              aria-controls="nav-ps"
            >
              <img
                className="ps-effect rounded-circle mx-1"
                src="https://img.icons8.com/ios-glyphs/50/228BE6/play-station.png"
                alt="play-station"
              />
            </button>
            <button
              className="bg-color border-0"
              id="nav-xbox-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-xbox"
              type="button"
              role="tab"
              aria-controls="nav-xbox"
            >
              <img
                className="xbox-effect rounded-circle mx-1"
                src="https://img.icons8.com/ios/50/40C057/xbox.png"
                alt="xbox"
              />
            </button>
            <button
              className="bg-color border-0"
              id="nav-pc-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-pc"
              type="button"
              role="tab"
              aria-controls="nav-pc"
            >
              <img
                className="pc-effect rounded-4 img-fluid mx-1"
                src="https://img.icons8.com/ios-glyphs/50/FD7E14/windows-10.png"
                alt="windows-10"
              />
            </button>
            <button
              className="bg-color border-0"
              id="nav-nintendo-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-nintendo"
              type="button"
              role="tab"
              aria-controls="nav-nintendo"
            >
              <img
                className="nintendo-effect rounded-4 img-fluid mx-1"
                src="https://img.icons8.com/ios-filled/50/FA5252/nintendo-switch-logo.png"
                alt="nintendo-switch-logo"
              />
            </button>
          </div>
        </nav>
        {/*---------------------------------------PLATFORMS TABS CONTENT---------------------------------*/}
        <div className="tab-content" id="nav-tabContent">
          {/*---------------------------------------PS---------------------------------*/}
          <div
            className="tab-pane fade show active"
            id="nav-ps"
            role="tabpanel"
            aria-labelledby="nav-ps-tab"
            tabIndex="0"
          >
            <div className="container text-center">
              <div className="row row-cols-auto">
                {psDeals.map((deal, index) => (
                  <div className="col m-auto my-4" key={index}>
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
                ))}
              </div>
            </div>
          </div>
          {/*---------------------------------------XBOX---------------------------------*/}
          <div
            className="tab-pane fade"
            id="nav-xbox"
            role="tabpanel"
            aria-labelledby="nav-xbox-tab"
            tabIndex="0"
          >
            <div className="container text-center">
              <div className="row row-cols-auto">
                {xboxDeals.map((deal, index) => (
                  <div className="col m-auto my-4" key={index}>
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
                ))}
              </div>
            </div>
          </div>
          {/*---------------------------------------PC---------------------------------*/}
          <div
            className="tab-pane fade"
            id="nav-pc"
            role="tabpanel"
            aria-labelledby="nav-pc-tab"
            tabIndex="0"
          >
            <div className="container text-center">
              <div className="row row-cols-auto">
                {pcDeals.map((deal, index) => (
                  <div className="col m-auto my-4" key={index}>
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
                ))}
              </div>
            </div>
          </div>
          {/*---------------------------------------NINTENDO---------------------------------*/}
          <div
            className="tab-pane fade"
            id="nav-nintendo"
            role="tabpanel"
            aria-labelledby="nav-nintendo-tab"
            tabIndex="0"
          >
            <div className="container text-center">
              <div className="row row-cols-auto">
                {nintendoDeals.map((deal, index) => (
                  <div className="col m-auto my-4" key={index}>
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
