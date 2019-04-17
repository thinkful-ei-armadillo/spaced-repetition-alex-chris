const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const bodyParser = express.json()
const languageRouter = express.Router()
const LinkedList = require('./Linked-List')

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try{
      const word = await LanguageService.getNextWord(req.app.get('db'), req.language.id);
      res.json({
        nextWord: word.original,
        totalScore: word.total_score,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count
      });
      next()
    } catch(error) {
      next(error); 
    }
  })

languageRouter
  .post('/guess', bodyParser, async (req, res, next) => {
    if (!req.body.answer){
      return res.status(400).json({error: "Missing 'guess' in request body"}); 
    }
    try{
      const list = await LanguageService.createLinkedList(req.app.get('db'), req.language.head);
      if (req.body.answer = list.head.value.translation) {
          head.value.correct_count = head.value.correct_count + 1;
          head.value.memory_value = head.value.memory_value * 2; 

      } 
      res.json(list); 
      next()
    } catch(error){
      next(error); 
    } 
  })

module.exports = languageRouter
