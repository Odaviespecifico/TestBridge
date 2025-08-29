import { useState, useRef, Children } from "react";
import "./index.css";
import { OneCollumnQuestion, TwoCollumnQuestion, OneQuestionMultipleChoice, DragQuestion, RegisterAttempt, ListeningClosed, ListeningGap, ListeningTable, BoxText, OneCollumnParagraph, WritingTask, IndentedItem} from "./questions.jsx";
import {AudioAlternative, InlineOpen,DropAlternative,} from "./Alternatives.jsx";
import {adicionarTentativa} from './supabase.js'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

