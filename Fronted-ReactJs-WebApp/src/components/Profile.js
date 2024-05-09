import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";


function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    // Function to fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/1`);
        setUser(response.data);
        setEditedUser({ ...response.data })
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const errors = {
      firstName: !editedUser.firstName,
      lastName: !editedUser.lastName,
      username: !editedUser.username,
      email: !editedUser.email,
      password: !editedUser.password,
    };
    setValidationErrors(errors);
  
    // Check if any required fields are empty
    if (Object.values(errors).some((error) => error)) {
      return; // Prevent saving if any field is empty
    }
    try {
      await axios.put(`http://localhost:8080/user/${user.id}`, editedUser);
      setUser({ ...editedUser });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#ffffff"}}>
      <MDBContainer>
        <MDBRow className="justify-content-start align-items-center">
          <MDBCol>
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{
                  backgroundImage: `url('data:image/jpeg;base64, ${
                    user ? user.userCover : ""
                  }')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "700px",
                  marginLeft: "-7%",
                  marginRight: "-7%",
                }}
              ></div>

              <div
                className="p-4 text-black"
                style={{
                  backgroundColor: "#F0F3F4",
                  marginTop: "-10%",
                  borderRadius: "10px",
                  marginLeft: "5%",
                  marginRight: "5%",
                }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div
                    className="rounded-img-container"
                    style={{
                      width: "150px",
                      height: "150px",
                      marginLeft: "44%",
                      marginTop: "-60px",
                    }}
                  >
                    <img
                      src={`data:image/jpeg;base64, ${
                        user ? user.userAvatar : ""
                      }`}
                      alt="Generic placeholder image"
                    />
                  </div>

                  <div>
                    <MDBCardText
                      className="mb-2 mt-7 text-4xl font-semibold leading-normal"
                      style={{ color: "#263238" }}
                    >
                      {user ? capitalizeFirstLetter(editedUser.firstName) : ""}{" "}
                      {user ? capitalizeFirstLetter(editedUser.lastName) : ""}
                    </MDBCardText>
                    {user && user.username && (
                      <MDBCardText className="text-xl font-semibold custom-username pb-16">
                        @ <u>{editedUser.username}</u>
                      </MDBCardText>
                    )}
                  </div>




                  {editMode ? (
                    <>
                      <hr className="mb-16" />
                      <h2 className="text-2xl font-semibold mb-12" style={{marginLeft:'-64%'}}>Éditez vos informations 😊 :</h2>

                      <div className="my-4 text-center">
                        {" "}
                        {/* Champs Prenom */}
                        <label htmlFor="editedFirstName" style={{marginLeft:"-14%"}} className="font-medium leading-6 text-gray-900">Prénom </label>
                        <input
                          className="custom-inputs form-input mt-2 py-1 px-1 pl-2 block w-60 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          type="text"
                          id="editedFirstName"
                          value={editedUser ? editedUser.firstName : ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {validationErrors.firstName && (
                          <span
                            className="block bg-red-100 border border-red-400 text-red-700 py-1 px-1 rounded-md mt-2 sm:text-sm"
                            style={{ marginLeft: "40%", marginRight: "430px" }}
                          >
                            Champ vide !
                          </span>
                        )}
                      </div>

                      <div className="my-4 text-center">
                        {" "}
                        {/* Champ Nom */}
                        <label htmlFor="editedLastName" style={{marginLeft:"-16%"}} className="font-medium leading-6 text-gray-900">Nom </label>
                        <input
                          className="custom-inputs form-input mt-2 py-1 px-1 pl-2 block w-60 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          type="text"
                          id="editedLastName"
                          value={editedUser ? editedUser.lastName : ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {validationErrors.lastName && (
                          <span
                            className="block bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded-md mt-2 sm:text-sm"
                            style={{ marginLeft: "40%", marginRight: "430px" }}
                          >
                            Champ vide !
                          </span>
                        )}
                      </div>

                      <div className="my-4 text-center">
                        {" "}
                        {/* Ajoutez la classe text-center ici */}
                        <label htmlFor="editedUsername" style={{marginLeft:"-12%"}} className="font-medium leading-6 text-gray-900">Username </label>
                        <input
                          className="custom-inputs form-input mt-2 w-60 py-1 px-1 pl-2 block rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          type="text"
                          id="editedUsername"
                          value={editedUser ? editedUser.username : ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              username: e.target.value,
                            })
                          }
                        />
                        {validationErrors.username && (
                          <span
                            className="block bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded-md mt-2 sm:text-sm"
                            style={{ marginLeft: "40%", marginRight: "430px" }}
                          >
                            Champ vide !
                          </span>
                        )}
                      </div>

                      <div className="my-4 text-center">
                        {" "}
                        {/* Ajoutez la classe text-center ici */}
                        <label htmlFor="editedEmail" style={{marginLeft:"-15%"}} className="font-medium leading-6 text-gray-900">Email </label>
                        <input
                          className="form-input custom-inputs mt-2 block w-60 py-1 px-1 pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          type="email"
                          id="editedEmail"
                          value={editedUser ? editedUser.email : ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              email: e.target.value,
                            })
                          }
                        />
                        {validationErrors.email && (
                          <span
                            className="block bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded-md mt-2 sm:text-sm"
                            style={{ marginLeft: "40%", marginRight: "430px" }}
                          >
                            Champ vide !
                          </span>
                        )}
                      </div>

                      <div className="my-4 text-center mb-10">
                        {" "}
                        {/* Ajoutez la classe text-center ici */}
                        <label htmlFor="editedPassword" style={{marginLeft:"-4%"}} className="font-medium leading-6 text-gray-900">Nouveau mot de passe </label>
                        <input
                          className="text-gray-900 form-input custom-inputs mt-2 block w-60 py-1 px-1 pl-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          type="password"
                          id="editedPassword"
                          value={editedUser ? editedUser.password : ""}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              password: e.target.value,
                            })
                          }
                        />
                        {validationErrors.password && (
                          <span
                            className="block bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded-md mt-2 sm:text-sm"
                            style={{ marginLeft: "40%", marginRight: "430px" }}
                          >
                            Champ vide !
                          </span>
                        )}
                      </div>

                        {/*}
                      <div className="flex" style={{ marginLeft: "40%" }}>
                        <img
                          src={`data:image/jpeg;base64, ${editedUser.userAvatar}`}
                          alt="Avatar"
                          className="h-16 w-16 rounded-full border border-gray-300"
                        />
                        <input type="file" accept="image/*" />
                      </div>
                      {*/}

                      <div className="my-4">
                        <button
                          type="submit"
                          onClick={handleSave}
                          color="primary"
                          className="px-4 py-2 rounded-xl border-2 border-blue-700 bg-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:border-2 text-sm text-white"
                          style={{ marginRight: "10px" }}
                        >
                          Enregistrer
                        </button>
                        <button
                        type='submit'
                          onClick={() => setEditMode(false)}
                          color="danger"
                          className="px-4 py-2 rounded-xl border-2 border-blue-700 bg-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:border-2 text-sm text-white"
                        >
                          Annuler
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                    type="submit"
                      onClick={handleEdit}
                      color="info"
                      className="px-4 py-2 mb-8 rounded-xl border-2 border-blue-700 bg-blue-700 hover:bg-blue-600 hover:border-blue-600 hover:border-2 text-sm text-white font-semibold"
                    >
                      Modifier mon Profil
                    </button>
                  )}
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Profile;
