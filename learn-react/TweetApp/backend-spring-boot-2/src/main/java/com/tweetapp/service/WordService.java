package com.tweetapp.service;

import com.tweetapp.model.Word;
import com.tweetapp.repository.WordRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WordService {
    
    @Autowired
    private WordRepository wordRepository;
    
    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }
    
    public Word getWordById(String id) {
        return wordRepository.findById(id).orElse(null);
    }
    
    public Word createWord(Map<String, Object> wordData) {
        Word word = new Word();
        word.setId(UuidUtil.generateUuid());
        word.setUniqueName((String) wordData.get("unique_name"));
        word.setWord((String) wordData.get("word"));
        word.setType((String) wordData.get("type"));
        word.setDetails((String) wordData.get("details"));
        word.setCreatedOn(LocalDateTime.now());
        word.setUpdatedOn(LocalDateTime.now());
        word.setLastRead(LocalDateTime.now());
        return wordRepository.save(word);
    }
    
    public Word updateWord(String id, Map<String, Object> wordData) {
        Optional<Word> optionalWord = wordRepository.findById(id);
        if (optionalWord.isPresent()) {
            Word word = optionalWord.get();
            if (wordData.containsKey("unique_name")) word.setUniqueName((String) wordData.get("unique_name"));
            if (wordData.containsKey("word")) word.setWord((String) wordData.get("word"));
            if (wordData.containsKey("type")) word.setType((String) wordData.get("type"));
            if (wordData.containsKey("details")) word.setDetails((String) wordData.get("details"));
            word.setUpdatedOn(LocalDateTime.now());
            word.setLastRead(LocalDateTime.now());
            return wordRepository.save(word);
        }
        return null;
    }
    
    public boolean deleteWord(String id) {
        if (wordRepository.existsById(id)) {
            wordRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Word> searchWords(String searchString) {
        return wordRepository.findAll().stream()
                .filter(word -> (word.getWord() != null && word.getWord().toLowerCase().contains(searchString.toLowerCase())) ||
                               (word.getUniqueName() != null && word.getUniqueName().toLowerCase().contains(searchString.toLowerCase())))
                .collect(java.util.stream.Collectors.toList());
    }
}

