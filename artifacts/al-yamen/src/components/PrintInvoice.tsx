import { X, Printer } from "lucide-react";
import type { Order } from "@/context/AppContext";

interface Props {
  order: Order;
  onClose: () => void;
}

export default function PrintInvoice({ order, onClose }: Props) {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Screen overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>
        <div className="glass-panel rounded-2xl w-full max-w-lg overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 print:hidden">
            <h3 className="text-white font-semibold text-sm">Invoice Preview</h3>
            <div className="flex items-center gap-2">
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-medium transition shadow-lg shadow-sky-500/25">
                <Printer size={13} /> Print Invoice
              </button>
              <button onClick={onClose} className="text-white/30 hover:text-white transition p-1.5 hover:bg-white/5 rounded-lg">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Invoice content - styled for both screen and print */}
          <div className="bg-white text-gray-900 p-8 print:p-0" id="invoice-print-area">
            {/* Company header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-wider uppercase text-gray-900">AL-YAMEN</h1>
                <p className="text-xs text-gray-500 mt-0.5">Management System</p>
                <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                  <p>Dhaka, Bangladesh</p>
                  <p>admin@al-yamen.com</p>
                  <p>+880 1700-000000</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-sky-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold tracking-wider mb-3">
                  INVOICE
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p><span className="text-gray-400">Invoice #:</span> {order.id.replace("#", "")}</p>
                  <p><span className="text-gray-400">Date:</span> {order.date}</p>
                  <p><span className="text-gray-400">Status:</span>
                    <span className={`ml-1 font-semibold ${order.status === "delivered" ? "text-green-600" : order.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6" />

            {/* Bill To */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Bill To</p>
              <p className="text-base font-bold text-gray-900">{order.customer}</p>
              <p className="text-sm text-gray-600">{order.phone}</p>
              <p className="text-sm text-gray-600">{order.address}</p>
            </div>

            {/* Items table */}
            <table className="w-full mb-6" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f0f9ff", borderBottom: "2px solid #0ea5e9" }}>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">#</th>
                  <th className="text-left py-2.5 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">Description</th>
                  <th className="text-center py-2.5 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">Qty</th>
                  <th className="text-right py-2.5 px-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td className="py-3 px-3 text-sm text-gray-500">1</td>
                  <td className="py-3 px-3 text-sm text-gray-800 font-medium">{order.product}</td>
                  <td className="py-3 px-3 text-sm text-gray-600 text-center">{order.quantity}</td>
                  <td className="py-3 px-3 text-sm text-gray-900 font-semibold text-right">৳{order.total.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td colSpan={3} className="py-3 px-3 text-sm text-gray-500 text-right">Subtotal</td>
                  <td className="py-3 px-3 text-sm text-gray-800 font-medium text-right">৳{order.total.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td colSpan={3} className="py-3 px-3 text-sm text-gray-500 text-right">Delivery Charge</td>
                  <td className="py-3 px-3 text-sm text-green-600 font-medium text-right">FREE</td>
                </tr>
                <tr style={{ background: "#f0f9ff" }}>
                  <td colSpan={3} className="py-3 px-3 text-sm font-bold text-gray-900 text-right">TOTAL</td>
                  <td className="py-3 px-3 text-base font-bold text-sky-600 text-right">৳{order.total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Footer note */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-400 text-center mb-2">Thank you for your order!</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Generated by AL-YAMEN Management System</span>
                <span>{new Date().toLocaleDateString("en-GB")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #invoice-print-area { display: block !important; position: fixed; inset: 0; background: white; padding: 40px; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}
