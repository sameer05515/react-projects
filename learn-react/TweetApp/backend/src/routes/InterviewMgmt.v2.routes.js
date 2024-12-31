const express = require("express");
const router = express.Router();

const interviewMgmtV2Service = require("./InterviewMgmt.v2.service");

/**===================== Category =====================================*/
// Create a new category
router.post("/categories", async (req, res) => {
  try {
    const category = await interviewMgmtV2Service.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await interviewMgmtV2Service.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Category for given uniqueId
router.get("/categories/:uniqueId", async (req, res) => {
  try {
    const responseDTO = await interviewMgmtV2Service.getCategoryByUniqueId(
      req.params.uniqueId
    );
    res.json(responseDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Category by uniqueId
router.put("/categories/:uniqueId", async (req, res) => {
  try {
    const updatedCategory =
      await interviewMgmtV2Service.updateCategoryByUniqueId(
        req.params.uniqueId,
        req.body
      );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**===================== Question =====================================*/
// Create a new Question
router.post("/questions", async (req, res) => {
  try {
    const question = await interviewMgmtV2Service.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await interviewMgmtV2Service.getAllQuestions();
    res.status(201).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Question for given uniqueId
router.get("/questions/:uniqueId", async (req, res) => {
  try {
    const question = await interviewMgmtV2Service.getQuestionByUniqueId(
      req.params.uniqueId
    );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Question for given categoryId and quesId
router.get("/categories/:categoryId/questions/:quesId", async (req, res) => {
  try {
    const question =
      await interviewMgmtV2Service.getQuestionByCategoryIdAndQuesId(
        req.params.categoryId,
        req.params.quesId
      );
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/questions/:uniqueId", async (req, res) => {
  try {
    const updatedQuestion =
      await interviewMgmtV2Service.updateQuestionByUniqueId(
        req.params.uniqueId,
        req.body
      );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/questions/:uniqueId", async (req, res) => {
  try {
    await interviewMgmtV2Service.updateLastRevisedOfQuestionByUniqueId(
      req.params.uniqueId
    );
    res.json('success');
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
});

// Search topics by searchString
router.post("/questions/search", async (req, res) => {
  const { searchString, searchOptions } = req.body;

  if (!searchString) {
    return res.status(400).json({ error: "searchString is required" });
  }

  try {
    const topics = await interviewMgmtV2Service.searchTopics(
      searchString,
      searchOptions
    );
    res.json(topics);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for topics" });
  }
});

// Get all Questions
// router.get('/questions', async (req, res) => {
//   try {
//     const questions = await interviewMgmtV2Service.getAllQuestions();
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Update a Question by uniqueId
// router.put('/questions/:uniqueId', async (req, res) => {
//   try {
//     // console.log(`req.body : ${JSON.stringify(req.body)}`)
//     const updatedQuestion = await interviewMgmtV2Service.updateQuestionByUniqueId(req.params.uniqueId, req.body);

//     if (!updatedQuestion) {
//       return res.status(404).json({ message: 'Question not found' });
//     }
//     res.json(updatedQuestion);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

/**===================== Answer =====================================*/

// Create a new Answer
router.post("/answers", async (req, res) => {
  try {
    const answer = await interviewMgmtV2Service.createAnswer(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ requestedanswer: req.body, error: error.message });
  }
});

// update an answer by uniqueId
router.put("/answers/:uniqueId", async (req, res) => {
  try {
    const updatedAnswer = await interviewMgmtV2Service.updateAnswerByUniqueId(
      req.params.uniqueId,
      req.body
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.json(updatedAnswer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all answers
// router.get('/answers', async (req, res) => {
//   try {
//     const answers = await interviewMgmtV2Service.getAllAnswers();
//     res.json(answers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Update a Answer by uniqueId
// router.put('/answers/:uniqueId', async (req, res) => {
//   try {
//     // console.log(`req.body : ${JSON.stringify(req.body)}`)
//     const updatedAnswer = await interviewMgmtV2Service.updateAnswerByUniqueId(req.params.uniqueId, req.body);

//     if (!updatedAnswer) {
//       return res.status(404).json({ message: 'Answer not found' });
//     }
//     res.json(updatedAnswer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
