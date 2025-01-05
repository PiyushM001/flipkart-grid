import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import tempfile
import json
from datetime import datetime
import os

# Configure the Gemini API key
api_key = os.getenv('AIzaSyBXC_o3DTYBLbVBOLoQHCOQtXVA_DCqp-o')  # Better to use environment variable
genai.configure(api_key=api_key)

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def upload_image(image_bytes):
    """
    Save uploaded image bytes and return file for Gemini processing
    """
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(image_bytes)
            temp_file_path = temp_file.name
        
        sample_file = genai.upload_file(temp_file_path)
        return sample_file
    except Exception as e:
        print(f"Error uploading image: {e}")
        return None
    finally:
        # Clean up temporary file
        if 'temp_file_path' in locals():
            os.remove(temp_file_path)

            def detect_blur(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    return laplacian_var < 100  # Threshold for blur detection

def sharpen_image(image):
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    img= cv2.filter2D(image, -1, kernel)
    return img
def detect_contrast(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    min_val, max_val = np.min(gray), np.max(gray)
    return (max_val - min_val) < 50  # Threshold for low contrast

def improve_contrast(image):
    img=cv2.equalizeHist(cv2.cvtColor(image, cv2.COLOR_BGR2GRAY))
    return img
def detect_noise(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    std_dev = np.std(gray)
    return std_dev > 50  # Threshold for noise detection

def denoise_image(image):
    img=cv2.fastNlMeansDenoisingColored(image, None, 30, 30, 7, 21)
    return img
def detect_skew(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    lines = cv2.HoughLines(edges, 1, np.pi/180, 200)
    if lines is not None:
        for rho, theta in lines[0]:
            angle = (theta - np.pi/2) * 180 / np.pi
            return abs(angle) > 5  # Skew threshold (5 degrees)
    return False

def deskew_image(image, angle):
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    img=cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return img
def detect_binarization_needed(image):
    # Calculate standard deviation in grayscale; high deviation suggests multi-colored text.
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return np.std(gray) > 70  # Threshold for multi-color or complicated text

def binarize_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    img=cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)[1]
    return img
def preprocess_image(image):
    # Step 1: Check if the image is blurry
    if detect_blur(image):
        #print("Blurry image detected. Applying sharpening.")
        image = sharpen_image(image)

    # Step 2: Check if the image has low contrast
    if detect_contrast(image):
        #print("Low contrast detected. Applying contrast enhancement.")
        image = improve_contrast(image)

    # Step 3: Check if the image is noisy
    if detect_noise(image):
        #print("Noise detected. Applying denoising.")
        image = denoise_image(image)

    # Step 4: Check if the image is skewed
    if detect_skew(image):
        #print("Skew detected. Applying deskewing.")
        image = deskew_image(image, angle=detect_skew_angle(image))

    # Step 5: Check if binarization is needed
    if detect_binarization_needed(image):
        #print("Binarization needed. Applying binarization.")
        image = binarize_image(image)

    return image

def detect_and_decode_barcode(sample_file):
    """
    Use Gemini to detect and decode barcodes in the image
    """
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        prompt = """Analyze this image for barcodes and provide the following details in JSON format:
        1. Detect all barcodes (1D barcodes, QR codes, etc.)
        2. For each detected barcode provide:
           - Type of barcode (1D, QR, EAN-13, etc.)
           - Decoded content/number
           - Location description in the image
           - Estimated scan quality (clear/blurry)
           
        Return the results in this JSON format:
        {
            "barcodes": [
                {
                    "type": "EAN-13",
                    "content": "1234567890123",
                    "location": "center of image",
                    "quality": "clear"
                }
            ]
        }
        
        If no barcodes are found, return an empty barcodes array. Focus only on actual barcodes, not text or numbers that aren't barcodes."""

        response = model.generate_content([sample_file, prompt])
        response_text = response.text.strip()
        
        # Clean up response if it contains markdown code blocks
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
            
        result = json.loads(response_text)
        
        # Add timestamps to each barcode detection
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S") + " +5:30"  # IST timezone
        for barcode in result.get("barcodes", []):
            barcode["timestamp"] = timestamp
            
        return result
        
    except Exception as e:
        print(f"Error in barcode detection: {e}")
        return {"barcodes": []}

def verify_barcode_format(barcode_content):
    """
    Use Gemini to verify if the detected barcode content follows proper format
    """
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        verify_prompt = f"""For the barcode content "{barcode_content}", verify:
        1. If it follows standard barcode format
        2. Check digit validity if applicable
        3. Identify the barcode standard (EAN-13, UPC-A, etc.)
        
        Return result in JSON format:
        {{
            "is_valid": true/false,
            "format": "barcode standard name",
            "validation_details": "explanation of validity"
        }}

        response = model.generate_content(verify_prompt)
        response_text = response.text.strip()
        
        # Clean up response if it contains markdown code blocks
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()
            
        return json.loads(response_text)
    except Exception as e:
        print(f"Error in barcode verification: {e}")
        return {
            "is_valid": False,
            "format": "unknown",
            "validation_details": f"Failed to verify format: {str(e)}"
        }

@app.get('/')
def index():
    return {'message': 'Gemini Barcode Scanner API - Send an image to /scan'}

@app.post('/scan')
async def scan_barcode(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        sample_file = upload_image(contents)
        
        if not sample_file:
            return {"error": "Failed to upload the image"}
        
        # Detect and decode barcodes
        result = detect_and_decode_barcode(sample_file)
        
        # Verify each detected barcode
        for barcode in result.get("barcodes", []):
            validation = verify_barcode_format(barcode["content"])
            barcode["validation"] = validation
        
        return {
            "filename": file.filename,
            "message": "Barcode scanning completed",
            "results": result
        }
        
    except Exception as e:
        return {"error": str(e)}

@app.post('/scan-batch')
async def scan_multiple(files: list[UploadFile] = File(...)):
    try:
        results = []
        for file in files:
            contents = await file.read()
            sample_file = upload_image(contents)
            
            if sample_file:
                # Detect and decode barcodes
                result = detect_and_decode_barcode(sample_file)
                
                # Verify each detected barcode
                for barcode in result.get("barcodes", []):
                    validation = verify_barcode_format(barcode["content"])
                    barcode["validation"] = validation
                
                results.append({
                    "filename": file.filename,
                    "results": result
                })
            
        return {
            "message": "Batch processing completed",
            "batch_results": results
        }
        
    except Exception as e:
        return {"error": str(e)}

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    uvicorn.run(app, host='0.0.0.0', port=port)