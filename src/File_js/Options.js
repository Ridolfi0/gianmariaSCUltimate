export const Status = Object.freeze({
    LOGIN:'login',
    HOME:'home',
    GESTIONE_IMPEGNI:'gestione_impegni',
    GESTIONE_VERBALI:'gestione_verbali',
    GESTIONE_DATI:'gestione_dati',
    CREA_EVENTO:'crea_evento',
    IMPORTA_EVENTO:'importa_evento',
    GESTIONE_ACCOUNT: 'gestione_account',
    GESTIONE_AMMINISTRAZIONE:"gestione_amministrazione",
    GESTIONE_TEMPLATE:"gestione_template",
    GESTIONE_PROPRIO_ACCOUNT:"gestione_proprio_account" 
  });

export const CurrentUser = {
  Nome: String,
  Cognome: String,
  Mail: String,
  Ruolo: String,
  Password: String
}
