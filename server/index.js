import React from 'react'
import express from 'express'

import { readFileSync } from 'fs'
import { renderToString } from 'react-dom/server'

import { App } from '../client/app'
import { handlerModifyAnswersVotes } from '../shared/utility'

const data = {
  questions: [
    {
      questionId: 'Q1',
      content: 'Should we use jQuery our Fetch for Ajax?',
    },
    {
      questionId: 'Q2',
      content: 'Lorem ipsum?',
    },
  ],
  answers: [
    {
      answerId: 'A1',
      questionId: 'Q1',
      upvotes: 2,
      content: 'jQuery',
    },
    {
      answerId: 'A2',
      questionId: 'Q2',
      upvotes: 1,
      content: 'Lorem',
    },
  ],
}

const app = new express()

app.use(express.static('dist'))

app.get('/vote/:answerId', (req, res) => {
  const { query, params } = req
  data.answers = handlerModifyAnswersVotes(
    data.answers,
    params.answerId,
    parseInt(query.increment)
  )
  res.send('Ok')
})

app.get('/data', async (_req, res) => {
  res.json(data)
})

app.get('/', async (_req, res) => {
  const index = readFileSync(`public/index.html`, `utf8`)
  const rendered = renderToString(<App {...data} />)
  res.send(index.replace('{{rendered}}', rendered))
})

console.log('we are live')

app.listen(3333)
