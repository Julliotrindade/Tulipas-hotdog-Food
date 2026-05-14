import { useState } from "react";

export default function PedidoHotdog() {

  // ✅ 🎛️ CONTROLE DE TAMANHOS (MUDE AQUI FACILMENTE)

  const TAMANHO = {
    larguraApp: 500, // 👉 largura total do layout
    imagem: 120, // 👉 tamanho da imagem
    titulo: 24, // 👉 nome do produto
    preco: 18, // 👉 preço
    botao: 40, // 👉 tamanho botão + e -
    quantidade: 20, // 👉 número do item
    paddingCard: 20 // 👉 espaço interno do card
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
        msg += `${p.qtd}x ${p.nome}\n\n`;
      }
    });

    msg += `\uD83D\uDCB0 Total: R$ ${calcularTotal().toFixed(2)}\n\n`;

    msg += `\uD83D\uDCB3 Pagamento: ${pagamento}\n`;
    msg += `\uD83D\uDEF5 Endereço: ${endereco}\n\n`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center", // 👉 centraliza tela
      background: "#f4f4f4",
      minHeight: "100vh"
    }}>

      {/* 👉 largura do app */}
      <div style={{
        width: "100%",
        maxWidth: TAMANHO.larguraApp,
        padding: 20
      }}>

        <h1 style={{ textAlign: "center" }}>🍔 Tulipa's Hotdog</h1>

        {produtos.map((p, i) => (
          <div key={i} style={{
            background: "white",
            borderRadius: 16,
            padding: TAMANHO.paddingCard,
            marginBottom: 15,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>

            {/* 👉 IMAGEM + TEXTO */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 15
            }}>
              {/* 👉 mudar tamanho da imagem */}
              {p.img},
                  borderRadius: 10,
                  objectFit: "cover"
                }}
              />

              <div>
                {/* 👉 mudar tamanho do nome */}
                <h3 style={{
                  margin: 0,
                  fontSize: TAMANHO.titulo
                }}>
                  {p.nome}
                </h3>

                {/* 👉 mudar tamanho do preço */}
                <p style={{
                  margin: 0,
                  fontSize: TAMANHO.preco,
                  color: "green",
                  fontWeight: "bold"
                }}>
                  R$ {p.preco}
                </p>
              </div>
            </div>

            {/* 👉 BOTÕES */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginTop: 10
            }}>

              <button
                style={{
                  width: TAMANHO.botao,
                  height: TAMANHO.botao,
                  borderRadius: "50%"
                }}
                onClick={() => {
                  const n = [...produtos];
                  if (n[i].qtd > 0) n[i].qtd--;
                  setProdutos(n);
                }}
              >
                -
              </button>

              {/* 👉 tamanho do número */}
              <span style={{
                fontSize: TAMANHO.quantidade,
                margin: "0 15px"
              }}>
                {p.qtd}
              </span>

              <button
                style={{
                  width: TAMANHO.botao,
                  height: TAMANHO.botao,
                  borderRadius: "50%",
                  background: "#25D366",
                  color: "white"
                }}
                onClick={() => {
                  const n = [...produtos];
                  n[i].qtd++;
                  setProdutos(n);
                }}
              >
                +
              </button>
            </div>

            {/* OBS */}
            <input
              placeholder="Observação"
              style={{
                width: "100%",
                marginTop: 10,
                padding: 10,
                fontSize: 14
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
        <div style={{ background: "white", padding: 15 }}>
          <h3>💳 Pagamento</h3>

          <label><input type="radio" onChange={() => setPagamento("Pix")} /> Pix</label>
          <label><input type="radio" onChange={() => setPagamento("Cartão")} /> Cartão</label>
          <label><input type="radio" onChange={() => setPagamento("Espécie")} /> Espécie</label>
        </div>

        {/* ENDEREÇO */}
        <div style={{ background: "white", padding: 15, marginTop: 10 }}>
          <h3>🛵 Endereço</h3>
          <input
            style={{ width: "100%", padding: 10 }}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <button
          onClick={enviar}
          style={{
            width: "100%",
            padding: 15,
            marginTop: 10
          }}
        >
          Enviar Pedido
        </button>

      </div>
    </div>
  );
}
