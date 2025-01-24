document.addEventListener("DOMContentLoaded", () => {
    const periodicTable = document.getElementById("periodic-table");
    const searchInput = document.getElementById("search");
    const elementInfo = document.getElementById("element-info");

    const elements = [
        { number: 1, symbol: "H", name: "Hydrogen", group: 1, row: 1, col: 1 },
        { number: 2, symbol: "He", name: "Helium", group: 1, row: 1, col: 18 },
        { number: 3, symbol: "Li", name: "Lithium", group: 1, row: 2, col: 1 },
        { number: 4, symbol: "Be", name: "Beryllium", group: 1, row: 2, col: 2 },
        { number: 5, symbol: "B", name: "Boron", group: 2, row: 2, col: 13 },
        { number: 6, symbol: "C", name: "Carbon", group: 2, row: 2, col: 14 },
        { number: 7, symbol: "N", name: "Nitrogen", group: 2, row: 2, col: 15 },
        { number: 8, symbol: "O", name: "Oxygen", group: 2, row: 2, col: 16 },
        { number: 9, symbol: "F", name: "Fluorine", group: 2, row: 2, col: 17 },
        { number: 10, symbol: "Ne", name: "Neon", group: 2, row: 2, col: 18 },
        { number: 11, symbol: "Na", name: "Sodium", group: 1, row: 3, col: 1 },
        { number: 12, symbol: "Mg", name: "Magnesium", group: 1, row: 3, col: 2 },
        { number: 13, symbol: "Al", name: "Aluminum", group: 2, row: 3, col: 13 },
        { number: 14, symbol: "Si", name: "Silicon", group: 2, row: 3, col: 14 },
        { number: 15, symbol: "P", name: "Phosphorus", group: 2, row: 3, col: 15 },
        { number: 16, symbol: "S", name: "Sulfur", group: 2, row: 3, col: 16 },
        { number: 17, symbol: "Cl", name: "Chlorine", group: 2, row: 3, col: 17 },
        { number: 18, symbol: "Ar", name: "Argon", group: 2, row: 3, col: 18 },
        { number: 19, symbol: "K", name: "Potassium", group: 1, row: 4, col: 1 },
        { number: 20, symbol: "Ca", name: "Calcium", group: 1, row: 4, col: 2 },
        { number: 21, symbol: "Sc", name: "Scandium", group: 3, row: 4, col: 3 },
        { number: 22, symbol: "Ti", name: "Titanium", group: 3, row: 4, col: 4 },
        { number: 23, symbol: "V", name: "Vanadium", group: 3, row: 4, col: 5 },
        { number: 24, symbol: "Cr", name: "Chromium", group: 3, row: 4, col: 6 },
        { number: 25, symbol: "Mn", name: "Manganese", group: 3, row: 4, col: 7 },
        { number: 26, symbol: "Fe", name: "Iron", group: 3, row: 4, col: 8 },
        { number: 27, symbol: "Co", name: "Cobalt", group: 3, row: 4, col: 9 },
        { number: 28, symbol: "Ni", name: "Nickel", group: 3, row: 4, col: 10 },
        { number: 29, symbol: "Cu", name: "Copper", group: 3, row: 4, col: 11 },
        { number: 30, symbol: "Zn", name: "Zinc", group: 3, row: 4, col: 12 },
        { number: 31, symbol: "Ga", name: "Gallium", group: 2, row: 4, col: 13 },
        { number: 32, symbol: "Ge", name: "Germanium", group: 2, row: 4, col: 14 },
        { number: 33, symbol: "As", name: "Arsenic", group: 2, row: 4, col: 15 },
        { number: 34, symbol: "Se", name: "Selenium", group: 2, row: 4, col: 16 },
        { number: 35, symbol: "Br", name: "Bromine", group: 2, row: 4, col: 17 },
        { number: 36, symbol: "Kr", name: "Krypton", group: 2, row: 4, col: 18 },
        { number: 37, symbol: "Rb", name: "Rubidium", group: 1, row: 5, col: 1 },
        { number: 38, symbol: "Sr", name: "Strontium", group: 1, row: 5, col: 2 },
        { number: 39, symbol: "Y", name: "Yttrium", group: 3, row: 5, col: 3 },
        { number: 40, symbol: "Zr", name: "Zirconium", group: 3, row: 5, col: 4 },
        { number: 41, symbol: "Nb", name: "Niobium", group: 3, row: 5, col: 5 },
        { number: 42, symbol: "Mo", name: "Molybdenum", group: 3, row: 5, col: 6 },
        { number: 43, symbol: "Tc", name: "Technetium", group: 3, row: 5, col: 7 },
        { number: 44, symbol: "Ru", name: "Ruthenium", group: 3, row: 5, col: 8 },
        { number: 45, symbol: "Rh", name: "Rhodium", group: 3, row: 5, col: 9 },
        { number: 46, symbol: "Pd", name: "Palladium", group: 3, row: 5, col: 10 },
        { number: 47, symbol: "Ag", name: "Silver", group: 3, row: 5, col: 11 },
        { number: 48, symbol: "Cd", name: "Cadmium", group: 3, row: 5, col: 12 },
        { number: 49, symbol: "In", name: "Indium", group: 2, row: 5, col: 13 },
        { number: 50, symbol: "Sn", name: "Tin", group: 2, row: 5, col: 14 },
        { number: 51, symbol: "Sb", name: "Antimony", group: 2, row: 5, col: 15 },
        { number: 52, symbol: "Te", name: "Tellurium", group: 2, row: 5, col: 16 },
        { number: 53, symbol: "I", name: "Iodine", group: 2, row: 5, col: 17 },
        { number: 54, symbol: "Xe", name: "Xenon", group: 2, row: 5, col: 18 },
        { number: 55, symbol: "Cs", name: "Cesium", group: 1, row: 6, col: 1 },
        { number: 56, symbol: "Ba", name: "Barium", group: 1, row: 6, col: 2 },
        { number: 57, symbol: "La", name: "Lanthanum", group: 4, row: 8, col: 4 },
        { number: 58, symbol: "Ce", name: "Cerium", group: 4, row: 8, col: 5 },
        { number: 59, symbol: "Pr", name: "Praseodymium", group: 4, row: 8, col: 6 },
        { number: 60, symbol: "Nd", name: "Neodymium", group: 4, row: 8, col: 7 },
        { number: 61, symbol: "Pm", name: "Promethium", group: 4, row: 8, col: 8 },
        { number: 62, symbol: "Sm", name: "Samarium", group: 4, row: 8, col: 9 },
        { number: 63, symbol: "Eu", name: "Europium", group: 4, row: 8, col: 10 },
        { number: 64, symbol: "Gd", name: "Gadolinium", group: 4, row: 8, col: 11 },
        { number: 65, symbol: "Tb", name: "Terbium", group: 4, row: 8, col: 12 },
        { number: 66, symbol: "Dy", name: "Dysprosium", group: 4, row: 8, col: 13 },
        { number: 67, symbol: "Ho", name: "Holmium", group: 4, row: 8, col: 14 },
        { number: 68, symbol: "Er", name: "Erbium", group: 4, row: 8, col: 15 },
        { number: 69, symbol: "Tm", name: "Thulium", group: 4, row: 8, col: 16 },
        { number: 70, symbol: "Yb", name: "Ytterbium", group: 4, row: 8, col: 17 },
        { number: 71, symbol: "Lu", name: "Lutetium", group: 3, row: 6, col: 3 },
        { number: 72, symbol: "Hf", name: "Hafnium", group: 3, row: 6, col: 4 },
        { number: 73, symbol: "Ta", name: "Tantalum", group: 3, row: 6, col: 5 },
        { number: 74, symbol: "W", name: "Tungsten", group: 3, row: 6, col: 6 },
        { number: 75, symbol: "Re", name: "Rhenium", group: 3, row: 6, col: 7 },
        { number: 76, symbol: "Os", name: "Osmium", group: 3, row: 6, col: 8 },
        { number: 77, symbol: "Ir", name: "Iridium", group: 3, row: 6, col: 9 },
        { number: 78, symbol: "Pt", name: "Platinum", group: 3, row: 6, col: 10 },
        { number: 79, symbol: "Au", name: "Gold", group: 3, row: 6, col: 11 },
        { number: 80, symbol: "Hg", name: "Mercury", group: 3, row: 6, col: 12 },
        { number: 81, symbol: "Tl", name: "Thallium", group: 2, row: 6, col: 13 },
        { number: 82, symbol: "Pb", name: "Lead", group: 2, row: 6, col: 14 },
        { number: 83, symbol: "Bi", name: "Bismuth", group: 2, row: 6, col: 15 },
        { number: 84, symbol: "Po", name: "Polonium", group: 2, row: 6, col: 16 },
        { number: 85, symbol: "At", name: "Astatine", group: 2, row: 6, col: 17 },
        { number: 86, symbol: "Rn", name: "Radon", group: 2, row: 6, col: 18 },
        { number: 87, symbol: "Fr", name: "Francium", group: 1, row: 7, col: 1 },
        { number: 88, symbol: "Ra", name: "Radium", group: 1, row: 7, col: 2 },
        { number: 89, symbol: "Ac", name: "Actinium", group: 4, row: 9, col: 4 },
        { number: 90, symbol: "Th", name: "Thorium", group: 4, row: 9, col: 5 },
        { number: 91, symbol: "Pa", name: "Protactinium", group: 4, row: 9, col: 6 },
        { number: 92, symbol: "U", name: "Uranium", group: 4, row: 9, col: 7 },
        { number: 93, symbol: "Np", name: "Neptunium", group: 4, row: 9, col: 8 },
        { number: 94, symbol: "Pu", name: "Plutonium", group: 4, row: 9, col: 9 },
        { number: 95, symbol: "Am", name: "Americium", group: 4, row: 9, col: 10 },
        { number: 96, symbol: "Cm", name: "Curium", group: 4, row: 9, col: 11 },
        { number: 97, symbol: "Bk", name: "Berkelium", group: 4, row: 9, col: 12 },
        { number: 98, symbol: "Cf", name: "Californium", group: 4, row: 9, col: 13 },
        { number: 99, symbol: "Es", name: "Einsteinium", group: 4, row: 9, col: 14 },
        { number: 100, symbol: "Fm", name: "Fermium", group: 4, row: 9, col: 15 },
        { number: 101, symbol: "Md", name: "Mendelevium", group: 4, row: 9, col: 16 },
        { number: 102, symbol: "No", name: "Nobelium", group: 4, row: 9, col: 17 },
        { number: 103, symbol: "Lr", name: "Lawrencium", group: 3, row: 7, col: 3 },
        { number: 104, symbol: "Rf", name: "Rutherfordium", group: 3, row: 7, col: 4 },
        { number: 105, symbol: "Db", name: "Dubnium", group: 3, row: 7, col: 5 },
        { number: 106, symbol: "Sg", name: "Seaborgium", group: 3, row: 7, col: 6 },
        { number: 107, symbol: "Bh", name: "Bohrium", group: 3, row: 7, col: 7 },
        { number: 108, symbol: "Hs", name: "Hassium", group: 3, row: 7, col: 8 },
        { number: 109, symbol: "Mt", name: "Meitnerium", group: 3, row: 7, col: 9 },
        { number: 110, symbol: "Ds", name: "Darmstadtium", group: 3, row: 7, col: 10 },
        { number: 111, symbol: "Rg", name: "Roentgenium", group: 3, row: 7, col: 11 },
        { number: 112, symbol: "Cn", name: "Copernicium", group: 3, row: 7, col: 12 },
        { number: 113, symbol: "Nh", name: "Nihonium", group: 2, row: 7, col: 13 },
        { number: 114, symbol: "Fl", name: "Flerovium", group: 2, row: 7, col: 14 },
        { number: 115, symbol: "Mc", name: "Moscovium", group: 2, row: 7, col: 15 },
        { number: 116, symbol: "Lv", name: "Livermorium", group: 2, row: 7, col: 16 },
        { number: 117, symbol: "Ts", name: "Tennessine", group: 2, row: 7, col: 17 },
        { number: 118, symbol: "Og", name: "Oganesson", group: 2, row: 7, col: 18 }
    ];
    

    function renderTable() {
        periodicTable.innerHTML = "";
        for (let r = 1; r <= 10; r++) {
            for (let c = 1; c <= 18; c++) {
                const elementData = elements.find(el => el.row === r && el.col === c);
                const elementDiv = document.createElement("div");

                if (elementData) {
                    elementDiv.classList.add("element");
                    elementDiv.textContent = elementData.symbol;
                    elementDiv.dataset.number = elementData.number;
                    elementDiv.dataset.group = elementData.group;
                    elementDiv.addEventListener("click", () => displayElementInfo(elementData));
                } else {
                    elementDiv.classList.add("empty");
                }

                periodicTable.appendChild(elementDiv);
            }
        }
    }

    function displayElementInfo(el) {
        const selectedElementBox = document.getElementById("selected-element");
        document.getElementById("element-name").textContent = `Name: ${el.name}`;
        document.getElementById("element-symbol").textContent = `Symbol: ${el.symbol}`;
        document.getElementById("element-number").textContent = `Atomic Number: ${el.number}`;
        document.getElementById("element-group").textContent = `Group: ${el.group}`;
        document.getElementById("element-row").textContent = `Row: ${el.row}`;
        document.getElementById("element-column").textContent = `Column: ${el.col}`;
    
        selectedElementBox.classList.remove("hidden");
    
        // Remove previous highlights
        document.querySelectorAll(".element").forEach(e => e.classList.remove("selected", "group-highlight"));
    
        // Highlight the selected element
        const selectedElement = document.querySelector(`[data-number='${el.number}']`);
        if (selectedElement) {
            selectedElement.classList.add("selected");
        }
    
        // Highlight all elements in the same group
        document.querySelectorAll(`[data-group='${el.group}']`).forEach(e => e.classList.add("group-highlight"));
    }
    

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll(".element").forEach(el => {
            const elementData = elements.find(e => e.symbol === el.textContent);
            if (!elementData) return;

            const name = elementData.name.toLowerCase();
            const symbol = elementData.symbol.toLowerCase();
            const number = elementData.number.toString();

            if (name.includes(query) || symbol.includes(query) || number.includes(query)) {
                el.style.backgroundColor = "lightcoral";
            } else {
                el.style.backgroundColor = "white";
            }
        });
    });

    renderTable();
});
