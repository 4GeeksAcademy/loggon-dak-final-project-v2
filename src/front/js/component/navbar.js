import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

import "/workspaces/loggon-dak-final-project-v2/src/front/styles/button.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const closeSignUpButton = useRef(null);
  const closeLoginButton = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    privacy: false,
    newsletter: false,
  });
  const [forgotPassword, setForgotPassword] = useState({
    email: "",
    email2: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* useEffect(() => {
     if (!searchTerm) {
       setSuggestions([]);
     }
   }, [searchTerm]);*/

  useEffect(() => {
    if (location.pathname === "/login") {
      const loginModal = document.getElementById("loginModalToggle");
      if (loginModal) {
        const modal = new bootstrap.Modal(loginModal);
        modal.show();
      }
    }
  }, [location.pathname]);

  function handleSignup(e) {
    e.preventDefault();
    if (signup.password !== signup.password2) {
      alert("Passwords do not match!");
      return;
    } else if (!signup.username || !signup.password || !signup.password2) {
      alert("Missing fields!");
      return;
    } else if (!signup.privacy) {
      alert("You must accept the privacy policy!");
      return;
    } else {
      closeSignUpButton.current.click();
      actions.signup(
        signup.email,
        signup.password,

        signup.username
      );
      alert("Successfully registered!");
      navigate("/login");
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    actions.login(login.email, login.password);
    closeLoginButton.current.click();
    navigate("/");
  }

  // Somehow the input doesn't restrict to email format
  function sendRecoveryEmail() {
    if (
      forgotPassword.email.trim() &&
      forgotPassword.email2.trim() &&
      forgotPassword.email === forgotPassword.email2
    ) {
      actions.forgotPassword(forgotPassword.email);
      alert("Password recovery email sent successfully!");
    } else if (!forgotPassword.email || !forgotPassword.email2) {
      alert("Missing fields!");
    } else if (forgotPassword.email !== forgotPassword.email2) {
      alert("Emails do not match!");
    }
  }

  function performSearch(e) {
    e.preventDefault();
    actions.searchInNavbar(searchTerm);
    setSearchTerm("");
    navigate(`/search_results/${searchTerm}`);
  }

  /*const handleInputChange = (e) => {
     setSearchTerm(e.target.value);
     setSuggestions(actions.getSuggestions(e.target.value));
   };*/

  return (
    <div className="position-relative">
      {/*Me gusta opacity-75 y fixed-top pero todo lo de mas se pone con opacidad y disabled no se puede tocar*/}
      <nav
        className="navbar bg-gradient justify-content-evenly flex-row"
        style={{ background: "#020D19" }}
      >
        <div className="container-fluid">
          <div className="d-flex flex-row w-50">
            {/*---------------------------------------MENU ICON---------------------------------*/}
            <button
              className="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#menuOffcanvas"
              aria-controls="menuOffcanvas"
            >
              <i className="fa-solid fa-bars" style={{ color: "#992899" }}></i>
            </button>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="menuOffcanvas"
              aria-labelledby="menuOffcanvasLabel"
              style={{ width: "15%", background: "#020D19" }}
            >
              {/*---------------------------------------MENU CONTENTS---------------------------------*/}
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title text-white"
                  id="menuOffcanvasLabel"
                >
                  Menu
                </h5>
              </div>
              <div className="offcanvas-body">
                <div className="d-flex flex-column ms-4 my-3">
                  {store.loggedIn && (
                    <div>
                      <Link
                        className="text-white text-decoration-none mb-2"
                        to={`/myprofile/${store.user.username}`}
                      >
                        <div data-bs-dismiss="offcanvas">My profile</div>
                      </Link>
                      <Link
                        className="text-white text-decoration-none mb-2"
                        to={`/postdeal/user/${store.user.username}`}
                      >
                        <div data-bs-dismiss="offcanvas">Post deal</div>
                      </Link>{" "}
                    </div>
                  )}
                  <Link
                    className="text-white text-decoration-none mb-2"
                    to={"/games"}
                  >
                    <div data-bs-dismiss="offcanvas">Games</div>
                  </Link>
                  <Link
                    className="text-white text-decoration-none mb-2"
                    to={"/"}
                  >
                    <div data-bs-dismiss="offcanvas">Deals</div>
                  </Link>

                  {/*---------------------------------------LOGIN/LOGOUT MODAL TRIGGER BUTTON---------------------------------*/}
                  <div className="ms-4 mb-3">
                    {!store.loggedIn ? (
                      <button
                        type="button"
                        className="btn text-white btn-effect m-auto mt-4"
                        // style={{ background: "#992899" }}
                        data-bs-toggle="modal"
                        data-bs-target="#loginModalToggle"
                      >
                        <div data-bs-dismiss="offcanvas">Login</div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn text-white btn-effect"
                        // style={{ background: "#992899" }}
                        data-bs-toggle="modal"
                        data-bs-target="#logoutModal"
                      >
                        <div data-bs-dismiss="offcanvas">Logout</div>
                      </button>
                    )}
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
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div
                  className="modal-content text-white "
                  style={{ background: "#020D19" }}
                >
                  <div className="modal-header border-0">
                    <h1 className="modal-title fs-5" id="loginModalToggleLabel">
                      Login
                    </h1>
                    <div className="ms-auto" data-bs-theme="dark">
                      <button
                        type="button"
                        className="btn-close "
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ref={closeLoginButton}
                      ></button>
                    </div>
                  </div>
                  <div className="modal-body">
                    {/*---------------------------------------Login modal 3rd party buttons---------------------------------*/}

                    <div className="text-center mt-4 p-3">
                      <button className="mt-2 rounded-circle mx-2">
                        <i className="fa-brands fa-steam text-dark fs-3"></i>
                      </button>

                      <button className="mt-2 rounded-circle mx-2">
                        <i className="fa-brands fa-twitch text-dark fs-3"></i>
                      </button>

                      <button className="mt-2 rounded-circle mx-2">
                        <i className="fa-brands fa-google text-dark fs-3"></i>
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <h1>oR</h1>
                    </div>
                    {/*---------------------------------------Login modal form---------------------------------*/}
                    <form>
                      <div className="mb-3">
                        <label htmlFor="loginEmailInput" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control rounded-5 text-white bg-transparent"
                          id="loginEmailInput"
                          placeholder="Email"
                          value={login.email}
                          onChange={(e) =>
                            setLogin({ ...login, email: e.target.value })
                          }
                        />
                      </div>
                      <label
                        htmlFor="loginPasswordInput"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="loginPasswordInput"
                        className="form-control rounded-5 text-white bg-transparent"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Password"
                        value={login.password}
                        onChange={(e) =>
                          setLogin({ ...login, password: e.target.value })
                        }
                      />
                      <div
                        id="passwordHelpBlock"
                        className="form-text text-white"
                      ></div>
                      <div className="mb-3 form-check m-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMeCheck"
                          value={login.remember_me}
                          onChange={(e) => {
                            setLogin((prevState) => ({
                              ...prevState,
                              remember_me: !login.remember_me,
                            }));
                            console.log(login.remember_me);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMeCheck"
                          style={{ fontSize: "15px" }}
                        >
                          Remember me
                        </label>
                      </div>

                      {/*------------------------Forgot Password Modal Trigger Button------------------------*/}
                      <div className="text-center">
                        <button
                          className="btn btn-sm btn-link "
                          data-bs-target="#forgotPasswordModalToggle"
                          data-bs-toggle="modal"
                          onClick={(e) => e.preventDefault()}
                        >
                          Forgot my password
                        </button>
                      </div>
                      {/*---------------------------------------Login Modal buttons---------------------------------*/}
                      <div className="modal-footer border-0 flex-column">
                        <button
                          className="btn text-white btn-effect"
                          data-bs-toggle={`${store.loggedIn ? "modal" : ""}`}
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-link"
                          data-bs-target="#signupModalToggle"
                          data-bs-toggle="modal"
                        >
                          Not registered yet?
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*---------------------------------------Forgot Password Modal---------------------------------*/}
            <div
              className="modal fade"
              id="forgotPasswordModalToggle"
              aria-hidden="true"
              aria-labelledby="forgotPasswordModalToggleLabel"
              tabIndex="-1"
            >
              <div className="modal-dialog modal-sm modal-dialog-centered">
                <div
                  className="modal-content text-white"
                  style={{ background: "#020D19" }}
                >
                  <div className="modal-header border-0">
                    <h1
                      className="modal-title fs-5"
                      id="forgotPasswordModalToggleLabel"
                    >
                      Please input your email
                    </h1>
                  </div>
                  <div className="modal-body">
                    <input
                      type="email"
                      className="form-control rounded-5 text-white bg-transparent h-100 mb-3"
                      placeholder="Email"
                      value={forgotPassword.email}
                      onChange={(e) =>
                        setForgotPassword({
                          ...forgotPassword,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      className="form-control rounded-5 text-white bg-transparent h-100"
                      placeholder="Confirm your email"
                      value={forgotPassword.email2}
                      onChange={(e) =>
                        setForgotPassword({
                          ...forgotPassword,
                          email2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="modal-footer border-0">
                    <button
                      className="btn text-white btn-effect-blue"
                      data-bs-target="#loginModalToggle"
                      data-bs-toggle="modal"
                    >
                      Back
                    </button>
                    <button
                      className="btn text-white btn-effect"
                      type="submit"
                      // style={{ background: "#992899" }}
                      /* data-bs-dismiss="modal"*/
                      onClick={sendRecoveryEmail}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-4 mb-3">
              {/*---------------------------------------LOGOUT MODAL---------------------------------*/}
              <div
                className="modal fade"
                id="logoutModal"
                aria-hidden="true"
                aria-labelledby="logoutModalLabel"
                tabIndex="-1"
              >
                <div className="modal-dialog modal-sm modal-dialog-centered">
                  <div
                    className="modal-content text-white"
                    style={{ background: "#020D19" }}
                  >
                    <div className="modal-header border-0">
                      <h1 className="modal-title fs-5" id="logoutModalLabel">
                        Are you sure?
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
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <Link to="/">
                        {" "}
                        <button
                          className="btn text-white"
                          data-bs-dismiss="modal"
                          style={{ background: "#992899" }}
                          onClick={actions.logout}
                        >
                          Logout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*---------------------------------------LOGO---------------------------------*/}
            <Link to={"/"} className="navbar-brand mx-3">
              <img
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/429797990_692838776259943_2699987145303885142_n.png?_nc_cat=111&ccb=1-7&_nc_sid=510075&_nc_ohc=Iix4AjxwuowAX_ymY-K&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRvc8PN5m7QmLQ2f17JEk-r2EHOT5ZqyQ-zxl7jvWq1bg&oe=660AF85C"
                alt="loGGon"
                width="40"
                height="34"
                className="rounded-circle text-white"
              />
            </Link>
            {/*---------------------------------------SEARCH BAR---------------------------------*/}

            <div className="d-flex flex-row">
              <p className="mx-2">
                <button
                  className="btn p-0 mt-2"
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
                  <form onSubmit={performSearch}>
                    <input
                      type="search"
                      className="form-control rounded-5 w-auto text-white bg-transparent mt-2"
                      style={{ maxHeight: "30px" }}
                      aria-label="Búsqueda"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*---------------------------------------SIGNUP MODAL TRIGGER BUTTON---------------------------------*/}
          {!store.loggedIn && (
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
          )}
        </div>
        {/*---------------------------------------SIGNUP MODAL---------------------------------*/}
        <div
          className="modal fade"
          id="signupModalToggle"
          aria-hidden="true"
          aria-labelledby="signupModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div
              className="modal-content text-white"
              style={{ background: "#020D19" }}
            >
              <div className="modal-header border-0">
                <h1 className="modal-title fs-5 " id="signupModalToggleLabel">
                  Signup
                </h1>
                <div className="ms-auto" data-bs-theme="dark">
                  <button
                    type="button"
                    className="btn-close "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={closeSignUpButton}
                  ></button>
                </div>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                  <div className="mb-3 col-md-6 m-4">
                    <img
                      src="https://scontent.xx.fbcdn.net/v/t1.15752-9/429797990_692838776259943_2699987145303885142_n.png?_nc_cat=111&ccb=1-7&_nc_sid=510075&_nc_ohc=Iix4AjxwuowAX_ymY-K&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRvc8PN5m7QmLQ2f17JEk-r2EHOT5ZqyQ-zxl7jvWq1bg&oe=660AF85C"
                      className="img-fluid rounded-circle"
                      alt="Logo"
                    />
                    {/*---------------------------------------Signup modal 3rd party buttons---------------------------------*/}
                    <div className="text-center mt-4 d-none d-md-block">
                      <button className="mt-2 rounded-circle mx-2">
                        <i className="fa-brands fa-steam text-dark fs-3"></i>
                      </button>
                      <button className="mt-2 rounded-circle mx-2">
                        <i className="fa-brands fa-twitch text-dark fs-3"></i>
                      </button>
                      <button className="mt-2 rounded-circle mx-2">
                        <i className="fa-brands fa-google text-dark fs-3"></i>
                      </button>
                    </div>
                  </div>
                  {/*---------------------------------------Signup modal registration form---------------------------------*/}
                  <form className="col-md-6 m-auto p-4">
                    <div className="mb-1">
                      <label
                        htmlFor="signupUsernameInput"
                        className="form-label"
                      >
                        Username
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-5 text-white bg-transparent"
                        id="signupUsernameInput"
                        placeholder="Username"
                        value={signup.username}
                        onChange={(e) =>
                          setSignup({ ...signup, username: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-1">
                      <label htmlFor="signupEmailInput" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-5 text-white bg-transparent"
                        id="signupEmailInput"
                        placeholder="Email"
                        value={signup.email}
                        onChange={(e) =>
                          setSignup({ ...signup, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        htmlFor="signupPasswordInput"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-5 text-white bg-transparent"
                        id="signupPasswordInput"
                        placeholder="Password"
                        value={signup.password}
                        onChange={(e) =>
                          setSignup({ ...signup, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-1">
                      <label
                        htmlFor="signupPasswordInput2"
                        className="form-label"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="signupPasswordInput2"
                        className="form-control rounded-5 text-white bg-transparent"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Confirm Password"
                        value={signup.password2}
                        onChange={(e) =>
                          setSignup({ ...signup, password2: e.target.value })
                        }
                      />
                    </div>

                    <div
                      id="passwordHelpBlock"
                      className="form-text text-white"
                    >
                      Your password must be 8-20 characters long, contain
                      letters and numbers, and must not contain spaces, special
                      characters, or emoji.
                    </div>

                    <div className="mb-3 form-check m-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="newsletterCheck"
                        value={signup.newsletter}
                        onChange={() =>
                          setSignup({
                            ...signup,
                            newsletter: !signup.newsletter,
                          })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="newsletterCheck"
                        style={{ fontSize: "10px" }}
                      >
                        I agree to receive commercial communications and offers
                        by loGGon
                      </label>
                    </div>

                    <div className="mb-3 form-check m-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="privacyCheck"
                        value={signup.privacy}
                        onChange={() =>
                          setSignup({ ...signup, privacy: !signup.privacy })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="privacyCheck"
                        style={{ fontSize: "10px" }}
                      >
                        I have read and accept the{" "}
                        <Link
                          to="/privacy_policy"
                          target="_blank"
                          className="form-check-label btn btn-link"
                        >
                          Terms & Conditions of Use and Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {/*---------------------------------------Signup modal buttons---------------------------------*/}
                    <div className="modal-footer flex-column border-0">
                      <button
                        className="btn text-white"
                        style={{ background: "#992899" }}
                        onClick={handleSignup}
                      >
                        Signup
                      </button>
                      <button
                        className="btn btn-sm btn-link"
                        data-bs-target="#loginModalToggle"
                        data-bs-toggle="modal"
                        onClick={(e) => e.preventDefault()}
                      >
                        Already registered?
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
