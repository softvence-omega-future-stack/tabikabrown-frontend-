import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen px-5 py-3 overflow-hidden flex flex-col">
      
      {/* Blue Background Shape */}
      <div 
        className="absolute top-0 left-0 w-full bg-[#8B78F6] z-0" 
        style={{ 
          height: '547px', 
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' 
        }} 
      />

      {/* Header - Full Width at Top */}
      <div className="relative z-10 ">
        <Header  onMenuClick={() => setIsMobileMenuOpen(true)}/>
      </div>

      {/* Sidebar and Main Content Container */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block relative z-50">
          <Sidebar />
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white z-50 md:hidden
          transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "280px" }}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full md:pl-5 pb-6 relative z-10">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;






// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../Component/Sidebar";
// import Header from "../Component/Header";



// const DashboardLayout = () => {
// //   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-[#F5F5F5] overflow-hidden">
      
    
//       <div
//         // className={`hidden md:block transition-all duration-300 ${
//         //   isSidebarCollapsed ? "w-20" : "w-64"
//         // }`}
//       >
//         <Sidebar
//         //   collapsed={isSidebarCollapsed}
//         //   onToggle={setIsSidebarCollapsed}
//         //   closeMobileMenu={() => {}}
//         />
//       </div>

 
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

   
//       <div
//         className={`fixed top-0 left-0 h-full bg-white z-50 md:hidden
//         transition-transform duration-300 ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         style={{ width: "280px" }}
//       >
//         <Sidebar
//         //   collapsed={false}
//         //   onToggle={() => {}}
//         //   closeMobileMenu={() => setIsMobileMenuOpen(false)}
//         />
//       </div>


//       <div className="flex-1 flex flex-col min-h-screen w-full min-w-0">
//         <Header
//         //   onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
//         //   isSidebarCollapsed={isSidebarCollapsed}
//         //   onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//         />
        
//         <main className="flex-1 overflow-y-auto w-full p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;






// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//   return (
//     <div className="flex">
//       {/* Sidebar here */}

//       <div className="flex">
//         <aside className="w-70">
//           <Sidebar />
//         </aside>
//       </div>
//       <main className="flex-1 ">
//         <Header />
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
