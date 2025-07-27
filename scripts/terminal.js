document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll('.terminal').forEach(terminal => {
		const screens = terminal.querySelectorAll('.terminal-screen');

		// Hide non-active screens at start
		screens.forEach(screen => {
			screen.style.display = screen.classList.contains('active') ? 'block' : 'none';
		});

		terminal.addEventListener('click', function (e) {
			const link = e.target.closest('.terminal-link');
			if (!link) return;

			e.preventDefault();
			const targetScreen = link.getAttribute('data-screen');

			screens.forEach(screen => {
				const isTarget = screen.getAttribute('data-screen') === targetScreen;
				screen.classList.toggle('active', isTarget);
				screen.style.display = isTarget ? 'block' : 'none';

				if (isTarget) {
					const output = screen.querySelector('.terminal-output');
					if (output) {
						// Provide the output lines here
						const linesContainer = screen.querySelector('.terminal-lines');
						if (linesContainer) {
							const lines = Array.from(linesContainer.querySelectorAll('div')).map(div => div.innerHTML);
							printLines(output, lines, 90);
						}


					}
				}
			});

			terminal.scrollTop = terminal.scrollHeight;
		});
	});
});


function printLines(container, lines, baseDelay = 80) {
	const terminal = container.closest('.terminal');
	let i = 0;


	function printNext() {
		if (i < lines.length) {
			const line = document.createElement('div');
			line.innerHTML = lines[i];
			container.appendChild(line);
			terminal.scrollTop = terminal.scrollHeight;

			i++;

			// Add jitter: random +/- 10–20ms
			const jitter = Math.floor(Math.random() * 20) - 10; // -10 to +9
			const delay = Math.max(30, baseDelay + jitter);     // Clamp minimum

			setTimeout(printNext, delay);
		}
	}

	container.innerHTML = '';
	printNext();
}
  