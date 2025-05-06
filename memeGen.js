document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    
    // DOM Elements
    const topTextInput = document.getElementById('top-text');
    const bottomTextInput = document.getElementById('bottom-text');
    const topTextDisplay = document.getElementById('top-text-display');
    const bottomTextDisplay = document.getElementById('bottom-text-display');
    const memeImage = document.getElementById('meme-image');
    const submitButton = document.getElementById('submit-btn');
    const randomButton = document.getElementById('random-btn');
    const downloadBtn = document.getElementById('download-btn');
    const templateContainer = document.getElementById('template-container');
    const textColorPicker = document.getElementById('text-color');
    const textOutlinePicker = document.getElementById('text-outline');
    
    // Meme templates - replace these URLs with your actual hosted images
    const memeTemplates = [
        { name: 'Distracted Boyfriend', url: 'images/distracted-boyfriend.jpg' },
        { name: 'Drake Hotline Bling', url: 'images/memes/drake.jpg' },
        { name: 'Two Buttons', url: 'images/memes/two-buttons.jpg' },
        { name: 'Change My Mind', url: 'images/memes/change-my-mind.jpg' },
        { name: 'Expanding Brain', url: 'images/memes/expanding-brain.jpg' },
        { name: 'Batman Slap', url: 'images/memes/batman-slap.jpg' },
        { name: 'Woman Yelling at Cat', url: 'images/memes/woman-yelling-cat.jpg' },
        { name: 'Surprised Pikachu', url: 'images/memes/surprised-pikachu.jpg' },
        { name: 'Ancient Aliens Guy', url: 'images/memes/ancient-aliens.jpg' },
        { name: 'One Does Not Simply', url: 'images/memes/one-does-not-simply.jpg' },
        { name: 'Futurama Fry', url: 'images/memes/futurama-fry.jpg' },
        { name: 'Success Kid', url: 'images/memes/success-kid.jpg' },
    ];
    
    let selectedTemplate = null;
    
    // Initialize the app
    function init() {
        // Add template images to the selector
        memeTemplates.forEach((template, index) => {
            const img = document.createElement('img');
            img.src = template.url;
            img.alt = template.name;
            img.title = template.name;
            img.classList.add('template-img');
            img.dataset.index = index;
            
            img.addEventListener('click', () => {
                selectTemplate(index);
            });
            
            templateContainer.appendChild(img);
        });
        
        // Select a random template to start
        selectRandomTemplate();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Live preview as user types
        topTextInput.addEventListener('input', updatePreview);
        bottomTextInput.addEventListener('input', updatePreview);
        textColorPicker.addEventListener('input', updatePreview);
        textOutlinePicker.addEventListener('input', updatePreview);
        
        // Buttons
        submitButton.addEventListener('click', generateMeme);
        randomButton.addEventListener('click', selectRandomTemplate);
        
        // Download functionality
        downloadBtn.addEventListener('click', prepareDownload);
    }
    
    // Select a template by index
    function selectTemplate(index) {
        // Remove selected class from all templates
        document.querySelectorAll('.template-img').forEach(img => {
            img.classList.remove('selected');
        });
        
        // Select the new template
        selectedTemplate = memeTemplates[index];
        memeImage.src = selectedTemplate.url;
        memeImage.alt = selectedTemplate.name;
        
        // Add selected class to the chosen template
        const selectedImg = document.querySelector(`.template-img[data-index="${index}"]`);
        if (selectedImg) {
            selectedImg.classList.add('selected');
        }
        
        // Update the preview
        updatePreview();
    }
    
    // Select a random template
    function selectRandomTemplate() {
        const randomIndex = Math.floor(Math.random() * memeTemplates.length);
        selectTemplate(randomIndex);
    }
    
    // Update the meme preview
    function updatePreview() {
        topTextDisplay.textContent = topTextInput.value;
        bottomTextDisplay.textContent = bottomTextInput.value;
        
        // Apply text color and outline
        const textColor = textColorPicker.value;
        const outlineColor = textOutlinePicker.value;
        
        const textElements = document.querySelectorAll('.meme-text');
        textElements.forEach(element => {
            element.style.color = textColor;
            element.style.textShadow = `2px 2px 0 ${outlineColor}, -2px -2px 0 ${outlineColor}, 2px -2px 0 ${outlineColor}, -2px 2px 0 ${outlineColor}`;
        });
    }
    
    // Generate the final meme
    function generateMeme(event) {
        event.preventDefault();
        
        // Apply any final styling or effects here
        console.log('Meme generated with:');
        console.log('Template:', selectedTemplate.name);
        console.log('Top text:', topTextInput.value);
        console.log('Bottom text:', bottomTextInput.value);
        
        // Add a "generated" animation
        memeImage.classList.add('generated');
        setTimeout(() => {
            memeImage.classList.remove('generated');
        }, 500);
        
        // Enable download button
        downloadBtn.style.display = 'block';
    }
    
    // Prepare the meme for download
    function prepareDownload(event) {
        // For a full implementation, you would use canvas to render the meme
        // and create a downloadable image, but this is simplified
        alert('In a complete implementation, this would create a downloadable image file of your meme. For now, you can right-click the meme and save it manually.');
        
        // Prevent the default link behavior for now
        event.preventDefault();
        
        /* 
        To implement actual download functionality, you would:
        1. Create a canvas element
        2. Draw the meme image
        3. Draw the text on top
        4. Convert to a data URL
        5. Set the download link's href to that data URL
        
        Example code (not fully working without additional styling):
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match the image
        canvas.width = memeImage.naturalWidth;
        canvas.height = memeImage.naturalHeight;
        
        // Draw the image
        ctx.drawImage(memeImage, 0, 0);
        
        // Draw the text
        ctx.font = 'bold 40px Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = textColorPicker.value;
        ctx.strokeStyle = textOutlinePicker.value;
        ctx.lineWidth = 3;
        
        // Draw top text
        ctx.fillText(topTextInput.value, canvas.width / 2, 50);
        ctx.strokeText(topTextInput.value, canvas.width / 2, 50);
        
        // Draw bottom text
        ctx.fillText(bottomTextInput.value, canvas.width / 2, canvas.height - 30);
        ctx.strokeText(bottomTextInput.value, canvas.width / 2, canvas.height - 30);
        
        // Set the download link
        downloadBtn.href = canvas.toDataURL('image/png');
        */
    }
    
    // Initialize the app
    init();
});
