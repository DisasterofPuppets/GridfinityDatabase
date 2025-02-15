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
const gridContent = document.getElementById('grid-content');
const layerContainer = document.getElementById('layers');
let currentCaseData = cases[0]; // Default to first case
// Sorting state tracking
let currentSortColumn = null;
let currentSortOrder = 'asc';

//********************************************* 
// HIGHLIGHTGRID defines layer colours for the layer-display table
//*********************************************

function highlightGrid(layer, locations, occupiedLayers) {
    if (!locations) return;

    const layerColors = {
        1: 'orange',
        2: 'yellow',
        3: 'green',
        4: 'blue',
        5: 'purple',
        6: 'red'
    };

    // Highlight only the cells corresponding to the occupied layers
    locations.split(',').forEach(location => {
        const letter = location.trim().charAt(0);
        const number = parseInt(location.trim().substring(1));
        const rowIndex = number + 1;
        const colIndex = letter.charCodeAt(0) - 64 + 1;

        occupiedLayers.forEach(layerNum => {
            const cell = document.querySelector(`#grid-body tr:nth-child(${rowIndex}) td:nth-child(${colIndex})`);
            if (cell && layerNum === layer) {
                cell.style.backgroundColor = layerColors[layerNum];
            }
        });
    });
}

//*********************************************
// RENDERTABLE renders part table
//*********************************************

function renderTable(data) {
    if (!tableBody) {
        return;
    }
    
    if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No data available</td></tr>';
        return;
    }
    
    try {
        tableBody.innerHTML = data.map((item, index) => `
            <tr onclick="selectRow(${index}, ${JSON.stringify(item).replace(/"/g, '&quot;')})">
                <td>${item.Case}</td>
                <td>${item.Part}</td>
                <td>${item.Layer}</td>
                <td>${item.Location}</td>
                <td style="display:none;">${item.CaseLayers}</td>
            </tr>
        `).join('');
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="5">Error loading data</td></tr>';
    }
}


//*********************************************
// RESETTABLE data-table view
//*********************************************
function resetTable() {
    document.querySelectorAll('th').forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc', 'active-sort');
    });
    renderTable(database);
    generateGrid(cases[0]);
    gridTitle.textContent = '';
    imageContainer.innerHTML = '<img src="Part Images/Default.png" alt="Item Image" />';
}


//*********************************************
// SHOWLAYERS generates the layer-display table
//*********************************************

function showLayers(layers = 2, occupiedLayers = []) {
    const layerContainer = document.getElementById('layers');
    layerContainer.innerHTML = ''; 
    const table = document.createElement('table');
    table.id = 'layer-display';
    const tbody = document.createElement('tbody');

    for (let i = 1; i <= layers; i++) {
        const row = document.createElement('tr');

        const numCell = document.createElement('td');
        numCell.textContent = i;
        numCell.style.width = '15px';
        numCell.style.textAlign = 'center';
        row.appendChild(numCell);

        const layerCell = document.createElement('td');
        layerCell.dataset.layer = i;  // Set data-layer for reference in updateLayerFill
        layerCell.style.width = '15px';
        layerCell.style.height = '15px';
        layerCell.style.border = '1px solid black';
        row.appendChild(layerCell);

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    layerContainer.appendChild(table);

    // Call updateLayerFill immediately after creating table
    updateLayerFill(occupiedLayers);
}




//*********************************************
// UPDATEGRIDTITLE sets the grid title
//*********************************************
function updateGridTitle(caseData, selected) {
    const gridTitle = document.getElementById('grid-title');
    const gridContent = document.getElementById('grid-content');
    
    // Set default grid titles text if no selection exists
    if (!selected) {
        gridTitle.innerHTML = ``; //show nothing
    } else {
        // show the titles
        gridTitle.innerHTML = `<b>Case: </b><br>` +
        `<b>Total Layers: </b><br>` +    
        `<b>Part: </b><br>` +
        `<b>Layer: </b><br>` +
        `<b>Location: </b>`;
        
        // Set grid content with selected data
        gridContent.innerHTML = ` ${caseData.Case}<br>` +
            ` ${caseData.CaseLayers}<br>` +
            ` ${selected.Part}<br>` +
            ` ${selected.Layer}<br>` +
            ` ${selected.Location}`;
    }
}



//Required on load to set defaults when nothing is selected.
updateGridTitle(); // This will display default text
// This will show the empty table with no highlighted layers
showLayers();



//*********************************************
// UPDATELAYERFILL Function to update layer-display table cell colour and position based on data-table row selection
//*********************************************

function updateLayerFill(occupiedLayers) {
    const rows = document.querySelectorAll('#layer-display tr');
    const layerColors = {
        1: 'orange',
        2: 'yellow',
        3: 'green',
        4: 'blue',
        5: 'purple',
        6: 'red'
    };

    // Reset layer cells
    rows.forEach(row => {
        const cell = row.querySelector('td[data-layer]');
        if (cell) {
            cell.style.backgroundColor = 'white';
        }
    });

    if (occupiedLayers.length === 0) return;

    // Determine the topmost layer and its color
    const topLayer = Math.min(...occupiedLayers);
    const topColor = layerColors[topLayer] || 'gray';

    // Loop through each occupied layer and set the topmost layer's color
    occupiedLayers.forEach(layerNum => {
        const row = rows[layerNum - 1];  // Adjust for 0-based index
        if (row) {
            const cell = row.querySelector('td[data-layer]');
            if (cell) {
                cell.style.backgroundColor = topColor;
            }
        }
    });
}


//*********************************************
//This one does some stuff, don't worry about it, not an easter egg or anything.
//*********************************************

document.addEventListener('DOMContentLoaded', () => {
    const padder = document.querySelector('.padder');
    const body = document.body;
    const configLink = document.querySelector('.config a');
    const imageContainer = document.getElementById('image-preview');

    if (imageContainer) {
        imageContainer.innerHTML = '<img src="Part Images/Default.png" alt="Default Image" style="max-width: 100%; height: auto;" />';
    }

    // Array of pattern images
    const patterns = [
        'Images/Pattern1.png',
        'Images/Pattern2.png',
        'Images/Pattern3.png'
    ];

    // Function to get a random pattern different from the current one
    function getRandomPattern(previousPattern) {
        let availablePatterns = patterns.filter(pattern => pattern !== previousPattern);

        // If all patterns are filtered out (shouldn't happen), reset to all patterns
        if (availablePatterns.length === 0) {
            availablePatterns = patterns;
        }

        return availablePatterns[Math.floor(Math.random() * availablePatterns.length)];
    }

    // Load stored background preference
    let backgroundEnabled = localStorage.getItem('backgroundEnabled') === 'true';
    let currentPattern = localStorage.getItem('currentPattern') || '';

    if (backgroundEnabled && currentPattern) {
        body.classList.add('background-enabled');
        padder.classList.add('active');
        body.style.backgroundImage = `url('${currentPattern}')`;
    } else {
        body.style.backgroundImage = 'none';
    }

    // Ensure the current pattern is saved before switching pages
    configLink.addEventListener('click', () => {
        localStorage.setItem('backgroundEnabled', body.classList.contains('background-enabled'));
        localStorage.setItem('currentPattern', currentPattern || '');
    });

    padder.addEventListener('click', () => {
        let isCurrentlyEnabled = body.classList.contains('background-enabled');

        if (isCurrentlyEnabled) {
            // Disable background but keep the last selected pattern
            body.classList.remove('background-enabled');
            padder.classList.remove('active');
            body.style.backgroundImage = 'none';
            localStorage.setItem('backgroundEnabled', 'false');
        } else {
            // Enable background and select a different pattern
            body.classList.add('background-enabled');
            padder.classList.add('active');
            
            let newPattern = getRandomPattern(currentPattern);
            currentPattern = newPattern; // Update stored pattern

            body.style.backgroundImage = `url('${currentPattern}')`;
            localStorage.setItem('backgroundEnabled', 'true');
            localStorage.setItem('currentPattern', currentPattern);
        }
    });
});




//*********************************************
// SELECTROW Data-Table row selection
//*********************************************

function selectRow(index, itemData) {
    const selected = itemData || database[index];
    if (!selected) return;

    const caseData = cases.find(c => c.Case === selected.Case) || cases[0];

    let occupiedLayers = [selected.Layer]; // Start with the selected layer

    // Check for parts in the same case and location but different layers
    let currentLayer = selected.Layer;

    while (currentLayer < caseData.CaseLayers) {
        currentLayer++;
        const partInNextLayer = database.find(item => 
            item.Case === selected.Case && 
            item.Location === selected.Location && 
            item.Layer === currentLayer
        );

        if (partInNextLayer) {
            break;
        } else {
            occupiedLayers.push(currentLayer);
        }
    }

    generateGrid(caseData);
    highlightGrid(selected.Layer, selected.Location, occupiedLayers);
    showLayers(caseData.CaseLayers, occupiedLayers);
    updateGridTitle(caseData, selected);

    // Ensure image updates correctly
    displayImage(selected.Part);
}






//*********************************************
// DISPLAYIMAGE the selected part image
//*********************************************

function displayImage(partName) {
    const imagePreview = document.getElementById('image-preview');
    if (!imagePreview) return;
    
    imagePreview.innerHTML = ''; // Clear existing content

    const cleanPartName = partName.trim().replace(/\s+/g, '');
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.alt = partName;

    // Force browser to refresh image
    img.src = `Part Images/${cleanPartName}.png?timestamp=${new Date().getTime()}`;

    img.onerror = function() {
        img.src = 'Part Images/Missing.png';
        img.onerror = function() {
            imagePreview.innerHTML = `<div style="color: red;">Image not available</div>`;
        };
    };

    imagePreview.appendChild(img);
}


//*********************************************
// GETCOLUMNLABEL generates the column labels
//*********************************************
function getColumnLabel(index) {
    let label = "";
    while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
    }
    return label;
}

//*********************************************
// GENERATEGRID generation for the selected case
//*********************************************
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
        th.textContent = getColumnLabel(i); // Use new function for labels
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



//*********************************************
// Checks to ensure the database is loaded
//*********************************************
document.addEventListener('DOMContentLoaded', () => {
    if (database.length === 0) {
        return;
    }
    
    // Generate the initial grid with default case
    generateGrid(cases[0]);
    
    // Render the initial table
    renderTable(database);
    // Display default part image on load
    imageContainer.innerHTML = '<img src="Part%20Images/Default.png" alt="Default Part Image" style="max-width: 100%; height: auto;" />';
});



//*********************************************
// Clear button functionality
//*********************************************
document.getElementById('clear-button').addEventListener('click', () => {
    document.getElementById('search-box').value = '';
    renderTable(database);
    generateGrid(cases[0]);  // Reset to default case
    imageContainer.innerHTML = '<img src="Part%20Images/Default.png" alt="Item Image" />';
    gridTitle.textContent = `Case: ${cases[0].Case}`;
    highlightGrid("","","");
    showLayers();
});



//*********************************************
// Search functionality
//*********************************************
searchBox.addEventListener('input', () => {
    const query = searchBox.value.trim().toLowerCase();
    
    filteredData = database.filter(item => 
        item.Case.toString().toLowerCase().includes(query) ||
        (item.Part && item.Part.toLowerCase().includes(query)) ||
        (item.Position && item.Position.toString().includes(query)) ||
        (item.Location && item.Location.toLowerCase().includes(query))
    );

    renderTable(filteredData); // Render the filtered data
});



//*********************************************
// Sorting functionality
//*********************************************

let filteredData = [...database]; // Store filtered results

document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => {
        const columnKey = ['Case', 'Part', 'Layer', 'Location'][index];
        if (!columnKey) return; // Skip if no corresponding column key

        // Clear sorting state for all headers
        document.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));

        // Toggle sort order and apply class
        currentSortOrder = (currentSortColumn === columnKey && currentSortOrder === 'asc') ? 'desc' : 'asc';
        currentSortColumn = columnKey;
        header.classList.add(currentSortOrder === 'asc' ? 'sort-asc' : 'sort-desc');

        // Sort and render the currently filtered data, not full database
        filteredData.sort((a, b) => {
            const valueA = a[columnKey].toString().toLowerCase();
            const valueB = b[columnKey].toString().toLowerCase();
            return currentSortOrder === 'asc' 
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        });

        renderTable(filteredData); // Render sorted filtered data
    });
});


// Responsive layout handling
window.addEventListener('resize', () => {
    const leftColumn = document.querySelector('.left-column');
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.width = leftColumn.offsetWidth + 'px';
});

//*********************************************
// This one handles the highlighting and sticky selection of the data-table rows
//********************************************* 

document.addEventListener("DOMContentLoaded", function () {
    const tableRows = document.querySelectorAll("#table-body tr");

    tableRows.forEach(row => {
        row.addEventListener("click", function () {
            // Remove the 'selected' class from all rows before applying it
            tableRows.forEach(r => r.classList.remove("selected"));

            // Add 'selected' class to the clicked row
            this.classList.add("selected");
        });
    });
});