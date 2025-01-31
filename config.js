/* 
Gridfinity created by: Zack Freedman 
https://www.youtube.com/watch?v=ra_9zU-mnl8&t=1s&ab_channel=ZackFreedman

Gridfinity Database by: Disaster of Puppets 2025 
http://disasterofpuppets.com 

This code is free to use and modify, provided attribution is maintained.
By using this code, you agree that:
1. You will maintain attribution to original authors
2. You accept all responsibility for any issues or damage that may arise from its use
3. The authors accept no liability for any consequences of using this code

Use at your own risk.

Now that's out of the way, Enjoy!
*/

// DOM elements
const previewContainer = document.getElementById('preview');
const fileInput = document.getElementById('fileInput');
const uploadFileButton = document.getElementById('uploadFileButton');
const convertButton = document.getElementById('convertButton');
const output = document.getElementById('output');
const fileName = document.getElementById('fileName');
const errorMessage = document.getElementById('errorMessage');
const okLink = document.getElementById('okLink');
const caseCountDisplay = document.querySelector('.cases');
const excellent = document.getElementById('excellent');
const casecontainer = document.getElementById('casecontainer');
const saveButton = document.getElementById('save');

// Hide the case count display initially
caseCountDisplay.style.display = 'none';

// Initially disable the convert button and hide the okLink
convertButton.disabled = true;
excellent.style.display = 'none';
convertButton.style.backgroundColor = '#d3d3d3'; // Grey out the button
convertButton.style.display = 'none'; // Hide the button initially
okLink.style.display = 'none'; // Hide okLink initially
saveButton.style.display ='none'; // Hide Save button initially

let userDB = ''; // Global variable for userDB, initially empty
let uniqueCases = [];

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// Defines the save function
function saveDataToFile() {

    let finalContent = ''; 

    // Format database array with proper indentation
    const dbData = JSON.parse(userDB.replace('const database =', '').trim().slice(0, -1));
    const formattedDB = 'const database = [\n    ' + 
        dbData.map(item => JSON.stringify(item)).join(',\n    ') + 
        '\n];';
    finalContent += formattedDB;

    // Format cases array with matching indentation
    const casesArray = uniqueCases.map(caseName => {
        const widthInput = document.querySelector(`input[data-case="${caseName}"][name="width"]`);
        const heightInput = document.querySelector(`input[data-case="${caseName}"][name="height"]`);
        const layersInput = document.querySelector(`input[data-case="${caseName}"][name="layers"]`);
        return {
            "Case": caseName,
            "Width": parseInt(widthInput.value) || 0,
            "Height": parseInt(heightInput.value) || 0,
            "Layers": parseInt(layersInput.value) || 2
        };
    });

    const formattedCases = '\n\nconst cases = [\n    ' + 
        casesArray.map(item => JSON.stringify(item)).join(',\n    ') + 
        '\n];';
    finalContent += formattedCases;


    // Create and download the file
    const blob = new Blob([finalContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Show rename notice
    showRenameNotice();
}



document.addEventListener('DOMContentLoaded', () => {
    const padder = document.querySelector('.padder');
    const body = document.body;
    const homeLink = document.querySelector('.index a');
    
    // Array of pattern images
    const patterns = [
        'Images/Pattern1.png',
        'Images/Pattern2.png',
        'Images/Pattern3.png'
    ];
    
    // Function to get random pattern that's different from the current one
    function getRandomPattern() {
        const currentPattern = localStorage.getItem('currentPattern');
        let availablePatterns = patterns.filter(pattern => pattern !== currentPattern);
        
        // If somehow all patterns were filtered out (shouldn't happen with our logic)
        if (availablePatterns.length === 0) {
            availablePatterns = patterns;
        }
        
        return availablePatterns[Math.floor(Math.random() * availablePatterns.length)];
    }
    
    // Check localStorage for saved preference and pattern
    const backgroundEnabled = localStorage.getItem('backgroundEnabled') === 'true';
    const currentPattern = localStorage.getItem('currentPattern');
    
    if (backgroundEnabled) {
        body.classList.add('background-enabled');
        padder.classList.add('active');
        if (currentPattern) {
            body.style.backgroundImage = `url('${currentPattern}')`;
        }
    } else {
        body.style.backgroundImage = 'none';
    }
    
    // Update home link click handler
    homeLink.addEventListener('click', (e) => {
        localStorage.setItem('backgroundEnabled', body.classList.contains('background-enabled'));
        if (body.style.backgroundImage && body.style.backgroundImage !== 'none') {
            localStorage.setItem('currentPattern', body.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1'));
        }
    });
    
    padder.addEventListener('click', () => {
        // Toggle background state
        const isCurrentlyEnabled = body.classList.contains('background-enabled');
        
        if (isCurrentlyEnabled) {
            // Turn off background
            body.classList.remove('background-enabled');
            padder.classList.remove('active');
            body.style.backgroundImage = 'none';
        } else {
            // Turn on background with random pattern (different from last used)
            body.classList.add('background-enabled');
            padder.classList.add('active');
            const randomPattern = getRandomPattern();
            body.style.backgroundImage = `url('${randomPattern}')`;
            localStorage.setItem('currentPattern', randomPattern);
        }
        
        // Save preference
        localStorage.setItem('backgroundEnabled', !isCurrentlyEnabled);
    });
});

function showRenameNotice() {
    const notice = document.createElement('div');
    notice.style.position = 'fixed';
    notice.style.top = '50%';
    notice.style.left = '50%';
    notice.style.transform = 'translate(-50%, -50%)';
    notice.style.padding = '20px';
    notice.style.backgroundColor = '#fff';
    notice.style.border = '2px solid #333';
    notice.style.borderRadius = '5px';
    notice.style.zIndex = '1000';
    notice.style.textAlign = 'center'; // Center all content
    notice.innerHTML = `
        <h3>File Downloaded!</h3>
        <p>Please rename the downloaded file from user.txt to user.js</p>
        <p>Then overwrite the user.js file in the same folder as your index.html file</p>
        <p>Don't stress, the original default user.js is also included as defaultuser.js if you need it</p>
        <div style="text-align: center; margin-top: 15px;">
            <button onclick="this.parentElement.parentElement.remove(); window.location.reload();" style="padding: 5px 20px;">OK</button>
        </div>
    `;

    // Handle Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            notice.remove();
            document.removeEventListener('keydown', escapeHandler);
            window.location.reload();
        }
    });

    document.body.appendChild(notice);
}

// Handle file input change event
fileInput.addEventListener('change', () => {
    handleFileInputChange();
});

// Handle file upload button click
uploadFileButton.addEventListener('click', () => {
    fileInput.value = ''; // Reset the file input value
    previewContainer.style.display = 'none';
    okLink.style.display = 'none';
    caseCountDisplay.style.display = 'none'; // Hide the case count display
    excellent.style.display = 'none';
    saveButton.style.display = 'none'; // Hide Save button initially

    // Clear the unique cases section (clear case input fields)
    const uniqueCasesContainer = document.getElementById('uniqueCasesContainer');
    uniqueCasesContainer.innerHTML = ''; 

    // Clear the case container
    const caseContainer = document.getElementById('casecontainer');
    if (caseContainer) {
        caseContainer.innerHTML = '';
    }

    fileInput.click(); // Trigger file input click
});

// Validate file columns
function validateColumns(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        const requiredColumns = ['Case', 'Part', 'Location', 'Position'];
        const actualColumns = Object.keys(json[0] || {}).map(col => col.toLowerCase());

        const missingColumns = requiredColumns.filter(col => !actualColumns.includes(col.toLowerCase()));

        if (missingColumns.length > 0) {
            showError(`Error: Missing required columns: ${missingColumns.join(', ')}. Please see example formats below.<br><br>
            <a href="Example.csv" target="_blank" style="color: #0066cc; text-decoration: none;">CSV</a> | 
            <a href="Example.xlsx" target="_blank" style="color: #0066cc; text-decoration: none;">XLSX</a> | 
            <a href="Example.xls" target="_blank" style="color: #0066cc; text-decoration: none;">XLS</a>  | 
            <a href="Example.js" target="_blank" style="color: #0066cc; text-decoration: none;">JS</a> | 
            <a href="Example.txt" target="_blank" style="color: #0066cc; text-decoration: none;">TXT</a>
            <br><br><span style="color: black; font-size: 15px;">(if your browser won't let you download the Javascript example, download the .txt and rename to .js)</span>`);
        } else {
            handleValidFile();
        }
    };
    reader.readAsArrayBuffer(file);
}

// Show error message
function showError(message) {
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = message;
    fileName.style.display = 'none'; // Hide file name in case of invalid file
    convertButton.disabled = true;
    convertButton.style.display = 'none'; // Ensure convert button is hidden if there's an error
    saveButton.style.display ='none'; // Hide Save button initially
}

// Handle valid file scenario
function handleValidFile() {
    errorMessage.style.display = 'none';
    convertButton.disabled = false;
    convertButton.style.backgroundColor = ''; // Reset button style to default
    convertButton.style.display = 'block'; // Show convert button after validation
    okLink.style.display = 'none'; // Hide OK link initially
    saveButton.style.display ='none'; // Hide Save button initially
}

// Handle file input change event
function handleFileInputChange() {
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    const file = fileInput.files[0];

    if (file) {
        fileName.textContent = `${file.name}`;
        fileName.style.display = 'block';
        
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (fileExtension === 'js') {
            const reader = new FileReader();
            reader.onload = function(e) {
                handleJSFile(e.target.result);
            };
            reader.readAsText(file);
        } else if (['xls', 'xlsx', 'csv'].includes(fileExtension)) {
            validateColumns(file);
        } else {
            showError('Error: Incorrect format. Please choose either .csv, .xls, .xlsx, or .js');
            convertButton.style.display = 'none';
        }
    }
}

// Handle convert button click
convertButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        const formattedData = formatData(json);
        userDB = generateUserDB(formattedData); // Set userDB after processing the data

        previewContainer.style.display = 'block';
        previewContainer.innerHTML = formatPreviewData(formattedData);

        convertButton.style.display = 'none';
        okLink.style.display = 'inline';

        caseCountDisplay.style.display = 'block'; // Show the case count display

        countUniqueCases(); // Count unique cases after conversion
    };
    reader.readAsArrayBuffer(file);
});

// Format the data from the sheet
function formatData(json) {
    return json.map((row) => ({
        Case: row.Case,
        Part: row.Part || "Unknown",
        Position: row.Position || "Unknown",
        Location: row.Location || "",
        Layers: row.Layers || "1",
    }));
}

// Generate the userDB string from formatted data
function generateUserDB(formattedData) {
    return `const database = [\n    ${formattedData.map(item => JSON.stringify(item)).join(',\n    ')}\n];`;
}

// Format the preview data for display
function formatPreviewData(data, beforeText = 'const database = [', afterText = '];') {
    const uniqueCasesSet = new Set();
    const filteredData = data.filter(item => {
        if (!uniqueCasesSet.has(item.Case)) {
            uniqueCasesSet.add(item.Case);
            return true;
        }
        return false;
    });

    const formattedPreview = filteredData.map((item, index) => {
        const itemString = JSON.stringify(item, null, 2);
        if (index === filteredData.length - 1) {
            return itemString; // No comma at the end of the last item
        }
        return itemString + ','; // Add a comma after all other items
    }).join('<br>');

    return `${beforeText}<br>${formattedPreview}<br>${afterText}`;
}

// Count unique cases and update the display
function countUniqueCases() {
    const data = JSON.parse(userDB.replace('const database =', '').trim().slice(0, -1));
    uniqueCases = Array.from(new Set(data.map(item => item.Case))); // Extract unique case names
    caseCountDisplay.textContent = `Total Unique Cases: ${uniqueCases.length}`;
}

// Handle input changes for width and height
function handleDimensionChange() {
    // Create or get the container for save button and message
    const saveContainer = document.getElementById('save-container') || (() => {
        const container = document.createElement('div');
        container.id = 'save-container';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.marginTop = '20px';
        const saveButton = document.getElementById('save');
        saveButton.parentNode.insertBefore(container, saveButton);
        container.appendChild(saveButton);
        return container;
    })();

    const saveButton = document.getElementById('save');
    const helpMessage = document.getElementById('save-help-message') || (() => {
        const msg = document.createElement('div');
        msg.id = 'save-help-message';
        msg.style.color = '#666';
        msg.style.fontSize = '14px';
        msg.style.marginTop = '5px';
        msg.style.width = '100%';
        msg.style.textAlign = 'center';
        msg.textContent = 'Complete the above fields to enable';
        saveContainer.appendChild(msg);
        return msg;
    })();
    
    // Check if all inputs are filled and valid
    const allInputsFilled = uniqueCases.every(caseName => {
        const widthInput = document.querySelector(`input[data-case="${caseName}"][name="width"]`);
        const heightInput = document.querySelector(`input[data-case="${caseName}"][name="height"]`);
        const layersInput = document.querySelector(`input[data-case="${caseName}"][name="layers"]`);
        
        return widthInput && heightInput && layersInput && 
               widthInput.value.trim() !== '' && parseInt(widthInput.value) > 0 &&
               heightInput.value.trim() !== '' && parseInt(heightInput.value) > 0 &&
               layersInput.value.trim() !== '' && parseInt(layersInput.value) > 0;
    });

    // Show save button but control its state
    saveButton.style.display = 'block';
    if (allInputsFilled) {
        saveButton.disabled = false;
        saveButton.style.opacity = '1';
        saveButton.style.cursor = 'pointer';
        helpMessage.style.display = 'none'; // Hide help message when enabled
    } else {
        saveButton.disabled = true;
        saveButton.style.opacity = '0.5';
        saveButton.style.cursor = 'not-allowed';
        helpMessage.style.display = 'block'; // Show help message when disabled
    }

    // Use debounced version of generateTableFromInputs
    debouncedGenerateTable();
}

// Create a debounced version of generateTableFromInputs
const debouncedGenerateTable = debounce(() => {
    generateTableFromInputs();
}, 250); // 250ms delay



// Update the generateCaseInputSection function to add input event listeners
function generateCaseInputSection(casesData = null) {
    const uniqueCasesContainer = document.getElementById('uniqueCasesContainer');
    uniqueCasesContainer.innerHTML = '';

    uniqueCases.forEach(caseName => {
        const caseSection = document.createElement('div');
        caseSection.className = 'case-container';
        const caseTitle = document.createElement('h3');
        caseTitle.textContent = caseName;

        // Create width input
        const widthLabel = document.createElement('label');
        widthLabel.textContent = 'Width: ';
        const widthInput = document.createElement('input');
        widthInput.type = 'number';
        widthInput.dataset.case = caseName;
        widthInput.name = 'width';
        widthInput.min = '1';
        widthInput.max = '50';
        widthInput.addEventListener('input', function() {
            if (this.value > 50) this.value = 50;
            if (this.value < 1) this.value = 1;
            handleDimensionChange();
        });
        
        // Create height input
        const heightLabel = document.createElement('label');
        heightLabel.textContent = ' Height: ';
        const heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.dataset.case = caseName;
        heightInput.name = 'height';
        heightInput.min = '1';
        heightInput.max = '50';
        heightInput.addEventListener('input', function() {
            if (this.value > 50) this.value = 50;
            if (this.value < 1) this.value = 1;
            handleDimensionChange();
        });

        // Create layers input
        const layersLabel = document.createElement('label');
        layersLabel.textContent = ' Layers: ';
        const layersInput = document.createElement('input');
        layersInput.type = 'number';
        layersInput.dataset.case = caseName;
        layersInput.name = 'layers';
        layersInput.min = '1';
        layersInput.max = '50';
        layersInput.addEventListener('input', function() {
            if (this.value > 50) this.value = 50;
            if (this.value < 1) this.value = 1;
            handleDimensionChange();
        });

        // Pre-populate values if we have case data
        if (casesData) {
            const caseData = casesData.find(c => c.Case === caseName);
            if (caseData) {
                widthInput.value = caseData.Width;
                heightInput.value = caseData.Height;
                layersInput.value = caseData.Layers || 2; // Default to 2 if not specified
                
                // Create grid table for this case
                const gridTable = document.createElement('div');
                gridTable.className = 'grid-table';
                gridTable.style.display = 'grid';
                gridTable.style.gridTemplateColumns = `repeat(${caseData.Width}, 20px)`;
                gridTable.style.gridTemplateRows = `repeat(${caseData.Height}, 20px)`;
                gridTable.style.gap = '1px';
                gridTable.style.marginTop = '10px';
                
                // Generate cells
                for (let i = 0; i < caseData.Height * caseData.Width; i++) {
                    const cell = document.createElement('div');
                    cell.style.width = '20px';
                    cell.style.height = '20px';
                    cell.style.border = '1px solid #ccc';
                    cell.style.backgroundColor = '#fff';
                    gridTable.appendChild(cell);
                }
                
                // Create container for inputs and grid
                const inputsAndGrid = document.createElement('div');
                inputsAndGrid.style.display = 'flex';
                inputsAndGrid.style.gap = '20px';
                inputsAndGrid.style.alignItems = 'start';
                
                // Create container for inputs
                const inputsContainer = document.createElement('div');
                inputsContainer.appendChild(widthLabel);
                inputsContainer.appendChild(widthInput);
                inputsContainer.appendChild(heightLabel);
                inputsContainer.appendChild(heightInput);
                inputsContainer.appendChild(layersLabel);
                inputsContainer.appendChild(layersInput);
                
                // Add inputs and grid to container
                inputsAndGrid.appendChild(inputsContainer);
                inputsAndGrid.appendChild(gridTable);
                
                // Add title and container to case section
                caseSection.appendChild(caseTitle);
                caseSection.appendChild(inputsAndGrid);
            }
        } else {
            // If no case data, just add inputs
            caseSection.appendChild(caseTitle);
            caseSection.appendChild(widthLabel);
            caseSection.appendChild(widthInput);
            caseSection.appendChild(heightLabel);
            caseSection.appendChild(heightInput);
            caseSection.appendChild(layersLabel);
            caseSection.appendChild(layersInput);
            layersInput.value = '2'; // Default value for new cases
        }

        uniqueCasesContainer.appendChild(caseSection);
    });

    // Initial check for button state
    handleDimensionChange();
}

// Handle OK link click
okLink.addEventListener('click', () => {
    if (fileInput.files.length === 0) {
        showError('Please select a file first');
        return;
    }

    const file = fileInput.files[0];
    
    // Handle both Excel file types
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            handleExcelData(jsonData);
            
            // Update UI elements
            previewContainer.style.display = 'none';
            okLink.style.display = 'none';
            caseCountDisplay.style.display = 'none';
            // Update excellent message
            excellent.innerHTML = "Excellent, let's setup your case dimensions";
            excellent.style.display = 'block';

            // Generate case input section after processing
            generateCaseInputSection();
        };
        reader.readAsArrayBuffer(file);
    } else {
        // Handle CSV and JS files as before
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            if (file.name.endsWith('.csv')) {
                handleCSVFile(content);
                previewContainer.style.display = 'none';
                okLink.style.display = 'none';
                caseCountDisplay.style.display = 'none';
       // Update excellent message
                excellent.innerHTML = "Excellent, let's setup your case dimensions";
                excellent.style.display = 'block';
                generateCaseInputSection();
            } else if (file.name.endsWith('.js')) {
                excellent.style.display = 'block';
                excellent.innerHTML = "Oh, I see you have come prepared, Let's update your case dimensions shall we?";
                handleJSFile(content);
            } else {
                showError('Please select a valid .csv, .xls, .xlsx, or .js file');
            }
        };
        reader.readAsText(file);
    }
});

// Generate and display a separate table for each case name
function generateTableFromInputs() {
    const caseContainer = document.getElementById('casecontainer');
    caseContainer.innerHTML = '';

    uniqueCases.forEach(caseName => {
        const widthInput = document.querySelector(`input[data-case="${caseName}"][name="width"]`);
        const heightInput = document.querySelector(`input[data-case="${caseName}"][name="height"]`);

        const width = widthInput ? parseInt(widthInput.value, 10) : 0;
        const height = heightInput ? parseInt(heightInput.value, 10) : 0;

        if (width > 0 && height > 0) {
            const caseTableContainer = document.createElement('div');
            caseTableContainer.className = 'grid-container';

            const tableTitle = document.createElement('h3');
            tableTitle.textContent = `${caseName} (${width} x ${height})`;
            tableTitle.className = 'grid-title';
            caseTableContainer.appendChild(tableTitle);

            const grid = document.createElement('div');
            grid.className = 'grid';
            grid.style.gridTemplateColumns = `repeat(${width + 1}, 15px)`;
            grid.style.gridTemplateRows = `repeat(${height + 1}, 15px)`;

            // Create header row with letters
            for (let i = 0; i <= width; i++) {
                const cell = document.createElement('th');
                if (i === 0) {
                    cell.className = 'header-cell-empty';
                } else {
                    cell.textContent = String.fromCharCode(64 + i);
                    cell.className = 'header-cell-top';
                }
                grid.appendChild(cell);
            }

            // Create grid rows with number headers
            for (let i = 0; i < height; i++) {
                const rowHeader = document.createElement('th');
                rowHeader.textContent = (i + 1).toString();
                rowHeader.className = 'header-cell-left';
                grid.appendChild(rowHeader);

                // Add grid cells
                for (let j = 0; j < width; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'grid-cell';
                    if ((i + j + 1) % 2 === 0) {
                        cell.className += ' grid-cell-light';
                    } else {
                        cell.className += ' grid-cell-dark';
                    }
                    grid.appendChild(cell);
                }
            }

            caseTableContainer.appendChild(grid);
            caseContainer.appendChild(caseTableContainer);
        }
    });
}




function handleJSFile(content) {
    try {
        // Extract database and cases arrays
        const databaseMatch = content.match(/const\s+database\s*=\s*(\[[\s\S]*?\]);/);
        const casesMatch = content.match(/const\s+cases\s*=\s*(\[[\s\S]*?\]);/);

        if (!databaseMatch || !casesMatch) {
            showError('Error: File must contain both "const database" and "const cases" arrays');
            return;
        }

        // Store the validated database immediately
        const databaseContent = databaseMatch[1];
        userDB = `const database = ${databaseContent};`;

        // Process cases without strict validation
        const casesContent = casesMatch[1];
        let casesData;
        
        try {
            casesData = JSON.parse(casesContent);
        } catch {
            casesData = new Function(`return ${casesContent}`)();
        }

        // Extract case information and normalize
        uniqueCases = casesData.map(c => c.Case);
        
        // Update UI
        convertButton.style.display = 'none';
        previewContainer.style.display = 'none';
        okLink.style.display = 'none';
        
        // Show excellent message
        excellent.style.display = 'block';
        excellent.innerHTML = "<p>Excellent! You already have a configuration file.</p>";
        
        // Generate case sections with forms
        const uniqueCasesContainer = document.getElementById('uniqueCasesContainer');
        uniqueCasesContainer.innerHTML = '';

        // Clear any existing tables in case container
        const caseContainer = document.getElementById('casecontainer');
        if (caseContainer) {
            caseContainer.innerHTML = '';
        }

        // Create forms for each case
        uniqueCases.forEach(caseName => {
            const caseData = casesData.find(c => c.Case === caseName);
            
            // Create form section
            const formSection = document.createElement('div');
            formSection.style.marginBottom = '20px';
            
            const title = document.createElement('h3');
            title.textContent = caseName;
            formSection.appendChild(title);
            
            // Create input container
            const inputContainer = document.createElement('div');
            inputContainer.style.marginBottom = '10px';
            
            // Width input with validation
            const widthLabel = document.createElement('label');
            widthLabel.textContent = 'Width: ';
            const widthInput = document.createElement('input');
            widthInput.type = 'number';
            widthInput.dataset.case = caseName;
            widthInput.name = 'width';
            widthInput.min = '1';
            widthInput.max = '200';
            widthInput.value = Math.min(Math.max(caseData.Width, 1), 200); // Ensure initial value is within range
            widthInput.addEventListener('input', function() {
                if (this.value > 200) this.value = 200;
                if (this.value < 1) this.value = 1;
                handleDimensionChange();
            });
            
            // Height input with validation
            const heightLabel = document.createElement('label');
            heightLabel.textContent = ' Height: ';
            const heightInput = document.createElement('input');
            heightInput.type = 'number';
            heightInput.dataset.case = caseName;
            heightInput.name = 'height';
            heightInput.min = '1';
            heightInput.max = '200';
            heightInput.value = Math.min(Math.max(caseData.Height, 1), 200); // Ensure initial value is within range
            heightInput.addEventListener('input', function() {
                if (this.value > 50) this.value = 50;
                if (this.value < 1) this.value = 1;
                handleDimensionChange();
            });
            
            // Layers input with validation
            const layersLabel = document.createElement('label');
            layersLabel.textContent = ' Layers: ';
            const layersInput = document.createElement('input');
            layersInput.type = 'number';
            layersInput.dataset.case = caseName;
            layersInput.name = 'layers';
            layersInput.value = Math.min(Math.max(caseData.Layers || 2, 1), 200); // Ensure initial value is within range
            layersInput.addEventListener('input', function() {
                if (this.value > 50) this.value = 50;
                if (this.value < 1) this.value = 1;
                handleDimensionChange();
            });
            
            // Add all inputs to container
            inputContainer.appendChild(widthLabel);
            inputContainer.appendChild(widthInput);
            inputContainer.appendChild(heightLabel);
            inputContainer.appendChild(heightInput);
            inputContainer.appendChild(layersLabel);
            inputContainer.appendChild(layersInput);
            
            formSection.appendChild(inputContainer);
            uniqueCasesContainer.appendChild(formSection);
        });

        // Initial check for button state and create save container
        handleDimensionChange();
        
    } catch (error) {
        showError('Error processing JS file: ' + error.message);
    }
}

function handleExcelData(jsonData) {
    try {
        // Format the data from Excel
        const formattedData = jsonData.map(row => ({
            Case: row.Case || '',
            Part: row.Part || 'Unknown',
            Position: row.Position || 'Unknown',
            Location: row.Location || '',
            Image: `Part Images/${row.Part ? row.Part.replace(/[\s_]+/g, '') : 'unknown'}.png`
        }));

        // Generate userDB string
        userDB = `const database = [\n${formattedData.map(item => JSON.stringify(item)).join(',\n')}\n];`;

        // Extract unique cases
        uniqueCases = Array.from(new Set(formattedData.map(item => item.Case)));

        // Update case count display
        caseCountDisplay.textContent = `Total Unique Cases: ${uniqueCases.length}`;

        // Hide convert button and show OK link
        convertButton.style.display = 'none';
        okLink.style.display = 'inline';

    } catch (error) {
        showError('Error processing Excel file');
    }
}

function handleCSVFile(content) {
    try {
        // Parse CSV content, handling different line endings
        const rows = content.split(/\r?\n/)
            .filter(row => row.trim());
        
        const headers = rows[0].split(',').map(header => header.trim());
        
        // Convert CSV data to our format
        const formattedData = rows.slice(1)
            .filter(row => row.length > 0)  // Filter out empty rows
            .map(row => {
                const cells = row.split(',');
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = cells[index] ? cells[index].trim() : '';
                });
                return {
                    Case: rowData.Case || '',
                    Part: rowData.Part || 'Unknown',
                    Position: rowData.Position || 'Unknown',
                    Location: rowData.Location || '',
                    Image: `Part Images/${rowData.Part ? rowData.Part.replace(/[\s_]+/g, '') : 'unknown'}.png`
                };
            });

        // Generate userDB string
        userDB = `const database = [\n${formattedData.map(item => JSON.stringify(item)).join(',\n')}\n];`;

        // Extract unique cases - simplified approach
        uniqueCases = [...new Set(formattedData.map(item => item.Case))]
            .filter(Boolean)  // Remove any empty strings
            .sort();  // Sort alphabetically

        // Update case count display
        caseCountDisplay.textContent = `Total Unique Cases: ${uniqueCases.length}`;

        // Hide convert button and show OK link
        convertButton.style.display = 'none';
        okLink.style.display = 'inline';

    } catch (error) {
        showError('Error processing CSV file');
    }
}

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Get the save button after the DOM is loaded
    const saveButton = document.getElementById('save');

    // Add event listener for save button click
    saveButton.addEventListener('click', saveDataToFile);
});