import { useState } from "react";

export default function PedidoHotdog() {

  // ✅ 🎛️ CONTROLE DE TAMANHOS (MUDE SÓ AQUI)
  const TAMANHO = {
    larguraApp: 500, // 👉 largura do sistema
    imagem: 120, // 👉 tamanho da imagem
    titulo: 22, // 👉 nome do produto
    preco: 18, // 👉 preço
    botao: 40, // 👉 botões + e -
    quantidade: 20, // 👉 número do item
    paddingCard: 20 // 👉 espaçamento do card
  };

  const [produtos, setProdutos] = useState([
    {
      nome: "Hotdog Tradicional",
      preco: 7,
      qtd: 0,
      max: 10,
      img: "https://revistaoeste.com/oestegeral/wp-content/uploads/2026/02/Imagem-3-11.jpg",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    }
  ]);

  const [endereco, setEndereco] = useState("");
  const [pagamento, setPagamento] = useState("");

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

    if (!endereco || !pagamento) {
      alert("Preencha endereço e pagamento!");
      return;
    }

    let msg = "\uD83D\uDCDD Resumo do Pedido\n\n";
    msg += "\uD83D\uDED2 Itens:\n\n";

    produtos.forEach(p => {
      if (p.qtd > 0) {

        const subtotal = p.preco * p.qtd;

        msg += `${p.qtd}x ${p.nome} - R$ ${subtotal.toFixed(2)}\n`;

        if (p.selecionados.length || p.obs) {
          let linhaExtra = "   \u2795 ";

          if (p.selecionados.length) {
            linhaExtra += p.selecionados.join(", ");
          }

          if (p.obs) {
            if (p.selecionados.length) linhaExtra += " | ";
            linhaExtra += p.obs;
          }

          msg += linhaExtra + "\n";
        }

        msg += "\n"; // 👉 espaço entre itens
      }
    });

    msg += `\uD83D\uDCB0 Total: R$ ${calcularTotal().toFixed(2)}\n\n`;
    msg += `\uD83D\uDCB3 Pagamento: ${pagamento}\n`;
    msg += `\uD83D\uDEF5 Endereço: ${endereco}\n\n`;
    msg += "Confirma o pedido? \u2705";

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      background: "#f4f4f4",
      minHeight: "100vh"
    }}>

      <div style={{
        width: "100%",
        maxWidth: TAMANHO.larguraApp,
        padding: 20
      }}>

        <h1 style={{ textAlign: "center" }}>🍔 Tulipa's Hotdog</h1>

        {produtos.map((p, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 16,
              padding: TAMANHO.paddingCard,
              marginBottom: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >

            {/* ✅ IMAGEM + TEXTO */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 15
            }}>
              {p.img}

              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: TAMANHO.titulo
                }}>
                  {p.nome}
                </h3>

                <p style={{
                  margin: 0,
                  fontSize: TAMANHO.preco,
                  color: "#27ae60",
                  fontWeight: "bold"
                }}>
                  R$ {p.preco}
                </p>
              </div>
            </div>

            {/* ✅ BOTÕES */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10
            }}>
              <button
                style={{
                  width: TAMANHO.botao,
                  height: TAMANHO.botao,
                  borderRadius: "50%",
                  background: "#ddd",
                  border: "none",
                  fontSize: 18
                }}
                onClick={() => {
                  const n = [...produtos];
                  if (n[i].qtd > 0) n[i].qtd--;
                  setProdutos(n);
                }}
              >
                -
              </button>

              <span style={{
                fontSize: TAMANHO.quantidade,
                margin: "0 15px",
                fontWeight: "bold"
              }}>
                {p.qtd}
              </span>

              <button
                style={{
                  width: TAMANHO.botao,
                  height: TAMANHO.botao,
                  borderRadius: "50%",
                  background: "#25D366",
                  color: "white",
                  border: "none",
                  fontSize: 18
                }}
                onClick={() => {
                  const n = [...produtos];
                  if (n[i].qtd < p.max) n[i].qtd++;
                  setProdutos(n);
                }}
              >
                +
              </button>
            </div>

            {/* ✅ ADICIONAIS */}
            <div style={{ marginTop: 10 }}>
              {p.adicionais.map((a, idx) => (
                <label key={idx} style={{
                  background: "#eee",
                  padding: "5px 10px",
                  borderRadius: 8,
                  marginRight: 8
                }}>
                  <input
                    type="checkbox"
                    onChange={() => toggleAdicional(i, a)}
                  /> {a}
                </label>
              ))}
            </div>

            {/* ✅ OBSERVAÇÃO */}
            <input
              placeholder="Observação"
              style={{
                width: "100%",
                marginTop: 10,
                padding: 10,
                fontSize: 14,
                borderRadius: 8,
                border: "1px solid #ddd"
              }}
              onChange={(e) => {
                const n = [...produtos];
                n[i].obs = e.target.value;
                setProdutos(n);
              }}
            />
          </div>
        ))}

        {/* PAGAMENTO */}
        <div style={{ background: "white", padding: 15, borderRadius: 12 }}>
          <h3>💳 Pagamento</h3>

          {["Pix", "Cartão", "Espécie"].map(p => (
            <label key={p} style={{ display: "block" }}>
              <input
                type="radio"
                value={p}
                onChange={(e) => setPagamento(e.target.value)}
              /> {p}
            </label>
          ))}
        </div>

        {/* ENDEREÇO */}
        <div style={{
          background: "white",
          padding: 15,
          marginTop: 10,
          borderRadius: 12
        }}>
          <h3>🛵 Endereço</h3>
          <input
            style={{ width: "100%", padding: 10 }}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        {/* BOTÃO FINAL */}
        <button
          onClick={enviar}
          style={{
            width: "100%",
            padding: 15,
            marginTop: 10,
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 16
          }}
        >
          Finalizar Pedido
        </button>

      </div>
    </div>
  );
}
