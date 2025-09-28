# Weather Widget Configuration

Το Weather Widget τώρα διαβάζει τις ρυθμίσεις του από το αρχείο `weather.config`.

## Ρύθμιση του Weather Widget

### 1. Δημιουργία API Key

1. Πήγαινε στο [OpenWeatherMap](https://openweathermap.org/api)
2. Δημιούργησε δωρεάν λογαριασμό
3. Πάρε το API Key σου

### 2. Ρύθμιση του weather.config

Ανοίγεις το αρχείο `weather.config` και αλλάζεις:

```bash
# Weather Widget Configuration
# Get your API key from: https://openweathermap.org/api
WEATHER_API_KEY=your_api_key_here

# Default city for weather (you can change this to your preferred city)
# Examples: Athens, London, New York, Paris, Tokyo, Thessaloniki
WEATHER_CITY=Athens

# Weather API Configuration
WEATHER_UNITS=metric
WEATHER_LANGUAGE=el
```

### 3. Διαθέσιμες Ρυθμίσεις

- **WEATHER_API_KEY**: Το API key σου από το OpenWeatherMap
- **WEATHER_CITY**: Η πόλη που θέλεις να βλέπεις τον καιρό (π.χ. Athens, London, New York)
- **WEATHER_UNITS**: 
  - `metric` για Celsius (προτεινόμενο)
  - `imperial` για Fahrenheit
  - `kelvin` για Kelvin
- **WEATHER_LANGUAGE**: 
  - `el` για ελληνικά
  - `en` για αγγλικά
  - `fr` για γαλλικά
  - `de` για γερμανικά
  - κλπ.

### 4. Παραδείγματα Ρυθμίσεων

**Για Αθήνα:**
```bash
WEATHER_CITY=Athens
WEATHER_LANGUAGE=el
```

**Για Λονδίνο:**
```bash
WEATHER_CITY=London
WEATHER_LANGUAGE=en
```

**Για Νέα Υόρκη:**
```bash
WEATHER_CITY=New York
WEATHER_LANGUAGE=en
```

### 5. Επανεκκίνηση

Μετά από κάθε αλλαγή στο `weather.config`, πρέπει να επανεκκινήσεις την εφαρμογή:

```bash
npm run electron
```

## Σημειώσεις

- Το API key είναι δωρεάν για έως 1000 requests/ημέρα
- Αν δεν βρει την πόλη, θα χρησιμοποιήσει fallback data
- Όλες οι ρυθμίσεις είναι case-sensitive
- Μπορείς να αλλάξεις πόλη χωρίς να αλλάξεις το API key
