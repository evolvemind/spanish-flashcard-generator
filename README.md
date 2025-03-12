# Spanish Flashcard Generator

An automated system for generating Spanish language flashcards with minimal or no English content. This tool helps Spanish learners create comprehensive flashcards that can be exported to Anki.

## Current Features

- Input Spanish words or phrases
- Generate flashcards with the following fields:
  - Palabra/Frase (Word/Phrase)
  - Pronunciación (Pronunciation)
  - Función (Grammatical function)
  - Significado Principal (Primary meaning)
  - Sinónimos (Synonyms)
  - Frases de Ejemplo (Example sentences)
- Preview and edit generated content
- Save flashcards locally in your browser
- Export flashcards in Anki-compatible format

## Demo Version Limitations

This initial prototype includes:
- Limited dictionary functionality with only a few pre-loaded words
- Simulated data for words not in the demo dictionary
- Basic local storage (data is saved in your browser)

## How to Use

### Setup Instructions

1. **Clone this repository**
   ```
   git clone https://github.com/yourusername/spanish-flashcard-generator.git
   ```

2. **Open the project**
   - Navigate to the project folder
   - Open `index.html` in your web browser

### Using the Application

1. **Generate a flashcard**
   - Enter a Spanish word or phrase
   - Click "Generar Tarjeta"
   - Try these sample words: "casa", "comer", "feliz"

2. **Edit and save**
   - All fields are editable - click on any content to modify
   - Click "Guardar Tarjeta" to save to local storage

3. **Export for Anki**
   - Click "Exportar para Anki" to download a CSV file
   - Import the CSV file into Anki

## Future Development

This project is under active development. Planned features include:

- Integration with real Spanish dictionary APIs
- Image generation for visual association
- Pronunciation audio
- More comprehensive word information
- Cloud storage and synchronization
- Native app versions for iOS and macOS

## Technical Details

This application currently uses:
- HTML, CSS, and JavaScript
- Browser local storage for saving cards
- Simple mock dictionary for demonstration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
