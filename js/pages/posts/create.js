import { apiRequest } from "../api/request.js";
import { ENDPOINTS } from "../api/endpoints.js";

async function createPost(postData) {
  return apiRequest(ENDPOINTS.POSTS.CREATE, "POST", postData);
}


document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const fileInput = document.getElementById("picture-upload");
    const submitBtn = document.getElementById("complete");

    const submitError = document.getElementById("submit-error");
    let isValid=false;

    function validateInputs() {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        
        isValid = title.length > 0 && content.length > 0;

        submitError.textContent = isValid ? "": "*제목과 내용을 모두 작성해주세요.";
        submitBtn.disabled=!isValid;
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

    submitBtn.addEventListener("click", function () {
        if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
            helperText.classList.remove("hidden");
        } else {
            window.location.href = "../main/main.html";
        }
    });
});
