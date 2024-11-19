// Page transition logic
document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link navigation
        const href = this.href; // Get the target URL
        document.body.classList.add('fade-out'); // Add fade-out effect

        // Wait for the fade animation to complete before navigating
        setTimeout(() => {
            window.location.href = href;
        }, 500); // Match the CSS transition duration
    });
});

// Chart.js logic
var ctx = document.getElementById('cybercrimeChart').getContext('2d');
var cybercrimeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Phishing', 'Identity Theft', 'Ransomware', 'Online Fraud', 'Cyberbullying'],
        datasets: [{
            label: 'Cybercrime Cases (in millions)',
            data: [15, 30, 25, 40, 20], 
            backgroundColor: ['#f39c12', '#e74c3c', '#9b59b6', '#2ecc71', '#3498db'],
            borderColor: ['#f39c12', '#e74c3c', '#9b59b6', '#2ecc71', '#3498db'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});