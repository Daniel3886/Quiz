export function login(email, password) {
    return axios.post('http://localhost:3005/auth/login', {
        email,
        password,
    }, { withCredentials: true });
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    console.log('Submitting...')
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    const { data } = await login(email, password);
})
