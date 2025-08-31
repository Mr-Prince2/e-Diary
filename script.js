  // Load saved entries on page load
window.onload = loadEntries;

function saveEntry() {
    let text = document.getElementById("entryInput").value;
    if (text.trim() === "") return alert("Write something first, senpai~");

    let today = new Date();
    let date = today.toLocaleString();

    let entry = { text, date };
    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entries.unshift(entry); // newest first
    localStorage.setItem("diaryEntries", JSON.stringify(entries));

    document.getElementById("entryInput").value = "";
    loadEntries();
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    let entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = "";

    entries.forEach((entry, index) => {
    entriesDiv.innerHTML += `
        <div class="entry">
        <div class="date">📅 ${entry.date}</div>
        <p>${entry.text}</p>
        <button class="delete-btn" onclick="deleteEntry(${index})">Delete ❌</button>
        </div>
    `;
    });
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    loadEntries();
}

function clearAll() {
    if (confirm("Are you sure you want to erase your whole anime arc?")) {
    localStorage.removeItem("diaryEntries");
    loadEntries();
    }
}