/*
 * Gridfinity created by: Zack Freedman 
 * https://www.youtube.com/watch?v=ra_9zU-mnl8&t=1s&ab_channel=ZackFreedman
 *
 * Gridfinity Database by: Disaster of Puppets 2025 
 * http://disasterofpuppets.com 
 *
 * This code is free to use and modify, provided attribution is maintained.
 * By using this code, you agree that:
 * 1. You will maintain attribution to original authors
 * 2. You accept all responsibility for any issues or damage that may arise from its use
 * 3. The authors accept no liability for any consequences of using this code
 *
 * Use at your own risk.
 *
 * Now that's out of the way, Enjoy!
 */


// DOM element references
const searchBox = document.getElementById('search-box');
const tableBody = document.getElementById('table-body');
const grid = document.getElementById('grid');
const imageContainer = document.getElementById('image-preview');
const gridTitle = document.getElementById('grid-title');
const layerContainer = document.getElementById('layers');
let currentCaseData = cases[0]; // Default to first case
// Sorting state tracking
let currentSortColumn = null;
let currentSortOrder = 'asc';


// Core grid functions
function highlightGrid(position, locations) {
    if (!locations) {
        return;
    }
    // Define layer colors (Extend this for additional layers)
    const layerColors = {
        1: 'orange',
        2: 'yellow',
        3: 'green',
        4: 'blue',
        5: 'purple',
        6: 'red'
    };
    // Reset all cells to default while preserving alternating pattern
    const allCells = document.querySelectorAll('#grid-body td');
    allCells.forEach((cell, index) => {
        const row = Math.floor(index / currentCaseData.Width);
        const col = index % currentCaseData.Width;
        cell.className = 'default';
        if ((row + col) % 2 === 1) {
            cell.classList.add('alternate');
        }
        cell.style.backgroundColor = cell.classList.contains('alternate') ? '#f5f5f5' : 'white';
    });
    // Split locations and process each one
    locations.split(',').forEach(location => {
        const letter = location.trim().charAt(0);
        const number = parseInt(location.trim().substring(1));
        const rowIndex = number +1; // add 1 to account for headers
        const colIndex = letter.charCodeAt(0) - 64 +1; // Convert letter to number and add 1 to account for headers
        const cell = document.querySelector(`#grid-body tr:nth-child(${rowIndex}) td:nth-child(${colIndex})`);
        if (cell) {
            // Apply color based on Position value using layerColors
            const color = layerColors[position] || 'gray'; // Default to gray if not found
            cell.style.backgroundColor = color;
        }
    });
}


// DataTable rendering and management functions
function renderTable(data) {
    if (!tableBody) {
        return;
    }
    
    if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No data available</td></tr>';
        return;
    }
    
    try {
        tableBody.innerHTML = data.map((item, index) => `
            <tr onclick="selectRow(${index}, ${JSON.stringify(item).replace(/"/g, '&quot;')})">
                <td>${item.Case}</td>
                <td>${item.Part}</td>
                <td>${item.Position}</td>
                <td>${item.Location}</td>
                <td style="display:none;">${item.Image}</td>
            </tr>
        `).join('');
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
    }
}
//resets data-table view
function resetTable() {
    document.querySelectorAll('th').forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc', 'active-sort');
    });
    renderTable(database);
    generateGrid(cases[0]);
    gridTitle.textContent = '';
    imageContainer.innerHTML = '<img src="Part Images/default.png" alt="Item Image" />';
}

// Layer key table
function showLayers(layers = 2, position = 0) {
    const layerContainer = document.getElementById('layers');
    layerContainer.innerHTML = ''; // Clear previous content
    const table = document.createElement('table');
    table.id = 'layer-display';
    const tbody = document.createElement('tbody');
    // Create a header row
    const headerRow = document.createElement('tr');
    const headerNumCell = document.createElement('th');
    headerNumCell.textContent = ''; 
    headerRow.appendChild(headerNumCell);
    const headerLayerCell = document.createElement('th');
    headerLayerCell.textContent = 'Layer';
    headerLayerCell.style.opacity = '0';  // Hide the header opacity for visual preference
    headerRow.appendChild(headerLayerCell);
    table.appendChild(headerRow);
    // Define layer colors
    const layerColors = {
        1: 'orange',
        2: 'yellow',
        3: 'green',
        4: 'blue',
        5: 'purple',
        6: 'red'
    };
    // Dynamically generate rows based on the `layers` value
    for (let i = 1; i <= layers; i++) {
        const row = document.createElement('tr');
        // Numbering Column
        const numCell = document.createElement('td');
        numCell.textContent = i;
        numCell.style.width = '15px';
        numCell.style.textAlign = 'center';
        row.appendChild(numCell);
        // Layer Cell
        const layerCell = document.createElement('td');
        layerCell.dataset.layer = i;
        layerCell.style.width = '15px';
        layerCell.style.height = '15px';
        layerCell.style.border = '1px solid black';
        layerCell.style.textAlign = 'center';
        layerCell.style.padding = '0';
        // Highlight only when position is provided and valid
        if (position && i === position) {
            layerCell.style.backgroundColor = layerColors[i] || 'gray';
        }
        row.appendChild(layerCell);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    layerContainer.appendChild(table);
}

// Function to set the grid title
function updateGridTitle(caseData, selected) {
    const gridTitle = document.getElementById('grid-title');
    
    // Set default grid title text if no selection exists
    if (!selected) {
        gridTitle.innerHTML = `<b>Case: </b> <em>No Case Selected</em><br>` +
            `<b>Position: </b> <em>No Position Selected</em><br>` +
            `<b>Location: </b> <em>No Location Selected</em>`;
    } else {
        // Set grid title with selected data
        gridTitle.innerHTML = `<b>Case: </b> ${caseData.Case}<br>` +
            `<b>Position: </b> ${selected.Position}<br>` +
            `<b>Location: </b> ${selected.Location}`;
    }
}

updateGridTitle(); // This will display default text
// This will show the empty table with no highlighted layers
showLayers();


// Function to update layers fill based on selection
function updateLayerFill(selectedLayer) {
    const cells = document.querySelectorAll('#layer-display td[data-layer]');
    // Define layer colors (Extend this for additional layers)
    const layerColors = {
        1: 'orange',
        2: 'yellow',
        3: 'green',
        4: 'blue',
        5: 'purple',
        6: 'red'
    };
    cells.forEach(cell => {
        let layerNum = parseInt(cell.dataset.layer, 10);
        cell.style.backgroundColor = ''; // Reset all cells
        if (layerNum === selectedLayer) {
            // Apply the correct color from the layerColors object
            let color = layerColors[layerNum] || 'gray'; // Default to gray if undefined
            cell.style.backgroundColor = color;
        }
    });
}


//This one does some stuff
document.addEventListener('DOMContentLoaded', () => {
    const padder = document.querySelector('.padder');
    const body = document.body;
    const configLink = document.querySelector('.config a');
    const imageContainer = document.getElementById('image-preview');
    
    // Set default Part image on load
    if (imageContainer) {
        imageContainer.innerHTML = '<img src="Part Images/default.png" alt="Default Image" style="max-width: 100%; height: auto;" />';
    }
    
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
    
    
    
    
    
    
    // Update config link click handler
    configLink.addEventListener('click', (e) => {
        localStorage.setItem('backgroundEnabled', body.classList.contains('background-enabled'));
        if (body.style.backgroundImage && body.style.backgroundImage !== 'none') {
            localStorage.setItem('currentPattern', body.style.backgroundImage.replace(/url(['"](.+)['"])/, '$1'));
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
// Data-Table row selection
function selectRow(index, itemData) {
    const selected = itemData || database[index];
    // Find matching case data
    const caseData = cases.find(c => c.Case === selected.Case) || cases[0];
    // Regenerate grid with selected case dimensions
    generateGrid(caseData);
    console.log('Highlighting:', selected.Position, selected.Location);
    highlightGrid(selected.Position, selected.Location); // Pass position value
    // Update UI: Remove selection from all rows, add to the clicked row
    document.querySelectorAll('#table-body tr').forEach(row => row.classList.remove('selected'));
    document.querySelectorAll('#table-body tr')[index].classList.add('selected');
    // Display image (assuming displayImage is a function that handles image display)
    displayImage(selected.Part);
    // Update grid title: Display selected case data
    updateGridTitle(caseData, selected); // Call to update grid title with selected data
    // Ensure the correct Layers value from the caseData is passed to showLayers
    const layers = caseData.Layers;  // Get Layers from the selected case data
    showLayers(layers, selected.Position);  // Update layer display with correct number of layers and position
}




function displayImage(partName) {
    const imagePreview = document.getElementById('image-preview');
    if (!imagePreview) {
        return;
    }
    // Clear existing content
    imagePreview.innerHTML = '';

    // Remove all spaces from the part name
    const cleanPartName = partName.replace(/\s+/g, '');

    // Create and append image element
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.alt = partName;
    // Handle image loading errors
    img.onerror = function() {
        img.src = 'Part Images/default.png';

        // Handle default image error
        img.onerror = function() {
            imagePreview.innerHTML = `<div style="color: red;">Image not available</div>`;
        };
    };
    // Set initial image source
    img.src = `Part Images/${cleanPartName}.png`;

    imagePreview.appendChild(img);
}




// Grid generation function
function generateGrid(caseData = cases[0]) {
    currentCaseData = caseData;
    
    const tbody = document.querySelector('#grid-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const table = document.createElement('table');
    
    // Create header row with letters
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Corner cell
    
    // Add letter headers
    for (let i = 0; i < caseData.Width; i++) {
        const th = document.createElement('th');
        th.textContent = String.fromCharCode(65 + i);
        if (i % 2 === 1) th.classList.add('alternate'); // Alternate columns
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
    
    // Create grid rows with number headers
    for (let i = 0; i < caseData.Height; i++) {
        const row = document.createElement('tr');
        
        // Add row number header
        const rowHeader = document.createElement('th');
        rowHeader.textContent = (i + 1).toString();
        if (i % 2 === 1) rowHeader.classList.add('alternate'); // Alternate rows
        row.appendChild(rowHeader);
        
        // Add grid cells
        for (let j = 0; j < caseData.Width; j++) {
            const cell = document.createElement('td');
            cell.className = 'default';
            if ((i + j) % 2 === 1) cell.classList.add('alternate'); // Checkerboard pattern
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
    tbody.appendChild(table);
}


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (database.length === 0) {
        return;
    }
    
    // Generate the initial grid with default case
    generateGrid(cases[0]);
    
    // Render the initial table
    renderTable(database);
    // Display default part image on load
    imageContainer.innerHTML = '<img src="Part%20Images/default.png" alt="Default Part Image" style="max-width: 100%; height: auto;" />';
});

// Clear button functionality
document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('search-box').value = '';
    renderTable(database);
    generateGrid(cases[0]);  // Reset to default case
    imageContainer.innerHTML = '<img src="Part%20Images/default.png" alt="Item Image" />';
    gridTitle.textContent = `Case: ${cases[0].Case}`;
});


// Search functionality
searchBox.addEventListener('input', () => {
    const query = searchBox.value.trim().toLowerCase();
    console.log('Search Query:', query);  // Debug the search input
    
    const results = database.filter(item => 
        item.Case.toString().toLowerCase().includes(query) ||
        (item.Part && item.Part.toLowerCase().includes(query)) ||  // Ensure item.Part is a string
        (item.Position && item.Position.toString().includes(query)) ||  // Convert Position to string for comparison
        (item.Location && item.Location.toLowerCase().includes(query))  // Ensure item.Location is a string
    );
    
    console.log('Search Results:', results);  // Debug the filtered results

    renderTable(results);  // Render filtered results
    generateGrid(cases[0]); // Regenerate the grid for the default case
    gridTitle.textContent = ''; // Clear the grid title
});


// Sorting functionality
document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => {
        const columnKey = ['Case', 'Part', 'Position', 'Location'][index];
        if (!columnKey) return; // Skip if no corresponding column key
        // Clear sorting state for all headers
        document.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        // Toggle sort order and apply class
        currentSortOrder = (currentSortColumn === columnKey && currentSortOrder === 'asc') ? 'desc' : 'asc';
        currentSortColumn = columnKey;
        header.classList.add(currentSortOrder === 'asc' ? 'sort-asc' : 'sort-desc');
        // Sort and render the table
        const sortedData = [...database].sort((a, b) => {
            const valueA = a[columnKey].toString().toLowerCase();
            const valueB = b[columnKey].toString().toLowerCase();
            return currentSortOrder === 'asc' 
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });
        renderTable(sortedData);
    });
});


// Responsive layout handling
window.addEventListener('resize', () => {
    const leftColumn = document.querySelector('.left-column');
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.width = leftColumn.offsetWidth + 'px';
});
