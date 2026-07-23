# WA Redirector

Redirecionador automatico de WhatsApp com distribuicao Round Robin.

Cada clique no link redireciona para um numero diferente, alternando de forma justa entre todos os numeros cadastrados (ate 15).

## Como usar

1. Suba o projeto no GitHub
2. Importe na Vercel (vercel.com)
3. Acesse `/admin` para cadastrar os numeros de WhatsApp
4. Copie o link gerado e use na Infobip como URL do botao CTA

## Fluxo

1. Cliente clica no botao "Saiba Mais" da Infobip
2. E redirecionado para `/api/redirect` no seu dominio
3. O sistema escolhe o proximo numero na fila (Round Robin)
4. Redireciona para `https://wa.me/NUMERO`

## Como configurar na Infobip

1. Crie um template WhatsApp com botao "Clique para URL"
2. Na URL do botao, use: `https://SEUDOMINIO.vercel.app/api/redirect`
3. Pronto! A cada clique, um numero diferente recebe o cliente
