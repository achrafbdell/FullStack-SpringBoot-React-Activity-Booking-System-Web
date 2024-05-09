import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
    city: '',
    duration_time: '',
    price: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/activities');
      setActivities(response.data);
    } catch (error) {
      setError('Error fetching activities');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/${id}`);
      fetchActivities();
    } catch (error) {
      setError('Error deleting activity');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataForSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataForSubmit.append(key, formData[key]);
      });
      await axios.post('http://localhost:8080/add/activity', formDataForSubmit);
      fetchActivities();
      setShowAddForm(false);
    } catch (error) {
      setError('Erreur de creation');
    } finally {
      setLoading(false);
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleEdit = (activity) => {
    setFormData({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      date: activity.date,
      city: activity.city,
      duration_time: activity.duration_time,
      price: activity.price,
    });
    setShowEditForm(true); // Afficher le formulaire de modification
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8080/${formData.id}`, formData);
      console.log(response.data); // Afficher le message de succès ou de l'échec de la mise à jour
      fetchActivities(); // Mettre à jour la liste des activités après la modification
      setShowEditForm(false); // Cacher le formulaire de modification après la soumission
    } catch (error) {
      setError('Erreur de modification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <button
        onClick={handleShowAddForm}
        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-5"
      >
        Ajouter une activité
      </button>
      {showAddForm && (
        <div className="mb-5">
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre" className="block mb-2" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="block mb-2" required></textarea>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="block mb-2" required />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ville" className="block mb-2" required />
            <input type="number" name="duration_time" value={formData.duration_time} onChange={handleChange} placeholder="Durée" className="block mb-2" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Prix" className="block mb-2" required />
            <input type="file" name="image" onChange={handleFileChange} className="block mb-2" required />
            <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Ajouter</button>
            <button type="button" onClick={handleCloseAddForm} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Annuler</button>
          </form>
        </div>
      )}
      {showEditForm && (
        <div className="mb-5">
          <form onSubmit={handleEditSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre" className="block mb-2" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="block mb-2" required></textarea>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="block mb-2" required />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ville" className="block mb-2" required />
            <input type="number" name="duration_time" value={formData.duration_time} onChange={handleChange} placeholder="Durée" className="block mb-2" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Prix" className="block mb-2" required />
            <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Modifier</button>
            <button type="button" onClick={() => setShowEditForm(false)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Annuler</button>
          </form>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-40 text-xs text-center'>{error}</p>}
      <h1 className="text-2xl font-bold mb-5 mt-16">Liste des activités</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Id</th>
            <th className="border border-gray-300 px-4 py-2">Titre</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Ville</th>
            <th className="border border-gray-300 px-4 py-2">Durée</th>
            <th className="border border-gray-300 px-4 py-2">Prix</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td className="border border-gray-300 px-4 py-2">{activity.id}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.title}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.description}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.date}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.city}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.duration_time}</td>
              <td className="border border-gray-300 px-4 py-2">{activity.price}</td>
              <td className="border border-gray-300 px-4 py-2 ">
                <button onClick={() => handleEdit(activity)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Modifier</button>
                <button onClick={() => handleDelete(activity.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityList;
