document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.desktop-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Hide all windows
            document.querySelectorAll('.window').forEach(window => {
                window.classList.remove('active');
            });
            
            // Show the targeted window
            const targetId = this.getAttribute('data-target');
            const targetWindow = document.querySelector(targetId);
            if (targetWindow) {
                targetWindow.classList.add('active');
            }
        });
    });
    
    // Handle closing of windows
    document.querySelectorAll('.window .close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.window').classList.remove('active');
        });
    });
});
