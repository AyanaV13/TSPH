export const puzzles = [
  { id: 1,  title: 'Autumn Village',         price: 44, pieces: 500,  category: 'Seasonal',   difficulty: 'Medium', img: null },
  { id: 2,  title: 'Azure Coastline',         price: 52, pieces: 750,  category: 'Nature',     difficulty: 'Hard',   img: null },
  { id: 3,  title: 'Birchwood Trail',         price: 38, pieces: 300,  category: 'Nature',     difficulty: 'Easy',   img: null },
  { id: 4,  title: 'Cobblestone Market',      price: 56, pieces: 1000, category: 'Vintage',    difficulty: 'Expert', img: null },
  { id: 5,  title: 'Coral Reef Dreams',       price: 48, pieces: 500,  category: 'Colorful',   difficulty: 'Medium', img: null },
  { id: 6,  title: 'Desert Sunset',           price: 48, pieces: 500,  category: 'Landscapes', difficulty: 'Medium', img: null },
  { id: 7,  title: 'Enchanted Garden',        price: 60, pieces: 1000, category: 'Colorful',   difficulty: 'Expert', img: null },
  { id: 8,  title: 'Foggy Mountain Pass',     price: 44, pieces: 500,  category: 'Landscapes', difficulty: 'Medium', img: null },
  { id: 9,  title: 'Forest at Dawn',          price: 48, pieces: 500,  category: 'Nature',     difficulty: 'Medium', img: null },
  { id: 10, title: 'Golden Harvest',          price: 42, pieces: 500,  category: 'Seasonal',   difficulty: 'Medium', img: null },
  { id: 11, title: 'Harbor at Dusk',          price: 54, pieces: 750,  category: 'Vintage',    difficulty: 'Hard',   img: null },
  { id: 12, title: 'Icy Tundra',              price: 36, pieces: 300,  category: 'Seasonal',   difficulty: 'Easy',   img: null },
  { id: 13, title: 'Kaleidoscope Burst',      price: 50, pieces: 750,  category: 'Colorful',   difficulty: 'Hard',   img: null },
  { id: 14, title: 'Lavender Fields',         price: 46, pieces: 500,  category: 'Nature',     difficulty: 'Medium', img: null },
  { id: 15, title: 'Midnight Bloom',          price: 56, pieces: 1000, category: 'Colorful',   difficulty: 'Expert', img: null },
  { id: 16, title: 'Northern Lights',         price: 62, pieces: 1000, category: 'Landscapes', difficulty: 'Expert', img: null },
  { id: 17, title: 'Old Town Square',         price: 52, pieces: 750,  category: 'Vintage',    difficulty: 'Hard',   img: null },
  { id: 18, title: 'Painted Desert',          price: 44, pieces: 500,  category: 'Landscapes', difficulty: 'Medium', img: null },
  { id: 19, title: 'Quiet Lakeside',          price: 40, pieces: 300,  category: 'Nature',     difficulty: 'Easy',   img: null },
  { id: 20, title: 'Rainy Day Café',          price: 50, pieces: 750,  category: 'Vintage',    difficulty: 'Hard',   img: null },
  { id: 21, title: 'Snowy Cabin',             price: 40, pieces: 300,  category: 'Seasonal',   difficulty: 'Easy',   img: null },
  { id: 22, title: 'Starry Vineyard',         price: 58, pieces: 1000, category: 'Landscapes', difficulty: 'Expert', img: null },
  { id: 23, title: 'Sunflower Valley',        price: 46, pieces: 500,  category: 'Colorful',   difficulty: 'Medium', img: null },
  { id: 24, title: 'Twilight Carnival',       price: 54, pieces: 750,  category: 'Colorful',   difficulty: 'Hard',   img: null },
]

export const CATEGORIES = ['Seasonal', 'Nature', 'Colorful', 'Vintage', 'Landscapes']

export const PRICE_RANGES = [
  { label: 'Under $40', min: 0,  max: 39 },
  { label: '$40 – $49', min: 40, max: 49 },
  { label: '$50 – $59', min: 50, max: 59 },
  { label: '$60+',      min: 60, max: Infinity },
]

export const PIECE_COUNTS = [300, 500, 750, 1000]
