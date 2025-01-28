import { useState } from "react";

export const ConnectWallet = ({ onConnect }) => {
  const [connecting, setConnecting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = ({ title, description, variant = "success" }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000); // Toast จะหายไปหลัง 3 วินาที
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      showToast({
        title: "Metamask not found",
        description: "Please install Metamask to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      setConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        onConnect(accounts[0]);
        showToast({
          title: "Connected!",
          description: "Your wallet has been connected successfully.",
        });
      }
    } catch (error) {
      showToast({
        title: "Connection failed",
        description: "Failed to connect to your wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div>
      {/* ปุ่ม Connect Wallet */}
      <button
        onClick={connectWallet}
        disabled={connecting}
        className={`${
          connecting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-6 rounded-lg`}
      >
        {connecting ? "Connecting..." : "Connect Wallet"}
      </button>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg shadow-lg ${
            toast.variant === "destructive" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <h4 className="font-bold">{toast.title}</h4>
          <p>{toast.description}</p>
        </div>
      )}
    </div>
  );
};
