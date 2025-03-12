// Main application JavaScript

// DOM Elements
const wordInput = document.getElementById('wordInput');
const generateButton = document.getElementById('generateButton');
const previewSection = document.getElementById('previewSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const saveButton = document.getElementById('saveButton');
const exportButton = document.getElementById('exportButton');
const savedCards = document.getElementById('savedCards');
const cardsList = document.getElementById('cardsList');

// Flashcard fields
const palabraField = document.getElementById('palabra');
const pronunciacionField = document.getElementById('pronunciacion');
const funcionField = document.getElementById('funcion');
const significadoField = document.getElementById('significado');
const sinonimosField = document.getElementById('sinonimos');
const ejemplosField = document.getElementById('ejemplos');

// Initialize local storage
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// Event Listeners
generateButton.addEventListener('click', generateCard);
saveButton.addEventListener('click', saveCard);
exportButton.addEventListener('click', exportForAnki);
document.addEventListener('DOMContentLoaded', displaySavedCards);

// Mock dictionary data for demo purposes
const mockDictionary = {
    'casa': {
        pronunciacion: 'ká.sa',
        funcion: 'sustantivo femenino',
        significado: 'Edificio para habitar',
        sinonimos: 'hogar, vivienda, domicilio, residencia',
        ejemplos: [
            'Mi casa está en el centro de la ciudad.',
            'Vamos a tu casa esta tarde.',
            'La casa de mis padres es muy antigua.'
        ]
    },
    'comer': {
        pronunciacion: 'ko.mér',
        funcion: 'verbo transitivo',
        significado: 'Tomar alimento por la boca',
        sinonimos: 'alimentarse, nutrirse, ingerir, devorar',
        ejemplos: [
            'Me gusta comer frutas y verduras.',
            'Vamos a comer a las dos de la tarde.',
            'El niño no quiere comer sus verduras.'
        ]
    },
    'feliz': {
        pronunciacion: 'fe.líθ (España) / fe.lís (América)',
        funcion: 'adjetivo',
        significado: 'Que siente felicidad o la proporciona',
        sinonimos: 'contento, alegre, dichoso, satisfecho',
        ejemplos: [
            'Estoy muy feliz con los resultados.',
            'Mi hija es feliz en su nueva escuela.',
            '¡Feliz cumpleaños!'
        ]
    }
};

/**
 * Generate a flashcard based on input word
 */
function generateCard() {
    const word = wordInput.value.trim().toLowerCase();
    
    if (!word) {
        alert('Por favor, introduce una palabra o frase');
        return;
    }
    
    // Show loading state
    loadingIndicator.style.display = 'block';
    previewSection.style.display = 'none';
    
    // Simulate API delay
    setTimeout(() => {
        // Check if word exists in our mock dictionary
        if (mockDictionary[word]) {
            const data = mockDictionary[word];
            displayCardPreview(word, data);
        } else {
            // For demo, generate some fake data
            const fakeData = {
                pronunciacion: generateFakePronunciation(word),
                funcion: getRandomFunction(),
                significado: `Significado simulado para "${word}"`,
                sinonimos: `sinónimo1, sinónimo2, sinónimo3`,
                ejemplos: [
                    `Esta es una frase de ejemplo usando "${word}".`,
                    `Otra frase con "${word}" para mostrar uso.`,
                    `Un tercer ejemplo con "${word}" en contexto.`
                ]
            };
            displayCardPreview(word, fakeData);
            
            // Indicate this is mock data
            significadoField.innerHTML += ' <small>(datos simulados)</small>';
        }
        
        // Hide loading, show preview
        loadingIndicator.style.display = 'none';
        previewSection.style.display = 'block';
    }, 1500);
}

/**
 * Display the flashcard preview with the retrieved data
 */
function displayCardPreview(word, data) {
    palabraField.textContent = word;
    pronunciacionField.textContent = data.pronunciacion;
    funcionField.textContent = data.funcion;
    significadoField.textContent = data.significado;
    sinonimosField.textContent = data.sinonimos;
    
    // Format examples
    let examplesHtml = '';
    data.ejemplos.forEach(example => {
        examplesHtml += `<div class="example-sentence">${example}</div>`;
    });
    ejemplosField.innerHTML = examplesHtml;
}

/**
 * Save the current flashcard to local storage
 */
function saveCard() {
    const newCard = {
        id: Date.now(), // use timestamp as unique ID
        palabra: palabraField.textContent,
        pronunciacion: pronunciacionField.textContent,
        funcion: funcionField.textContent,
        significado: significadoField.textContent,
        sinonimos: sinonimosField.textContent,
        ejemplos: ejemplosField.innerHTML
    };
    
    // Add to array and save to localStorage
    flashcards.push(newCard);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    
    // Update display and show confirmation
    displaySavedCards();
    alert('Tarjeta guardada correctamente');
}

/**
 * Display all saved flashcards
 */
function displaySavedCards() {
    if (flashcards.length > 0) {
        savedCards.style.display = 'block';
        
        // Clear current list
        cardsList.innerHTML = '';
        
        // Add each card
        flashcards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'flashcard';
            cardElement.style.marginBottom = '20px';
            
            cardElement.innerHTML = `
                <div class="field">
                    <div class="field-label">Palabra/Frase:</div>
                    <div>${card.palabra}</div>
                </div>
                <div class="field">
                    <div class="field-label">Significado Principal:</div>
                    <div>${card.significado}</div>
                </div>
                <button onclick="deleteCard(${card.id})">Eliminar</button>
            `;
            
            cardsList.appendChild(cardElement);
        });
    } else {
        savedCards.style.display = 'none';
    }
}

/**
 * Delete a flashcard by ID
 */
function deleteCard(id) {
    flashcards = flashcards.filter(card => card.id !== id);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    displaySavedCards();
}

/**
 * Export cards in Anki-compatible format
 */
function exportForAnki() {
    if (flashcards.length === 0) {
        alert('No hay tarjetas para exportar');
        return;
    }
    
    // Create CSV content for Anki
    let csvContent = "palabra;pronunciacion;funcion;significado;sinonimos;ejemplos\n";
    
    flashcards.forEach(card => {
        // Clean up examples (remove HTML)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = card.ejemplos;
        const cleanExamples = Array.from(tempDiv.querySelectorAll('.example-sentence'))
            .map(el => el.textContent)
            .join(' | ');
        
        // Add row to CSV
        csvContent += `${card.palabra};${card.pronunciacion};${card.funcion};${card.significado};${card.sinonimos};${cleanExamples}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'flashcards_anki.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Helper functions

/**
 * Generate fake pronunciation for demo
 */
function generateFakePronunciation(word) {
    // Very simplistic pronunciation generator
    return word.split('').join('.');
}

/**
 * Get random grammatical function for demo
 */
function getRandomFunction() {
    const functions = [
        'sustantivo masculino', 
        'sustantivo femenino', 
        'adjetivo', 
        'verbo transitivo',
        'verbo intransitivo',
        'adverbio'
    ];
    return functions[Math.floor(Math.random() * functions.length)];
}

// Make deleteCard function global for the onclick handler
window.deleteCard = deleteCard;
