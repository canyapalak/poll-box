export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div>
      <button
        className="p-1 mt-3 bg-orange-300 hover:bg-orange-200 cursor-pointer 
                          mx-auto rounded-lg border-2 border-stone-700 shadow-md"
        onClick={onClose}
      >
        Close Modal
      </button>
      {children}
    </div>
  );
}
