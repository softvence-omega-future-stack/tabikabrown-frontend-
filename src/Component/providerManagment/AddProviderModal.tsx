import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface Provider {
  id: number;
  name: string;
  specialist: string;
  email: string;
  contact: string;
  location: string;
}

interface AddProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
  providerData: Provider | null;
}

const AddProviderModal: React.FC<AddProviderModalProps> = ({
  isOpen,
  onClose,
  isEdit,
  providerData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    specialist: 'MAPS Doctor',
    email: '',
    contact: '',
    website: '',
    officeHour: '',
    address: '',
    location: '',
  });



useEffect(() => {
  //  Wrap in setTimeout to defer state update
  const timer = setTimeout(() => {
    if (isEdit && providerData) {
      setFormData({
        name: providerData.name,
        specialist: providerData.specialist,
        email: providerData.email,
        contact: providerData.contact,
        website: '',
        officeHour: '',
        address: '',
        location: providerData.location,
      });
    } else {
      setFormData({
        name: '',
        specialist: 'MAPS Doctor',
        email: '',
        contact: '',
        website: '',
        officeHour: '',
        address: '',
        location: '',
      });
    }
  }, 0);

  return () => clearTimeout(timer);
}, [isEdit, providerData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      console.log("Update Provider:", formData);
    } else {
      console.log("Add Provider:", formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center mt-20 justify-around bg-black/40 p-4">
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-medium text-[#0A0A0A] leading-[120%] mb-2.5">
              {isEdit ? "Edit Provider" : "Add New Provider"}
            </h2>
            <p className="text-base font-normal text-[#717182] leading-6">
              Set up Provider parameters
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100 transition-colors cursor-pointer">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <section>
            <h3 className="mb-4 text-base font-medium text-[#0A0A0A] leading-[150%]">
              Basic Information <span className="text-slate-900 normal-case font-normal ml-1">Notes</span>
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-3.5">
                <label className="text-base font-medium text-[#364153] leading-6">Provider Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-3.5">
                <label className="text-base font-medium text-[#364153] leading-6">Provider Category</label>
                <div className="relative">
                  <select
                    value={formData.specialist}
                    onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                    className="w-full appearance-none rounded-lg border-none bg-indigo-50/50 p-3 text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>MAPS Doctor</option>
                    <option>Functional Medicine</option>
                    <option>DANI Practitioner</option>
                    <option>Nutritionist</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h3 className="mb-4 text-base font-medium text-[#0A0A0A] leading-6">Contact Information</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm"
              />

              <input
                type="text"
                placeholder="Phone"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm"
              />

              <input
                type="text"
                placeholder="Website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm"
              />

              <input
                type="text"
                placeholder="Office Hour"
                value={formData.officeHour}
                onChange={(e) => setFormData({ ...formData, officeHour: e.target.value })}
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm"
              />
            </div>
          </section>

          {/* Location */}
          <section>
            <h3 className="mb-4 text-base font-medium text-[#0A0A0A] leading-6">Location</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm"
              />

              <input
                type="text"
                placeholder="City, State ZIP"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-lg border-none bg-indigo-50/50 p-3 text-sm"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-violet-500 active:scale-95 shadow-lg cursor-pointer shadow-indigo-200"
            >
              {isEdit ? "Update Provider" : "Add Provider"}
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