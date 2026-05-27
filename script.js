// 1. DATA: Define all your tools here
const tools = [
    { id: 'json-fmt', name: 'JSON Formatter', category: 'code', icon: 'file-json', desc: 'Beautify and validate JSON code' },
    { id: 'pw-gen', name: 'Password Gen', category: 'security', icon: 'key', desc: 'Generate secure random passwords' },
    { id: 'color-pick', name: 'Color Picker', category: 'ui', icon: 'eye', desc: 'Generate HEX/RGB color codes' },
    { id: 'b64-enc', name: 'Base64 Tool', category: 'code', icon: 'binary', desc: 'Encode/Decode Base64 strings' },
    { id: 'case-conv', name: 'Case Converter', category: 'text', icon: 'text-cursor', desc: 'Upper, Lower, Title case' },
];

// 2. CORE ENGINE: Render Tools to Grid
function renderTools(filter = 'all', searchQuery = '') {
    const grid = document.getElementById('toolGrid');
    grid.innerHTML = '';

    const filtered = tools.filter(t => {
        const matchesCat = filter === 'all' || t.category === filter;
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    filtered.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card bg-slate-900 border border-slate-800 p-5 rounded-xl cursor-pointer animate-fade';
        card.onclick = () => openTool(tool.id);
        card.innerHTML = `
            <div class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                <i data-lucide="${tool.icon}"></i>
            </div>
            <h3 class="font-semibold text-slate-100">${tool.name}</h3>
            <p class="text-xs text-slate-500 mt-1">${tool.desc}</p>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons(); // Re-run icon rendering
}

// 3. TOOL SWITCHING LOGIC
function openTool(id) {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('workspace').classList.remove('hidden');
    const container = document.getElementById('toolContent');
    container.innerHTML = ''; // Clear workspace

    if (id === 'json-fmt') setupJsonTool(container);
    if (id === 'pw-gen') setupPasswordTool(container);
    if (id === 'color-pick') setupColorTool(container);
    if (id === 'b64-enc') setupBase64Tool(container);
    if (id === 'case-conv') setupCaseTool(container);
}

function closeTool() {
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('workspace').classList.add('hidden');
}

function filterCategory(cat) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderTools(cat);
}

// 4. SEARCH LOGIC
document.getElementById('toolSearch').addEventListener('input', (e) => {
    renderTools('all', e.target.value);
});

/** 
 * TOOL IMPLEMENTATIONS 
 * This is where you build the actual logic for each tool
 */

// TOOL: JSON Formatter
function setupJsonTool(container) {
    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-4 text-blue-400">JSON Formatter</h2>
        <textarea id="jsonInput" class="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Paste ugly JSON here..."></textarea>
        <div class="mt-4 flex gap-3">
            <button onclick="runJsonFmt()" class="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-medium transition-colors">Beautify</button>
            <button onclick="document.getElementById('jsonInput').value=''" class="bg-slate-800 px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">Clear</button>
        </div>
    `;
}

window.runJsonFmt = () => {
    const area = document.getElementById('jsonInput');
    try {
        const obj = JSON.parse(area.value);
        area.value = JSON.stringify(obj, null, 4);
    } catch (e) {
        alert("Invalid JSON!");
    }
};

// TOOL: Password Generator
function setupPasswordTool(container) {
    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-4 text-green-400">Secure Password Generator</h2>
        <div class="space-y-4">
            <div class="text-4xl font-mono bg-slate-950 p-6 rounded-xl border border-slate-800 text-center select-all" id="pwResult">********</div>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-slate-400">Length: <span id="lenVal">16</span></label>
                <input type="range" id="pwLen" min="8" max="50" value="16" class="w-full" oninput="document.getElementById('lenVal').innerText=this.value">
            </div>
            <button onclick="generatePW()" class="w-full bg-green-600 py-3 rounded-xl font-bold hover:bg-green-500 transition-colors">Generate Password</button>
        </div>
    `;
}

window.generatePW = () => {
    const len = document.getElementById('pwLen').value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let retVal = "";
    for (let i = 0; i < len; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * charset.length));
            }
    document.getElementById('pwResult').innerText = retVal;
};

// TOOL: Color Picker
function setupColorTool(container) {
    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-4 text-purple-400">Color Generator</h2>
        <div class="flex flex-col items-center gap-6">
            <div id="colorDisplay" class="w-48 h-48 rounded-full border-8 border-slate-800 shadow-2xl"></div>
            <div id="hexResult" class="text-3xl font-mono tracking-widest">#FFFFFF</div>
            <button onclick="genColor()" class="bg-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-500">Randomize</button>
        </div>
    `;
    genColor();
}

function genColor() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    document.getElementById('colorDisplay').style.backgroundColor = color;
    document.getElementById('hexResult').innerText = color.toUpperCase();
}

// Initializing
window.onload = () => {
    renderTools();
    lucide.createIcons();
};