export interface ICadastroUsuarioAppbarProps{
   toggleDrawer: (boolean: boolean) => () => void;
   drawerOpen: boolean;
   menuItems: string[];
   imagem: File | null;
   setImagem: React.Dispatch<React.SetStateAction<File | null>>;
   
}


export interface ICadastroUsuarioFormProps {
  nome: string;
  setNome: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  senha: string;
  setSenha: (value: string) => void;
  senhaRepetida: string;
  setSenhaRepetida: (value: string) => void;
  erro: string;
  setErro: (value: string) => void;
  onSubmit: () => void;
  imagem: File | null;
  setImagem: (file: File) => void;
}
