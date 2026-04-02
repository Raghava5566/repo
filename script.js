// Initial Data setup using LocalStorage
const defaultData = {
    tasks: [
        { id: 1, title: 'Complete Array questions on LeetCode', completed: false, category: 'dsa' },
        { id: 2, title: 'Read Chapter 4 of Clean Code', completed: false, category: 'reading' },
        { id: 3, title: 'Take logical reasoning mock test', completed: true, category: 'aptitude' }
    ],
    readingList: [
        { id: 1, title: 'Clean Code', author: 'Robert C. Martin', totalPages: 464, readPages: 120 },
        { id: 2, title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', totalPages: 611, readPages: 45 }
    ],
    progress: {
        dsa: 35,
        aptitude: 60,
        fundamentals: 20
    }
};

// Initialize or Load Data
let appData = JSON.parse(localStorage.getItem('studyAppData'));
if (!appData) {
    appData = defaultData;
    saveData();
}

function saveData() {
    localStorage.setItem('studyAppData', JSON.stringify(appData));
}

// Event Listeners for DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {

    // Header Logic (index.html)
    const appHeader = document.getElementById('appHeader');
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');

    if (appHeader) {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                appHeader.classList.add('scrolled');
            } else {
                appHeader.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        let isMenuOpen = false;
        mobileToggleBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileToggleBtn.setAttribute('aria-expanded', isMenuOpen);
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                hamburgerIcon.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                hamburgerIcon.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Auth Logic (login.html)
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabSignup = document.getElementById('tabSignup');

    if (tabLogin && tabSignup) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabSignup.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });

        tabSignup.addEventListener('click', () => {
            tabSignup.classList.add('active');
            tabLogin.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    // Dashboard Logic (dashboard.html)
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    if (navLinks.length > 0) {
        // Current Date
        const dateDisplay = document.getElementById('currentDate');
        if (dateDisplay) {
            dateDisplay.textContent = new Date().toLocaleDateString('en-US', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
            });
        }

        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const target = link.getAttribute('data-target');
                
                // Update active classes
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                sections.forEach(sec => sec.classList.remove('active'));
                document.getElementById(target).classList.add('active');
            });
        });

        renderTasks();
        renderReadingList();
        updateStats();

        // Tasks add
        const addTaskForm = document.getElementById('addTaskForm');
        if (addTaskForm) {
            addTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('newTaskInput');
                if (input.value.trim() !== '') {
                    appData.tasks.push({
                        id: Date.now(),
                        title: input.value.trim(),
                        completed: false,
                        category: 'general'
                    });
                    saveData();
                    renderTasks();
                    input.value = '';
                    updateStats();
                }
            });
        }
    }
});

// Render Functions
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const dashTaskList = document.getElementById('dashTaskList'); // On overview
    
    if (!taskList && !dashTaskList) return;

    const html = appData.tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span>${task.title}</span>
        </div>
    `).join('');

    if (taskList) taskList.innerHTML = html;
    if (dashTaskList) {
        // only show first 3 uncompleted in overview
        const uncompleted = appData.tasks.filter(t => !t.completed).slice(0, 3);
        if(uncompleted.length === 0) {
             dashTaskList.innerHTML = '<p class="text-muted">All caught up! 🎉</p>';
        } else {
             dashTaskList.innerHTML = uncompleted.map(task => `
                <div class="task-item" data-id="${task.id}">
                    <input type="checkbox" class="task-checkbox" onchange="toggleTask(${task.id})">
                    <span>${task.title}</span>
                </div>
            `).join('');
        }
    }
}

function toggleTask(id) {
    const task = appData.tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveData();
        renderTasks();
        updateStats();
    }
}

function renderReadingList() {
    const readingGrid = document.getElementById('readingGrid');
    if (!readingGrid) return;

    readingGrid.innerHTML = appData.readingList.map(book => {
        const percent = Math.round((book.readPages / book.totalPages) * 100);
        return `
        <div class="glass-panel book-card">
            <div class="book-icon"></div>
            <div class="book-info">
                <h4 class="mb-1">${book.title}</h4>
                <p class="text-md text-muted mb-3">By ${book.author}</p>
                <div class="progress-bar progress-bar-sm">
                    <div class="progress-fill" style="width: ${percent}%"></div>
                </div>
                <div class="book-stats">
                    <span>${book.readPages} / ${book.totalPages} pages</span>
                    <span>${percent}%</span>
                </div>
                <button class="btn btn-secondary btn-log-reading" onclick="addPages(${book.id})">Log Reading</button>
            </div>
        </div>
    `}).join('');
}

function addPages(id) {
    const pages = prompt("How many additional pages did you read today?");
    if (pages && !isNaN(pages)) {
        const book = appData.readingList.find(b => b.id === id);
        if (book) {
            book.readPages += parseInt(pages);
            if (book.readPages > book.totalPages) book.readPages = book.totalPages;
            saveData();
            renderReadingList();
        }
    }
}

function updateStats() {
    const pendingTasksCount = document.getElementById('pendingTasksCount');
    if (pendingTasksCount) {
        pendingTasksCount.textContent = appData.tasks.filter(t => !t.completed).length;
    }
}
