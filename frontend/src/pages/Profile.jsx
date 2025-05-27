import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import NewsletterBox from '../components/NewsletterBox';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // Load saved data from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    const savedName = localStorage.getItem('name');
    const savedDescription = localStorage.getItem('description');
    const savedLocation = localStorage.getItem('location');

    if (savedImage) setProfileImage(savedImage);
    if (savedName) setName(savedName);
    if (savedDescription) setDescription(savedDescription);
    if (savedLocation) setLocation(savedLocation);
  }, []);

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setProfileImage(fileReader.result);
        localStorage.setItem('profileImage', fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Reset profile image
  const handleImageReset = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
  };

  // Handle input changes for name, description, and location
  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem('name', e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    localStorage.setItem('description', e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    localStorage.setItem('location', e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-8 bg-white ">
        <h1 className="text-3xl text-center font-semibold mb-6">
          <Title text1={'My'} text2={'Profile'} />
        </h1>

        <form>
          {/* Profile Image Upload */}
          <div className="flex items-center mb-6">
            <div className="w-36 h-36 rounded-full overflow-hidden  mr-6 bg-gray-200">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  
                />
              ) : (
                <div className="justify-center items-center w-full h-full text-gray-600 hidden">
                  No image uploaded
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-4 p-2 border border-gray-300 rounded-lg cursor-pointer"
              />
              {profileImage && (
                <button
                  type="button"
                  onClick={handleImageReset}
                  className="mt-2 px-4 py-4 text-red-500"
                >
                  Reset Image
                </button>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block text-lg font-semibold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="w-full text-gray-500 p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="text-gray-700 block text-lg font-semibold mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Tell us about yourself"
              rows="4"
              className="w-full p-2 border text-gray-500 border-gray-300 rounded-lg"
            />
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-lg text-gray-700 font-semibold mb-2">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location"
              className="w-full p-2 border text-gray-500 border-gray-300 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mb-6">
            <button
              type="button"
              className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
              onClick={() => toast('Profile saved locally!')}
            >
              Save Profile
            </button>
          </div>
        </form>
        
        {/* Newsletter Box placed below the form with padding and margin adjustments */}
        <div className="mt-8">
          <NewsletterBox />
        </div>
      </div>
    </div>
  );
};

export default Profile;
