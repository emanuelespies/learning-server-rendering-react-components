import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { handlerModifyAnswersVotes } from '../shared/utility'

let state = undefined

fetch('http://localhost:3333/data')
  .then((data) => data.json())
  .then((json) => {
    state = json
    console.log('state is ready', state)
    render()
  })

function handleVote(answerId, increment) {
  state.answers = handlerModifyAnswersVotes(state.answers, answerId, increment)

  fetch(`vote/${answerId}?increment=${increment}`)

  render()
}

function render() {
  ReactDOM.hydrate(
    <App {...state} handlerModifyAnswersVotes={handleVote} />,
    document.querySelector('#container')
  )
}
