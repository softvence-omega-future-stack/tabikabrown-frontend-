/* eslint-disable @typescript-eslint/no-explicit-any */



import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, X, FileCheck, User } from 'lucide-react';
import { CiEdit } from 'react-icons/ci';
import DetailsTab from './DetailsTab';

type TabType = 'protocols' | 'behaviours' | 'supplements';
type ModalTab = 'basic' | 'details';

const ITEMS_PER_PAGE = 5;

// Interfaces
interface Supplement {
  id: number;
  name: string;
  description: string;
}

interface Protocol {
  id: number;
  title: string;
  description: string;
  category: string;
  rootCausesCount: number;
  supplementsCount: number;
  categoryColor: string;
}

interface Behavior {
  id: number;
  name: string;
  protocolsCount: number;
  rootCausesCount: number;
  supplementsCount: number;
}

// interface Tag {
//   id: string;
//   label: string;
// }

// ======== SUPPLEMENT LIST COMPONENT ========
const SupplementsList: React.FC<{ data: Supplement[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 border border-gray-400 rounded-2xl mb-5">
      <div className="space-y-2">
        {data.length === 0 && (
          <p className="text-gray-500 text-center py-5">No items found</p>
        )}
        {data.map((supplement) => (
          <div
            key={supplement.id}
            className="flex items-center justify-between p-4 border-b border-violet-100 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-base text-gray-900 mb-2">{supplement.name}</h3>
              <p className="text-sm text-gray-600">{supplement.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <CiEdit className="w-6 h-6 text-blue-600" />
              </button>
              <button className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ======== PROTOCOL LIST COMPONENT ========
const ProtocolList: React.FC<{ data: Protocol[] }> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
      {data.length === 0 && (
        <p className="text-gray-500 text-center py-5">No items found</p>
      )}
      {data.map((protocol) => (
        <div
          key={protocol.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{protocol.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{protocol.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className={`px-4 py-1.5 rounded-full text-xs font-medium ${protocol.categoryColor}`}>
                {protocol.category}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-sky-100 text-sky-600">
                {protocol.rootCausesCount} Root causes
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                {protocol.supplementsCount} supplements
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
            <button className="text-indigo-400 hover:text-indigo-600 transition-colors p-1">
              <CiEdit className="w-5 h-5" />
            </button>
            <button className="text-rose-400 hover:text-rose-600 transition-colors p-1">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ======== BEHAVIOR LIST COMPONENT ========
const BehaviorsList: React.FC<{ data: Behavior[] }> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
      {data.length === 0 && (
        <p className="text-gray-500 text-center py-5">No items found</p>
      )}
      {data.map((behavior) => (
        <div
          key={behavior.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 space-y-3">
            <h3 className="text-base font-bold text-slate-800">{behavior.name}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-400">
                {behavior.protocolsCount} Suggested Protocol
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-sky-100 text-sky-400">
                {behavior.rootCausesCount} Root causes
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-400">
                {behavior.supplementsCount} supplements
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
            <button className="text-indigo-300 hover:text-indigo-500 transition-colors p-1">
              <CiEdit className="w-5 h-5" />
            </button>
            <button className="text-rose-400 hover:text-rose-600 transition-colors p-1">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ======== ADD NEW MODAL ========
const AddNewModal: React.FC<{ onClose: () => void; activeTab: TabType }> = ({ onClose, activeTab }) => {
  const [modalTab, setModalTab] = useState<ModalTab>('basic');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const getModalTitle = () => {
    switch (activeTab) {
      case 'supplements': return 'Add New Supplement';
      case 'protocols': return 'Add New Protocol';
      case 'behaviours': return 'Add New Behaviour';
    }
  };

  const getNameLabel = () => {
    switch (activeTab) {
      case 'supplements': return 'Supplement Name';
      case 'protocols': return 'Protocol Title';
      case 'behaviours': return 'Behaviour Name';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">{getModalTitle()}</h2>
              <p className="text-gray-500 text-base">
                Create and manage {activeTab} entries for the library
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="bg-blue-50 py-3 px-5 rounded-full mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setModalTab('basic')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                modalTab === 'basic' ? 'bg-violet-200 text-black' : 'hover:bg-violet-100'
              }`}
            >
              <User className="w-4 h-4" />
              Basic Information
            </button>
            <button
              onClick={() => setModalTab('details')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                modalTab === 'details' ? 'bg-violet-200 text-black' : 'hover:bg-violet-100'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Details
            </button>
          </div>
        </div>

        <div className="mt-4 mb-8">
          {modalTab === 'basic' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-base font-normal mb-3">{getNameLabel()}</label>
                <input
                  type="text"
                  placeholder={`Enter ${activeTab.slice(0, -1)} name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-base font-normal mb-3">Short Description</label>
                <textarea
                  rows={5}
                  placeholder="Short explanation shown to users"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500"><DetailsTab/></div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => modalTab === 'basic' ? setModalTab('details') : onClose()}
            className="bg-violet-400 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-medium"
          >
            {modalTab === 'basic' ? 'Next' : `Publish ${activeTab.slice(0, -1)}`}
          </button>
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ======== MAIN COMPONENT ========
const ContentManagementTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('supplements');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    protocols: [
      { id: 1, title: 'Gut Healing Protocol', description: 'Comprehensive gut healing approach', category: 'Gut health', rootCausesCount: 4, supplementsCount: 2, categoryColor: 'bg-indigo-50 text-indigo-500' },
      { id: 2, title: 'Methylation Support', description: 'Comprehensive gut healing approach', category: 'Detoxification', rootCausesCount: 4, supplementsCount: 2, categoryColor: 'bg-purple-50 text-purple-500' },
      { id: 3, title: 'Immune Support Protocol', description: 'Comprehensive gut healing approach', category: 'Immune Support', rootCausesCount: 4, supplementsCount: 2, categoryColor: 'bg-fuchsia-50 text-fuchsia-500' },
    ],
    behaviours: [
      { id: 1, name: 'Toe Walking', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
      { id: 2, name: 'Red Cheeks/Ears', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
      { id: 3, name: 'Hand Flapping', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
      { id: 4, name: 'Tantrums', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
      { id: 5, name: 'Sleep Issues', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
      { id: 6, name: 'Meditation', protocolsCount: 1, rootCausesCount: 2, supplementsCount: 1 },
    ],
  };

  const filteredData = useMemo(() => {
    const currentData = dataMap[activeTab];
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
      case 'supplements': return <SupplementsList data={paginatedData as Supplement[]} />;
      case 'protocols': return <ProtocolList data={paginatedData as Protocol[]} />;
      case 'behaviours': return <BehaviorsList data={paginatedData as Behavior[]} />;
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Content Management</h1>
            <p className="text-gray-600">Manage app content & data</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          {(['protocols', 'behaviours', 'supplements'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-3 rounded-xl capitalize ${
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
            className="w-full pl-12 pr-4 py-3 border rounded-xl"
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

      {isModalOpen && <AddNewModal onClose={() => setIsModalOpen(false)} activeTab={activeTab} />}
    </div>
  );
};



export default ContentManagementTab;
