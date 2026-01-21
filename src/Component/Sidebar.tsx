import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Users, Globe, UserSquare2, BarChart3, Settings, ChevronDown } from 'lucide-react';

// Define the structure for our navigation items
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} />, path: '/dashboard' },
    { id: 'users', label: 'User\nManagement', icon: <Users size={20} />, path: '/dashboard/users-managment' },
    { id: 'content', label: 'Content\nManagement', icon: <Globe size={20} />, path: '/dashboard/content-managment' },
    { id: 'provider', label: 'Provider\nManagement', icon: <UserSquare2 size={20} />, path: '/dashboard/provider-managment' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, path: '/dashboard/analytics' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  // Function to check if the current path matches the item path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-72 bg-white rounded-[20px] min-h-screen border border-gray-400 flex flex-col py-7.5 px-6">
    

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive(item.path)
                ? 'bg-[#8B78F6] text-white shadow-lg shadow-purple-100'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <span className="ml-2 font-semibold text[15px] font-inter leading-7">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Profile Section */}
    <div className="pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
        <div className="flex items-center px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-[#8B78F6] flex items-center justify-center text-white font-semibold">
            J
          </div>

          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-textColor leading-5.5">John Doe</p>
            <p className="text-xs font-normal leading-3 text-gray-700">Admin</p>
          </div>

          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


// // "use client";

// import { Button } from "@/components/ui/button";
// import { CgMenuRightAlt } from "react-icons/cg";

// import {
//   AlertCircle,
  
//   // DollarSign,
//   History,
//   Home,
//   MapPin,
//   Truck,
//   Users,
//   X,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/images/logo.png";
// import { cn } from "../lib/utils";

// interface SidebarProps {
//   collapsed?: boolean;
//   onToggle?: (state: boolean) => void;
//   closeMobileMenu?: () => void;
// }

// const menuItems = [
//   { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
//   { id: "riders", label: "Riders", icon: Users, path: "/dashboard/riders" },
//   { id: "driver-management", label: "Driver Management", icon: Truck, path: "/dashboard/driver-management" },
//   { id: "trip-management", label: "Trip Management", icon: MapPin, path: "/dashboard/trip-management" },
//   // { id: "pricing", label: "Pricing Configuration", icon: DollarSign, path: "/dashboard/pricing-configuration" },
//   { id: "transaction-history", label: "Transaction History", icon: History, path: "/dashboard/transaction-history" },
//   { id: "complaints", label: "Complaints", icon: AlertCircle, path: "/dashboard/complains" },
//   // { id: "notifications", label: "Notifications Management", icon: Bell, path: "/dashboard/notifications-management" },
// ];

// const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle, closeMobileMenu }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <div className={cn(
//       "bg-white border-r border-border flex flex-col h-full transition-all duration-300",
//       collapsed ? "w-20" : "w-64"
//     )}>
      

//       <div className="p-6 flex items-center justify-between border-b border-border md:border-b-0">
        
       
//         <div
//           className={cn(
//             "flex items-center gap-2 cursor-pointer",
//             collapsed && "justify-center w-full"
//           )}
//           onClick={() => collapsed && onToggle && onToggle(false)}
//         >
//           <img src={logo} alt="logo" className="h-8 w-8 flex-shrink-0" />
//           {!collapsed && (
//             <span className="text-green text-2xl font-bold whitespace-nowrap">
//               Hustle
//             </span>
//           )}
//         </div>

        
//         {!collapsed && (
//           <Button
//             variant="ghost"
//             size="icon"
//             className="hidden md:flex !text-[#6B7280]"
//             onClick={() => onToggle && onToggle(true)}
//           >
//             <CgMenuRightAlt className="w-5 h-5" />
//           </Button>
//         )}

        
//         {closeMobileMenu && (
//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden !text-[#6B7280]"
//             onClick={closeMobileMenu}
//           >
//             <X className="w-5 h-5" />
//           </Button>
//         )}
//       </div>

     
//       <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive =
//   item.path === "/dashboard"
//     ? location.pathname === "/dashboard"
//     : location.pathname.startsWith(item.path);

//           // const isActive = location.pathname === item.path || 
//           //                 location.pathname.startsWith(item.path + "/");

//           return (
//             <div
//               key={item.id}
//               className={cn(
//                 "flex items-center justify-between rounded-md transition-colors",
//                 isActive ? "bg-gray text-green" : "hover:bg-gray hover:text-green"
//               )}
//             >
//               <button
//                 className={cn(
//                   "w-full cursor-pointer flex items-center gap-3 py-3 px-4",
//                   collapsed && "justify-center",
//                   isActive && "text-green"
//                 )}
//                 onClick={() => {
//                   navigate(item.path);
//                   if (closeMobileMenu) closeMobileMenu();
//                 }}
//               >
//                 <Icon className="w-5 h-5 flex-shrink-0" />
//                 {!collapsed && (
//                   <span className="text-sm whitespace-nowrap">{item.label}</span>
//                 )}
//               </button>
              
//               {!collapsed && isActive && (
//                 <div className="w-1.5 h-7.5 bg-teal-600 rounded-l-xl" />
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
