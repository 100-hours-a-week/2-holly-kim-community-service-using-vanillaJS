import { renderHeader } from "/js/components/header.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // 공통 헤더 삽입 및 초기 렌더링
    renderHeader();
    renderComments();
    increaseViewCount();
    attachPostEventListeners();
    attachCommentEventListeners();
    attachGeneralEventListeners();
});

const attachPostEventListeners = () => {
    // 게시글 수정 버튼 (HTML에 id="edit-post" 존재)
    document.getElementById("edit-post")?.addEventListener("click", editPost);
  
    // 게시글 삭제 버튼 (HTML에 id="delete-post" 존재)
    document.getElementById("delete-post")?.addEventListener("click", confirmDelete);
  
    // 모달의 닫기 버튼 (HTML에 id="close-modal" 존재)
    document.getElementById("close-modal")?.addEventListener("click", closeModal);
  
    // 모달의 확인 버튼 (HTML에 id="confirm-delete" 존재)
    document.getElementById("confirm-delete")?.addEventListener("click", deletePost);
  };
  
  const attachCommentEventListeners = () => {
    // 댓글 작성 관련 이벤트
    document.querySelector(".comment-submit")?.addEventListener("click", addComment);
    document.querySelector(".comment-input")?.addEventListener("input", toggleCommentButton);
  };

const attachGeneralEventListeners = () => {
    // 댓글 관련 이벤트 (이벤트 위임)
    document.addEventListener("click", (event) => {
        // 댓글 수정 버튼 (data-id 속성이 있어야 함)
        if (event.target.matches(".edit-comment")) {
            const commentId = Number(event.target.dataset.id);
            editComment(commentId);
        }

        // 댓글 삭제 버튼 (data-id 속성이 있어야 함)
        if (event.target.matches(".delete-comment")) {
            const commentId = Number(event.target.dataset.id);
            deleteComment(commentId);
        }

        // 좋아요 버튼 클릭 (id="like-count")
        if (event.target.id === "like-count") {
            toggleLike();
        }

        // 드롭다운 토글 (프로필 이미지 클릭)
        const dropdown = document.getElementById("dropdown-menu");
        if (event.target.matches(".profile-img")) {
            dropdown.style.display =
                dropdown.style.display === "block" ? "none" : "block";
        } else if (dropdown) {
            dropdown.style.display = "none";
        }
    });
};

/* 게시글 관련 기능 */

// 게시글 수정 (게시글 수정 페이지로 이동)
function editPost() {
    window.location.href = "../../pages/posts/edit.html";
}

// 모달 열기 (게시글 삭제 전 확인)
function confirmDelete() {
    const modal = document.getElementById("delete-modal");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById("delete-modal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// 게시글 삭제 (확인 버튼 클릭 시)
function deletePost() {
    alert("게시글이 삭제되었습니다.");
    window.location.href = "../../pages/posts/list.html";
}

/* 댓글 관련 기능 */

let comments = [
    { id: 1, author: "더미 작성자 1", date: "2021-01-01 00:00:00", content: "댓글 내용 1" },
    { id: 2, author: "더미 작성자 2", date: "2021-01-02 12:34:56", content: "댓글 내용 2" }
];

function renderComments() {
    const commentList = document.querySelector(".comment-list");
    if (!commentList) return;
    commentList.innerHTML = "";

    comments.forEach((comment) => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        commentItem.id = `comment-${comment.id}`;
        commentItem.innerHTML = `
      <div class="comment-meta">
        <span class="comment-author">${comment.author}</span>
        <span class="comment-date">${comment.date}</span>
      </div>
      <p class="comment-content">${comment.content}</p>
      <div class="comment-actions">
        <button class="edit-comment" data-id="${comment.id}">수정</button>
        <button class="delete-comment" data-id="${comment.id}">삭제</button>
      </div>
    `;
        commentList.appendChild(commentItem);
    });

    updateCommentCount();
}

function editComment(commentId) {
    const commentItem = document.getElementById(`comment-${commentId}`);
    if (!commentItem) return;

    const commentContent = commentItem.querySelector(".comment-content");
    if (!commentContent || commentItem.querySelector(".edit-input")) return;

    const oldText = commentContent.innerText;
    commentContent.style.display = "none";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = oldText;
    inputField.classList.add("edit-input");

    const saveButton = document.createElement("button");
    saveButton.innerText = "저장";
    saveButton.classList.add("save-comment");
    saveButton.addEventListener("click", () => saveComment(commentId, inputField.value));

    commentItem.appendChild(inputField);
    commentItem.appendChild(saveButton);
}

function saveComment(commentId, newText) {
    if (!newText.trim()) {
        alert("댓글 내용을 입력하세요!");
        return;
    }

    const commentIndex = comments.findIndex((c) => c.id === commentId);
    if (commentIndex !== -1) {
        comments[commentIndex].content = newText;
    }

    renderComments();
}

function deleteComment(commentId) {
    if (confirm("댓글을 삭제하시겠습니까?")) {
        comments = comments.filter((c) => c.id !== commentId);
        renderComments();
    }
}

function updateCommentCount() {
    const commentCountElement = document.getElementById("comment-count");
    if (commentCountElement) {
        commentCountElement.innerHTML = `${comments.length} <br>댓글`;
    }
}

function addComment() {
    const commentInput = document.querySelector(".comment-input");
    if (!commentInput) return;
    const content = commentInput.value.trim();
    if (content === "") return;

    const newComment = {
        id: comments.length ? comments[comments.length - 1].id + 1 : 1,
        author: "현재 사용자",
        date: new Date().toISOString().replace("T", " ").slice(0, 19),
        content: content
    };

    comments.push(newComment);
    commentInput.value = "";
    toggleCommentButton();
    renderComments();
}

function toggleCommentButton() {
    const commentInput = document.querySelector(".comment-input");
    const submitButton = document.querySelector(".comment-submit");
    if (!commentInput || !submitButton) return;

    if (commentInput.value.trim().length > 0) {
        submitButton.classList.add("active");
        submitButton.disabled = false;
    } else {
        submitButton.classList.remove("active");
        submitButton.disabled = true;
    }
}

/* 조회수 및 좋아요 기능 */

let viewCount = 123;
function increaseViewCount() {
    const viewCountElement = document.getElementById("view-count");
    if (!viewCountElement) return;
    viewCount++;
    viewCountElement.innerHTML = `${viewCount} <br>조회수`;
}

let isLiked = false;
function toggleLike() {
    const likeButton = document.getElementById("like-count");
    if (!likeButton) return;
    let likeCount = parseInt(likeButton.textContent.match(/\d+/)[0]);

    if (isLiked) {
        likeCount--;
        likeButton.classList.remove("liked");
        likeButton.style.backgroundColor = "#f0f0f0";
    } else {
        likeCount++;
        likeButton.classList.add("liked");
        likeButton.style.backgroundColor = "#aca0eb";
    }

    isLiked = !isLiked;
    likeButton.innerHTML = `${formatCount(likeCount)} <br>좋아요`;
}

function formatCount(num) {
    if (num >= 100000) return (num / 100000).toFixed(0) + "k";
    if (num >= 10000) return (num / 10000).toFixed(0) + "k";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
}
window.editPost = editPost;
window.confirmDelete = confirmDelete;
window.closeModal = closeModal;
window.deletePost = deletePost;
window.toggleCommentButton = toggleCommentButton; 
window.editComment = editComment;
window.deleteComment = deleteComment;