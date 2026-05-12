import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Termos de Uso | Faunbi",
  description: "Termos e condições de uso da plataforma Faunbi.",
}

export default function TermosPage() {
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

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-invert max-w-none">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Termos de Uso
          </h1>
          <p className="mb-8 text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              1. Aceitação dos Termos
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Ao acessar e usar a plataforma Faunbi, você concorda em cumprir e
              estar vinculado a estes Termos de Uso. Se você não concordar com
              qualquer parte destes termos, não poderá acessar ou usar nossos
              serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              2. Descrição do Serviço
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              O Faunbi é uma plataforma de gestão para profissionais autônomos
              que oferece funcionalidades de:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Gestão de agenda e compromissos</li>
              <li>Cadastro e gestão de clientes</li>
              <li>Criação e acompanhamento de pedidos e orçamentos</li>
              <li>Controle de estoque e produtos</li>
              <li>Gestão financeira (entradas e saídas)</li>
              <li>Geração de documentos (orçamentos, recibos, contratos)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              3. Cadastro e Conta
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Para utilizar o Faunbi, você deve criar uma conta fornecendo
              informações verdadeiras e completas. Você é responsável por manter
              a confidencialidade de sua senha e por todas as atividades
              realizadas em sua conta.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Você concorda em notificar imediatamente o Faunbi sobre qualquer
              uso não autorizado de sua conta ou qualquer outra violação de
              segurança.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              4. Planos e Pagamentos
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              O Faunbi oferece diferentes planos de assinatura:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Starter (R$ 12,90/mês):
                </strong>{" "}
                Funcionalidades básicas com limites
              </li>
              <li>
                <strong className="text-foreground">Pro (R$ 29,90/mês):</strong>{" "}
                Acesso completo a todas as funcionalidades
              </li>
              <li>
                <strong className="text-foreground">
                  Premium (R$ 49,90/mês):
                </strong>{" "}
                Completo + assinatura digital, contratos e personalização
                avançada
              </li>
            </ul>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Os pagamentos são processados mensalmente através da Stripe. Você
              pode cancelar sua assinatura a qualquer momento, e o acesso
              continuará até o final do período já pago.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              5. Uso Aceitável
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Você concorda em usar o Faunbi apenas para fins legais e de acordo
              com estes Termos. Você não deve:
            </p>
            <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Violar qualquer lei ou regulamento aplicável</li>
              <li>Tentar acessar áreas não autorizadas da plataforma</li>
              <li>Transmitir vírus ou código malicioso</li>
              <li>
                Usar a plataforma para spam ou comunicações não solicitadas
              </li>
              <li>Revender ou redistribuir o acesso à plataforma</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              6. Propriedade Intelectual
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              A plataforma Faunbi, incluindo seu design, código, funcionalidades
              e conteúdo, é propriedade exclusiva do Faunbi e está protegida por
              leis de direitos autorais e propriedade intelectual.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Os dados e conteúdos que você criar na plataforma permanecem de
              sua propriedade. Você nos concede uma licença limitada para
              processar e armazenar esses dados conforme necessário para
              fornecer o serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              7. Disponibilidade do Serviço
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Nos esforçamos para manter a plataforma disponível 24/7, mas não
              garantimos disponibilidade ininterrupta. Podemos realizar
              manutenções programadas, que serão comunicadas com antecedência
              quando possível.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              O Faunbi funciona offline para criação e edição de dados,
              sincronizando automaticamente quando a conexão for restabelecida.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              8. Limitação de Responsabilidade
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              O Faunbi é fornecido &quot;como está&quot;. Não nos
              responsabilizamos por danos indiretos, incidentais ou
              consequenciais decorrentes do uso ou impossibilidade de uso da
              plataforma.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Nossa responsabilidade total não excederá o valor pago por você
              nos últimos 12 meses de assinatura.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              9. Encerramento
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Você pode encerrar sua conta a qualquer momento através das
              configurações. Reservamo-nos o direito de suspender ou encerrar
              contas que violem estes Termos, sem aviso prévio.
            </p>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Após o encerramento, seus dados serão mantidos por 30 dias para
              possível recuperação, após os quais serão excluídos
              permanentemente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              10. Alterações nos Termos
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Podemos atualizar estes Termos periodicamente. Notificaremos sobre
              alterações significativas por e-mail ou através da plataforma. O
              uso continuado após as alterações constitui aceitação dos novos
              termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              11. Contato
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <ul className="mb-4 list-none space-y-1 text-muted-foreground">
              <li>E-mail: contato@faunbi.com</li>
              <li>Site: www.faunbi.com</li>
            </ul>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Ao usar o Faunbi, você confirma que leu, entendeu e concorda com
              estes Termos de Uso.
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
              className="text-sm text-primary hover:underline"
            >
              Termos de Uso
            </Link>
            <Link
              href="/privacidade"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
