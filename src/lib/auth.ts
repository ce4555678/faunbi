import db from "@/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, haveIBeenPwned } from "better-auth/plugins"
import redis from "./redis"
import { apiKey } from "@better-auth/api-key"
import { nextCookies } from "better-auth/next-js"
import { userDb } from "@/db/schema/user-db"
import { accountDb } from "@/db/schema/account-db"
import { apikeyDb } from "@/db/schema/api-key-db"
import { i18n } from "@better-auth/i18n"

export const auth = betterAuth({
  plugins: [
    admin(),
    haveIBeenPwned({
      enabled: process.env.NODE_ENV === "production",
      customPasswordCompromisedMessage:
        "Por favor, escolha uma senha mais segura.",
    }),
    apiKey({
      storage: "secondary-storage",
    }),
    i18n({
      translations: {
        "pt-BR": {
          // Core Authentication Error Codes
          USER_NOT_FOUND: "Usuário não encontrado",
          INVALID_EMAIL_OR_PASSWORD: "Email ou senha inválidos",
          INVALID_PASSWORD: "Senha inválida",
          INVALID_EMAIL: "Email inválido",
          USER_ALREADY_EXISTS: "Usuário já existe",
          INVALID_TOKEN: "Token fornecido é inválido",
          SESSION_EXPIRED: "Sessão expirou",
          SESSION_NOT_FOUND: "Sessão não encontrada",
          UNABLE_TO_CREATE_SESSION: "Não foi possível criar a sessão",
          UNABLE_TO_CREATE_USER:
            "O usuário não pôde ser criado durante a autenticação",
          EMAIL_NOT_VERIFIED: "Email não foi verificado",

          // Passkey Plugin Error Codes
          CHALLENGE_NOT_FOUND: "Desafio não encontrado",
          YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY:
            "Você não tem permissão para registrar esta chave de acesso",
          FAILED_TO_VERIFY_REGISTRATION: "Falha ao verificar o registro",
          PASSKEY_NOT_FOUND: "Chave de acesso não encontrada",
          AUTHENTICATION_FAILED: "Falha na autenticação",
          FAILED_TO_UPDATE_PASSKEY: "Falha ao atualizar a chave de acesso",
          PREVIOUSLY_REGISTERED: "Já registrado anteriormente",
          REGISTRATION_CANCELLED: "Registro cancelado",
          AUTH_CANCELLED: "Autenticação cancelada",
          UNKNOWN_ERROR: "Erro desconhecido",
          SESSION_REQUIRED:
            "O registro de chave de acesso requer uma sessão autenticada",
          RESOLVE_USER_REQUIRED:
            "O registro de chave de acesso requer uma sessão autenticada ou um callback resolveUser",
          RESOLVED_USER_INVALID: "Usuário resolvido é inválido",

          // OAuth/Social Provider Error Codes
          INVALID_CODE:
            "O código de autenticação é inválido, expirou ou não pode ser verificado",
          state_mismatch:
            "Incompatibilidade de estado durante o retorno de chamada OAuth",
          state_security_mismatch: "Incompatibilidade de segurança de estado",
          state_invalid: "Estado inválido",
          state_generation_error: "Erro ao gerar estado",
          account_not_linked: "A conta não pôde ser vinculada",

          // API Key Plugin Error Codes
          INSUFFICIENT_API_KEY_PERMISSIONS:
            "Permissões insuficientes de chave API",
          USER_NOT_MEMBER_OF_ORGANIZATION:
            "O usuário não é membro da organização",

          // Device Authorization Plugin Error Codes
          authorization_pending:
            "O usuário ainda não respondeu à solicitação de autorização",
          slow_down:
            "Cliente está consultando com muita frequência; aumente o intervalo de consulta",
          access_denied: "Usuário negou a solicitação de autorização",
          expired_token: "O código do dispositivo expirou",
          invalid_grant: "Código de dispositivo ou ID do cliente inválido",

          // Email OTP / Two-Factor Error Codes
          TOO_MANY_ATTEMPTS: "Muitas tentativas de verificação excedidas",
          INVALID_OTP: "Senha única inválida",

          // Email Verification Error Codes
          EMAIL_VERIFICATION_REQUIRED: "Verificação de email é obrigatória",

          // General HTTP Error Codes
          BAD_REQUEST: "Solicitação inválida",
          UNAUTHORIZED: "Não autorizado",
          FORBIDDEN: "Acesso negado",
          NOT_FOUND: "Não encontrado",
          INTERNAL_SERVER_ERROR: "Erro interno do servidor",
        },
      },
      defaultLocale: "pt-BR",
    }),
    nextCookies(),

  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  secondaryStorage: {
    get: async (key) => await redis.get(key),
    set: async (key, value, ttl) => {
      if (ttl)
        await redis.set(key, value, {
          ex: ttl,
        })
      else await redis.set(key, value)
    },
    delete: async (key) => {
      await redis.del(key)
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userDb,
      account: accountDb,
      apikey: apikeyDb,
    },
  }),
})
