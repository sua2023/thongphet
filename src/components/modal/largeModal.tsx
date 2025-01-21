import React from "react";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  hideClose?: boolean;
}

const LargeModal = ({ isOpen, onClose, children, hideClose }: IModal) => {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm"></div>
      )}
      {isOpen && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div
            className="w-full md:w-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg bg-white shadow-lg">
              {!hideClose && (
                <button
                  type="button"
                  className="absolute z-10 top-3 right-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-gray300 text-sm text-gray200 hover:bg-gray300 hover:text-gray700"
                  onClick={onClose}
                >
                  <svg
                    className="size-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              )}

              <div className="p-4 text-center md:p-5">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LargeModal;
