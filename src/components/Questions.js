import React from "react";
import { connect } from "react-redux";
import getQuestions from "../services/questionsAPI";

class Questions extends React.Component {
  state = {
    category: '',
    question: '',
    count: 0,
    questionType: true,
    correctAnswer: ''
  }

  async componentDidMount () {
    const { questions } = this.props
    const { count } = this.state
    this.setState({category: questions[count].category,
    question: questions[count].question,
    count: count + 1}, () => {
      this.checkType()
    })
  }

  checkType = () => {
    const { questions } = this.props
    const { count } = this.state
    if (questions[count].type === "multiple") {
      this.setState({questionType: true})
    } 
    this.setState({questionType: false})
  }

  shuffleArray = () => {
    const arr = []
    const { questions } = this.props
    const { count } = this.state
    console.log(questions[0].correct_answer)
    //arr.push(questions[0].correct_answer)
    //console.log(arr)
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
// Retornando array com aleatoriedade
  return arr;
  }

  render () {
    const { category, question, questionType } = this.state
    const { questions } = this.props
    return (
      <div>
        <div data-testid="question-category">
          {category}
        </div>
        <div data-testid="question-text">
          {question}
        </div>
        <div data-testid="answer-options">
          {
            questionType ? this.shuffleArray()
            :
            <p>false</p>
          }
        </div>
      </div>  
    )
  }
}
 
export default connect()(Questions)