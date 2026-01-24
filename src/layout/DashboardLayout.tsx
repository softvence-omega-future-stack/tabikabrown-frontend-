import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Blue Background Shape - Fixed */}
      <div 
        className="fixed top-0 left-0 w-full bg-[#8B78F6] z-0 pointer-events-none" 
        style={{ 
          height: '547px', 
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' 
        }} 
      />

      {/* Header - Fixed at Top */}
      <header className="fixed top-0 left-0 right-0 z-40 px-5 py-3 bg-transparent">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)}/>
      </header>

      {/* Main Container with Sidebar and Content */}
      <div className="flex pt-20">
        
        {/* Desktop Sidebar - Fixed */}

<aside className="hidden md:block fixed left-0 top-20 w-72 z-30">
  <div className="h-[calc(100vh-80px)] overflow-y-auto px-5 py-6  shadow-lg">
    <Sidebar />
  </div>
</aside>


        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar - Slide from Left */}
        <aside
          className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 md:hidden
          transition-transform duration-300 ease-in-out shadow-xl
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full overflow-y-auto p-5">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <Sidebar />
          </div>
        </aside>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 md:ml-72 px-5 py-3 relative z-10">
          <div className="max-w-full">
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
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className=" min-h-screen px-5 py-3 overflow-hidden flex flex-col">
      
//       {/* Blue Background Shape */}
//       <div 
//         className="absolute top-0 left-0 w-full bg-[#8B78F6] z-0" 
//         style={{ 
//           height: '547px', 
//           clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' 
//         }} 
//       />

//       {/* Header - Full Width at Top */}
//       <div className="relative z-10 mb-6">
//         <Header  onMenuClick={() => setIsMobileMenuOpen(true)}/>
//       </div>

//       {/* Sidebar and Main Content Container */}
//       <div className="flex flex-1 overflow-hidden relative">
        
//         {/* Desktop Sidebar */}
//         <div className="hidden md:block relative z-50 min-h-screen">
//           <Sidebar />
//         </div>

//         {/* Mobile Menu Overlay */}
//         {isMobileMenuOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 z-40 md:hidden"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}

//         {/* Mobile Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full bg-white z-50 md:hidden
//           transition-transform duration-300 ${
//             isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//           style={{ width: "280px" }}
//         >
//           <Sidebar />
//         </div>

//         {/* Main Content Area */}
//         <main className="flex-1 o w-full md:pl-5 pb-6 relative z-10">
//           <div className="">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;






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
