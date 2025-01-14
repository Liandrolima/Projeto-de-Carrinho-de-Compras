document.addEventListener('DOMContentLoaded', () => {
    // Exibir produtos
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(produtos => {
            const produtosDiv = document.getElementById('produtos');
            produtos.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.innerHTML = `
                    <h3>${produto.title}</h3>
                    <p>${produto.description}</p>
                    <p>Preço: R$ ${produto.price}</p>
                    <button onclick="adicionarCarrinho(${produto.id}, '${produto.title}', ${produto.price})">Adicionar ao Carrinho</button>
                `;
                produtosDiv.appendChild(produtoDiv);
            });
        });

    // Login
    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Exibe a mensagem em português
        });
    });

    // Cadastro
    document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Exibe a mensagem em português
        });
    });

    // Finalizar compra
    document.getElementById('finalizarCompra')?.addEventListener('click', function() {
        fetch('http://localhost:3000/notificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Compra realizada com sucesso!' })
        })
        .then(response => alert('Compra finalizada!')); // Alerta em português
    });
});

// Adicionar produto ao carrinho
function adicionarCarrinho(id, nome, preco) {
    const produto = { id, nome, preco, quantidade: 1 };

    fetch('http://localhost:3000/adicionar-carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto })
    })
    .then(response => response.json())
    .then(data => alert('Produto adicionado ao carrinho!')); // Alerta em português
}
