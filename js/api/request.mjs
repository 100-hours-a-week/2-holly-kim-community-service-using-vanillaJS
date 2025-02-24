const BASE_URL = "http://localhost:3000"; // JSON Server 주소

// 게시글 목록 가져오기 (GET)
export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`); 
    const posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("게시글 가져오기 실패:", error);
  }
}

// 게시글 작성 (POST)
export async function createPost(author, title, content, created_at, likes, comments, views, imgUrl) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, title, content, created_at, likes, comments, views, imgUrl }),
    }); 
    post = await response.json();
    console.log(post);
    return post;
  } catch (error) {
    console.error("게시글 작성 실패:", error);
  }
}

// 게시글 상세보기 (GET)
export async function fetchPost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`); 
    if (!response.ok) throw new Error("게시글을 찾을 수 없음");
    const post = await response.json();
    console.log(post);
    return post;
  } catch (error) {
    console.error("게시글 가져오기 실패:", error);
  }
}

// 게시글 수정하기 (PATCH)
export async function updatePost(id, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("게시글 수정 실패");

    const updatedPost = await response.json();
    console.log("게시글 수정 완료:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error);
  }
}

// 게시글 삭제하기 (DELETE)
export async function deletePost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("게시글 삭제 실패");

    console.log(`게시글 ${id} 삭제 완료`);
    return true;
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
    return false;
  }
}

// 게시글 좋아요 수 업데이트 (PATCH)
export async function updatePostLikes(postId, likes) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ likes }), // 좋아요 수를 업데이트
        });

        if (!response.ok) {
            throw new Error("게시글 업데이트 실패");
        }
        
        return await response.json(); // 업데이트된 게시글 반환
    } catch (error) {
        console.error("좋아요 업데이트 실패:", error);
    }
}

