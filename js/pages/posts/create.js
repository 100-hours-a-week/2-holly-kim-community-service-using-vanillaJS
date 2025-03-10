import { renderHeader } from '/js/components/header.js';
import { createPost } from "../../api/request.js";

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

// 게시글 작성 및 제출 처리
submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const title = titleInput.value;
    const content = contentInput.value;
    const author = currentUser.nickname;
    const email = currentUser.email;
    const created_at = new Date(Date.now()).toISOString();
    const views = 0;
    const comments = [];
    const likes = 0;
    // 파일 가져오기
    const file = fileInput.files[0];

    // 기본 이미지 URL (파일이 없을 경우)
    let imgUrl = "";
    if (file) {
         try { 
            imgUrl = await readFileAsDataURL(file); 
         } catch (error) {
             console.error("이미지 처리 중 에러 발생:", error);
         }
    }
    const postData = {
        email, author, title, content, created_at, likes, comments, views, 
        ...(imgUrl ? { imgUrl } : {})
    };

    await createPost(postData);
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
