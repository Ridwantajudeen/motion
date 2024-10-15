import React, { useState } from 'react';
import { auth, firestore, storage } from './firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function RestaurantDashboard() {
  const [formData, setFormData] = useState({
    foodName: '',
    price: '',
    description: '',
    image: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleAddFood = async () => {
    if (!formData.foodName || !formData.price || !formData.description || !formData.image) {
      setError('Please fill in all fields and upload an image.');
      return;
    }

    try {
      const restaurantRef = doc(firestore, 'restaurants', auth.currentUser.uid);

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `menuImages/${auth.currentUser.uid}/${formData.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Image upload failed.');
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Add new food item to restaurant's menu in Firestore
          await updateDoc(restaurantRef, {
            menu: arrayUnion({
              name: formData.foodName,
              price: parseFloat(formData.price),
              description: formData.description,
              imageUrl,
            })
          });

          // Reset form
          setFormData({
            foodName: '',
            price: '',
            description: '',
            image: null,
          });
          setUploadProgress(0);
        }
      );
    } catch (error) {
      setError('Failed to add food item. Please try again.');
    }
  };

  return (
    <div>
      <h2>Restaurant Dashboard</h2>
      <form>
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleAddFood}>Add Food Item</button>
      </form>
      {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default RestaurantDashboard;
