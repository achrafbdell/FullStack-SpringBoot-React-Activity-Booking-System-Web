import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les informations de l'utilisateur depuis le backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }; 

    fetchUserData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Bienvenue sur votre profil, {user.username} !</h2>
          <p>Email: {user.email}</p>
          {/* Afficher d'autres informations de l'utilisateur au besoin */}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default Profile;
