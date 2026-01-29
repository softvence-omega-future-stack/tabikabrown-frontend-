import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Pencil, Plus, Trash2, X } from 'lucide-react';
import AddBehaviorsModal from './AddBehaviorsModal';

// Behavior Interface - Updated with all required fields
interface Behavior {
  id: string;
  name: string;
  category?: string;
  description: string;
  protocolsCount: number;
  rootCausesCount: number;
  supplementsCount: number;
}

// Delete Confirmation Modal Props
interface DeleteConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

// Delete Confirmation Modal Component
const DeleteConfirmModal: React.FC<DeleteConfirmProps> = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Confirm Delete</h2>
          <button onClick={onCancel}><X /></button>
        </div>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="border px-8 py-2 rounded-xl"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-rose-500 text-white px-8 py-2 rounded-xl"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// Behavior Item Component
const BehaviorItem: React.FC<{
  behavior: Behavior;
  onEdit: (behavior: Behavior) => void;
  onDelete: (behavior: Behavior) => void;
}> = ({ behavior, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
      
      {/* Content Section */}
      <div className="flex-1 space-y-3">
        <h3 className="text-base font-bold text-slate-800">
          {behavior.name}
        </h3>

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

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
        <button onClick={() => onEdit(behavior)} className="text-indigo-300 hover:text-indigo-500 transition-colors p-1 cursor-pointer">
          <Pencil size={18} strokeWidth={2.5} />
        </button>
        <button onClick={() => onDelete(behavior)} className="text-rose-400 hover:text-rose-600 transition-colors p-1 cursor-pointer">
          <Trash2 size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

// Main Behavior List Component
const BehaviorList: React.FC = () => {
  const [behaviors, setBehaviors] = useState<Behavior[]>([
    { id: '1', name: 'Toe Walking', category: 'Physical', description: '', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '2', name: 'Red Cheeks/Ears', category: 'Physical', description: '', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '3', name: 'Hand Flapping', category: 'Sensory', description: '', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '4', name: 'Tantrums', category: 'Emotional', description: '', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '5', name: 'Sleep Issues', category: 'Physical', description: '', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBehavior, setSelectedBehavior] = useState<Behavior | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [behaviorToDelete, setBehaviorToDelete] = useState<Behavior | null>(null);

      const [currentPage, setCurrentPage] = useState(1);
        const [searchQuery,] = useState('');
  
    const itemsPerPage = 6;

  // Add/Edit Handlers
  const handleAdd = () => {
    setSelectedBehavior(null);
    setIsModalOpen(true);
  };

  const handleEdit = (behavior: Behavior) => {
    setSelectedBehavior(behavior);
    setIsModalOpen(true);
  };

  const handleSave = (behaviorData: Omit<Behavior, 'id'> & { id?: string }) => {
    if (behaviorData.id) {
      setBehaviors((prev) =>
        prev.map((b) => (b.id === behaviorData.id ? { ...b, ...behaviorData } as Behavior : b))
      );
    } else {
      const newBehavior: Behavior = {
        ...behaviorData,
        id: (Math.max(...behaviors.map((b) => parseInt(b.id)), 0) + 1).toString(),
      } as Behavior;
      setBehaviors((prev) => [...prev, newBehavior]);
    }
    setIsModalOpen(false);
  };

  // Delete Handlers
  const handleDeleteClick = (behavior: Behavior) => {
    setBehaviorToDelete(behavior);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (behaviorToDelete) {
      setBehaviors((prev) => prev.filter((b) => b.id !== behaviorToDelete.id));
      setBehaviorToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setBehaviorToDelete(null);
    setIsDeleteModalOpen(false);
  };


  const filteredBehaviors = behaviors.filter(protocol =>
   protocol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    protocol.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

    // Calculate pagination
  const totalPages = Math.ceil(filteredBehaviors.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentSupplements = filteredBehaviors.slice(startIndex, endIndex);

  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-5 p-5">
          <h2 className="text-lg font-semibold text-slate-800">Behaviors</h2>
          <button
            onClick={handleAdd}
            className="bg-violet-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-violet-700"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {behaviors.map((item) => (
          <BehaviorItem
            key={item.id}
            behavior={item}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddBehaviorsModal
          mode={selectedBehavior ? 'edit' : 'add'}
          initialData={selectedBehavior}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && behaviorToDelete && (
        <DeleteConfirmModal
          message={`Are you sure you want to delete "${behaviorToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}


               {/* Pagination */}
         <div className="mt-6">
         <div className="flex flex-wrap items-center justify-center gap-2">
           <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {renderPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => goToPage(page as number)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
   
  );
};

export default BehaviorList;




// import React, { useState } from 'react';
// import { Pencil, Plus, Trash2, X } from 'lucide-react';
// import AddBehaviorsModal from './AddBehaviorsModal';

// // Behavior Interface
// interface Behavior {
//   id: string;
//   name: string;
//   protocolsCount: number;
//   rootCausesCount: number;
//   supplementsCount: number;
//   description?: string; 
// }

// // Delete Confirmation Modal Props
// interface DeleteConfirmProps {
//   onConfirm: () => void;
//   onCancel: () => void;
//   message: string;
// }

// // Delete Confirmation Modal Component
// const DeleteConfirmModal: React.FC<DeleteConfirmProps> = ({ onConfirm, onCancel, message }) => {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-medium">Confirm Delete</h2>
//           <button onClick={onCancel}><X /></button>
//         </div>
//         <p className="mb-6">{message}</p>
//         <div className="flex justify-center w-full gap-3">
//           <button
//             onClick={onCancel}
//             className="border px-8 cursor-pointer py-2 rounded-xl"
//           >
//             No
//           </button>
//           <button
//             onClick={onConfirm}
//             className="bg-rose-500 text-white px-8 cursor-pointer py-2 rounded-xl"
//           >
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Behavior Item Component
// const BehaviorItem: React.FC<{
//   behavior: Behavior;
//   onEdit: (behavior: Behavior) => void;
//   onDelete: (behavior: Behavior) => void;
// }> = ({ behavior, onEdit, onDelete }) => {
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
      
//       {/* Content Section */}
//       <div className="flex-1 space-y-3">
//         <h3 className="text-base font-bold text-slate-800">
//           {behavior.name}
//         </h3>

//         <div className="flex flex-wrap gap-2">
//           <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-400">
//             {behavior.protocolsCount} Suggested Protocol
//           </span>
//           <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-sky-100 text-sky-400">
//             {behavior.rootCausesCount} Root causes
//           </span>
//           <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-400">
//             {behavior.supplementsCount} supplements
//           </span>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
//         <button onClick={() => onEdit(behavior)} className="text-indigo-300 hover:text-indigo-500 transition-colors p-1">
//           <Pencil size={18} strokeWidth={2.5} />
//         </button>
//         <button onClick={() => onDelete(behavior)} className="text-rose-400 hover:text-rose-600 transition-colors p-1">
//           <Trash2 size={18} strokeWidth={2.5} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Behavior List Component
// const BehaviorList: React.FC = () => {
//   const [behaviors, setBehaviors] = useState<Behavior[]>([
//     { id: '1', name: 'Toe Walking', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
//     { id: '2', name: 'Red Cheeks/Ears', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
//     { id: '3', name: 'Hand Flapping', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
//     { id: '4', name: 'Tantrums', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
//     { id: '5', name: 'Sleep Issues', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedBehavior, setSelectedBehavior] = useState<Behavior | null>(null);

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [behaviorToDelete, setBehaviorToDelete] = useState<Behavior | null>(null);

//   // Add/Edit Handlers
//   const handleAdd = () => {
//     setSelectedBehavior(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (behavior: Behavior) => {
//     setSelectedBehavior(behavior);
//     setIsModalOpen(true);
//   };

// const handleSave = (behaviorData: Omit<Behavior, 'id'> & { id?: string }) => {
//   const newBehavior: Behavior = {
//     ...behaviorData,
//     id: behaviorData.id || (Math.max(...behaviors.map(b => parseInt(b.id)), 0) + 1).toString(),
//     description: behaviorData.description || '', // default
//   };
//   setBehaviors(prev => [...prev, newBehavior]);
// };


//   // Delete Handlers
//   const handleDeleteClick = (behavior: Behavior) => {
//     setBehaviorToDelete(behavior);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     if (behaviorToDelete) {
//       setBehaviors((prev) => prev.filter((b) => b.id !== behaviorToDelete.id));
//       setBehaviorToDelete(null);
//       setIsDeleteModalOpen(false);
//     }
//   };

//   const cancelDelete = () => {
//     setBehaviorToDelete(null);
//     setIsDeleteModalOpen(false);
//   };

//   return (
//     <div className="w-full">
//       <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
//         <div className="flex items-center justify-between mb-5 p-5">
//           <h2 className="text-lg font-semibold text-textColor">Behaviors</h2>
//           <button
//             onClick={handleAdd}
//             className="bg-violet-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-violet-700"
//           >
//             <Plus className="w-5 h-5" />
//             Add New
//           </button>
//         </div>

//         {behaviors.map((item) => (
//           <BehaviorItem
//             key={item.id}
//             behavior={item}
//             onEdit={handleEdit}
//             onDelete={handleDeleteClick}
//           />
//         ))}
//       </div>

//       {/* Add/Edit Modal */}
//       {isModalOpen && selectedBehavior !== undefined && (
//         <AddBehaviorsModal
//           mode={selectedBehavior ? 'edit' : 'add'}
//           initialData={selectedBehavior}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSave}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && behaviorToDelete && (
//         <DeleteConfirmModal
//           message={`Are you sure you want to delete "${behaviorToDelete.name}"?`}
//           onConfirm={confirmDelete}
//           onCancel={cancelDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default BehaviorList;
