// Section instruction
<>
  <Introduction title="Linguaskill - Listening section">
    Linguaskill is an adaptive test. <br />
    This demonstration will show you what the Listening questions look like.{" "}
    <br />
    To move through the questions, click the arrows in the bottom-right corner
    of the screen. <br />
    You will have time to read the questions. The audio will begin when the
    reading time is finished. You will hear the audio twice.
    <br />
    Click <strong>Start</strong> in the bottom-right corner of the screen to
    begin the demonstration.
  </Introduction>

  {/* Reading and use of english */}
  <>
  <OneCollumnQuestion  formRef={formRef}  title={'Open gap fill'} instruction={'Read the text given and check the correct answer to each question on the right.'}>
    If you <InlineOpen></InlineOpen> ice, it melts <br/>
    ou
    If he <InlineClosed  alternatives={['alternativa 1', 'alternativa 2', 'alternativa 3', 'alternativa 4']}/> the meeting yesterday, he would know the plan now.
  </OneCollumnQuestion>
  </>
  
  <Instruction>
    Read the text given and check the correct answer to each question on the
    right.
  </Instruction>
  <TwoCollumnQuestion
    formRef={formRef}
    title="Blue spaces"
    subtitle="Why time spent near water is the secret of happiness"
    questions={[
      {
        heading: "What do we learn about Kelly in the first paragraph",
        alternatives: ["A", "B", "C", "D"],
      },
    ]}
  >
    <p>You can use paragraph</p>
    <BoxText title="title">Or boxText</BoxText>
  </TwoCollumnQuestion>

  <Instruction>
    Choose the correct answer.
  </Instruction>
  <OneQuestionMultipleChoice
    formRef={formRef}
    alternatives={["Test1", "test2", "test3", "test4"]}
  >
    <strong>To all physics students</strong> <br />
    The lecture tomorrow is in Room
    23B due to maintenance works in
    room 88C. Works should be
    completed by lunchtime, but you
    should check the notice board just
    in case other arrangements are
    required for afternoon classes.
  </OneQuestionMultipleChoice>

  <Instruction>
    The following text has some parts removed from it. <br />
    Click and drag the options to the apropriate place.
  </Instruction>
  <DragQuestion
    formRef={formRef}
    propAlternatives={[
      "teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1",
      "teste 2",
      "teste 3",
      "teste 4",
      "teste 5",
    ]}
    paragraphs={[
      [
        "Lorem ipsun et dolor Lorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolor ",
        "drop",
        "testing Lorem ipsun et dolorLorem ipsun et dolor",
        "drop",
        "mytest2 Lorem ipsun et dolorLorem ipsun et dolor",
        "drop",
      ],
      ["", "drop"], //Para adicionar parágrafo vazio
      ["testing", "drop", "my big text tenisghseugbseuog"],
    ]}
    title="Question Title"
    subtitle="Sub-title"
  />

  {/* Listening questions */}
  <Instruction>
    For this question, choose the correct answer. <br /> You have 10 seconds to
    read the question. You will hear the recording twice.
  </Instruction>
  <ListeningClosed
    formRef={formRef}
    audioPath={"/audios/audiotest.mp3"}
    title={"The sport of BASE jumping"}
  >
    <AudioAlternative
      heading={"Question, so nice"}
      alternatives={["A", "B", "C", "D"]}
    ></AudioAlternative>
    <AudioAlternative
      heading={"My question"}
      alternatives={["A", "B", "C", "D"]}
    ></AudioAlternative>
    <AudioAlternative
      heading={"My question"}
      alternatives={["A", "B", "C", "D"]}
    ></AudioAlternative>
  </ListeningClosed>

  <Instruction>
    For these questions, complete the sentences with no more than three words in
    each gap. <br />
    You have 45 seconds to read the sentences. You will hear the recording
    twice. <br /> <br />
    Listen to a woman called Lucy Townsend talking about an extreme sport called
    BASE Jumping.
  </Instruction>
  <ListeningGap
    formRef={formRef}
    audioPath="/audios/audiotest.mp3"
    title="The sport of BASE jumping"
  >
    <p>
      test beforehand <InlineOpen removeSpace="false" /> testing
    </p>
    <p>
      test beforehand <InlineOpen removeSpace="false" /> testing
    </p>
    <p>
      test beforehand <InlineOpen removeSpace="false" /> testing
    </p>
  </ListeningGap>

  <Instruction>
    For these questions, complete the sentences with no more than three words in
    each gap. <br />
    You have 45 seconds to read the sentences. You will hear the recording
    twice. <br /> <br />
    Listen to a woman called Lucy Townsend talking about an extreme sport called
    BASE Jumping.
  </Instruction>
  <form className="w-10/12 h-full overflow-y-auto pt-0 pb-8" ref={formRef}>
    <ListeningTable
      audioPath="/audios/audiotest.mp3"
      question="What does each person say was the main benefit to them of studying literature?"
      rows={[
        "I learnt to detect what was hidden beneath the surface.",
        "It impressed a number of different employers.",
        "It helped me to bring ideas together and express them clearly.",
        "I gained the confidence to challenge established writers’ work.",
        "It made me reconsider what to do with my life.",
        "I became completely objective in my approach.",
        "It revealed some solutions to common problems.",
        "It led me to a greater understanding of other people.",
      ]}
      columns={[
        "Speaker 1",
        "Speaker 2",
        "Speaker 3",
        "Speaker 4",
        "Speaker 5",
      ]}
    ></ListeningTable>
    <ListeningTable
      audioPath="/audios/audiotest.mp3"
      question="What does each person say was the main benefit to them of studying literature?"
      rows={[
        "parental disapproval",
        "a persistent injury",
        "the negative attitude of friends",
        "inconveniently located sports facilities",
        "maintaining a strict diet",
      ]}
      columns={[
        "Speaker 1",
        "Speaker 2",
        "Speaker 3",
        "Speaker 4",
        "Speaker 5",
      ]}
    ></ListeningTable>
  </form>

  {/* Writing task */}
<Instruction>You have 45 minutes for this task.</Instruction>
  <WritingTask propQuestionId={getNextId()} formRef={formRef}>
    Read the following statement: <br />
    <BoxText>
      <strong>
        The attention paid to celebrities these days has a negative effect on
        society.
      </strong>
    </BoxText>
    <br />
    Write an <strong>essay</strong> in which you: <br />
        <IndentedItem decorator={"disk"}>
        discuss and evaluate arguments both for and against the statement above.
        </IndentedItem>
        <IndentedItem decorator={"disk"}>
        indicate to what extent you agree or disagree with the statement.
        </IndentedItem>
        <IndentedItem decorator={"disk"}>
        indicate to what extent you agree or disagree with the statement.
        </IndentedItem>
    <br />
    Below are some different views you may wish to consider in your essay:{" "}
    <br />
        <IndentedItem>
        "Celebrity success inspires young people to aim high in their own lives."{" "}
        </IndentedItem>
        <IndentedItem>
        "Celebrity culture encourages the idea that success is usually instant."{" "}
        </IndentedItem>
        <IndentedItem>
        "Even when promoting good causes, celebrities are only promoting
        themselves."
        </IndentedItem>
    <br />
    You can also include any other ideas you think are relevant. <br />
    Write <strong>at least 250 words.</strong> <br />
    Use your own words as far as possible.
  </WritingTask>
</>;







// Gabarito:
// 1: Students who have morning lectures will need to...
// 2: Element
// 3: If walkers choose this path, they need to be extra careful.
// 4: trivialise


// 5: people think and behave irrationally when it comes to eating.
// 6: defending Plumlee on an arguable issue.
// 7: set a concerning precedent for themselves.
// 8: health gurus are self-centered people.
// 9: uses irony and humour to agree with Plumlee's position.

// 10: who
// 11: would
// 12: from
// 13: neither
// 14: while

// 15: devoted
// 16: sprung
// 17: foster
// 18: convival
// 19: glued to

// 20: Being fully equipped with all this stuff beforehand makes it easier when you go for auditions.
// 21: When it comes to coping with stress, I find that exercise helps me to cope with my problems, so I stay in good shape mentally as well.
// 22: After that it's back to England to start a new term of dance classes.
// 23: It's fine, but I try not to give out too much advice as it gets irritating!
// 24: Like any profession where you're always travelling, you tend to acquire something new almost every day.
// 25: And if nothing you like comes out of it, then come back and be an actor or dancer.


// 26:  calm and reflective.
// 27: She does nothing in order to avoid a fuss.
// 28: She hopes it will prompt her to take up exercise.
// 29: glad to have got her own way.
// 30: he might damage an item of furniture.
// 31: makes a tinkling sound.

// 32: It is a typical image most folk have of the beast, but it is very much a false one, for the wildcat is little more than a bigger version of the domestic cat, and probably shows his anger as often.
// 33: They probably used deciduous and coniferous woodland for shelter, particularly in winter, and hunted over more open areas such as forest edge, open woodland, thickets and scrub, grassy areas and marsh. The wildcat was probably driven into more mountainous areas by a combination of deforestation and persecution.
// 34: The recruitment of men to the armed forces during the conflict in Europe from 1914 to 1918 meant there was very little persecution, since gamekeepers went off to fight. As the number of gamekeepers decreased, the wildcat began to increase its range, recolonising many of its former haunts. Extinction was narrowly averted.
// 35: This is what makes many people think that the wildcat is a species in its own right. Research currently being undertaken by Scottish Natural Heritage is investigating whether the wildcat really is distinct from its home- living cousin, or whether it is nothing more than a wild-living form of the domestic cat.
// 36: The results, which are expected shortly, will be fascinating. But anyone who has seen a wildcat will be in little doubt that there is indeed a unique and distinctive animal living in the Scottish Highlands, whatever his background.
// 37: As the animals emerge, their curiosity is aroused by every movement and rustle in the vegetation. Later they will accompany their mother on hunting trips, learning quickly, and soon become adept hunters themselves.

// Sources
// https://www.tlsprepmaster.online/linguaskill/practice-questions/rl/docuset1/0
// https://www.tlsprepmaster.online/linguaskill/practice-questions/rl/docuset2/0
// https://www.flo-joe.co.uk/fce/students/tests/part3.htm
// https://www.flo-joe.co.uk/cae/students/tests/CAE-Part-7-Gapped-Text-Practice-Test.htm