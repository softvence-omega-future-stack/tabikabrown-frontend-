import React, { useState } from 'react';
import { Search, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import userImg from '../../../public/images/user.png'

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'Premium' | 'Free';
  expiryDate: string | null;
  behaviours: number;
  supplements: number;
  status: 'Active' | 'Inactive';
  avatar: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All User' | 'Free' | 'Premium'>('All User');
  const [currentPage, setCurrentPage] = useState(2);

  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Premium',
      expiryDate: '12/31/2025',
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Premium',
      expiryDate: '12/31/2025',
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Free',
      expiryDate: null,
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    },
    {
      id: 4,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Premium',
      expiryDate: '12/31/2025',
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    },
    {
      id: 5,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Premium',
      expiryDate: '12/31/2025',
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    },
    {
      id: 6,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Premium',
      expiryDate: '12/31/2025',
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    },
    {
      id: 7,
      name: 'John Doe',
      email: 'john.doe@example.com',
      subscription: 'Premium',
      expiryDate: '12/31/2025',
      behaviours: 0,
      supplements: 0,
      status: 'Active',
      avatar: userImg
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All User' || user.subscription === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen ">
      <div className=" bg-white rounded-2xl border border-gray-400 overflow-hidden">
        {/* Header */}
        <div className=" p-2.5 md:p-6 ">
          <h1 className="text-xl md:text-2xl font-bold text-textColor leading-[120%] mb-6">User Management</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="search review"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#8B5CF6]  focus:outline-none text-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('All User')}
                className={`px-4 py-3 rounded-lg font-medium text-sm font-inter transition-all cursor-pointer ${
                  filterType === 'All User'
                    ? 'bg-[#8B5CF6]  text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All User
              </button>
              <button
                onClick={() => setFilterType('Free')}
                className={`px-4 py-3 rounded-lg font-medium text-sm font-inter transition-all cursor-pointer ${
                  filterType === 'Free'
                    ? 'bg-[#8B5CF6]  text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setFilterType('Premium')}
                className={`px-4 py-3 rounded-lg font-medium text-sm font-inter transition-all cursor-pointer ${
                  filterType === 'Premium'
                    ? 'bg-[#8B5CF6]  text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Table - Desktop */}
          <div className=" overflow-x-auto">
            <table className="w-full border border-gray-50">
              <thead>
                <tr className="border border-[#EEF2FF] bg-[#EEF2FF] rounded-xl">
                  <th className="text-left py-4 px-4 text-base  font-medium text-black leading-6 font-inter">Profile</th>
                  <th className="text-left py-4 px-4 text-base  font-medium text-black leading-6 font-inter">Name</th>
                  <th className="text-left py-4 px-4 text-base  font-medium text-black leading-6 font-inter">Subscription</th>
                  <th className="text-left py-4 px-4 text-base  font-medium text-black leading-6 font-inter">Usage</th>
                  <th className="text-left py-4 px-4 text-base  font-medium text-black leading-6 font-inter">Status</th>
                  <th className="text-left py-4 px-4 text-base  font-medium text-black leading-6 font-inter">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className=" text-base font-normal font-inter  text-textColor leading-6 mb-1">{user.name}</span>
                        <span className="text-sm text-[#4A5565] font-arial leading-5">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className={`inline-flex w-25 items-center gap-1 text-sm font-normal leading-5.5 ${
                          user.subscription === 'Premium' ? 'text-[#CA3500] bg-[#FFEDD4] py-1 px-3 rounded-full' : 'text-blue-400 bg-blue-50 py-1 px-3 rounded-full flex items-center justify-center'
                        }`}>
                          {user.subscription === 'Premium' ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.70796 2.17745C7.73673 2.12518 7.77901 2.0816 7.83037 2.05125C7.88173 2.02089 7.9403 2.00488 7.99996 2.00488C8.05962 2.00488 8.11818 2.02089 8.16955 2.05125C8.22091 2.0816 8.26318 2.12518 8.29196 2.17745L10.26 5.91345C10.3069 5.99995 10.3724 6.075 10.4518 6.13319C10.5311 6.19138 10.6224 6.23128 10.719 6.25002C10.8156 6.26876 10.9152 6.26587 11.0106 6.24156C11.106 6.21726 11.1948 6.17214 11.2706 6.10945L14.122 3.66678C14.1767 3.62226 14.2441 3.59626 14.3146 3.59251C14.3851 3.58877 14.4549 3.60748 14.514 3.64594C14.5732 3.68441 14.6186 3.74065 14.6437 3.80657C14.6689 3.87249 14.6725 3.94469 14.654 4.01278L12.7646 10.8434C12.7261 10.9832 12.643 11.1066 12.528 11.1949C12.413 11.2832 12.2723 11.3316 12.1273 11.3328H3.87329C3.72818 11.3318 3.58736 11.2834 3.47222 11.1951C3.35707 11.1068 3.27389 10.9833 3.23529 10.8434L1.34662 4.01345C1.32812 3.94536 1.3317 3.87316 1.35685 3.80724C1.382 3.74132 1.42741 3.68508 1.48656 3.64661C1.5457 3.60814 1.61553 3.58944 1.68598 3.59318C1.75644 3.59692 1.82389 3.62293 1.87862 3.66745L4.72929 6.11011C4.80516 6.17281 4.89396 6.21793 4.98933 6.24223C5.0847 6.26654 5.18427 6.26942 5.28089 6.25069C5.37751 6.23195 5.46878 6.19205 5.54815 6.13386C5.62752 6.07567 5.69303 6.00062 5.73996 5.91411L7.70796 2.17745Z" stroke="#F54900" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.33337 14H12.6667" stroke="#F54900" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg> : <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.54737 1.54959C9.23095 1.1564 9.07274 0.959801 8.85645 0.854901C8.64017 0.75 8.39303 0.75 7.89876 0.75H6.48963C5.98381 0.75 5.7309 0.75 5.57376 0.912718C5.41663 1.07544 5.41663 1.33733 5.41663 1.86111V4.08333H7.89876C8.39303 4.08333 8.64017 4.08333 8.85645 3.97843C9.07274 3.87353 9.23095 3.67694 9.54738 3.28374L9.67272 3.12798C9.94644 2.78786 10.0833 2.61781 10.0833 2.41667C10.0833 2.21553 9.94644 2.04547 9.67272 1.70535L9.54737 1.54959Z" stroke="#0372E6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.54737 7.54959C9.23095 7.1564 9.07274 6.9598 8.85645 6.8549C8.64017 6.75 8.39303 6.75 7.89876 6.75H5.41663V10.0833H7.89876C8.39303 10.0833 8.64017 10.0833 8.85645 9.97843C9.07274 9.87353 9.23095 9.67694 9.54738 9.28374L9.67272 9.12798C9.94644 8.78786 10.0833 8.61781 10.0833 8.41667C10.0833 8.21553 9.94644 8.04547 9.67272 7.70535L9.54737 7.54959Z" stroke="#0372E6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.28592 4.88357C1.60234 4.49038 1.76055 4.29379 1.97684 4.18889C2.19313 4.08398 2.44026 4.08398 2.93453 4.08398H5.41667V7.41732H2.93453C2.44026 7.41732 2.19313 7.41732 1.97684 7.31242C1.76055 7.20752 1.60234 7.01092 1.28592 6.61773L1.16057 6.46197C0.886856 6.12185 0.75 5.95179 0.75 5.75065C0.75 5.54951 0.886856 5.37945 1.16057 5.03933L1.28592 4.88357Z" stroke="#0372E6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.41663 14.0837L5.41663 1.41699" stroke="#0372E6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.41663 14.084H7.41663" stroke="#0372E6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>} {user.subscription}
                        </span>
                        <span className="text-xs text-[#6A7282] font-inter font-normal leading-4.5 mt-1">
                          {user.expiryDate ? `Expires: ${user.expiryDate}` : 'Expires: N/a'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm font-normal leading-5 text-[#364153] space-y-1">
                        <div>Behaviours: {user.behaviours}</div>
                        <div>Supplements: {user.supplements}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-4 py-2 bg-[#DCFCE7] text-[#008236] rounded-full text-sm font-medium leading-[130%]">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet */}
          {/* <div className="lg:hidden space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Subscription</p>
                    <p className={`text-sm font-medium ${
                      user.subscription === 'Premium' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {user.subscription === 'Premium' ? '👑' : '🎁'} {user.subscription}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {user.expiryDate ? `Expires: ${user.expiryDate}` : 'Expires: N/a'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Usage</p>
                    <p className="text-sm text-gray-700">Behaviours: {user.behaviours}</p>
                    <p className="text-sm text-gray-700">Supplements: {user.supplements}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div> */}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => setCurrentPage(1)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 1
                  ? 'bg-[#8B5CF6]  text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              1
            </button>
            
            <button
              onClick={() => setCurrentPage(2)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 2
                  ? 'bg-[#8B5CF6]  text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              2
            </button>
            
            <button
              onClick={() => setCurrentPage(3)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                currentPage === 3
                  ? 'bg-[#8B5CF6]  text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              3
            </button>
            
            <span className="px-2 text-gray-500">...</span>
            
            <button
              onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={currentPage === 10}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;