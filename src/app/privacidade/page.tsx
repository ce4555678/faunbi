import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Bell,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Política de Privacidade | Faunbi",
  description: "Saiba como o Faunbi coleta, usa e protege seus dados pessoais.",
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                F
              </span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              Faunbi
            </span>
          </Link>
          <Button variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="border-b border-border py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-center text-lg font-semibold text-foreground">
            Resumo Rápido
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <Lock className="mb-2 h-5 w-5 text-primary" />
              <h3 className="mb-1 font-medium text-foreground">
                Dados Protegidos
              </h3>
              <p className="text-sm text-muted-foreground">
                Seus dados são criptografados e armazenados com segurança.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <Eye className="mb-2 h-5 w-5 text-primary" />
              <h3 className="mb-1 font-medium text-foreground">
                Transparência
              </h3>
              <p className="text-sm text-muted-foreground">
                Você sabe exatamente quais dados coletamos e por quê.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <Users className="mb-2 h-5 w-5 text-primary" />
              <h3 className="mb-1 font-medium text-foreground">
                Sem Venda de Dados
              </h3>
              <p className="text-sm text-muted-foreground">
                Nunca vendemos seus dados para terceiros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              1. Introdução
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              O Faunbi está comprometido em proteger sua privacidade. Esta
              Política de Privacidade explica como coletamos, usamos,
              armazenamos e protegemos suas informações pessoais quando você usa
              nossa plataforma.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Esta política está em conformidade com a Lei Geral de Proteção de
              Dados (LGPD - Lei nº 13.709/2018) e outras legislações aplicáveis
              de proteção de dados.
            </p>
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                2. Dados que Coletamos
              </h2>
            </div>

            <h3 className="mt-6 mb-2 font-medium text-foreground">
              2.1 Dados fornecidos por você:
            </h3>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">Dados de cadastro:</strong>{" "}
                nome, e-mail, telefone, CPF/CNPJ
              </li>
              <li>
                <strong className="text-foreground">Dados do negócio:</strong>{" "}
                nome da empresa, área de atuação, logo
              </li>
              <li>
                <strong className="text-foreground">Dados de clientes:</strong>{" "}
                informações que você cadastra sobre seus clientes
              </li>
              <li>
                <strong className="text-foreground">Dados financeiros:</strong>{" "}
                registros de entradas e saídas que você cria
              </li>
              <li>
                <strong className="text-foreground">Dados de pagamento:</strong>{" "}
                processados de forma segura pela Stripe
              </li>
            </ul>

            <h3 className="mt-6 mb-2 font-medium text-foreground">
              2.2 Dados coletados automaticamente:
            </h3>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">Dados de uso:</strong>{" "}
                páginas visitadas, funcionalidades utilizadas, tempo de sessão
              </li>
              <li>
                <strong className="text-foreground">Dados técnicos:</strong>{" "}
                endereço IP, tipo de dispositivo, navegador, sistema operacional
              </li>
              <li>
                <strong className="text-foreground">Cookies:</strong> para
                manter sua sessão e preferências
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              3. Como Usamos seus Dados
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Utilizamos seus dados para:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Fornecer e manter a plataforma Faunbi</li>
              <li>Processar pagamentos e gerenciar sua assinatura</li>
              <li>
                Enviar notificações sobre sua conta e atualizações do serviço
              </li>
              <li>
                Melhorar a experiência do usuário e desenvolver novas
                funcionalidades
              </li>
              <li>Responder a solicitações de suporte</li>
              <li>Cumprir obrigações legais</li>
              <li>
                Treinar e melhorar nossos modelos de IA (de forma anonimizada)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              4. Inteligência Artificial e seus Dados
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              O Faunbi utiliza inteligência artificial para processar comandos
              em linguagem natural. É importante entender:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                Suas conversas são processadas para executar ações na plataforma
              </li>
              <li>
                Não armazenamos o conteúdo das conversas além do necessário para
                o funcionamento
              </li>
              <li>Dados usados para melhorar a IA são anonimizados</li>
              <li>
                Você pode solicitar a exclusão de seus dados a qualquer momento
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                5. Segurança dos Dados
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Implementamos medidas de segurança robustas para proteger seus
              dados:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">Criptografia:</strong> dados
                em trânsito (TLS) e em repouso (AES-256)
              </li>
              <li>
                <strong className="text-foreground">
                  Autenticação segura:
                </strong>{" "}
                hash de senhas com bcrypt
              </li>
              <li>
                <strong className="text-foreground">Row Level Security:</strong>{" "}
                isolamento de dados entre usuários
              </li>
              <li>
                <strong className="text-foreground">Backups:</strong> cópias de
                segurança regulares e geograficamente distribuídas
              </li>
              <li>
                <strong className="text-foreground">Monitoramento:</strong>{" "}
                detecção de atividades suspeitas em tempo real
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              6. Compartilhamento de Dados
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Não vendemos seus dados. Compartilhamos apenas quando necessário:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Processadores de pagamento:
                </strong>{" "}
                Stripe, para processar transações
              </li>
              <li>
                <strong className="text-foreground">
                  Provedores de infraestrutura:
                </strong>{" "}
                Vercel, Supabase, para hospedar a plataforma
              </li>
              <li>
                <strong className="text-foreground">Provedores de IA:</strong>{" "}
                para processar comandos de linguagem natural
              </li>
              <li>
                <strong className="text-foreground">Obrigações legais:</strong>{" "}
                quando exigido por lei ou ordem judicial
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              7. Seus Direitos (LGPD)
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              De acordo com a LGPD, você tem direito a:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">Acesso:</strong> saber quais
                dados temos sobre você
              </li>
              <li>
                <strong className="text-foreground">Correção:</strong> corrigir
                dados incompletos ou desatualizados
              </li>
              <li>
                <strong className="text-foreground">Anonimização:</strong>{" "}
                solicitar anonimização de dados desnecessários
              </li>
              <li>
                <strong className="text-foreground">Portabilidade:</strong>{" "}
                receber seus dados em formato estruturado
              </li>
              <li>
                <strong className="text-foreground">Eliminação:</strong>{" "}
                solicitar exclusão de dados pessoais
              </li>
              <li>
                <strong className="text-foreground">Informação:</strong> saber
                com quem compartilhamos seus dados
              </li>
              <li>
                <strong className="text-foreground">Revogação:</strong> retirar
                consentimento a qualquer momento
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Para exercer esses direitos, entre em contato pelo e-mail:
              privacidade@faunbi.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              8. Cookies
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Utilizamos cookies essenciais para:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Manter sua sessão autenticada</li>
              <li>Lembrar suas preferências (tema claro/escuro)</li>
              <li>Garantir segurança contra fraudes</li>
            </ul>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Você pode gerenciar cookies nas configurações do seu navegador,
              mas isso pode afetar o funcionamento da plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              9. Retenção de Dados
            </h2>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">Conta ativa:</strong>{" "}
                mantemos seus dados enquanto a conta estiver ativa
              </li>
              <li>
                <strong className="text-foreground">Após cancelamento:</strong>{" "}
                dados mantidos por 30 dias para possível recuperação
              </li>
              <li>
                <strong className="text-foreground">Dados fiscais:</strong>{" "}
                mantidos por 5 anos conforme legislação brasileira
              </li>
              <li>
                <strong className="text-foreground">Logs de segurança:</strong>{" "}
                mantidos por 6 meses
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                10. Alterações nesta Política
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Podemos atualizar esta Política de Privacidade periodicamente.
              Notificaremos sobre alterações significativas por e-mail ou
              através de aviso na plataforma. Recomendamos revisar esta página
              regularmente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              11. Contato do DPO
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Para questões relacionadas à privacidade e proteção de dados:
            </p>
            <ul className="mb-4 list-none space-y-1 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Encarregado de Dados (DPO):
                </strong>{" "}
                privacidade@faunbi.com
              </li>
              <li>
                <strong className="text-foreground">Suporte geral:</strong>{" "}
                contato@faunbi.com
              </li>
              <li>
                <strong className="text-foreground">Site:</strong>{" "}
                www.faunbi.com
              </li>
            </ul>
          </section>

          <section className="rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h3 className="mb-2 font-semibold text-foreground">
              Compromisso com sua Privacidade
            </h3>
            <p className="text-sm text-muted-foreground">
              O Faunbi foi desenvolvido com privacidade desde a concepção
              (Privacy by Design). Seus dados são seus, e estamos comprometidos
              em protegê-los com os mais altos padrões de segurança.
            </p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Faunbi. Todos os direitos
            reservados.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link
              href="/termos"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              className="text-sm text-primary hover:underline"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
