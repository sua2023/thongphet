// 'use client';
// import { ReactNode, createContext, useContext, useState } from "react";
// interface IModalContext {
//   isOpen: boolean;
//   openModal: () => void;
//   closeModal: () => void;
// }

// const ModalContext = createContext<IModalContext | undefined>(undefined);

// const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   return (
//     <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };

// const useModal = () => {
//   const context = useContext(ModalContext);

//   if (context === undefined) {
//     throw new Error("useModal must be used within a ModalProvider");
//   }
//   return context;
// };

// export { useModal, ModalProvider };
