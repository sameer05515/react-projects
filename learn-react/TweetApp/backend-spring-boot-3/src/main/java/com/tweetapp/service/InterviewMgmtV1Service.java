package com.tweetapp.service;

import com.tweetapp.model.InterviewCategory;
import com.tweetapp.model.InterviewQuestion;
import com.tweetapp.repository.InterviewCategoryRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class InterviewMgmtV1Service {
    
    @Autowired
    private InterviewCategoryRepository interviewCategoryRepository;
    
    public List<InterviewCategory> getAllCategories() {
        return interviewCategoryRepository.findAll();
    }
    
    public InterviewCategory getCategoryByUniqueId(String uniqueId) {
        return interviewCategoryRepository.findByUniqueId(uniqueId).orElse(null);
    }

    public Map<String, Object> getCategoryResponseByUniqueId(String uniqueId) {
        InterviewCategory category = interviewCategoryRepository.findByUniqueId(uniqueId).orElse(null);
        if (category == null) return null;

        List<InterviewCategory> children = interviewCategoryRepository.findByParentId(uniqueId);
        List<Map<String, Object>> childDtos = children.stream()
            .map(c -> {
                Map<String, Object> m = new HashMap<>();
                m.put("title", c.getTitle());
                m.put("uniqueId", c.getUniqueId());
                return m;
            })
            .collect(Collectors.toList());
        List<Map<String, Object>> ancestors = getAllAncestors(category.getParentId());

        Map<String, Object> response = new HashMap<>();
        response.put("uniqueId", category.getUniqueId());
        response.put("title", category.getTitle());
        response.put("parentId", category.getParentId());
        response.put("categoryName", category.getCategoryName());
        response.put("rating", category.getRating());
        response.put("questions", category.getQuestions() != null ? category.getQuestions() : List.of());
        response.put("children", childDtos);
        response.put("ancestors", ancestors);

        return response;
    }
    
    public InterviewCategory createCategory(Map<String, Object> categoryData) {
        InterviewCategory category = new InterviewCategory();
        category.setUniqueId(UuidUtil.generateUuid());
        category.setCategoryName((String) categoryData.get("categoryName"));
        category.setTitle((String) categoryData.get("title"));
        category.setParentId(categoryData.get("parentId") != null ? (String) categoryData.get("parentId") : "");
        return interviewCategoryRepository.save(category);
    }
    
    public InterviewCategory updateCategoryByUniqueId(String uniqueId, Map<String, Object> categoryData) {
        Optional<InterviewCategory> optionalCategory = interviewCategoryRepository.findByUniqueId(uniqueId);
        if (optionalCategory.isPresent()) {
            InterviewCategory category = optionalCategory.get();
            if (categoryData.containsKey("categoryName")) category.setCategoryName((String) categoryData.get("categoryName"));
            if (categoryData.containsKey("title")) category.setTitle((String) categoryData.get("title"));
            if (categoryData.containsKey("parentId")) category.setParentId((String) categoryData.get("parentId"));
            return interviewCategoryRepository.save(category);
        }
        return null;
    }
    
    public boolean deleteCategoryByUniqueId(String uniqueId) {
        Optional<InterviewCategory> optionalCategory = interviewCategoryRepository.findByUniqueId(uniqueId);
        if (optionalCategory.isPresent()) {
            interviewCategoryRepository.deleteByUniqueId(uniqueId);
            return true;
        }
        return false;
    }

    public List<InterviewQuestion> getQuestionsByCategoryId(String categoryId) {
        InterviewCategory category = findCategoryByIdOrUniqueId(categoryId);
        if (category == null) {
            throw new IllegalArgumentException("Category not found");
        }
        return category.getQuestions() != null ? category.getQuestions() : List.of();
    }

    public InterviewQuestion saveQuestionForCategoryId(String categoryId, Map<String, Object> questionData) {
        InterviewCategory category = findCategoryByIdOrUniqueId(categoryId);
        if (category == null) {
            throw new IllegalArgumentException("Category not found");
        }
        InterviewQuestion question = new InterviewQuestion();
        question.setUniqueId(UuidUtil.generateUuid());
        question.setQues((String) questionData.get("ques"));
        question.setTitle((String) questionData.get("title"));
        question.setQuesId(questionData.get("quesId") instanceof Number ? ((Number) questionData.get("quesId")).intValue() : null);
        question.setRating(questionData.get("rating") instanceof Number ? ((Number) questionData.get("rating")).intValue() : null);
        question.setHidden(questionData.get("hidden") instanceof Boolean ? (Boolean) questionData.get("hidden") : null);
        question.setAnswers(List.of());

        List<InterviewQuestion> questions = category.getQuestions() != null ? category.getQuestions() : new java.util.ArrayList<>();
        questions.add(question);
        category.setQuestions(questions);
        interviewCategoryRepository.save(category);
        return question;
    }

    public InterviewQuestion updateQuestionForCategoryId(String categoryId, String quesId, Map<String, Object> questionData) {
        InterviewCategory category = findCategoryByIdOrUniqueId(categoryId);
        if (category == null) {
            throw new IllegalArgumentException("Category not found");
        }
        List<InterviewQuestion> questions = category.getQuestions();
        if (questions == null || questions.isEmpty()) {
            throw new IllegalArgumentException("Question not found");
        }
        InterviewQuestion question = questions.stream()
            .filter(q -> quesId.equals(q.getUniqueId()) || quesId.equals(String.valueOf(q.getQuesId())))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));

        if (questionData.containsKey("ques")) question.setQues((String) questionData.get("ques"));
        if (questionData.containsKey("title")) question.setTitle((String) questionData.get("title"));
        if (questionData.containsKey("rating") && questionData.get("rating") instanceof Number) {
            question.setRating(((Number) questionData.get("rating")).intValue());
        }
        if (questionData.containsKey("hidden") && questionData.get("hidden") instanceof Boolean) {
            question.setHidden((Boolean) questionData.get("hidden"));
        }
        interviewCategoryRepository.save(category);
        return question;
    }

    public InterviewQuestion getQuestionByCategoryIdAndQuesId(String categoryId, String quesId) {
        InterviewCategory category = findCategoryByIdOrUniqueId(categoryId);
        if (category == null) {
            throw new IllegalArgumentException("Category not found");
        }
        List<InterviewQuestion> questions = category.getQuestions();
        if (questions == null) {
            throw new IllegalArgumentException("Question not found");
        }
        return questions.stream()
            .filter(q -> quesId.equals(q.getUniqueId()) || quesId.equals(String.valueOf(q.getQuesId())))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
    }

    private InterviewCategory findCategoryByIdOrUniqueId(String categoryId) {
        InterviewCategory byUniqueId = interviewCategoryRepository.findByUniqueId(categoryId).orElse(null);
        if (byUniqueId != null) return byUniqueId;
        try {
            Integer numeric = Integer.valueOf(categoryId);
            return interviewCategoryRepository.findByCategoryId(numeric).orElse(null);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private List<Map<String, Object>> getAllAncestors(String parentId) {
        java.util.LinkedList<Map<String, Object>> ancestors = new java.util.LinkedList<>();
        String current = parentId;
        while (current != null && !current.isBlank()) {
            InterviewCategory parent = interviewCategoryRepository.findByUniqueId(current).orElse(null);
            if (parent == null) break;
            Map<String, Object> item = new HashMap<>();
            item.put("uniqueId", parent.getUniqueId());
            item.put("name", parent.getCategoryName() != null ? parent.getCategoryName() : parent.getTitle());
            item.put("parentId", parent.getParentId() == null ? "" : parent.getParentId());
            ancestors.addFirst(item);
            current = parent.getParentId();
        }
        return ancestors;
    }
}

