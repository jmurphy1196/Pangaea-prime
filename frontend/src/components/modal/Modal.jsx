// Modal.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button id='close-modal' onClick={onClose}>
          <FontAwesomeIcon icon={faX} />
        </button>
        {children}
      </div>
    </div>
  );
};
