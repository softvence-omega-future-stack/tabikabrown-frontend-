import React from 'react';
import { Trash2, } from 'lucide-react';
import { CiEdit } from 'react-icons/ci';

interface Supplement {
  id: number;
  name: string;
  description: string;
}

interface SuplimentsListProps {
  data: Supplement[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const SuplimentsList: React.FC<SuplimentsListProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-2.5 md:p-6 border border-gray-400 rounded-[20px] mb-5">
      <div className="space-y-2">
        {data.length === 0 && (
          <p className="text-gray-500 text-center py-5">No items found</p>
        )}
        {data.map((supplement) => (
          <div
            key={supplement.id}
            className="flex items-center justify-between p-4 border-b border-violet-100 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-base text-textColor leading-[120%] mb-2.5">
                {supplement.name}
              </h3>
              <p className="text-sm font-inter text-gray-600 mt-1">
                {supplement.description}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onEdit && onEdit(supplement.id)}
                className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Edit"
              >
                <CiEdit className="w-6 h-6 text-activeBtnColor" />
              </button>
              <button
                onClick={() => onDelete && onDelete(supplement.id)}
                className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                aria-label="Delete"
              >
                <Trash2 className="w-6 h-6 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuplimentsList;




// import React, { useState } from 'react';
// import {  Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
// import { CiEdit } from 'react-icons/ci';






// interface Supplement {
//   id: number;
//   name: string;
//   description: string;
// }

// const ContentManagement: React.FC = () => {
 
//   const [searchQuery,] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 6;



//   // Sample data
//   const allSupplements: Supplement[] = [
//     { id: 1, name: 'Vitamin D3', description: 'Essential for immune function' },
//     { id: 2, name: 'Magnesium', description: 'Supports nervous system' },
//     { id: 3, name: 'Vitamin D3', description: 'Essential for immune function' },
//     { id: 4, name: 'Vitamin D3', description: 'Essential for immune function' },
//     { id: 5, name: 'Vitamin D3', description: 'Essential for immune function' },
//     { id: 6, name: 'Vitamin D3', description: 'Essential for immune function' },
//     { id: 7, name: 'Omega-3', description: 'Supports heart health' },
//     { id: 8, name: 'Vitamin C', description: 'Antioxidant support' },
//     { id: 9, name: 'Zinc', description: 'Immune system booster' },
//     { id: 10, name: 'Probiotics', description: 'Gut health support' },
//     { id: 11, name: 'B-Complex', description: 'Energy metabolism' },
//     { id: 12, name: 'Iron', description: 'Blood health support' },
//     { id: 13, name: 'Calcium', description: 'Bone strength' },
//     { id: 14, name: 'CoQ10', description: 'Cellular energy' },
//     { id: 15, name: 'Turmeric', description: 'Anti-inflammatory' },
//   ];

//   // Filter supplements based on search
//   const filteredSupplements = allSupplements.filter(supplement =>
//     supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     supplement.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredSupplements.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSupplements = filteredSupplements.slice(startIndex, endIndex);

//   // Reset to page 1 when search changes
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const handleEdit = (id: number) => {
//     console.log('Edit supplement:', id);
//   };

//   const handleDelete = (id: number) => {
//     console.log('Delete supplement:', id);
//   };

//   const goToPage = (page: number) => {
//     setCurrentPage(page);
//   };

//   const renderPageNumbers = () => {
//     const pages = [];
    
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, '...', totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
//       } else {
//         pages.push(1, '...', currentPage, '...', totalPages);
//       }
//     }
    
//     return pages;
//   };

//   return (
//     <div className="">
//       <div className="">

//         {/* Supplements List */}
//         <div className="bg-white p-2.5 md:p-6 border border-gray-400 rounded-[20px] mb-5">
//           <div className="space-y-2">
//             {currentSupplements.map((supplement) => (
//               <div
//                 key={supplement.id}
//                 className="flex items-center justify-between p-4 border-b border-violet-100 hover:bg-gray-100 rounded-lg transition-colors group"
//               >
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-base  text-textColor leading-[120%] mb-2.5">{supplement.name}</h3>
//                   <p className="text-sm font-inter text-gray-600 mt-1">{supplement.description}</p>
//                 </div>
//                 <div className="flex items-center gap-2 ml-4">
//                   <button
//                     onClick={() => handleEdit(supplement.id)}
//                     className="p-2  hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
//                     aria-label="Edit"
//                   >
//                     <CiEdit className="w-6 h-6 text-activeBtnColor" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(supplement.id)}
//                     className="p-2  hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
//                     aria-label="Delete"
//                   >
//                     <Trash2 className="w-6 h-6 text-red-500" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="">
//           <div className="flex flex-wrap items-center justify-center gap-2">
//             <button
//               onClick={() => goToPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Previous</span>
//             </button>

//             {renderPageNumbers().map((page, index) => (
//               <React.Fragment key={index}>
//                 {page === '...' ? (
//                   <span className="px-3 py-2 text-gray-500">...</span>
//                 ) : (
//                   <button
//                     onClick={() => goToPage(page as number)}
//                     className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
//                       currentPage === page
//                         ? 'bg-blue-600 text-white'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 )}
//               </React.Fragment>
//             ))}

//             <button
//               onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <span className="hidden sm:inline">Next</span>
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
      
//     </div>


//   );
// };

// export default ContentManagement;