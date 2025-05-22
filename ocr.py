from pdf2image import convert_from_path
import pytesseract
import sys
import os

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
poppler_path = r"C:\Users\S\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"

def ocr_pdf(file_path):
    pages = convert_from_path(file_path, dpi=300, poppler_path=poppler_path)
    text_all = ""
    for i, page in enumerate(pages):
        text = pytesseract.image_to_string(page, lang='ben')
        text_all += f"\n--- Page {i+1} ---\n{text}\n"
    return text_all

def ocr_image(file_path):
    from PIL import Image
    image = Image.open(file_path)
    return pytesseract.image_to_string(image, lang='ben')

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python ocr.py <file>")
        sys.exit(1)

    input_file = sys.argv[1]
    ext = os.path.splitext(input_file)[1].lower()
    if ext in ['.pdf']:
        extracted_text = ocr_pdf(input_file)
    elif ext in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']:
        extracted_text = ocr_image(input_file)
    else:
        extracted_text = f"Unsupported file type: {ext}"

    # ✅ Output in UTF-8 safely
    sys.stdout.buffer.write(extracted_text.encode("utf-8"))
