import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyContext = createContext({
  user: null,
  userId: null,  // New property for user ID
  token: null,
  loggedIn: false,
  role: "",
  firstName: "",
  selectedHotel: null,
  changeFirstName: (fn) => {},
  setUserFunction: (userData) => {},
  setLoggedIn: (status) => {},
  setToken: (token) => {},
  setRole: (role) => {},
  setSelectedHotel: (hotelInfo) => {},
  setRoleFunction: (newRole) => {},
});

const MyContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);

          setToken(storedToken);
          setUser(parsedUser);
          setUserId(parsedUser.id);
          setRole(storedRole);

          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

          const roleResponse = await axios.get("https://localhost:7137/api/KorisnikKontroler/get-role");

          setRole(roleResponse.data.userRole);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Greška pri dohvatanju podataka iz lokalnog skladišta:", error);
      }
    };

    fetchData();
  }, []);

  const changeFirstName = (fn) => {
    setFirstName(fn);
  };

  const setUserFunction = (userData) => {
    setUser(userData);
  };

  const setLoggedInStatus = (status) => {
    setLoggedIn(status);
  };

  const setTokenFunction = (newToken) => {
    setToken(newToken);
  };

  const setRoleFunction = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const setSelectedHotelFunction = (hotelInfo) => {
    setSelectedHotel(hotelInfo);
  };

  const setUserIdFunction = (id) => {
    setUserId(id);
  };

  return (
    <MyContext.Provider
      value={{
        user,
        userId,
        token,
        loggedIn,
        role,
        firstName,
        selectedHotel,
        changeFirstName,
        setUserFunction,
        setLoggedIn: setLoggedInStatus,
        setToken: setTokenFunction,
        setRole: setRoleFunction,
        setSelectedHotel: setSelectedHotelFunction,
        setUserId: setUserIdFunction, 
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;

