import { renderHeader } from '/js/components/header.mjs'; 
import { createPost } from "../../api/request.mjs";


    renderHeader();  // 공통 헤더 삽입 
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

    submitBtn.addEventListener("click", async(event) => {
        event.preventDefault();
        const title = titleInput.value; 
        const content = contentInput.value;
        const author = "current user";
        const created_at = new Date(Date.now()).toISOString();
        const views=0;
        const comments=[];
        const likes=0;
        // 파일 가져오기
    const file = fileInput.files[0];

    let imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg"; // 기본값은 새 사진
    if (file) {
        // const formData = new FormData();
        // formData.append('file', file);

        // try {
        //     const response = await fetch('/upload', {
        //         method: 'POST',
        //         body: formData
        //     });
        //     const result = await response.json();
        //     if (response.ok) {
        //         imgUrl = result.picture; // 업로드된 파일의 경로
        //     } else {
        //         alert("파일 업로드 실패: " + result.message);
        //     }
        // } catch (error) {
        //     console.error("오류 발생:", error);
        // }
    }

        await createPost(author, title, content, created_at, likes, comments, views, imgUrl);

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

