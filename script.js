const items = [
  {
    id: 1,
    name: "Water Bottle",
    category: "Bottle",
    location: "College Library",
    type: "lost",
    description: "Blue water bottle"
  },
  {
    id: 2,
    name: "Student ID Card",
    category: "ID Card",
    location: "Classroom",
    type: "found",
    description: "Student ID card found near classroom"
  },
  {
    id: 3,
    name: "Black Wallet",
    category: "Wallet",
    location: "Canteen",
    type: "lost",
    description: "Black wallet"
  },
  {
    id: 4,
    name: "Keys",
    category: "Keys",
    location: "Parking Area",
    type: "found",
    description: "Key bunch found"
  }
];

let currentFilter = "all";

function displayItems(list = items) {
  const container = document.getElementById("itemsGrid");

  if (!container) {
    console.error("Items container not found");
    return;
  }

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No items found yet.</p>";
    return;
  }

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Category: ${item.category}</p>
      <p>Location: ${item.location}</p>
      <span>${item.type.toUpperCase()}</span>
    `;

    container.appendChild(card);
  });
}

function searchItems() {
  const searchBox = document.getElementById("searchInput");

  if (!searchBox) return;

  const query = searchBox.value.toLowerCase().trim();

  const filtered = items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);

    const matchesFilter =
      currentFilter === "all" || item.type === currentFilter;

    return matchesSearch && matchesFilter;
  });

  displayItems(filtered);
}

function filterItems(type) {
  currentFilter = type;
  searchItems();
}

function showLostForm() {
  reportItem("lost");
}

function showFoundForm() {
  reportItem("found");
}

function reportItem(type) {
  const name = prompt("Enter item name:");
  if (!name) return;

  const category = prompt("Enter category (ID Card, Wallet, Keys, Bottle):");
  if (!category) return;

  const location = prompt("Enter location:");
  if (!location) return;

  const description = prompt("Enter item description:");

  items.unshift({
    id: Date.now(),
    name: name,
    category: category,
    location: location,
    type: type,
    description: description || "No description"
  });

  displayItems();
  alert("Your item has been reported successfully!");
}

function showFoundForm() {
  const name = prompt("What item did you find?");
  if (!name) return;

  const location = prompt("Where did you find it?");
  if (!location) return;

  items.unshift({
    id: Date.now(),
    name: name,
    category: "Other",
    location: location,
    type: "found",
    description: "Found item reported"
  });

  displayItems();
  alert("Found item added successfully!");
}

document.addEventListener("DOMContentLoaded", function () {
  displayItems();

  const searchBox = document.getElementById("searchInput");

  if (searchBox) {
    searchBox.addEventListener("input", searchItems);
  }
});