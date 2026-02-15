/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useMemo } from 'react';
import { Shield, Camera, CircleUserRound } from 'lucide-react';
import { useGetAdminProfileQuery, useUpdateAdminProfileMutation } from '../../redux/features/admin/profileApi';
import { useAppSelector } from '../../redux/hook';
import { toast } from 'react-toastify';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  
  // 🟢 ADD: Check token
  const token = useAppSelector((state) => state.auth.token);
  
  // API hooks
  const { data: profile, isLoading, error } = useGetAdminProfileQuery(undefined, {
    skip: !token,  // Skip if no token
  });
  
  const [updateProfile, { isLoading: isUpdating }] = useUpdateAdminProfileMutation();

  // Local state
  const [profileEdits, setProfileEdits] = useState<{
    full_name?: string;
    email?: string;
    phone?: string;
    address?: string;
  }>({});

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize image preview
  // useEffect(() => {
  //   if (profile?.image_url) {
  //     setImagePreview(profile.image_url);
  //   }
  // }, [profile]);

  // Merge backend data with local edits
  const currentProfileData = useMemo(() => {
    if (!profile) return null;
    return {
      full_name: profileEdits.full_name ?? profile.full_name,
      email: profileEdits.email ?? profile.email,
      phone: profileEdits.phone ?? profile.phone,
      address: profileEdits.address ?? profile.address,
    };
  }, [profile, profileEdits]);

  const hasChanges = useMemo(() => {
    return Object.keys(profileEdits).length > 0 || imageFile !== null;
  }, [profileEdits, imageFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileEdits(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };



  // Handle save changes
// ProfilePage.tsx - Update handleSaveChanges

const handleSaveChanges = async () => {
  try {
    console.log('=== Saving Profile ===');
    console.log('Profile edits:', profileEdits);
    console.log('Has image file:', !!imageFile);
    
    const updateData: any = {};
    
    // 🟢 Only include fields that were actually edited
    if (profileEdits.full_name !== undefined) {
      updateData.full_name = profileEdits.full_name;
    }
    if (profileEdits.email !== undefined) {
      updateData.email = profileEdits.email;
    }
    if (profileEdits.phone !== undefined) {
      updateData.phone = profileEdits.phone;
    }
    if (profileEdits.address !== undefined) {
      updateData.address = profileEdits.address;
    }

    // 🟢 Add image as base64 STRING (without data URI prefix)
    if (imageFile) {
      console.log('Converting image to base64...');
      const base64Full = await convertToBase64(imageFile);
      
      // Remove "data:image/jpeg;base64," prefix
      const base64String = base64Full.split(',')[1];
      
      updateData.image = base64String;  // ← Just the base64 string
      
      console.log('Image added as base64 string, length:', base64String.length);
    }

    console.log('Final update data:', {
      ...updateData,
      image: updateData.image ? `${updateData.image.substring(0, 50)}...` : undefined
    });

    console.log('Sending update request...');
    const response = await updateProfile(updateData).unwrap();
    console.log('✅ Update successful:', response);
    
    // Clear edits after successful save
    setProfileEdits({});
    setImageFile(null);
    
    toast.success('Profile updated successfully!');
    
  } catch (error: any) {
    console.error('❌ Profile update failed:', error);
    console.error('Error data:', error?.data);
    
    // Show specific error message
    const errorMessage = 
      error?.data?.image?.[0] ||      // Image specific error
      error?.data?.detail || 
      error?.data?.message ||
      error?.data?.email?.[0] ||
      error?.data?.phone?.[0] ||
      'Failed to update profile';
    
    toast.error(errorMessage);
  }
};

// Keep convertToBase64 function as is
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

  const handleCancel = () => {
    setProfileEdits({});
    setImageFile(null);
    if (profile?.image_url) {
      setImagePreview(profile.image_url);
    }
  };

  // 🟢 ADD: Show message if no token
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your profile</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="space-y-5">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-400 p-2 md:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              Failed to load profile. Please try again.
            </div>
          ) : profile ? (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Profile Image */}
              <div className="relative shrink-0">
                <img
                  src={imagePreview || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'}
                  alt="Profile"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div 
                  onClick={handleCameraClick} 
                  className="absolute bottom-0 right-0 w-6 h-6 bg-activeBtnColor rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors"
                >
                  <Camera size={14} className="text-white" /> 
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
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-[120%]">
                  {profile.full_name || 'System Administrator'}
                </h1>
                <p className="text-sm md:text-base text-[#2F80ED] font-normal leading-6 mt-1">super_admin</p>
                <p className="text-sm text-[#4A5565] font-normal leading-5 mt-1">{profile.email}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Tabs and Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 md:p-6">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-activeBtnColor text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
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

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              Failed to load profile data.
            </div>
          ) : !profile || !currentProfileData ? (
            <div className="text-center py-12 text-gray-600">
              No profile data available.
            </div>
          ) : (
            <>
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl md:text-2xl font-medium leading-[130%] mb-6">Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                      <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={currentProfileData.full_name || ''}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={currentProfileData.email || ''}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={currentProfileData.phone || ''}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm md:text-base font-medium text-[#364153] leading-4">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={currentProfileData.address || ''}
                        onChange={handleInputChange}
                        placeholder="123 Medical Plaza"
                        className="w-full px-4 py-3 text-[#717182] text-sm md:text-base font-normal bg-blue-50 border border-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B78F6] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {hasChanges && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        ⚠️ You have unsaved changes. Click "Save changes" to update.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={handleSaveChanges}
                      disabled={!hasChanges || isUpdating}
                      className={`px-8 py-3 font-medium rounded-lg transition-all duration-200 ${
                        hasChanges && !isUpdating
                          ? 'bg-activeBtnColor text-white hover:bg-[#7C6AE5] shadow-lg shadow-purple-200 cursor-pointer'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isUpdating ? 'Saving...' : 'Save changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isUpdating}
                      className="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab - Keep as is */}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;