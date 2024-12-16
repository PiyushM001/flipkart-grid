` `**Smart Vision Quality Control System**

**Project Overview**

**Smart Vision Quality Control System** is an advanced quality control solution, leveraging state-of-the-art **image processing** and **machine learning** technologies. This application enhances accuracy in detecting product attributes like text (MRP, expiry dates), object classification, and freshness, providing real-time results for grocery and perishable items.

The system integrates a React-based web interface (deployed on **Netlify**) with a Flask/FastAPI backend powered by a fine-tuned **LLM (Gemini)** for predictions. All processed data is dynamically stored in MongoDB databases for future reference.

-----
🚀 **Web application link: [https://flipkrt-grid-mars.netlify.app/**](https://flipkrt-grid-mars.netlify.app/)**

**🚀 Backend repository link: [https://github.com/PiyushM001/flipkart-grid-backend**](https://github.com/PiyushM001/flipkart-grid-backend)**

**🚀** **Practical Usage Link: [Video Link**](https://drive.google.com/file/d/1RyE0Gsdrise3Rw0hRBiOBsdiI9FCeukP/view)**

-----
**✨ Features**

- **Brand and Product Name**: Accurately identifies brand and product name with multilingual support.
- **Text Recognition (OCR)**: Extracts text like MRP and expiry dates with high precision.
- **Freshness & Quality Assessment**: AI-based freshness detection for fruits and vegetables.
- **Dynamic Results Display**: Results are displayed in tables with detailed product insights.
- **History Tracking**: Store and view historical scan data for both groceries and perishable items.
- **Responsive UI/UX**: Built with **React.js** and styled using **Tailwind CSS**.
-----
**Tech Stack**

**Frontend**

- **React.js**: Component-based architecture.
- **Tailwind CSS**: Modern utility-first CSS for clean UI design.
- **Axios**: HTTP client for API communication.
- **Netlify**: Deployment platform for the frontend application.

**Backend**

- **Flask/FastAPI**: Lightweight backend for processing API requests.
- **Fine-Tuned LLM (Gemini)**: For object classification and text detection.
- **MongoDB**: Database to store product and fruit/vegetable history.
- **Express.js**: Middleware for backend APIs.
-----
**System Workflow**

![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.001.png)

1. **User Interaction**:
   1. Users interact with a **React-based UI** to upload images for analysis.
1. **Prediction Request**:
   1. The uploaded image is sent to the backend using **Axios POST requests**.
   1. **app.py** processes the image using a fine-tuned **Gemini LLM** for: 
      1. Object Detection
      1. Text Recognition (MRP, expiry date, quantity)
      1. Classification into **Grocery** or **Fruits/Vegetables**
1. **Response Handling**:
   1. The backend sends a **JSON response** with product details.
   1. If the image contains: 
      1. **Grocery Items**: Data is sent to the grocery database.
      1. **Fruits/Vegetables**: Data is sent to a separate fruits/vegetables database.
1. **Dynamic UI Update**:
   1. The result is dynamically added to arrays savedResults / savedResults2 and displayed in the UI.
   1. A **History** button retrieves all previously scanned products from the respective databases.
-----
**Frontend**

**React Components and Flow**

1. **Home Page**:

![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.002.png)**    

1. **Image Upload/Capture**:

   ![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.003.png)            

1. **Analysis Results**:
   1. Results are displayed dynamically in tables:
      1. ![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.004.png)**Grocery Table(**Along with input image**)**:









1. **Fruits/Vegetables Table (**Along with the input image**)**:

   ![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.005.png)




1. **History**:
   1. ![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.006.png)![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.007.png)Users can view all previously scanned items from the corresponding database.


**Backend**

1. **Prediction API** (POST /predict):
- **Fine-Tuned LLM for Prediction**:

  The model leverages a fine-tuned **Gemini LLM** with advanced prompt engineering to extract specific details such as:

- **Product Details**: Brand names, MRP, expiry dates, and product names.
- **Freshness & Expected Life Span**: For fruits/vegetables, the model estimates a **freshness index** (scale of 1-10) and calculates the expected life span on basis of how much it is suitable to eat.
- **Count**: Model also finds the count of each distinct item present in the given image.
- **Classification of Image Content**:
  The LLM first classifies the image into **packaged items** or **fruits/vegetables** based on visual and contextual analysis, avoiding misinterpretation of packaging images.
- **Packaged Item Analysis**:
- For packaged items, the model extracts product details like **MRP**, **brand**, **expiry date**, using the OCR text recognition method then calculates if the product is expired or not.
- It also adds a **timestamp** and organizes the data into a structured JSON format.

- **Fruits/Vegetables Analysis**:
- For fruits and vegetables, the model predicts names, **freshness index**, and **expected life span**.
- The model outputs a freshness index on a scale of 1 to 10, where:
- **10**: Fully fresh produce with vibrant colour, smooth texture, and no visible blemishes.
- **5–9**: Moderately fresh, possibly showing slight discoloration or minor surface irregularities.
- **1–4**: Spoiled or decayed, with prominent black spots, shriveling, discoloration, or structural deformities.
- The model determines freshness index and life span on basis of color,texture,shape and firmness,wether spot blemish present,extent of moisture and shriveling.
- It dynamically parses the details into JSON, ensuring each entry includes a **timestamp** for tracking history.

- **API Workflow**:
- **Request Handling**: The API accepts image files via HTTP POST requests, processes them using Gemini LLM, and returns predictions.
- **Response**: Depending on classification (grocery vs. fruits/vegetables), the processed results are returned as JSON, ready for display and database storage.

-----
1. **Database Storage**
- **Schema Design**: 
  1. Two Mongoose schemas are defined: 
     1. productSchema for packaged product details (e.g., product name, brand, MRP, expiry date).
     1. fruitSchema for fruits/vegetables with fields like freshness\_index and expected\_life\_span.
- **Data Storage**: 
  1. The data is stored in MongoDB Atlas using Product and Fruit collections when endpoints /add-product and /add-fruit are called.
  1. Data persistence ensures records are saved for future access.
-----
1. **History Retrieval**
- **Endpoints**: 
  1. /products-history: Fetches all stored packaged product records from MongoDB.
  1. /fruits-history: Retrieves all stored fruit/vegetable data, including freshness index and lifespan.
- **Response Format**: 
  1. Returns data in JSON format for easy integration with front-end applications or further analysis.
  1. Error handling ensures smooth retrieval, even if the database operation fails.

![](Aspose.Words.beb964a5-f4fb-43d1-b52c-5ae96e725be2.008.png)
