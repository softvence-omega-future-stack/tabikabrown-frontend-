import React, { useState } from 'react';

import SubsCriptionTab from './SubscriptionTab';
import AccountSetting from './AccountSetting';
import { SystemIcon } from '../../assets/svgIcon/SystemIcon';
import { AccountIcon } from '../../assets/svgIcon/AccountIcon';
import { SubscriptionIcon } from '../../assets/svgIcon/SubscriptionIcon';


interface SettingItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ title, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <h3 className="text-sm sm:text-base font-medium text-gray-900">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          checked ? 'bg-purple-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

type TabType = 'system' | 'subscription' | 'account';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('system');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [smtpEmail, setSmtpEmail] = useState(false);
  const [welcomeEmails, setWelcomeEmails] = useState(true);
  const [reminderEmails, setReminderEmails] = useState(true);

  const tabs = [
    { id: 'system' as TabType, label: 'System', icon: <SystemIcon/>},
    { id: 'subscription' as TabType, label: 'Subscription', icon: <SubscriptionIcon/> },
    { id: 'account' as TabType, label: 'Account Setting', icon:<AccountIcon/> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'system':
        return (
          <div className="">
            <SettingItem
              title="Maintenance Mode"
              description="Temporarily disable user access"
              checked={maintenanceMode}
              onChange={setMaintenanceMode}
            />
            <SettingItem
              title="SMTP Email Service"
              description="Enable email notifications and transactional emails"
              checked={smtpEmail}
              onChange={setSmtpEmail}
            />
            <SettingItem
              title="Welcome Emails"
              description="Send welcome email to new users"
              checked={welcomeEmails}
              onChange={setWelcomeEmails}
            />
            <SettingItem
              title="Reminder Emails"
              description="Send reminder emails for journal entries and supplements"
              checked={reminderEmails}
              onChange={setReminderEmails}
            />
          </div>
        );
      case 'subscription':
        return (
          <SubsCriptionTab/>
        );
      case 'account':
        return (
          <AccountSetting/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden ">
          {/* Header */}
          <div className="p-2.5 md:p-6 ">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Admin Settings
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap  lg:bg-[#F5F6FD] p-2 rounded-full max-w-lg items-center justify-center gap-2 sm:gap-3">
              {tabs.map((tab) => {
            
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-300'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 ">
            <div className="">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}