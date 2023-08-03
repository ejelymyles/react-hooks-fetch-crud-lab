import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

// when application loads (use UseEffect), build a GET rrequest to the server. display all the questions using the questionList component. 
// render QuestionItem components, with formData passed in as a prop called "Question". Map over Data to pass in one "question" at a time. 

function QuestionList() {

const [data, setData] = useState([])

useEffect(() => {
  fetch("http://localhost:4000/questions")
  .then((r) => r.json())
  .then((questions) => {
    setData(questions)
  })
},[])

function handleDelete(question){
  const updatedQuestions = data.filter((item) => item.id !== question.id);
  setData(updatedQuestions)
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {data.map((question) => (
      <QuestionItem key={question.id} question={question} onQuestionDelete={handleDelete} /> ))}
      </ul>
    </section>
  );
}

export default QuestionList;
