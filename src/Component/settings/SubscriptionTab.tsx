import  { useState } from 'react';
import { Edit2, X } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  isActive: boolean;
  canEdit: boolean;
}

export default function SubsCriptionTab() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'Free Tier',
      price: 0,
      period: 'monthly',
      description: 'You can off/on this package by toggle.',
      isActive: true,
      canEdit: false,
    },
    {
      id: '2',
      name: 'Premium',
      price: 9.99,
      period: 'monthly',
      description: 'You can edit this package through edit on the right.',
      isActive: false,
      canEdit: true,
    },
    {
      id: '3',
      name: 'Premium',
      price: 79.00,
      period: 'yearly',
      description: 'You can edit this package through edit on the right.',
      isActive: false,
      canEdit: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [yearlyPrice, setYearlyPrice] = useState('');

  const handleToggle = (id: string) => {
    setPackages(packages.map(pkg =>
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
  };

  const handleEditClick = () => {
    const monthly = packages.find(p => p.period === 'monthly' && p.canEdit);
    const yearly = packages.find(p => p.period === 'yearly' && p.canEdit);
    
    setMonthlyPrice(monthly?.price.toFixed(2) || '');
    setYearlyPrice(yearly?.price.toFixed(2) || '');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setPackages(packages.map(pkg => {
      if (pkg.period === 'monthly' && pkg.canEdit) {
        return { ...pkg, price: parseFloat(monthlyPrice) || pkg.price };
      }
      if (pkg.period === 'yearly' && pkg.canEdit) {
        return { ...pkg, price: parseFloat(yearlyPrice) || pkg.price };
      }
      return pkg;
    }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="">
        {/* Pricing Cards */}
        <div className="">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`p-4 sm:p-6 ${index !== packages.length - 1 ? 'border-b border-gray-200 ' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg  font-bold text-gray-900 leading-6">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-normal text-gray-900">
                        ${pkg.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">/ {pkg.period}</span>
                    </div>
                  </div>
                  <p className="text-xs font-normal text-[#2F80ED]">{pkg.description}</p>
                </div>

                {/* Toggle or Edit Button */}
                <div className="flex items-center gap-3">
                  {pkg.canEdit ? (
                    <button
                      onClick={handleEditClick}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors cursor-pointer"
                    >
                      <span>Edit</span>
                      <Edit2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggle(pkg.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer ${
                        pkg.isActive ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pkg.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
            onClick={handleCancel}
          />
          
          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Edit Premium Package
                </h2>
                <p className="text-sm text-gray-600">
                  Update pricing for your monthly and annually packages.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Monthly Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Monthly Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="9.99"
                  />
                </div>

                {/* Yearly Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Yearly Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={yearlyPrice}
                    onChange={(e) => setYearlyPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="79.00"
                  />
                </div>

                {/* Free Tier Limits Info */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Free Tier Limits
                  </h4>
                  <p className="text-xs text-blue-700">
                    Configure Usage Limits For Free Tier Users
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}