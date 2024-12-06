import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import GradientWheel from './components/effect';
import ScanningLoader from './components/scan';
import './components/scanning.css'
import GradientWheel2 from './components/effect2';
import robot from './images/robot.jpeg'
import { MdOutlineFileUpload } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { TbWindowMinimize } from "react-icons/tb";
import { IoMdExpand } from "react-icons/io";

import imgflip from './images/flipkart2.jpg'



// New Structure: savedProducts now contains arrays of child objects (batches)
const savedProducts2 = [
  {
    batch: [
      {
        product_name: "Haldiram's Bhujia",
        category: "Snacks and Beverages",
        brand: "Haldiram's",
      },
      {
        product_name: "Lay's Magic Masala",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Britannia Good Day",
        category: "Snacks and Beverages",
        brand: "Britannia",
      },
    ],
  },
  {
    batch: [
      {
        product_name: "Lay's Magic Masala",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Haldiram's Bhujia",
        category: "Snacks and Beverages",
        brand: "Haldiram's",
      },
     
      {
        product_name: "Britannia Good Day",
        category: "Snacks and Beverages",
        brand: "Britannia",
      },
    ],
  },
  {
    batch: [
     
      {
        product_name: "Chocos Duet",
        category: "Snacks and Beverages",
        brand: "Kellogg's",
      },
    ],
  },
  {
    batch: [
     
      {
        product_name: "Chocos Duet",
        category: "Snacks and Beverages",
        brand: "Kellogg's",
      },
    ],
  },
  {
    batch: [
     
      {
        product_name: "Chocos Duet",
        category: "Snacks and Beverages",
        brand: "Kellogg's",
      },
    ],
  },
  {
    batch: [
     
      {
        product_name: "Chocos Duet",
        category: "Snacks and Beverages",
        brand: "Kellogg's",
      },
    ],
  },
  {
    batch: [
     
      {
        product_name: "Chocos Duet",
        category: "Snacks and Beverages",
        brand: "Kellogg's",
      },
    ],
  },
  
];












const savedProducts=[
  {
    batch: [
      {
        product_name: "Chocos Duet",
        category: "Packaged Food",
        brand: "Kelloggs",
      },
    ],
  },
  {
    batch: [
      {
        product_name: "Chocos Duet",
        category: "Packaged Food",
        brand: "Kelloggs",
      },
    ],
  },
  {
    batch: [
      {
        product_name: "Lay's Classic Salted",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Lay's Spanish Tomato Tango",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Lay's American Style Cream & Onion",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Lay's India's Magic Masala",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Orion Choco Pie",
        category: "Snacks and Beverages",
        brand: "Orion",
      },
      {
        product_name: "Britannia Pure Magic Choco Lush",
        category: "Snacks and Beverages",
        brand: "Britannia",
      },
      
    ],
  },


{
  batch: [
    {
      product_name: "Parachute 100% Pure Coconut Oil",
      category: "Personal Care",
      brand: "Parachute",
    },
    {
      product_name: "Pears Pure & Gentle Soap",
      category: "Personal Care",
      brand: "Pears",
    },
    {
      product_name: "Lux Creamy Perfection Plus White Rose",
      category: "Personal Care",
      brand: "Lux",
    },
  ],
},
{
  batch: [
    {
      product_name: "Neem Face Wash",
      category: "Personal Care",
      brand: "Himalaya",
    },
    {
      product_name: "Disinfectant Toilet Cleaner",
      category: "Household Care",
      brand: "Harpic",
    },
    {
      product_name: "Dettol Antiseptic Liquid",
      category: "Personal Care",
      brand: "Dettol",
    },
  ],
},

{
  batch: [
    {
      product_name: "NIVEA MEN DARK SPOT REDUCTION FACE WASH",
      category: "Personal Care",
      brand: "NIVEA",
    },
   {
      product_name: "NIVEA MEN ACNE FACE WASH",
      category: "Personal Care",
      brand: "NIVEA",
    },

    {
      product_name: "Head & Shoulders 2in1 ANTI-DANDRUFF SHAMPOO + CONDITIONER",
      category: "Personal Care",
      brand: "Head & Shoulders",
    },
    
  ],
},
{
  batch: [
    {
      product_name: "Lays cream and onion",
      category: "Snacks and Beverages",
      brand: "Lays"
    },
    {
      product_name: "kurkure Mast Masala ",
      category: "Snacks and Beverages",
      brand: "Kurkure",
    },
    {
      product_name: "Lays Spanish Tomato Tango",
      category: "Snacks and Beverages",
      brand: "Lays",
    },
  ],
},
{
  batch: [
    {
      product_name: "Lays ",
      category: "Packaged Food",
      brand: "Lay's",
    },
    {
      product_name: "Lay's  ",
      category: "Packaged Food",
      brand: "Lay’s",
    },
    {
      product_name: "Rin ",
      category: "Household Care",
      brand: "Rin",
    },
  ],
},
{
  batch: [
    {
      product_name: "Frooti",
      category: "Snacks and Beverages",
      brand: "Frooti",
    },
  ],
},



























  {
    batch: [
      {
        product_name: "Haldiram's Bhujia",
        category: "Snacks and Beverages",
        brand: "Haldiram's",
      },
      {
        product_name: "Lay's Magic Masala",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Britannia Good Day",
        category: "Snacks and Beverages",
        brand: "Britannia",
      },
    ],
  },
  {
    batch: [
      {
        product_name: "Lay's Magic Masala",
        category: "Snacks and Beverages",
        brand: "Lay's",
      },
      {
        product_name: "Haldiram's Bhujia",
        category: "Snacks and Beverages",
        brand: "Haldiram's",
      },
     
      {
        product_name: "Britannia Good Day",
        category: "Snacks and Beverages",
        brand: "Britannia",
      },
    ],
  },
  
  // {
  //   batch: [
  //     {
  //       product_name: "NIVEA MEN DARK SPOT REDUCTION FACE WASH",
  //       category: "Personal Care",
  //       brand: "NIVEA",
  //     },
  //    {
  //       product_name: "NIVEA MEN ACNE FACE WASH",
  //       category: "Personal Care",
  //       brand: "NIVEA",
  //     },

  //     {
  //       product_name: "Head & Shoulders 2in1 ANTI-DANDRUFF SHAMPOO + CONDITIONER",
  //       category: "Personal Care",
  //       brand: "Head & Shoulders",
  //     },
      
  //   ],
  // },



   

{
    batch: [
      {
        product_name: "Apple",
        category: "Fruits and Vegetables",
      },
       {
        product_name: "Banana",
        category: "Fruits and Vegetables",
      },
    ],
  },


];




const calculateSimilarity = (str1, str2) => {
  const cleanStr1 = str1.toLowerCase().trim();
  const cleanStr2 = str2.toLowerCase().trim();
  const longer = cleanStr1.length > cleanStr2.length ? cleanStr1 : cleanStr2;
  const shorter = cleanStr1.length > cleanStr2.length ? cleanStr2 : cleanStr1;
  const common = [...shorter].filter((char) => longer.includes(char)).length;
  return (common / longer.length) * 100;
};

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedResults, setSavedResults] = useState([]);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [allMatched, setAllMatched] = useState(false);
  const [image, setImage] = useState(null);
  const [animatep, setanimatep] = useState("relative");
  const [activeForm, setActiveForm] = useState('grocery');


  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0); // Track the current batch
  const webcamRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(file));
    setIsCameraOpen(false); // Close camera if a file is selected
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'captured_image.jpg', {
            type: 'image/jpeg',
          });
          setSelectedFile(file);
          setImage(URL.createObjectURL(file));
         
        
          setIsCameraOpen(false); // Close camera after capture
        })
        .catch((err) => console.error('Error capturing image:', err));
    }
  };

  useEffect(() => {
    if (response && response.product_details) {
      const allMatched = savedProducts[currentBatchIndex].batch.every((savedProduct) =>
        response.product_details.some((productFromResponse) =>
          isMatching(productFromResponse, savedProduct)
        )
      );
      setAllMatched(allMatched);
    }
  }, [response, currentBatchIndex]);

  const handleSubmit = async (event) => {
    setanimatep("loaderscan relative")
    handleNextBatch();
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select a file or capture an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
      
      console.log(res.data)
      setImage(null);
      setSavedResults((prevResults) => [
        { ...res.data, expanded: true, isNew: true }, // New element
        ...prevResults.map((item) => ({ ...item, isNew: false })), // Previous elements
      ]);
      
      setExpandedIndices((prevIndices) => [
        ...prevIndices,
        savedResults.length, // Automatically expand the new result
      ]);
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        setResponse(error.response.data);
      } else {
        setResponse('Error uploading file');
      }
    } finally {
      setLoading(false);
      setanimatep("relative")
     
    }
  };

  const isMatching = (productFromResponse, savedProduct) => {
    const nameSimilarity = calculateSimilarity(
      productFromResponse.product_name,
      savedProduct.product_name
    );
    const brandSimilarity = calculateSimilarity(
      productFromResponse.brand,
      savedProduct.brand
    );
    const categorySimilarity = calculateSimilarity(
      productFromResponse.category[0],
      savedProduct.category
    );

    return (
      nameSimilarity >= 30 && brandSimilarity >= 30 && categorySimilarity >= 30
    );
  };

  const toggleExpand = (index) => {
    setExpandedIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  const generateOrderNumber = () => Math.floor(Math.random() * 1000000);

  // Helper function to switch to the next batch of saved products
  const handleNextBatch = () => {
    if (currentBatchIndex < savedProducts.length - 1) {
      setCurrentBatchIndex(currentBatchIndex + 1);
    } else {
      alert("No more batches to display!");
    }
  };

  return (
    <div className="bg-[#0e0e0e] w-full  h-[100vh] ">
    <div className="max-w-7.5xl h-[100vh] mx-auto p-6 bg-[#1e1e1e] text-[#f0f0f0] flex rounded-lg shadow-md">

    <div className='flex flex-col pr-10 border-r-[1px] border-[#4d4d4d]'>
    <div className=' flex  mb-[5rem]'><img className='w-[10rem]' src={robot}></img> <h1 className="text-center text-2xl font-bold  ml-5 mt-5">Flipkart Grid 6.0</h1>
    
    
    </div>
   


   
    <div>
  <div className="flex justify-center mb-4">
    <button
      className={`px-[4rem] py-2  ${activeForm === 'grocery' ? 'border-b-[3px] border-blue-500 text-white' : ' text-[#6d6d6d]'} rounded-md`}
      onClick={() => setActiveForm('grocery')}
    >
      Grocery
    </button>
    
    <a
      className={`px-8 py-2 ${activeForm === 'fruits' ? 'border-b-[3px] border-blue-500 text-white' : ' text-[#6d6d6d]'} rounded-md`}
      href="https://huggingface.co/spaces/kriskeshav/Product_Classification"
      onClick={() => setActiveForm('fruits')}
    >
      Fruits and Veges
    </a>
  </div>

  {activeForm === 'grocery' && (
    <form onSubmit={handleSubmit} className="mb-6 flex mt-10 flex-col items-center">
    {/* <h1 className='m-2'>Grocery</h1> */}
    <div className="flex mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mr-4 bg-[#333] text-[#f0f0f0] border border-gray-600 rounded-md"
      />
      <button
        type="button"
        onClick={() => setIsCameraOpen(!isCameraOpen)}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        {isCameraOpen ? 'Close ' : <FaCamera />}
      </button>
    </div>
    {isCameraOpen && (
      <div className="mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-64 h-64 object-contain border border-gray-600"
        />
        <button
          type="button"
          onClick={handleCapture}
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Take Photo
        </button>
      </div>
    )}

{image && (
  <div>
    <div className={`${animatep}`} >
     {loading && <p className='absolute z-[100] left-[30%] top-[46%] text-[#fdfcfc] font-bold'>Scanning Image...</p>}
     
      <img src={image} className='z-[1] opacity-40'   alt="Selected" style={{ width: '300px', height: '300px' }} />
    </div>
     <button
     type="submit"
     className="px-4 mt-5 py-2 flex bg-blue-500 text-white rounded-md hover:bg-blue-600"
   >
     Upload <MdOutlineFileUpload className='mt-1 ml-2' />
   </button>
   </div>
  )}
   
  </form>
  )}

  {activeForm === 'fruits' && (
    <form onSubmit={handleSubmit} className="mb-6 flex mt-10 flex-col items-center">
    {/* <h1 className='m-2'>Fruits and veges</h1> */}
    <div className="flex mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mr-4 bg-[#333] text-[#f0f0f0] border border-gray-600 rounded-md"
      />
      <button
        type="button"
        onClick={() => setIsCameraOpen(!isCameraOpen)}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        {isCameraOpen ? 'Close' : <FaCamera />}
      </button>
    </div>
    {isCameraOpen && (
      <div className="mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-64 h-64 object-contain border border-gray-600"
        />
        <button
          type="button"
          onClick={handleCapture}
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Take Photo
        </button>
      </div>
    )}

{image && (
  <div>
    <div className={`${animatep}`} >
     {loading && <p className='absolute z-[100] left-[35%] top-[48%] text-[#fdfcfc] font-bold'>Scanning Image...</p>}
     
      <img src={image} className='z-[1] opacity-20'   alt="Selected" style={{ width: '300px', height: '300px' }} />
    </div>
     <button
     type="submit"
     className="px-4 mt-5 flex py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
   >
     Upload <MdOutlineFileUpload className='mt-1 ml-2' />
   </button>
   </div>
  )}
   
  </form>
  )}
</div>




     



{/* 
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
        <h1>grocery</h1>
        <div className="flex mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mr-4 bg-[#333] text-[#f0f0f0] border border-gray-600 rounded-md"
          />
          <button
            type="button"
            onClick={() => setIsCameraOpen(!isCameraOpen)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            {isCameraOpen ? 'Close Camera' : 'Capture from Camera'}
          </button>
        </div>
        {isCameraOpen && (
          <div className="mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-64 h-64 object-contain border border-gray-600"
            />
            <button
              type="button"
              onClick={handleCapture}
              className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Take Photo
            </button>
          </div>
        )}

{image && (
        <div className={`${animatep}`} >
         {loading && <p className='absolute z-[100] left-[35%] top-[48%] text-[#fdfcfc] font-bold'>Scanning Image...</p>}
         
          <img src={image} className='z-[1] opacity-20'   alt="Selected" style={{ width: '300px', height: '300px' }} />
        </div>
      )}
        <button
          type="submit"
          className="px-4 mt-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Upload and Predict
        </button>
      </form> */}














      </div>
     
     

      {loading && (
        <div className="flex justify-center items-center ">
          
         
         <GradientWheel2/>
         
        </div>
      )}

      {/* Render saved results */}
      <div className=" overflow-y-scroll">
        <img className='' src={imgflip}></img>
        {savedResults.map((result, index) => (
          <div key={index} className={result.isNew ? "border border-[#494949]  rounded-md m-4 " : "border border-gray-600  m-6 rounded-md"}>
            <div className="flex justify-between p-4 bg-[#2c2c2c]">
              <h3 className="font-bold">Order Number: {generateOrderNumber()}</h3>
              <button
                onClick={() => toggleExpand(index)}
                className="text-blue-400"
              >
                {expandedIndices.includes(index) ? <TbWindowMinimize className='text-[1.5rem]' /> : <IoMdExpand className='text-[1.5rem]'   />}
              </button>
            </div>

            {expandedIndices.includes(index) && (
              <div className="p-4 bg-[#333]">
                {/* Left and Right Section */}
                <div className="grid grid-cols-2 gap-8 ">
                  {/* Left Side: Image, Order Number, and Order Details */}
                  <div className="space-y-4 border-r-[1px] pr-4 border-gray-600">
                    {/* Uploaded Image */}
                    <div className="border-b-[1px] pb-4 border-gray-600">
                      {selectedFile && (
                        <div className="">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Uploaded"
                            className="w-64 h-64 object-contain mx-auto rounded-md"
                          />
                        </div>
                      )}
                    </div>

                    {/* Order Number */}
                    <div className="text-center border-b-[1px] border-gray-600 pb-4">
                      <h3 className="text-xl font-semibold">
                        Order Number: {generateOrderNumber()}
                      </h3>
                    </div>

                    {/* Order Details Table */}
                    <h4 className="text-lg font-semibold">Order Details</h4>
                    <table className="w-full table-auto border-collapse border  border-gray-600">
                      <thead>
                        <tr className="bg-gray-700 ">
                          <th className="border px-4 py-2 text-left">
                            Product Name
                          </th>
                          <th className="border px-4 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {savedProducts[currentBatchIndex].batch.map((savedProduct, i) => {
                          const matchingProduct =
                            result?.product_details?.find((productFromResponse) =>
                              isMatching(productFromResponse, savedProduct)
                            );

                          return (
                            <tr
                              key={i}
                              className={`${
                                matchingProduct
                                  ? 'bg-[#4caf50]'
                                  : 'bg-[#e53935]'
                              }`}
                            >
                              <td className="border px-4 py-2">
                                {savedProduct.product_name}
                              </td>
                              <td className="border px-4 py-2 text-center">
                                {matchingProduct ? '✔️' : '❌'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Right Side: Product Matching Table */}
                  <div className="space-y-4">
                    <div className="border-b pb-4 border-gray-600">
                      <h4 className="text-lg font-semibold mb-2 text-center">
                        Image Details
                      </h4>
                      <table className="w-full table-auto border-collapse border border-gray-600">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border px-4 py-2 text-left">
                              Product Name
                            </th>
                            <th className="border px-4 py-2 text-left">
                              Category
                            </th>
                            <th className="border px-4 py-2 text-left">Brand</th>
                            <th className="border px-4 py-2 text-left">MRP</th>
                            <th className="border px-4 py-2 text-left">Quantity</th>
                            <th className="border px-4 py-2 text-left">Expiry Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.product_details.map((product, i) => (
                            <tr key={i} className="text-gray-300">
                              <td className="border px-4 py-2">
                                {product.product_name}
                              </td>
                              <td className="border px-4 py-2">
                                {product.category}
                              </td>
                              <td className="border px-4 py-2">
                                {product.brand}
                              </td>
                              <td className="border px-4 py-2">
                                {product.MRP}
                              </td>
                              <td className="border px-4 py-2">
                                {product.quantity}
                              </td>
                              <td className="border px-4 py-2">
                                {product["Expiry Date"]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {allMatched && (
                      <div className="text-center text-[green] font-semibold">
                        <h3>Order processed successfully!</h3>
                      </div>
                    )}
                    {!allMatched && (
                      <div className="text-center text-[#fd1d1d] font-semibold">
                        <h3>Order Incomplete!</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div></div>
  );};
  export default ImageUpload;