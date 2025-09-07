  

# MockTest Linguaskill

  

Uma interface modular para realizar simulados para o exame internacional de Cambridge de Linguaskill

  
  
  

## FAQ

  

#### Como adiciono questões?

  

Dentro do arquivo Linguaskill.jsx você vai reordenar as questões e criar novas na função *Render content*

  

#### Quais tipos de questões existem?

  

- One collumn question: Para perguntas com lacunas dentro de um unico texto ou frase podendo ser com opções (Inline closed) ou não (Inline Open)

  

## todo
- Refatorar banco de dados para guardar resultados dentro da tabela

- Adicionar instrução para cada tipo de questão

- Adicionar nota automática e correção automática (Possível revisão de respostas)

- Separar as questões em um outro arquivo para facilitar a importação na base de dados via CDN

- Adicionar Integração de pagamento e sistema de chaves de acesso para prova

- Adicionar report de respostas para os alunos

#### Implementação

-  # 📚 Manual de Utilização das Classes React para Provas

  

Este manual descreve as classes React fornecidas para a criação de diferentes tipos de questões em um sistema de provas, com foco na sua utilização, nos props esperados e em exemplos de código práticos.

  

---

  

## 📋 Visão Geral das Classes

  

O sistema de prova utiliza um conjunto de componentes React para estruturar e apresentar diferentes formatos de perguntas. Cada componente tem uma função específica e um conjunto de propriedades (props) que definem seu comportamento e conteúdo.

  

##### tipos de questão

-  **`<Introduction>`**: Componente para as telas de introdução de uma seção.

-  **`<Instruction>`**: Usado para exibir as instruções gerais do exercício.

-  **`<OneCollumnQuestion>`**: Um tipo de pergunta onde todas as lacunas estão em uma única coluna.

-  **`<TwoCollumnQuestion>`**: Uma pergunta com uma estrutura de duas colunas.

-  **`<OneQuestionMultipleChoice>`**: Um componente para perguntas de múltipla escolha com apenas uma pergunta.

-  **`<DragQuestion>`**: Componente para perguntas do tipo "arrastar e soltar".

-  **`<ListeningClosed>`**: Questões de múltipla escolha baseadas em um áudio.

-  **`<ListeningGap>`**: Questões de áudio com lacunas para preencher.

-  **`<ListeningTable>`**: Questões de áudio com formato de tabela de correspondência.

-  **`<WritingTask>`**: Componente para tarefas de escrita (redação/essay).

  

##### Componentes internos

-  **`<InlineOpen>`**: Um componente que representa uma lacuna aberta para o usuário digitar.

-  **`<InlineClosed>`**: Um componente que apresenta uma lacuna com opções definidas pelo prop `alternatives` que recebe um array. Suporta apenas 4 alternativas por questão

-  **`<BoxText>`**: Um componente para exibir blocos de texto.

-  **`<AudioAlternative>`**: Representa uma alternativa em uma pergunta de áudio de múltipla escolha.

-  **`<IndentedItem>`**: Um item de lista com recuo.

  

---

  

## 📝 Detalhamento de Uso por Componente

  

### `<Introduction>`

Este componente representa uma inicialização de uma etapa da prova..

-  **Props**: O conteúdo é passado como `children` e o titulo como `title`. Para adicionar mais de uma linha basta usar a tag `br`

  

-  **Exemplo de Uso**:

```jsx

<Introduction  title={'Linguaskill - Reading'}>Linguaskill is an adaptive test `<br/>` This demonstration will.</Introduction>

```

  

### `<Instruction>`

Este componente é simples e serve apenas para exibir um texto de instrução. Deve estar sobre todo tipo de questão

-  **Props**: O conteúdo é passado como `children`. Para adicionar mais de uma linha basta usar a tag `br`. Deve-se passar sempre um `formRef` como prop

  

-  **Exemplo de Uso**:

```jsx

<Instruction>Click on each gap then type the word which you think fits best.</Instruction>

```

  

### `<OneCollumnQuestion>`

Para criar uma questão que ocupa toda a página. Podendo ser com lacunas .

-  **Props**: O conteúdo em texto é passado como `children`. Para adicionar mais de uma linha basta usar a tag `br`. As lacunas devem usar os componentes `<InlineOpen>` para abertas ou `<InlineClosed>` para fechadas

  

-  **Exemplo de Uso**:

```jsx

<OneCollumnQuestion  formRef={formRef}  title={'Open gap fill'}>

If you <InlineOpen></InlineOpen> ice, it melts <br/>

ou

If he <InlineClosed  alternatives={['alternativa 1', 'alternativa 2', 'alternativa 3', 'alternativa 4']}/> the meeting yesterday, he would know the plan now.

</OneCollumnQuestion>

```

### `<TwoCollumnQuestion>`
Cria uma questão dividida em duas colunas: uma com o texto de apoio e outra com perguntas de múltipla escolha.

-  **props**:  Sempre deve-se passar um `formRef` para garantir que o formulário vai ser salvo. O título é passado em um `title` e o subtitulo em um `subtitle`, as perguntas em um array `questions` onde cada elemento é um objeto com *heading* e *alternatives (Um array com strings)*. Cada texto deve ser passado em uma `boxtext` com prop de título

**Exemplo de uso**
```jsx

<TwoCollumnQuestion  formRef={formRef}
title='Question Title'
subtitle='Sub-title'
questions={[
{heading:  'My question', alternatives: ['A', 'B', 'C', 'D']},
{heading:  'Another question', alternatives: ['E', 'F', 'G', 'H']}
]}
>
<BoxText  title='title'>Lorem ipsum dolor sit amet</BoxText>

<BoxText  title='title 2'>Lorem, ipsum dolor sit</BoxText>

</TwoCollumnQuestion>
```

### `<OneQuestionMultipleChoice>`
Cria uma questão com um texto curto e 4 alternativas

-  **props**: O texto é passado como `children` e as alternativas em um array de strings `alternatives`

**Exemplo de uso**
```jsx
<OneQuestionMultipleChoice formRef={formRef} alternatives={['Test1','test2','test3','test4']}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
</OneQuestionMultipleChoice>
```

### `<DragQuestion>`
Cria uma questão com texto com lacunas e alternativas que podem ser arrastadas para o local correto.

-  **props**: as alternativas são passadas com um array de strings `propAlternatives` e o texto é armazenado no prop `paragraphs` que é um array de arrays onde cada elemento é um paragráfo, Toda lacuna é um par e texto é impar. Devem ser definidos como strings. O título é passado com `title` e subtítulo `subtitle`

**Exemplo de uso**
```jsx
<DragQuestion formRef={formRef}
        propAlternatives={[
          'teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1',
          'teste 2',
          'teste 3',
          'teste 4',
          'teste 5']}
        paragraphs={[
            ['Lorem ipsun et dolor Lorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolor ','drop','testing Lorem ipsun et dolorLorem ipsun et dolor','drop','mytest2 Lorem ipsun et dolorLorem ipsun et dolor','drop'],
            ['','drop'],
            ['testing','drop','my big text tenisghseugbseuog']
        ]}
        title='Question Title'
        subtitle='Sub-title'/>
```

### `<ListeningClosed>`
Cria uma questão de listening com diversas questões passadas como `AudioAlternatives`. 

-  **props**: Utilize `audioPath` para indicar o arquivo de áudio a ser utilizado na questão. O `title` define o título. Cada questão é um `AudioAlternative` que recebe a pergunta em `heading` e `alternatives` (Um array de strings para as alternativas)

**Exemplo de uso**
```jsx
<ListeningClosed formRef={formRef} audioPath={'/audios/audiotest.mp3'} title={'The sport of BASE jumping'}>
    <AudioAlternative heading={'Question, so nice'} alternatives={['A','B','C','D']}></AudioAlternative>
    <AudioAlternative heading={'My question'} alternatives={['A','B','C','D']}></AudioAlternative>
    <AudioAlternative heading={'My question'} alternatives={['A','B','C','D']}></AudioAlternative>
</ListeningClosed>
```

### `<ListeningGap>`
Cria uma questão de listening com lacunas `AudioAlternatives`. 

-  **props**: Utilize `audioPath` para indicar o arquivo de áudio a ser utilizado na questão. O `title` define o título. Cada questão é um `AudioAlternative` que recebe a pergunta em um `<p>` que contém uma `InlineOpen com removespace="false"`

**Exemplo de uso**
```jsx
<ListeningGap formRef={formRef} audioPath="/audios/audiotest.mp3" title='The sport of BASE jumping'>
    <p>test beforehand <InlineOpen removeSpace="false" /> testing</p>
    <p>test beforehand <InlineOpen removeSpace="false"/> testing</p>
    <p>test beforehand <InlineOpen removeSpace="false"/> testing</p>
</ListeningGap>
```

### `<ListeningTable>`
Cria uma tabela para uma questão de listening. 

-  **props**: Utilize `audioPath` para indicar o arquivo de áudio a ser utilizado na questão. O `title` define o título. E o elemento `question` para a questão definida. as linhas são definidas por `rows` (Um array de strings) e `columns` (Para definir a quantidade de speakers). Deve estar contido em um elemento `form className="w-10/12 h-full overflow-y-auto pt-0 pb-8"`

**Exemplo de uso**
```jsx
<form className="w-10/12 h-full overflow-y-auto pt-0 pb-8" ref={formRef}>
    <ListeningTable audioPath='/audios/audiotest.mp3' question='What does each person say was the main benefit to them of studying literature?'
    rows={[
        'I learnt to detect what was hidden beneath the surface.',
        'It impressed a number of different employers.',
        'It helped me to bring ideas together and express them clearly.',
        'I gained the confidence to challenge established writers’ work.',
        'It made me reconsider what to do with my life.',
        'I became completely objective in my approach.',
        'It revealed some solutions to common problems.',
        'It led me to a greater understanding of other people.',
    ]}
    columns={[
        'Speaker 1',
        'Speaker 2',
        'Speaker 3',
        'Speaker 4',
        'Speaker 5',]}
    >
</form>
```

### `<WritingTask>`
Cria uma questão de produção escrita (essay writing), onde o aluno deve desenvolver uma resposta mais longa a partir de instruções e textos de apoio.

-  **props**: `propQuestionId={getNextId()}`: identificador único da questão. `children:` conteúdo da instrução da redação. Aceita componentes auxiliares como `<BoxText>` para trechos destacados e `<IndentedItem> (Que recebe decorator para o tipo de lista)` para itens listados. Também pode usar `<br>`

**Exemplo de uso**
```jsx
<WritingTask propQuestionId={getNextId()} formRef={formRef}>
    Read the following statement: <br />
    <BoxText>
    <strong>The attention paid to celebrities these days has a negative effect on society.</strong>
    </BoxText>
    <br />
    Write an <strong>essay</strong> in which you: <br />
        <IndentedItem decorator={'disk'}>discuss and evaluate arguments both for and against the statement above.</IndentedItem>
        <IndentedItem decorator={'disk'}>indicate to what extent you agree or disagree with the statement.</IndentedItem>
        <IndentedItem decorator={'disk'}>indicate to what extent you agree or disagree with the statement.</IndentedItem>
        <br />
    Below are some different views you may wish to consider in your essay: <br />
        <IndentedItem>"Celebrity success inspires young people to aim high in their own lives." </IndentedItem>
        <IndentedItem>"Celebrity culture encourages the idea that success is usually instant." </IndentedItem>
        <IndentedItem>"Even when promoting good causes, celebrities are only promoting themselves."</IndentedItem> 
        <br />
    You can also include any other ideas you think are relevant. <br />
    Write <strong>at least 250 words.</strong>  <br />
    Use your own words as far as possible.
</WritingTask>
```