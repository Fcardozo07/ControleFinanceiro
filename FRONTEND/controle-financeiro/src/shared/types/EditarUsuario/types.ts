export type EditUser = {
  nome: string;
  email: string;
  senha: string;
  senhaRepetida: string;
}

export interface IEditUsuarioFormProps{
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    senha: string;
    setSenha: React.Dispatch<React.SetStateAction<string>>;
    senhaRepetida: string;
    setSenhaRepetida: React.Dispatch<React.SetStateAction<string>>;
    erro: string;
    setErro: React.Dispatch<React.SetStateAction<string>>;   
    handleDeleteFoto: () => void;
    handleEditar: () => void;
    imagem: File | null;
    setImagem: React.Dispatch<React.SetStateAction<File | null>>;     
}
