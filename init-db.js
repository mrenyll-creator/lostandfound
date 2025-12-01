const sqlite3 = require('sqlite3').verbose();

// Open SQLite database
const db = new sqlite3.Database('admin.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create items table
db.run(`CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'lost',
  image TEXT
)`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Items table created or already exists.');
  }
});

// Insert example lost items
const exampleItems = [
  { description: 'Black backpack with CTU logo', location: 'Library' },
  { description: 'Silver laptop charger', location: 'Computer Lab' },
  { description: 'Blue water bottle', location: 'Cafeteria' },
  { description: 'Red umbrella', location: 'Main Entrance' },
  { description: 'White earphones', location: 'Gym' },
  { description: 'Black wallet with ID card', location: 'Parking Lot' },
  { description: 'Green notebook', location: 'Classroom 101' },
  { description: 'Pink phone case', location: 'Student Center' },
  { description: 'Brown leather belt', location: 'Restroom' },
  { description: 'Gray hoodie', location: 'Auditorium' }
];

exampleItems.forEach(item => {
  db.run(`INSERT INTO items (description, location, status) VALUES (?, ?, 'lost')`,
    [item.description, item.location], function(err) {
    if (err) {
      console.error('Error inserting item:', err.message);
    } else {
      console.log(`Inserted item: ${item.description}`);
    }
  });
});

// Close database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
