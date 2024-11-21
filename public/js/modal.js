function openModal() {
    const modal = document.getElementById("editModal");
    modal.classList.add("is-active");
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.classList.remove("is-active");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-background").addEventListener("click", closeModal);