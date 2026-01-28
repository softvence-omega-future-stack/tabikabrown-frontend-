import { useNavigate } from "react-router-dom";
import bgImg from "../../public/images/bgImage.png";

const ForgetPassword = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full flex justify-center bg-white rounded-lg p-1 md:p-4">
      <div
        className="w-full flex  max-w-[1800px] rounded-xl bg-cover bg-center  items-center justify-center "
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* FORM CARD */}
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl m-2 p-3 md:p-6">
       <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[130%]">Forgot Password!</h2>
              <p className="text-gray-700 text-base font-normal leading-6 mt-2">Do you forgot your password. It’s ease to reset, just provide your email address. We’ll send you a OTP code.</p>
            </div>

          <form className="mt-6 block space-y-4">
               <div>
                <label className="block text-sm md:text-base font-normal leading-6 text-gray-800 mb-2">E-mail :</label>
                <input 
                  type="email" 
                  placeholder="e.g. example@email.com" 
                  className="w-full px-4 py-3 rounded-xl text-gray-500 leading-5 bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c6ff6] focus:border-transparent text-sm transition-all"
                />
              </div>

         <div className="flex items-center gap-2">
               <button
             
             onClick={()=> navigate('/otp')}
              className="w-full bg-activeBtnColor cursor-pointer text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send OTP
            </button>
            <button className="w-full bg-blue-50 cursor-pointer text-activeBtnColor   py-3 rounded-lg font-semibold hover:opacity-90 transition">Cancel</button>
         </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
