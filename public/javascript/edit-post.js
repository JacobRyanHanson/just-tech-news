document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

async function editFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('input[name="post-title"]').value.trim();
	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];
	// Updates a post.
	const response = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			title
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.ok) {
		document.location.replace('/dashboard/');
	} else {
		alert(response.statusText);
	}
}