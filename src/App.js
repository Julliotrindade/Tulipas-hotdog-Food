import { useState, useEffect } from "react";

export default function PedidoHotdog() {

  const [produtos, setProdutos] = useState([]);
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("");

  const numeroWhatsApp = "558496564129";

  useEffect(() => {
    const dados = localStorage.getItem("produtos");
    if (dados) {
      setProdutos(JSON.parse(dados));
    }
  }, []);

  const calcularTotal = () =>
    produtos.reduce((t, p) => t + p.preco * p.qtd, 0);

  const enviar = () => {
    if (!endereco || !pagamento) {
      alert("Preencha endereço e pagamento");
      return;
    }

    let msg = "📝 Pedido:%0A";

    produtos.forEach(p => {
      if (p.qtd > 0) {
        msg += `- ${p.qtd}x ${p.nome} R$${(p.qtd * p.preco)}%0A`;
      }
    });

    msg += `%0ATotal: R$${calcularTotal()}%0A`;
    msg += `Pagamento: ${pagamento}%0A`;
    msg += `Endereço: ${endereco}`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${msg}`);
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>🌭 Meu Delivery</h1>

      {produtos.map((p, i) => (
        <div key={i} style={{ background: "#fff", margin: 10, padding: 10 }}>

          <h3>{p.nome}</h3>
          <p>R$ {p.preco}</p>

          <button onClick={() => {
            const n = [...produtos];
            if (n[i].qtd > 0) n[i].qtd--;
            setProdutos(n);
          }}>-</button>

          {p.qtd}

          <button onClick={() => {
            const n = [...produtos];
            if (n[i].qtd < 10) n[i].qtd++;
            setProdutos(n);
          }}>+</button>

        </div>
      ))}

      {/* BOTÃO FLUTUANTE */}
      <div
        onClick={() => setAbrirCarrinho(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#25D366",
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        🛒
        <span>
          {produtos.reduce((t, p) => t + p.qtd, 0)}
        </span>
      </div>

      {/* CARRINHO */}
      <div style={{
        position: "fixed",
        top: 0,
        right: abrirCarrinho ? 0 : "-100%",
        width: 300,
        height: "100%",
        background: "white",
        padding: 20,
        transition: "0.3s"
      }}>
        <button onClick={() => setAbrirCarrinho(false)}>Fechar</button>

        {produtos.filter(p => p.qtd > 0).map((p, i) => (
          <div key={i}>
            {p.qtd}x {p.nome}
            <button onClick={() => {
              const n = [...produtos];
              n[i].qtd = 0;
              setProdutos(n);
            }}>Remover</button>
          </div>
        ))}

        <h3>Total: R$ {calcularTotal()}</h3>

        <input
          placeholder="Endereço"
          onChange={(e) => setEndereco(e.target.value)}
        />

        <select onChange={(e) => setPagamento(e.target.value)}>
          <option>Pagamento</option>
          <option>Pix</option>
          <option>Cartão</option>
          <option>Dinheiro</option>
        </select>

        <button onClick={enviar}>
          Enviar Pedido
        </button>
      </div>

    </div>
  );
}
