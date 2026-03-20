import { Dialog } from "@headlessui/react";
import "./ConfirmDialog.css";

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default", // "default" | "success" | "danger" | "warning"
}) {
  const icons = {
    success: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    danger: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    warning: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    default: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="cd-overlay">
      {/* Backdrop */}
      <div className="cd-backdrop" aria-hidden="true" />

      {/* Panel */}
      <div className="cd-wrapper">
        <Dialog.Panel className="cd-panel">

          {/* Icon */}
          <div className={`cd-icon cd-icon-${type}`}>
            {icons[type]}
          </div>

          {/* Title */}
          <Dialog.Title className="cd-title">{title}</Dialog.Title>

          {/* Message */}
          <Dialog.Description className="cd-message">
            {message}
          </Dialog.Description>

          {/* Buttons */}
          <div className="cd-btns">
            {onClose && (
              <button className="cd-btn-cancel" onClick={onClose}>
                {cancelText}
              </button>
            )}
            <button
              className={`cd-btn-confirm cd-btn-${type}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;