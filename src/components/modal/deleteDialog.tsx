import { MouseEvent } from "react";

interface IDeleteTypes {
  isOpen: boolean;
  onClose: () => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteDialog({
  isOpen,
  onClick,
  onClose,
}: IDeleteTypes) {
  return (
    <>
      <div
        id="popup-modal"
        className={`${
          isOpen ? "flex" : "hidden" 
        } fixed overflow-y-auto overflow-x-hidden top-0 inset-x-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray700 bg-transparent hover:bg-gray300 hover:text-gray700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray300 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray700">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red hover:bg-red focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Yes, I&apos;m sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray700 focus:outline-none bg-white rounded-lg border border-gray300 hover:bg-gray100 hover:text-gray300 focus:z-10 focus:ring-4 focus:ring-gray300"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
