const express = require("express");

const { FileRelatedOperations } = require("../../../../common/services/FileOperations/v3");

// TBD, put github repo base path here, so that we can refrain from redundancy
const GIT_HUB_REPO = "";

const contentMappingsV1 = [
  /**
   * Date: 17-Feb-2025
   *
   */
  {
    slug: "actionables--my-bugs-and-new-requirements-md",
    fileLocation:
      "D:/GIT/react-projects/Interview-questions-metadata/public/Actionables/My bugs-and-new requirements.md",
  },

  /**
   * Date: 15-Feb-2025
   *
   */
  {
    slug: "15Feb2025.know-your-positivity--about-this-module--index-v1-md",
    fileLocation:
      "C:/cust_inst/apache-tomcat-9.0.86/webapps/my-pages/src/other-sample-application/KnowYourPositivity/AboutThisModule/about.v1.md",
  },

  /**
   * Date: 16-Feb-2025
   *
   */
  {
    slug: "16Feb2025.know-your-positivity--todays-target---live-the-initial-website-on-github-pages-by-eod-today-itr0",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-16-live-a-static-website/itr0.md",
  },
  {
    slug: "16Feb2025.know-your-positivity--todays-target---live-the-initial-website-on-github-pages-by-eod-today-itr1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-16-live-a-static-website/itr1.md",
  },
  {
    slug: "16Feb2025.know-your-positivity--todays-target---live-the-initial-website-on-github-pages-by-eod-today-itr2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-16-live-a-static-website/itr2.md",
  },
  {
    slug: "16Feb2025.know-your-positivity--todays-target---live-the-initial-website-on-github-pages-by-eod-today-itr3",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-16-live-a-static-website/itr3.md",
  },
  {
    slug: "16Feb2025.know-your-positivity--todays-target---live-the-initial-website-on-github-pages-by-eod-today-itr4",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-16-live-a-static-website/itr4.md",
  },
  {
    slug: "17Feb2025.know-your-positivity--todays-target---live-the-initial-website-on-github-pages-by-eod-today--itr--4-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-16-live-a-static-website/itr4.exz2.md",
  },

  /**
   * Date: 17-Feb-2025
   *
   */

  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr1.1",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--1-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr1.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr1.2",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--1-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr1.exz2.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr1.3",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--1-3",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr1.exz3.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr2.1",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--2-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr2.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr2.2",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--2-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr2.exz2.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr3.1",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--3-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr3.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Todays Target   Review , Practice And Retrospect  itr3.2",
    slug: "17Feb2025.know-your-positivity---todays-target---review-practice-and-retrospect--itr--3-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/2025-02-17-whats-next-after-initial-web-launch/itr3.exz2.md",
  },

  /**
   * Date: 18-Feb-2025
   *
   */
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr1.1",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--1-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr1.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr1.2",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--1-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr1.exz2.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr1.3",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--1-3",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr1.exz3.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr2.1",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--2-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr2.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr2.2",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--2-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr2.exz2.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr3.1",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--3-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr3.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr3.2",
    slug: "18Feb2025.know-your-positivity---review-practice-and-retrospect---part-2---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--3-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-18-itr3.exz2.md",
  },

  /**
   * Date: 19-Feb-2025
   *
   */
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr1.1",
    slug: "19Feb2025.know-your-positivity---review-practice-and-retrospect---part-3---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--1-1",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-19-itr1.exz1.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr1.2",
    slug: "19Feb2025.know-your-positivity---review-practice-and-retrospect---part-3---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--1-2",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-19-itr1.exz2.md",
  },
  {
    // Added name field, this is useful for swiftly generate slugs
    name: "Know Your Positivity   Review Practice And Retrospect   part 2   Simplify processing and retrieval   of `meaningful informations` from a chat backup file.  itr1.3",
    slug: "19Feb2025.know-your-positivity---review-practice-and-retrospect---part-3---simplify-processing-and-retrieval---of-meaningful-informations-from-a-chat-backup-file--itr--1-3",
    fileLocation: "D:/GIT/memory-maps/KnowYourPositivity/process-raw-cgpt-data-efficiently/2025-02-19-itr1.exz3.md",
  },
];

const router = express.Router();

/**
 *
 * Internal routes, just to help for development process in v2 apis.
 *
 * Later these apis will only be accesible to admin role user, post we implement RBAC
 *
 * */
router.get("/smart-content/itr1/contentMappings", (req, res) => res.json([...contentMappingsV1]));

// Route to fetch content by slug
router.get("/smart-content/itr1/:slug", async (req, res) => {
  const { slug } = req.params;
  const entry = contentMappingsV1.find((item) => item.slug === slug);

  if (!entry || !entry.fileLocation) {
    return res.status(404).json({ error: "Content not found" });
  }

  const filePath = entry.fileLocation;

  if (!FileRelatedOperations.fileExists(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    const content = await FileRelatedOperations.readFileContent(filePath);
    res.json({
      content,
      outputType: FileRelatedOperations.getFileExtension(filePath),
    });
  } catch (error) {
    res.status(500).json({ error: "Error reading file" });
  }
});

module.exports = router;
