import React from 'react';
import { Pencil, Trash2 } from 'lucide-react'; // Using lucide-react for icons

// 1. Define the Protocol Interface
interface Protocol {
  id: string;
  title: string;
  description: string;
  category: string;
  rootCausesCount: number;
  supplementsCount: number;
  categoryColor: string; // Tailwind class for the first badge color
}

// 2. Protocol Item Component
const ProtocolItem: React.FC<{ protocol: Protocol }> = ({ protocol }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      
      {/* Content Section */}
      <div className="flex-1 space-y-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800 leading-tight">
            {protocol.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {protocol.description}
          </p>
        </div>

        {/* Badges Section - Responsive Wrap */}
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

      {/* Actions Section */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
        <button className="text-indigo-400 hover:text-indigo-600 transition-colors p-1">
          <Pencil size={20} />
        </button>
        <button className="text-rose-400 hover:text-rose-600 transition-colors p-1">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

// 3. Main Container Component
const ProtocolList: React.FC = () => {
  const protocols: Protocol[] = [
    {
      id: '1',
      title: 'Gut Healing Protocol',
      description: 'Comprehensive gut healing approach',
      category: 'Gut health',
      rootCausesCount: 4,
      supplementsCount: 2,
      categoryColor: 'bg-indigo-50 text-indigo-500',
    },
    {
      id: '2',
      title: 'Methylation Support',
      description: 'Comprehensive gut healing approach',
      category: 'Detoxification',
      rootCausesCount: 4,
      supplementsCount: 2,
      categoryColor: 'bg-purple-50 text-purple-500',
    },
    {
      id: '3',
      title: 'Immune Support Protocol',
      description: 'Comprehensive gut healing approach',
      category: 'Immune Support',
      rootCausesCount: 4,
      supplementsCount: 2,
      categoryColor: 'bg-fuchsia-50 text-fuchsia-500',
    },
  ];

  return (
    <div className=" my-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {protocols.map((p) => (
        <ProtocolItem key={p.id} protocol={p} />
      ))}
    </div>
  );
};

export default ProtocolList;