# FIAPressa - Nutrição Inteligente & Pedidos Rápidos

## a) Sobre o Projeto
**Nome do App:** FIAPressa

### Descrição do Problema
O ambiente acadêmico é dinâmico e exige rapidez. Muitas vezes, os alunos não possuem controle sobre a ingestão calórica diária ao utilizar as operações de alimentação da faculdade, resultando em uma rotina alimentar desequilibrada. O FIAPressa resolve o problema da **gestão nutricional integrada ao pedido**, permitindo que o aluno acompanhe sua meta diária enquanto realiza seus pedidos.

### Operação Escolhida
Escolhemos a operação de **Lanchonete/Restaurante da FIAP**. A escolha justifica-se pela alta frequência de uso e pela necessidade de uma interface que mostre não apenas o preço, mas o impacto calórico de cada escolha no dia do estudante.

### Evolução em relação ao CP1
* **Segurança:** Implementação de autenticação baseada em RM com validação estrita.
* **Persistência:** Uso de `AsyncStorage` para manter dados entre sessões.
* **UX/UI:** Evolução de uma interface simples para um design *Ultra-Premium* com visual Dark/Neon.
* **Dinamicidade:** Inclusão de meta calórica editável em tempo real.

### Funcionalidades Implementadas
* Autenticação via RM (6 dígitos).
* Dashboard de metas com barra de progresso dinâmica.
* Edição de meta calórica diária diretamente na tela principal.
* Cardápio Premium com descrições detalhadas e alertas de alérgenos.
* Carrinho de pedidos com cálculo de total e impacto calórico.
* Navegação protegida por contexto de autenticação.
* Logout seguro com limpeza de cache.

---

## b) Integrantes do Grupo
* **[Cauã Ferreira Muniz]** – RM: [566527]
* **[Henrique Mortari]** – RM: [564699]
* **[João VItor Angeloti]** – RM: [563473]
* **[Bernardo]** – RM: [565776]

---

## c) Como Rodar o Projeto
### Pré-requisitos
* **Node.js** (v18 ou superior)
* **Expo SDK 50+**
* **App Expo Go** instalado no dispositivo móvel ou emulador configurado.

### Passo a Passo
1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/usuario/fiap-cpad-cp2-fiapressa
    ```
2.  **Acesse a pasta:**
    ```bash
    cd fiap-cpad-cp2-fiapressa
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o projeto:**
    ```bash
    npx expo start
    ```
*Escaneie o QR Code com o aplicativo Expo Go no Android ou a câmera no iOS.*

---

## d) Demonstração Visual
> **⚠️ IMPORTANTE:** Substitua os links abaixo pelos caminhos reais das suas imagens e vídeos.

### Prints das Telas
| Login | Cardápio (Meta) | Detalhes do Produto | Carrinho |
| :---: | :---: | :---: | :---: |
| ![Login](https://via.placeholder.com/200x400?text=Tela+Login) | ![Menu](https://via.placeholder.com/200x400?text=Cardapio) | ![Detalhes](https://via.placeholder.com/200x400?text=Detalhes) | ![Pedidos](https://via.placeholder.com/200x400?text=Carrinho) |

### Fluxo Completo (Vídeo/GIF)
[![Assista ao vídeo](https://img.shields.io/badge/YouTube-Assistir%20Demonstração-red?style=for-the-badge&logo=youtube)](LINK_DO_SEU_VIDEO_AQUI)

---

## e) Decisões Técnicas
### Estrutura de Pastas
* `/app`: Contém as rotas do Expo Router (`index.js`, `details.js`, `orders.js`).
* `/context`: Gerenciamento de estado global (`AuthContext.js`).
* `/assets`: Imagens e logos oficiais.

### Gerenciamento de Estado (Context API)
Criamos o `AuthContext` para gerenciar:
1.  **Sessão do Usuário:** Nome e status de autenticação.
2.  **Metas Calóricas:** O valor da meta e o cálculo de consumido vs. restante.
3.  **Pedidos:** Array global contendo os itens adicionados ao carrinho.

### Autenticação e Segurança
A autenticação verifica o tamanho do RM (6 dígitos). Se válido, o usuário é persistido e as rotas protegidas são liberadas através do `router.replace` dentro do `useEffect` de monitoramento do estado `signed`.

### Persistência com AsyncStorage
Dados persistidos para garantir que o aluno não perca o progresso ao fechar o app:
* `@FIAPressa:user`: Dados do perfil logado.
* `@FIAPressa:goal`: Valor personalizado da meta calórica (Chave: `goal`).

---

## f) Diferencial Implementado
**Diferencial:** **Sistema de Metas Nutricionais Editáveis e Alertas de Alérgenos.**

**Justificativa:**
Escolhemos este diferencial para transformar o app de uma simples lista de compras em uma ferramenta de saúde. O usuário tem total autonomia para editar sua meta conforme sua dieta (bulking, cutting ou manutenção) e segurança total ao visualizar alérgenos antes de adicionar ao carrinho.

**Resumo Técnico:**
Utilizamos um `TextInput` integrado ao estado global que atualiza o `AsyncStorage` em cada alteração. Os dados dos produtos incluem um array de strings de alérgenos que são renderizados condicionalmente em cada card de produto.

---

## g) Próximos Passos
* Integração com API de pagamento real.
* Histórico de pedidos realizados nos últimos 30 dias.
* Gráficos semanais de consumo calórico via `react-native-chart-kit`.
