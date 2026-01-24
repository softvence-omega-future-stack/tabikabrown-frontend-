import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

// 1. Define the Behavior Interface
interface Behavior {
  id: string;
  name: string;
  protocolsCount: number;
  rootCausesCount: number;
  supplementsCount: number;
}

// 2. Behavior Item Component
const BehaviorItem: React.FC<{ behavior: Behavior }> = ({ behavior }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors">
      
      {/* Content Section */}
      <div className="flex-1 space-y-3">
        <h3 className="text-base font-bold text-slate-800">
          {behavior.name}
        </h3>

        {/* Badges Section */}
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

      {/* Actions Section */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
        <button className="text-indigo-300 hover:text-indigo-500 transition-colors p-1">
          <Pencil size={18} strokeWidth={2.5} />
        </button>
        <button className="text-rose-400 hover:text-rose-600 transition-colors p-1">
          <Trash2 size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

// 3. Main Behavior List Container
const BehaviorList: React.FC = () => {
  const behaviors: Behavior[] = [
    { id: '1', name: 'Toe Walking', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '2', name: 'Red Cheeks/Ears', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '3', name: 'Hand Flapping', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '4', name: 'Tantrums', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
    { id: '5', name: 'Sleep Issues', protocolsCount: 2, rootCausesCount: 4, supplementsCount: 2 },
  ];

  return (
    <div className="w-full  ">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {behaviors.map((item) => (
          <BehaviorItem key={item.id} behavior={item} />
        ))}
      </div>
    </div>
  );
};

export default BehaviorList;