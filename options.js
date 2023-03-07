function saveOptions(e) {
	e.preventDefault();
	browser.storage.local.set({
		token: document.querySelector("#token").value,
	});
	console.log("Saved");
}

function restoreOptions() {
	function setCurrentChoice(result) {
		document.querySelector("#token").value = result.token || "";
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	let getting = browser.storage.local.get("token");
	getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
