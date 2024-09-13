const DUMMY_NEWS_RAW = [
  {
    id: "n1",
    slug: "will-ai-replace-humans",
    title: "Will AI Replace Humans?",
    image: "ai-robot.jpg",
    date: "2021-07-01",
    content:
      "Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.",
  },
  {
    id: "n2",
    slug: "beaver-plague",
    title: "A Plague of Beavers",
    image: "beaver.jpg",
    date: "2022-05-01",
    content:
      "Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?",
  },
  {
    id: "n3",
    slug: "couple-cooking",
    title: "Spend more time together!",
    image: "couple-cooking.jpg",
    date: "2024-03-01",
    content:
      "Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!",
  },
  {
    id: "n4",
    slug: "hiking",
    title: "Hiking is the best!",
    image: "hiking.jpg",
    date: "2024-01-01",
    content:
      "Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!",
  },
  {
    id: "n5",
    slug: "landscape",
    title: "The beauty of landscape",
    image: "landscape.jpg",
    date: "2022-07-01",
    content:
      "Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!",
  },
  {
    id: "nn6",
    slug: "india-gains-independence",
    title: "India Gains Independence, Ends British Rule After 200 Years",
    image: "15-Aug-1947.png", // Placeholder image URL
    date: "15-Aug-1947",
    content: `
        India has awoken to a new era of freedom as the country officially gained independence from British rule today. After nearly two centuries of colonial domination, the Indian subcontinent has taken its first steps as a free nation.
        
        At the stroke of midnight, the first Prime Minister of India, Jawaharlal Nehru, delivered his historic 'Tryst with Destiny' speech, marking the end of British rule and the birth of an independent India. In his address, Nehru said, 'At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.'
        
        Large crowds gathered in the capital, New Delhi, as the Indian national flag was raised for the first time at the Red Fort. People from all walks of life, including freedom fighters, politicians, and citizens, celebrated the momentous occasion. Joyous processions and celebrations erupted across the country, from the streets of Bombay to the shores of Madras.
        
        However, the road to independence was not without its challenges. The partition of India and Pakistan has created waves of uncertainty and displacement for millions. As independence was announced, so too was the creation of the new nation of Pakistan, leading to the largest mass migration in history, as Hindus and Muslims crossed the new borders.
        
        Despite the complexities and uncertainties, today's events symbolize hope, unity, and the promise of a brighter future for the Indian people. India's leaders, including Mahatma Gandhi, who played a crucial role in the non-violent struggle for freedom, have called for peace and unity during this historic transition.
        
        As the world watches, India begins its journey as a sovereign nation, with challenges ahead, but also with the resolve and spirit of a people who have fought long and hard for their freedom.
      `,
  },
  {
    id: "nn2",
    slug: "partition-migration-1947",
    title: "Mass Migration Due to Partition",
    image: "migration-sep-1947.jpg",
    date: "15-Sep-1947",
    content:
      "The partition of India and Pakistan caused mass migration. Millions crossed borders amidst violence and unrest.",
  },
  {
    id: "nn3",
    slug: "gandhi-fast-oct-1947",
    title: "Mahatma Gandhi Begins Fast for Peace",
    image: "gandhi-fast-oct-1947.jpg",
    date: "15-Oct-1947",
    content:
      "Mahatma Gandhi began a fast to promote peace and communal harmony after the violence following partition.",
  },
  {
    id: "nn4",
    slug: "india-constitution-nov-1947",
    title: "Drafting of Indian Constitution Begins",
    image: "constitution-nov-1947.jpg",
    date: "15-Nov-1947",
    content:
      "The drafting of the Indian Constitution commenced. Dr. B. R. Ambedkar was appointed Chairman of the Drafting Committee.",
  },
  {
    id: "nn5",
    slug: "kashmir-conflict-dec-1947",
    title: "Kashmir Conflict Escalates",
    image: "kashmir-conflict-dec-1947.jpg",
    date: "15-Dec-1947",
    content:
      "Tensions between India and Pakistan over Kashmir intensified. Both countries deployed troops to the region.",
  },
  {
    id: "nn6",
    slug: "republic-day-jan-1948",
    title: "India Celebrates First Republic Day",
    image: "republic-day-jan-1948.jpg",
    date: "26-Jan-1948",
    content:
      "India celebrated its first Republic Day after independence. The drafting of the Constitution was ongoing.",
  },
  {
    id: "nn7",
    slug: "gandhi-assassination-feb-1948",
    title: "Mahatma Gandhi Assassinated",
    image: "gandhi-assassination-feb-1948.jpg",
    date: "30-Jan-1948",
    content:
      "Mahatma Gandhi was assassinated by Nathuram Godse in New Delhi. His death shocked the nation and the world.",
  },
  {
    id: "nn8",
    slug: "indus-water-mar-1948",
    title: "Indus Water Agreement Signed",
    image: "indus-water-mar-1948.jpg",
    date: "15-Mar-1948",
    content:
      "India and Pakistan signed an agreement to resolve water-sharing disputes related to the Indus River.",
  },
  {
    id: "nn9",
    slug: "hyderabad-annexation-apr-1948",
    title: "Hyderabad Annexed into Indian Union",
    image: "hyderabad-annexation-apr-1948.jpg",
    date: "15-Apr-1948",
    content:
      "The princely state of Hyderabad was annexed into India. The operation ended the Nizam's rule.",
  },
  {
    id: "nn10",
    slug: "first-indian-elections-may-1948",
    title: "India Prepares for First General Elections",
    image: "elections-may-1948.jpg",
    date: "15-May-1948",
    content:
      "Preparations for India’s first general elections began. Political parties started campaigning across the country.",
  },
  {
    id: "nn11",
    slug: "burma-independence-jun-1948",
    title: "Burma Gains Independence from Britain",
    image: "burma-independence-jun-1948.jpg",
    date: "15-Jun-1948",
    content:
      "Burma, now Myanmar, gained independence from British rule. The country celebrated with festivities and hope for the future.",
  },
  {
    id: "nn12",
    slug: "nehru-us-relations-jul-1948",
    title: "Nehru Strengthens US-India Relations",
    image: "nehru-us-relations-jul-1948.jpg",
    date: "15-Jul-1948",
    content:
      "Prime Minister Nehru met US officials to strengthen ties. Discussions focused on trade and diplomatic relations.",
  },
  {
    id: "nn13",
    slug: "india-joins-un-aug-1948",
    title: "India Joins United Nations",
    image: "india-un-aug-1948.jpg",
    date: "15-Aug-1948",
    content:
      "India marked its first year of independence by officially joining the United Nations. The event was hailed worldwide.",
  },
  {
    id: "nn14",
    slug: "kashmir-plebiscite-sep-1948",
    title: "Calls for Kashmir Plebiscite",
    image: "kashmir-plebiscite-sep-1948.jpg",
    date: "15-Sep-1948",
    content:
      "Amid continued tensions, the UN called for a plebiscite in Kashmir. India and Pakistan both claimed the region.",
  },
];

const imArr = ["15-Aug-1947.png", "15-Aug-1947-2.png", "15-Aug-1947-3.png", "15-Aug-1947-4.png"];
let swap = 0;
export const DUMMY_NEWS = DUMMY_NEWS_RAW.map((n) => {
  const ret = { ...n };
  if (n.id.startsWith("nn")) {
    ret.image = imArr[swap];
    swap = ++swap % 4;
  }
  return ret;
});
