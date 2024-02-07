const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commmentForm");
let delBtns = document.querySelectorAll("#delete__comment");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.querySelector("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.querySelector("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    span2.id = "delete__comment";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if(response.status === 201){
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
};

if(form){
    form.addEventListener("submit", handleSubmit);
};

const deleteComment = async (event) => {
    const li = event.srcElement.parentNode;
    const {dataset: {id: commentId}} = li;
    await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
    });
    li.remove();
}

if(delBtns){
    delBtns.forEach((delBtn) => {delBtn.addEventListener("click", deleteComment);});
}