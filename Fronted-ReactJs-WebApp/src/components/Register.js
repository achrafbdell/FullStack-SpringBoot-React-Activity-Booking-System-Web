import React, { useState } from "react";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    user_avatar: "",
    user_cover: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (formData) => {
    try {
      const response = await (axios.post("http://localhost:8080/user/register", formData));
      console.log("Response from server:", response.data)
      setSuccessMessage("Compte créé avec succès !");
    } catch (error) {
      console.error("Erreur de création utilisateur:", error);
      setErrorMessage("Informations Manquantes ou déjà utilisées ! 🫤");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleRegistration(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file,
        user_avatar: fileURL,
      }));
    }
  };

  const handleFileCoverChange = (e) => {
    const file = e.target.files[0]; 
    setFormData({
      ...formData,
      user_cover: URL.createObjectURL(file),
    });
  };

  const handleRemoveCover = () => {
    setFormData({
      ...formData,
      user_cover: null,
    });
  };

  return (
    <div className="flex">
      {/* ---------------- Section Form d'inscription -----------------*/}
      <div className="w-full flex justify-center ml-10">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="space-y-12">
            <div className=" mt-10">
              {/* Titre de creation du compte */}
              <div className="flex justify-center items-center h-full mt-10">
                <h1 className="custom-titre-creer text-4xl font-serif font-semibold mr-10 animate__animated animate__fadeInUp">
                  Créer votre profile
                </h1>
              </div>

              {successMessage && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5 mr-10"
                  role="alert"
                >
                  <strong className="font-bold">Succès : </strong>
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}

              {errorMessage && !successMessage && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5 mr-10"
                  role="alert"
                >
                  <strong className="font-bold">Erreur : </strong>
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Champ pour le prenom */}
                <div className="sm:col-span-9 mr-5">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Prénom
                  </label>
                  <div className="mt-2 mr-5">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="family-name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                        placeholder="Votre Prénom"
                      />
                    </div>
                  </div>
                </div>

                {/* Champ pour le Nom */}
                <div className="sm:col-span-9 mr-5">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nom
                  </label>
                  <div className="mt-2 mr-5">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                        placeholder="Votre Nom"
                      />
                    </div>
                  </div>
                </div>

                {/* Champ pour le nom d'utilisateur */}
                <div className="sm:col-span-9 mr-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nom d'Utilisateur
                  </label>
                  <div className="mt-2 mr-5">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                        placeholder="Pseudo"
                      />
                    </div>
                  </div>
                </div>

                {/* Champ pour l'email */}
                <div className="sm:col-span-9 mr-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2 mr-5">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                        placeholder="Votre_Nom@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Champ pour le Mot de passe */}
                <div className="sm:col-span-9 mr-5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mot de passe
                  </label>
                  <div className="mt-2 mr-5">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
                        placeholder="Mot de passe"
                      />
                    </div>
                  </div>
                </div>

                {/* Champ pour le user avatar */}
                <div className="col-span-full">
                  <label
                    htmlFor="user_avatar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User Avatar
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <img
                      src={
                        formData.user_avatar ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Avatar"
                      className="h-16 w-16 rounded-full border border-gray-300"
                    />
                    <input
                      type="file"
                      id="user_avatar"
                      name="user_avatar"
                      onChange={(e) => handleFileChange(e, "user_avatar")}
                      className="hidden"
                    />
                    <label
                      htmlFor="user_avatar"
                      className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-10"
                    >
                      Modifier
                    </label>
                  </div>
                </div>

                {/* Champ pour la photo de couverture */}
                <div className="col-span-full">
                  <label
                    htmlFor="user_cover"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Couverture
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                    {/* Affichage de l'image sélectionnée */}
                    {formData.user_cover && (
                      <div className="w-full h-40 relative">
                        <img
                          src={formData.user_cover}
                          alt="Cover"
                          className="rounded-lg w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveCover}
                          className="absolute bottom-2 right-2 bg-white rounded-full p-1"
                        >
                          <img
                            src="https://www.svgrepo.com/show/533010/trash-alt.svg"
                            alt="Supprimer"
                            className="h-5 w-5"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-center justify-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 items-center">
                      <label
                        htmlFor="user_cover"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:border-blue-700 hover:border-1 pl-2 pr-2 ml-24"
                      >
                        <span>Ajoutez votre Cover</span>
                        <input
                          id="user_cover"
                          name="user_cover"
                          type="file"
                          onChange={handleFileCoverChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">ou déposez ici</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      Fichier PNG, JPG, GIF supérieur à 10MB
                    </p>
                  </div>
                </div>

                {/* Bouton d'inscription */}
                <div className="sm:col-span-6 ">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    S'inscrire
                  </button>
                  <p className="mt-5 text-center text-sm text-gray-500 ">
                    Vous êtes déja Membre?
                    <a
                      href="/login"
                      className="font-semibold leading-6 text-blue-700 hover:text-blue-600"
                    >
                      {" "}
                      Connectez-vous maintenant
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* ------------------ Section d'Image ------------------*/}
        <div className="w-full flex justify-center relative">
          <img
            src="https://cdn.pixabay.com/photo/2023/01/08/16/29/sea-7705679_1280.jpg"
            alt="OK"
            className="h-full w-full object-cover"
            style={{ height: "1200px" }}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col">
            <h1 className="custom-titre-accroche text-4xl font-serif font-semibold leading-8 text-white text-center pt-5 pb-5">
              Vos rêves deviennent des expériences !
            </h1>
            <p className="mt-2 text-sm leading-6 text-white text-center">
              Créer votre profil et rejoignez la communauté
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
