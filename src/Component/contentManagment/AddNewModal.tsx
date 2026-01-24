import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, X, Upload, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Link, FileCheck, User } from 'lucide-react';
import { CiEdit } from 'react-icons/ci';

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

interface Tag {
  id: string;
  label: string;
}

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

// ======== TAG BADGE COMPONENT ========
const TagBadge: React.FC<{ tag: Tag; onRemove: () => void }> = ({ tag, onRemove }) => (
  <span className="inline-flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded-md text-sm">
    {tag.label}
    <button onClick={onRemove} className="hover:bg-blue-200 text-red-500 rounded-full p-0.5">
      <X size={14} />
    </button>
  </span>
);

// ======== TEXT EDITOR COMPONENT ========
const TextEditor: React.FC<{ value: string; onChange: (val: string) => void; placeholder: string }> = ({ value, onChange, placeholder }) => (
  <div>
    <div className="flex gap-1 mb-2 pb-2 bg-gray-50 rounded-md border border-gray-100 p-2.5">
      <button className="p-1.5 hover:bg-gray-100 rounded"><Bold size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><Italic size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><Underline size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><List size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><AlignLeft size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><AlignCenter size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><AlignRight size={16} /></button>
      <button className="p-1.5 hover:bg-gray-100 rounded"><Link size={16} /></button>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
    />
  </div>
);

// ======== DETAILS TAB COMPONENT ========
const DetailsTab: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [worksWith, setWorksWith] = useState<Tag[]>([]);
  const [avoidWith, setAvoidWith] = useState<Tag[]>([]);
  const [primaryBenefits, setPrimaryBenefits] = useState<string>('');
  const [childrenDosage, setChildrenDosage] = useState<string>('');
  const [adultDosage, setAdultDosage] = useState<string>('');
  const [sideEffects, setSideEffects] = useState<string>('');
  const [worksWithInput, setWorksWithInput] = useState<string>('');
  const [avoidWithInput, setAvoidWithInput] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (value: string, setter: React.Dispatch<React.SetStateAction<Tag[]>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      const newTag: Tag = {
        id: Date.now().toString(),
        label: value.trim()
      };
      setter(prev => [...prev, newTag]);
      inputSetter('');
    }
  };

  const removeTag = (id: string, setter: React.Dispatch<React.SetStateAction<Tag[]>>) => {
    setter(prev => prev.filter(tag => tag.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Image Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-12 text-center">
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          {uploadedImage ? (
            <div className="space-y-2">
              <img src={uploadedImage} alt="Uploaded" className="mx-auto max-h-32 rounded" />
              <p className="text-sm text-gray-600">{fileName}</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="mx-auto text-black bg-blue-100 p-3 rounded-md" size={48} />
              <p className="font-medium text-base text-gray-900">Upload Supplement Image</p>
              <p className="text-sm text-gray-500">Supported formats: png, jpeg (Max 10MB)</p>
            </div>
          )}
        </label>
      </div>

      {/* Synergy Notes */}
      <div>
        <label className="block text-base font-medium mb-2 text-left">Synergy Notes</label>
        <div className="border border-blue-100 p-5 rounded-lg space-y-4">
          {/* Works Well With */}
          <div>
            <label className="block text-base font-medium mb-2 text-left">Works Well With</label>
            <input
              type="text"
              value={worksWithInput}
              onChange={(e) => setWorksWithInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(worksWithInput, setWorksWith, setWorksWithInput);
                }
              }}
              placeholder="Add compatible supplements"
              className="w-full bg-blue-50 py-3 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {worksWith.map(tag => (
                <TagBadge key={tag.id} tag={tag} onRemove={() => removeTag(tag.id, setWorksWith)} />
              ))}
            </div>
          </div>

          {/* Avoid Combining With */}
          <div>
            <label className="block text-base font-medium mb-2 text-left">Avoid Combining With</label>
            <input
              type="text"
              value={avoidWithInput}
              onChange={(e) => setAvoidWithInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(avoidWithInput, setAvoidWith, setAvoidWithInput);
                }
              }}
              placeholder="Add supplements to avoid"
              className="w-full bg-blue-50 py-3 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {avoidWith.map(tag => (
                <TagBadge key={tag.id} tag={tag} onRemove={() => removeTag(tag.id, setAvoidWith)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Benefits */}
      <div>
        <label className="block text-sm font-medium mb-2">Primary Benefits</label>
        <TextEditor
          value={primaryBenefits}
          onChange={setPrimaryBenefits}
          placeholder="Describe the primary benefits"
        />
      </div>

      {/* Dosage Guidelines */}
      <div>
        <label className="block text-base font-medium mb-2 text-left">Dosage Guidelines</label>
        <div className="border border-blue-100 p-5 rounded-lg space-y-3">
          <div>
            <label className="block text-base font-medium mb-2 text-left">Children Dosage</label>
            <input
              type="text"
              value={childrenDosage}
              onChange={(e) => setChildrenDosage(e.target.value)}
              placeholder="e.g., 400-800 mcg daily"
              className="w-full py-2.5 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-left">Adult Dosage</label>
            <input
              type="text"
              value={adultDosage}
              onChange={(e) => setAdultDosage(e.target.value)}
              placeholder="e.g., 800-1500 mcg daily"
              className="w-full py-2.5 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />
          </div>
        </div>
      </div>

      {/* Precautions & Side Effects */}
      <div>
        <label className="block text-base font-medium mb-2 text-left">Precautions & Side Effects</label>
        <input
          type="text"
          value={sideEffects}
          onChange={(e) => setSideEffects(e.target.value)}
          placeholder="Enter side effect"
          className="w-full py-2.5 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
        />
      </div>
    </div>
  );
};

// ======== ADD NEW MODAL ========
const AddNewModal: React.FC<{ onClose: () => void; activeTab: TabType }> = ({ onClose, activeTab }) => {
  const [modalTab, setModalTab] = useState<ModalTab>('basic');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ['Gut Health', 'Detoxification', 'Immune Support', 'Behavioral'];

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

              {/* Category Dropdown - Only for protocols and behaviours */}
              {(activeTab === 'protocols' || activeTab === 'behaviours') && (
                <div className="relative">
                  <label className="block text-base font-normal mb-3">Category</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="w-full px-4 py-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between text-left"
                    >
                      <span className={category ? 'text-gray-900' : 'text-gray-400'}>
                        {category || 'Select category'}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showCategoryDropdown && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setCategory(cat);
                              setShowCategoryDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

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
            <DetailsTab />
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


// import { FileCheck, User, X } from "lucide-react";
// import { useState } from "react";
// import DetailsTab from "./DetailsTab";

// type ModalTab = 'basic' | 'details';

// type Props = {
//   onClose: () => void;
// };

// const AddNewModal: React.FC<Props> = ({ onClose }) => {
//   const [modalTab, setModalTab] = useState<ModalTab>('basic');
//   const [supplementName, setSupplementName] = useState('');
//   const [shortDescription, setShortDescription] = useState('');

//   const handleModalClose = () => {
//     onClose();
//   };

//   const handleCancel = () => {
//     onClose();
//   };

//   const handleNext = () => {
//     if (modalTab === 'basic') {
//       setModalTab('details');
//     } else {
//       // submit logic
//       console.log({
//         supplementName,
//         shortDescription,
//       });
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white p-2.5 md:p-6   rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
//         {/* Header */}
//         <div className=" mb-4">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="text-xl md:text-2xl font-medium text-textColor leading-120% mb-2.5">
//                 Add New Supplement
//               </h2>
//               <p className="text-[#717182] text-base  mt-1">
//                 Create and manage supplement entries for the Supplement Lookup library
//               </p>
//             </div>
//             <button
//               onClick={handleModalClose}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-[#E8EFFC] py-3 px-5 rounded-full ">
//           <div className="flex gap-3">
//             <button
//               onClick={() => setModalTab('basic')}
//               className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
//                 modalTab === 'basic'
//                   ? 'bg-violet-200 hover:bg-violet-300 text-black'
//                   : ' hover:bg-violet-100'
//               }`}
//             >
//               <User className="w-4 h-4" />
//               Basic Information
//             </button>

//             <button
//               onClick={() => setModalTab('details')}
//               className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all cursor-pointer ${
//                 modalTab === 'details'
//                   ? 'bg-violet-200 hover:bg-violet-300  text-black'
//                   : ' hover:bg-violet-100'
//               }`}
//             >
//               <FileCheck className="w-4 h-4" />
//               Details
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="mt-4 mb-11">
//           {modalTab === 'basic' ? (
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm md:text-base font-normal  leading-6 text-[gray-900] mb-3">
//                   Supplement Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter supplement name"
//                   value={supplementName}
//                   onChange={(e) => setSupplementName(e.target.value)}
//                   className="w-full px-4 py-3 bg-blue-50 0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm md:text-base font-normal  leading-6 text-[#0A0A0A] mb-3">
//                   Short Description
//                 </label>
//                 <textarea
//                   rows={5}
//                   placeholder="Short explanation shown to users"
//                   value={shortDescription}
//                   onChange={(e) => setShortDescription(e.target.value)}
//                   className="w-full px-4 py-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                 />
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//            <DetailsTab/>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-start gap-3">
//           <button
//             onClick={handleNext}
//             className="bg-violet-400 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-medium cursor-pointer"
//           >
//             {modalTab === 'basic' ? 'Next' : 'Publish Supplement'}
//           </button>

//           <button
//             onClick={handleCancel}
//             className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium cursor-pointer "
//           >
//             Cancel
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AddNewModal;
