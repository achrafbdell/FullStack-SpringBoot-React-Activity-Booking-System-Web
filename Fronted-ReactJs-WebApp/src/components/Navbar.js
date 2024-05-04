import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import logoImage from "../images/lettering-lettering-time-to-travel-with-map-and-suitcase-text.webp";
import defaultAvatar from "../images/img_register.webp";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/4`);
        setUser(response.data);
        setEditedUser({ ...response.data });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="bg-gray-900	">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* ------------ Parite Gauche du Navbar --------------*/}
          {/* Logo*/}
          <div className="flex flex-shrink-0 items-center">
            <a href="/home">
              <img className="h-12 w-auto" src={logoImage} alt="" />
            </a>
            {/* Categories */}
            <div className="flex items-center space-x-4">
              <a
                href="/home"
                className="text-white px-3 py-3 ml-10 font-semibold hover:text-blue-400 hover:border-blue-400 border-b-2 border-transparent text-sm"
              >
                Activités
              </a>
            </div>
          </div>

          {/* Partie Droite du Navbar */}
          <div className="flex items-center">
          <Link
                  to="/register"
                  className="text-white px-4 py-2 rounded-xl border-2 border-blue-700 bg-blue-700 hover:bg-transparent hover:border-blue-600 hover:border-2 mr-4 text-sm"
                >
                  S'inscrire
                </Link>
                <Link
                  to="/login"
                  className="text-white px-4 py-2 rounded-xl border-2 border-blue-600 hover:bg-blue-600 hover:border-blue-600 mr-8 text-sm"
                >
                  Se Connecter
                </Link>
                
            {/* Si l'utilisateur est connecté */}
            {user && (
              <>
    

                <div className="relative">
                  {/* Avatar */}
                  {user.userAvatar ? (
                    <Link to="/profile">
                      <img
                        src={`data:image/jpeg;base64, ${user.userAvatar}`}
                        alt="Avatar"
                        className="h-11 w-11 rounded-full cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <img
                      src={defaultAvatar}
                      alt="Default Avatar"
                      className="h-16 w-16 rounded-full cursor-pointer"
                    />
                  )}

                  {/* Menu déroulant du profil */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden">
                    <span className="block px-4 py-2 text-gray-800">
                      Profile: {user.username}
                    </span>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-purple-500 hover:text-white w-full text-left">
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;