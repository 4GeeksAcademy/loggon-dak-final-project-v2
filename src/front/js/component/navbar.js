import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSuggestions(actions.getSuggestions(e.target.value));
  };

  return (
    <div className="position-relative">
      <nav className="navbar bg-dark bg-gradient justify-content-evenly flex-row">
        <div className="container-fluid ">
          <div className="d-flex flex-row w-50">
            {/*---------------------------------------MENU ICON---------------------------------*/}
            <button
              className="btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-menu"
              aria-expanded="false"
              aria-controls="navbar-menu"
            >
              <i className="fa-solid fa-bars" style={{ color: "#992899" }}></i>
            </button>
            {/*---------------------------------------LOGO---------------------------------*/}
            <Link to={"/"} className="navbar-brand mx-3">
              <img
                src="https://cdn.discordapp.com/attachments/1200818313421398017/1208775421672292382/allanrogerhaze_Create_an_impactful_and_memorable_logo_for_a_gam_4523fdda-cff8-4f99-8771-dca36d9acbfc.png?ex=65edbd56&is=65db4856&hm=240bb1292bef08ee14f51727418fd731fb104e9bbf8e759aa3b8d7ac273f81c5&"
                alt="Bootstrap"
                width="40"
                height="34"
              />
            </Link>
            {/*---------------------------------------SEARCH BAR---------------------------------*/}
            {/*Añadir display de sugerencias, search handle con enter, centrar la barra de búsqueda
            (el problema está en bottom padding de <p>, pero a sobreescribirlo el campo de input se descuadra)*/}
            <div className="d-flex flex-row">
              <p className="mx-2">
                <button
                  className="btn p-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSearch"
                  aria-expanded="false"
                  aria-controls="collapseSearch"
                >
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "#992899" }}
                  ></i>
                </button>
              </p>
              <div style={{ minHeight: "50px" }}>
                <div
                  className="collapse collapse-horizontal"
                  id="collapseSearch"
                >
                  <form>
                    <input
                      type="search"
                      className="form-control rounded-5 w-auto text-white bg-transparent"
                      style={{ maxHeight: "30px" }}
                      aria-label="Búsqueda"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*---------------------------------------SIGNUP MODAL TRIGGER BUTTON---------------------------------*/}
          <button
            type="button"
            className="mx-3 btn"
            data-bs-toggle="modal"
            data-bs-target="#signupModalToggle"
          >
            <i
              className="fa-solid fa-user-plus"
              style={{ color: "#992899" }}
            ></i>
          </button>
        </div>
        {/*---------------------------------------SIGNUP MODAL---------------------------------*/}
        <div
          className="modal fade"
          id="signupModalToggle"
          aria-hidden="true"
          aria-labelledby="signupModalToggleLabel"
          tabindex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="signupModalToggleLabel">
                  Registrarse
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/*---------------------------------------Diego---------------------------------*/}


                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Username</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
                </div>
                <label for="inputPassword5" class="form-label">Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" class="form-text">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>


                <div className="text-center mt-4">
                  <button className="mt-2 rounded-circle mx-2">
                    <i className="fa-brands fa-steam text-dark fs-3"></i>
                  </button>

                  <button className="mt-2 rounded-circle mx-2">
                    <i className="fa-brands fa-twitch text-dark fs-3"></i>
                  </button>
                </div>



                {/*---------------------------------------Diego---------------------------------*/}
              </div>
              <div className="modal-footer flex-column">
                <button className="btn text-white" style={{ background: "#992899" }}>
                  Registrarse
                </button>
                <button
                  className="btn btn-sm btn-link"
                  data-bs-target="#loginModalToggle"
                  data-bs-toggle="modal"
                >
                  Ya tienes una cuenta?
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------LOGIN MODAL---------------------------------*/}
        <div
          className="modal fade"
          id="loginModalToggle"
          aria-hidden="true"
          aria-labelledby="loginModalToggleLabel"
          tabindex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="loginModalToggleLabel">
                  Iniciar sesión
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/*---------------------------------------Diego---------------------------------*/}
               
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Username</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
                </div>
                <label for="inputPassword5" class="form-label">Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" class="form-text">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>


                <div className="text-center mt-4">
                  <button className="mt-2 rounded-circle mx-2">
                    <i className="fa-brands fa-steam text-dark fs-3"></i>
                  </button>

                  <button className="mt-2 rounded-circle mx-2">
                    <i className="fa-brands fa-twitch text-dark fs-3"></i>
                  </button>
                </div>
                            <h1> Recuperar contrase;a </h1>
                {/*---------------------------------------Diego---------------------------------*/}
              </div>
              <div className="modal-footer flex-column">
                <button className="btn text-white" style={{ background: "#992899" }}>
                  Iniciar sesión
                </button>
                <button
                  className="btn btn-sm btn-link"
                  data-bs-target="#signupModalToggle"
                  data-bs-toggle="modal"
                >
                  No tengo cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/*---------------------------------------MENU CONTENTS---------------------------------*/}
      {/*Cuando haces click fuera del menu tiene que cerrar, ahora no lo hace*/}
      <div
        className="collapse bg-dark bg-gradient text-white position-absolute"
        id="navbar-menu"
        style={{ width: "140px", height: "100%" }}
      >
        <div className="d-flex flex-column ms-4 my-3">
          <Link
            className="text-white text-decoration-none mb-2"
            to={"/profile/:username"}
          >
            Mi perfil
          </Link>
          <Link className="text-white text-decoration-none mb-2" to={"/"}>
            Publicar oferta
          </Link>
          <Link className="text-white text-decoration-none mb-2" to={"/"}>
            Juegos
          </Link>
          <Link className="text-white text-decoration-none mb-2" to={"/"}>
            Ofertas
          </Link>
        </div>
        {/*---------------------------------------LOGIN MODAL TRIGGER BUTTON---------------------------------*/}
        <div className="ms-4 mb-3">
          <button
            type="button"
            className="btn text-white"
            style={{ background: "#992899" }}
            data-bs-toggle="modal"
            data-bs-target="#loginModalToggle"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
