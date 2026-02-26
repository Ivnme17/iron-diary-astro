// Componente de autocompletado vanilla JS para Astro
export function createAutocomplete(container, suggestions, placeholder = "Escribe para buscar...") {
    let isOpen = false;
    let selectedIndex = -1;
    let filteredSuggestions = [];
    let currentValue = '';
    
    // Crear estructura HTML
    const wrapper = document.createElement('div');
    wrapper.className = 'relative';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.className = 'w-full h-10 rounded-md border border-border bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
    
    const dropdownIcon = document.createElement('div');
    dropdownIcon.innerHTML = '▼';
    dropdownIcon.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none text-xs';
    
    const list = document.createElement('ul');
    list.className = 'absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-lg hidden';
    
    wrapper.appendChild(input);
    wrapper.appendChild(dropdownIcon);
    wrapper.appendChild(list);
    container.appendChild(wrapper);
    
    // Funciones
    function filterSuggestions() {
        if (currentValue.length > 0) {
            filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(currentValue.toLowerCase())
            );
        } else {
            filteredSuggestions = [];
        }
        
        selectedIndex = -1;
        updateList();
    }
    
    function updateList() {
        list.innerHTML = '';
        
        if (filteredSuggestions.length === 0) {
            list.classList.add('hidden');
            isOpen = false;
            return;
        }
        
        filteredSuggestions.forEach((suggestion, index) => {
            const li = document.createElement('li');
            li.className = `px-3 py-2 text-sm cursor-pointer transition-colors ${
                index === selectedIndex 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent hover:text-accent-foreground'
            }`;
            
            // Resaltar coincidencias
            const regex = new RegExp(`(${currentValue})`, 'gi');
            li.innerHTML = suggestion.replace(regex, '<strong class="font-bold text-primary">$1</strong>');
            
            li.addEventListener('click', () => {
                currentValue = suggestion;
                input.value = suggestion;
                list.classList.add('hidden');
                isOpen = false;
                selectedIndex = -1;
                
                // Disparar evento change
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });
            
            list.appendChild(li);
        });
        
        list.classList.remove('hidden');
        isOpen = true;
    }
    
    function handleKeyDown(e) {
        if (!isOpen) return;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, filteredSuggestions.length - 1);
                updateList();
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateList();
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
                    currentValue = filteredSuggestions[selectedIndex];
                    input.value = currentValue;
                    list.classList.add('hidden');
                    isOpen = false;
                    selectedIndex = -1;
                    
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
                break;
            case 'Escape':
                list.classList.add('hidden');
                isOpen = false;
                selectedIndex = -1;
                break;
        }
    }
    
    function handleBlur() {
        setTimeout(() => {
            list.classList.add('hidden');
            isOpen = false;
            selectedIndex = -1;
        }, 200);
    }
    
    // Event listeners
    input.addEventListener('input', (e) => {
        currentValue = e.target.value;
        filterSuggestions();
    });
    
    input.addEventListener('keydown', handleKeyDown);
    input.addEventListener('blur', handleBlur);
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            list.classList.add('hidden');
            isOpen = false;
            selectedIndex = -1;
        }
    });
    
    // Retornar el input para acceso externo
    return {
        input,
        getValue: () => currentValue,
        setValue: (value) => {
            currentValue = value;
            input.value = value;
            filterSuggestions();
        }
    };
}

// Export default para compatibilidad
export default createAutocomplete;
