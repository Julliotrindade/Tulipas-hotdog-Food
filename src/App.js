import { useState } from "react";

export default function PedidoHotdog() {
  const [produtos, setProdutos] = useState([
    {
      nome: "Hotdog Tradicional",
      preco: 7,
      qtd: 0,
      max: 10,
      img: "https://i.imgur.com/5bXG3kF.png",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    },
    {
      nome: "Hotdog Carne de sol na nata",
      preco: 8,
      qtd: 0,
      max: 10,
      img: "https://i.imgur.com/5bXG3kF.png",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    },
    {
      nome: "Hotdog Franbacon",
      preco: 10,
      qtd: 0,
      max: 10,
      img: "https://i.imgur.com/5bXG3kF.png",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    },
    {
      nome: "Hotdog Americano",
      preco: 10,
      qtd: 0,
      max: 10,
      img: "https://i.imgur.com/5bXG3kF.png",
      adicionais: ["Bacon", "Queijo", "Ovo"],
      selecionados: [],
      obs: ""
    },
    {
      nome: "Refri de 1 Litro",
      preco: 10,
      qtd: 0,
      max: 10,
      img: "https://i.imgur.com/5bXG3kF.png",
      adicionais: ["Pepsi", "Guaraná", "Coca Zero"],
      selecionados: [],
      obs: ""
    }
  ]);

  const numeroWhatsApp = "5584996564129";

  const calcularTotal = () =>
    produtos.reduce((t, p) => t + p.preco * p.qtd, 0);

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

  const enviar = () => {
    let msg = `📝 Resumo do Pedido - Tulipa's Hotdog\n\n`;

    msg += `🛒 Itens:\n`;

    let temItem = false;

    produtos.forEach(p => {
      if (p.qtd > 0 && p.preco) {
        temItem = true;

        const subtotal = p.preco * p.qtd;

        msg += `${p.qtd}x ${p.nome} - R$ ${subtotal.toFixed(2)}\n`;

        if (p.selecionados.length || p.obs) {
          let linhaExtra = "   ➕ ";

          if (p.selecionados.length) {
            linhaExtra += p.selecionados.join(", ");
          }

          if (p.obs) {
            if (p.selecionados.length) {
              linhaExtra += " | ";
            }
            linhaExtra += p.obs;
          }

          msg += linhaExtra + "\n";
        }
      }
    });

    if (!temItem) {
      alert("Adicione pelo menos 1 item!");
      return;
    }

    msg += `\n💰 Total: R$ ${calcularTotal().toFixed(2)}\n\n`;

    msg += `💳 Pagamento: \n`;
    msg += `🛵 Endereço: \n\n`;

    msg += `Confirma o pedido? ✅`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>🍔 Tulipa's Hotdog</h1>

      {produtos.map((p, i) => (
        <div key={i} style={{
          background: "white",
          borderRadius: 12,
          padding: 15,
          marginBottom: 15
        }}>
          <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
            <img src={p.img} width={80} />
            <div>
              <h3>{p.nome}</h3>
              <p>R$ {p.preco}</p>
            </div>
          </div>

          <div>
            <button onClick={() => {
              const n = [...produtos];
              if (n[i].qtd > 0) n[i].qtd--;
              setProdutos(n);
            }}>-</button>

            <span style={{ margin: "0 10px" }}>{p.qtd}</span>

            <button onClick={() => {
              const n = [...produtos];
              if (n[i].qtd < p.max) n[i].qtd++;
              setProdutos(n);
            }}>+</button>
          </div>

          <div>
            {p.adicionais.map((a, idx) => (
              <label key={idx} style={{ marginRight: 10 }}>
                <input
                  type="checkbox"
                  onChange={() => toggleAdicional(i, a)}
                /> {a}
              </label>
            ))}
          </div>

          <input
            placeholder="Observação"
            style={{ width: "100%", marginTop: 10 }}
            onChange={(e) => {
              const n = [...produtos];
              n[i].obs = e.target.value;
              setProdutos(n);
            }}
          />
        </div>
      ))}

      <div style={{ background: "white", padding: 15, marginBottom: 10 }}>
        <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
      </div>

      <button
        onClick={enviar}
        style={{
          width: "100%",
          padding: 15,
          background: "#25D366",
          color: "white",
          border: "none",
          borderRadius: 10
        }}
      >
        Enviar pelo WhatsApp
      </button>
    </div>
  );
}
