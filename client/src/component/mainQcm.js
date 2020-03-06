import React from "react";
import { quizData } from "../const/qcmData";
import { connect } from 'react-redux';
import propTypes from 'prop-types';




class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  };

  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 3
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion + 1 === quizData.length  ) {
      this.setState({
        isEnd: true
      });
    }
  };

 

  render() {
    const { user } = this.props.auth;
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        
      

        <div className="result">
          <div style={{textAlign:"center"}}>
          <h3 >Votre Score Final est {this.state.score} points </h3>
          <p > les correctes reponses :</p>
          </div>
          <p>
           
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
    <span> Reponse de Question{index + 1}-{'     '}</span> {item.answer}
                </li>
              ))}
            </ul>
          </p>
        </div>
      
      );
    } else {
      return (
        <div className="App">
       
          
          <h1>{this.state.questions} </h1>
          <span>{`Question ${currentQuestion + 1 }  de ${quizData.length 
            } (3 points) `}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion  < quizData.length  - 1 && (
            <button
              className="btnAdd"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentQuestion === quizData.length - 1 && (
            <button className="btnAdd" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
       

      );
    }
  }
}
MainQuiz.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    
})
export default connect(mapStateToProps)(MainQuiz);
