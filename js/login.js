document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
});

async function login() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const loginUrl = 'http://localhost:8080/usuario/login'; // Corrigido para HTTP se o servidor não estiver configurado para HTTPS

    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                senha: password
            }),
        });

        if (!response.ok) {
            throw new Error('Erro na solicitação: ' + response.statusText);
        }

        const data = await response.json();
        console.log(data)

        if (data.error) {
            errorMessage.textContent = 'Erro: ' + data.error;
        } else {
            alert('Entrou!');
            localStorage.setItem("iduser",data.userId)
            // Redirecionar para outra página, se necessário
            window.location.href = '../html/index.html';
        }
    } catch (error) {
        console.error('Erro:', error);
        errorMessage.textContent = 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.';
    }
}
