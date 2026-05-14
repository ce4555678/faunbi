import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Shield,
  User,
  Lock,
  FileText,
  Trash2,
  Edit,
  Eye,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "LGPD | Faunbi",
  description:
    "Lei Geral de Proteção de Dados - Saiba seus direitos e como exercê-los na plataforma Faunbi.",
}

interface RightItem {
  icon: React.ReactNode
  title: string
  description: string
}

const rightsItems: RightItem[] = [
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Direito de Acesso",
    description:
      "Você tem o direito de acessar seus dados pessoais armazenados em nossa plataforma a qualquer momento.",
  },
  {
    icon: <Edit className="h-6 w-6" />,
    title: "Direito de Retificação",
    description:
      "Você pode corrigir ou atualizar seus dados pessoais caso estejam incompletos ou inexatos.",
  },
  {
    icon: <Trash2 className="h-6 w-6" />,
    title: "Direito ao Esquecimento",
    description:
      "Você pode solicitar a exclusão de seus dados pessoais, sujeito às limitações legais e contratuais.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Direito à Portabilidade",
    description:
      "Você pode receber seus dados em formato estruturado e portável para transferência a outro prestador.",
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "Direito de Contestação",
    description:
      "Você pode contestar decisões automatizadas e solicitar revisão de tratamentos de dados.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Direito à Informação",
    description:
      "Você tem direito a informações claras sobre como seus dados são coletados, usados e protegidos.",
  },
]

export default function LGPDPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/faunbi.svg"
              alt="Faunbi Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-foreground">
              Faunbi
            </span>
          </Link>
          <Button variant="ghost" size="sm">
            <Link className="flex items-center gap-2" href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-linear-to-b from-primary/5 to-transparent py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Lei Geral de Proteção de Dados
          </h1>
          <p className="text-muted-foreground">
            Conheça seus direitos como titular de dados e como a Faunbi os
            respeita
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            O que é a LGPD?
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            A Lei Geral de Proteção de Dados (LGPD), Lei nº 13.709/2018, é a
            legislação brasileira que regula o tratamento de dados pessoais por
            pessoas físicas ou jurídicas, estabelecendo princípios e direitos
            fundamentais para a proteção da privacidade.
          </p>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            A Faunbi está em total conformidade com a LGPD e reconhece a
            importância da proteção de seus dados pessoais. Este documento
            explica seus direitos como titular de dados e como exercê-los.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </section>

        {/* Rights Overview */}
        <section className="mb-12">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            Seus Direitos como Titular de Dados
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {rightsItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Exercise Rights */}
        <section className="mb-12 rounded-lg border border-border/50 bg-primary/5 p-8">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Como Exercer Seus Direitos
            </h2>
          </div>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Para exercer qualquer um dos seus direitos como titular de dados,
            você pode entrar em contato conosco através dos seguintes canais:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground">
                contato@faunbi.com.br com o assunto &quot;Exercício de Direitos
                LGPD&quot;
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Formulário na Plataforma
              </h3>
              <p className="text-muted-foreground">
                Acesse as configurações de privacidade de sua conta e use o
                formulário de solicitação de dados.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Telefone</h3>
              <p className="text-muted-foreground">
                Ligue para nosso atendimento durante o horário comercial.
              </p>
            </div>
          </div>
          <p className="mt-6 border-t border-border/50 pt-6 text-sm text-muted-foreground">
            Responderemos sua solicitação no prazo de até 15 dias úteis,
            conforme exigido pela LGPD. Para solicitações complexas, podemos
            prorrogar por mais 15 dias, informando os motivos.
          </p>
        </section>

        {/* Data Processing */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Como Usamos Seus Dados
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Base Legal para Tratamento
              </h3>
              <p className="text-muted-foreground">
                Tratamos seus dados pessoais com base em consentimento, execução
                de contrato, obrigação legal ou interesse legítimo. Cada tipo de
                dado possui uma base legal específica detalhada em nossa
                Política de Privacidade.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Compartilhamento de Dados
              </h3>
              <p className="text-muted-foreground">
                Seus dados pessoais só são compartilhados com terceiros quando
                necessário para fornecer nossos serviços, conforme sua
                autorização, ou quando requerido por lei.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="mb-2 font-semibold text-foreground">
                Retenção de Dados
              </h3>
              <p className="text-muted-foreground">
                Mantemos seus dados apenas pelo tempo necessário para os fins
                pelos quais foram coletados, conforme nossas políticas de
                retenção.
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Segurança de Dados
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            A Faunbi implementa medidas técnicas e organizacionais apropriadas
            para proteger seus dados pessoais contra acessos não autorizados,
            destruição, perda ou alteração. Essas medidas incluem:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <span>Criptografia de dados em trânsito e em repouso</span>
            </li>
            <li className="flex gap-3">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <span>Controle de acesso baseado em papéis (RBAC)</span>
            </li>
            <li className="flex gap-3">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <span>Auditorias de segurança regulares</span>
            </li>
            <li className="flex gap-3">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <span>Treinamento de segurança para funcionários</span>
            </li>
            <li className="flex gap-3">
              <Lock className="h-5 w-5 shrink-0 text-primary" />
              <span>Plano de resposta a incidentes de segurança</span>
            </li>
          </ul>
        </section>

        {/* Data Breach Notification */}
        <section className="mb-12 rounded-lg border border-orange-200 bg-orange-50 p-8 dark:border-orange-900 dark:bg-orange-950">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              Notificação de Incidentes
            </h2>
          </div>
          <p className="leading-relaxed text-orange-800 dark:text-orange-200">
            Em caso de qualquer incidente de segurança que comprometa seus dados
            pessoais, a Faunbi o notificará no prazo máximo de 10 dias úteis,
            conforme exigido pela LGPD. Também notificaremos a Autoridade
            Nacional de Proteção de Dados (ANPD) quando necessário.
          </p>
        </section>

        {/* Contact DPO */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Encarregado de Proteção de Dados
          </h2>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="mb-4 text-muted-foreground">
              A Faunbi designou um Encarregado de Proteção de Dados (DPO) para
              supervisionar a conformidade com a LGPD. Você pode entrar em
              contato com nosso DPO para dúvidas ou preocupações sobre
              privacidade:
            </p>
            <div className="space-y-3 font-semibold text-foreground">
              <p>📧 Email: dpo@faunbi.com.br</p>
              <p>🏢 Departamento: Compliance e Proteção de Dados</p>
            </div>
          </div>
        </section>

        {/* ANPD Information */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Seus Direitos Perante a ANPD
          </h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            Se você não estiver satisfeito com a resposta da Faunbi à sua
            solicitação de direitos, você tem o direito de apresentar uma
            reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="mb-2 font-semibold text-foreground">
              Autoridade Nacional de Proteção de Dados
            </p>
            <p className="text-muted-foreground">
              Sede: Prédio Senado Federal, Anexo II, Subsolo, Brasília - DF
            </p>
            <p className="text-muted-foreground">
              Website:{" "}
              <a
                href="https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.gov.br/cidadania
              </a>
            </p>
          </div>
        </section>

        {/* Changes to This Notice */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Alterações a Este Aviso
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            A Faunbi pode atualizar este aviso de vez em quando para refletir
            mudanças em nossas práticas, tecnologia ou legislação aplicável.
            Qualquer alteração material será comunicada através de um aviso
            destacado na plataforma ou por email. Seu uso contínuo da plataforma
            após tais alterações constitui sua aceitação das mesmas.
          </p>
        </section>

        {/* Footer CTA */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
          <h3 className="mb-4 text-xl font-semibold text-foreground">
            Tem dúvidas sobre LGPD ou seus dados?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Entre em contato com nosso time de compliance e proteção de dados.
            Estamos aqui para ajudar.
          </p>
          <Link href="mailto:contato@faunbi.com.br">
            <Button size="lg">Enviar Mensagem</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
