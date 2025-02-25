import { fetchPosts } from "../../api/request.mjs";


document.addEventListener("DOMContentLoaded", async () => {
    const postList = document.querySelector("#post-list");
    const createBtn = document.querySelector("#create-btn");
    const dropdownMenu = document.querySelector("#dropdown-menu");
    const profileImg = document.querySelector(".profile-img");

    // 날짜 및 시간 포맷팅 함수
    const getFormattedDate = (post) => {
        return new Date(post.created_at).toISOString().replace("T", " ").slice(0, 19);
    }

    // const getFormattedCurrentDate = () => {
    //     return new Date().toISOString().replace("T", " ").slice(0, 19);
    // }

    // 숫자 단위 변환 함수
    const formatNumber = (num) => {
        if (num >= 100000) return Math.floor(num / 1000) + "k";
        if (num >= 10000) return (num / 1000).toFixed(0) + "k";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num;
    };

    const handlePostClick = (event) => {
        const postElement = event.currentTarget;
        const postId = parseInt(postElement.getAttribute("data-id")); // 클릭한 게시글의 ID를 가져옴
        window.location.href = `../../pages/posts/detail.html?postId=${postId}`; // 상세 페이지 이동
    };

    // 게시글 카드 생성 함수 (비동기)
    const createPostCard = async (post) => {
        const postStats = `좋아요 ${formatNumber(post.likes)} | 댓글 ${formatNumber(post.comments.length)} | 조회수 ${formatNumber(post.views)}`;

        // 작성자에 해당하는 프로필 사진을 IndexedDB에서 조회 (base64 문자열)
        let authorImgUrl = await getProfileImageFromDB(post.author);
        if (!authorImgUrl) {
            // 프로필 사진이 없으면 기본 이미지 사용
            authorImgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s";
        }

        const newPost = document.createElement("div");
        newPost.classList.add("post");
        newPost.setAttribute("data-id", post.id);
        newPost.innerHTML = `
      <h2>${post.title.slice(0, 26)}</h2>
      <p class="meta">${postStats}</p>
      <p class="time">${getFormattedDate(post)}</p> 
      <div class="author-container">
          <img src="${authorImgUrl}" alt="${post.author}의 프로필" class="author-img">
          <p class="author">${post.author}</p>
      </div>
    `;

        // 게시글 클릭 시 상세 페이지로 이동
        newPost.addEventListener("click", handlePostClick);
        postList.appendChild(newPost);
    };

    const posts = await fetchPosts();
    postList.innerHTML = ""; // 기존 목록 초기화

    // 각 게시글마다 프로필 사진 조회 후 카드 생성 (for-of 문 사용)
    for (const post of posts) {
        await createPostCard(post);
    }



    // // 추가 게시글 로드
    // const loadMorePosts = () => {
    //     Array.from({ length: 1 }, () => {
    //         const likes = Math.floor(Math.random() * 1500);
    //         const comments = Math.floor(Math.random() * 1200);
    //         const views = Math.floor(Math.random() * 200000);
    //         const postStats = `좋아요 ${formatNumber(likes)} | 댓글 ${formatNumber(comments)} | 조회수 ${formatNumber(views)}`;
    //         // 실제 게시글 객체 생성
    //         const dummyPost = {
    //             id: 0, // 고유 id 부여
    //             title: "제목 1",
    //             stats: postStats,
    //             date: getFormattedCurrentDate(),
    //             author: "더미 작성자 1",
    //             authorImgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
    //         };
    //         createPost(dummyPost);
    //     });
    // };

    // 게시글 작성 버튼 이벤트
    createBtn.addEventListener("click", () => {
        window.location.href = "../../pages/posts/create.html";
    });

    // // 인피니티 스크롤 이벤트
    // window.addEventListener("scroll", () => {
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //         loadMorePosts();
    //     }
    // });

    // 드롭다운 메뉴 토글 함수
    const toggleDropdown = () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    };

    profileImg.addEventListener("click", toggleDropdown);

    document.addEventListener("click", (event) => {
        if (!event.target.matches(".profile-img")) {
            dropdownMenu.style.display = "none";
        }
    });
});