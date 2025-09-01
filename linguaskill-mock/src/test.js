export const questions = [
        <>
        <Instruction>Click on each gap then type the word which you think fits best.</Instruction>
        <OneCollumnQuestion formRef={formRef} title={'Open gap fill'}>
          If you <InlineOpen></InlineOpen> ice, it melts <br/>
          If she <InlineOpen/> hard, she will pass the exam <br />
          If I <InlineOpen/> more confidente, I would speak in the meeting. <br />
          If they invite me, I <InlineOpen/> to the party <br />
          If we <InlineOpen/> earlier, we wouldn't have missed the train. <br />
          if I <InlineOpen/> the answer, I would have told you
          You will feel better if you <InlineOpen/> some rest.<br />
          If he <InlineOpen/> the meeting yesterday, he would know the plan now.  
        </OneCollumnQuestion>;
        </>, 
        <>
          <Instruction>Click on each gap then type the word which you think fits best.</Instruction>
          <TwoCollumnQuestion formRef={formRef}
          title='Question Title'
          subtitle='Sub-title'
          questions={[
            {heading: 'My question', alternatives: ['A', 'B', 'C', 'D']},
            {heading: 'Another question', alternatives: ['E', 'F', 'G', 'H']}
          ]}
          >
            <BoxText title='title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ad explicabo quidem quo similique rem nulla aut impedit accusantium. Accusantium iste aliquam illo culpa dolorum quia totam aperiam nihil accusamus.</BoxText>
            <BoxText title='title 2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores nobis dolorum fugit velit sed, accusantium iste nam iusto debitis voluptatibus! Aliquam voluptate amet fugiat quasi quia deleniti cupiditate cumque?</BoxText>
          </TwoCollumnQuestion>
        </>,


        <>
          <Instruction>Click on each gap then type the word which you think fits best.</Instruction>
          <OneQuestionMultipleChoice formRef={formRef} alternatives={['Test1','test2','test3','test4']}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ratione quaerat quae dolores cupiditate aut sint corrupti, ullam facere aperiam impedit quisquam libero nulla nihil officiis saepe? Autem, veniam praesentium.
          </OneQuestionMultipleChoice>
        </>,


        <>
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
        </>,


        <>
        <Introduction title='Linguaskill - Listening section'>Linguaskill is an adaptive test. <br />
          This demonstration will show you what the Listening questions look like. <br />
          To move through the questions, click the arrows in the bottom-right corner of the screen. <br />
          You will have time to read the questions. The audio will begin when the reading time is finished. You will hear the audio twice. <br />
          Click <strong>Start</strong> in the  bottom-right corner of the screen to begin the demonstration. 
        </Introduction>;
        </>,


        <>
        <Instruction>For this question, choose the correct answer. <br /> You have 10 seconds to read the question. You will hear the recording twice.</Instruction>
        <ListeningClosed formRef={formRef} audioPath={'/audios/audiotest.mp3'} title={'The sport of BASE jumping'}>
            <AudioAlternative heading={'Question, so nice'} alternatives={['A','B','C','D']}></AudioAlternative>
            <AudioAlternative heading={'My question'} alternatives={['A','B','C','D']}></AudioAlternative>
            <AudioAlternative heading={'My question'} alternatives={['A','B','C','D']}></AudioAlternative>
          </ListeningClosed>
        </>,


        <>
            <Instruction>For these questions, complete the sentences with no more than three words in each gap. <br/> 
            You have 45 seconds to read the sentences. You will hear the recording twice. <br /> <br />
            Listen to a woman called Lucy Townsend talking about an extreme sport called BASE Jumping.
            </Instruction>
            <ListeningGap formRef={formRef} audioPath="/audios/audiotest.mp3" title='The sport of BASE jumping'>
              <p>test beforehand <InlineOpen removeSpace="false" /> testing</p>
              <p>test beforehand <InlineOpen removeSpace="false"/> testing</p>
              <p>test beforehand <InlineOpen removeSpace="false"/> testing</p>
            </ListeningGap>
        </>,


        <>
          <Instruction>For these questions, complete the sentences with no more than three words in each gap. <br/> 
            You have 45 seconds to read the sentences. You will hear the recording twice. <br /> <br />
            Listen to a woman called Lucy Townsend talking about an extreme sport called BASE Jumping.
          </Instruction>
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
            </ListeningTable>
            <ListeningTable audioPath='/audios/audiotest.mp3' question='What does each person say was the main benefit to them of studying literature?'
            rows={[
              "parental disapproval", "a persistent injury", "the negative attitude of friends", "inconveniently located sports facilities", "maintaining a strict diet"
            ]}
            columns={[
              'Speaker 1',
              'Speaker 2',
              'Speaker 3',
              'Speaker 4',
              'Speaker 5',
            ]}
            >
            </ListeningTable>
          </form>
        </>,


        <>
          <Introduction title='Linguaskill - Writing Section'>Linguaskill is an adaptive test. <br />
          There are two questions in this test. <br />
          You have 55 minutes. <br />
          Click <strong>Start</strong> in the bottom-right corner of the screen to continue. 
          </Introduction>
        </>,


        <>
          <Instruction>You have 45 minutes for this task.</Instruction>
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
          </>
]