const base_url = `https://api.github.com`

const options = {
	headers: new Headers({
		Accept: 'application/vnd.github.v3+json'
	})
}

function getRepoHTML(repos) {
	return repos.map((repo, index) => {
		return `<li><a href=${repo.url} target="_balnk" rel="noopener">${repo.name}</a></li>`
	})
}

function getUserRepos(username) {
	const url = `${base_url}/users/${username}/repos`

	fetch(url, options)
		.then(response => {
			// the new code starts here
			if (response.ok) {
				return response.json()
			}
			throw new Error(response.statusText)
		})
		.then(repos => {
			console.log(repos) // [{ name, url }]

			// clear the error
			$('#js-error-message').text('')

			// if repos is empty
			if (repos.length < 1) {
				console.log('empty repo')
				$('#js-error-message').text(`That user has no repos!`)
			} else {
				const reposHTML = getRepoHTML(repos)
				
				// unhide results section & render HTML
				$('#results').show()
                $('#results-list').html(reposHTML)
			}
		})
		.catch(err => {
			console.log('err!')
			$('#js-error-message').text(`Something went wrong: ${err.message}`)
		})
}

function handleSubmit() {
	$('#search-form').on('submit', e => {
		e.preventDefault()

		// hide #results-list
		$('#results').hide()

		const username = $('#search').val()
		const repos = getUserRepos(username)
	})
}

$(() => {
	handleSubmit()
})