let chats = {
  "Shizuka 🥺": {
    messages: [
      { text: "Hi", from: "other", time: "4 phút" },
      { text: "Em ăn cơm chưa", from: "other", time: "4 phút" },
      { text: "Rồi anh ạ", from: "self", time: "3 phút" },
      { text: "Anh cũng ăn rồi", from: "self", time: "3 phút" },
    ],
    members: ["Shizuka 🥺"]
  },
  "Nhóm 7": {
    messages: [
      { text: "Các bạn làm đến đâu rồi", from: "other", time: "20 giờ" },
      { text: "Tớ đang làm phần giao diện", from: "self", time: "19 giờ" },
    ],
    members: ["Bạn A", "Bạn B", "Bạn C"]
  }
};

let currentChat = "Shizuka 🥺";

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

function loadChat(name) {
  currentChat = name;
  document.querySelectorAll(".chat-item").forEach(el => el.classList.remove("active"));
  [...document.querySelectorAll(".chat-item")].find(item => item.innerText.includes(name)).classList.add("active");

  const chat = chats[name];
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  chat.messages.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message " + msg.from;
    msgDiv.innerHTML = `<div class="bubble">${msg.text}</div><div class="status-msg">${msg.time}</div>`;
    chatBox.appendChild(msgDiv);
  });

  const groupControls = document.getElementById("groupControls");
  const memberList = document.getElementById("memberList");
  if (chat.members.length > 1) {
    groupControls.style.display = "block";
    memberList.innerText = "Thành viên: " + chat.members.join(", ");
  } else {
    groupControls.style.display = "none";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(e) {
  if (e.key === "Enter") sendMsg();
}

function sendMsg() {
  const input = document.getElementById("msgInput");
  const msg = input.value.trim();
  if (!msg) return;

  chats[currentChat].messages.push({ text: msg, from: "self", time: "vừa xong" });
  input.value = "";
  loadChat(currentChat);
}

function toggleAddMember() {
  const form = document.getElementById("addMemberForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function filterUsers() {
  const keyword = document.getElementById("searchUser").value.toLowerCase();
  const results = document.getElementById("userResults");
  results.innerHTML = "";

  const availableUsers = Object.keys(chats).filter(u => u !== currentChat && !chats[currentChat].members.includes(u));
  availableUsers.forEach(u => {
    if (u.toLowerCase().includes(keyword)) {
      const div = document.createElement("div");
      div.textContent = u;
      div.onclick = () => div.classList.toggle("selected");
      div.style.cursor = "pointer";
      div.style.padding = "5px";
      div.style.borderBottom = "1px solid #ccc";
      results.appendChild(div);
    }
  });
}

function confirmAdd() {
  const selected = [...document.querySelectorAll("#userResults .selected")].map(el => el.textContent);
  if (selected.length) {
    chats[currentChat].members.push(...selected);
    document.getElementById("addMemberForm").style.display = "none";
    loadChat(currentChat);
  }
}

function openNewChatModal() {
  document.getElementById("newChatModal").style.display = "block";
  document.getElementById("newChatName").value = "";
  document.getElementById("newChatMembers").value = "";
  document.getElementById("chatType").value = "personal";
  toggleMemberInput();
}

function closeNewChatModal() {
  document.getElementById("newChatModal").style.display = "none";
}

function toggleMemberInput() {
  const type = document.getElementById("chatType").value;
  document.getElementById("memberSection").style.display = type === "group" ? "block" : "none";
}

function createNewChat() {
  const name = document.getElementById("newChatName").value.trim();
  const type = document.getElementById("chatType").value;
  const membersRaw = document.getElementById("newChatMembers").value.trim();

  if (!name) return alert("Vui lòng nhập tên cuộc trò chuyện");

  if (chats[name]) return alert("Tên cuộc trò chuyện đã tồn tại");

  const members = type === "group" ? membersRaw.split(",").map(m => m.trim()).filter(Boolean) : [];

  chats[name] = {
    messages: [],
    members: type === "group" ? members : [name]
  };

  const chatList = document.getElementById("chatList");
  const chatItem = document.createElement("div");
  chatItem.className = "chat-item";
  chatItem.onclick = () => loadChat(name);
  chatItem.innerHTML = `
    <div class="avatar"></div>
    <div class="info">
      <div class="name">${name}</div>
      <div class="status">Mới</div>
    </div>
    <div class="time">bây giờ</div>
  `;
  chatList.appendChild(chatItem);

  closeNewChatModal();
  loadChat(name);
}

function filterChatList() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const items = document.querySelectorAll(".chat-item");
  items.forEach(item => {
    const name = item.querySelector(".name").textContent.toLowerCase();
    item.style.display = name.includes(keyword) ? "flex" : "none";
  });
}

window.onload = () => {
  showSection('messages');
  loadChat(currentChat);
};