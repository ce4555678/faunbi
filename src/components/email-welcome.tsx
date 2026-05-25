import * as React from "react"
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Img,
} from "react-email"

type EmailProps = {
  name?: string
  url: string
}

export default function EmailWelcome({ name = "tudo bem", url }: EmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Bem-vindo à Faunbi 🚀</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Img
              src="https://www.faunbi.com/faunbi.svg"
              width="70"
              height="70"
              alt="Faunbi"
              style={logo}
            />

            <Heading style={title}>Bem-vindo à Faunbi 🚀</Heading>

            <Text style={text}>
              Olá, {name}! Sua conta foi criada com sucesso.
            </Text>

            <Text style={text}>
              Agora você pode organizar clientes, agenda, estoque, financeiro e
              orçamentos com apoio do assistente inteligente.
            </Text>

            <Button href={url} style={button}>
              Acessar minha conta
            </Button>

            <Hr style={hr} />

            <Text style={footer}>
              Se você não criou essa conta, ignore este e-mail.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f8fb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  padding: "32px 16px",
}

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  border: "1px solid #e5e7eb",
}

const logo = {
  margin: "0 0 24px",
}

const title = {
  color: "#111827",
  fontSize: "28px",
  lineHeight: "36px",
  fontWeight: "700",
  margin: "0 0 20px",
}

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#111827",
  color: "#ffffff",
  borderRadius: "10px",
  padding: "14px 22px",
  fontSize: "15px",
  fontWeight: "600",
  textDecoration: "none",
  marginTop: "16px",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0 16px",
}

const footer = {
  color: "#6b7280",
  fontSize: "13px",
  lineHeight: "20px",
}
