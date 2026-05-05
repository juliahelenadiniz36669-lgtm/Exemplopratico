// DTO
class PedidoDTO {
  constructor(cliente, email, sabor, preco) {
    this.cliente = cliente;
    this.email = email; // armazenado mas não exibido
    this.sabor = sabor;
    this.preco = preco;
  }

  validar() {
    if (!this.cliente) {
      throw new Error("Nome obrigatório");
    }

    if (!this.email || !this.email.includes("@")) {
      throw new Error("Email inválido");
    }

    if (!this.sabor) {
      throw new Error("Sabor obrigatório");
    }

    if (isNaN(this.preco) || this.preco <= 0) {
      throw new Error("Preço inválido");
    }

    return true;
  }
}

let pedidos = [];

const precos = {
  "Calabresa": 30,
  "Mussarela": 35,
  "Frango com Catupiry": 40,
  "Portuguesa": 45,
  "Quatro Queijos": 50
};

// Atualiza preço automaticamente
document.getElementById("sabor").addEventListener("change", function () {
  document.getElementById("preco").value = precos[this.value] || "";
});

function adicionarPedido() {
  try {
    const cliente = document.getElementById("cliente").value;
    const email = document.getElementById("email").value;
    const sabor = document.getElementById("sabor").value;
    const preco = parseFloat(document.getElementById("preco").value);

    const pedido = new PedidoDTO(cliente, email, sabor, preco);
    pedido.validar();

    pedidos.push(pedido);

    atualizarLista();

    // Limpar campos
    document.getElementById("cliente").value = "";
    document.getElementById("email").value = "";
    document.getElementById("sabor").value = "";
    document.getElementById("preco").value = "";

  } catch (erro) {
    alert(erro.message);
  }
}

function atualizarLista() {
  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "";

  pedidos.forEach((p) => {
    const li = document.createElement("li");

    li.innerHTML = `
      Cliente: ${p.cliente} <br>
      Sabor: ${p.sabor} <br>
      Preço: R$ ${p.preco.toFixed(2)}
    `;

    lista.appendChild(li);
  });

  const total = pedidos.reduce((soma, p) => soma + p.preco, 0);
  document.getElementById("totalPedidos").innerText =
    "Total: R$ " + total.toFixed(2);
}