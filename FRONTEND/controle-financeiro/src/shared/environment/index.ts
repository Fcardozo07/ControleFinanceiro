
 const REACT_APP_API_URL = "http://localhost:3002";
export const Environment = {
   
    /**
     * * Quantidade de linhas que serão exibidas na listagem
     */    
    LIMITE_DE_LINHAS: 10,
    /**
     * * Texto exibido quando nenhum registro é encontrado em uma listagem
     */
    INPUT_BUSCA: "Pesquisar...",
    /**
     * * Texto exibido quando nenhum registro é encontrado em uma listagem
     */
    LISTAGEM_VAZIA: "Nenhum registro encontrado.",
    /**
     * * URL base da API
     */
    URL_BASE: REACT_APP_API_URL ?? "http://192.168.1.111:3002",
}