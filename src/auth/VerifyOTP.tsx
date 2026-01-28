import { useNavigate } from "react-router-dom";
import bgImg from "../../public/images/bgImage.png";

const VerifyOTP = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full flex justify-center bg-white p-1 md:p-4">
      <div
        className="w-full flex  max-w-[1800px] rounded-xl bg-cover bg-center  items-center justify-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* FORM CARD */}
        <div className="w-full max-w-137 bg-white rounded-2xl m-2 shadow-xl p-2 md:p-8">
       <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[130%]">Verify OTP</h2>
              <p className="text-gray-700 text-base font-normal leading-6 mt-2 mb-8">We have sent you a 6 digit OTP code to your provided <span className="text-black font-semibold">email: example@email.com</span> please input that code here to proceed.</p>

              <p className="text-red-500">2:59</p>
            </div>

          <form className="mt-6 block space-y-4">
                  <div className="flex justify-between md:px-12 gap-1 mb-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primaryColor"
                />
              ))}
            </div>

            <div>
                <p className="text-base font-semibold text-activeBtnColor  text-center mb-8">Resend</p>
            </div>

         <div className="flex items-center gap-2">
               <button
              onClick={()=> navigate('/reset_password')}
              className="w-full bg-activeBtnColor cursor-pointer text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
             Verify
            </button>
            <button className="w-full bg-blue-50 cursor-pointer text-activeBtnColor   py-3 rounded-lg font-semibold hover:opacity-90 transition">Cancel</button>
         </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
