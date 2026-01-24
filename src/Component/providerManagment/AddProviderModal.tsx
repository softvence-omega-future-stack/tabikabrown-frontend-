import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react'; // Using lucide-react for icons

interface Tag {
  id: string;
  label: string;
}

const AddProviderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [designationTags, setDesignationTags] = useState<Tag[]>([
    { id: '1', label: 'Speech delays' },
    { id: '2', label: 'Poor focus' },
  ]);

  if (!isOpen) return null;

  const removeTag = (id: string) => {
    setDesignationTags(designationTags.filter(tag => tag.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:p-8">
        
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl md:ext-2xl font-medium  text-[#0A0A0A] leading-[120%] mb-2.5">Add New Provider</h2>
            <p className="text-base font-normal text-[#717182] leading-6">Set up Provider parameters</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form className="space-y-8">
          
          {/* Section: Basic Information */}
          <section>
            <h3 className="mb-4 text-base  font-medium text-[#0A0A0A] leading-[150%]">
              Basic Information <span className="text-slate-900 normal-case font-normal ml-1">Notes</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Provider Name</label>
                <input 
                  type="text" 
                  placeholder="Enter supplement name"
                  className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-3.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Provider Category</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border-none bg-indigo-50/50 p-3 text-sm focus:ring-2 focus:ring-indigo-500">
                    <option>MAPS Doctor</option>
                    <option>Functional Medicine</option>
                    <option>DANI Practitioner</option>
                    <option>Nutritionist</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <label className="text-base  font-medium text-[#364153] leading-6 ">Designation</label>
              <input 
                type="text" 
                placeholder="Enter the behaviour title (e.g., Toe Walking)"
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex flex-wrap gap-2">
                {designationTags.map(tag => (
                  <span key={tag.id} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
                    {tag.label}
                    <button type="button" onClick={() => removeTag(tag.id)}>
                      <X className="h-3 w-3 text-red-400 hover:text-red-600" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Contact Information */}
          <section>
            <h3 className="mb-4  text-base font-medium text-[#0A0A0A] font-inter leading-6">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Email</label>
                <input type="email" placeholder="Enter supplement name" className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm" />
              </div>
              <div className="space-y-3.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Phone</label>
                <input type="text" placeholder="(555) 123-4567" className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm" />
              </div>
              <div className="space-y-3.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Website</label>
                <input type="text" placeholder="Enter supplement name" className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Office Hour</label>
                <input type="text" placeholder="9.00-5.00" className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm" />
              </div>
            </div>
          </section>

          {/* Section: Location */}
          <section>
            <h3 className="mb-4 text-base font-medium text-[#0A0A0A] font-inter leading-6">Location</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">Address</label>
                <input type="text" placeholder="123 Medical Plaza, Suite 200" className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-base  font-medium text-[#364153] leading-6 ">City, State ZIP</label>
                <input type="text" placeholder="San Francisco, CA 94102" className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button 
              type="submit"
              className="rounded-lg bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-500 active:scale-95 shadow-lg cursor-pointer shadow-indigo-200"
            >
              Add Provider
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProviderModal;