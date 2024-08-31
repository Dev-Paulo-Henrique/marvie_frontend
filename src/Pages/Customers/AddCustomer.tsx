import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import { Header } from "../Admin/Header";
import { Title } from "../../utils/Title";
import { addHours } from 'date-fns'
// import { md4 } from 'hash-wasm';
import { useMask } from '@react-input/mask';
import { useNavigate } from "react-router-dom";

export function AddCustomer() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [CEP, setCEP] = useState("");
  const [numero, setNumero] = useState("");
  const navigate = useNavigate();
  const inputTelefoneRef = useMask({ mask: '+__ (__) _____-____', replacement: { _: /\d/ } });
  const inputCEPRef = useMask({ mask: '_____-___', replacement: { _: /\d/ } });

  Title({ title: "Novo cliente" });

  const formatDateForMySQL = (date: Date) => {
    const padTo2Digits = (num: number) => {
      return num.toString().padStart(2, '0');
    };
  
    return (
      date.getFullYear() + '-' +
      padTo2Digits(date.getMonth() + 1) + '-' +
      padTo2Digits(date.getDate()) + ' ' +
      padTo2Digits(date.getHours()) + ':' +
      padTo2Digits(date.getMinutes()) + ':' +
      padTo2Digits(date.getSeconds())
    );
  };

  const newCustomer = {
    nome: nome,
    email: email,
    senha: senha,
    nascimento: nascimento,
    telefone: telefone,
    CEP: CEP,
    numero: numero,
    createdAt: formatDateForMySQL(addHours(new Date(), 3))
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if(senha !== confirmarSenha) {
        toast.error('Senha incorreta');
        return
    }
    try {
        await api.post("/users", newCustomer);
        setNome("")
        setEmail("")
        setSenha("")
        setConfirmarSenha("")
        setNascimento("")
        setTelefone("")
        setCEP("")
        setNumero("")
        toast.success('Cliente criado');
      } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        toast.error("Erro ao salvar cliente");
      }
  };

  return (
    <>
      <Header title="Novo cliente"/>
      <div className="bg-white shadow rounded p-4">
        <form onSubmit={handleSubmit}>
          <div className="form-row row mb-3">
            <div className="form-group col">
              <label htmlFor="nomeCompleto">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="nomeCompleto"
                placeholder="Nome completo"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="form-group col">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row row mb-3">
            <div className="form-group col">
              <label htmlFor="inputPassword4">Senha</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Senha"
                minLength={8}
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <small id="passwordHelp" className={`form-text ${senha && senha.length < 8 ? "text-danger" :"text-muted"}`}>
                {senha.length >= 8 ? "Número de caracteres aceitáveis." : "Deve conter no mínimo 8 caracteres."}
              </small>
            </div>
            <div className="form-group col">
              <label htmlFor="inputPasswordConfirm4">
                Confirmação de senha
              </label>
              <input
                type="password"
                className={`form-control ${(senha !== confirmarSenha) && (confirmarSenha.length > 0) && "is-invalid"}`}
                id="inputPasswordConfirm4"
                minLength={8}
                placeholder="Confirmação de senha"
                required
                value={confirmarSenha}
                disabled={!senha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {(senha !== confirmarSenha) && (confirmarSenha.length > 0) && <small id="passwordHelp" className="form-text text-danger">
                As senhas devem ser iguais.
              </small>}
            </div>
          </div>
          <div className="form-row row mb-3">
            <div className="form-group col-md-3">
              <label htmlFor="inputNascimento">Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="inputNascimento"
                placeholder="Data de nascimento"
                required
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputTelefone">Telefone</label>
              <input
                type="tel"
                className="form-control"
                id="inputTelefone"
                placeholder="Telefone"
                required
                ref={inputTelefoneRef}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputCEP">CEP</label>
              <input
                type="text"
                className="form-control"
                id="inputCEP"
                placeholder="CEP"
                maxLength={9}
                required
                ref={inputCEPRef}
                value={CEP}
                onChange={(e) => setCEP(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputNumero">Número</label>
              <input
                type="text"
                className="form-control"
                id="inputNumero"
                placeholder="Número"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-4 justify-content-end">
            <button onClick={() => navigate("/admin/customers")} className="btn btn-danger">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
