document.getElementById('login-student').addEventListener('click', () => {
    window.location.href = 'index.html?role=student';
});

document.getElementById('login-librarian').addEventListener('click', () => {
    window.location.href = 'index.html?role=librarian';
});

document.getElementById('login-admin').addEventListener('click', () => {
    window.location.href = 'index.html?role=admin';
});
