// JavaScript to fetch lost and claimed items from the backend API and render dynamically

const API_BASE = 'http://localhost:8000/api';

document.addEventListener('DOMContentLoaded', () => {
  const lostItemsContainer = document.getElementById('lost-items-container');
  const claimedItemsContainer = document.getElementById('claimed-items-container');

  // Helper function to create an item card element
  function createItemElement(item, isClaimed) {
    const card = document.createElement('div');
    card.className = 'item';

    const img = document.createElement('img');
    img.src = `https://via.placeholder.com/300x220?text=${encodeURIComponent(item.description)}`;
    img.alt = `${isClaimed ? 'Claimed' : 'Lost'} ${item.description}`;
    card.appendChild(img);

    const desc = document.createElement('p');
    desc.textContent = `${item.description} - Location: ${item.location}`;
    card.appendChild(desc);

    const label = document.createElement('div');
    label.className = isClaimed ? 'item-label claimed' : 'item-label lost';
    label.textContent = isClaimed ? 'CLAIMED ITEM' : 'LOST ITEM';
    card.appendChild(label);

    // Make card clickable for details
    card.addEventListener('click', () => {
      alert(`${isClaimed ? 'Claimed' : 'Lost'} Item Details:\nDescription: ${item.description}\nLocation: ${item.location}`);
    });

    return card;
  }

  // Load lost items from API
  async function loadLostItems() {
    try {
      const response = await fetch(`${API_BASE}/lost-items`);
      if (!response.ok) throw new Error('Failed to fetch lost items');
      const lostItems = await response.json();
      lostItemsContainer.innerHTML = '';
      if (lostItems.length > 0) {
        lostItems.forEach(item => {
          const el = createItemElement(item, false);
          lostItemsContainer.appendChild(el);
        });
      } else {
        lostItemsContainer.textContent = 'No lost items found.';
      }
    } catch (error) {
      console.error('Error loading lost items:', error);
      lostItemsContainer.textContent = 'Error loading lost items.';
    }
  }

  // Load claimed items from API
  async function loadClaimedItems() {
    try {
      const response = await fetch(`${API_BASE}/claimed-items`);
      if (!response.ok) throw new Error('Failed to fetch claimed items');
      const claimedItems = await response.json();
      claimedItemsContainer.innerHTML = '';
      if (claimedItems.length > 0) {
        claimedItems.forEach(item => {
          const el = createItemElement(item, true);
          claimedItemsContainer.appendChild(el);
        });
      } else {
        claimedItemsContainer.textContent = 'No claimed items found.';
      }
    } catch (error) {
      console.error('Error loading claimed items:', error);
      claimedItemsContainer.textContent = 'Error loading claimed items.';
    }
  }

  // Initial load
  loadLostItems().catch(console.error);
  loadClaimedItems().catch(console.error);

  // Expose functions for external use (e.g., from test.js)
  window.loadLostItems = loadLostItems;
  window.loadClaimedItems = loadClaimedItems;
});
