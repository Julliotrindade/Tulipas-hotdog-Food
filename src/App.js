import { useState } from "react";

export default function App() {
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
    }
  ]);

  const numeroWhatsApp = "5584999999999";

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
    let msg = "🍔 Pedido Hotdog\n\n";

    produtos.forEach(p => {
      if (p.qtd > 0) {
        msg += `${p.nome} x${p.qtd}\n`;

        if (p.selecionados.length)
          msg += `+ ${p.selecionados.join(", ")}\n`;

        if (p.obs)
          msg += `Obs: ${p.obs}\n`;
      }
    });

    msg += `\nTotal: R$ ${calcularTotal().toFixed(2)}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url);
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1>🍔 Hotdog</h1>

      {produtos.map((p, i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <img src={p.img} width={80} alt="produto" />

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
            if (n[i].qtd < p.max) n[i].qtd++;
            setProdutos(n);
          }}>+</button>

          <div>
            {p.adicionais.map((a, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  onChange={() => toggleAdicional(i, a)}
                />
                {a}
              </label>
            ))}
          </div>

          <input
            placeholder="Obs"
            onChange={(e) => {
              const n = [...produtos];
              n[i].obs = e.target.value;
              setProdutos(n);
            }}
          />
        </div>
      ))}

      <h2>Total: R$ {calcularTotal().toFixed(2)}</h2>

      <button onClick={enviar}>
        Enviar WhatsApp
      </button>
    </div>
  );
}
