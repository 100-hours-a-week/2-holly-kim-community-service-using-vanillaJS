import { renderHeader } from '/js/components/header.mjs';
import { createPost } from "../../api/request.mjs";

renderHeader();  // 공통 헤더 삽입 

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const fileInput = document.getElementById("picture-upload");
const submitBtn = document.getElementById("complete");

const submitError = document.getElementById("submit-error");
let isValid = false;

function validateInputs() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    isValid = title.length > 0 && content.length > 0;

    submitError.textContent = isValid ? "" : "*제목과 내용을 모두 작성해주세요.";
    submitBtn.disabled = !isValid;
}

titleInput.addEventListener("input", function () {
    if (titleInput.value.length > 26) {
        titleInput.value = titleInput.value.slice(0, 26);
    }
    validateInputs();
});

contentInput.addEventListener("input", validateInputs);

fileInput.addEventListener("change", function () {
    const fileName = this.files.length > 0 ? this.files[0].name : "파일을 선택해주세요.";
    document.getElementById("file-name").textContent = fileName;
});

// ------------------------------------------
// IndexedDB 관련 헬퍼 함수들
// ------------------------------------------

// DB 열기 또는 생성하기 (DB 이름: imageDB, 오브젝트 스토어: images)
function openImageDB() {
    return new Promise((resolve, reject) => {
         const request = indexedDB.open("imageDB", 1);
         request.onupgradeneeded = (event) => {
             const db = event.target.result;
             if (!db.objectStoreNames.contains("images")) {
                  db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
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

// base64 문자열을 IndexedDB에 저장하기
function storeImage(imgData) {
    return openImageDB().then(db => {
         return new Promise((resolve, reject) => {
              const transaction = db.transaction("images", "readwrite");
              const store = transaction.objectStore("images");
              const request = store.add({ data: imgData, timestamp: Date.now() });
              request.onsuccess = () => {
                  resolve(request.result);
              };
              request.onerror = (e) => {
                  reject(e.target.error);
              };
         });
    });
}

// 파일을 base64 data URL로 변환하기
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = function(e) {
              resolve(e.target.result);
         };
         reader.onerror = function(e) {
              reject(e);
         };
         reader.readAsDataURL(file);
    });
}

// ------------------------------------------
// 게시글 작성 및 제출 처리
// ------------------------------------------
submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const title = titleInput.value;
    const content = contentInput.value;
    const author = currentUser.nickname;
    const created_at = new Date(Date.now()).toISOString();
    const views = 0;
    const comments = [];
    const likes = 0;
    // 파일 가져오기
    const file = fileInput.files[0];

    // 기본 이미지 URL (파일이 없을 경우)
    let imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg";
    
    if (file) {
         try {
             // 파일을 base64 data URL로 변환
             imgUrl = await readFileAsDataURL(file);
             // IndexedDB에 저장 (원하는 경우 저장된 id를 활용할 수도 있음)
             const imageId = await storeImage(imgUrl);
             console.log("IndexedDB에 이미지 저장 성공, id:", imageId);
         } catch (error) {
             console.error("이미지 처리 중 에러 발생:", error);
         }
    }

    await createPost(author, title, content, created_at, likes, comments, views, imgUrl);

    // 제목이나 내용이 비어있으면 에러 메시지 출력
    if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
        helperText.classList.remove("hidden");
    } else {
        window.location.href = "../posts/list.html";
    }
});

document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("dropdown-menu");

    if (event.target.matches(".profile-img")) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    } else if (dropdown) {
        dropdown.style.display = "none";
    }
});
