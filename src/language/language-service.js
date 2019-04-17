'use strict'; 

const LinkedList = require('./Linked-List')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score'
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count'
      )
      .where({ language_id });
  },

  getNextWord(db, language_id){
    return db 
      .from('word as w')
      .select(
        'w.original',
        'w.correct_count',
        'w.incorrect_count',
        'l.total_score'
      )
      .leftJoin('language as l', 'w.language_id', 'l.id')
      .where({ language_id })
      .first();
  },

  createLinkedList(db, language_head){
    return db
      .from('word')
      .select('*')
      .where('id', language_head)
      .then(words => {
        const list = new LinkedList();
        words.forEach(word => {
          list.insertLast(word); 
        });
        return list; 
      });
  }
};

module.exports = LanguageService;
