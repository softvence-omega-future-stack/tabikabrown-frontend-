import React, { useState } from 'react';

import SubsCriptionTab from './SubscriptionTab';
import AccountSetting from './AccountSetting';

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
    { id: 'system' as TabType, label: 'System', icon: <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.19444 0.75L9.59309 1.49518C9.8626 1.99898 9.99736 2.25087 9.90825 2.35875C9.81914 2.46663 9.52568 2.37951 8.93874 2.20525C8.35194 2.03104 7.72892 1.9373 7.08333 1.9373C3.58553 1.9373 0.75 4.68897 0.75 8.08333C0.75 9.20279 1.05842 10.2524 1.59729 11.1563M4.97222 15.4167L4.57358 14.6715C4.30406 14.1677 4.1693 13.9158 4.2584 13.8079C4.34751 13.7 4.641 13.7872 5.22793 13.9614C5.81473 14.1356 6.43775 14.2294 7.08333 14.2294C10.5811 14.2294 13.4167 11.4777 13.4167 8.08333C13.4167 6.96387 13.1083 5.91432 12.5694 5.01032" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> },
    { id: 'subscription' as TabType, label: 'Subscription', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.78125 9.55258C5.78125 10.4126 6.44125 11.1059 7.26125 11.1059H8.93458C9.64792 11.1059 10.2279 10.4992 10.2279 9.75258C10.2279 8.93924 9.87458 8.65258 9.34792 8.46591L6.66125 7.53258C6.13458 7.34591 5.78125 7.05924 5.78125 6.24591C5.78125 5.49924 6.36125 4.89258 7.07458 4.89258H8.74792C9.56792 4.89258 10.2279 5.58591 10.2279 6.44591" stroke="#212B36" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 4V12" stroke="#212B36" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.00004 14.6673C11.6819 14.6673 14.6667 11.6825 14.6667 8.00065C14.6667 4.31875 11.6819 1.33398 8.00004 1.33398C4.31814 1.33398 1.33337 4.31875 1.33337 8.00065C1.33337 11.6825 4.31814 14.6673 8.00004 14.6673Z" stroke="#212B36" stroke-linecap="round" stroke-linejoin="round"/>
</svg> },
    { id: 'account' as TabType, label: 'Account Setting', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.10671 7.24732C8.04004 7.24065 7.96004 7.24065 7.88671 7.24732C6.30004 7.19398 5.04004 5.89398 5.04004 4.29398C5.04004 2.66065 6.36004 1.33398 8.00004 1.33398C9.63337 1.33398 10.96 2.66065 10.96 4.29398C10.9534 5.89398 9.69337 7.19398 8.10671 7.24732Z" stroke="#212B36" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.77335 9.70602C3.16002 10.786 3.16002 12.546 4.77335 13.6193C6.60669 14.846 9.61335 14.846 11.4467 13.6193C13.06 12.5393 13.06 10.7793 11.4467 9.70602C9.62002 8.48602 6.61335 8.48602 4.77335 9.70602Z" stroke="#212B36" stroke-linecap="round" stroke-linejoin="round"/>
</svg> },
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
            <div className="flex flex-wrap  lg:bg-[#F5F6FD] p-2 rounded-full max-w-lg gap-2 sm:gap-3">
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