const newFormHandler = async (event) => {
  event.preventDefault();

  const city = document.querySelector('#project-city').value.trim();
  const placeName = document.querySelector('#project-placeName').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
  const date_created = document.querySelector('#project-date').value.trim();

  if (!city || !placeName || !description || !date_created) {
    alert('Please fill out all fields.');
    return;
  }

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      city,
      placeName,
      description,
      date_created,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/createpost');
  } else {
    alert('Failed to create post.');
  }
};

async function deleteDan(id) {
  console.log("Attempting to delete post with ID:", id);

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    console.log("Post deleted successfully.");
    window.location.reload();
  } else {
    const errorMsg = await response.text();
    console.error("Failed to delete post:", errorMsg);
    alert('Failed to delete post.');
  }
};

async function editPostView(post) {
  try {

    const response = await fetch(`/api/posts/${post}`);

    if (response.ok) {
      const postData = await response.json();

      document.getElementById("edit-id").value = postData.id;
      document.getElementById("edit-city").value = postData.city;
      document.getElementById("edit-placeName").value = postData.placeName;
      document.getElementById("edit-desc").value = postData.description;
      // const formattedDate = new Date(postData.date).toLocaleDateString('en-US');

      document.getElementById("edit-date_created").value = postData.date_created;
      openModal();

    } else {
      console.error("Failed to fetch post:", await response.text());
      alert("No se pudo cargar los datos del registro.");
    }
  } catch (err) {
    console.error("Error in editPostView:", err);
    alert("Ocurrió un error al cargar los datos del registro.");
  }
}


async function editPost() {

  const idPost = document.getElementById("edit-id").value;
  const city = document.getElementById("edit-city").value;
  const placeName = document.getElementById("edit-placeName").value;
  const description = document.getElementById("edit-desc").value;
  const date = document.getElementById("edit-date_created").value;

  const response = await fetch(`/api/posts/${idPost}`, {
    method: "PUT",
    body: JSON.stringify({ city, placeName, description, date }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    document.location.replace('/createpost');
  } else {
    alert("Failed to update the post.");
  }
}

function closeModal() {
  document.location.reload();
}

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

function openModal() {
  const modal = document.getElementById("editModal");
  modal.classList.add("is-active");
}

// acordeon

document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".toggle-button");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const targetId = event.currentTarget.dataset.target;
      const content = document.getElementById(targetId);
      const icon = event.currentTarget.querySelector(".fas");

      // Alternar la clase `is-hidden` para mostrar u ocultar el contenido
      content.classList.toggle("is-hidden");

      // Cambiar el ícono de flecha
      if (content.classList.contains("is-hidden")) {
        icon.classList.remove("fa-angle-up");
        icon.classList.add("fa-angle-down");
      } else {
        icon.classList.remove("fa-angle-down");
        icon.classList.add("fa-angle-up");
      }
    });
  });
});
