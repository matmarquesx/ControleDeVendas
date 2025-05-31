# 🛒 Sistema de Controle de Vendas

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Design-orange?style=for-the-badge&logo=responsive-design&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Responsive_Design)

Uma aplicação web completa para controle de vendas, permitindo seleção de produtos, definição de quantidades, escolha de formas de pagamento e cálculos automáticos baseados em regras de negócio específicas.

![ControleDeVenda](https://i.imgur.com/zahT8OD.png)

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Regras de Negócio](#-regras-de-negócio)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Utilizar](#-como-utilizar)
- [Detalhes de Implementação](#-detalhes-de-implementação)

## ✨ Funcionalidades

- ✅ **Seleção de produtos** através de checkboxes intuitivos
- 🔢 **Inserção de quantidades** para cada produto selecionado
- 💰 **Cálculo automático de subtotais** em tempo real
- 💳 **Opções de pagamento flexíveis**:
  - À vista (com 8,5% de desconto)
  - A prazo (com taxa de 6% + R$ 6,90 por parcela)
- 📊 **Parcelamento personalizado** (2 a 5 parcelas)
- ✅ **Validação inteligente** do valor mínimo de parcela (R$ 10,00)
- 📝 **Resumo detalhado da compra** com valores discriminados
- 🔄 **Botões de ação** para calcular e limpar o formulário

## 📜 Regras de Negócio

- **Quantidade de parcelas:** 2, 3, 4 ou 5 parcelas disponíveis
- **Valor mínimo da parcela:** Não pode ser inferior a R$ 10,00
- **Taxa de parcelamento:** 6% do valor total da venda + R$ 6,90 por parcela
- **Desconto à vista:** 8,5% de desconto sobre o valor total da venda

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estruturação semântica para melhor acessibilidade e SEO
- **CSS3**: Design responsivo com layout moderno e adaptável
- **JavaScript**: Programação orientada a eventos para interatividade
- **LocalStorage** (opcional): Para persistência de dados no navegador
- **Flexbox/Grid**: Para layouts flexíveis e responsivos

## 📁 Estrutura do Projeto

```
controle-vendas/
├── index.html      # Estrutura da página e elementos de interface
├── styles.css      # Estilos, layout responsivo e design visual
├── script.js       # Lógica de cálculo e interações com o usuário
└── README.md       # Documentação completa do projeto
```

## 🚀 Como Utilizar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/controle-vendas.git
   cd controle-vendas
   ```

2. Abra o arquivo `index.html` em qualquer navegador web moderno

3. Interaja com a aplicação:
   - Selecione os produtos desejados marcando os checkboxes
   - Insira as quantidades para cada produto selecionado
   - Escolha a forma de pagamento (à vista ou a prazo)
   - Se escolher a prazo, selecione o número de parcelas
   - Clique em "Calcular" para ver o resumo detalhado da compra
   - Use o botão "Limpar" para reiniciar o formulário quando necessário

## 🔍 Detalhes de Implementação

### HTML
- Estrutura semântica com tags apropriadas para cada seção
- Tabela responsiva para exibição organizada de produtos e quantidades
- Formulário intuitivo para seleção do método de pagamento
- Seção de resumo com layout claro para visualização dos resultados

### CSS
- Design responsivo que se adapta a dispositivos móveis, tablets e desktops
- Esquema de cores profissional com contraste adequado para acessibilidade
- Efeitos visuais sutis (hover, focus) para melhorar a experiência do usuário
- Layout em grid para organização eficiente e adaptável do conteúdo

### JavaScript
- Inicialização dinâmica do catálogo de produtos
- Gerenciamento de estado para controle de seleções e valores
- Cálculos automáticos baseados nas regras de negócio definidas
- Validações em tempo real para garantir a integridade dos dados
- Feedback visual imediato após ações do usuário

---

Desenvolvido como parte de um projeto de desenvolvimento web.

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
