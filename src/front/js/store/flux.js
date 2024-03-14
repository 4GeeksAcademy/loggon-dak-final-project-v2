const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      loggedIn: false,
      user: {
        /*id: 1,
        email: "pereayats@email.com",
        password: "1234",
        image_url:
          "https://pbs.twimg.com/profile_images/1615039426530316288/jhcrsFcg_400x400.jpg",
        username: "pere",
        steam_username: "pereayts",
        twitch_username: "pereayats",
        interests: [
          "Single Player",
          "Horror",
          "Survival",
          "Third Person",
          "Action-Adventure",
          "3D",
        ],
        posts: [
          {
            id: 1,
            user_id: 1,
            date_of_creation: "",
            game_title: "GTA V",
            image_url: "https://i.blogs.es/dfbccc/trucosgtavps4/1366_2000.jpg",
            item_type: "DLC",
            platform: "Xbox",
            format: "Digital",
            rating: 8,
            original_price: 79.99,
            offer_price: 35.99,
            expiration_date: "2024-03-27",
            promo_code: "HDGUDS",
            offer_link:
              "https://store.steampowered.com/app/397540/Borderlands_3/",
            scheduled: false,
            scheduled_date: "",
            sheduled_time: "",
            game_tags: ["multiplayer", "action", "adventure", "open-world"],
          },
          {
            id: 2,
            user_id: 1,
            date_of_creation: "",
            game_title: "Atomic Heart",
            image_url:
              "https://image.api.playstation.com/vulcan/ap/rnd/202209/2815/ghdxLSLpUl24o2Q1eq3yTaji.jpg",
            item_type: "Game",
            platform: "PC",
            format: "CD",
            rating: 10,
            original_price: 79.99,
            offer_price: 60.99,
            expiration_date: "2024-03-28",
            promo_code: "DJIODP",
            offer_link:
              "https://store.steampowered.com/app/397540/Borderlands_3/",
            scheduled_date: "",
            sheduled_time: "",
            game_tags: ["singleplayer", "action", "adventure"],
          },
          {
            id: 3,
            user_id: 1,
            date_of_creation: "",
            game_title: "Overwatch 2",
            image_url:
              "https://xxboxnews.blob.core.windows.net/prod/sites/2/2022/10/OW2-be9287b234afbe7898ac.jpg",
            item_type: "In-Game Purchase",
            platform: "PS4",
            format: "Digital",
            rating: 10,
            original_price: 15,
            offer_price: 9.99,
            expiration_date: "2024-03-26",
            promo_code: "DFJISOP",
            offer_link:
              "https://store.steampowered.com/app/397540/Borderlands_3/",
            scheduled_date: "",
            sheduled_time: "",
            game_tags: ["multiplayer", "action", "shooter"],
          },
          {
            id: 4,
            user_id: 1,
            date_of_creation: "",
            game_title: "Pokemon Violet",
            image_url:
              "https://assets-prd.ignimgs.com/2022/08/03/pokemon-violet-1659542326365.jpg",
            item_type: "Game",
            platform: "Nintendo",
            format: "CD",
            rating: 10,
            original_price: 65,
            offer_price: 49,
            expiration_date: "2024-03-29",
            promo_code: "DFJSIF",
            offer_link:
              "https://store.steampowered.com/app/397540/Borderlands_3/",
            scheduled_date: "",
            sheduled_time: "",
            game_tags: ["singleplayer", "adventure", "open-world"],
          },
        ],
        saved: [],
        alerts: [
          {
            id: 1,
            user_id: 1,
            date_of_creation: "",
            game_title: "GTA V",
            image_url: "https://i.blogs.es/dfbccc/trucosgtavps4/1366_2000.jpg",
            item_type: "DLC",
            platform: "Xbox",
            format: "Digital",
            rating: 8,
            original_price: 79.99,
            offer_price: 35.99,
            expiration_date: "2024-03-27",
            promo_code: "HDGUDS",
            offer_link:
              "https://store.steampowered.com/app/397540/Borderlands_3/",
            scheduled: false,
            scheduled_date: "",
            sheduled_time: "",
            game_tags: ["multiplayer", "action", "adventure", "open-world"],
          },
        ],
        newsletter: false,*/
      },
      deals: [
        {
          id: 1,
          user_id: 1,
          date_of_creation: "",
          game_title: "GTA V",
          image_url: "https://i.blogs.es/dfbccc/trucosgtavps4/1366_2000.jpg",
          item_type: "DLC",
          platform: "Xbox",
          format: "Digital",
          rating: 8,
          original_price: 79.99,
          offer_price: 35.99,
          expiration_date: "2024-03-27",
          promo_code: "HDGUDS",
          offer_link:
            "https://store.steampowered.com/app/397540/Borderlands_3/",
          scheduled: false,
          scheduled_date: "",
          sheduled_time: "",
          game_tags: ["multiplayer", "action", "adventure", "open-world"],
        },
        {
          id: 2,
          user_id: 1,
          date_of_creation: "",
          game_title: "Atomic Heart",
          image_url:
            "https://image.api.playstation.com/vulcan/ap/rnd/202209/2815/ghdxLSLpUl24o2Q1eq3yTaji.jpg",
          item_type: "Game",
          platform: "PC",
          format: "CD",
          rating: 10,
          original_price: 79.99,
          offer_price: 60.99,
          expiration_date: "2024-03-28",
          promo_code: "DJIODP",
          offer_link:
            "https://store.steampowered.com/app/397540/Borderlands_3/",
          scheduled_date: "",
          sheduled_time: "",
          game_tags: ["singleplayer", "action", "adventure"],
        },
        {
          id: 3,
          user_id: 1,
          date_of_creation: "",
          game_title: "Overwatch 2",
          image_url:
            "https://xxboxnews.blob.core.windows.net/prod/sites/2/2022/10/OW2-be9287b234afbe7898ac.jpg",
          item_type: "In-Game Purchase",
          platform: "PS4",
          format: "Digital",
          rating: 10,
          original_price: 15,
          offer_price: 9.99,
          expiration_date: "2024-03-26",
          promo_code: "DFJISOP",
          offer_link:
            "https://store.steampowered.com/app/397540/Borderlands_3/",
          scheduled_date: "",
          sheduled_time: "",
          game_tags: ["multiplayer", "action", "shooter"],
        },
        {
          id: 4,
          user_id: 1,
          date_of_creation: "",
          game_title: "Pokemon Violet",
          image_url:
            "https://assets-prd.ignimgs.com/2022/08/03/pokemon-violet-1659542326365.jpg",
          item_type: "Game",
          platform: "Nintendo",
          format: "CD",
          rating: 10,
          original_price: 65,
          offer_price: 49,
          expiration_date: "2024-03-29",
          promo_code: "DFJSIF",
          offer_link:
            "https://store.steampowered.com/app/397540/Borderlands_3/",
          scheduled_date: "",
          sheduled_time: "",
          game_tags: ["singleplayer", "adventure", "open-world"],
        },
      ],
      games: [],
      gamesWithDetails: [],
      users: [
        {
          id: 1,
          username: "pere",
          image_url:
            "https://pbs.twimg.com/profile_images/1615039426530316288/jhcrsFcg_400x400.jpg",
          steam_username: "pereayts",
          twitch_username: "pereayats",
          posts: [
            {
              id: 1,
              user_id: 1,
              date_of_creation: "",
              game_title: "GTA V",
              image_url:
                "https://i.blogs.es/dfbccc/trucosgtavps4/1366_2000.jpg",
              item_type: "DLC",
              platform: "Xbox",
              format: "Digital",
              rating: 8,
              original_price: 79.99,
              offer_price: 35.99,
              expiration_date: "2024-03-27",
              promo_code: "HDGUDS",
              offer_link:
                "https://store.steampowered.com/app/397540/Borderlands_3/",
              scheduled: false,
              scheduled_date: "",
              sheduled_time: "",
              game_tags: ["multiplayer", "action", "adventure", "open-world"],
            },
            {
              id: 2,
              user_id: 1,
              date_of_creation: "",
              game_title: "Atomic Heart",
              image_url:
                "https://image.api.playstation.com/vulcan/ap/rnd/202209/2815/ghdxLSLpUl24o2Q1eq3yTaji.jpg",
              item_type: "Game",
              platform: "PC",
              format: "CD",
              rating: 10,
              original_price: 79.99,
              offer_price: 60.99,
              expiration_date: "2024-03-28",
              promo_code: "DJIODP",
              offer_link:
                "https://store.steampowered.com/app/397540/Borderlands_3/",
              scheduled_date: "",
              sheduled_time: "",
              game_tags: ["singleplayer", "action", "adventure"],
            },
            {
              id: 3,
              user_id: 1,
              date_of_creation: "",
              game_title: "Overwatch 2",
              image_url:
                "https://xxboxnews.blob.core.windows.net/prod/sites/2/2022/10/OW2-be9287b234afbe7898ac.jpg",
              item_type: "In-Game Purchase",
              platform: "PS4",
              format: "Digital",
              rating: 10,
              original_price: 15,
              offer_price: 9.99,
              expiration_date: "2024-03-26",
              promo_code: "DFJISOP",
              offer_link:
                "https://store.steampowered.com/app/397540/Borderlands_3/",
              scheduled_date: "",
              sheduled_time: "",
              game_tags: ["multiplayer", "action", "shooter"],
            },
            {
              id: 4,
              user_id: 1,
              date_of_creation: "",
              game_title: "Pokemon Violet",
              image_url:
                "https://assets-prd.ignimgs.com/2022/08/03/pokemon-violet-1659542326365.jpg",
              item_type: "Game",
              platform: "Nintendo",
              format: "CD",
              rating: 10,
              original_price: 65,
              offer_price: 49,
              expiration_date: "2024-03-29",
              promo_code: "DFJSIF",
              offer_link:
                "https://store.steampowered.com/app/397540/Borderlands_3/",
              scheduled_date: "",
              sheduled_time: "",
              game_tags: ["singleplayer", "adventure", "open-world"],
            },
          ],
        },
      ],
      tags: [],
      searchResults: [],
    },
    actions: {
      //--------------------------LOGIN/LOGOUT/SIGNUP ACTIONS----------------------//
      signup: (email, password, username) => {
        console.log("from signupq", email, password, username)
        fetch(process.env.BACKEND_URL + "/api/signup", {
          method: "POST",
          body: JSON.stringify({ email, password, username }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw Error(`Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            console.log("User registered successfully!");
          })
          .catch((error) => console.error("Error:", error));
      },

      login: (email, password) => {
        fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(`Status: ${response.status}`);
          }
          return response.json();
        })
          .then((data) => {
            if (data.error) alert(data.error);
            else {
              console.log(data.token)
              localStorage.setItem("token", data.token);
              setStore({ token: data.token, loggedIn: true });
              getActions().verifyIdentity();
              console.log("Logged in successfully!");
            }
          })
          .catch((error) => {
            alert(error);
            setStore({ loggedIn: false });
            console.log("Error with login:", error);
          });
      },

      forgotPassword: (email) => {
        console.log("Password recovery email sent successfully!");
      },

      logout: () => {
        setStore({ loggedIn: false });
        setStore({ token: null });
        localStorage.removeItem("token");
        console.log("Logged out successfully!");
      },

      verifyIdentity: () => {
        let token = localStorage.getItem("token");
        if (token) {
          fetch(process.env.BACKEND_URL + "/api/verify_identity", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data && data.user) {
                setStore({
                  
                  user: data.user,
                  token: token
                });
              }
            });
        }
      },
      //------------------------USER DETAILS ACTIONS--------------------//
      updateItem: (newItem, itemType) => {
        setStore((prevStore) => ({
          user: { ...prevStore.user, [itemType]: newItem },
        }));
        console.log(`${itemType} updated successfully!`);
      },

      updatePassword: (newPassword) => {
        setStore((prevStore) => ({
          user: { ...prevStore.user, password: newPassword },
        }));
        console.log("Password updated successfully!");
      },

      //--------------------------INTERSTS ACTIONS----------------------//
      addInterest: (newInterest) => {
        setStore((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            interests: [...prevState.user.interests, newInterest],
          },
        }));
        console.log("New interest added successfully!");
      },

      deleteInterest: (index) => {
        setStore((prevStore) => ({
          user: {
            ...prevStore.user,
            interests: prevStore.user.interests.filter((_, i) => i !== index),
          },
        }));
        console.log("Interest deleted successfully!");
      },

      //--------------------------POSTS ACTIONS----------------------//

      postDeal: (deal) => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/deal", {
          method: "POST",
          body: JSON.stringify({ 
            
            "game_title": "",
            "format": "",
            "platform" : "",
            "original_price" : "",
            "offer_price": "",
            "type": "",
            "offer_link": "",
            "expiration_date": null,
            "promo_code": "",
            "scheduled": false,
            "scheduled_date": null,
            "scheduled_time": null,
            "image_url": "",
            "rating": "",
            "game_tags": "",
            ...deal
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(`Status: ${response.status}`);
          }
          return response.json();
        })
          .then(() => {
            setStore((prevStore) => ({
              user: {
                ...prevStore.user,
                posts: [...prevStore.user.posts, deal],
              },
            }));
            console.log(deal);
            console.log("Deal posted successfully!");
            console.log(store.user);
          })
          .catch((error) => {
            alert(error);
            console.log(deal);
            console.log("Error posting:", error);
          });
      },

      modifyPost: (
        imageUrl,
        offerPrice,
        expirationDate,
        promoCode,
        scheduledDate,
        scheduledTime,
        scheduled
      ) => {
        setStore((prevStore) => ({
          user: {
            ...prevStore.user,
            posts: prevStore.user.posts.map((post, i) => {
              if (i === 0) {
                return {
                  ...post,
                  image_url: imageUrl,
                  offer_price: offerPrice,
                  expiration_date: expirationDate,
                  promo_code: promoCode,
                  scheduled_date: scheduledDate,
                  scheduled_time: scheduledTime,
                  scheduled: scheduled,
                };
              }
              return post;
            }),
          },
        }));
        console.log("Deal has been modified successfully!");
      },

      //--------------------------SEARCHES----------------------//
      searchInNavbar: (searchTerm) => {
        const store = getStore();
        const results = store.deals.filter((item) =>
          item.game_tags.find((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        if (results.length === 0) {
          alert("No results found!");
        } else {
          setStore({ searchResults: results });
          console.log("Search results updated successfully!");
          console.log(results);
        }
      },
      //--------------------------GET ITEMS----------------------//
      openItem: (id, setDetails, itemType) => {
        const store = getStore();
        const item = store[itemType + "s"].filter((item) => item.id == id);
        if (!item) {
          console.log(`${itemType} not found!`);
          return;
        }
        console.log(item);
        setDetails(item);
        console.log(`${itemType} found successfully!`);
      },
      //-GAMES-
      loadGames: () => {
        fetch(
          "https://api.rawg.io/api/games?key=d84269170ddc4af0b9a74f60a2fc7b91"
        )
          .then((response) => {
            if (!response.ok) {
              throw Error("Failed to get games");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.results);
            setStore({ games: data.results });
            console.log("Games loaded successfully!");
          });
      },

      loadGamesWithDetails: () => {
        const store = getStore();
        const actions = getActions();
        Promise.all(
          store.games.map((game, index) =>
            fetch(
              `https://api.rawg.io/api/games/${game.id}?key=d84269170ddc4af0b9a74f60a2fc7b91`
            )
              .then((response) => {
                if (!response.ok) {
                  throw Error(`Failed to get details for game ${game.id}`);
                }
                return response.json();
              })
              .then((gameDetails) => {
                return {
                  id: index + 1,
                  rawg_id: gameDetails.id,
                  name: gameDetails.name,
                  description: gameDetails.description,
                  released: gameDetails.released,
                  tba: gameDetails.tba,
                  website: gameDetails.website,
                  background_image: gameDetails.background_image,
                  background_image_additional:
                    gameDetails.background_image_additional,
                  platforms: gameDetails.platforms.map(
                    (platform) => platform.platform.name
                  ),
                  game_tags: gameDetails.tags.map((tag) => tag.name),
                };
              })
          )
        )
          .then((gamesWithDetails) => {
            console.log(gamesWithDetails);
            setStore({ gamesWithDetails });
            console.log("Game details loaded successfully!");
          })
          .catch((error) => console.error("Error:", error));
      },
      loadTags: () => {
        fetch(
          "https://api.rawg.io/api/tags?key=d84269170ddc4af0b9a74f60a2fc7b91"
        )
          .then((response) => {
            if (!response.ok) {
              throw Error("Failed to get tags");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.results);
            setStore({ tags: data.results.map((tag) => tag.name) });
            console.log("Tags loaded successfully!");
          });
      },

      setDescription: () => {
        const store = getStore();
        console.log("Trying to set description");
        store.games.map((game) => {
          setStore((prevState) => ({
            games: prevState.games.map((g) => {
              if (g.id === game.id) {
                return {
                  ...g,
                  description: getActions().extractEnglishDescription(
                    game.description
                  ),
                };
              }
              console.log(g);
              return g;
            }),
          }));
        });
      },

      //-----------UTILITIES-----------//
      extractEnglishDescription: (description) => {
        const cleanedString = description.replace(/<[^>]*>/g, "");
        const array = cleanedString.split("Español");
        console.log(array);
        return array[0];
      },

      validateEmail: (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      validatePassword: (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        return passwordRegex.test(password);
      },
    },
  };
};

export default getState;
