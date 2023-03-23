export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="absolute t-0 l-0 r-0 b-0 bg-black/30 z-50" />
      <div className="absolute top-[50%] left[50%] translate-[-50%, -50%] p-20 z-50 bg-white">
        <button
          className="p-1 mt-3 bg-orange-300 hover:bg-orange-200 cursor-pointer 
                              mx-auto rounded-lg border-2 border-stone-700 shadow-md"
          onClick={onClose}
        >
          Close Modal
        </button>
        {children}
      </div>
    </>
  );
}
