import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import logoImage from "../images/lettering-lettering-time-to-travel-with-map-and-suitcase-text.webp";
import Cookies from "js-cookie";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData(); // Call fetchUserData function
  }, []); // Empty dependency array to ensure useEffect runs only once


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
                href="/hebergements"
                className="text-white px-3 py-3 ml-10 font-semibold hover:text-blue-400 hover:border-blue-400 border-b-2 border-transparent text-sm"
              >
                Hébergements
              </a>
              <a
                href="/activites"
                className="text-white px-3 py-3 ml-10 font-semibold hover:text-blue-400 hover:border-blue-400 border-b-2 border-transparent text-sm"
              >
                Activités
              </a>
              <a
                href="/vols"
                className="text-white px-3 py-3 ml-10 font-semibold hover:text-blue-400 hover:border-blue-400 border-b-2 border-transparent text-sm"
              >
                Vols
              </a>
            </div>
          </div>

          {/* ------------ Parite Droite du Navbar --------------*/}
          {/* Boutons de connexion/inscription/profil */}
          <div className="flex items-center">
            {/* Si utilisateur non connecté */}
            {!user && (
              <>
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
                <Link to="/login">
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    alt="Default Avatar"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                </Link>
              </>
            )}

            {/* Si l'utilisateur est connecté */}
            {user && (
              <div className="relative">
                {/* Avatar */}
                {user.image_avatar ? (
                  <img
                    src={user.image_avatar}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                ) : (
                  <img
                    src="/path/to/default_avatar.png"
                    alt="Default Avatar"
                    className="h-8 w-8 rounded-full cursor-pointer"
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
