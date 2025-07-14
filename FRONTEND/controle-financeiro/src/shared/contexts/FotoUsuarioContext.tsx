import { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/axios';

interface FotoUsuarioContextData {
  fotoUrl: string | null;
  setFotoUrl: (url: string | null) => void;
  fotoId: number | null;
  reloadFoto: () => void;
}

const FotoUsuarioContext = createContext({} as FotoUsuarioContextData);

export const useFotoUsuarioContext = () => {
  return useContext(FotoUsuarioContext);
};

export const FotoUsuarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [fotoId, setFotoId] = useState<number | null>(null);

  const reloadFoto = useCallback(async () => {
    const usuarioId = sessionStorage.getItem("id");
    if (!usuarioId) {
      return;
    }

    try {
      const response = await api.get(`http://localhost:3002/foto-usuario/usuario/${usuarioId}`);
      const data = response.data;
      if (data.length > 0) {
        setFotoUrl(`http://localhost:3002/uploads/${data[0].filename}`);
        setFotoId(data[0].id); 
      } else {
        setFotoUrl(null);
      }
    } catch (error) {
      console.error("Erro ao buscar foto:", error);
      setFotoUrl(null);
      setFotoId(null);
    }
  }, []);

  return (
    <FotoUsuarioContext.Provider value={{fotoUrl, fotoId, setFotoUrl, reloadFoto}}>
      {children}
    </FotoUsuarioContext.Provider>
  );
};
