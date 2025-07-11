import { useState } from "react";
import { X, Mail, CheckCircle, AlertTriangle, Info, Check } from "lucide-react";
import type { ModalType } from "../../constants/constants";

interface ActionButton {
  text: string;
  onClick: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: ModalType;
  email?: string;
  actionButton?: ActionButton;
  showSuccessMessage?: boolean;
  successMessage?: string;
  closeButtonText?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  type,
  email,
  actionButton,
  showSuccessMessage = false,
  successMessage = "Action completed successfully!",
  closeButtonText = "Close"
}: ConfirmationModalProps) {
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAction = async () => {
    if (actionButton?.onClick) {
      setIsActionLoading(true);
      try {
        await actionButton.onClick();
        if (showSuccessMessage) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }
      } catch (error) {
        console.error("Action failed:", error);
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  const getIconConfig = () => {
    switch (type) {
      case 'email':
        return { icon: Mail, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' };
      case 'success':
        return { icon: CheckCircle, bgColor: 'bg-green-100', iconColor: 'text-green-600' };
      case 'warning':
        return { icon: AlertTriangle, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' };
      case 'info':
        return { icon: Info, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' };
      default:
        return { icon: Info, bgColor: 'bg-gray-100', iconColor: 'text-gray-600' };
    }
  };

  const getButtonStyles = (variant: string = 'primary') => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  if (!isOpen) return null;

  const { icon: Icon, bgColor, iconColor } = getIconConfig();

  return (
    <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">

        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="mb-4">
            <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-8 h-8 ${iconColor}`} />
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {message}
            </p>
            {email && (
              <p className="font-medium text-gray-800 bg-gray-100 px-3 py-2 rounded-md text-sm break-all">
                {email}
              </p>
            )}
          </div>

          {actionButton && (
            <div className="space-y-3 mb-4">
              {showSuccess ? (
                <div className="flex items-center justify-center text-green-600 text-sm">
                  <Check className="w-4 h-4 mr-2" />
                  {successMessage}
                </div>
              ) : (
                <button
                  onClick={handleAction}
                  disabled={isActionLoading}
                  className={`${getButtonStyles(actionButton.variant)} px-4 py-2 rounded-md font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                >
                  {isActionLoading ? "Loading..." : actionButton.text}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-md transition-colors"
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}