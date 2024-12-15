import React, { useState } from 'react';
import axios from 'axios';
const backend_url="https://flipkart-grid-backend-2.onrender.com";

const HistoryPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState([]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backend_url}/products-history`);
            setHistoryData(res.data);
        } catch (error) {
            console.error('Error fetching history:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShowPopup = () => {
        setShowPopup(true);
        fetchHistory();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setHistoryData([]);
    };

    return (
        <div>
            {/* View History Button */}
            <div className='w-full flex justify-end'>
            <button
                onClick={handleShowPopup}
                className="bg-blue-500 text-white px-4 m-2 mr-5 py-2 rounded"
            >
                View History
            </button>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black    bg-opacity-50 z-50">
                    <div className="bg-[#242424] p-6 rounded-lg shadow-lg w-[70vw] overflow-y-scroll scrollbar-hide h-[60vh] relative">
                        {/* Close Button */}
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            &times;
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-xl font-bold mb-4 text-center">Products - History</h2>

                        {/* Loader */}
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                            </div>
                        ) : (
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                    <th className="border border-gray-300 px-4 py-2">SI no</th>
                                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                                        <th className="border border-gray-300 px-4 py-2">Brand</th>
                                        <th className="border border-gray-300 px-4 py-2">Count</th>
                                        <th className="border border-gray-300 px-4 py-2">MRP</th>
                                        <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Expired</th>
                                        
                                        <th className="border border-gray-300 px-4 py-2">Expected Life Span</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyData.map((product, index) => (
                                        <tr key={index}>
                                             <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.timestamp}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.product_name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.brand}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.product_count}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.MRP}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.expiry_date}
                                            </td>
                                              <td className="border border-gray-300 px-4 py-2">
                                                {product.is_expired}
                                            </td>
                                           
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.expected_life_span}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPopup;
