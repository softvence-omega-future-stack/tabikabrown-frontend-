/* eslint-disable @typescript-eslint/no-explicit-any */



import React, { useState, useMemo } from 'react';
import { Search, } from 'lucide-react';
import SuplimentsList from './SuplimentList';
import ProtocolList from './ProtocolList';
import BehaviorList from './BeaviorsList';




type TabType = 'protocols' | 'behaviours' | 'supplements';


const ITEMS_PER_PAGE = 5;

// Interfaces
interface Supplement {
  id: number;
  name: string;
  description: string;
}








const ContentManagementTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('protocols');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const dataMap = {
    supplements: [
      { id: 1, name: 'Vitamin D', description: 'Essential for immune function' },
      { id: 2, name: 'Magnesium', description: 'Supports nervous system' },
      { id: 3, name: 'Omega 3', description: 'Supports heart health' },
      { id: 4, name: 'Zinc', description: 'Immune system booster' },
      { id: 5, name: 'Iron', description: 'Blood health support' },
      { id: 6, name: 'Calcium', description: 'Bone strength' },
      { id: 7, name: 'Probiotic', description: 'Gut health support' },
    ],

  };

const filteredData = useMemo(() => {
  const currentData = (dataMap as any)[activeTab] ?? [];
// <-- fallback empty array
  if (!searchQuery) return currentData;

  return currentData.filter((item: any) => {
    const searchText = searchQuery.toLowerCase();
    if ('name' in item) return item.name.toLowerCase().includes(searchText);
    if ('title' in item) return item.title.toLowerCase().includes(searchText);
    return false;
  });
}, [activeTab, searchQuery]);


  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'supplements': return <SuplimentsList data={paginatedData as Supplement[]} />;
      case 'protocols': return <ProtocolList  />;
      case 'behaviours': return <BehaviorList  />;
    }
  };

  return (
    <div className="">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Content Management</h1>
            <p className="text-gray-600">Manage app content & data</p>
          </div>
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button> */}
        </div>

        <div className="flex gap-3 mt-6">
          {(['protocols', 'behaviours', 'supplements'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-3 rounded-xl capitalize cursor-pointer ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative mt-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-12 pr-4 py-3 bg-indigo-50 rounded-xl"
          />
        </div>
      </div>

      {renderActiveComponent()}

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    
    </div>
  );
};



export default ContentManagementTab;
