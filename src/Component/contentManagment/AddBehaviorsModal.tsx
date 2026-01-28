import { ChevronDown, FileCheck, User, X } from "lucide-react";
import { useState } from "react";
import BehaviorDetailsTab from "./BehaviorsDetailsTab";

// Behavior Interface - Must match BehaviorList
interface Behavior {
  id: string;
  name: string;
  category?: string;
  description: string;
  protocolsCount: number;
  rootCausesCount: number;
  supplementsCount: number;
}

export interface SupplementDetails {
  image: string | null;
  worksWith: string[];
  avoidWith: string[];
  primaryBenefits: string;
  childrenDosage: string;
  adultDosage: string;
  sideEffects: string;
}

type ModalTab = "basic" | "details";

type Props = {
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: Behavior | null;
  onSave: (data: Omit<Behavior, 'id'> & { id?: string }) => void;
};

const AddBehaviorsModal: React.FC<Props> = ({
  onClose,
  mode,
  initialData,
  onSave,
}) => {
  const [modalTab, setModalTab] = useState<ModalTab>("basic");

  const [title, setTitle] = useState(() =>
    mode === "edit" && initialData ? initialData.name : ""
  );
  const [category, setCategory] = useState(() =>
    mode === "edit" && initialData ? initialData.category || "Sensory" : "Sensory"
  );
  const [description, setDescription] = useState(() =>
    mode === "edit" && initialData ? initialData.description || "" : ""
  );
  const [protocolsCount, setProtocolsCount] = useState(() =>
    mode === "edit" && initialData ? initialData.protocolsCount : 2
  );
  const [rootCausesCount, setRootCausesCount] = useState(() =>
    mode === "edit" && initialData ? initialData.rootCausesCount : 4
  );
  const [supplementsCount, setSupplementsCount] = useState(() =>
    mode === "edit" && initialData ? initialData.supplementsCount : 2
  );

  const [details, setDetails] = useState<SupplementDetails>({
    image: null,
    worksWith: [],
    avoidWith: [],
    primaryBenefits: "",
    childrenDosage: "",
    adultDosage: "",
    sideEffects: "",
  });

  const handleNext = () => {
    if (modalTab === "basic") {
      setModalTab("details");
      return;
    }

    const payload = {
      ...(mode === "edit" && initialData?.id ? { id: initialData.id } : {}),
      name: title,
      category,
      description,
      protocolsCount,
      rootCausesCount,
      supplementsCount,
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-medium">
              {mode === "add" ? "Add New Behavior" : "Edit Behavior"}
            </h2>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-blue-100 rounded-full p-2 flex gap-2">
          <button
            onClick={() => setModalTab("basic")}
            className={`flex-1 py-2 rounded-full cursor-pointer ${
              modalTab === "basic" && "bg-violet-200"
            }`}
          >
            <User className="inline w-4 h-4 mr-1" />
            Basic
          </button>

          <button
            onClick={() => setModalTab("details")}
            className={`flex-1 py-2 rounded-full cursor-pointer ${
              modalTab === "details" && "bg-violet-200"
            }`}
          >
            <FileCheck className="inline w-4 h-4 mr-1" />
            Details
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {modalTab === "basic" ? (
            <div className="space-y-4">
              {/* Behavior Name */}
              <div>
                <label className="block mb-1 font-medium">Behavior Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter behavior name"
                  className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <label className="block mb-1 font-medium">Behavior Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 appearance-none bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sensory">Sensory</option>
                  <option value="Emotional">Emotional</option>
                  <option value="Physical">Physical</option>
                  <option value="Digestive">Digestive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 text-gray-500 pointer-events-none cursor-pointer" size={20} />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 font-medium">Behavior Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Enter short description"
                  className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Protocols Count */}
              <div>
                <label className="block mb-1 font-medium">Suggested Protocols Count</label>
                <input
                  type="number"
                  value={protocolsCount}
                  onChange={(e) => setProtocolsCount(parseInt(e.target.value) || 0)}
                  placeholder="Enter count"
                  className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Root Causes Count */}
              <div>
                <label className="block mb-1 font-medium">Root Causes Count</label>
                <input
                  type="number"
                  value={rootCausesCount}
                  onChange={(e) => setRootCausesCount(parseInt(e.target.value) || 0)}
                  placeholder="Enter count"
                  className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Supplements Count */}
              <div>
                <label className="block mb-1 font-medium">Supplements Count</label>
                <input
                  type="number"
                  value={supplementsCount}
                  onChange={(e) => setSupplementsCount(parseInt(e.target.value) || 0)}
                  placeholder="Enter count"
                  className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <BehaviorDetailsTab
              value={details}
              onChange={setDetails}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleNext}
            className="bg-violet-500 text-white px-6 py-3 rounded-xl cursor-pointer"
          >
            {modalTab === "basic"
              ? "Next"
              : mode === "add"
              ? "Publish Behavior"
              : "Update"}
          </button>

          <button
            onClick={onClose}
            className="border px-6 py-3 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBehaviorsModal;



// import { ChevronDown, FileCheck, User, X } from "lucide-react";
// import { useState } from "react";


// import BehaviorDetailsTab from "./BehaviorsDetailsTab";

// type ModalTab = "basic" | "details";

// export interface SupplementDetails {
//   image: string | null;
//   worksWith: string[];
//   avoidWith: string[];
//   primaryBenefits: string;
//   childrenDosage: string;
//   adultDosage: string;
//   sideEffects: string;
// }

// type Props = {
//   onClose: () => void;
//   mode: "add" | "edit";
//   initialData?: {
//     id: number;
//     name: string;
//     category?: string;
//     description: string;
    
//   } & Partial<SupplementDetails> | null;
// };

// const AddBehaviorsModal: React.FC<Props> = ({
//   onClose,
//   mode,
//   initialData,
// }) => {
//   const [modalTab, setModalTab] = useState<ModalTab>("basic");

//   // ✅ Updated: Prefill for edit mode
//   const [title, setTitle] = useState(() =>
//     mode === "edit" && initialData ? initialData.name : ""
//   );
//   const [category, setCategory] = useState(() =>
//     mode === "edit" && initialData ? initialData.category || "Behavioral" : "Behavioral"
//   );
//   const [description, setDescription] = useState(() =>
//     mode === "edit" && initialData ? initialData.description || "" : ""
//   );

//   // ✅ DETAILS STATE
//   const [details, setDetails] = useState<SupplementDetails>(() => ({
//     image: initialData?.image ?? null,
//     worksWith: initialData?.worksWith ?? [],
//     avoidWith: initialData?.avoidWith ?? [],
//     primaryBenefits: initialData?.primaryBenefits ?? "",
//     childrenDosage: initialData?.childrenDosage ?? "",
//     adultDosage: initialData?.adultDosage ?? "",
//     sideEffects: initialData?.sideEffects ?? "",
//   }));

//   const handleNext = () => {
//     if (modalTab === "basic") {
//       setModalTab("details");
//       return;
//     }

//     const payload = {
//       name: title,
//       category,
//       description,
//       ...details,
//     };

//     if (mode === "add") {
//       console.log("ADD PROTOCOL", payload);
//     } else {
//       console.log("EDIT PROTOCOL", {
//         id: initialData?.id,
//         ...payload,
//       });
//     }

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <h2 className="text-xl font-medium">
//               {mode === "add" ? "Add New Behavior" : "Edit Behavior"}
//             </h2>
//           </div>
//           <button onClick={onClose}>
//             <X />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="bg-blue-100 rounded-full p-2 flex gap-2">
//           <button
//             onClick={() => setModalTab("basic")}
//             className={`flex-1 py-2 rounded-full cursor-pointer ${
//               modalTab === "basic" && "bg-violet-200"
//             }`}
//           >
//             <User className="inline w-4 h-4 mr-1" />
//             Basic
//           </button>

//           <button
//             onClick={() => setModalTab("details")}
//             className={`flex-1 py-2 rounded-full cursor-pointer ${
//               modalTab === "details" && "bg-violet-200"
//             }`}
//           >
//             <FileCheck className="inline w-4 h-4 mr-1" />
//             Details
//           </button>
//         </div>

//         {/* Content */}
//         <div className="mt-6">
//           {modalTab === "basic" ? (
//             <div className="space-y-4">
//               {/* Protocol Name */}
//               <div>
//                 <label className="block mb-1 font-medium">Behavior Name</label>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Enter protocol name"
//                   className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Category */}
//               <div className="relative">
//                 <label className="block mb-1 font-medium">Behavior Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full p-3 appearance-none bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="Sensory">Sensory</option>
//                   <option value="Emotional">Emotional</option>
//                   <option value="Physical">Physical</option>
//                   <option value="Digestive">Digestive</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 mt-4 -translate-y-1/2 text-gray-500 pointer-events-none cursor-pointer" size={20} />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block mb-1 font-medium"> Behavior Description</label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={4}
//                   placeholder="Enter short description"
//                   className="w-full p-3 bg-blue-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           ) : (
//             <BehaviorDetailsTab
//               value={details}
//               onChange={setDetails}
//             />
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex gap-3 mt-6">
//           <button
//             onClick={handleNext}
//             className="bg-violet-500 text-white px-6 py-3 rounded-xl cursor-pointer"
//           >
//             {modalTab === "basic"
//               ? "Next"
//               : mode === "add"
//               ? "Publish Behavior"
//               : "Update"}
//           </button>

//           <button
//             onClick={onClose}
//             className="border px-6 py-3 rounded-xl cursor-pointer"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddBehaviorsModal;