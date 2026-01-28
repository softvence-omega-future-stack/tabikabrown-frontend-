import { useState } from 'react';
import { X, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Link, Code } from 'lucide-react';

// ✅ Props interface যোগ করা হলো
export interface SupplementDetails {
  image: string | null;
  worksWith: string[];
  avoidWith: string[];
  primaryBenefits: string;
  childrenDosage: string;
  adultDosage: string;
  sideEffects: string;
}

interface ProtocolDetailsTabProps {
  value: SupplementDetails;
  onChange: (details: SupplementDetails) => void;
}

const Tag = ({ label, onRemove }: { label: string, onRemove: () => void }) => (
  <span className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-md text-sm text-gray-700">
    {label}
    <button onClick={onRemove} className="text-red-400 hover:text-red-600 transition-colors">
      <X size={14} />
    </button>
  </span>
);

const InputField = ({ placeholder, onAdd }: { placeholder: string, onAdd: (val: string) => void }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full bg-[#EBF2FF] border-none rounded-lg px-4 py-3 text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
    onKeyDown={(e) => {
      if (e.key === 'Enter' && e.currentTarget.value) {
        e.preventDefault(); 
        onAdd(e.currentTarget.value);
        e.currentTarget.value = '';
      }
    }}
  />
);

// ✅ Props receive করা হচ্ছে
const ProtocolDetailsTab: React.FC<ProtocolDetailsTabProps> = () => {
  const [symptoms, setSymptoms] = useState(['Low muscle tone', 'Sensory processing issues']);
  const [labs, setLabs] = useState(['Comprehensive Stool Analysis', 'Organic Acids Test']);
  const [supplements, setSupplements] = useState(['Probiotics', 'Digestive Enzymes']);
  const [addFoods, setAddFoods] = useState(['Bone', 'Fermented foods']);
  const [removeFoods, setRemoveFoods] = useState(['Gluten', 'Sugar', 'Dairy']);
  const [healingText, setHealingText] = useState("");

  return (
    <div className="text-[#333]">
      <div className="space-y-8">
        
        {/* Symptoms Addressed */}
        <section>
          <label className="block text-sm font-semibold mb-3">Symptoms Addressed</label>
          <InputField 
            placeholder="Add symptoms this protocol supports" 
            onAdd={(val) => setSymptoms([...symptoms, val])} 
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {symptoms.map(s => (
              <Tag key={s} label={s} onRemove={() => setSymptoms(symptoms.filter(i => i !== s))} />
            ))}
          </div>
        </section>

        {/* Healing Approach / Overview */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold">Healing Approach / Overview</label>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-black">
              <Code size={14} /> Plain Text
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-white">
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><Bold size={18} className="text-gray-600" /></button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><Italic size={18} className="text-gray-600" /></button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><Underline size={18} className="text-gray-600" /></button>
              <div className="w-[1px] h-6 bg-gray-200 mx-1" />
              <button type="button" className="p-2 hover:bg-gray-100 rounded font-bold text-gray-600">H1</button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded font-bold text-gray-600">H2</button>
              <div className="w-[1px] h-6 bg-gray-200 mx-1" />
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><List size={18} className="text-gray-600" /></button>
              <div className="w-[1px] h-6 bg-gray-200 mx-1" />
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><AlignLeft size={18} className="text-gray-600" /></button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><AlignCenter size={18} className="text-gray-600" /></button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><AlignRight size={18} className="text-gray-600" /></button>
              <div className="w-[1px] h-6 bg-gray-200 mx-1" />
              <button type="button" className="p-2 hover:bg-gray-100 rounded"><Link size={18} className="text-gray-600" /></button>
            </div>
            <textarea
              className="w-full p-4 min-h-[150px] bg-[#EBF2FF]/30 outline-none text-sm placeholder-gray-400"
              placeholder="Describe the factors that may influence this behaviour"
              value={healingText}
              onChange={(e) => setHealingText(e.target.value)}
            />
          </div>
        </section>

        {/* Recommended Labs */}
        <section>
          <label className="block text-sm font-semibold mb-3">Recommended Labs</label>
          <InputField 
            placeholder="Add symptoms this protocol supports" 
            onAdd={(val) => setLabs([...labs, val])} 
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {labs.map(l => (
              <Tag key={l} label={l} onRemove={() => setLabs(labs.filter(i => i !== l))} />
            ))}
          </div>
        </section>

        {/* Key Supplements */}
        <section>
          <label className="block text-sm font-semibold mb-3">Key Supplements</label>
          <InputField 
            placeholder="List recommended supplements" 
            onAdd={(val) => setSupplements([...supplements, val])} 
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {supplements.map(s => (
              <Tag key={s} label={s} onRemove={() => setSupplements(supplements.filter(i => i !== s))} />
            ))}
          </div>
        </section>

        {/* Dietary Changes */}
        <section>
          <label className="block text-sm font-semibold mb-3">Dietary Changes</label>
          <div className="border border-[#EBF2FF] rounded-xl p-4 md:p-6 space-y-6">
            <div>
              <InputField placeholder="Add Foods" onAdd={(val) => setAddFoods([...addFoods, val])} />
              <div className="flex flex-wrap gap-2 mt-3">
                {addFoods.map(f => (
                  <Tag key={f} label={f} onRemove={() => setAddFoods(addFoods.filter(i => i !== f))} />
                ))}
              </div>
            </div>
            <div>
              <InputField placeholder="Remove Foods" onAdd={(val) => setRemoveFoods([...removeFoods, val])} />
              <div className="flex flex-wrap gap-2 mt-3">
                {removeFoods.map(f => (
                  <Tag key={f} label={f} onRemove={() => setRemoveFoods(removeFoods.filter(i => i !== f))} />
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProtocolDetailsTab;







// import { useState } from 'react';
// import { X, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Link, Code } from 'lucide-react';


// const Tag = ({ label, onRemove }: { label: string, onRemove: () => void }) => (
//   <span className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-md text-sm text-gray-700">
//     {label}
//     <button onClick={onRemove} className="text-red-400 hover:text-red-600 transition-colors">
//       <X size={14} />
//     </button>
//   </span>
// );

// const InputField = ({ placeholder, onAdd }: { placeholder: string, onAdd: (val: string) => void }) => (
//   <input
//     type="text"
//     placeholder={placeholder}
//     className="w-full bg-[#EBF2FF] border-none rounded-lg px-4 py-3 text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
//     onKeyDown={(e) => {
//       if (e.key === 'Enter' && e.currentTarget.value) {
//         e.preventDefault(); 
//         onAdd(e.currentTarget.value);
//         e.currentTarget.value = '';
//       }
//     }}
//   />
// );

// const ProtocolDetailsTab = () => {
//   // States
//   const [symptoms, setSymptoms] = useState(['Low muscle tone', 'Sensory processing issues']);
//   const [labs, setLabs] = useState(['Comprehensive Stool Analysis', 'Organic Acids Test']);
//   const [supplements, setSupplements] = useState(['Probiotics', 'Digestive Enzymes']);
//   const [addFoods, setAddFoods] = useState(['Bone', 'Fermented foods']);
//   const [removeFoods, setRemoveFoods] = useState(['Gluten', 'Sugar', 'Dairy']);
//   const [healingText, setHealingText] = useState("");

//   return (
//     <div className=" text-[#333]">
//       <div className="space-y-8">
        
//         {/* Symptoms Addressed */}
//         <section>
//           <label className="block text-sm font-semibold mb-3">Symptoms Addressed</label>
//           <InputField 
//             placeholder="Add symptoms this protocol supports" 
//             onAdd={(val) => setSymptoms([...symptoms, val])} 
//           />
//           <div className="flex flex-wrap gap-2 mt-3">
//             {symptoms.map(s => (
//               <Tag key={s} label={s} onRemove={() => setSymptoms(symptoms.filter(i => i !== s))} />
//             ))}
//           </div>
//         </section>

//         {/* Healing Approach / Overview */}
//         <section>
//           <div className="flex justify-between items-center mb-3">
//             <label className="text-sm font-semibold">Healing Approach / Overview</label>
//             <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-black">
//               <Code size={14} /> Plain Text
//             </button>
//           </div>
//           <div className="border border-gray-200 rounded-lg overflow-hidden">
//             <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-white">
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><Bold size={18} className="text-gray-600" /></button>
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><Italic size={18} className="text-gray-600" /></button>
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><Underline size={18} className="text-gray-600" /></button>
//               <div className="w-[1px] h-6 bg-gray-200 mx-1" />
//               <button type="button" className="p-2 hover:bg-gray-100 rounded font-bold text-gray-600">H1</button>
//               <button type="button" className="p-2 hover:bg-gray-100 rounded font-bold text-gray-600">H2</button>
//               <div className="w-[1px] h-6 bg-gray-200 mx-1" />
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><List size={18} className="text-gray-600" /></button>
//               <div className="w-[1px] h-6 bg-gray-200 mx-1" />
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><AlignLeft size={18} className="text-gray-600" /></button>
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><AlignCenter size={18} className="text-gray-600" /></button>
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><AlignRight size={18} className="text-gray-600" /></button>
//               <div className="w-[1px] h-6 bg-gray-200 mx-1" />
//               <button type="button" className="p-2 hover:bg-gray-100 rounded"><Link size={18} className="text-gray-600" /></button>
//             </div>
//             <textarea
//               className="w-full p-4 min-h-[150px] bg-[#EBF2FF]/30 outline-none text-sm placeholder-gray-400"
//               placeholder="Describe the factors that may influence this behaviour"
//               value={healingText}
//               onChange={(e) => setHealingText(e.target.value)}
//             />
//           </div>
//         </section>

//         {/* Recommended Labs */}
//         <section>
//           <label className="block text-sm font-semibold mb-3">Recommended Labs</label>
//           <InputField 
//             placeholder="Add symptoms this protocol supports" 
//             onAdd={(val) => setLabs([...labs, val])} 
//           />
//           <div className="flex flex-wrap gap-2 mt-3">
//             {labs.map(l => (
//               <Tag key={l} label={l} onRemove={() => setLabs(labs.filter(i => i !== l))} />
//             ))}
//           </div>
//         </section>

//         {/* Key Supplements */}
//         <section>
//           <label className="block text-sm font-semibold mb-3">Key Supplements</label>
//           <InputField 
//             placeholder="List recommended supplements" 
//             onAdd={(val) => setSupplements([...supplements, val])} 
//           />
//           <div className="flex flex-wrap gap-2 mt-3">
//             {supplements.map(s => (
//               <Tag key={s} label={s} onRemove={() => setSupplements(supplements.filter(i => i !== s))} />
//             ))}
//           </div>
//         </section>

//         {/* Dietary Changes */}
//         <section>
//           <label className="block text-sm font-semibold mb-3">Dietary Changes</label>
//           <div className="border border-[#EBF2FF] rounded-xl p-4 md:p-6 space-y-6">
//             <div>
//               <InputField placeholder="Add Foods" onAdd={(val) => setAddFoods([...addFoods, val])} />
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {addFoods.map(f => (
//                   <Tag key={f} label={f} onRemove={() => setAddFoods(addFoods.filter(i => i !== f))} />
//                 ))}
//               </div>
//             </div>
//             <div>
//               <InputField placeholder="Remove Foods" onAdd={(val) => setRemoveFoods([...removeFoods, val])} />
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {removeFoods.map(f => (
//                   <Tag key={f} label={f} onRemove={() => setRemoveFoods(removeFoods.filter(i => i !== f))} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>


//       </div>
//     </div>
//   );
// };

// export default ProtocolDetailsTab;