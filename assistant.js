var payload = JSON.stringify({
	model: "gpt-3.5-turbo",
	messages: [
		{
			role: "system",
			content:
				"You are an extension that creates useful information to be shown below a search at google.com. Use extra whitespace only if needed.",
		},
		{ role: "user", content: document.getElementsByTagName("input")[0].value },
	],
});

function onError(error) {
	console.log(`Error: ${error}`);
}

let dynamicStyles = null;

function addAnimation(body) {
	if (!dynamicStyles) {
		dynamicStyles = document.createElement("style");
		document.head.appendChild(dynamicStyles);
	}

	dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}

addAnimation(`
      @keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(359deg);
  }
}
    `);

function onGot(item) {
	let token = "";
	if (item.token) {
		token = item.token;
	}
	var outerdiv = `
	<div id="assistant" style="white-space: pre-wrap;background-color: #444654; width:50%; border-radius:10px; margin-bottom: 2.5%; padding:10px; position:relative;"> 
	<div id="title" style="background-color:#3f3f46; height:53px; width: fit-content; border-radius:10px; display:flex; position:absolute; top:9px; left:1%; margin-bottom:2em;">
		<img id="icon" src="https://chat.openai.com/favicon-32x32.png" style="margin:5px; height:70%; border-radius:50%; vertical-align:middle; animation: rotation 2s infinite linear;"></img>
		<p id="loading" style="vertical-align:middle; margin-left:3%; margin-top:8px; position:relative; ">Output generating</p>
	</div>
	<div id="text" style="margin-top:10px;"></div>
	</div>`;
	document.getElementById("extabar").innerHTML += outerdiv;
	fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: payload,
	})
		.then(res => res.json())
		.then(response => response.choices[0].message.content)
		.then(message => {
			message
				.replaceAll(/^(?:[2-9]|\d\d\d*)$/g, "\n$1")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;");
			document
				.getElementById("text")
				.appendChild(document.createTextNode(`${message}`));
			document.getElementById("icon").style.animation = "none";
			document.getElementById("icon").style.border.radius = "10px";
			document.getElementById("loading").innerHTML =
				"Output generated by ChatGPT-3";
		});
}

const getting = browser.storage.local.get("token");
getting.then(onGot, onError);
