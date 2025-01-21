import React from "react";

interface IDelete {
  onSubmit?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteModal = ({ onSubmit, isOpen, onClose }: IDelete) => {
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
        <div className="fixed inset-0 z-40 bg-black bg-opacity-80  backdrop-blur-sm"></div>
      )}
      {isOpen && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div
            className="relative w-full max-w-md p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg bg-white shadow-lg">
              <button
                type="button"
                className="absolute top-3 right-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray200 hover:bg-gray300 hover:text-gray700"
                onClick={onClose}
              >
                <svg
                  className="h-3 w-3"
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

              {/* Modal content */}
              <div className="p-4 text-center md:p-5">
                <div className="py-3">
                  <svg
                    className="mx-auto mb-4 h-12 w-12 text-gray400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500">
                    Are you sure you want to delete?
                  </h3>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary"
                    onClick={onSubmit}
                  >
                    Yes, I&apos;m sure
                  </button>
                  <button
                    type="button"
                    className="ms-3 rounded-lg border border-gray300 bg-white px-5 py-2.5 text-sm font-medium text-gray700 hover:bg-gray100 hover:text-gray700 focus:outline-none focus:ring-1 focus:ring-red"
                    onClick={onClose}
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
