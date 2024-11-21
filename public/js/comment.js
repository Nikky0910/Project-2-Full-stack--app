  async function submitComment() {
    const postId = document.getElementById('postId').value;
    const commentText = document.getElementById('commentText').value;
    
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, comment: commentText, date: new Date() }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.getElementById('commentText').value = ''; 
      const commentModal = bootstrap.Modal.getInstance(document.getElementById('commentModal'));
      commentModal.hide();
      location.reload();
    } else {
      alert('Failed to add comment');
    }
  }