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

const database = [
    {"Case":"Fasteners / Inserts","Part":"25mm Screws","Position":2,"Location":"F4","Image":"Part Images/25mmScrews.png"},
    {"Case":"Workshop","Part":"5mm Screws","Position":2,"Location":"E4","Image":"Part Images/5mmScrews.png"},
    {"Case":"Electronics","Part":"Drill Bits","Position":2,"Location":"B5,C5","Image":"Part Images/DrillBits.png"},
    {"Case":"Welding","Part":"M3 15mm","Position":2,"Location":"B1","Image":"Part Images/M315mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 25mm","Position":2,"Location":"C1","Image":"Part Images/M325mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 45+mm","Position":2,"Location":"D1","Image":"Part Images/M345+mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 8mm","Position":2,"Location":"A1","Image":"Part Images/M38mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 Threads","Position":2,"Location":"E1","Image":"Part Images/M3Threads.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 10mm","Position":2,"Location":"B2","Image":"Part Images/M410mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 14mm","Position":2,"Location":"C2","Image":"Part Images/M414mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 25mm","Position":2,"Location":"A2","Image":"Part Images/M425mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 45+mm","Position":2,"Location":"D2","Image":"Part Images/M445+mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 Wingnut","Position":2,"Location":"E2","Image":"Part Images/M4Wingnut.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 25mm","Position":2,"Location":"A3","Image":"Part Images/M525mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 40+mm","Position":2,"Location":"B3,C3","Image":"Part Images/M540+mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 8mm","Position":2,"Location":"G2","Image":"Part Images/M58mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 20mm","Position":2,"Location":"D3","Image":"Part Images/M620mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 45mm","Position":2,"Location":"E3","Image":"Part Images/M645mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 Locknut","Position":2,"Location":"A4","Image":"Part Images/M6Locknut.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 Wingnut","Position":2,"Location":"B4","Image":"Part Images/M6Wingnut.png"},
    {"Case":"Fasteners / Inserts","Part":"Micro Screws","Position":2,"Location":"D4","Image":"Part Images/MicroScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"Misc Imperial","Position":2,"Location":"A5","Image":"Part Images/MiscImperial.png"},
    {"Case":"Fasteners / Inserts","Part":"Misc Washers","Position":2,"Location":"C4","Image":"Part Images/MiscWashers.png"},
    {"Case":"Fasteners / Inserts","Part":"Screws Large","Position":2,"Location":"A6","Image":"Part Images/ScrewsLarge.png"},
    {"Case":"Fasteners / Inserts","Part":"Shaft Collars","Position":2,"Location":"F2","Image":"Part Images/ShaftCollars.png"},
    {"Case":"Fasteners / Inserts","Part":"10mm Screws","Position":1,"Location":"G4","Image":"Part Images/10mmScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"15mm Screws","Position":1,"Location":"A5","Image":"Part Images/15mmScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"20mm Screws","Position":1,"Location":"H4","Image":"Part Images/20mmScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"30mm Screws","Position":1,"Location":"B5","Image":"Part Images/30mmScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"35mm Screws","Position":1,"Location":"C5","Image":"Part Images/35mmScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"Allen Keys","Position":1,"Location":"F5","Image":"Part Images/AllenKeys.png"},
    {"Case":"Fasteners / Inserts","Part":"Ball Sockets","Position":1,"Location":"H5","Image":"Part Images/BallSockets.png"},
    {"Case":"Fasteners / Inserts","Part":"Bearings","Position":1,"Location":"I5","Image":"Part Images/Bearings.png"},
    {"Case":"Fasteners / Inserts","Part":"EZ Connect","Position":1,"Location":"G3","Image":"Part Images/EZConnect.png"},
    {"Case":"Fasteners / Inserts","Part":"Grub Screws","Position":1,"Location":"F4","Image":"Part Images/GrubScrews.png"},
    {"Case":"Fasteners / Inserts","Part":"IKEA","Position":1,"Location":"D5","Image":"Part Images/IKEA.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 20mm","Position":1,"Location":"B1","Image":"Part Images/M320mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 30mm","Position":1,"Location":"C1","Image":"Part Images/M330mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 5mm","Position":1,"Location":"A1","Image":"Part Images/M35mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 Inserts","Position":1,"Location":"G1","Image":"Part Images/M3Inserts.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 Locknut","Position":1,"Location":"E1","Image":"Part Images/M3Locknut.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 Nut","Position":1,"Location":"D1","Image":"Part Images/M3Nut.png"},
    {"Case":"Fasteners / Inserts","Part":"M3 Wingnut","Position":1,"Location":"F1","Image":"Part Images/M3Wingnut.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 12mm","Position":1,"Location":"B2","Image":"Part Images/M412mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 16mm","Position":1,"Location":"C2","Image":"Part Images/M416mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 30mm","Position":1,"Location":"A2","Image":"Part Images/M430mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 Inserts","Position":1,"Location":"G2","Image":"Part Images/M4Inserts.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 Locknut","Position":1,"Location":"F2","Image":"Part Images/M4Locknut.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 Nut","Position":1,"Location":"E2","Image":"Part Images/M4Nut.png"},
    {"Case":"Fasteners / Inserts","Part":"M4 Washer","Position":1,"Location":"D2","Image":"Part Images/M4Washer.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 20mm","Position":1,"Location":"H2","Image":"Part Images/M520mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 30mm","Position":1,"Location":"A3","Image":"Part Images/M530mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 Nut","Position":1,"Location":"C3","Image":"Part Images/M5Nut.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 Washer","Position":1,"Location":"B3","Image":"Part Images/M5Washer.png"},
    {"Case":"Fasteners / Inserts","Part":"M5 Wingnut","Position":1,"Location":"D3","Image":"Part Images/M5Wingnut.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 30mm","Position":1,"Location":"E3","Image":"Part Images/M630mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 35mm","Position":1,"Location":"F3","Image":"Part Images/M635mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 60+ mm","Position":1,"Location":"H3,I3","Image":"Part Images/M660+mm.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 Nut","Position":1,"Location":"A4","Image":"Part Images/M6Nut.png"},
    {"Case":"Fasteners / Inserts","Part":"M6 Washer","Position":1,"Location":"B4","Image":"Part Images/M6Washer.png"},
    {"Case":"Fasteners / Inserts","Part":"M8 Misc","Position":1,"Location":"C4","Image":"Part Images/M8Misc.png"},
    {"Case":"Fasteners / Inserts","Part":"Metal Taps","Position":1,"Location":"G5","Image":"Part Images/MetalTaps.png"},
    {"Case":"Fasteners / Inserts","Part":"Nails","Position":1,"Location":"D4","Image":"Part Images/Nails.png"},
    {"Case":"Fasteners / Inserts","Part":"Pc Screws etc","Position":1,"Location":"E4","Image":"Part Images/PcScrewsetc.png"},
    {"Case":"Fasteners / Inserts","Part":"Universal Joint","Position":1,"Location":"E5","Image":"Part Images/UniversalJoint.png"},
    {"Case":"Fasteners / Inserts","Part":"Wire Ferrules","Position":1,"Location":"I4","Image":"Part Images/WireFerrules.png"}
];

const cases = [
    {"Case":"Fasteners / Inserts","Width":12,"Height":22,"Layers":2},
    {"Case":"Workshop","Width":14,"Height":22,"Layers":2},
    {"Case":"Electronics","Width":22,"Height":22,"Layers":2},
    {"Case":"Welding","Width":7,"Height":7,"Layers":3}
];

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
        imageContainer.innerHTML = '<img src="Part%20Images/default.png" alt="Default Image" style="max-width: 100%; height: auto;" />';
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









// Image handling function
function displayImage(partName) {
    const imagePreview = document.getElementById('image-preview');
    if (!imagePreview) {
        return;
    }

    // Clear existing content
    imagePreview.innerHTML = '';

    // Clean up part name and create path
    const cleanPartName = partName.replace(/[\s_]+/g, '');
    
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
    imageContainer.innerHTML = '<img src="Part Images/default.png" alt="Default Part Image" style="max-width: 100%; height: auto;" />';
});



// Clear button functionality
document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('search-box').value = '';
    renderTable(database);
    generateGrid(cases[0]);  // Reset to default case
    imageContainer.innerHTML = '<img src="Part Images/default.png" alt="Item Image" />';
    gridTitle.textContent = `Case: ${cases[0].Case}`;
});




// Search functionality
searchBox.addEventListener('input', () => {
    const query = searchBox.value.trim().toLowerCase();
    const results = database.filter(item => 
        item.Case.toString().toLowerCase().includes(query) ||
        item.Part.toLowerCase().includes(query) ||
        item.Position.toLowerCase().includes(query) ||
        item.Location.toLowerCase().includes(query)
    );
    renderTable(results);
    generateGrid(cases[0]);
    gridTitle.textContent = '';
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