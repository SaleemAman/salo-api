const express = require('express');
const cors = require('cors');
const app = express();

// Allow Flutter app to connect from anywhere
app.use(cors());
app.use(express.json());

// --- CAR DATA STORAGE ---
// Ye wahi data hai jo pehle Flutter mein tha.
// Ab ye Server par zinda hai.
const carData = {
    'honda': [
        {
            'name': 'City (2021-2025)',
            'folder': 'city_2021_2025',
            'tagline': 'Aspire / 1.2 / 1.5'
        }
    ],
    'toyota': [
        {
            'name': 'Corolla Grande (2020-2025)',
            'folder': 'corolla_2020_2025',
            'tagline': 'Altis / Grande X'
        }
    ],
    'haval': [
        {
            'name': 'Haval H6 (2020-2025)',
            'folder': 'h6_2020_2025',
            'tagline': 'HEV / 1.5T / 2.0T'
        }
    ]
};

// --- API API ENDPOINT ---
// Jab Flutter call karega: http://IP:3000/api/cars/honda
app.get('/api/cars/:companyId', (req, res) => {
    // 1. URL se company ka naam nikalo (e.g. "honda")
    const companyId = req.params.companyId.toLowerCase();

    console.log(`📡 Request received for: ${companyId}`); // Terminal mein dikhega

    // 2. Data check karo
    const cars = carData[companyId];

    // 3. Agar data hai to bhejo, warna Error do
    if (cars) {
        res.json(cars);
    } else {
        res.status(404).json({ message: "No cars found for this company" });
    }
});

// --- SERVER START ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ SaloMods Server is running!`);
    console.log(`👉 Waiting for App requests on Port ${PORT}...`);
});