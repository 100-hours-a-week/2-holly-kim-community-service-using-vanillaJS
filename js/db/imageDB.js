function openImageDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("imageDB", 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("images")) {
                db.createObjectStore("images", { keyPath: "username" }); // username을 keyPath로 설정
            }
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

function saveProfileImage(username, imageData) {
    return openImageDB().then(db => {
        const transaction = db.transaction("profileImages", "readwrite");
        const store = transaction.objectStore("profileImages");
        store.put({ username, data: imageData });
    });
}

export {openImageDB, saveProfileImage};