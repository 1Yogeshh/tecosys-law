import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [editing, setEditing] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchProfile();
    return () => {
      setError('');
      setSuccess('');
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://law-api.tecosys.ai/api/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName(response.data.name);
      setEmail(response.data.email);
      setNewEmail(response.data.email); // Initialize newEmail with current email
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile');
    }
  };

  const handleUpdateProfile = async () => {
    if (name === '') {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      const response = await axios.put(
        'https://law-api.tecosys.ai/api/user/',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setEditing(false);
      setSuccess('Profile updated successfully!');
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Error updating profile');
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  };

  const handleSendOtp = async () => {
    if (!newEmail) {
      toast.error('New email cannot be empty');
      return;
    }

    try {
      const response = await axios.put(
        'https://law-api.tecosys.ai/api/user/',
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(error.response?.data?.message || 'Error sending OTP');
      toast.error(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('OTP cannot be empty');
      return;
    }

    setIsVerifying(true); // Set loading state

    try {
      const response = await axios.post(
        'https://law-api.tecosys.ai/api/change-email/',
        { otp, email:newEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

        setEditing(false);
        setOtp(''); // Clear OTP input
        setSuccess('Email updated successfully!');
        toast.success('Email updated successfully!');
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error verifying OTP';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false); // Reset loading state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (editing && newEmail !== email) {
      if (!isOtpSent) {
        handleSendOtp(); // Send OTP if it's not sent yet
      } else {
        handleVerifyOtp(); // Verify OTP if it's already sent
      }
    } else {
      handleUpdateProfile(); // Update name only
    }
  };

  return (
    <div className="profile-container">
      <h2 className="font-bold text-lg mb-4">Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editing}
            className="border p-2 rounded w-full"
          />
          {editing && name !== '' && (
            <button
              type="submit"
              className="bg-indigo-500 w-full text-white px-4 py-2 rounded mt-2"
            >
              Save
            </button>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            value={editing ? newEmail : email}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={!editing}
            className="border p-2 rounded w-full"
          />
          {editing && newEmail !== email && !isOtpSent && (
            <button
              type="submit"
              className="bg-indigo-500 text-white w-full px-4 py-2 rounded mt-4"
            >
              Send OTP
            </button>
          )}
        </div>

        {editing && isOtpSent && (
          <div className="mb-4">
            <label className="block font-medium mb-1">Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              disabled={isVerifying}
              className={`bg-indigo-500 text-white w-full px-4 py-2 rounded mt-2 ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        {!editing ? (
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              setNewEmail(email); // Pre-fill with current email
              setIsOtpSent(false); // Reset OTP sent state
            }}
            className="bg-indigo-500 w-full text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setIsOtpSent(false);
              setNewEmail(email); // Reset newEmail to current email
              setOtp(''); // Reset OTP input
            }}
            className=" bg-gray-300 w-full px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Profile;
