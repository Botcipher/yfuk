document.addEventListener("DOMContentLoaded", function () {
	const demoForm = document.getElementById("demoForm");

	if (demoForm) {
		demoForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Simple form validation
			const name = document.getElementById("name").value;
			const email = document.getElementById("email").value;
			// const phone = document.getElementById("phone").value;
			// const company = document.getElementById("company").value;
			// const date = document.getElementById("date").value;
			// const time = document.getElementById("time").value;

			if (!name || !email) {
				alert("Please fill in all required fields.");
				return;
			}

			// Email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				alert("Please enter a valid email address.");
				return;
			}

			// If validation passes, show success message
			alert(
				"Thank you! Your demo has been scheduled. We will send a confirmation email shortly."
			);
			demoForm.reset();
		});
	}

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 100,
					behavior: "smooth",
				});
			}
		});
	});

	// Add mobile menu functionality
	const createMobileMenu = () => {
		const header = document.querySelector(".header");
		if (!header) return;

		// Create mobile menu button
		const mobileMenuBtn = document.createElement("button");
		mobileMenuBtn.className = "mobile-menu-btn";
		mobileMenuBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;

		// Create mobile menu
		const mobileMenu = document.createElement("div");
		mobileMenu.className = "mobile-menu";
		mobileMenu.innerHTML = `
          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="index.html#features">Features</a></li>
              <li><a href="index.html#how-it-works">How It Works</a></li>
              <li><a href="index.html#testimonials">Testimonials</a></li>
              <li><a href="demo.html">Book a Demo</a></li>
            </ul>
          </nav>
        `;

		// Add mobile menu to header
		const container = header.querySelector(".container");
		container.style.display = "flex";
		container.style.justifyContent = "space-between";
		container.style.alignItems = "center";
		container.appendChild(mobileMenuBtn);
		header.appendChild(mobileMenu);

		// Toggle mobile menu
		mobileMenuBtn.addEventListener("click", () => {
			mobileMenu.classList.toggle("active");
		});

		// Add styles for mobile menu
		const style = document.createElement("style");
		style.textContent = `
          .mobile-menu-btn {
            display: block;
            background: none;
            border: none;
            cursor: pointer;
          }

          .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background-color: var(--color-white);
            box-shadow: var(--shadow-xl);
            transition: right 0.3s ease;
            z-index: 1000;
            padding: 2rem;
          }

          .mobile-menu.active {
            right: 0;
          }

          .mobile-menu nav ul {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .mobile-menu nav ul li a {
            font-size: 1.25rem;
            font-weight: 500;
          }

          @media (min-width: 768px) {
            .mobile-menu-btn {
              display: none;
            }

            .mobile-menu {
              display: none;
            }
          }
        `;
		document.head.appendChild(style);
	};

	// Initialize mobile menu
	createMobileMenu();
});

// Add animation effects
const addAnimations = () => {
	const style = document.createElement("style");
	style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-text, .hero-image, .feature-card, .step, .testimonial-card {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .hero-text { animation-delay: 0.2s; }
        .hero-image { animation-delay: 0.4s; }

        .feature-card:nth-child(1) { animation-delay: 0.2s; }
        .feature-card:nth-child(2) { animation-delay: 0.4s; }
        .feature-card:nth-child(3) { animation-delay: 0.6s; }

        .step:nth-child(1) { animation-delay: 0.2s; }
        .step:nth-child(2) { animation-delay: 0.4s; }
        .step:nth-child(3) { animation-delay: 0.6s; }
        .step:nth-child(4) { animation-delay: 0.8s; }

        .testimonial-card:nth-child(1) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.4s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.6s; }
        .testimonial-card:nth-child(4) { animation-delay: 0.8s; }

        .hero-text, .hero-image, .feature-card, .step, .testimonial-card {
          opacity: 0;
        }
      `;
	document.head.appendChild(style);
};

// Initialize animations
addAnimations();

document.getElementById("demoForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const form = e.target;
	const formData = new FormData(form);

	fetch("https://formspree.io/f/mrbqeryj", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: formData,
	})
		.then((response) => {
			if (response.ok) {
				document.getElementById("formMessage").innerHTML =
					"<p style='color: green;'>Thank you! Your demo is scheduled.</p>";
				form.reset();
			} else {
				document.getElementById("formMessage").innerHTML =
					"<p style='color: red;'>Something went wrong. Try again.</p>";
			}
		})
		.catch((error) => {
			document.getElementById("formMessage").innerHTML =
				"<p style='color: red;'>Error submitting form.</p>";
			console.error(error);
		});
});
