// ===== WAIT FOR DOM TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== WIDGET 1: CALENDAR WIDGET =====
    const calendarInput = document.getElementById('calendar-input');
    const calendarOutput = document.getElementById('calendar-output');
    
    calendarInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        calendarOutput.textContent = `You selected: ${formattedDate}`;
    });
    
    
    // ===== WIDGET 2: DROPDOWN WIDGET =====
    const roleDropdown = document.getElementById('role-dropdown');
    const dropdownOutput = document.getElementById('dropdown-output');
    
    roleDropdown.addEventListener('change', function() {
        if (this.value) {
            dropdownOutput.textContent = `Selected Role: ${this.value}`;
        } else {
            dropdownOutput.textContent = 'No role selected';
        }
    });
    
    
    // ===== WIDGET 3: RADIO BUTTON WIDGET =====
    const radioButtons = document.querySelectorAll('input[name="gender"]');
    const radioOutput = document.getElementById('radio-output');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            radioOutput.textContent = `Selected Gender: ${this.value}`;
        });
    });
    
    
    // ===== WIDGET 4: CHECKBOX WIDGET =====
    const checkboxes = document.querySelectorAll('input[name="skills"]');
    const checkboxOutput = document.getElementById('checkbox-output');
    
    function updateSkillsOutput() {
        const selectedSkills = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        if (selectedSkills.length > 0) {
            checkboxOutput.textContent = `Selected Skills: ${selectedSkills.join(', ')}`;
        } else {
            checkboxOutput.textContent = 'No skills selected';
        }
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSkillsOutput);
    });
    
    
    // ===== WIDGET 5: MERGED SEARCHABLE & SORTABLE TABLE =====
    const advancedTable = document.getElementById('advanced-table');
    const advancedTableBody = document.getElementById('advanced-table-body');
    const tableSearchInput = document.getElementById('table-search-input');
    const tableOutput = document.getElementById('table-output');
    const tableHeaders = advancedTable.querySelectorAll('th');
    
    const allTableRows = Array.from(advancedTableBody.querySelectorAll('tr'));
    const totalRows = allTableRows.length;
    
    let currentSortColumn = null;
    let currentSortDirection = 'asc';
    
    function filterTable() {
        const searchTerm = tableSearchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        
        allTableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            
            if (rowText.includes(searchTerm)) {
                row.classList.remove('hidden');
                visibleCount++;
            } else {
                row.classList.add('hidden');
            }
        });
        
        updateTableOutput(visibleCount, searchTerm);
    }
    
    function updateTableOutput(visibleCount, searchTerm) {
        if (visibleCount === 0) {
            tableOutput.textContent = 'No results found';
        } else if (searchTerm === '') {
            tableOutput.textContent = `Showing all ${totalRows} employees`;
        } else {
            tableOutput.textContent = `Found ${visibleCount} matching employee${visibleCount !== 1 ? 's' : ''}`;
        }
    }
    
    tableSearchInput.addEventListener('input', filterTable);
    
    function sortTable(column, dataType) {
        const visibleRows = Array.from(advancedTableBody.querySelectorAll('tr:not(.hidden)'));
        const columnIndex = Array.from(tableHeaders).findIndex(th => th.getAttribute('data-column') === column);
        
        if (currentSortColumn === column) {
            currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            currentSortDirection = 'asc';
            currentSortColumn = column;
        }
        
        visibleRows.sort((rowA, rowB) => {
            let aValue = rowA.cells[columnIndex].textContent.trim();
            let bValue = rowB.cells[columnIndex].textContent.trim();
            
            switch(dataType) {
                case 'number':
                    aValue = parseInt(aValue) || 0;
                    bValue = parseInt(bValue) || 0;
                    break;
                    
                case 'currency':
                    aValue = parseInt(aValue.replace(/[$,]/g, '')) || 0;
                    bValue = parseInt(bValue.replace(/[$,]/g, '')) || 0;
                    break;
                    
                case 'string':
                default:
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                    break;
            }
            
            if (currentSortDirection === 'asc') {
                if (dataType === 'number' || dataType === 'currency') {
                    return aValue - bValue;
                } else {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                }
            } else {
                if (dataType === 'number' || dataType === 'currency') {
                    return bValue - aValue;
                } else {
                    return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
                }
            }
        });
        
        tableHeaders.forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });
        
        const activeHeader = Array.from(tableHeaders).find(th => th.getAttribute('data-column') === column);
        if (activeHeader) {
            activeHeader.classList.add(currentSortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        }
        
        const hiddenRows = Array.from(advancedTableBody.querySelectorAll('tr.hidden'));
        advancedTableBody.innerHTML = '';
        visibleRows.forEach(row => advancedTableBody.appendChild(row));
        hiddenRows.forEach(row => advancedTableBody.appendChild(row));
    }
    
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const dataType = this.getAttribute('data-type');
            sortTable(column, dataType);
        });
    });
    
    
    // ===== WIDGET 7: CARD WIDGET =====
    const cardButtons = document.querySelectorAll('.card-btn');
    
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Resume')) {
                alert('Opening full resume... (This is a demo)');
            } else {
                alert('Opening contact form... (This is a demo)');
            }
        });
    });
    
    
    // ===== WIDGET 8: FORM INPUTS =====
    const rangeInput = document.getElementById('range-input');
    const rangeValue = document.getElementById('range-value');
    const formOutput = document.getElementById('form-output');
    const submitFormBtn = document.getElementById('submit-form-btn');
    
    rangeInput.addEventListener('input', function() {
        rangeValue.textContent = this.value;
    });
    
    submitFormBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const textInput = document.getElementById('text-input').value;
        const emailInput = document.getElementById('email-input').value;
        const numberInput = document.getElementById('number-input').value;
        const fileInput = document.getElementById('file-input').files[0];
        const rangeVal = document.getElementById('range-input').value;
        
        let message = 'Form Submitted Successfully!\n';
        if (textInput) message += `Name: ${textInput}\n`;
        if (emailInput) message += `Email: ${emailInput}\n`;
        if (numberInput) message += `Age: ${numberInput}\n`;
        if (fileInput) message += `File: ${fileInput.name}\n`;
        message += `Proficiency: ${rangeVal}%`;
        
        formOutput.textContent = message;
        formOutput.style.whiteSpace = 'pre-line';
    });
    
    
    // ===== WIDGET 9: ACCORDION WIDGET =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    
    // ===== WIDGET 10: TABS WIDGET =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    
    // ===== WIDGET 11: CAROUSEL WIDGET =====
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselOutput = document.getElementById('carousel-output');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        carouselOutput.textContent = `Slide ${index + 1} of ${totalSlides} | ${isAutoPlaying ? 'Auto-playing (pause on hover)' : 'Paused'}`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        isAutoPlaying = true;
        autoPlayInterval = setInterval(nextSlide, 3000);
        carouselOutput.textContent = `Slide ${currentSlide + 1} of ${totalSlides} | Auto-playing (pause on hover)`;
    }
    
    function stopAutoPlay() {
        isAutoPlaying = false;
        clearInterval(autoPlayInterval);
        carouselOutput.textContent = `Slide ${currentSlide + 1} of ${totalSlides} | Paused`;
    }
    
    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoPlay();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoPlay();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoPlay();
        });
    });
    
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    startAutoPlay();
    
    
    // ===== WIDGET 12: FILE DRAG & DROP WIDGET =====
    const dropZone = document.getElementById('drop-zone');
    const fileUploadInput = document.getElementById('file-upload-input');
    const uploadedFilesContainer = document.getElementById('uploaded-files');
    const fileOutput = document.getElementById('file-output');
    
    let uploadedFiles = [];
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    function getFileIcon(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': '📄',
            'doc': '📝', 'docx': '📝',
            'xls': '📊', 'xlsx': '📊',
            'ppt': '📽️', 'pptx': '📽️',
            'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️',
            'mp4': '🎥', 'avi': '🎥', 'mov': '🎥',
            'mp3': '🎵', 'wav': '🎵',
            'zip': '🗜️', 'rar': '🗜️',
            'txt': '📃',
            'html': '🌐', 'css': '🎨', 'js': '⚙️'
        };
        return iconMap[extension] || '📁';
    }
    
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (!uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
                uploadedFiles.push(file);
            }
        });
        displayFiles();
    }
    
    function displayFiles() {
        uploadedFilesContainer.innerHTML = '';
        
        if (uploadedFiles.length === 0) {
            fileOutput.textContent = 'No files uploaded yet';
            return;
        }
        
        uploadedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            fileItem.innerHTML = `
                <div class="file-info">
                    <span class="file-icon">${getFileIcon(file.name)}</span>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${formatFileSize(file.size)}</div>
                    </div>
                </div>
                <button class="file-remove" data-index="${index}">Remove</button>
            `;
            
            uploadedFilesContainer.appendChild(fileItem);
        });
        
        fileOutput.textContent = `${uploadedFiles.length} file${uploadedFiles.length !== 1 ? 's' : ''} uploaded`;
        
        document.querySelectorAll('.file-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                uploadedFiles.splice(index, 1);
                displayFiles();
            });
        });
    }
    
    dropZone.addEventListener('click', () => fileUploadInput.click());
    
    fileUploadInput.addEventListener('change', function(e) {
        handleFiles(this.files);
    });
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
    
    
    // ===== WIDGET 13: MULTISELECT DROPDOWN WIDGET =====
    const multiselectHeader = document.getElementById('multiselect-header');
    const multiselectDropdown = document.getElementById('multiselect-dropdown');
    const multiselectPlaceholder = document.getElementById('multiselect-placeholder');
    const multiselectSearchInput = document.getElementById('multiselect-search-input');
    const multiselectOptions = document.querySelectorAll('.multiselect-option');
    const multiselectTagsContainer = document.getElementById('multiselect-tags');
    const multiselectOutput = document.getElementById('multiselect-output');
    
    let selectedLanguages = [];
    
    multiselectHeader.addEventListener('click', function() {
        this.classList.toggle('active');
        multiselectDropdown.classList.toggle('active');
        if (multiselectDropdown.classList.contains('active')) {
            multiselectSearchInput.focus();
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.multiselect-container')) {
            multiselectHeader.classList.remove('active');
            multiselectDropdown.classList.remove('active');
        }
    });
    
    multiselectSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        multiselectOptions.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                option.style.display = 'flex';
            } else {
                option.style.display = 'none';
            }
        });
    });
    
    function updateMultiselectDisplay() {
        if (selectedLanguages.length === 0) {
            multiselectPlaceholder.textContent = 'Select languages...';
            multiselectPlaceholder.className = 'multiselect-placeholder';
            multiselectOutput.textContent = 'No languages selected';
        } else {
            multiselectPlaceholder.textContent = `${selectedLanguages.length} language${selectedLanguages.length !== 1 ? 's' : ''} selected`;
            multiselectPlaceholder.className = 'multiselect-selected';
            multiselectOutput.textContent = `Selected: ${selectedLanguages.join(', ')}`;
        }
        
        multiselectTagsContainer.innerHTML = '';
        selectedLanguages.forEach(lang => {
            const tag = document.createElement('div');
            tag.className = 'multiselect-tag';
            tag.innerHTML = `
                ${lang}
                <button class="tag-remove" data-lang="${lang}">×</button>
            `;
            multiselectTagsContainer.appendChild(tag);
        });
        
        document.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                removeLanguage(lang);
            });
        });
    }
    
    function removeLanguage(lang) {
        selectedLanguages = selectedLanguages.filter(l => l !== lang);
        
        multiselectOptions.forEach(option => {
            if (option.getAttribute('data-value') === lang) {
                const checkbox = option.querySelector('.multiselect-checkbox');
                checkbox.checked = false;
                option.classList.remove('selected');
            }
        });
        
        updateMultiselectDisplay();
    }
    
    multiselectOptions.forEach(option => {
        const checkbox = option.querySelector('.multiselect-checkbox');
        
        option.addEventListener('click', function(e) {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            
            const value = this.getAttribute('data-value');
            
            if (checkbox.checked) {
                if (!selectedLanguages.includes(value)) {
                    selectedLanguages.push(value);
                }
                this.classList.add('selected');
            } else {
                selectedLanguages = selectedLanguages.filter(lang => lang !== value);
                this.classList.remove('selected');
            }
            
            updateMultiselectDisplay();
        });
    });
    
    
    // ===== INITIALIZE =====
    console.log('✅ All widgets loaded successfully!');
    console.log('📚 13 interactive widgets ready to use');
    console.log('🎨 Featuring: Drag & Drop File Upload and Multiselect Dropdown!');
    
});