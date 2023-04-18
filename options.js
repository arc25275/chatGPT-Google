function saveOptions(e) {
	e.preventDefault();
	browser.storage.local.set({
		token: document.querySelector("#token").value,
		prompt: document.querySelector("#prompt").value,
	});
	console.log("Saved");
}

function restoreOptions() {
	function setCurrentChoice(result) {
		document.querySelector("#token").value = result.token || "";
	}
	function setCurrentChoice2(result) {
		document.querySelector("#prompt").value =
			result.prompt ||
			"You are an extension that creates useful information to be shown below a search at google.com. Use extra whitespace only if needed.";
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	let getting = browser.storage.local.get("token");
	getting.then(setCurrentChoice, onError);
	getting = browser.storage.local.get("prompt");
	getting.then(setCurrentChoice2, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
