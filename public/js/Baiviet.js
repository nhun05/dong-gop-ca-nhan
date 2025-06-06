let currentUser = "nguyenvana";

// ==== POST FUNCTIONS ====

function generatePostId() {
  return "post_" + Date.now();
}

function savePostsToLocalStorage(posts) {
  localStorage.setItem("bkdocs_posts", JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
  const stored = localStorage.getItem("bkdocs_posts");
  return stored ? JSON.parse(stored) : [];
}

function renderPost(post) {
  const postList = document.getElementById("postList");
  const div = document.createElement("div");
  div.className = "post";
  div.id = post.id;

  div.innerHTML = `
    <div class="meta"><strong>${post.username}</strong> • ${post.timestamp}</div>
    <div class="content">${post.text}</div>
    ${post.image ? `<img src="${post.image}" alt="Ảnh bài viết">` : ""}
    ${post.file ? `<p><a href="${post.file}" download>📎 ${post.fileName}</a></p>` : ""}
    <div class="controls">
      <button class="edit" onclick="editPost('${post.id}')">Chỉnh sửa</button>
      <button class="delete" onclick="deletePost('${post.id}')">Xóa</button>
      <button onclick="savePost('${post.id}')">Lưu trữ</button>
    </div>
    <div class="comment-box">
      <input type="text" placeholder="Viết bình luận..." onkeypress="handleComment(event, '${post.id}')">
      <div class="comment-list" id="comments-${post.id}"></div>
    </div>
  `;

  postList.prepend(div);
}

function deletePost(postId) {
  if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;

  const posts = loadPostsFromLocalStorage().filter(p => p.id !== postId);
  savePostsToLocalStorage(posts);

  const postEl = document.getElementById(postId);
  if (postEl) postEl.remove();
}

function editPost(postId) {
  const postEl = document.getElementById(postId);
  const content = postEl.querySelector(".content").textContent;

  document.getElementById("postText").value = content;
  deletePost(postId);
}

function savePost(postId) {
  alert("Bài viết đã được lưu vào mục lưu trữ! (chức năng đang phát triển)");
}

// ==== COMMENT ====

function handleComment(event, postId) {
  if (event.key === "Enter") {
    const input = event.target;
    const comment = input.value.trim();
    if (!comment) return;

    const commentList = document.getElementById(`comments-${postId}`);
    commentList.innerHTML += `<div class="comment"><strong>${currentUser}:</strong> ${comment}</div>`;
    input.value = "";
  }
}

// ==== POST SUBMIT ====

document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const text = document.getElementById("postText").value.trim();
  const fileInput = document.getElementById("postFile");
  const file = fileInput.files[0];

  if (!text && !file) {
    alert("Vui lòng nhập nội dung hoặc tải lên tệp!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const newPost = {
      id: generatePostId(),
      username: currentUser,
      timestamp: new Date().toLocaleString("vi-VN"),
      text: text,
      file: file ? reader.result : null,
      fileName: file ? file.name : null,
      image: file && file.type.startsWith("image/") ? reader.result : null,
    };

    const current = loadPostsFromLocalStorage();
    current.push(newPost);
    savePostsToLocalStorage(current);
    renderPost(newPost);

    // Reset form
    document.getElementById("postForm").reset();
  };

  if (file) reader.readAsDataURL(file);
  else reader.onload();
});

// ==== INIT ====

window.addEventListener("DOMContentLoaded", () => {
  const posts = loadPostsFromLocalStorage();
  posts
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .forEach(renderPost);
});

