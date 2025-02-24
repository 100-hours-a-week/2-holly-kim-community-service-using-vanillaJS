import { renderHeader } from "/js/components/header.mjs";
import { updatePost, fetchPost} from "../../api/request.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    renderHeader(); // 공통 헤더 삽입

    const updateBtn = document.getElementById("update-btn");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("post-content");
    const titleError = document.getElementById("title-error");
    const contentError = document.getElementById("content-error");

    // 게시글 ID를 URL 파라미터에서 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (postId) {
        try {
            // 기존 게시글 내용 불러오기
            const post = await fetchPost(postId);
            if (post) {
                titleInput.value = post.title;
                contentInput.value = post.content;
            }
        } catch (error) {
            console.error("게시글 정보를 불러오는 중 오류 발생:", error);
            alert("게시글 정보를 불러오는 데 실패했습니다.");
        }
    }

    function validateInput() {
        let isValid = true;
        titleError.textContent = "";
        contentError.textContent = "";

        if (!titleInput.value.trim()) {
            titleError.textContent = "제목을 입력해주세요.";
            isValid = false;
        }
        if (!contentInput.value.trim()) {
            contentError.textContent = "내용을 입력해주세요.";
            isValid = false;
        }
        return isValid;
    }

    if (updateBtn) {
        updateBtn.addEventListener("click", async () => {
            if (!validateInput()) return;

            const title = titleInput.value;
            const content = contentInput.value;
            const updatedData = { title, content };

            try {
                const result = await updatePost(postId, updatedData);
                if (result) {
                    setTimeout(() => {
                        window.location.replace(`../../pages/posts/detail.html?postId=${postId}`);
                    }, 500); 
                    alert("게시글 수정 완료");
                } else {
                    alert("게시글 수정 중 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("게시글 수정 오류:", error);
                alert("게시글 수정 중 문제가 발생했습니다.");
            }
        });
    }

    document.addEventListener("click", (event) => {
        const dropdown = document.getElementById("dropdown-menu");

        if (event.target.matches(".profile-img")) {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        } else if (dropdown) {
            dropdown.style.display = "none";
        }
    });
});