export default async function searchCNPJ(cnpj: string): Promise<CNPJResponse> {
  // Remove qualquer caractere que não seja número (ex: 27.865.757/0001-02 -> 27865757000102)
  const cnpjLimpo = cnpj.replace(/\D/g, "")

  if (cnpjLimpo.length !== 14) {
    throw new Error(
      "CNPJ inválido. O formato deve conter 14 dígitos numéricos."
    )
  }

  const url = `https://publica.cnpj.ws/cnpj/${cnpjLimpo}`
  try {

    const response = await fetch(url)

    // Tratamento de erros baseado nos status informados pela documentação
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`CNPJ ${cnpjLimpo} não encontrado na base de dados.`)
      }
      if (response.status === 429) {
        throw new Error(
          "Limite de requisições atingido (máximo 3 consultas por minuto na API pública)."
        )
      }
      throw new Error(
        `Erro na requisição: ${response.status} - ${response.statusText}`
      )
    }

    const data: CNPJResponse = await response.json()

    return data
  } catch (error) {
    // Repassa o erro para ser tratado por quem chamou a função
    console.error(`Falha ao consultar o CNPJ ${cnpjLimpo}:`, error)
    throw error
  }
}

export interface CNPJResponse {
  cnpj_raiz: string
  razao_social: string
  capital_social: string
  responsavel_federativo: string | null
  atualizado_em: string // ISO Date String
  porte: IdDescricao
  natureza_juridica: IdDescricao
  qualificacao_do_responsavel: IdDescricao<number>
  socios: Socio[]
  simples: Simples | null
  estabelecimento: Estabelecimento
}

export interface IdDescricao<T = string> {
  id: T
  descricao: string
}

export interface Pais {
  id: string
  iso2: string
  iso3: string
  nome: string
  comex_id: string
}

export interface Estado {
  id: number
  nome: string
  sigla: string
  ibge_id: number
}

export interface Cidade {
  id: number
  nome: string
  ibge_id: number
  siafi_id: string
}

export interface AtividadeEconomica {
  id: string
  secao: string
  divisao: string
  grupo: string
  classe: string
  subclasse: string
  descricao: string
}

export interface Socio {
  cpf_cnpj_socio: string
  nome: string
  tipo: string
  data_entrada: string // YYYY-MM-DD
  cpf_representante_legal: string | null
  nome_representante: string | null
  faixa_etaria: string
  atualizado_em: string
  pais_id: string | null
  qualificacao_socio: IdDescricao<number>
  qualificacao_representante: string | null
  pais: Pais | null
}

export interface Simples {
  simples: string
  data_opcao_simples: string | null
  data_exclusao_simples: string | null
  mei: string
  data_opcao_mei: string | null
  data_exclusao_mei: string | null
  atualizado_em: string
}

export interface InscricaoEstadual {
  inscricao_estadual: string
  ativo: boolean
  atualizado_em: string
  estado: Estado
}

export interface Estabelecimento {
  cnpj: string
  cnpj_raiz: string
  cnpj_ordem: string
  cnpj_digito_verificador: string
  tipo: string
  nome_fantasia: string | null
  situacao_cadastral: string
  data_situacao_cadastral: string
  data_inicio_atividade: string
  nome_cidade_exterior: string | null
  tipo_logradouro: string
  logradouro: string
  numero: string
  complemento: string | null
  bairro: string
  cep: string
  ddd1: string | null
  telefone1: string | null
  ddd2: string | null
  telefone2: string | null
  ddd_fax: string | null
  fax: string | null
  email: string | null
  situacao_especial: string | null
  data_situacao_especial: string | null
  atualizado_em: string
  atividade_principal: AtividadeEconomica
  atividades_secundarias: AtividadeEconomica[]
  pais: Pais | null
  estado: Estado
  cidade: Cidade
  motivo_situacao_cadastral: string | null
  inscricoes_estaduais: InscricaoEstadual[]
}
