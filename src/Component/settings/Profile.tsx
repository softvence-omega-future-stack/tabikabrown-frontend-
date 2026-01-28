/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import {  Shield, Camera, CircleUserRound } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '(555) 123-4567',
    address: '123 Medical Plaza, Suite 200'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', formData);
    // Add your save logic here
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Reset form or navigate back
  };


    const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  );

  // Open file picker
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Handle image upload
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };


  return (
    <div className="w-full min-h-screen ">
      <div className=" space-y-5">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-400 p-2 md:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Profile Image */}
            <div className="relative shrink-0">
              <img
                src={image}
                alt="Profile"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div   onClick={handleCameraClick} className="absolute bottom-0 right-0 w-6 h-6 bg-activeBtnColor rounded-full flex items-center justify-center">
                <Camera size={14} className="text-white cursor-pointer" /> 
              </div>
                   <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-[120%]">System Administrator</h1>
              <p className="text-sm md:text-base text-[#2F80ED] font-normal leading-6 mt-1">super_admin</p>
              <p className="text-sm text-[#4A5565] font-normal leading-5 mt-1">admin@mail-app.com</p>
            </div>
          </div>
        </div>

        {/* Tabs and Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 md:p-6">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-activeBtnColor text-white shadow-lg shadow-purple-200 cursor-pointer'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <CircleUserRound size={24} />
              <span className='text-sm md:text-base font-medium leading-6'>Profile Information</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#8B78F6] text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Shield size={18} />
              <span className='text-sm md:text-base font-medium leading-6'>Security information</span>
            </button>
          </div>

          {/* Profile Information Tab Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-medium leading-[130%] mb-6">Personal Information</h2>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Medical Plaza, Suite 200"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSaveChanges}
                  className="px-8 py-3 bg-activeBtnColor text-white font-medium rounded-lg hover:bg-[#7C6AE5] transition-all duration-200 shadow-lg cursor-pointer shadow-purple-200"
                >
                  Save changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Security Information Tab Content */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-6 mb-6">Security Settings</h2>
              
              <div className=" gap-6">
                
                {/* Current Password */}
                <div className="mb-4">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4 mb-3">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4 mb-3">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm md:text-base font-medium text-[#364153] leading-4 mb-3">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSaveChanges}
                  className="px-8 py-3 bg-activeBtnColor text-white font-medium rounded-lg hover:bg-[#7C6AE5] transition-all cursor-pointer duration-200 shadow-lg shadow-purple-200"
                >
                  Update Password
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;