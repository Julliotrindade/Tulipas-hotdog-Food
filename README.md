import { useState } from "react";

export default function PedidoHotdog() {
  const cardStyle = { background: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" };

  const [produtos, setProdutos] = useState([
    {
      nome: "Hotdog Simples",
      preco: 8,
      qtd: 0,
      max: 10,
      img: "https://via.placeholder.com/80",
      adicionais: ["Bacon", "Queijo"],
      selecionados: [],
      obs: ""
    },
    {
      nome: "Hotdog Completo",
      preco: 12,
      qtd: 0,
      max: 10,
      img: "https://via.placeholder.com/80",
      adicionais: ["Bacon", "Queijo", "Milho"],
      selecionados: [],
      obs: ""
    }
  ]);

  const [pagamento, setPagamento] = useState("");
  const [endereco, setEndereco] = useState({ rua: "", numero: "", bairro: "" });

  const numeroWhatsApp = "5584996564129";
  const calcularTotal = () => produtos.reduce((t, p) => t + p.preco * p.qtd, 0);
  const toggleAdicional = (i, item) => {
    const novo = [...produtos];
    const lista = novo[i].selecionados;


    if (lista.includes(item)) {
      novo[i].selecionados = lista.filter(a => a !== item);
    } else {
      novo[i].selecionados.push(item);
    }


    setProdutos(novo);
  };


  const gerarMensagem = () => {
    let msg = "*🍔 Pedido - Hotdog*%0A%0A";

    produtos.forEach(p => {
      if (p.qtd > 0) {
        msg += `• ${p.nome} x${p.qtd}%0A`;


        if (p.selecionados.length > 0)
          msg += `   + ${p.selecionados.join(", ")}%0A`;


        if (p.obs)
          msg += `   Obs: ${p.obs}%0A`;
      }
    });

    msg += `%0A*Total:* R$ ${calcularTotal().toFixed(2)}%0A`;
    msg += `*Pagamento:* ${pagamento}%0A%0A`;


    msg += `*Endereço:*%0A`;
    msg += `Rua: ${endereco.rua}%0A`;
    msg += `Número: ${endereco.numero}%0A`;
    msg += `Bairro: ${endereco.bairro}`;

    return msg;
  };

  const enviar = () => {
    const url = `https://wa.me/${numeroWhatsApp}?text=${gerarMensagem()}`;
    window.open(url, "_blank");
  };

  const painelRapido = () => {
    const nome = prompt("Nome do produto");
    const preco = prompt("Preço");


    if (!nome || !preco) return;


    setProdutos([...produtos, {
      nome,
      preco: Number(preco),
      qtd: 0,
      max: 10,
      img: "https://via.placeholder.com/80",
      adicionais: [],
      selecionados: [],
      obs: ""
    }]);
  };


  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>🍔 Hotdog</h1>
      <button onClick={painelRapido} style={{ marginBottom: 10 }}>
        + Adicionar produto
      </button>


      {produtos.map((p, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ display: "flex", gap: 10 }}>
            <img src={p.img} width={80} />
            <div>
              <strong>{p.nome}</strong>
              <p>R$ {p.preco}</p>
            </div>
          </div>


          <div>
            <button onClick={() => {
              const novo = [...produtos];
              if (novo[i].qtd > 0) novo[i].qtd--;
              setProdutos(novo);
            }}>-</button>

            <span> {p.qtd} </span>


            <button onClick={() => {
              const novo = [...produtos];
              if (novo[i].qtd < p.max) novo[i].qtd++;
              setProdutos(novo);
            }}>+</button>
          </div>


          <div>
            {p.adicionais.map((item, idx) => (
              <label key={idx} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  onChange={() => toggleAdicional(i, item)}
                /> {item}
              </label>
            ))}
          </div>


          <input
            placeholder="Observação"
            style={{ width: "100%", marginTop: 5 }}
            onChange={(e) => {
              const novo = [...produtos];
              novo[i].obs = e.target.value;
              setProdutos(novo);
            }}
          />
        </div>
      ))}


      <div style={cardStyle}>
        <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
      </div>

      <select style={{ width: "100%" }} onChange={(e) => setPagamento(e.target.value)}>
        <option value="">Forma de pagamento</option>
        <option>Dinheiro</option>
        <option>Pix</option>
        <option>Cartão</option>
      </select>
      <div style={cardStyle}>
        <input placeholder="Rua" style={{ width: "100%" }} onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })} />
        <input placeholder="Número" style={{ width: "100%" }} onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })} />
        <input placeholder="Bairro" style={{ width: "100%" }} onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })} />
      </div>

      <button onClick={enviar} style={{ width: "100%", padding: 15, background: "#25D366", color: "white" }}>        Enviar pelo WhatsApp
      </button>
    </div>
  );
}
