# 🚀 Omni_Dev - Ultimate Developer Toolbox

Omni_Dev is a professional, lightweight, single-page web application containing a suite of productivity tools for developers.

**Author:** [anonymous-201](https://github.com/anonymous-201)  
**Repository:** `omni_dev`

## ✨ Features
- **Fast UI:** Built with Tailwind CSS for a lightning-fast, responsive experience.
- **Modern Dashboard:** Dark-mode optimized design with Lucide Icons.
- **Tool Workspace:** A dynamic "Single Page" engine that loads tools without reloading the page.
- **Fully Searchable:** Find tools instantly via the search bar.
- **Modular Design:** Adding a new tool only requires 3 small steps in `script.js`.

## 🛠️ Built With
- **HTML5**
- **Tailwind CSS** (Styling)
- **Vanilla JavaScript** (The Tool Engine)
- **Lucide Icons** (Visuals)

## 🚀 How to Launch (Static Hosting)

### 1. Local Preview
Simply open `index.html` in any modern web browser.

### 2. GitHub Pages (Recommended)
1. Create a new repository on GitHub named `omni_dev`.
2. Upload `index.html`, `style.css`, and `script.js`.
3. Go to **Settings** > **Pages**.
4. Select **Deploy from a branch** and select `main`.
5. Your site will be live at `https://anonymous-201.github.io/omni_dev/`.

## 📈 How to add a new tool
To expand this project, follow these steps in `script.js`:

1. **Register it:** Add a new object to the `tools` array at the top of `script.js`.
2. **Create the logic:** Write a function (e.g., `setupMyTool(container)`) that injects HTML into the workspace.
3. **Handle events:** Define the functional logic for the tool inside the `setup` function.
4. **Hook it up:** Add the condition inside the `openTool(id)` function.