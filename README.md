# La Pasta di Girardi — landing page

> **Projeto de demonstração.** La Pasta di Girardi não existe. Nome, endereço, telefones, WhatsApp, preços, equipe e depoimentos são fictícios e foram criados para este portfólio. Os links de aplicativos de entrega apontam para `example.com`.

Landing page de uma casa de massas artesanais em Porto Alegre, onde a massa é feita todos os dias na própria cozinha. O projeto foi feito como se fosse uma entrega a um cliente: identidade visual própria, conteúdo separado do código, acessibilidade e desempenho medidos.

**Stack:** React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · sem backend.

## O que a página tem

1. Cabeçalho fixo com logo, menu âncora, selo "aberto agora / fechado" e botão "Reservar mesa" (menu em tela cheia no celular)
2. Hero com foto grande do prato e chamadas para o cardápio e a reserva
3. Destaques: as quatro massas mais pedidas
4. Cardápio em abas (massas longas, recheadas, de forno, entradas, sobremesas e bebidas), com selos de vegetariano, vegano e sem glúten
5. **Monte sua massa**: massa → molho → adicionais, com preço ao vivo, quantidade, observações e envio do pedido pelo WhatsApp
6. Feita na casa: produção diária, história da casa e da chef
7. Galeria em mosaico (pratos, produção e salão)
8. Depoimentos, marcados como exemplos ilustrativos
9. Reserva com validação e mensagem pronta para o WhatsApp
10. Para levar: massa fresca e molhos por peso, delivery pelo WhatsApp e links de exemplo de apps
11. Perguntas frequentes em acordeão
12. Rodapé com endereço, horários por dia (o dia atual fica destacado), mapa e créditos das fotos

Além disso: botão flutuante de WhatsApp e o selo de aberto/fechado calculado a partir dos horários.

## Como rodar

Requer Node.js 20.19 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checa os tipos, gera o build e pré-renderiza o HTML em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | ESLint (inclui regras de acessibilidade do `jsx-a11y`) |
| `npm test` | Testes de unidade (Vitest) das regras de horário, reserva, montador e formatação |
| `npm run assets` | Regenera favicon, ícones e a imagem de compartilhamento (`public/`) |

**Simular outro horário (só em desenvolvimento):** acrescente `?agora=AAAA-MM-DDTHH:MM` à URL, no horário de Brasília. Exemplo: `http://localhost:5173/?agora=2026-10-05T12:00` mostra a casa fechada numa segunda-feira. Isso afeta o selo de aberto/fechado, o destaque do dia no rodapé e os horários disponíveis na reserva.

## Deploy na Vercel

O `vercel.json` já define o framework (Vite), o comando de build, a pasta `dist` e os cabeçalhos (cache imutável para `/assets` e alguns cabeçalhos de segurança). Basta importar o repositório na Vercel, ou rodar `npx vercel` na pasta do projeto.

Depois do primeiro deploy, troque `business.url` em `src/data/site.ts` pelo domínio final. Esse valor alimenta a URL canônica, as tags Open Graph, o `sitemap.xml`, o `robots.txt` e os dados estruturados.

## Adaptar para outro cliente

Todo o conteúdo está em **[`src/data/site.ts`](src/data/site.ts)**: dados do negócio, contato, horários, cardápio, opções do "Monte sua massa", textos de todas as seções, galeria, depoimentos, FAQ e créditos das fotos. Os componentes só leem desse arquivo.

1. Edite `src/data/site.ts` (os tipos em `src/types.ts` acusam campos faltando).
2. Troque as fotos em `src/assets/images/` mantendo os nomes, ou adicione novos nomes ao tipo `ImageKey` em `src/types.ts`.
3. Rode `npm run assets` para refazer favicon e imagem de compartilhamento.
4. Ajuste a paleta em `@theme`, no topo de `src/index.css`.

O WhatsApp é configurado em `business.whatsapp.number`, só dígitos, com DDI e DDD (ex.: `5551999999999`).

## Decisões técnicas

- **HTML pré-renderizado.** No build, o app é renderizado no Node (`src/entry-server.tsx` + `scripts/prerender.mjs`) e o HTML vai pronto em `dist/index.html`; o React só hidrata. O conteúdo chega aos buscadores sem depender de JavaScript e a foto do hero começa a carregar antes do bundle. Tudo que depende da hora do visitante (selo de aberto, dia atual, datas da reserva) é calculado só no navegador, para não gerar diferença de hidratação.
- **Uma fonte de verdade para SEO.** Um plugin no `vite.config.ts` lê `site.ts` e injeta no `<head>` o title, a description, a canonical, as tags Open Graph/Twitter e o JSON-LD `schema.org/Restaurant` (endereço, coordenadas, `openingHoursSpecification` e o cardápio completo como `Menu` → `MenuSection` → `MenuItem`, com preço e dieta). O mesmo plugin gera `robots.txt` e `sitemap.xml`. Por isso `site.ts` não importa nada além de tipos.
- **Horários no fuso de Porto Alegre.** `src/lib/hours.ts` converte os turnos numa linha do tempo semanal e usa `Intl.DateTimeFormat` com `America/Sao_Paulo`, então o selo fica certo mesmo para quem acessa de outro fuso. Turnos que passam da meia-noite e a virada de domingo para segunda são tratados. Os horários da reserva saem dos mesmos dados: só aparecem horários dentro do expediente, até uma hora antes de fechar e, para hoje, com pelo menos 30 minutos de antecedência.
- **Imagens.** As fotos ficam em JPEG (até 2000 px) e o `vite-imagetools` gera AVIF e WebP em quatro larguras no build, servidas com `<picture>`, `srcset`/`sizes` e `width`/`height` (sem deslocamento de layout). A foto do hero carrega com prioridade alta; as demais com `loading="lazy"`. O mapa (OpenStreetMap, sem chave de API) também é lazy.
- **Fontes servidas pelo próprio site.** Fraunces (títulos, com o eixo "soft", que dá um ar mais artesanal) e Source Sans 3 (texto) são do Google Fonts, mas vêm via `@fontsource-variable`. Assim não há requisição bloqueante a outro domínio, e o navegador só baixa os subconjuntos de caracteres usados.
- **Acessibilidade.** Marcação semântica com landmarks e hierarquia de títulos, link "Pular para o conteúdo", abas no padrão WAI-ARIA (setas, Home e End), acordeão com `aria-expanded`/`aria-controls`, menu mobile em `<dialog>` nativo (foco preso, Esc e retorno do foco), formulário com `aria-invalid`, mensagens de erro associadas aos campos e foco no primeiro erro, regiões `aria-live` para o total do pedido e a confirmação. O contraste da paleta foi checado (AA) e o contorno de foco muda de cor conforme o fundo.
- **Animações discretas.** Um único `IntersectionObserver` aplica um fade com leve subida quando os blocos entram na tela. Sem JavaScript o conteúdo aparece normalmente, e com `prefers-reduced-motion` nada se move.
- **Sem bibliotecas extras.** Abas, acordeão, montador e validação foram escritos à mão; as únicas dependências de runtime são React e as fontes.

### Paleta

| Token | Cor | Uso |
|---|---|---|
| `creme-50` / `creme-200` | `#FBF5EA` / `#F1E4CC` | Fundos |
| `terracota-600` | `#B5532F` | Botões (texto branco, 4,9:1) |
| `terracota-700` / `-800` | `#9A4426` / `#7E3419` | Preços, links, contorno de foco |
| `trigo-300` / `trigo-400` | `#EFCB73` / `#E8B64C` | Símbolo e acentos (nunca como cor de texto sobre creme) |
| `manjericao-700` | `#3F6B3A` | WhatsApp, selos vegetariano/vegano, "aberto agora" |
| `castanho-900` | `#2B1D14` | Texto e seções escuras |

### Lighthouse

Medido localmente em `npm run preview`, Lighthouse 13.5, em 03/10/2026:

| Perfil | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|---|
| Mobile (throttling simulado) | 94 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

## Estrutura

```
src/
├─ data/site.ts           conteúdo (único arquivo a trocar por cliente)
├─ types.ts               tipos do conteúdo
├─ assets/images/         fotos (otimizadas no build)
├─ components/
│  ├─ layout/             Header, Footer, WhatsAppFab
│  ├─ sections/           uma seção por arquivo, na ordem da página
│  └─ ui/                 Tabs, Accordion, Picture, Reveal, OpenStatus, DietBadges…
├─ hooks/                 useNow (hora atual, com simulação em dev), usePastaBuilder
├─ lib/                   horários, reserva, montador, WhatsApp, formatação, imagens, SEO/JSON-LD (+ testes *.test.ts)
├─ App.tsx, main.tsx, entry-server.tsx, index.css
scripts/                  prerender.mjs, generate-assets.mjs
```

## Créditos das fotos

As fotos vêm do [Wikimedia Commons](https://commons.wikimedia.org/) (CC0, domínio público, CC BY e CC BY-SA) e do [Unsplash](https://unsplash.com/) ([Unsplash License](https://unsplash.com/license), uso livre, sem fotos pagas do Unsplash+). As fotos de produção, do forno e do salão foram escolhidas para combinar entre si: luz natural e quente, madeira e farinha, sem flash nem fundo preto. As imagens foram redimensionadas e convertidas para AVIF/WebP. Os créditos também aparecem no rodapé da página, em "Créditos das fotos".

| Arquivo | Original | Autor | Licença | Fonte |
|---|---|---|---|---|
| `hero-talharim` | [Delicious spaghetti bolognese with sauce and cheese on a table](https://unsplash.com/photos/lmM2hqNzrfw) | BONNNI C | Unsplash License | Unsplash |
| `talharim-bolonhesa` | [Pasta dish on white ceramic plate](https://unsplash.com/photos/BhEXW19sW1M) | Farhad Ibrahimzade | Unsplash License | Unsplash |
| `raviolis-quatro-queijos` | [Four cheese ravioli with cream sauce](https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Four_cheese_ravioli_with_cream_sauce.jpg) | HaJunkiyada | CC BY-SA 4.0 | Commons |
| `lasanha` | [Lasagna (1)](https://commons.wikimedia.org/wiki/File:Lasagna_(1).jpg) | jeffreyw | CC BY 2.0 | Commons |
| `nhoque-sugo` | [Gnocchi al pomodoro](https://commons.wikimedia.org/wiki/File:Gnocchi_al_pomodoro.JPG) | Ivan Vighetto | CC BY-SA 3.0 | Commons |
| `talharim-trufado` | [Tagliatelle al tartufo](https://commons.wikimedia.org/wiki/File:Tagliatelle_al_tartufo.jpg) | GastRomagna | CC0 | Commons |
| `farinha-e-ovos` | [Making a better homemade pasta](https://commons.wikimedia.org/wiki/File:Making_a_better_homemade_pasta_-_16508591810.jpg) | Joy | CC BY 2.0 | Commons |
| `ninho-de-massa` | [Tagliatelle!](https://commons.wikimedia.org/wiki/File:Tagliatelle!_(378171165).jpg) | Sebastian Mary | CC BY-SA 2.0 | Commons |
| `maquina-de-massa` | [A person holding a yellow container with yellow cables](https://unsplash.com/photos/7loCcIB4v3o) | Andrés Giménez | Unsplash License | Unsplash |
| `lamina-de-massa` | [A person is using a pasta machine to make pasta](https://unsplash.com/photos/mciRIMaxiAM) | Vincent Dörig | Unsplash License | Unsplash |
| `massa-secando` | [A tray of pasta](https://unsplash.com/photos/KimM85EfmJs) | Marketa Wranova | Unsplash License | Unsplash |
| `ninhos-frescos` | [Tagliatelles bulk](https://commons.wikimedia.org/wiki/File:Tagliatelles_bulk.jpg) | Popo le Chien | CC0 | Commons |
| `capeletti-fresco` | [Fresh tortellini](https://commons.wikimedia.org/wiki/File:Fresh_tortellini.jpg) | scott feldstein | CC BY 2.0 | Commons |
| `nhoque-cru` | [Brown cookies on brown wooden table](https://unsplash.com/photos/5300Q8dOY18) | Gábor Molnár | Unsplash License | Unsplash |
| `cozinha-forno-lenha` | [A brick oven with fire burning inside of it](https://unsplash.com/photos/GnXQ0x-abPE) | Jay Gajjar | Unsplash License | Unsplash |
| `salao-abobadado` | [L'eau Vive restaurant, Rome](https://commons.wikimedia.org/wiki/File:L%27eau_Vive_restaurant,_Rome.jpg) | Wknight94 | CC BY-SA 3.0 | Commons |
| `salao-toalhas-vermelhas` | [Brown wooden table and chairs](https://unsplash.com/photos/iFyLBKmCrmQ) | Brands&People | Unsplash License | Unsplash |
| `tiramisu` | [Tiramisu](https://commons.wikimedia.org/wiki/File:Tiramisu_-_Raffaele_Diomede.jpg) | Raffaele Diomede | CC BY 2.0 | Commons |
| `bola-de-massa` | [Making a better homemade pasta](https://commons.wikimedia.org/wiki/File:Making_a_better_homemade_pasta_-_16694677671.jpg) | Joy | CC BY 2.0 | Commons |

Os títulos do Unsplash são os gerados pelo site e às vezes não descrevem a foto (o nhoque aparece como "cookies"); o texto alternativo da página é escrito à parte. Os ambientes das fotos são restaurantes reais de outros países, usados só como ilustração; os nomes deles não aparecem na página.

O mapa usa dados do © [OpenStreetMap](https://www.openstreetmap.org/copyright) e seus colaboradores. As fontes Fraunces e Source Sans 3 são distribuídas sob a SIL Open Font License.
