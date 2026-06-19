import { useState, useEffect } from "react";

export default function Admin() {

  const [produtos, setProdutos] = useState([]);
  const [novo, setNovo] = useState({
    nome: "",
    preco: "",
    img: ""
  });

  useEffect(() => {
    const dados = localStorage.getItem("produtos");
    if (dados) setProdutos(JSON.parse(dados));
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  const adicionar = () => {
    if (!novo.nome || !novo.preco) {
      alert("Preencha tudo");
      return;
    }

    setProdutos([
      ...produtos,
      {
        nome: novo.nome,
        preco: Number(novo.preco),
        qtd: 0
      }
    ]);

    setNovo({ nome: "", preco: "", img: "" });
  };

  const remover = (i) => {
    const n = [...produtos];
    n.splice(i, 1);
    setProdutos(n);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin</h1>

      <input
        placeholder="Nome"
        value={novo.nome}
        onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
      />

      <input
        placeholder="Preço"
        type="number"
        value={novo.preco}
        onChange={(e) => setNovo({ ...novo, preco: e.target.value })}
      />

      <button onClick={adicionar}>Adicionar</button>

      {produtos.map((p, i) => (
        <div key={i}>
          {p.nome} - R$ {p.preco}
          <button onClick={() => remover(i)}>X</button>
        </div>
      ))}
    </div>
  );
}
