import uvicorn
from fastapi import FastAPI, File, UploadFile
import google.generativeai as genai
import pandas as pd
import tempfile
import json
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# Configure the API key
api_key = 'AIzaSyC-Drykt7wZusUPlBvH6ConDsNlxeX1TQo'  # Replace with your actual API key
genai.configure(api_key=api_key)

# Define the app object
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this for production environments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define categories for non-fruit/vegetable products
categories = ["Personal Care", "Household Care", "Dairy", "Staples", "Snacks and Beverages", "Packaged Food", "Fruits and Vegetables"]

# Upload image function
def upload_image(image_bytes):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(image_bytes)
        temp_file_path = temp_file.name
    
    sample_file = genai.upload_file(temp_file_path)
    return sample_file

# Classify image content (fruits/vegetables or others)
def classify_image(sample_file):
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    response = model.generate_content([sample_file, "check whther it is an image of vegetable/fruit , do not get confused by the images of fruits and vegetables that are there on the packet of packaged food itmes? Answer 'yes' or 'no' only."])
    classification = response.text.strip().lower()
    return classification == "yes"

# Predict freshness for fruits/vegetables
# Predict details for multiple fruits/vegetables
def predict_multiple_fruit_or_vegetable_details(sample_file):
    """
    Predict the name, freshness index, and expected life span of each fruit/vegetable in the image.
    """
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    response = model.generate_content([
        sample_file,
        """List the name, freshness index (scale of 1-10), and expected life span ((1.6 * freshness index)rounded off to nearest whole number) for each fruit/vegetable in the image. 
        Return the result in JSON format like this:
        {
            "items": [
                {"name": "Apple", "freshness_index": 9, "expected_life_span": 14.4},
                {"name": "Banana", "freshness_index": 6, "expected_life_span": 9.6}
            ]
        }"""
    ])
    
    response_text = response.text.strip()
    print(f"Generated Fruits/Vegetables Details Response: {response_text}")  # Debugging output
    
    try:
        if response_text.startswith("json") and response_text.endswith(""):
            response_text = response_text[7:-3].strip()
        parsed_response = json.loads(response_text)
        items = parsed_response.get("items", [])
        for item in items:
            add_timestamp(item)  # Add timestamp to each fruit/vegetable
        return items
    except json.JSONDecodeError:
        print("Failed to parse response text as JSON.")
        return []


def add_timestamp(details):
    """Add timestamp to a single product or item."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S") + " +5:30"  # Current timestamp in IST
    details["timestamp"] = timestamp
    return details

# Generate product details for non-fruits/vegetables
def generate_product_details(sample_file):
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
    response = model.generate_content([
        sample_file,  
    """For each product in the image, list:
    - product name
    - brand
    - MRP
    - expiry date
    - product count which will be minimum 1 
    - whether it is expired ("YES" or "NO")
    - expected life span in days (subtract today's date from the expiry date, or "NA" if expired)

    If some details are not found, fill with "NA". Return data in JSON format like this:
    {
        "products": [
            {
                "product_name": "Tata Salt",
                "brand": "Tata",
                "MRP": "60RS",
                "expiry_date": "2024-12-25",
                "product_count": 1,
                "is_expired": "NO",
                "expected_life_span": 15
            },
            {
                "product_name": "Maggi",
                "brand": "Nestle",
                "MRP": "12RS",
                "expiry_date": "2024-12-15",
                "product_count": 1,
                "is_expired": "NO",
                "expected_life_span": 5
            }
        ]
    }I want only these details, no more text."""
])

    response_text = response.text.strip()
    print(f"Generated Product Details Response: {response_text}")  # Debugging output
    return response_text
def add_timestamps_to_products(products):
    """Add timestamp to each product."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S") + " +5:30"  # Current timestamp
    for product in products:
        product["timestamp"] = timestamp
    return products

def parse_response_to_dataframe(response_text):
    try:
        if response_text.startswith("json") and response_text.endswith(""):
            response_text = response_text[7:-3].strip()
        # Attempt to parse the response text as JSON
        products_list = json.loads(response_text)
        if 'products' in products_list:
            # Add timestamp to products
            products_with_timestamps = add_timestamps_to_products(products_list['products'])
            return pd.DataFrame(products_with_timestamps)
        else:
            print("No 'products' key found in response.")
            return pd.DataFrame()  # Return an empty DataFrame
    except json.JSONDecodeError:
        print("Failed to parse response text as JSON.")
        return pd.DataFrame()  # Return an empty DataFrame

# Define index route
@app.get('/')
def index():
    return {'message': 'Image API - Send an image to /predict'}

# Define the image prediction route
@app.post('/predict')
async def predict_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        sample_file = upload_image(contents)
        
        if not sample_file:
            return {"error": "Failed to upload the image"}

        is_fruits_or_vegetables = classify_image(sample_file)
        
        if is_fruits_or_vegetables:
            # Get details for multiple fruits/vegetables
            fruit_vegetable_details = predict_multiple_fruit_or_vegetable_details(sample_file)
            if fruit_vegetable_details:
                return {
                    "filename": file.filename,
                    "message": "Fruits/vegetables details extracted successfully.",
                    "fruit_vegetable_details": fruit_vegetable_details
                }
            else:
                return {"error": "Unable to extract fruits/vegetables details."}
        else:
            response_text = generate_product_details(sample_file)
            if response_text:
                df = parse_response_to_dataframe(response_text)
                if df.empty:
                    return {
                        "filename": file.filename,
                        "message": "No relevant product details found."
                    }
                return {
                    "filename": file.filename,
                    "message": "Product details extracted successfully.",
                    "product_details": df.to_dict(orient='records')
                }
            else:
                return {"error": "Unable to extract product details."}
    
    except Exception as e:
        return {"error": str(e)}

# Run the API with Uvicorn
if _name_ == '_main_':
    uvicorn.run(app, host='127.0.0.1', port=8000)