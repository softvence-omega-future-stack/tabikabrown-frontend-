import { useNavigate } from "react-router-dom";
import bgImg from "../../public/images/bgImage.png";

const ResetPassword = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full flex justify-center bg-white p-1 md:p-4">
      <div
        className="w-full flex  max-w-[1800px] rounded-xl bg-cover bg-center  items-center justify-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* FORM CARD */}
        <div className="w-full max-w-137 bg-white rounded-2xl shadow-xl m-2 p-3 md:p-6">
       <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[130%]">Reset Password</h2>
              <p className="text-gray-700 text-base font-normal leading-6 mt-2 mb-8">You are all set.
Now it’s time to create a new password.</p>

              
            </div>

          <form className="mt-6 block space-y-4">
                 <div>
                <label className="block text-sm md:text-base font-normal leading-6 text-gray-800 mb-2">Password:</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Type your password" 
                    className="w-full px-4 py-3 text-gray-500 leading-5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c6ff6] focus:border-transparent text-sm transition-all"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7c6ff6] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
                    <div>
                <label className="block text-sm md:text-base font-normal leading-6 text-gray-800 mb-2">Confirm Password:</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Type your password" 
                    className="w-full px-4 py-3 text-gray-500 leading-5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c6ff6] focus:border-transparent text-sm transition-all"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#7c6ff6] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

            <div>
                <p className="text-base font-semibold text-activeBtnColor  text-center mb-8">Resend</p>
            </div>

         <div className="flex items-center gap-2">
               <button
               onClick={()=> navigate('/login')}
              className="w-full bg-activeBtnColor cursor-pointer text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
             Reset
            </button>
            {/* <button className="w-full bg-blue-50 cursor-pointer text-activeBtnColor   py-3 rounded-lg font-semibold hover:opacity-90 transition">Cancel</button> */}
         </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
