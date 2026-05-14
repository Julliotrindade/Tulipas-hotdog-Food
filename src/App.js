import { useState } from "react";

export default function PedidoHotdog() {

  // 👉 LISTA DE PRODUTOS
  // Se mudar nome ou preço aqui → muda no site E no WhatsApp
  const [produtos, setProdutos] = useState([
    {
      nome: "Hotdog Tradicional", // 👉 alterar aqui muda nome no sistema
      preco: 7, // 👉 alterar aqui muda o valor
      qtd: 0,
      max: 10,
      img: "https://revistaoeste.com/oestegeral/wp-content/uploads/2026/02/Imagem-3-11.jpg",
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
    }
  ]);

  // 👉 campos do cliente
  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("");

  const numeroWhatsApp = "5584996564129";

  // 👉 cálculo total (muda automaticamente)
  const calcularTotal = () =>
    produtos.reduce((t, p) => t + p.preco * p.qtd, 0);

  // 👉 marcar adicionais
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

    // ✅ VALIDAÇÃO (OBRIGA preencher)
    if (!endereco || !pagamento) {
      alert("Preencha endereço e forma de pagamento!");
      return;
    }

    let msg = `📝 Resumo do Pedido - Tulipa's Hotdog\n\n`;
    msg += `🛒 Itens:\n\n`;

    let temItem = false;

    produtos.forEach(p => {
      if (p.qtd > 0) {
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

        // ✅ LINHA EM BRANCO ENTRE ITENS
        msg += "\n";
      }
    });

    if (!temItem) {
      alert("Adicione pelo menos 1 item!");
      return;
    }

    msg += `💰 Total: R$ ${calcularTotal().toFixed(2)}\n\n`;

    msg += `💳 Pagamento: ${pagamento}\n`;
    msg += `🛵 Endereço: ${endereco}\n\n`;

    msg += `Confirma o pedido? ✅`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (

    // ✅ CENTRALIZAÇÃO DA TELA
    // mudar "maxWidth" diminui/aumenta largura
    <div style={{
      display: "flex",
      justifyContent: "center", // 👉 centraliza horizontal
      background: "#f4f4f4",
      minHeight: "100vh"
    }}>

      <div style={{
        width: "100%",
        maxWidth: 800, // 👉 tamanho do card (mude aqui)
        padding: 20
      }}>

        <h1 style={{ textAlign: "center" }}>🍔 Tulipa's Hotdog</h1>

        {produtos.map((p, i) => (
          <div key={i} style={{
            background: "white",
            borderRadius: 12,
            padding: 15,
            marginBottom: 15
          }}>
            <div style={{ display: "flex", gap: 15 }}>
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

        {/* PAGAMENTO */}
        <div style={{ background: "white", padding: 15, marginBottom: 10 }}>
          <h3>💳 Forma de pagamento</h3>

          <label>
            <input type="radio" value="Pix"
              onChange={(e) => setPagamento(e.target.value)} /> Pix
          </label>

          <label style={{ marginLeft: 10 }}>
            <input type="radio" value="Cartão"
              onChange={(e) => setPagamento(e.target.value)} /> Cartão
          </label>

          <label style={{ marginLeft: 10 }}>
            <input type="radio" value="Espécie"
              onChange={(e) => setPagamento(e.target.value)} /> Espécie
          </label>
        </div>

        {/* ENDEREÇO */}
        <div style={{ background: "white", padding: 15 }}>
          <h3>🛵 Endereço</h3>

          <input
            placeholder="Digite seu endereço completo"
            style={{ width: "100%", padding: 8 }}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div style={{ background: "white", padding: 15, marginTop: 10 }}>
          <strong>💰 Total: R$ {calcularTotal().toFixed(2)}</strong>
        </div>

        <button
          onClick={enviar}
          style={{
            width: "100%",
            padding: 15,
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: 10,
            marginTop: 10
          }}
        >
          Enviar pelo WhatsApp
        </button>

      </div>
    </div>
  );
}
