import { LogOut, Menu } from 'lucide-react';
import logo from '../../public/images/logo.png'
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate()
  return (
  <header className="sticky top-0 z-50 flex items-center justify-between py-2.5 px-5 bg-[#FFFFFF33] backdrop-blur-md text-white rounded-[10px]">

      <div className="flex items-center gap-3 md:gap-10">
        {/* Mobile Menu Toggle */}
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-white/10 rounded-lg">
          <Menu size={24} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="l">
             {/* Replace with your logo SVG */}
            <img src={logo} alt="" />
          </div>
       
        </div>

        <div className="hidden sm:block ml-8">
          <h1 className=":text-base md:text-lg text-white font-semibold opacity-90 leading-[150%]">M.A.L.I. Admin Panel</h1>
          <p className="text-sm font-normal text-white opacity-70 leading-6">Welcome, System Administrator</p>
        </div>
      </div>

      <button onClick={()=> navigate('/')} className="flex items-center gap-2 bg-activeBtnColor hover:bg-[#8B78F6] px-4 py-2 rounded-[10px] text-sm leading-6 font-semibold font-inter cursor-pointer transition-colors">
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header