package com.tweetapp.service;

import com.tweetapp.model.InterviewAnswer;
import com.tweetapp.model.InterviewCategory;
import com.tweetapp.model.InterviewQuestion;
import com.tweetapp.repository.InterviewAnswerRepository;
import com.tweetapp.repository.InterviewCategoryRepository;
import com.tweetapp.repository.InterviewQuestionRepository;
import com.tweetapp.util.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InterviewMgmtV2Service {

    @Autowired
    private InterviewCategoryRepository categoryRepository;

    @Autowired
    private InterviewQuestionRepository questionRepository;

    @Autowired
    private InterviewAnswerRepository answerRepository;

    public InterviewCategory createCategory(Map<String, Object> data) {
        InterviewCategory c = new InterviewCategory();
        c.setUniqueId(UuidUtil.generateUuid());
        c.setName((String) data.get("name"));
        c.setHeading((String) data.get("heading"));
        c.setSmartContent((com.tweetapp.model.SmartContent) data.get("smartContent"));
        c.setRating(data.get("rating") instanceof Number ? ((Number) data.get("rating")).intValue() : null);
        c.setParentId(data.get("parentId") != null ? String.valueOf(data.get("parentId")) : "");
        c.setTags((List<String>) data.getOrDefault("tags", List.of()));
        c.setIsPrivate(data.get("isPrivate") instanceof Boolean ? (Boolean) data.get("isPrivate") : false);
        c.setCreatedDate(LocalDateTime.now());
        c.setUpdatedDate(LocalDateTime.now());
        return categoryRepository.save(c);
    }

    public List<Map<String, Object>> getAllCategories() {
        return getCategoriesTree(null);
    }

    public Map<String, Object> getCategoryByUniqueId(String uniqueId) {
        InterviewCategory category = categoryRepository.findByUniqueId(uniqueId).orElse(null);
        if (category == null) throw new IllegalArgumentException("Category not found");
        List<InterviewCategory> children = categoryRepository.findByParentId(uniqueId)
            .stream().filter(c -> !Boolean.TRUE.equals(c.getIsPrivate())).collect(Collectors.toList());
        List<InterviewQuestion> questions = questionRepository.findByLinkedCategoryId(uniqueId);
        List<Map<String, Object>> ancestors = getAllAncestors(category.getParentId());

        Map<String, Object> dto = toCategoryDto(category);
        dto.put("children", children.stream().map(c -> Map.of("title", c.getTitle(), "uniqueId", c.getUniqueId())).collect(Collectors.toList()));
        dto.put("ancestors", ancestors);
        dto.put("questions", questions);
        return dto;
    }

    public InterviewCategory updateCategoryByUniqueId(String uniqueId, Map<String, Object> data) {
        InterviewCategory category = categoryRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (data.containsKey("name")) category.setName((String) data.get("name"));
        if (data.containsKey("heading")) category.setHeading((String) data.get("heading"));
        if (data.containsKey("smartContent")) category.setSmartContent((com.tweetapp.model.SmartContent) data.get("smartContent"));
        if (data.containsKey("parentId")) category.setParentId((String) data.get("parentId"));
        if (data.containsKey("tags")) category.setTags((List<String>) data.get("tags"));
        if (data.containsKey("rating") && data.get("rating") instanceof Number) {
            category.setRating(((Number) data.get("rating")).intValue());
        }
        category.setUpdatedDate(LocalDateTime.now());
        return categoryRepository.save(category);
    }

    public InterviewQuestion createQuestion(Map<String, Object> data) {
        InterviewQuestion q = new InterviewQuestion();
        q.setUniqueId(UuidUtil.generateUuid());
        q.setName((String) data.get("name"));
        q.setHeading((String) data.get("heading"));
        q.setSmartContent((com.tweetapp.model.SmartContent) data.get("smartContent"));
        q.setRating(data.get("rating") instanceof Number ? ((Number) data.get("rating")).intValue() : null);
        q.setParentId(data.get("parentId") != null ? String.valueOf(data.get("parentId")) : "");
        q.setLinkedCategoryId(data.get("linkedCategoryId") != null ? String.valueOf(data.get("linkedCategoryId")) : "");
        q.setOrder(data.get("order") instanceof Number ? ((Number) data.get("order")).intValue() : 0);
        q.setTags((List<String>) data.getOrDefault("tags", List.of()));
        q.setCreatedDate(LocalDateTime.now());
        q.setUpdatedDate(LocalDateTime.now());
        return questionRepository.save(q);
    }

    public List<Map<String, Object>> getAllQuestions() {
        return getQuestionsTree(null);
    }

    public List<Map<String, Object>> getAllQuestionsFlat() {
        List<Map<String, Object>> tree = getQuestionsTree(null);
        Map<String, List<Map<String, Object>>> answersByQuestionId = getAnswersGroupedByQuestionId();
        return flattenQuestionsForExport(tree, new ArrayList<>(), answersByQuestionId);
    }

    public Map<String, Object> getQuestionByUniqueId(String uniqueId) {
        InterviewQuestion question = questionRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        List<InterviewAnswer> answers = answerRepository.findByLinkedQuestionsId(question.getUniqueId());
        List<Map<String, Object>> children = getQuestionsTree(question.getUniqueId());
        List<Map<String, Object>> ancestors = getAllAncestorQuestions(question.getParentId());
        Map<String, Object> dto = toQuestionDto(question);
        dto.put("answers", answers);
        dto.put("children", children);
        dto.put("ancestors", ancestors);
        return dto;
    }

    public Map<String, Object> getQuestionByCategoryIdAndQuesId(String linkedCategoryId, String uniqueId) {
        InterviewQuestion question = questionRepository.findByUniqueId(uniqueId)
            .filter(q -> linkedCategoryId.equals(q.getLinkedCategoryId()))
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        List<InterviewAnswer> answers = answerRepository.findByLinkedQuestionsId(question.getUniqueId());
        Map<String, Object> dto = toQuestionDto(question);
        dto.put("answers", answers);
        return dto;
    }

    public InterviewQuestion updateQuestionByUniqueId(String uniqueId, Map<String, Object> data) {
        InterviewQuestion q = questionRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        if (data.containsKey("name")) q.setName((String) data.get("name"));
        if (data.containsKey("heading")) q.setHeading((String) data.get("heading"));
        if (data.containsKey("smartContent")) q.setSmartContent((com.tweetapp.model.SmartContent) data.get("smartContent"));
        if (data.containsKey("rating") && data.get("rating") instanceof Number) q.setRating(((Number) data.get("rating")).intValue());
        if (data.containsKey("linkedCategoryId")) q.setLinkedCategoryId((String) data.get("linkedCategoryId"));
        if (data.containsKey("parentId")) q.setParentId((String) data.get("parentId"));
        if (data.containsKey("tags")) q.setTags((List<String>) data.get("tags"));
        if (data.containsKey("order") && data.get("order") instanceof Number) q.setOrder(((Number) data.get("order")).intValue());
        q.setUpdatedDate(LocalDateTime.now());
        return questionRepository.save(q);
    }

    public InterviewQuestion updateLastRevisedOfQuestionByUniqueId(String uniqueId) {
        InterviewQuestion q = questionRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new IllegalArgumentException("Question not found for uniqueId: " + uniqueId));
        q.setLastRevisedOn(LocalDateTime.now());
        return questionRepository.save(q);
    }

    public List<InterviewQuestion> searchTopics(String searchString, Map<String, Object> searchOptions) {
        String q = searchString.toLowerCase();
        return questionRepository.findAll().stream()
            .filter(item -> (item.getName() != null && item.getName().toLowerCase().contains(q))
                || (item.getHeading() != null && item.getHeading().toLowerCase().contains(q)))
            .collect(Collectors.toList());
    }

    public InterviewAnswer createAnswer(Map<String, Object> data) {
        InterviewAnswer a = new InterviewAnswer();
        a.setUniqueId(UuidUtil.generateUuid());
        a.setName((String) data.get("name"));
        a.setHeading((String) data.get("heading"));
        a.setSmartContent((com.tweetapp.model.SmartContent) data.get("smartContent"));
        a.setRating(data.get("rating") instanceof Number ? ((Number) data.get("rating")).intValue() : null);
        a.setLinkedQuestionsId(data.get("linkedQuestionsId") != null ? String.valueOf(data.get("linkedQuestionsId")) : "");
        a.setOrder(data.get("order") instanceof Number ? ((Number) data.get("order")).intValue() : 0);
        a.setCreatedDate(LocalDateTime.now());
        a.setUpdatedDate(LocalDateTime.now());
        return answerRepository.save(a);
    }

    public InterviewAnswer updateAnswerByUniqueId(String uniqueId, Map<String, Object> data) {
        InterviewAnswer a = answerRepository.findByUniqueId(uniqueId)
            .orElseThrow(() -> new IllegalArgumentException("Answer not found"));
        if (data.containsKey("name")) a.setName((String) data.get("name"));
        if (data.containsKey("heading")) a.setHeading((String) data.get("heading"));
        if (data.containsKey("smartContent")) a.setSmartContent((com.tweetapp.model.SmartContent) data.get("smartContent"));
        if (data.containsKey("rating") && data.get("rating") instanceof Number) a.setRating(((Number) data.get("rating")).intValue());
        if (data.containsKey("linkedQuestionsId")) a.setLinkedQuestionsId((String) data.get("linkedQuestionsId"));
        if (data.containsKey("order") && data.get("order") instanceof Number) a.setOrder(((Number) data.get("order")).intValue());
        if (data.containsKey("tags")) a.setTags((List<String>) data.get("tags"));
        a.setUpdatedDate(LocalDateTime.now());
        return answerRepository.save(a);
    }

    private List<Map<String, Object>> getCategoriesTree(String parentId) {
        List<InterviewCategory> categories = categoryRepository.findAll().stream()
            .filter(c -> !Boolean.TRUE.equals(c.getIsPrivate()))
            .filter(c -> {
                if (parentId == null) return c.getParentId() == null || c.getParentId().isBlank();
                return parentId.equals(c.getParentId());
            }).collect(Collectors.toList());

        List<Map<String, Object>> nodes = new ArrayList<>();
        for (InterviewCategory category : categories) {
            Map<String, Object> node = toCategoryDto(category);
            node.put("children", getCategoriesTree(category.getUniqueId()));
            node.put("ancestors", getAllAncestors(category.getParentId()));
            node.put("questions", questionRepository.findByLinkedCategoryId(category.getUniqueId()));
            nodes.add(node);
        }
        return nodes;
    }

    private List<Map<String, Object>> getQuestionsTree(String parentId) {
        List<InterviewQuestion> questions = questionRepository.findAll().stream()
            .filter(q -> {
                if (parentId == null) return q.getParentId() == null || q.getParentId().isBlank();
                return parentId.equals(q.getParentId());
            }).collect(Collectors.toList());
        List<Map<String, Object>> nodes = new ArrayList<>();
        for (InterviewQuestion question : questions) {
            Map<String, Object> node = toQuestionDto(question);
            node.put("children", getQuestionsTree(question.getUniqueId()));
            node.put("ancestors", getAllAncestorQuestions(question.getParentId()));
            nodes.add(node);
        }
        return nodes;
    }

    private List<Map<String, Object>> getAllAncestors(String parentId) {
        List<Map<String, Object>> ancestors = new ArrayList<>();
        String current = parentId;
        while (current != null && !current.isBlank()) {
            Optional<InterviewCategory> parent = categoryRepository.findByUniqueId(current);
            if (parent.isEmpty()) break;
            InterviewCategory cat = parent.get();
            ancestors.add(0, Map.of("name", cat.getName(), "uniqueId", cat.getUniqueId(), "parentId", cat.getParentId()));
            current = cat.getParentId();
        }
        return ancestors;
    }

    private List<Map<String, Object>> getAllAncestorQuestions(String parentId) {
        List<Map<String, Object>> ancestors = new ArrayList<>();
        String current = parentId;
        while (current != null && !current.isBlank()) {
            Optional<InterviewQuestion> parent = questionRepository.findByUniqueId(current);
            if (parent.isEmpty()) break;
            InterviewQuestion q = parent.get();
            ancestors.add(0, Map.of("name", q.getName(), "uniqueId", q.getUniqueId(), "parentId", q.getParentId()));
            current = q.getParentId();
        }
        return ancestors;
    }

    private Map<String, Object> toCategoryDto(InterviewCategory c) {
        Map<String, Object> m = new HashMap<>();
        m.put("uniqueId", c.getUniqueId());
        m.put("name", c.getName());
        m.put("heading", c.getHeading());
        m.put("parentId", c.getParentId());
        m.put("smartContent", c.getSmartContent());
        m.put("rating", c.getRating());
        m.put("tags", c.getTags());
        return m;
    }

    private Map<String, Object> toQuestionDto(InterviewQuestion q) {
        Map<String, Object> m = new HashMap<>();
        m.put("uniqueId", q.getUniqueId());
        m.put("name", q.getName());
        m.put("heading", q.getHeading());
        m.put("parentId", q.getParentId());
        m.put("linkedCategoryId", q.getLinkedCategoryId());
        m.put("rating", q.getRating());
        m.put("smartContent", q.getSmartContent());
        m.put("order", q.getOrder());
        m.put("tags", q.getTags());
        return m;
    }

    private Map<String, List<Map<String, Object>>> getAnswersGroupedByQuestionId() {
        Map<String, List<Map<String, Object>>> map = new HashMap<>();
        for (InterviewAnswer a : answerRepository.findAll()) {
            String qid = a.getLinkedQuestionsId() == null ? "" : a.getLinkedQuestionsId();
            map.computeIfAbsent(qid, k -> new ArrayList<>()).add(Map.of(
                "uniqueId", a.getUniqueId(),
                "name", a.getName() == null ? "" : a.getName(),
                "heading", a.getHeading() == null ? "" : a.getHeading(),
                "linkedQuestionsId", qid,
                "smartContent", a.getSmartContent(),
                "order", a.getOrder() == null ? 0 : a.getOrder(),
                "rating", a.getRating()
            ));
        }
        return map;
    }

    private List<Map<String, Object>> flattenQuestionsForExport(List<Map<String, Object>> tree,
                                                                List<Map<String, Object>> ancestors,
                                                                Map<String, List<Map<String, Object>>> answersByQuestionId) {
        if (tree == null || tree.isEmpty()) return List.of();
        List<Map<String, Object>> list = new ArrayList<>();
        for (Map<String, Object> node : tree) {
            String uniqueId = (String) node.get("uniqueId");
            List<Map<String, Object>> itemAncestors = ancestors.stream()
                .map(a -> Map.of("uniqueId", a.get("uniqueId"), "name", a.get("name")))
                .collect(Collectors.toList());
            Map<String, Object> item = new HashMap<>();
            item.put("uniqueId", uniqueId);
            item.put("name", node.get("name"));
            item.put("heading", node.getOrDefault("heading", ""));
            item.put("parentId", node.get("parentId"));
            item.put("linkedCategoryId", node.getOrDefault("linkedCategoryId", ""));
            item.put("tags", node.getOrDefault("tags", List.of()));
            item.put("rating", node.get("rating"));
            item.put("smartContent", node.get("smartContent"));
            item.put("order", node.getOrDefault("order", 0));
            item.put("ancestors", itemAncestors);
            item.put("answers", answersByQuestionId.getOrDefault(uniqueId, List.of()));
            list.add(item);

            List<Map<String, Object>> children = (List<Map<String, Object>>) node.get("children");
            if (children != null && !children.isEmpty()) {
                List<Map<String, Object>> nextAncestors = new ArrayList<>(ancestors);
                nextAncestors.add(Map.of("uniqueId", uniqueId, "name", node.get("name")));
                list.addAll(flattenQuestionsForExport(children, nextAncestors, answersByQuestionId));
            }
        }
        return list;
    }
}
