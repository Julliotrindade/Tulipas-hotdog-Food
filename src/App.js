import { useState } from "react";

export default function PedidoHotdog() {

  // 👉 EDITAR PRODUTOS AQUI altera tudo no sistema
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
    },
    {
      nome: "Hotdog Carne de sol na nata",
      preco: 8,
      qtd: 0,
      max: 10,
      img: "/images/Refris.jpg",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    },    
    {
      nome: "Hotdog Franbacon",
      preco: 10,
      qtd: 0,
      max: 10,
      img: "https://revistaoeste.com/oestegeral/wp-content/uploads/2026/02/Imagem-3-11.jpg",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    },    
    {
      nome: "Hotdog Americano",
      preco: 10,
      qtd: 0,
      max: 10,
      img: "https://revistaoeste.com/oestegeral/wp-content/uploads/2026/02/Imagem-3-11.jpg",
      adicionais: ["Maionese", "Ketchup"],
      selecionados: [],
      obs: ""
    },    
    {
      nome: "Refrigerante 1L",
      preco: 10,
      qtd: 0,
      max: 10,
      img: "/images/Refri.jpg",
      adicionais: ["Pepis", "Guaraná", "Coca ZERO"],
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
      alert("Preencha endereço e forma de pagamento!");
      return;
    }

    let msg = "\uD83D\uDCDD Resumo do Pedido - Tulipa's Hotdog\n\n";
    msg += "🛒 Itens:\n\n";

    produtos.forEach(p => {
      if (p.qtd > 0) {

        const subtotal = p.preco * p.qtd;

        msg += `${p.qtd}x ${p.nome} - R$ ${subtotal.toFixed(2)}\n`;

        if (p.selecionados.length || p.obs) {
          let linhaExtra = "   ➕ ";

          if (p.selecionados.length) {
            linhaExtra += p.selecionados.join(", ");
          }

          if (p.obs) {
            if (p.selecionados.length) linhaExtra += " | ";
            linhaExtra += p.obs;
          }

          msg += linhaExtra + "\n";
        }

        msg += "\n";
      }
    });

    msg += `💰💳🛒💵 Total: R$ ${calcularTotal().toFixed(2)}\n\n`;
    msg += `💳 Pagamento: ${pagamento}\n`;
    msg += `\uD83D\uDEF5 Endereço: ${endereco}\n\n`;
    msg += "Confirma o pedido? ✅";

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center", // 👉 centraliza tudo
      background: "#f4f4f4",
      minHeight: "100vh"
    }}>

      <div style={{
        width: "100%",
        maxWidth: 500, // 👉 muda largura do sistema aqui
        padding: 20
      }}>

        <h1 style={{ textAlign: "center" }}>🍔 Tulipa's Hotdog</h1>

        {produtos.map((p, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 15,
              marginBottom: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // 👉 sombra
              transition: "0.3s"
            }}
            onMouseEnter={(e) =>
              e.currentTarget.style.transform = "scale(1.03)"
            }
            onMouseLeave={(e) =>
              e.currentTarget.style.transform = "scale(1)"
            }
          >

            {/* 👉 imagem + texto */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 15
            }}>
              <img
                src={p.img}
                style={{
                  width: 80, // 👉 MUDA TAMANHO DA IMAGEM AQUI
                  height: 80,
                  borderRadius: 10,
                  objectFit: "cover"
                }}
              />

              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>
                  {p.nome}
                </h3>

                <p style={{
                  margin: 0,
                  fontSize: 16,
                  color: "#27ae60",
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
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#ddd",
                  border: "none"
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
                margin: "0 15px",
                fontSize: 18,
                fontWeight: "bold"
              }}>
                {p.qtd}
              </span>

              <button
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#25D366",
                  color: "white",
                  border: "none"
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

            {/* 👉 ADICIONAIS */}
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

            {/* 👉 OBSERVAÇÃO */}
            <input
              placeholder="Alguma observação?"
              style={{
                width: "100%",
                marginTop: 10,
                padding: 10,
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
          <h3>💳 Forma de pagamento</h3>

          {["Pix", "Cartão", "Espécie"].map((tipo) => (
            <label key={tipo} style={{ display: "block" }}>
              <input
                type="radio"
                value={tipo}
                onChange={(e) => setPagamento(e.target.value)}
              /> {tipo}
            </label>
          ))}
        </div>

        {/* ENDEREÇO */}
        <div style={{
          background: "white",
          padding: 15,
          borderRadius: 12,
          marginTop: 10
        }}>
          <h3>🛵 Endereço</h3>
          <input
            placeholder="Digite seu endereço"
            style={{ width: "100%", padding: 10 }}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        {/* TOTAL */}
        <div style={{
          background: "white",
          padding: 15,
          borderRadius: 12,
          marginTop: 10
        }}>
          <strong>💰 Total: R$ {calcularTotal().toFixed(2)}</strong>
        </div>

        {/* BOTÃO FINAL */}
        <button
          onClick={enviar}
          style={{
            width: "100%",
            padding: 15,
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: 10,
            marginTop: 10,
            fontSize: 16
          }}
        >
          Finalizar Pedido no WhatsApp
        </button>

      </div>
    </div>
  );
}
