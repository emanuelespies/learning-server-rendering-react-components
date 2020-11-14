import React from 'react'

export const App = ({ questions, answers }) => (
  <>
    <h1>Q&A Tool</h1>

    {questions.map(({ questionId, content }, index) => (
      <ul key={questionId}>
        <li key={index}>
          <h2>{content}</h2>
          <ul className="answers">
            {answers
              .filter((answer) => answer.questionId === questionId)
              .map(({ content, upvotes, answerId }, index) => (
                <li key={index}>
                  {content} - {upvotes}
                </li>
              ))}
          </ul>
        </li>
      </ul>
    ))}
  </>
)
