const fs = require("fs");

const lerArquivo = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const escreverArquivo = (dados: any): void => {
  return fs.writeFileSync("./bd.json", JSON.stringify(dados));
};

// const dados = lerArquivo() as string[];

// dados.push("João");
// escreverArquivo(dados);

// console.log(lerArquivo());

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[];

  bd.push(dados);

  escreverArquivo(bd);
  return dados;
};

const listarUsuarios = (filtro?: string): Usuario[] => {
  const bd = lerArquivo() as Usuario[];

  const usuarios = bd.filter((usuario) => {
    if (filtro) {
      return usuario.profissao === filtro;
    }
    return usuario;
  });

  return usuarios;
};

// const isabella = cadastrarUsuario({
//   nome: "Isabella",
//   email: "isa_gcb@icloud.com",
//   cpf: "123456789",
//   endereco: {
//     cep: "09435060",
//     rua: "Patricia Regina",
//     bairro: "vila bonita",
//     cidade: "Ribeirão Pires",
//   },
// });

// const mariana = cadastrarUsuario({
//   nome: "Julieta",
//   email: "juli@icloud.com",
//   profissao: "poeta",
//   cpf: "123456758974",
//   endereco: {
//     cep: "09435060",
//     rua: "Patricia Regina",
//     bairro: "vila bonita",
//     cidade: "Ribeirão Pires",
//   },
// });

const detalharUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return usuario;
};

// const mariana = detalharUsuario("12345679");
// console.log(mariana);

const atualizarUsuario = (cpf: string, dados: Usuario) => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  Object.assign(usuario, dados);

  escreverArquivo(bd);

  return dados;
};

// atualizarUsuario("123456789", {
//   nome: "Isabella",
//   email: "isa_gcb@icloud.com",
//   cpf: "195873654789",
//   endereco: {
//     cep: "09435060",
//     rua: "Patricia Regina",
//     complemento: "ao lado da igreja AD",
//     bairro: "vila bonita",
//     cidade: "Ribeirão Pires",
//   },
// });

const excluirUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const exclusao = bd.filter((usuario) => {
    return usuario.cpf !== cpf;
  });

  escreverArquivo(exclusao);
  return usuario;
};

// console.log(excluirUsuario("123456789"), "\n");

const bd = listarUsuarios("dev");
console.log(bd);
