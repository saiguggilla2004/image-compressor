const myImage = document.querySelector("#my_img");
const originalImageContainer = document.querySelector("#original_img_container");
const compressedImageContainer = document.querySelector("#compressed_img_container");
const formatSelect = document.querySelector("#image_format");
const qualitySlider = document.querySelector("#compression_quality");

myImage.addEventListener("change", (e) => {
    const image = e.target.files[0];
    if (!image) return; // Exit if no file is selected

    const reader = new FileReader();
    reader.onload = () => {
        const uploadedImg = new Image();
        uploadedImg.src = reader.result;

        uploadedImg.onload = () => {
            const canvas = document.createElement("canvas");
            const maxWidth = 150; // Resize width
            const scaleFactor = maxWidth / uploadedImg.width; // Calculate scale factor
            canvas.width = maxWidth;
            canvas.height = uploadedImg.height * scaleFactor;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(uploadedImg, 0, 0, canvas.width, canvas.height);

            // Display the original image
            originalImageContainer.innerHTML = ""; // Clear previous content
            const resizedOriginal = document.createElement("img");
            resizedOriginal.src = reader.result;
            resizedOriginal.width = maxWidth;
            originalImageContainer.appendChild(resizedOriginal);

            // Get selected format and quality
            const selectedFormat = formatSelect.value;
            const quality = qualitySlider.value;

            // Compress the image
            const compressedImgURL = canvas.toDataURL(selectedFormat, quality);

            // Display the compressed image
            compressedImageContainer.innerHTML = ""; // Clear previous content
            const compressedImg = document.createElement("img");
            compressedImg.src = compressedImgURL;
            compressedImg.width = maxWidth;
            compressedImg.addEventListener("click", () => downloadImg(compressedImgURL)); // Add download functionality
            compressedImageContainer.appendChild(compressedImg);
        };
    };

    reader.readAsDataURL(image); // Read the file as Data URL
});

// Function to download the compressed image
const downloadImg = (imageURL) => {
    const anchor = document.createElement("a");
    anchor.download = "compressed_img.jpeg"; // Set the file name
    anchor.href = imageURL;
    anchor.target = "_blank"; // Open download in a new tab
    anchor.click();
};
