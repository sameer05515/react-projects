type SemiStructuredWordProps = {
  word: string;
  type: string;
  meanings: string[];
  examples: string[];
};

export type Word = {
  uniqueId: string;
  word: string;
  type: string;
  meanings: string[];
  examples: string[];
};

const words = [
  {
    word: "abase",
    type: "verb",
    meanings: ["to humiliate", "degrade"],
    examples: [
      "After being overthrown and abased, the deposed leader offered to bow down to his conqueror.",
    ],
  },
  {
    word: "abate",
    type: "verb",
    meanings: ["to reduce", "lessen"],
    examples: ["The rain poured down for a while, then abated."],
  },
  {
    word: "abdicate",
    type: "verb",
    meanings: ["to give up a position", "usually one of leadership"],
    examples: [
      "When he realized that the revolutionaries would surely win, the king abdicated his throne.",
    ],
  },
  {
    word: "abduct",
    type: "verb",
    meanings: ["to kidnap", "take by force"],
    examples: [
      "The evildoers abducted the fairy princess from her happy home.",
    ],
  },
  {
    word: "aberration",
    type: "noun",
    meanings: ["something that differs from the norm"],
    examples: [
      "In 1918, the Boston Red Sox won the World Series, but the success turned out to be an aberration, and the Red Sox have not won a World Series since.",
    ],
  },
  {
    word: "abet",
    type: "verb",
    meanings: ["to aid", "help", "encourage"],
    examples: [
      "The spy succeeded only because he had a friend on the inside to abet him.",
    ],
  },
  {
    word: "abhor",
    type: "verb",
    meanings: ["to hate", "detest"],
    examples: [
      "Because he always wound up kicking himself in the head when he tried to play soccer, Oswald began to abhor the sport.",
    ],
  },
  {
    word: "abide",
    type: "verb",
    meanings: ["to put up with"],
    examples: [
      "Though he did not agree with the decision, Chuck decided to abide by it.",
    ],
  },
  {
    word: "abide",
    type: "verb",
    meanings: ["to remain"],
    examples: [
      "Despite the beating they've taken from the weather throughout the millennia, the mountains abide.",
    ],
  },
  {
    word: "abject",
    type: "adjective",
    meanings: ["wretched", "pitiful"],
    examples: [
      "After losing all her money, falling into a puddle, and breaking her ankle, Eloise was abject.",
    ],
  },
  {
    word: "abjure",
    type: "verb",
    meanings: ["to reject", "renounce"],
    examples: [
      "To prove his honesty, the President abjured the evil policies of his wicked predecessor.",
    ],
  },
  {
    word: "abnegation",
    type: "noun",
    meanings: ["denial of comfort to oneself"],
    examples: [
      "The holy man slept on the floor, took only cold showers, and generally followed other practices of abnegation.",
    ],
  },
  {
    word: "abort",
    type: "verb",
    meanings: ["to give up on a half-finished project or effort"],
    examples: [
      "After they ran out of food, the men, attempting to jump rope around the world, had to abort and go home.",
    ],
  },
  {
    word: "abridge",
    type: "verb",
    meanings: ["to cut down", "shorten"],
    examples: [
      "The publisher thought the dictionary was too long and abridged it.",
    ],
  },
  {
    word: "abridge",
    type: "adjective",
    meanings: ["shortened"],
    examples: [
      "Moby-Dick is such a long book that even the abridged version is longer than most normal books.",
    ],
  },
  {
    word: "abrogate",
    type: "verb",
    meanings: ["to abolish", "usually by authority"],
    examples: [
      "The Bill of Rights assures that the government cannot abrogate our right to a free press.",
    ],
  },
  {
    word: "abscond",
    type: "verb",
    meanings: ["to sneak away and hide"],
    examples: [
      "In the confusion, the super-spy absconded into the night with the secret plans.",
    ],
  },
  {
    word: "absolution",
    type: "noun",
    meanings: ["freedom from blame", "guilt", "sin"],
    examples: [
      "Once all the facts were known, the jury gave Angela absolution by giving a verdict of not guilty.",
    ],
  },
  {
    word: "abstain",
    type: "verb",
    meanings: ["to freely choose not to commit an action"],
    examples: [
      "Everyone demanded that Angus put on the kilt, but he did not want to do it and abstained.",
    ],
  },
  {
    word: "abstruse",
    type: "adjective",
    meanings: ["hard to comprehend"],
    examples: [
      "Everyone else in the class understood geometry easily, but John found the subject abstruse.",
    ],
  },
  {
    word: "accede",
    type: "verb",
    meanings: ["to agree"],
    examples: [
      "When the class asked the teacher whether they could play baseball instead of learn grammar they expected him to refuse, but instead he acceded to their request.",
    ],
  },
  {
    word: "accentuate",
    type: "verb",
    meanings: ["to stress", "highlight"],
    examples: [
      "Psychologists agree that those people who are happiest accentuate the positive in life.",
    ],
  },
  {
    word: "accessible",
    type: "adjective",
    meanings: ["obtainable", "reachable"],
    examples: [
      "After studying with SparkNotes and getting a great score on the SAT, Marlena happily realized that her goal of getting into an Ivy-League college was accessible.",
    ],
  },
  {
    word: "acclaim",
    type: "noun",
    meanings: ["high praise"],
    examples: ["Greg's excellent poem won the acclaim of his friends."],
  },
  {
    word: "accolade",
    type: "noun",
    meanings: ["high praise", "special distinction"],
    examples: [
      "Everyone offered accolades to Sam after he won the Noble Prize.",
    ],
  },
  {
    word: "accommodating",
    type: "adjective",
    meanings: ["helpful", "obliging", "polite"],
    examples: [
      "Though the apartment was not big enough for three people, Arnold, Mark, and Zebulon were all friends and were accommodating to each other.",
    ],
  },
  {
    word: "accord",
    type: "noun",
    meanings: ["an agreement"],
    examples: [
      "After much negotiating, England and Iceland finally came to a mutually beneficial accord about fishing rights off the cost of Greenland.",
    ],
  },
  {
    word: "accost",
    type: "verb",
    meanings: ["to confront verbally"],
    examples: [
      "Though Antoinette was normally quite calm, when the waiter spilled soup on her for the fourth time in 15 minutes she stood up and accostedthe man.",
    ],
  },
  {
    word: "accretion",
    type: "noun",
    meanings: ["slow growth in size or amount"],
    examples: [
      "Stalactites are formed by the accretion of minerals from the roofs of caves.",
    ],
  },
  {
    word: "acerbic",
    type: "adjective",
    meanings: ["biting", "bitter in tone or taste"],
    examples: [
      "Jill became extremely acerbic and began to cruelly make fun of all her friends.",
    ],
  },
  {
    word: "acquiesce",
    type: "verb",
    meanings: ["to agree without protesting"],
    examples: [
      "Though Mr. Correlli wanted to stay outside and work in his garage, when his wife told him that he had better come in to dinner, he acquiesced to her demands.",
    ],
  },
  {
    word: "acrimony",
    type: "noun",
    meanings: ["bitterness", "discord"],
    examples: [
      "Though they vowed that no girl would ever come between them, Biff and Trevor could not keep acrimony from overwhelming their friendship after they both fell in love with the lovely Teresa.",
    ],
  },
  {
    word: "acumen",
    type: "noun",
    meanings: ["keen insight"],
    examples: [
      "Because of his mathematical acumen, Larry was able to figure out in minutes problems that took other students hours.",
    ],
  },
  {
    word: "acute",
    type: "adjective",
    meanings: ["sharp", "severe"],
    examples: [
      "Arnold could not walk because the pain in his foot was so acute.",
    ],
  },
  {
    word: "acute",
    type: "adjective",
    meanings: ["having keen insight"],
    examples: [
      'Because she was so acute, Libby instantly figured out how the magician pulled off his "magic."',
    ],
  },
  {
    word: "adamant",
    type: "adjective",
    meanings: ["impervious", "immovable", "unyielding"],
    examples: [
      "Though public pressure was intense, the President remained adamant about his proposal.",
    ],
  },
  {
    word: "adept",
    type: "adjective",
    meanings: ["extremely skilled"],
    examples: ["Tarzan was adept at jumping from tree to tree like a monkey."],
  },
  {
    word: "adhere",
    type: "noun",
    meanings: ["to stick to something"],
    examples: ["We adhered the poster to the wall with tape."],
  },
  {
    word: "adhere",
    type: "noun",
    meanings: ["to follow devoutly"],
    examples: ["He adhered to the dictates of his religion without question."],
  },
  {
    word: "admonish",
    type: "verb",
    meanings: ["to caution", "criticize", "reprove"],
    examples: [
      "Joe's mother admonished him not to ruin his appetite by eating cookies before dinner.",
    ],
  },
  {
    word: "adorn",
    type: "verb",
    meanings: ["to decorate"],
    examples: ["We adorned the tree with ornaments."],
  },
  {
    word: "adroit",
    type: "adjective",
    meanings: ["skillful", "dexterous"],
    examples: [
      "The adroit thief could pick someone's pocket without attracting notice.",
    ],
  },
  {
    word: "adulation",
    type: "noun",
    meanings: ["extreme praise"],
    examples: [
      "Though the book was pretty good, Marcy did not believe it deserved the adulation it received.",
    ],
  },
  {
    word: "adumbrate",
    type: "verb",
    meanings: ["to sketch out in a vague way"],
    examples: [
      "The coach adumbrated a game plan, but none of the players knew precisely what to do.",
    ],
  },
  {
    word: "adverse",
    type: "adjective",
    meanings: ["antagonistic", "unfavorable", "dangerous"],
    examples: [
      "Because of adverse conditions, the hikers decided to give up trying to climb the mountain.",
    ],
  },
  {
    word: "advocate",
    type: "verb",
    meanings: ["to argue in favor of something"],
    examples: [
      "Arnold advocated turning left at the stop sign, even though everyone else thought we should turn right.",
    ],
  },
  {
    word: "advocate",
    type: "noun",
    meanings: ["a person who argues in favor of something"],
    examples: [
      "In addition to wanting to turn left at every stop sign, Arnold was also a great advocate of increasing national defense spending.",
    ],
  },
  {
    word: "aerial",
    type: "adjective",
    meanings: ["somehow related to the air"],
    examples: ["We watched as the fighter planes conducted aerial maneuvers."],
  },
  {
    word: "aesthetic",
    type: "adjective",
    meanings: ["artistic", "related to the appreciation of beauty"],
    examples: [
      "We hired Susan as our interior decorator because she has such a fine aesthetic sense.",
    ],
  },
  {
    word: "affable",
    type: "adjective",
    meanings: ["friendly", "amiable"],
    examples: [
      "People like to be around George because he is so affableand good-natured.",
    ],
  },
  {
    word: "affinity",
    type: "noun",
    meanings: ["a spontaneous feeling of closeness"],
    examples: [
      "Jerry didn't know why, but he felt an incredible affinity for Kramer the first time they met.",
    ],
  },
  {
    word: "affluent",
    type: "adjective",
    meanings: ["rich", "wealthy"],
    examples: [
      "Mrs. Grebelski was affluent, owning a huge house, three cars, and an island near Maine.",
    ],
  },
  {
    word: "affront",
    type: "noun",
    meanings: ["an insult"],
    examples: [
      "Bernardo was very touchy, and took any slight as an affront to his honor.",
    ],
  },
  {
    word: "aggrandize",
    type: "verb",
    meanings: ["to increase or make greater"],
    examples: [
      "Joseph always dropped the names of the famous people his father knew as a way to aggrandize his personal stature.",
    ],
  },
  {
    word: "aggregate",
    type: "noun",
    meanings: ["a whole or total"],
    examples: [
      "The three branches of the U.S. Government form an aggregate much more powerful than its individual parts.",
    ],
  },
  {
    word: "aggregate",
    type: "verb",
    meanings: ["to gather into a mass"],
    examples: [
      "The dictator tried to aggregate as many people into his army as he possibly could.",
    ],
  },
  {
    word: "aggrieved",
    type: "adjective",
    meanings: ["distressed", "wronged", "injured"],
    examples: ["The foreman mercilessly overworked his aggrieved employees."],
  },
  {
    word: "agile",
    type: "adjective",
    meanings: ["quick", "nimble"],
    examples: ["The dogs were too slow to catch the agile rabbit."],
  },
  {
    word: "agnostic",
    type: "adjective",
    meanings: [
      "believing that the existence of God cannot be proven or disproven",
    ],
    examples: ["Joey's parents are very religious, but he is agnostic."],
  },
  {
    word: "agriculture",
    type: "noun",
    meanings: ["farming"],
    examples: [
      "It was a huge step in the progress of civilization when tribes left hunting and gathering and began to develop more sustainable methods of obtaining food, such as agriculture.",
    ],
  },
  {
    word: "aisle",
    type: "noun",
    meanings: ["a passageway between rows of seats"],
    examples: [
      "Once we got inside the stadium we walked down the aisle to our seats.",
    ],
  },
  {
    word: "alacrity",
    type: "noun",
    meanings: ["eagerness", "speed"],
    examples: [
      "For some reason, Chuck loved to help his mother whenever he could, so when his mother asked him to set the table he did so with alacrity.",
    ],
  },
  {
    word: "alias",
    type: "noun",
    meanings: ["a false name or identity"],
    examples: ["He snuck past the guards by using an alias and fake ID."],
  },
  {
    word: "allay",
    type: "verb",
    meanings: ["to soothe", "ease"],
    examples: [
      "The chairman of the Federal Reserve gave a speech to try to allay investors' fears about an economic downturn.",
    ],
  },
  {
    word: "allege",
    type: "verb",
    meanings: ["to assert", "usually without proof"],
    examples: [
      "The policeman had alleged that Marshall committed the crime, but after the investigation turned up no evidence, Marshall was set free.",
    ],
  },
  {
    word: "alleviate",
    type: "verb",
    meanings: ["to relieve", "make more bearable"],
    examples: [
      "This drug will alleviate the symptoms of the terrible disease, but only for a while.",
    ],
  },
  {
    word: "allocate",
    type: "verb",
    meanings: ["to distribute", "set aside"],
    examples: [
      "The Mayor allocated 30 percent of the funds for improving the town's schools.",
    ],
  },
  {
    word: "aloof",
    type: "adjective",
    meanings: ["reserved", "distant"],
    examples: [
      "The scientist could sometimes seem aloof, as if he didn't care about his friends or family, but really he was just thinking about quantum mechanics.",
    ],
  },
  {
    word: "altercation",
    type: "noun",
    meanings: ["a dispute", "fight"],
    examples: [
      "Jason and Lionel blamed one another for the car accident, leading to an altercation.",
    ],
  },
  {
    word: "anecdote",
    type: "noun",
    meanings: ["a short", "humorous account"],
    examples: [
      "After dinner, Marlon told an anecdote aboutthe time he got his nose stuck in a toaster.",
    ],
  },
  {
    word: "anesthesia",
    type: "noun",
    meanings: ["loss of sensation"],
    examples: [
      "When the nerves in his spine were damaged, Mr.Hollins suffered anesthesia in his legs.",
    ],
  },
  {
    word: "anguish",
    type: "noun",
    meanings: ["extreme sadness", "torment"],
    examples: [
      "Angelos suffered terrible anguish when helearned that Buffy had died while combating a strange mystical force of evil.",
    ],
  },
  {
    word: "animated",
    type: "adjective",
    meanings: ["lively"],
    examples: [
      "When he begins to talk about drama, which is his true passion, hebecomes very animated.",
    ],
  },
  {
    word: "annex",
    type: "verb",
    meanings: ["to incorporate territory or space"],
    examples: ["After defeating them in battle, theRussians annexed Poland.)"],
  },
  {
    word: "annex",
    type: "noun",
    meanings: ["a room attached to a larger room or space"],
    examples: [
      "Helikes to do his studying in a little annex attached to the main reading room in thelibrary.",
    ],
  },
  {
    word: "annul",
    type: "verb",
    meanings: ["to make void or invalid"],
    examples: [
      "After seeing its unforeseen and catastrophic effects,Congress sought to annul the law.",
    ],
  },
  {
    word: "anomaly",
    type: "noun",
    meanings: ["something that does not fit into the normal order"],
    examples: [
      '"That rip in the spacetimecontinuum is certainly a spatial anomaly," said Spock to Captain Kirk.',
    ],
  },
  {
    word: "anonymous",
    type: "adjective",
    meanings: ["being unknown", "unrecognized"],
    examples: ["Mary received a love poem from ananonymous admirer."],
  },
  {
    word: "antagonism",
    type: "noun",
    meanings: ["hostility"],
    examples: [
      "Superman and Bizarro Superman shared a mutualantagonism, and often fought.",
    ],
  },
  {
    word: "antecedent",
    type: "noun",
    meanings: ["something that came before"],
    examples: [
      "The great tradition of Western culture hadits antecedent in the culture of Ancient Greece.",
    ],
  },
  {
    word: "antediluvian",
    type: "adjective",
    meanings: ["ancient"],
    examples: [
      "The antediluvian man still believed that Eisenhower waspresident of the United States and that hot dogs cost a nickel.",
    ],
  },
  {
    word: "anthology",
    type: "noun",
    meanings: ["a selected collection of writings", "songs", "etc."],
    examples: [
      "The new anthology of BobDylan songs contains all his greatest hits and a few songs that you might never haveheard before.",
    ],
  },
  {
    word: "antipathy",
    type: "noun",
    meanings: ["a strong dislike", "repugnance"],
    examples: [
      "I know you love me, but because you are aliar and a thief, I feel nothing but antipathy for you.",
    ],
  },
  {
    word: "antiquated",
    type: "adjective",
    meanings: ["old", "out of date"],
    examples: [
      "That antiquated car has none of the features, likepower windows and steering, that make modern cars so great.",
    ],
  },
  {
    word: "antiseptic",
    type: "adjective",
    meanings: ["clean", "sterile"],
    examples: [
      "The antiseptic hospital was very bare, but its cleanlinesshelped to keep patients healthy.",
    ],
  },
  {
    word: "antithesis",
    type: "noun",
    meanings: ["the absolute opposite"],
    examples: [
      "Your values, which hold war and violence in thehighest esteem, are the antithesis of my pacifist beliefs.",
    ],
  },
  {
    word: "anxiety",
    type: "noun",
    meanings: ["intense uneasiness"],
    examples: [
      "When he heard about the car crash, he felt anxietybecause he knew that his girlfriend had been driving on the road where the accidentoccurred.",
    ],
  },
  {
    word: "apathetic",
    type: "adjective",
    meanings: ["lacking concern", "emotion"],
    examples: [
      "Uninterested in politics, Bruno wasapathetic about whether he lived under a capitalist or communist regime.",
    ],
  },
  {
    word: "apocryphal",
    type: "adjective",
    meanings: ["fictitious", "false", "wrong"],
    examples: [
      "Because I am standing before you, it seemsobvious that the stories circulating about my demise were apocryphal.",
    ],
  },
  {
    word: "appalling",
    type: "adjective",
    meanings: ["inspiring shock", "horror", "disgust"],
    examples: [
      "The judge found the murderer's crimesand lack of remorse appalling.",
    ],
  },
  {
    word: "appease",
    type: "verb",
    meanings: ["to calm", "satisfy"],
    examples: [
      "When the child cries, the mother gives him candy toappease him.",
    ],
  },
  {
    word: "appraise",
    type: "verb",
    meanings: ["to assess the worth or value of"],
    examples: ["A realtor will come over tonight toappraise our house."],
  },
  {
    word: "apprehend",
    type: "verb",
    meanings: ["to seize", "arrest"],
    examples: ["The criminal was apprehended at the scene.)"],
  },
  {
    word: "apprehend",
    type: "verb",
    meanings: ["to perceive", "understand", "grasp"],
    examples: [
      "The student has trouble apprehending concepts inmath and science.",
    ],
  },
  {
    word: "approbation",
    type: "noun",
    meanings: ["praise"],
    examples: ["The crowd welcomed the heroes with approbation."],
  },
  {
    word: "appropriate",
    type: "verb",
    meanings: ["to take", "make use of"],
    examples: [
      "The government appropriated the farmer's landwithout justification.",
    ],
  },
  {
    word: "aquatic",
    type: "adjective",
    meanings: ["relating to water"],
    examples: [
      "The marine biologist studies starfish and other aquaticcreatures.",
    ],
  },
  {
    word: "arable",
    type: "adjective",
    meanings: ["suitable for growing crops"],
    examples: [
      "The farmer purchased a plot of arable land onwhich he will grow corn and sprouts.",
    ],
  },
  {
    word: "arbiter",
    type: "noun",
    meanings: ["one who can resolve a dispute", "make a decision"],
    examples: [
      "The divorce court judgewill serve as the arbiter between the estranged husband and wife.",
    ],
  },
  {
    word: "arbitrary",
    type: "adjective",
    meanings: ["based on factors that appear random"],
    examples: [
      "The boy's decision to choose onecollege over another seems arbitrary.",
    ],
  },
  {
    word: "arbitration",
    type: "noun",
    meanings: ["the process or act of resolving a dispute"],
    examples: [
      "The employee sought officialarbitration when he could not resolve a disagreement with his supervisor.",
    ],
  },
  {
    word: "arboreal",
    type: "adjective",
    meanings: ["of or relating to trees"],
    examples: ["Leaves, roots, and bark are a few arboreal traits."],
  },
  {
    word: "arcane",
    type: "adjective",
    meanings: ["obscure", "secret", "known only by a few"],
    examples: ["The professor is an expert in arcaneLithuanian literature."],
  },
  {
    word: "archaic",
    type: "adjective",
    meanings: ["of or relating to an earlier period in time", "outdated"],
    examples: [
      "In a few select regionsof Western Mongolian, an archaic Chinese dialect is still spoken.",
    ],
  },
  {
    word: "archetypal",
    type: "adjective",
    meanings: ["the most representative or typical example of something"],
    examples: [
      "Somebelieve George Washington, with his flowing white hair and commanding stature,was the archetypal politician.",
    ],
  },
  {
    word: "ardor",
    type: "noun",
    meanings: ["extreme vigor", "energy", "enthusiasm"],
    examples: [
      "The soldiers conveyed their ardor withimpassioned battle cries.",
    ],
  },
  {
    word: "arid",
    type: "adjective",
    meanings: ["excessively dry"],
    examples: [
      "Little other than palm trees and cacti grow successfully inarid environments.",
    ],
  },
  {
    word: "arrogate",
    type: "verb",
    meanings: ["to take without justification"],
    examples: [
      "The king arrogated the right to orderexecutions to himself exclusively.",
    ],
  },
  {
    word: "artifact",
    type: "noun",
    meanings: ["a remaining piece from an extinct culture or place"],
    examples: [
      "The scientists spent allday searching the cave for artifacts from the ancient Mayan civilization.",
    ],
  },
  {
    word: "artisan",
    type: "noun",
    meanings: ["a craftsman"],
    examples: ["The artisan uses wood to make walking sticks."],
  },
  {
    word: "ascertain",
    type: "verb",
    meanings: ["to perceive", "learn"],
    examples: [
      "With a bit of research, the student ascertained thatsome plants can live for weeks without water.",
    ],
  },
  {
    word: "ascetic",
    type: "adjective",
    meanings: [
      "practicing restraint as a means of self-discipline",
      "usually religious",
    ],
    examples: [
      "Thepriest lives an ascetic life devoid of television, savory foods, and other pleasures.",
    ],
  },
  {
    word: "ascribe",
    type: "verb",
    meanings: ["to assign", "credit", "attribute to"],
    examples: [
      "Some ascribe the invention of fireworks anddynamite to the Chinese.",
    ],
  },
  {
    word: "aspersion",
    type: "noun",
    meanings: ["a curse", "expression of ill-will"],
    examples: [
      "The rival politicians repeatedly castaspersions on each others' integrity.",
    ],
  },
  {
    word: "aspire",
    type: "verb",
    meanings: ["to long for", "aim toward"],
    examples: ["The young poet aspires to publish a book of versesomeday."],
  },
  {
    word: "assail",
    type: "verb",
    meanings: ["to attack"],
    examples: ["At dawn, the war planes assailed the boats in the harbor."],
  },
  {
    word: "assess",
    type: "verb",
    meanings: ["to evaluate"],
    examples: ["A crew arrived to assess the damage after the crash."],
  },
  {
    word: "assiduous",
    type: "adjective",
    meanings: ["hard-working", "diligent"],
    examples: [
      "The construction workers erected theskyscraper during two years of assiduous labor.",
    ],
  },
  {
    word: "assuage",
    type: "verb",
    meanings: ["to ease", "pacify"],
    examples: ["The mother held the baby to assuage its fears."],
  },
  {
    word: "astute",
    type: "adjective",
    meanings: ["very clever", "crafty"],
    examples: [
      "Much of Roger's success in politics results from hisability to provide astute answers to reporters' questions.",
    ],
  },
  {
    word: "asylum",
    type: "noun",
    meanings: ["a place of refuge", "protection", "a sanctuary"],
    examples: [
      "For Thoreau, the forest servedas an asylum from the pressures of urban life.)",
    ],
  },
  {
    word: "asylum",
    type: "noun",
    meanings: ["an institution in which theinsane are kept"],
    examples: [
      "Once diagnosed by a certified psychiatrist, the man was put in anasylum.",
    ],
  },
  {
    word: "atone",
    type: "verb",
    meanings: ["to repent", "make amends"],
    examples: [
      "The man atoned for forgetting his wife's birthdayby buying her five dozen roses.",
    ],
  },
  {
    word: "atrophy",
    type: "verb",
    meanings: ["to wither away", "decay"],
    examples: [
      "If muscles do not receive enough blood, they willsoon atrophy and die.",
    ],
  },
  {
    word: "attain",
    type: "verb",
    meanings: ["to achieve", "arrive at"],
    examples: [
      "The athletes strived to attain their best times incompetition.",
    ],
  },
  {
    word: "attribute",
    type: "verb",
    meanings: ["to credit", "assign"],
    examples: [
      "He attributes all of his success to his mother's undyingencouragement.)",
    ],
  },
  {
    word: "attribute",
    type: "noun",
    meanings: ["a facet or trait"],
    examples: [
      "Among the beetle's most peculiar attributes isits thorny protruding eyes.",
    ],
  },
  {
    word: "atypical",
    type: "adjective",
    meanings: ["not typical", "unusual"],
    examples: ["Screaming and crying is atypical adult behavior."],
  },
  {
    word: "audacious",
    type: "adjective",
    meanings: ["excessively bold"],
    examples: [
      "The security guard was shocked by the fan'saudacious attempt to offer him a bribe.",
    ],
  },
  {
    word: "audible",
    type: "adjective",
    meanings: ["able to be heard"],
    examples: ["The missing person's shouts were unfortunately notaudible."],
  },
  {
    word: "augment",
    type: "verb",
    meanings: ["to add to", "expand"],
    examples: [
      "The eager student seeks to augment his knowledge ofFrench vocabulary by reading French literature.",
    ],
  },
  {
    word: "auspicious",
    type: "adjective",
    meanings: ["favorable", "indicative of good things"],
    examples: [
      "The tennis player considered thesunny forecast an auspicious sign that she would win her match.",
    ],
  },
  {
    word: "austere",
    type: "adjective",
    meanings: ["very bare", "bleak"],
    examples: [
      "The austere furniture inside the abandoned house madethe place feel haunted.",
    ],
  },
  {
    word: "avarice",
    type: "noun",
    meanings: ["excessive greed"],
    examples: [
      "The banker's avarice led him to amass a tremendouspersonal fortune.",
    ],
  },
  {
    word: "avenge",
    type: "verb",
    meanings: ["to seek revenge"],
    examples: [
      "The victims will take justice into their own hands andstrive to avenge themselves against the men who robbed them.",
    ],
  },
  {
    word: "aversion",
    type: "noun",
    meanings: ["a particular dislike for something"],
    examples: [
      "Because he's from Hawaii, Ben has anaversion to autumn, winter, and cold climates in general.",
    ],
  },
  {
    word: "balk",
    type: "verb",
    meanings: ["to stop", "block abruptly"],
    examples: ["Edna's boss balked at her request for another raise."],
  },
  {
    word: "ballad",
    type: "noun",
    meanings: ["a love song"],
    examples: [
      "Greta's boyfriend played her a ballad on the guitar during theirwalk through the dark woods.",
    ],
  },
  {
    word: "banal",
    type: "adjective",
    meanings: ["dull", "commonplace"],
    examples: [
      "The client rejected our proposal because they foundour presentation banal and unimpressive.",
    ],
  },
  {
    word: "bane",
    type: "noun",
    meanings: ["a burden"],
    examples: [
      "Advanced physics is the bane of many students' academic lives.",
    ],
  },
  {
    word: "bard",
    type: "noun",
    meanings: ["a poet", "often a singer as well"],
    examples: [
      "Shakespeare is often considered the greatest bardin the history of the English language.",
    ],
  },
  {
    word: "bashful",
    type: "adjective",
    meanings: ["shy", "excessively timid"],
    examples: [
      "Frankie's mother told him not to be bashful whenhe refused to attend the birthday party.",
    ],
  },
  {
    word: "battery",
    type: "noun",
    meanings: ["a device that supplies power"],
    examples: [
      "Most cars run on a combination of powerfrom a battery and gasoline.)",
    ],
  },
  {
    word: "battery",
    type: "noun",
    meanings: ["assault", "beating"],
    examples: [
      "Her husband was accused ofassault and battery after he attacked a man on the sidewalk.",
    ],
  },
  {
    word: "beguile",
    type: "verb",
    meanings: ["to trick", "deceive"],
    examples: [
      "The thief beguiled his partners into surrendering all oftheir money to him.",
    ],
  },
  {
    word: "behemoth",
    type: "noun",
    meanings: ["something of tremendous power or size"],
    examples: [
      "The new aircraft carrier isamong several behemoths that the Air Force has added to its fleet.",
    ],
  },
  {
    word: "benevolent",
    type: "adjective",
    meanings: ["marked by goodness or doing good"],
    examples: [
      "Police officers should becommended for their benevolent service to the community.",
    ],
  },
  {
    word: "benign",
    type: "adjective",
    meanings: ["favorable", "not threatening", "mild"],
    examples: [
      "We were all relieved to hear that themedical tests determined her tumor to be benign.",
    ],
  },
  {
    word: "bequeath",
    type: "verb",
    meanings: ["to pass on", "give"],
    examples: ["Jon's father bequeathed his entire estate to his mother."],
  },
  {
    word: "berate",
    type: "verb",
    meanings: ["to scold vehemently"],
    examples: [
      "The angry boss berated his employees for failing tomeet their deadline.",
    ],
  },
  {
    word: "bereft",
    type: "adjective",
    meanings: ["devoid of", "without"],
    examples: [
      "His family was bereft of food and shelter following thetornado.",
    ],
  },
  {
    word: "beseech",
    type: "verb",
    meanings: ["to beg", "plead", "implore"],
    examples: [
      "The servant beseeched the king for food to feed hisstarving family.",
    ],
  },
  {
    word: "bias",
    type: "noun",
    meanings: ["a tendency", "inclination", "prejudice"],
    examples: [
      "The judge's hidden bias against smokers ledhim to make an unfair decision.",
    ],
  },
  {
    word: "bilk",
    type: "verb",
    meanings: ["cheat", "defraud"],
    examples: [
      "The lawyer discovered that this firm had bilked several clientsout of thousands of dollars.",
    ],
  },
  {
    word: "blandish",
    type: "verb",
    meanings: ["to coax by using flattery"],
    examples: [
      "Rachel's assistant tried to blandish her intoaccepting the deal.",
    ],
  },
  {
    word: "blemish",
    type: "noun",
    meanings: ["an imperfection", "flaw"],
    examples: [
      "The dealer agreed to lower the price because of themany blemishes on the surface of the wooden furniture.",
    ],
  },
  {
    word: "blight",
    type: "noun",
    meanings: ["a plague", "disease"],
    examples: [
      "The potato blight destroyed the harvest and bankruptedmany families.",
    ],
  },
  {
    word: "blight",
    type: "noun",
    meanings: ["something that destroys hope"],
    examples: ["His bad morale is a blightupon this entire operation."],
  },
  {
    word: "boisterous",
    type: "adjective",
    meanings: ["loud and full of energy"],
    examples: [
      "The candidate won the vote after givingseveral boisterous speeches on television.",
    ],
  },
  {
    word: "bombastic",
    type: "adjective",
    meanings: ["excessively confident", "pompous"],
    examples: ["The singer's bombastic performancedisgusted the crowd."],
  },
  {
    word: "boon",
    type: "noun",
    meanings: ["a gift or blessing"],
    examples: [
      "The good weather has been a boon for many businesseslocated near the beach.",
    ],
  },
  {
    word: "bourgeois",
    type: "noun",
    meanings: ["a middle-class person", "capitalist"],
    examples: [
      "Many businessmen receive criticism fortheir bourgeois approach to life.",
    ],
  },
  {
    word: "brazen",
    type: "adjective",
    meanings: ["excessively bold", "brash"],
    examples: [
      "Critics condemned the novelist's brazen attemptto plagiarize Hemingway's story.",
    ],
  },
  {
    word: "brusque",
    type: "adjective",
    meanings: ["short", "abrupt", "dismissive"],
    examples: ["The captain's brusque manner offended thepassengers."],
  },
  {
    word: "buffet",
    type: "verb",
    meanings: ["to strike with force"],
    examples: [
      "The strong winds buffeted the ships, threatening tocapsize them.)",
    ],
  },
  {
    word: "buffet",
    type: "noun",
    meanings: ["an arrangement of food set out on a table"],
    examples: [
      "Rather than sittingaround a table, the guests took food from our buffet and ate standing up.",
    ],
  },
  {
    word: "burnish",
    type: "verb",
    meanings: ["to polish", "shine"],
    examples: [
      "His mother asked him to burnish the silverware beforesetting the table.",
    ],
  },
  {
    word: "buttress",
    type: "verb",
    meanings: ["to support", "hold up"],
    examples: ["The column buttresses the roof above the statue."],
  },
  {
    word: "buttress",
    type: "noun",
    meanings: ["something that offers support"],
    examples: ["The buttress supports the roof above the statues."],
  },
  {
    word: "cacophony",
    type: "noun",
    meanings: ["tremendous noise", "disharmonious sound"],
    examples: [
      "The elementary schoolorchestra created a cacophony at the recital.",
    ],
  },
  {
    word: "cadence",
    type: "noun",
    meanings: ["a rhythm", "progression of sound"],
    examples: [
      "The pianist used the foot pedal toemphasize the cadence of the sonata.",
    ],
  },
  {
    word: "cajole",
    type: "verb",
    meanings: ["to urge", "coax"],
    examples: ["Fred's buddies cajoled him into attending the bachelor party."],
  },
  {
    word: "calamity",
    type: "noun",
    meanings: ["an event with disastrous consequences"],
    examples: [
      "The earthquake in San Franciscowas a calamity worse than any other natural disaster in history.",
    ],
  },
  {
    word: "calibrate",
    type: "verb",
    meanings: ["to set", "standardize"],
    examples: [
      "The mechanic calibrated the car's transmission tomake the motor run most efficiently.",
    ],
  },
  {
    word: "callous",
    type: "adjective",
    meanings: ["harsh", "cold", "unfeeling"],
    examples: ["The murderer's callous lack of remorse shocked thejury."],
  },
  {
    word: "calumny",
    type: "noun",
    meanings: [
      "an attempt to spoil someone else's reputation by spreading lies",
    ],
    examples: [
      "The localofficial's calumny ended up ruining his opponent's prospect of winning the election.",
    ],
  },
  {
    word: "camaraderie",
    type: "noun",
    meanings: ["brotherhood", "jovial unity"],
    examples: [
      "Camaraderie among employees usuallyleads to success in business.",
    ],
  },
  {
    word: "candor",
    type: "noun",
    meanings: ["honesty", "frankness"],
    examples: [
      "We were surprised by the candor of the mayor's speechbecause he is usually rather evasive.",
    ],
  },
  {
    word: "canny",
    type: "adjective",
    meanings: ["shrewd", "careful"],
    examples: [
      "The canny runner hung at the back of the pack throughmuch of the race to watch the other runners, and then sprinted past them at the end.",
    ],
  },
  {
    word: "canvas",
    type: "noun",
    meanings: ["a piece of cloth on which an artist paints"],
    examples: ["Picasso liked to work on canvasrather than on bare cement."],
  },
  {
    word: "canvas",
    type: "verb",
    meanings: ["to cover", "inspect"],
    examples: ["We canvassed theneighborhood looking for clues."],
  },
  {
    word: "capacious",
    type: "adjective",
    meanings: ["very spacious"],
    examples: ["The workers delighted in their new capacious officespace."],
  },
  {
    word: "capitulate",
    type: "verb",
    meanings: ["to surrender"],
    examples: [
      "The army finally capitulated after fighting a long costlybattle.",
    ],
  },
  {
    word: "capricious",
    type: "adjective",
    meanings: ["subject to whim", "fickle"],
    examples: [
      "The young girl's capricious tendencies made itdifficult for her to focus on achieving her goals.",
    ],
  },
  {
    word: "captivate",
    type: "verb",
    meanings: ["to get the attention of", "hold"],
    examples: [
      "The fireworks captivated the young boy, whohad never seen such things before.",
    ],
  },
  {
    word: "carouse",
    type: "verb",
    meanings: ["to party", "celebrate"],
    examples: ["We caroused all night after getting married."],
  },
  {
    word: "carp",
    type: "verb",
    meanings: ["to annoy", "pester"],
    examples: [
      "The husband divorced his wife after listening to her carpingvoice for decades.",
    ],
  },
  {
    word: "catalog",
    type: "verb",
    meanings: ["to list", "enter into a list"],
    examples: [
      "The judge cataloged the victim's injuries beforecalculating how much money he would award.",
    ],
  },
  {
    word: "catalog",
    type: "noun",
    meanings: ["a list or collection"],
    examples: [
      "Wereceived a catalog from J. Crew that displayed all of their new items.",
    ],
  },
  {
    word: "catalyze",
    type: "verb",
    meanings: ["to charge", "inspire"],
    examples: [
      "The president's speech catalyzed the nation andresuscitated the economy.",
    ],
  },
  {
    word: "caucus",
    type: "noun",
    meanings: ["a meeting usually held by people working toward the same goal"],
    examples: [
      "Theironworkers held a caucus to determine how much of a pay increase they wouldrequest.",
    ],
  },
  {
    word: "caustic",
    type: "adjective",
    meanings: ["bitter", "biting", "acidic"],
    examples: [
      "The politicians exchanged caustic insults for over anhour during the debate.",
    ],
  },
  {
    word: "cavort",
    type: "verb",
    meanings: ["to leap about", "behave boisterously"],
    examples: [
      "The adults ate their dinners on the patio,while the children cavorted around the pool.",
    ],
  },
  {
    word: "censure",
    type: "noun",
    meanings: ["harsh criticism"],
    examples: [
      "The frustrated teenager could not put up with anymoreof her critical mother's censure.",
    ],
  },
  {
    word: "censure",
    type: "verb",
    meanings: ["to rebuke formally"],
    examples: [
      "The principal censuredthe head of the English Department for forcing students to learn esotericvocabulary.",
    ],
  },
  {
    word: "cerebral",
    type: "adjective",
    meanings: ["related to the intellect"],
    examples: [
      "The books we read in this class are too cerebral—they don't engage my emotions at all.",
    ],
  },
  {
    word: "chaos",
    type: "noun",
    meanings: ["absolute disorder"],
    examples: [
      "Mr. Thornton's sudden departure for the lavatoryplunged his classroom into chaos.",
    ],
  },
  {
    word: "chastise",
    type: "verb",
    meanings: ["to criticize severely"],
    examples: [
      "After being chastised by her peers for mimickingBritney Spears, Miranda dyed her hair black and affected a Gothic style.",
    ],
  },
  {
    word: "cherish",
    type: "verb",
    meanings: ["to feel or show affection toward something"],
    examples: [
      "She continued to cherish herred plaid trousers, even though they had gone out of style and no longer fit her.",
    ],
  },
  {
    word: "chide",
    type: "verb",
    meanings: ["to voice disapproval"],
    examples: [
      "Lucy chided Russell for his vulgar habits and sloppyappearance.",
    ],
  },
  {
    word: "choreography",
    type: "noun",
    meanings: ["the arrangement of dances"],
    examples: [
      "The plot of the musical was banal, but thechoreography was stunning.",
    ],
  },
  {
    word: "chronicle",
    type: "noun",
    meanings: ["a written history"],
    examples: [
      "The library featured the newly updated chronicle ofWorld War II.)",
    ],
  },
  {
    word: "chronicle",
    type: "verb",
    meanings: ["to write a history"],
    examples: [
      "Albert's diary chronicled the day-to-daygrowth of his obsession with Cynthia.",
    ],
  },
  {
    word: "chronological",
    type: "adjective",
    meanings: ["arranged in order of time"],
    examples: [
      "Lionel carefully arranged the snapshotsof his former girlfriends in chronological order, and then set fire to them.",
    ],
  },
  {
    word: "circuitous",
    type: "adjective",
    meanings: ["roundabout"],
    examples: [
      "The bus's circuitous route took us through numerousoutlying suburbs.",
    ],
  },
  {
    word: "circumlocution",
    type: "noun",
    meanings: ["indirect and wordy language"],
    examples: [
      "The professor's habit of speaking incircumlocutions made it difficult to follow his lectures.",
    ],
  },
  {
    word: "circumscribed",
    type: "adjective",
    meanings: ["marked off", "bounded"],
    examples: [
      "The children were permitted to play tagonly within a carefully circumscribed area of the lawn.",
    ],
  },
  {
    word: "circumspect",
    type: "adjective",
    meanings: ["cautious"],
    examples: [
      "Though I promised Rachel's father I would bring her homepromptly by midnight, it would have been more circumspect not to have specified atime.",
    ],
  },
  {
    word: "circumvent",
    type: "verb",
    meanings: ["to get around"],
    examples: [
      "The school's dress code forbidding navel-baring jeanswas circumvented by the determined students, who were careful to cover up withlong coats when administrators were nearby.",
    ],
  },
  {
    word: "clairvoyant",
    type: "adjective",
    meanings: ["able to perceive things that normal people cannot"],
    examples: [
      "Zelda's uncannyability to detect my lies was nothing short of clairvoyant.",
    ],
  },
  {
    word: "clamor",
    type: "noun",
    meanings: ["loud noise"],
    examples: [
      "Each morning the birds outside my window make such aclamor that they wake me up.",
    ],
  },
  {
    word: "clamor",
    type: "verb",
    meanings: ["to loudly insist"],
    examples: [
      "Neville's fans clamored forhim to appear on stage, but he had passed out on the floor of his dressing room.",
    ],
  },
  {
    word: "clandestine",
    type: "adjective",
    meanings: ["secret"],
    examples: [
      "Announcing to her boyfriend that she was going to the gym,Sophie actually went to meet Joseph for a clandestine liaison.",
    ],
  },
  {
    word: "cleave",
    type: "verb",
    meanings: ["to divide into parts"],
    examples: [
      "Following the scandalous disgrace of their leader, theentire political party cleaved into warring factions.",
    ],
  },
  {
    word: "cleave",
    type: "verb",
    meanings: ["to stick together firmly"],
    examples: [
      "After resolving their marital problems, Junior and Rosa cleaved to one another allthe more tightly.",
    ],
  },
  {
    word: "clemency",
    type: "noun",
    meanings: ["mercy"],
    examples: [
      "After he forgot their anniversary, Martin could only beg Mariafor clemency.",
    ],
  },
  {
    word: "clergy",
    type: "noun",
    meanings: ["members of Christian holy orders"],
    examples: [
      "Though the villagers viewed the churchrectory as quaint and charming, the clergy who lived there regarded it as a mildewyand dusty place that aggravated their allergies.",
    ],
  },
  {
    word: "cloying",
    type: "adjective",
    meanings: ["sickeningly sweet"],
    examples: [
      "Though Ronald was physically attractive, Maudfound his constant compliments and solicitous remarks cloying.",
    ],
  },
  {
    word: "coagulate",
    type: "verb",
    meanings: ["to thicken", "clot"],
    examples: ["The top layer of the pudding had coagulated into a thickskin."],
  },
  {
    type: "verb",
    meanings: ["to fuse into a whole"],
    examples: [
      "Gordon's ensemble of thrift-shop garments coalescedinto a surprisingly handsome outfit.",
    ],
  },
  {
    word: "cobbler",
    type: "noun",
    meanings: ["a person who makes or repairs shoes"],
    examples: [
      "I had my neighborhood cobblerreplace my worn-out leather soles with new ones.",
    ],
  },
  {
    word: "coerce",
    type: "verb",
    meanings: ["to make somebody do something by force or threat"],
    examples: [
      "The court decided thatVanilla Ice did not have to honor the contract because he had been coerced intosigning it.",
    ],
  },
  {
    word: "cogent",
    type: "adjective",
    meanings: ["intellectually convincing"],
    examples: [
      "Irene's arguments in favor of abstinence were socogent that I could not resist them.",
    ],
  },
  {
    word: "cognizant",
    type: "adjective",
    meanings: ["aware", "mindful"],
    examples: [
      "Jake avoided speaking to women in bars because hewas cognizant of the fact that drinking impairs his judgment.",
    ],
  },
  {
    word: "coherent",
    type: "adjective",
    meanings: ["logically consistent", "intelligible"],
    examples: [
      "Renee could not figure out whatMonroe had seen because he was too distraught to deliver a coherent statement.",
    ],
  },
  {
    word: "collateral",
    type: "adjective",
    meanings: ["secondary"],
    examples: [
      "Divorcing my wife had the collateral effect of making mepoor, as she was the only one of us with a job or money.",
    ],
  },
  {
    word: "collateral",
    type: "noun",
    meanings: ["security for a debt"],
    examples: ["Jacob left his watch as collateral for the $500 loan."],
  },
  {
    word: "colloquial",
    type: "adjective",
    meanings: ["characteristic of informal conversation"],
    examples: [
      "Adam's essay on sexualresponse in primates was marked down because it contained too many colloquialexpressions.",
    ],
  },
  {
    word: "collusion",
    type: "noun",
    meanings: ["secret agreement", "conspiracy"],
    examples: [
      "The three law students worked in collusionto steal the final exam.",
    ],
  },
  {
    word: "colossus",
    type: "noun",
    meanings: ["a gigantic statue or thing"],
    examples: [
      "For 56 years, the ancient city of Rhodes featureda colossus standing astride its harbor.",
    ],
  },
  {
    word: "combustion",
    type: "noun",
    meanings: ["the act or process of burning"],
    examples: [
      "The unexpected combustion of theprosecution's evidence forced the judge to dismiss the case against Ramirez.",
    ],
  },
  {
    word: "commendation",
    type: "noun",
    meanings: ["a notice of approval or recognition"],
    examples: [
      "Jared received a commendationfrom Linda, his supervisor, for his stellar performance.",
    ],
  },
  {
    word: "commensurate",
    type: "adjective",
    meanings: ["corresponding in size or amount"],
    examples: [
      "Ahab selected a very long rolland proceeded to prepare a tuna salad sandwich commensurate with his enormousappetite.",
    ],
  },
  {
    word: "commodious",
    type: "adjective",
    meanings: ["roomy"],
    examples: [
      "Holden invited the three women to join him in the back seatof the taxicab, assuring them that the car was quite commodious.",
    ],
  },
  {
    word: "compelling",
    type: "adjective",
    meanings: ["forceful", "demanding attention"],
    examples: [
      "Eliot's speech was so compelling thatLenore accepted his proposal on the spot.",
    ],
  },
  {
    word: "compensate",
    type: "verb",
    meanings: ["to make an appropriate payment for something"],
    examples: [
      "Reginald boughtSharona a new dress to compensate her for the one he'd spilled his ice cream on.",
    ],
  },
  {
    word: "complacency",
    type: "noun",
    meanings: ["self-satisfied ignorance of danger"],
    examples: [
      "Colin tried to shock his friends outof their complacency by painting a frightening picture of what might happen tothem.",
    ],
  },
  {
    word: "complement",
    type: "verb",
    meanings: ["to complete", "make perfect"],
    examples: [
      "Ann's scarf complements her blousebeautifully, making her seem fully dressed even though she isn't wearing a coat.",
    ],
  },
  {
    word: "compliant",
    type: "adjective",
    meanings: ["ready to adapt oneself to another's wishes"],
    examples: [
      "Sue had verystrong opinions about what to do on a first date, and Ted wasabsolutely compliant.",
    ],
  },
  {
    word: "complicit",
    type: "adjective",
    meanings: ["being an accomplice in a wrongful act"],
    examples: [
      "By keeping her daughter's affaira secret, Maddie became complicit in it.",
    ],
  },
  {
    word: "compliment",
    type: "noun",
    meanings: ["an expression of esteem or approval"],
    examples: [
      "I blushed crimson when Emmagave me a compliment on my new haircut.",
    ],
  },
  {
    word: "compound",
    type: "verb",
    meanings: ["to combine parts"],
    examples: [
      "The difficulty of finding a fire escape amid the smokewas compounded with the dangers posed by the panicking crowds.",
    ],
  },
  {
    word: "compound",
    type: "noun",
    meanings: ["acombination of different parts"],
    examples: [
      "My attraction to Donna was a compound ofcuriosity about the unknown, physical desire, and intellectual admiration.",
    ],
  },
  {
    word: "3.",
    type: "noun",
    meanings: ["awalled area containing a group of buildings"],
    examples: [
      "When the fighting started, Josephrushed into the family compound because it was safe and well defended.",
    ],
  },
  {
    word: "comprehensive",
    type: "adjective",
    meanings: ["including everything"],
    examples: [
      "She sent me a comprehensive list of theingredients needed to cook rabbit soufflé.",
    ],
  },
  {
    word: "compress",
    type: "verb",
    meanings: ["to apply pressure", "squeeze together"],
    examples: ["Lynn compressed her lips into afrown."],
  },
  {
    word: "compunction",
    type: "noun",
    meanings: ["distress caused by feeling guilty"],
    examples: ["He felt compunction for the shabbyway he'd treated her."],
  },
  {
    word: "concede",
    type: "verb",
    meanings: ["to accept as valid"],
    examples: [
      "Andrew had to concede that what his mother said aboutDiana made sense.",
    ],
  },
  {
    word: "conciliatory",
    type: "adjective",
    meanings: ["friendly", "agreeable"],
    examples: [
      "I took Amanda's invitation to dinner as a veryconciliatory gesture.",
    ],
  },
  {
    word: "concise",
    type: "adjective",
    meanings: ["brief and direct in expression"],
    examples: [
      "Gordon did not like to waste time, and hisinstructions to Brenda were nothing if not concise.",
    ],
  },
  {
    word: "concoct",
    type: "verb",
    meanings: ["to fabricate", "make up"],
    examples: [
      "She concocted the most ridiculous story to explain herabsence.",
    ],
  },
  {
    word: "concomitant",
    type: "adjective",
    meanings: ["accompanying in a subordinate fashion"],
    examples: [
      "His dislike of hard workcarried with it a concomitant lack of funds.",
    ],
  },
  {
    word: "concord",
    type: "noun",
    meanings: ["harmonious agreement"],
    examples: [
      "Julie and Harold began the evening with adisagreement, but ended it in a state of perfect concord.",
    ],
  },
  {
    word: "condolence",
    type: "noun",
    meanings: ["an expression of sympathy in sorrow"],
    examples: [
      "Brian lamely offered hiscondolences on the loss of his sister's roommate's cat.",
    ],
  },
  {
    word: "condone",
    type: "verb",
    meanings: ["to pardon", "deliberately overlook"],
    examples: ["He refused to condone his brother'scrime."],
  },
  {
    word: "conduit",
    type: "noun",
    meanings: ["a pipe or channel through which something passes"],
    examples: ["The water flowedthrough the conduit into the container."],
  },
  {
    word: "confection",
    type: "noun",
    meanings: ["a sweet", "fancy food"],
    examples: [
      "We went to the mall food court and purchased adelicious confection.",
    ],
  },
  {
    word: "confidant",
    type: "noun",
    meanings: ["a person entrusted with secrets"],
    examples: ["Shortly after we met, she became mychief confidant."],
  },
  {
    word: "conflagration",
    type: "noun",
    meanings: ["great fire"],
    examples: ["The conflagration consumed the entire building."],
  },
  {
    word: "confluence",
    type: "noun",
    meanings: ["a gathering together"],
    examples: [
      "A confluence of different factors made tonight theperfect night.",
    ],
  },
  {
    word: "conformist",
    type: "noun",
    meanings: ["one who behaves the same as others"],
    examples: [
      "Julian was such a conformist thathe had to wait and see if his friends would do something before he would commit.",
    ],
  },
  {
    word: "confound",
    type: "verb",
    meanings: ["to frustrate", "confuse"],
    examples: [
      "MacGuyver confounded the policemen pursuinghim by covering his tracks.",
    ],
  },
  {
    word: "congeal",
    type: "verb",
    meanings: ["to thicken into a solid"],
    examples: ["The sauce had congealed into a thick paste."],
  },
  {
    word: "congenial",
    type: "adjective",
    meanings: ["pleasantly agreeable"],
    examples: ["His congenial manner made him popularwherever he went."],
  },
  {
    word: "congregation",
    type: "noun",
    meanings: ["a gathering of people", "especially for religious services"],
    examples: ["The priest toldthe congregation that he would be retiring."],
  },
  {
    word: "congruity",
    type: "noun",
    meanings: ["the quality of being in agreement"],
    examples: ["Bill and Veronica achieved a perfectcongruity of opinion."],
  },
  {
    word: "connive",
    type: "verb",
    meanings: ["to plot", "scheme"],
    examples: ["She connived to get me to give up my vacation plans."],
  },
  {
    word: "consecrate",
    type: "verb",
    meanings: ["to dedicate something to a holy purpose"],
    examples: ["Arvin consecrated his sparebedroom as a shrine to Christina."],
  },
  {
    word: "consensus",
    type: "noun",
    meanings: ["an agreement of opinion"],
    examples: [
      "The jury was able to reach a consensus onlyafter days of deliberation.",
    ],
  },
  {
    word: "consign",
    type: "verb",
    meanings: ["to give something over to another's care"],
    examples: ["Unwillingly, he consigned hismother to a nursing home."],
  },
  {
    word: "consolation",
    type: "noun",
    meanings: ["an act of comforting"],
    examples: [
      "Darren found Alexandra's presence to be aconsolation for his suffering.",
    ],
  },
  {
    word: "consonant",
    type: "adjective",
    meanings: ["in harmony"],
    examples: ["The singers' consonant voices were beautiful."],
  },
  {
    word: "constituent",
    type: "noun",
    meanings: ["an essential part"],
    examples: [
      "The most important constituent of her perfume issomething called ambergris.",
    ],
  },
  {
    word: "constrain",
    type: "verb",
    meanings: ["to forcibly restrict"],
    examples: [
      "His belief in nonviolence constrained him from takingrevenge on his attackers.",
    ],
  },
  {
    word: "construe",
    type: "verb",
    meanings: ["to interpret"],
    examples: [
      "He construed her throwing his clothes out the window as asignal that she wanted him to leave.",
    ],
  },
  {
    word: "consummate",
    type: "verb",
    meanings: [
      "to complete a deal; to complete a marriage ceremony through sexualintercourse",
    ],
    examples: [
      "Erica and Donald consummated their agreement in the executiveboardroom.",
    ],
  },
  {
    word: "consumption",
    type: "noun",
    meanings: ["the act of consuming"],
    examples: [
      "Consumption of intoxicating beverages is notpermitted on these premises.",
    ],
  },
  {
    word: "contemporaneous",
    type: "adjective",
    meanings: ["existing during the same time"],
    examples: [
      "Though her novels do notfeature the themes of Romanticism, Jane Austen's work was contemporaneous withthat of Wordsworth and Byron.",
    ],
  },
  {
    word: "contentious",
    type: "adjective",
    meanings: ["having a tendency to quarrel or dispute"],
    examples: [
      "George's contentiouspersonality made him unpopular with his classmates.",
    ],
  },
  {
    word: "contravene",
    type: "verb",
    meanings: ["to contradict", "oppose", "violate"],
    examples: [
      "Edwidge contravened his landlady's ruleagainst overnight guests.",
    ],
  },
  {
    word: "contrite",
    type: "adjective",
    meanings: ["penitent", "eager to be forgiven"],
    examples: [
      "Blake's contrite behavior made itimpossible to stay angry at him.",
    ],
  },
  {
    word: "contusion",
    type: "noun",
    meanings: ["bruise", "injury"],
    examples: ["The contusions on his face suggested he'd been in a fight."],
  },
  {
    word: "conundrum",
    type: "noun",
    meanings: ["puzzle", "problem"],
    examples: ["Interpreting Jane's behavior was a constantconundrum."],
  },
  {
    word: "convene",
    type: "verb",
    meanings: ["to call together"],
    examples: ["Jason convened his entire extended family for adiscussion."],
  },
  {
    word: "convention",
    type: "noun",
    meanings: ["an assembly of people"],
    examples: ["The hotel was full because of the cattleranchers'convention."],
  },
  {
    word: "convention",
    type: "noun",
    meanings: ["a rule", "custom"],
    examples: [
      "The cattle-ranchers have a conventionthat you take off your boots before entering their houses.",
    ],
  },
  {
    word: "convivial",
    type: "adjective",
    meanings: ["characterized by feasting", "drinking", "merriment"],
    examples: [
      "The restaurant'sconvivial atmosphere put me immediately at ease.",
    ],
  },
  {
    word: "convoluted",
    type: "adjective",
    meanings: ["intricate", "complicated"],
    examples: ["Grace's story was so convoluted that I couldn'tfollow it."],
  },
  {
    word: "copious",
    type: "adjective",
    meanings: ["profuse", "abundant"],
    examples: ["Copious amounts of Snapple were imbibed in thecafeteria."],
  },
  {
    word: "cordial",
    type: "adjective",
    meanings: ["warm", "affectionate"],
    examples: ["His cordial greeting melted my anger at once."],
  },
  {
    word: "coronation",
    type: "noun",
    meanings: ["the act of crowning"],
    examples: [
      "The new king's coronation occurred the day afterhis father's death.",
    ],
  },
  {
    word: "corpulence",
    type: "adjective",
    meanings: ["extreme fatness"],
    examples: [
      "Henry's corpulence did not make him any lessattractive to his charming, svelte wife.",
    ],
  },
  {
    word: "corroborate",
    type: "verb",
    meanings: ["to support with evidence"],
    examples: [
      "Luke's seemingly outrageous claim wascorroborated by witnesses.",
    ],
  },
  {
    word: "corrosive",
    type: "adjective",
    meanings: ["having the tendency to erode or eat away"],
    examples: ["The effect of the chemicalwas highly corrosive."],
  },
  {
    word: "cosmopolitan",
    type: "adjective",
    meanings: ["sophisticated", "worldly"],
    examples: [
      "Lloyd's education and upbringing werecosmopolitan, so he felt right at home among the powerful and learned.",
    ],
  },
  {
    word: "counteract",
    type: "verb",
    meanings: ["to neutralize", "make ineffective"],
    examples: ["The antidote counteracted the effect ofthe poison."],
  },
  {
    word: "coup",
    type: "noun",
    meanings: ["a brilliant", "unexpected act"],
    examples: [
      "Alexander pulled off an amazing coup when hegot a date with Cynthia by purposely getting hit by her car.",
    ],
  },
  {
    word: "coup",
    type: "noun",
    meanings: ["the overthrow ofa government and assumption of authority"],
    examples: [
      "In their coup attempt, the army officersstormed the Parliament and took all the legislators hostage.",
    ],
  },
  {
    word: "covet",
    type: "verb",
    meanings: ["to desire enviously"],
    examples: ["I coveted Moses's house, wife, and car."],
  },
  {
    word: "covert",
    type: "adjective",
    meanings: ["secretly engaged in"],
    examples: [
      "Nerwin waged a covert campaign against his enemies,while outwardly appearing to remain friendly.",
    ],
  },
  {
    word: "credulity",
    type: "noun",
    meanings: ["readiness to believe"],
    examples: ["His credulity made him an easy target for con men."],
  },
  {
    word: "crescendo",
    type: "noun",
    meanings: ["a steady increase in intensity or volume"],
    examples: [
      "The crescendo of the brassinstruments gave the piece a patriotic feel.",
    ],
  },
  {
    word: "criteria",
    type: "noun",
    meanings: ["standards by which something is judged"],
    examples: [
      "Among Mrs. Fields's criteria forgood cookies are that they be moist and chewy.",
    ],
  },
  {
    word: "culmination",
    type: "noun",
    meanings: ["the climax toward which something progresses"],
    examples: [
      "The culmination ofthe couple's argument was the decision to divorce.",
    ],
  },
  {
    word: "culpable",
    type: "adjective",
    meanings: ["deserving blame"],
    examples: [
      "He was culpable of the crime, and was sentenced toperform community service for 75 years.",
    ],
  },
  {
    word: "cultivate",
    type: "verb",
    meanings: ["to nurture", "improve", "refine"],
    examples: ["At the library, she cultivated her interest inspy novels."],
  },
  {
    word: "cumulative",
    type: "adjective",
    meanings: ["increasing", "building upon itself"],
    examples: [
      "The cumulative effect of hours spentin the sun was a deep tan.",
    ],
  },
  {
    word: "cunning",
    type: "adjective",
    meanings: ["sly", "clever at being deceitful"],
    examples: ["The general devised a cunning plan tosurprise the enemy."],
  },
  {
    word: "cupidity",
    type: "noun",
    meanings: ["greed", "strong desire"],
    examples: [
      "His cupidity made him enter the abandoned goldmine despite the obvious dangers.",
    ],
  },
  {
    word: "cursory",
    type: "adjective",
    meanings: ["brief to the point of being superficial"],
    examples: ["Late for the meeting, she cast acursory glance at the agenda."],
  },
  {
    word: "curt",
    type: "adjective",
    meanings: ["abruptly and rudely short"],
    examples: [
      "Her curt reply to my question made me realizethat she was upset at me.",
    ],
  },
  {
    word: "curtail",
    type: "verb",
    meanings: ["to lessen", "reduce"],
    examples: ["Since losing his job, he had to curtail his spending."],
  },
  {
    word: "daunting",
    type: "adjective",
    meanings: ["intimidating", "causing one to lose courage"],
    examples: ["He kept delaying thedaunting act of asking for a promotion."],
  },
  {
    word: "dearth",
    type: "noun",
    meanings: ["a lack", "scarcity"],
    examples: [
      "An eager reader, she was dismayed by the dearth of classicbooks at the library.",
    ],
  },
  {
    word: "debacle",
    type: "noun",
    meanings: ["a disastrous failure", "disruption"],
    examples: [
      "The elaborately designed fireworks showturned into a debacle when the fireworks started firing in random directions.",
    ],
  },
  {
    word: "debase",
    type: "verb",
    meanings: ["to lower the quality or esteem of something"],
    examples: [
      "The large raise that he gavehimself debased his motives for running the charity.",
    ],
  },
  {
    word: "debauch",
    type: "verb",
    meanings: ["to corrupt by means of sensual pleasures"],
    examples: [
      "An endless amount of good wineand cheese debauched the traveler.",
    ],
  },
  {
    word: "debunk",
    type: "verb",
    meanings: ["to expose the falseness of something"],
    examples: [
      "He debunked her claim to be theworld's greatest chess player by defeating her in 18 consecutive matches.",
    ],
  },
  {
    word: "decorous",
    type: "adjective",
    meanings: ["socially proper", "appropriate"],
    examples: [
      "The appreciative guest displayed decorousbehavior toward his host.",
    ],
  },
  {
    word: "decry",
    type: "verb",
    meanings: ["to criticize openly"],
    examples: [
      "The kind video rental clerk decried the policy of chargingcustomers late fees.",
    ],
  },
  {
    word: "deface",
    type: "verb",
    meanings: ["to ruin or injure something's appearance"],
    examples: [
      "The brothers used eggs andshaving cream to deface their neighbor's mailbox.",
    ],
  },
  {
    word: "defamatory",
    type: "adjective",
    meanings: ["harmful toward another's reputation"],
    examples: [
      "The defamatory gossipspreading about the actor made the public less willing to see the actor's new movie.",
    ],
  },
  {
    word: "defer",
    type: "verb",
    meanings: ["to postpone something; to yield to another's wisdom"],
    examples: [
      "Ron deferred to Diane,the expert on musical instruments, when he was asked about buying a piano.",
    ],
  },
  {
    word: "deferential",
    type: "adjective",
    meanings: ["showing respect for another's authority"],
    examples: [
      "His deferential attitudetoward her made her more confident in her ability to run the company.",
    ],
  },
  {
    word: "defile",
    type: "verb",
    meanings: ["to make unclean", "impure"],
    examples: [
      "She defiled the calm of the religious building byplaying her banjo.",
    ],
  },
  {
    word: "deft",
    type: "adjective",
    meanings: ["skillful", "capable"],
    examples: [
      "Having worked in a bakery for many years, Marcus was adeft bread maker.",
    ],
  },
  {
    word: "defunct",
    type: "adjective",
    meanings: ["no longer used or existing"],
    examples: [
      "They planned to turn the defunct schoolhouseinto a community center.",
    ],
  },
  {
    word: "delegate",
    type: "verb",
    meanings: ["to hand over responsibility for something"],
    examples: [
      "The dean delegated the task offinding a new professor to a special hiring committee.",
    ],
  },
  {
    word: "deleterious",
    type: "adjective",
    meanings: ["harmful"],
    examples: [
      "She experienced the deleterious effects of running amarathon without stretching her muscles enough beforehand.",
    ],
  },
  {
    word: "deliberate",
    type: "adjective",
    meanings: ["intentional", "reflecting careful consideration"],
    examples: [
      "Though Mary was quiteupset, her actions to resolve the dispute were deliberate.",
    ],
  },
  {
    word: "delineate",
    type: "verb",
    meanings: ["to describe", "outline", "shed light on"],
    examples: [
      "She neatly delineated her reasons forcanceling the project's funding.",
    ],
  },
  {
    word: "demagogue",
    type: "noun",
    meanings: ["a leader who appeals to a people's prejudices"],
    examples: [
      "The demagoguestrengthened his hold over his people by blaming immigrants for the lack of jobs.",
    ],
  },
  {
    word: "demarcation",
    type: "noun",
    meanings: ["the marking of boundaries or categories"],
    examples: [
      "Different cultures havedifferent demarcations of good and evil.",
    ],
  },
  {
    word: "demean",
    type: "verb",
    meanings: ["to lower the status or stature of something"],
    examples: [
      "She refused to demean hersecretary by making him order her lunch.",
    ],
  },
  {
    word: "demure",
    type: "adjective",
    meanings: ["quiet", "modest", "reserved"],
    examples: [
      "Though everyone else at the party was dancingand going crazy, she remained demure.",
    ],
  },
  {
    word: "denigrate",
    type: "verb",
    meanings: ["to belittle", "diminish the opinion of"],
    examples: [
      "The company decided that itsadvertisements would no longer denigrate the company's competitors.",
    ],
  },
  {
    word: "denounce",
    type: "verb",
    meanings: ["to criticize publicly"],
    examples: ["The senator denounced her opponent as a greedypolitician."],
  },
  {
    word: "deplore",
    type: "verb",
    meanings: ["to feel or express sorrow", "disapproval"],
    examples: [
      "We all deplored the miserableworking conditions in the factory.",
    ],
  },
  {
    word: "depravity",
    type: "noun",
    meanings: ["wickedness"],
    examples: [
      "Rumors of the ogre's depravity made the children afraid toenter the forest.",
    ],
  },
  {
    word: "deprecate",
    type: "verb",
    meanings: ["to belittle", "depreciate"],
    examples: [
      "Always over-modest, he deprecated hiscontribution to the local charity.",
    ],
  },
  {
    word: "derelict",
    type: "adjective",
    meanings: ["abandoned", "run-down"],
    examples: [
      "Even though it was dangerous, the childrenenjoyed going to the deserted lot and playing in the derelict house.",
    ],
  },
  {
    word: "deride",
    type: "verb",
    meanings: ["to laugh at mockingly", "scorn"],
    examples: ["The bullies derided the foreign student'saccent."],
  },
  {
    word: "derivative",
    type: "adjective",
    meanings: ["taken directly from a source", "unoriginal"],
    examples: [
      "She was bored by his musicbecause she felt that it was derivative and that she had heard it before.",
    ],
  },
  {
    word: "desecrate",
    type: "verb",
    meanings: ["to violate the sacredness of a thing or place"],
    examples: [
      "They feared that theconstruction of a golf course would desecrate the preserved wilderness.",
    ],
  },
  {
    word: "desiccated",
    type: "adjective",
    meanings: ["dried up", "dehydrated"],
    examples: ["The skin of the desiccated mummy looked likeold paper."],
  },
  {
    word: "desolate",
    type: "adjective",
    meanings: ["deserted", "dreary", "lifeless"],
    examples: [
      "She found the desolate landscape quite acontrast to the hustle and bustle of the overcrowded city.",
    ],
  },
  {
    word: "despondent",
    type: "adjective",
    meanings: ["feeling depressed", "discouraged", "hopeless"],
    examples: [
      "Having failed the firstmath test, the despondent child saw no use in studying for the next and failed thatone too.",
    ],
  },
  {
    word: "despot",
    type: "noun",
    meanings: ["one who has total power and rules brutally"],
    examples: [
      "The despot issued a deathsentence for anyone who disobeyed his laws.",
    ],
  },
  {
    word: "destitute",
    type: "adjective",
    meanings: ["impoverished", "utterly lacking"],
    examples: [
      "The hurricane destroyed many homesand left many families destitute.",
    ],
  },
  {
    word: "deter",
    type: "verb",
    meanings: ["to discourage", "prevent from doing"],
    examples: [
      "Bob's description of scary snakes couldn'tdeter Marcia from traveling in the rainforests.",
    ],
  },
  {
    word: "devious",
    type: "adjective",
    meanings: ["not straightforward", "deceitful"],
    examples: [
      "Not wanting to be punished, the deviousgirl blamed the broken vase on the cat.",
    ],
  },
  {
    word: "dialect",
    type: "noun",
    meanings: ["a variation of a language"],
    examples: [
      "In the country's remote, mountainous regions, theinhabitants spoke a dialect that the country's other inhabitants had difficultyunderstanding.",
    ],
  },
  {
    word: "diaphanous",
    type: "adjective",
    meanings: ["light", "airy", "transparent"],
    examples: [
      "Sunlight poured in through the diaphanouscurtains, brightening the room.",
    ],
  },
  {
    word: "didactic",
    type: "adjective",
    meanings: ["intended to instruct"],
    examples: [
      "She wrote up a didactic document showing newemployees how to handle the company's customers.",
    ],
  },
  {
    word: "didactic",
    type: "adjective",
    meanings: ["overly moralistic"],
    examples: [
      "Hisdidactic style of teaching made it seem like he wanted to persuade his students not tounderstand history fully, but to understand it from only one point of view.",
    ],
  },
  {
    word: "diffident",
    type: "adjective",
    meanings: ["shy", "quiet", "modest"],
    examples: [
      "While eating dinner with the adults, the diffidentyouth did not speak for fear of seeming presumptuous.",
    ],
  },
  {
    word: "diffuse",
    type: "verb",
    meanings: ["to scatter", "thin out", "break up"],
    examples: ["He diffused the tension in the room bymaking in a joke."],
  },
  {
    word: "diffuse",
    type: "adjective",
    meanings: ["not concentrated", "scattered", "disorganized"],
    examples: [
      "In herwritings, she tried unsuccessfully to make others understand her diffuse thoughts.",
    ],
  },
  {
    word: "dilatory",
    type: "adjective",
    meanings: ["tending to delay", "causing delay"],
    examples: ["The general's dilatory strategy enabledthe enemy to regroup."],
  },
  {
    word: "diligent",
    type: "adjective",
    meanings: ["showing care in doing one's work"],
    examples: [
      "The diligent researcher made sure tocheck her measurements multiple times.",
    ],
  },
  {
    word: "diminutive",
    type: "adjective",
    meanings: ["small or miniature"],
    examples: ["The bullies, tall and strong, picked on thediminutive child."],
  },
  {
    word: "dirge",
    type: "noun",
    meanings: ["a mournful song", "especially for a funeral"],
    examples: [
      "The bagpipers played a dirge as thecasket was carried to the cemetery.",
    ],
  },
  {
    word: "ed",
    type: "adjective",
    meanings: ["rebellious", "resentful of authority"],
    examples: [
      "Dismayed by Bobby's poorbehavior, the parents sent their disaffected son to a military academy to bedisciplined.",
    ],
  },
  {
    word: "disavow",
    type: "verb",
    meanings: ["to deny knowledge of or responsibility for"],
    examples: [
      "Not wanting others to criticizeher, she disavowed any involvement in the company's hiring scandal.",
    ],
  },
  {
    word: "discern",
    type: "verb",
    meanings: ["to perceive", "detect"],
    examples: [
      "Though he hid his emotions, she discerned from his bodylanguage that he was angry.",
    ],
  },
  {
    word: "disclose",
    type: "verb",
    meanings: ["to reveal", "make public"],
    examples: [
      "The CEO disclosed to the press that the companywould have to fire several employees.",
    ],
  },
  {
    word: "discomfit",
    type: "verb",
    meanings: ["to thwart", "baffle"],
    examples: [
      "The normally cheery and playful children's suddenmisery discomfited the teacher.",
    ],
  },
  {
    word: "discordant",
    type: "adjective",
    meanings: ["not agreeing", "not in harmony with"],
    examples: [
      "The girls' sobs were a discordantsound amid the general laughter that filled the restaurant.",
    ],
  },
  {
    word: "discrepancy",
    type: "noun",
    meanings: ["difference", "failure of things to correspond"],
    examples: [
      "He was troubled by thediscrepancy between what he remembered paying for the appliance and what hisreceipt showed he paid for it.",
    ],
  },
  {
    word: "discretion",
    type: "noun",
    meanings: [
      "the quality of being reserved in speech or action; good judgment",
    ],
    examples: [
      "Notwanting her patient to get overly anxious, the doctor used discretion in deciding howmuch to tell the patient about his condition.",
    ],
  },
  {
    word: "discursive",
    type: "adjective",
    meanings: ["rambling", "lacking order"],
    examples: [
      "The professor's discursive lectures seemed tobe about every subject except the one initially described.",
    ],
  },
  {
    word: "disdain",
    type: "verb",
    meanings: ["to scorn", "hold in low esteem"],
    examples: [
      "Insecure about their jobs, the olderemployees disdained the recently hired ones, who were young and capable.",
    ],
  },
  {
    word: "disdain",
    type: "noun",
    meanings: ["scorn", "low esteem"],
    examples: [
      "After learning of his immoral actions, Justine held Lawrence indisdain.",
    ],
  },
  {
    word: "disgruntled",
    type: "adjective",
    meanings: ["upset", "not content"],
    examples: [
      "The child believed that his parents had unjustlygrounded him, and remained disgruntled for a week.",
    ],
  },
  {
    word: "disheartened",
    type: "adjective",
    meanings: ["feeling a loss of spirit or morale"],
    examples: [
      "The team was disheartened afterlosing in the finals of the tournament.",
    ],
  },
  {
    word: "disparage",
    type: "verb",
    meanings: ["to criticize or speak ill of"],
    examples: [
      "The saleswoman disparaged the competitor'sproducts to persuade her customers to buy what she was selling.",
    ],
  },
  {
    word: "disparate",
    type: "adjective",
    meanings: ["sharply differing", "containing sharply contrasting elements"],
    examples: [
      "Havingwidely varying interests, the students had disparate responses toward the novel.",
    ],
  },
  {
    word: "dispatch",
    type: "verb",
    meanings: ["to send off to accomplish a duty"],
    examples: ["The carpenter dispatched his assistant tofetch wood."],
  },
  {
    word: "dispel",
    type: "verb",
    meanings: ["to drive away", "scatter"],
    examples: [
      "She entered the office as usual on Monday, dispellingthe rumor that she had been fired.",
    ],
  },
  {
    word: "disperse",
    type: "verb",
    meanings: ["to scatter", "cause to scatter"],
    examples: [
      "When the rain began to pour, the crowd at thebaseball game quickly dispersed.",
    ],
  },
  {
    word: "disrepute",
    type: "noun",
    meanings: ["a state of being held in low regard"],
    examples: [
      "The officer fell into disrepute after itwas learned that he had disobeyed the orders he had given to his own soldiers.",
    ],
  },
  {
    word: "dissemble",
    type: "verb",
    meanings: ["to conceal", "fake"],
    examples: [
      "Not wanting to appear heartlessly greedy, shedissembled and hid her intention to sell her ailing father's stamp collection.",
    ],
  },
  {
    word: "disseminate",
    type: "verb",
    meanings: ["to spread widely"],
    examples: [
      "The politician disseminated his ideas across the townbefore the election.",
    ],
  },
  {
    word: "dissent",
    type: "verb",
    meanings: ["to disagree"],
    examples: [
      "The principal argued that the child should repeat the fourthgrade, but the unhappy parents dissented.",
    ],
  },
  {
    word: "dissent",
    type: "noun",
    meanings: ["the act of disagreeing"],
    examples: [
      "Unconvinced that the defendant was guilty, the last juror voiced his dissent withthe rest of the jury.",
    ],
  },
  {
    word: "dissipate",
    type: "verb",
    meanings: ["to disappear", "cause to disappear"],
    examples: ["The sun finally came out anddissipated the haze."],
  },
  {
    word: "dissipate",
    type: "verb",
    meanings: ["to waste"],
    examples: ["She dissipated her fortune on a series of badinvestments."],
  },
  {
    word: "dissonance",
    type: "noun",
    meanings: ["lack of harmony or consistency"],
    examples: [
      "Though the president of the companyoften spoke of the company as reliant solely upon its workers, her decision to increaseher own salary rather than reward her employees revealed a striking dissonancebetween her alleged beliefs and her actions.",
    ],
  },
  {
    word: "dissuade",
    type: "verb",
    meanings: ["to persuade someone not to do something"],
    examples: [
      "Worried that he would catch acold, she tried to dissuade him from going out on winter nights.",
    ],
  },
  {
    word: "distend",
    type: "verb",
    meanings: ["to swell out"],
    examples: ["Years of drinking beer caused his stomach to distend."],
  },
  {
    word: "dither",
    type: "verb",
    meanings: ["to be indecisive"],
    examples: [
      "Not wanting to offend either friend, he dithered aboutwhich of the two birthday parties he should attend.",
    ],
  },
  {
    word: "divine",
    type: "adjective",
    meanings: ["godly", "exceedingly wonderful"],
    examples: [
      "Terribly fond of desserts, she found the richchocolate cake to be divine.",
    ],
  },
  {
    word: "divisive",
    type: "adjective",
    meanings: ["causing dissent", "discord"],
    examples: [
      "Her divisive tactics turned her two friendsagainst each other.",
    ],
  },
  {
    word: "divulge",
    type: "verb",
    meanings: ["to reveal something secret"],
    examples: [
      "Pressured by the press, the government finallydivulged the previously unknown information.",
    ],
  },
  {
    word: "docile",
    type: "adjective",
    meanings: ["easily taught or trained"],
    examples: ["She successfully taught the docile puppy severaltricks."],
  },
  {
    word: "dogmatic",
    type: "adjective",
    meanings: ["aggressively and arrogantly certain about unproved principles"],
    examples: [
      "Hisdogmatic claim that men were better than women at fixing appliances angeredeveryone.",
    ],
  },
  {
    word: "dormant",
    type: "adjective",
    meanings: ["sleeping", "temporarily inactive"],
    examples: [
      "Though she pretended everything wasfine, her anger lay dormant throughout the dinner party and exploded in screams ofrage after everyone had left.",
    ],
  },
  {
    word: "dour",
    type: "adjective",
    meanings: ["stern", "joyless"],
    examples: [
      "The children feared their dour neighbor because the old manwould take their toys if he believed they were being too loud.",
    ],
  },
  {
    word: "dubious",
    type: "adjective",
    meanings: ["doubtful", "of uncertain quality"],
    examples: [
      "Suspicious that he was only trying to get araise, she found his praise dubious.",
    ],
  },
  {
    word: "duplicity",
    type: "noun",
    meanings: ["crafty dishonesty"],
    examples: [
      "His duplicity involved convincing his employees to lethim lower their salaries and increase their stock options, and then to steal the moneyhe saved and run the company into the ground.",
    ],
  },
  {
    word: "duress",
    type: "noun",
    meanings: ["hardship", "threat"],
    examples: [
      "It was only under intense duress that he, who wasnormally against killing, fired his gun.",
    ],
  },
  {
    word: "dynamic",
    type: "adjective",
    meanings: ["actively changing"],
    examples: [
      "The parents found it hard to keep up with thedynamic music scene with which their children had become very familiar.",
    ],
  },
  {
    word: "ebullient",
    type: "adjective",
    meanings: ["extremely lively", "enthusiastic"],
    examples: [
      "She became ebullient upon receiving anacceptance letter from her first-choice college.",
    ],
  },
  {
    word: "eclectic",
    type: "adjective",
    meanings: ["consisting of a diverse variety of elements"],
    examples: [
      "That bar attracts an eclecticcrowd: lawyers, artists, circus clowns, and investment bankers.",
    ],
  },
  {
    word: "ecstatic",
    type: "adjective",
    meanings: ["intensely and overpoweringly happy"],
    examples: [
      "The couple was ecstatic when theylearned that they had won the lottery.",
    ],
  },
  {
    word: "edict",
    type: "noun",
    meanings: ["an order", "decree"],
    examples: [
      "The ruler issued an edict requiring all of his subjects to bowdown before him.",
    ],
  },
  {
    word: "efface",
    type: "verb",
    meanings: ["to wipe out", "obliterate", "rub away"],
    examples: [
      "The husband was so angry at his wife forleaving him that he effaced all evidence of her presence; he threw out pictures of herand gave away all her belongings.",
    ],
  },
  {
    word: "effervescent",
    type: "adjective",
    meanings: ["bubbly", "lively"],
    examples: ["My friend is so effervescent that she makes everyonesmile."],
  },
  {
    word: "efficacious",
    type: "adjective",
    meanings: ["effective"],
    examples: [
      "My doctor promised me that the cold medicine wasefficacious, but I'm still sniffling.",
    ],
  },
  {
    word: "effrontery",
    type: "noun",
    meanings: ["impudence", "nerve", "insolence"],
    examples: [
      "When I told my aunt that she was boring,my mother scolded me for my effrontery.",
    ],
  },
  {
    word: "effulgent",
    type: "adjective",
    meanings: ["radiant", "splendorous"],
    examples: ["The golden palace was effulgent."],
  },
  {
    word: "egregious",
    type: "adjective",
    meanings: ["extremely bad"],
    examples: [
      "The student who threw sloppy joes across the cafeteriawas punished for his egregious behavior.",
    ],
  },
  {
    word: "elaborate",
    type: "adjective",
    meanings: ["complex", "detailed", "intricate"],
    examples: [
      "Dan always beats me at chess because hedevelops such an elaborate game plan that I can never predict his next move.",
    ],
  },
  {
    word: "elated",
    type: "adjective",
    meanings: ["overjoyed", "thrilled"],
    examples: [
      "When she found out she had won the lottery, thewriter was elated.",
    ],
  },
  {
    word: "elegy",
    type: "noun",
    meanings: ["a speech given in honor of a dead person"],
    examples: [
      "At the funeral, the widow gave amoving elegy describing her love for her husband.",
    ],
  },
  {
    word: "elicit",
    type: "verb",
    meanings: ["to bring forth", "draw out", "evoke"],
    examples: [
      "Although I asked several times where the exitwas, I elicited no response from the stone-faced policeman.",
    ],
  },
  {
    word: "eloquent",
    type: "adjective",
    meanings: ["expressive", "articulate", "moving"],
    examples: [
      "The priest gave such an eloquent sermonthat most churchgoers were crying.",
    ],
  },
  {
    word: "elucidate",
    type: "verb",
    meanings: ["to clarify", "explain"],
    examples: [
      "I didn't understand why my friend was so angry withme, so I asked Janine to elucidate her feelings.",
    ],
  },
  {
    word: "elude",
    type: "verb",
    meanings: ["to evade", "escape"],
    examples: [
      "Despite an intense search, the robber continues to elude thepolice.",
    ],
  },
  {
    word: "emaciated",
    type: "adjective",
    meanings: ["very thin", "enfeebled looking"],
    examples: [
      "My sister eats a lot of pastries andchocolate but still looks emaciated.",
    ],
  },
  {
    word: "embellish",
    type: "verb",
    meanings: ["to decorate", "adorn"],
    examples: ["My mom embellished the living room by addinglace curtains."],
  },
  {
    word: "embellish",
    type: "verb",
    meanings: ["to add details to", "enhance"],
    examples: [
      'When Harry told me that he had"done stuff" on his vacation, I asked him to embellish upon his account.',
    ],
  },
  {
    word: "embezzle",
    type: "verb",
    meanings: ["to steal money by falsifying records"],
    examples: [
      "The accountant was fired forembezzling $10,000 of the company's funds.",
    ],
  },
  {
    word: "emend",
    type: "verb",
    meanings: ["to correct or revise a written text"],
    examples: [
      "If my sentence is incorrect, the editor willemend what I have written.",
    ],
  },
  {
    word: "eminent",
    type: "adjective",
    meanings: ["distinguished", "prominent", "famous"],
    examples: [
      "Mr. Phillips is such an eminentscholar that every professor on campus has come to hear him lecture.",
    ],
  },
  {
    word: "eminent",
    type: "adjective",
    meanings: ["conspicuous"],
    examples: ["There is an eminent stain on that shirt."],
  },
  {
    word: "emollient",
    type: "adjective",
    meanings: ["soothing"],
    examples: ["This emollient cream makes my skin very smooth."],
  },
  {
    word: "emote",
    type: "verb",
    meanings: ["to express emotion"],
    examples: [
      "The director told the actor he had to emote, or else theaudience would have no idea what his character was going through.",
    ],
  },
  {
    word: "empathy",
    type: "noun",
    meanings: ["sensitivity to another's feelings as if they were one's own"],
    examples: [
      "I feel suchempathy for my sister when she's in pain that I cry too.",
    ],
  },
  {
    word: "empirical",
    type: "adjective",
    meanings: ["based on observation or experience"],
    examples: [
      "The scientist gathered empiricaldata on the growth rate of dandelions by studying the dandelions behind his house.",
    ],
  },
  {
    word: "empirical",
    type: "adjective",
    meanings: ["capable of being proved or disproved by experiment"],
    examples: [
      "That all cats hategetting wet is an empirical statement: I can test it by bathing my cat, Trinket.",
    ],
  },
  {
    word: "emulate",
    type: "verb",
    meanings: ["to imitate"],
    examples: [
      "I idolize Britney Spears so much that I emulate everything shedoes: I wear her outfits, sing along to her songs, and date a boy named Justin.",
    ],
  },
  {
    word: "enamor",
    type: "verb",
    meanings: [
      "to fill with love",
      "fascinate",
      'usually used in passive form followed by "of" or"with"',
    ],
    examples: [
      "I grew enamored of that boy when he quoted my favorite love poem.",
    ],
  },
  {
    word: "encore",
    type: "noun",
    meanings: [
      "the audience's demand for a repeat performance; also the artist'sperformance in response to that demand",
    ],
    examples: [
      'At the end of the concert, all the fansyelled, "Encore! Encore!" but the band did not come out to play again.',
    ],
  },
  {
    word: "encumber",
    type: "verb",
    meanings: ["to weigh down", "burden"],
    examples: [
      "At the airport, my friend was encumbered byher luggage, so I offered to carry two of her bags.",
    ],
  },
  {
    word: "enervate",
    type: "verb",
    meanings: ["to weaken", "exhaust"],
    examples: [
      "Writing these sentences enervates me so much that Iwill have to take a nap after I finish.",
    ],
  },
  {
    word: "enfranchise",
    type: "verb",
    meanings: ["to grant the vote to"],
    examples: ["The Nineteenth Amendment enfranchisedwomen."],
  },
  {
    word: "engender",
    type: "verb",
    meanings: ["to bring about", "create", "generate"],
    examples: [
      "During the Olympics, the victories ofU.S. athletes engender a patriotic spirit among Americans.",
    ],
  },
  {
    word: "enigmatic",
    type: "adjective",
    meanings: ["mystifying", "cryptic"],
    examples: [
      "That man wearing the dark suit and dark glasses isso enigmatic that no one even knows his name.",
    ],
  },
  {
    word: "enmity",
    type: "noun",
    meanings: ["ill will", "hatred", "hostility"],
    examples: [
      "Mark and Andy have clearly not forgiven eachother, because the enmity between them is obvious to anyone in their presence.",
    ],
  },
  {
    word: "ennui",
    type: "noun",
    meanings: ["boredom", "weariness"],
    examples: [
      "I feel such ennui that I don't look forward to anything,not even my birthday party.",
    ],
  },
  {
    word: "entail",
    type: "verb",
    meanings: ["to include as a necessary step"],
    examples: ["Building a new fence entails tearing down theold one."],
  },
  {
    word: "enthrall",
    type: "verb",
    meanings: ["to charm", "hold spellbound"],
    examples: [
      "The sailor's stories of fighting off sharks andfinding ancient treasures enthralled his young son.",
    ],
  },
  {
    word: "ephemeral",
    type: "adjective",
    meanings: ["short-lived", "fleeting"],
    examples: [
      'She promised she\'d love me forever, but her"forever" was only ephemeral: she left me after one week.',
    ],
  },
  {
    word: "epistolary",
    type: "adjective",
    meanings: ["relating to or contained in letters"],
    examples: [
      'Some people call me "Auntie\'s boy,"because my aunt and I have such a close epistolary relationship that we write eachother every day.',
    ],
  },
  {
    word: "epitome",
    type: "noun",
    meanings: ["a perfect example", "embodiment"],
    examples: [
      "My mother, the epitome of good taste,always dresses more elegantly than I do.",
    ],
  },
  {
    word: "equanimity",
    type: "noun",
    meanings: ["composure"],
    examples: [
      "Even though he had just been fired, Mr. Simms showedgreat equanimity by neatly packing up his desk and wishing everyone in the officewell.",
    ],
  },
  {
    word: "equivocal",
    type: "adjective",
    meanings: ["ambiguous", "uncertain", "undecided"],
    examples: [
      "His intentions were so equivocalthat I didn't know whether he was being chivalrous or sleazy.",
    ],
  },
  {
    word: "erudite",
    type: "adjective",
    meanings: ["learned"],
    examples: [
      "My Latin teacher is such an erudite scholar that he has translatedsome of the most difficult and abstruse ancient poetry.",
    ],
  },
  {
    word: "eschew",
    type: "verb",
    meanings: ["to shun", "avoid"],
    examples: [
      "George hates the color green so much that he eschews allgreen food.",
    ],
  },
  {
    word: "esoteric",
    type: "adjective",
    meanings: ["understood by only a select few"],
    examples: [
      "Even the most advanced studentscannot understand the physicist's esoteric theories.",
    ],
  },
  {
    word: "espouse",
    type: "verb",
    meanings: ["to take up as a cause", "support"],
    examples: ["I love animals so much that I espouse animalrights."],
  },
  {
    word: "ethereal",
    type: "adjective",
    meanings: ["heavenly", "exceptionally delicate or refined"],
    examples: [
      "In her flowing silk gown andlace veil, the bride looked ethereal.",
    ],
  },
  {
    word: "etymology",
    type: "noun",
    meanings: ["the history of words", "their origin and development"],
    examples: [
      'From the study ofetymology, I know that the word "quixotic" derives from Don Quixote and theword "gaudy" refers to the Spanish architect Gaudí.',
    ],
  },
  {
    word: "euphoric",
    type: "adjective",
    meanings: ["elated", "uplifted"],
    examples: [
      "I was euphoric when I found out that my sister hadgiven birth to twins.",
    ],
  },
  {
    word: "evanescent",
    type: "adjective",
    meanings: ["fleeting", "momentary"],
    examples: [
      "My joy at getting promoted was evanescentbecause I discovered that I would have to work much longer hours in a less friendlyoffice.",
    ],
  },
  {
    word: "evince",
    type: "verb",
    meanings: ["to show", "reveal"],
    examples: [
      "Christopher's hand-wringing and nail-biting evince hownervous he is about the upcoming English test.",
    ],
  },
  {
    word: "exacerbate",
    type: "verb",
    meanings: ["to make more violent", "intense"],
    examples: [
      "The gruesome and scary movie I saw lastnight exacerbated my fears of the dark.",
    ],
  },
  {
    word: "exalt",
    type: "verb",
    meanings: ["to glorify", "praise"],
    examples: ["Michael Jordan is the figure in basketball we exalt the most."],
  },
  {
    word: "exasperate",
    type: "verb",
    meanings: ["to irritate", "irk"],
    examples: ["George's endless complaints exasperated his roomate."],
  },
  {
    word: "excavate",
    type: "verb",
    meanings: ["to dig out of the ground and remove"],
    examples: [
      "The pharaoh's treasures wereexcavated by archeologists in Egypt.",
    ],
  },
  {
    word: "exculpate",
    type: "verb",
    meanings: ["to free from guilt or blame", "exonerate"],
    examples: [
      "My discovery of the ring behindthe dresser exculpated me from the charge of having stolen it.",
    ],
  },
  {
    word: "excursion",
    type: "noun",
    meanings: ["a trip or outing"],
    examples: [
      "After taking an excursion to the Bronx Zoo, I dreamedabout pandas and monkeys.",
    ],
  },
  {
    word: "execrable",
    type: "adjective",
    meanings: ["loathsome", "detestable"],
    examples: ["Her pudding is so execrable that it makes mesick."],
  },
  {
    word: "exhort",
    type: "verb",
    meanings: ["to urge", "prod", "spur"],
    examples: [
      "Henry exhorted his colleagues to join him in protestingagainst the university's hiring policies.",
    ],
  },
  {
    word: "exigent",
    type: "adjective",
    meanings: ["urgent", "critical"],
    examples: [
      "The patient has an exigent need for medication, or else hewill lose his sight.",
    ],
  },
  {
    word: "exonerate",
    type: "verb",
    meanings: ["to free from guilt or blame", "exculpate"],
    examples: [
      "The true thief's confessionexonerated the man who had been held in custody for the crime.",
    ],
  },
  {
    word: "exorbitant",
    type: "adjective",
    meanings: ["excessive"],
    examples: ["Her exorbitant praise made me blush and squirm in myseat."],
  },
  {
    word: "expedient",
    type: "adjective",
    meanings: ["advisable", "advantageous", "serving one's self-interest"],
    examples: [
      "In his bid forreelection, the governor made an expedient move by tabling all controversiallegislation.",
    ],
  },
  {
    word: "expiate",
    type: "verb",
    meanings: ["to make amends for", "atone"],
    examples: ["To expiate my selfishness, I gave all my profits tocharity."],
  },
  {
    word: "expunge",
    type: "verb",
    meanings: ["to obliterate", "eradicate"],
    examples: [
      "Fearful of an IRS investigation, Paul tried toexpunge all incriminating evidence from his tax files.",
    ],
  },
  {
    word: "expurgate",
    type: "verb",
    meanings: ["to remove offensive or incorrect parts", "usually of a book"],
    examples: [
      "The historyeditors expurgated from the text all disparaging and inflammatory comments aboutthe Republican Party.",
    ],
  },
  {
    word: "extant",
    type: "adjective",
    meanings: ["existing", "not destroyed or lost"],
    examples: [
      "My mother's extant love letters to myfather are in the attic trunk.",
    ],
  },
  {
    word: "extol",
    type: "verb",
    meanings: ["to praise", "revere"],
    examples: [
      "Violet extolled the virtues of a vegetarian diet to her meatlovingbrother.",
    ],
  },
  {
    word: "extraneous",
    type: "adjective",
    meanings: ["irrelevant", "extra", "not necessary"],
    examples: [
      "Personal political ambitions shouldalways remain extraneous to legislative policy, but, unfortunately, they rarely are.",
    ],
  },
  {
    word: "extricate",
    type: "verb",
    meanings: ["to disentangle"],
    examples: [
      "Instead of trying to mediate between my brother andsister, I extricated myself from the family tension entirely and left the house for theday.",
    ],
  },
  {
    word: "exult",
    type: "verb",
    meanings: ["to rejoice"],
    examples: [
      "When she found out she won the literature prize, Mary exulted bydancing and singing through the school's halls.",
    ],
  },
  {
    word: "fabricate",
    type: "verb",
    meanings: ["to make up", "invent"],
    examples: [
      "When I arrived an hour late to class, I fabricated someexcuse about my car breaking down on the way to school.",
    ],
  },
  {
    word: "facade",
    type: "noun",
    meanings: ["the wall of a building"],
    examples: ["Meet me in front of the museum's main facade."],
  },
  {
    word: "facade",
    type: "noun",
    meanings: ["a deceptive appearance or attitude"],
    examples: ["Despite my smiling facade, I am feelingmelancholy."],
  },
  {
    word: "facile",
    type: "adjective",
    meanings: ["easy", "requiring little effort"],
    examples: ["This game is so facile that even a four-yearoldcan master it."],
  },
  {
    word: "facile",
    type: "adjective",
    meanings: [
      "superficial",
      "achieved with minimal thought or care",
      "insincere",
    ],
    examples: [
      "The business was in such shambles that any solution seemed facile at best;nothing could really helpit in the long-run.",
    ],
  },
  {
    word: "fallacious",
    type: "adjective",
    meanings: ["incorrect", "misleading"],
    examples: [
      "Emily offered me cigarettes on the fallaciousassumption that I smoked.",
    ],
  },
  {
    word: "fastidious",
    type: "adjective",
    meanings: [
      "meticulous",
      "demanding",
      "having high and often unattainable standards",
    ],
    examples: [
      "Mark is so fastidious that he is never able to finish a project because it always seemsimperfect to him.",
    ],
  },
  {
    word: "fathom",
    type: "verb",
    meanings: ["to understand", "comprehend"],
    examples: [
      "I cannot fathom why you like that crabby andmean-spirited neighbor of ours.",
    ],
  },
  {
    word: "fatuous",
    type: "adjective",
    meanings: ["silly", "foolish"],
    examples: [
      "He considers himself a serious poet, but in truth, he onlywrites fatuous limericks.",
    ],
  },
  {
    word: "fecund",
    type: "adjective",
    meanings: ["fruitful", "fertile"],
    examples: [
      "The fecund tree bore enough apples to last us through theentire season.",
    ],
  },
  {
    word: "felicitous",
    type: "adjective",
    meanings: ["well suited", "apt"],
    examples: [
      "While his comments were idiotic and rambling, minewere felicitous and helpful.",
    ],
  },
  {
    word: "felicitous",
    type: "adjective",
    meanings: ["delightful", "pleasing"],
    examples: ["I spent a felicitousafternoon visiting old friends."],
  },
  {
    word: "feral",
    type: "adjective",
    meanings: ["wild", "savage"],
    examples: [
      "That beast looks so feral that I would fear being alone with it.",
    ],
  },
  {
    word: "fervent",
    type: "adjective",
    meanings: ["ardent", "passionate"],
    examples: [
      "The fervent protestors chained themselves to thebuilding and shouted all night long.",
    ],
  },
  {
    word: "fetid",
    type: "adjective",
    meanings: ["having a foul odor"],
    examples: [
      "I can tell from the fetid smell in your refrigerator thatyour milk has spoiled.",
    ],
  },
  {
    word: "fetter",
    type: "verb",
    meanings: ["to chain", "restrain"],
    examples: ["The dog was fettered to the parking meter."],
  },
  {
    word: "fickle",
    type: "adjective",
    meanings: ["shifting in character", "inconstant"],
    examples: [
      "In Greek dramas, the fickle gods helpAchilles one day, and then harm him the next.",
    ],
  },
  {
    word: "fidelity",
    type: "noun",
    meanings: ["loyalty", "devotion"],
    examples: [
      "Guard dogs are known for the great fidelity they showtoward their masters.",
    ],
  },
  {
    word: "figurative",
    type: "adjective",
    meanings: ["symbolic"],
    examples: [
      "Using figurative language, Jane likened the storm to anangry bull.",
    ],
  },
  {
    word: "flabbergasted",
    type: "adjective",
    meanings: ["astounded"],
    examples: [
      "Whenever I read an Agatha Christie mystery novel, Iam always flabbergasted when I learn the identity of the murderer.",
    ],
  },
  {
    word: "flaccid",
    type: "adjective",
    meanings: ["limp", "not firm or strong"],
    examples: [
      "If a plant is not watered enough, its leavesbecome droopy and flaccid.",
    ],
  },
  {
    word: "flagrant",
    type: "adjective",
    meanings: ["offensive", "egregious"],
    examples: [
      "The judge's decision to set the man free simplybecause that man was his brother was a flagrant abuse of power.",
    ],
  },
  {
    word: "florid",
    type: "adjective",
    meanings: ["flowery", "ornate"],
    examples: [
      "The writer's florid prose belongs on a sentimentalHallmark card.",
    ],
  },
  {
    word: "flout",
    type: "verb",
    meanings: ["to disregard or disobey openly"],
    examples: [
      "I flouted the school's dress code by wearing atie-dyed tank top and a pair of cut-off jeans.",
    ],
  },
  {
    word: "foil",
    type: "verb",
    meanings: ["to thwart", "frustrate", "defeat"],
    examples: [
      "Inspector Wilkens foiled the thieves by locking themin the bank along with their stolen money.",
    ],
  },
  {
    word: "forage",
    type: "verb",
    meanings: ["to graze", "rummage for food"],
    examples: [
      "When we got lost on our hiking trip, we foragedfor berries and nuts in order to survive.",
    ],
  },
  {
    word: "forbearance",
    type: "noun",
    meanings: ["patience", "restraint", "toleration"],
    examples: [
      "The doctor showed great forbearance incalming down the angry patient who shouted insults at him.",
    ],
  },
  {
    word: "forestall",
    type: "verb",
    meanings: ["to prevent", "thwart", "delay"],
    examples: [
      "I forestalled the cold I was getting by takingplenty of vitamin C pills and wearing a scarf.",
    ],
  },
  {
    word: "forlorn",
    type: "adjective",
    meanings: ["lonely", "abandoned", "hopeless"],
    examples: [
      "Even though I had the flu, my familydecided to go skiing for the weekend and leave me home alone, feeling feverish andforlorn.",
    ],
  },
  {
    word: "forsake",
    type: "verb",
    meanings: ["to give up", "renounce"],
    examples: ["My New Year's resolution is to forsake smoking anddrinking."],
  },
  {
    word: "fortitude",
    type: "noun",
    meanings: ["strength", "guts"],
    examples: ["Achilles' fortitude in battle is legendary."],
  },
  {
    word: "fortuitous",
    type: "adjective",
    meanings: ["happening by chance", "often lucky or fortunate"],
    examples: [
      "After looking forManuel and not finding him at home, Harriet had a fortuitous encounter with himat the post office.",
    ],
  },
  {
    word: "forum",
    type: "noun",
    meanings: ["a medium for lecture or discussion"],
    examples: [
      "Some radio talk-shows provide a goodforum for political debate.",
    ],
  },
  {
    word: "foster",
    type: "verb",
    meanings: ["to stimulate", "promote", "encourage"],
    examples: [
      'To foster good health in the city, the mayorstarted a "Get out and exercise!" campaign.',
    ],
  },
  {
    word: "fractious",
    type: "adjective",
    meanings: ["troublesome or irritable"],
    examples: [
      "Although the child insisted he wasn't tired, hisfractious behavior—especially his decision to crush his cheese and crackers all overthe floor—convinced everyone present that it was time to put him to bed.",
    ],
  },
  {
    word: "fraught",
    type: "adjective",
    meanings: [""],
    examples: ['usually used with "with"'],
  },
  {
    word: "fraught",
    type: "adjective",
    meanings: ['(usually used with "with") filled or accompanied with'],
    examples: [
      "Her glances in hisdirection were fraught with meaning, though precisely what meaning remainedunclear.",
    ],
  },
  {
    word: "frenetic",
    type: "adjective",
    meanings: ["frenzied", "hectic", "frantic"],
    examples: [
      "In the hours between night and morning, thefrenetic pace of city life slows to a lull.",
    ],
  },
  {
    word: "frivolous",
    type: "adjective",
    meanings: ["of little importance", "trifling"],
    examples: [
      "Someday, all that anxiety about whetheryour zit will disappear before the prom will seem totally frivolous.",
    ],
  },
  {
    word: "frugal",
    type: "adjective",
    meanings: ["thrifty", "economical"],
    examples: [
      "Richard is so frugal that his diet consists almostexclusively of catfish and chicken liver—the two most inexpensive foods in thestore.",
    ],
  },
  {
    word: "furtive",
    type: "adjective",
    meanings: ["secretive", "sly"],
    examples: [
      "Jane's placement of her drugs in her sock drawer was not asfurtive as she thought, as the sock drawer is the first place most parents look.",
    ],
  },
  {
    word: "garish",
    type: "adjective",
    meanings: ["gaudy", "in bad taste"],
    examples: [
      "Mrs. Watson has poor taste and covers every object inher house with a garish gold lamé.",
    ],
  },
  {
    word: "garrulous",
    type: "adjective",
    meanings: ["talkative", "wordy"],
    examples: [
      "Some talk show hosts are so garrulous that theirguests can't get a word in edgewise.",
    ],
  },
  {
    word: "genial",
    type: "adjective",
    meanings: ["friendly", "affable"],
    examples: [
      "Although he's been known to behave like a real jerk, Iwould say that my brother is an overall genial guy.",
    ],
  },
  {
    word: "gluttony",
    type: "noun",
    meanings: ["overindulgence in food or drink"],
    examples: [
      "Ada's fried chicken tastes so divine, Idon't know how anyone can call gluttony a sin.",
    ],
  },
  {
    word: "goad",
    type: "verb",
    meanings: ["to urge", "spur", "incite to action"],
    examples: [
      "Jim may think he's not going to fight Billy, butBilly will goad Jim on with insults until he throws a punch.",
    ],
  },
  {
    word: "gourmand",
    type: "noun",
    meanings: ["someone fond of eating and drinking"],
    examples: [
      "My parents, who used to eat littlemore than crackers and salad, have become real gourmands in their old age.",
    ],
  },
  {
    word: "grandiloquence",
    type: "noun",
    meanings: ["lofty", "pompous language"],
    examples: [
      "The student thought her grandiloquencewould make her sound smart, but neither the class nor the teacher bought it.",
    ],
  },
  {
    word: "grandiose",
    type: "adjective",
    meanings: ["on a magnificent or exaggerated scale"],
    examples: [
      "Margaret planned a grandioseparty, replete with elephants, trapeze artists, and clowns.",
    ],
  },
  {
    word: "gratuitous",
    type: "adjective",
    meanings: ["uncalled for", "unwarranted"],
    examples: [
      "Every morning the guy at the donut shopgives me a gratuitous helping of ketchup packets.",
    ],
  },
  {
    word: "gregarious",
    type: "adjective",
    meanings: ["drawn to the company of others", "sociable"],
    examples: [
      "Well, if you're notgregarious, I don't know why you would want to go to a singles party!",
    ],
  },
  {
    word: "grievous",
    type: "adjective",
    meanings: ["injurious", "hurtful; serious or grave in nature"],
    examples: [
      "Electrocuting the inmatewithout being sure of his guilt would be a truly grievous mistake.",
    ],
  },
  {
    word: "guile",
    type: "noun",
    meanings: ["deceitful", "cunning", "sly behavior"],
    examples: [
      "Because of his great guile, the politician wasable to survive scandal after scandal.",
    ],
  },
  {
    word: "hackneyed",
    type: "adjective",
    meanings: ["unoriginal", "trite"],
    examples: [
      'A girl can only hear "I love you" so many timesbefore it begins to sound hackneyed and meaningless.',
    ],
  },
  {
    type: "adjective",
    meanings: ["revered", "consecrated"],
    examples: [
      "In the hallowed corridors of the cathedral, the disturbed professor felt himself to be at peace.",
    ],
  },
  {
    word: "hapless",
    type: "adjective",
    meanings: ["unlucky"],
    examples: [
      "My poor, hapless family never seems to pick a sunny week to go on vacation.",
    ],
  },
  {
    word: "harangue",
    type: "noun",
    meanings: ["a ranting speech"],
    examples: [
      "Everyone had heard the teacher's harangue about gum chewing in class before.",
    ],
  },
  {
    word: "harangue",
    type: "verb",
    meanings: ["to give such a speech"],
    examples: [
      "But this time the teacher harangued the class about the importance of brushing your teeth after chewing gum.",
    ],
  },
  {
    word: "hardy",
    type: "adjective",
    meanings: ["robust", "capable of surviving through adverse conditions"],
    examples: [
      "I too would have expected the plants to be dead by mid-November, but apparently they're very hardy.",
    ],
  },
  {
    word: "harrowing",
    type: "adjective",
    meanings: ["greatly distressing", "vexing"],
    examples: [
      "The car crash was a harrowing experience, but I have a feeling that the increase in my insurance premiums will be even more upsetting.",
    ],
  },
  {
    word: "haughty",
    type: "adjective",
    meanings: ["disdainfully proud"],
    examples: [
      "The superstar's haughty dismissal of her costars will backfire on her someday.",
    ],
  },
  {
    word: "hedonist",
    type: "noun",
    meanings: [
      "one who believes pleasure should be the primary pursuit of humans",
    ],
    examples: [
      "Because he's such a hedonist, I knew Murray would appreciate the 11 cases of wine I bought him for his birthday.",
    ],
  },
  {
    word: "hegemony",
    type: "noun",
    meanings: ["domination over others"],
    examples: [
      "Britain's hegemony over its colonies was threatened once nationalist sentiment began to spread around the world.",
    ],
  },
  {
    word: "heinous",
    type: "adjective",
    meanings: ["shockingly wicked", "repugnant"],
    examples: [
      "The killings were made all the more heinous by the fact that the murderer first tortured his victims for three days.",
    ],
  },
  {
    word: "heterogeneous",
    type: "adjective",
    meanings: ["varied", "diverse in character"],
    examples: [
      "I hate having only one flavor so I always buy the swirled, or should I say heterogeneous, type of ice cream.",
    ],
  },
  {
    word: "hiatus",
    type: "noun",
    meanings: ["a break or gap in duration or continuity"],
    examples: [
      "The hiatus in service should last two or three months-until the cable lines are repaired .",
    ],
  },
  {
    word: "hierarchy",
    type: "noun",
    meanings: [
      "a system with ranked groups",
      "usually according to social",
      "economic",
      "or professional class",
    ],
    examples: [
      "Women found it very difficult to break into the upper ranks of the department's hierarchy.",
    ],
  },
  {
    word: "hypocrisy",
    type: "noun",
    meanings: ["pretending to believe what one does not"],
    examples: [
      "Once the politician began passing legislation that contradicted his campaign promises, his hypocrisy became apparent.",
    ],
  },
  {
    word: "hypothetical",
    type: "adjective",
    meanings: ["supposed or assumed true", "but unproven"],
    examples: [
      "Even though it has been celebrated by seven major newspapers, that the drug will be a success when tested in humans is still hypothetical.",
    ],
  },
  {
    word: "iconoclast",
    type: "noun",
    meanings: ["one who attacks common beliefs or institutions"],
    examples: [
      "Jane goes to one protest after another, but she seems to be an iconoclast rather than an activist with a progressive agenda.",
    ],
  },
  {
    word: "idiosyncratic",
    type: "adjective",
    meanings: ["peculiar to one person; highly individualized"],
    examples: [
      "I know you had trouble with the last test, but because your mistakes were highly idiosyncratic, I'm going to deny your request that the class be given a new test.",
    ],
  },
  {
    word: "idolatrous",
    type: "adjective",
    meanings: ["excessively worshipping one object or person"],
    examples: [
      "Xena's idolatrous fawning over the band-following them on tour, starting their fan club, filming their documentary-is really beginning to get on my nerves.",
    ],
  },
  {
    word: "ignominious",
    type: "adjective",
    meanings: ["humiliating", "disgracing"],
    examples: [
      "It was really ignominious to be kicked out of the dorm for having an illegal gas stove in my room.",
    ],
  },
  {
    word: "illicit",
    type: "adjective",
    meanings: ["forbidden", "not permitted"],
    examples: [
      "The fourth-grader learned many illicit words from a pamphlet that was being passed around school.",
    ],
  },
  {
    word: "immerse",
    type: "verb",
    meanings: ["to absorb", "deeply involve", "engross"],
    examples: [
      "After breaking up with her boyfriend, Nancy decided to immerse herself in her work in order to avoid crying.",
    ],
  },
  {
    word: "immutable",
    type: "adjective",
    meanings: ["not changeable"],
    examples: ["The laws of physics are immutable and constant."],
  },
  {
    word: "impassive",
    type: "adjective",
    meanings: ["stoic", "not susceptible to suffering"],
    examples: [
      "Stop being so impassive; it's healthy to cry every now and then.",
    ],
  },
  {
    word: "impeccable",
    type: "adjective",
    meanings: ["exemplary", "flawless"],
    examples: [
      "If your grades were as impeccable as your sister's, then you too would receive a car for a graduation present.",
    ],
  },
  {
    word: "impecunious",
    type: "adjective",
    meanings: ["poor"],
    examples: [
      '"I fear he\'s too impecunious to take me out tonight," the bratty girl whined.',
    ],
  },
  {
    word: "imperative",
    type: "adjective",
    meanings: ["necessary", "pressing"],
    examples: [
      "It is imperative that you have these folders organized by midday.",
    ],
  },
  {
    word: "imperative",
    type: "noun",
    meanings: ["a rule", "command", "or order"],
    examples: [
      "Her imperative to have the folders organized by midday was perceived as ridiculous by the others.",
    ],
  },
  {
    word: "imperious",
    type: "adjective",
    meanings: ["commanding", "domineering"],
    examples: [
      "The imperious nature of your manner led me to dislike you at once.",
    ],
  },
  {
    word: "impertinent",
    type: "adjective",
    meanings: ["rude", "insolent"],
    examples: [
      "Most of your comments are so impertinent that I don't wish to dignify them with an answer.",
    ],
  },
  {
    word: "impervious",
    type: "adjective",
    meanings: ["impenetrable", "incapable of being affected"],
    examples: [
      "Because of their thick layer of fur, many seals are almost impervious to the cold.",
    ],
  },
  {
    word: "impetuous",
    type: "adjective",
    meanings: ["rash; hastily done"],
    examples: [
      "Hilda's hasty slaying of the king was an impetuous, thoughtless action.",
    ],
  },
  {
    word: "impinge",
    type: "verb",
    meanings: ["to impact", "affect", "make an impression"],
    examples: ["The hail impinged the roof, leaving large dents."],
  },
  {
    word: "impinge",
    type: "verb",
    meanings: ["to encroach", "infringe"],
    examples: [
      "I apologize for impinging upon you like this, but I really need to use your bathroom. Now.",
    ],
  },
  {
    word: "implacable",
    type: "adjective",
    meanings: ["incapable of being appeased or mitigated"],
    examples: [
      "Watch out: once you shun Grandma's cooking, she is totally implacable.",
    ],
  },
  {
    word: "implement",
    type: "noun",
    meanings: ["an instrument", "utensil", "tool"],
    examples: [
      "Do you have a knife or some other sort of implement that I could use to pry the lid off of this jar?",
    ],
  },
  {
    word: "implement",
    type: "verb",
    meanings: ["to put into effect", "to institute"],
    examples: [
      "After the first town curfew failed to stop the graffiti problem, the mayor implemented a new policy to use security cameras to catch perpetrators in the act.",
    ],
  },
  {
    word: "implicate",
    type: "verb",
    meanings: ["to involve in an incriminating way", "incriminate"],
    examples: [
      "Even though Tom wasn't present at the time of the shooting, he was implicated by the evidence suggesting that he had supplied the shooters with guns.",
    ],
  },
  {
    word: "implicit",
    type: "adjective",
    meanings: ["understood but not outwardly obvious", "implied"],
    examples: [
      "I know Professor Smith didn't actually say not to write from personal experience, but I think such a message was implicit in her instruction to use scholarly sources.",
    ],
  },
  {
    word: "impregnable",
    type: "adjective",
    meanings: ["resistant to capture or penetration"],
    examples: [
      "Though the invaders used battering rams, catapults, and rain dances, the fortress proved impregnable and resisted all attacks.",
    ],
  },
  {
    word: "impudent",
    type: "adjective",
    meanings: ["casually rude", "insolent", "impertinent"],
    examples: [
      "The impudent young man looked the princess up and down and told her she was hot even though she hadn't asked him.",
    ],
  },
  {
    word: "impute",
    type: "verb",
    meanings: ["to ascribe", "blame"],
    examples: [
      "The CEO imputed the many typos in the letter to his lazy secretary.",
    ],
  },
  {
    word: "inane",
    type: "adjective",
    meanings: ["silly and meaningless"],
    examples: [
      "Some films are so inane that the psychology of the characters makes absolutely no sense.",
    ],
  },
  {
    word: "inarticulate",
    type: "adjective",
    meanings: ["incapable of expressing oneself clearly through speech"],
    examples: [
      "Though he spoke for over an hour, the lecturer was completely inarticulate and the students had no idea what he was talking about.",
    ],
  },
  {
    word: "incarnate",
    type: "adjective",
    meanings: ["existing in the flesh", "embodied"],
    examples: ["In the church pageant, I play the role of greed incarnate."],
  },
  {
    word: "incarnate",
    type: "verb",
    meanings: ["to give human form to"],
    examples: [
      "The alien evaded detection by incarnating himself in a human form.",
    ],
  },
  {
    word: "incendiary",
    type: "noun",
    meanings: ["a person who agitates"],
    examples: [
      'If we catch the incendiary who screamed "bomb" in the middle of the soccer match, we\'re going to put him in jail.',
    ],
  },
  {
    word: "incendiary",
    type: "adjective",
    meanings: ["inflammatory", "causing combustion"],
    examples: [
      "Gas and lighter fluid are incendiary materials that should be kept out of hot storage areas.",
    ],
  },
  {
    word: "incessant",
    type: "adjective",
    meanings: ["unending"],
    examples: [
      "We wanted to go outside and play, but the incessant rain kept us indoors for two days.",
    ],
  },
  {
    word: "inchoate",
    type: "adjective",
    meanings: ["unformed or formless", "in a beginning stage"],
    examples: [
      "The country's government is still inchoate and, because it has no great tradition, quite unstable.",
    ],
  },
  {
    word: "incisive",
    type: "adjective",
    meanings: ["clear", "sharp", "direct"],
    examples: [
      "The discussion wasn't going anywhere until her incisive comment allowed everyone to see what the true issues were.",
    ],
  },
  {
    word: "inclination",
    type: "noun",
    meanings: ["a tendency", "propensity"],
    examples: [
      "Sarah has an inclination to see every foreign film she hears about, even when she's sure that she won't like it.",
    ],
  },
  {
    word: "incontrovertible",
    type: "adjective",
    meanings: ["indisputable"],
    examples: [
      "Only stubborn Tina would attempt to disprove the incontrovertible laws of physics.",
    ],
  },
  {
    word: "incorrigible",
    type: "adjective",
    meanings: ["incapable of correction", "delinquent"],
    examples: [
      "You can buy Grandma nicotine gum all you want, but I think that after sixty-five years of smoking she's incorrigible.",
    ],
  },
  {
    word: "increment",
    type: "noun",
    meanings: ["an enlargement; the process of increasing"],
    examples: ["The workmen made the wall longer, increment by increment."],
  },
  {
    word: "incumbent",
    type: "noun",
    meanings: ["one who holds an office"],
    examples: ["The incumbent senator is already serving his fifth term."],
  },
  {
    word: "incumbent",
    type: "adjective",
    meanings: ["obligatory"],
    examples: [
      "It is incumbent upon this organization to offer aid to all who seek it.",
    ],
  },
  {
    word: "indefatigable",
    type: "adjective",
    meanings: ["incapable of defeat", "failure", "decay"],
    examples: [
      "Even after traveling 62 miles, the indefatigable runner kept on moving.",
    ],
  },
  {
    word: "indigenous",
    type: "adjective",
    meanings: ["originating in a region"],
    examples: [
      "Some fear that these plants, which are not indigenous to the region, may choke out the vegetation that is native to the area.",
    ],
  },
  {
    word: "indigent",
    type: "adjective",
    meanings: ["very poor", "impoverished"],
    examples: [
      "I would rather donate money to help the indigent population than to the park sculpture fund.",
    ],
  },
  {
    word: "indignation",
    type: "noun",
    meanings: ["anger sparked by something unjust or unfair"],
    examples: [
      "I resigned from the sorority because of my indignation at its hazing of new members.",
    ],
  },
  {
    word: "indolent",
    type: "adjective",
    meanings: ["lazy"],
    examples: [
      "Why should my indolent children, who can't even pick themselves up off the couch to pour their own juice, be rewarded with a trip to the mall?",
    ],
  },
  {
    word: "indomitable",
    type: "adjective",
    meanings: ["not capable of being conquered"],
    examples: [
      "To be honest, Jim, my indomitable nature means I could never take orders from anyone, and especially not from a jerk like you.",
    ],
  },
  {
    word: "induce",
    type: "verb",
    meanings: ["to bring about", "stimulate"],
    examples: [
      "Who knew that our decision to boycott school lunch would induce a huge riot?",
    ],
  },
  {
    word: "ineffable",
    type: "adjective",
    meanings: ["unspeakable", "incapable of being expressed through words"],
    examples: [
      "It is said that the experience of playing with a dolphin is ineffable and can only be understood through direct encounter.",
    ],
  },
  {
    word: "inept",
    type: "adjective",
    meanings: ["not suitable or capable", "unqualified"],
    examples: [
      "She proved how inept she was when she forgot three orders and spilled a beer in a customer's lap.",
    ],
  },
  {
    word: "inexorable",
    type: "adjective",
    meanings: ["incapable of being persuaded or placated"],
    examples: [
      "Although I begged for hours, Mom was inexorable and refused to let me stay out all night after the prom.",
    ],
  },
  {
    word: "inextricable",
    type: "adjective",
    meanings: ["hopelessly tangled or entangled"],
    examples: [
      "Unless I look at the solution manual, I have no way of solving this inextricable problem.",
    ],
  },
  {
    word: "infamy",
    type: "noun",
    meanings: ["notoriety", "extreme ill repute"],
    examples: ["The infamy of his crime will not lessen as the decades pass."],
  },
  {
    word: "infusion",
    type: "noun",
    meanings: [
      "an injection of one substance into another; the permeation of one substance by another",
    ],
    examples: [
      "The infusion of Eastern religion into Western philosophy created interesting new schools of thought.",
    ],
  },
  {
    word: "ingenious",
    type: "adjective",
    meanings: ["clever", "resourceful"],
    examples: [
      "Her ingenious use of walnuts instead of the peanuts called for by the recipe was lauded by the other garden club members who found her cake delicious.",
    ],
  },
  {
    word: "ingenuous",
    type: "adjective",
    meanings: ["not devious; innocent and candid"],
    examples: [
      "He must have writers, but his speeches seem so ingenuous it's hard to believe he's not speaking from his own heart.",
    ],
  },
  {
    word: "inhibit",
    type: "verb",
    meanings: ["to prevent", "restrain", "stop"],
    examples: [
      "When I told you I needed the car last night, I certainly never meant to inhibit you from going out.",
    ],
  },
  {
    word: "inimical",
    type: "adjective",
    meanings: ["hostile", "enemylike"],
    examples: [
      "I don't see how I could ever work for a company that was so cold and inimical to me during my interviews.",
    ],
  },
  {
    word: "iniquity",
    type: "noun",
    meanings: ["wickedness or sin"],
    examples: [
      '"Your iniquity," said the priest to the practical jokester, "will be forgiven."',
    ],
  },
  {
    word: "injunction",
    type: "noun",
    meanings: ["an order of official warning"],
    examples: [
      "After his house was toilet-papered for the fifth time, the mayor issued an injunction against anyone younger than 21 buying toilet paper.",
    ],
  },
  {
    word: "innate",
    type: "adjective",
    meanings: ["inborn", "native", "inherent"],
    examples: [
      "His incredible athletic talent is innate, he never trains, lifts weights, or practices.",
    ],
  },
  {
    word: "innocuous",
    type: "adjective",
    meanings: ["harmless", "inoffensive"],
    examples: [
      "In spite of their innocuous appearance, these mushrooms are actually quite poisonous.",
    ],
  },
  {
    word: "innovate",
    type: "verb",
    meanings: ["to do something in an unprecedented way"],
    examples: [
      "Because of the stiff competition, the company knew it needed to pour a lot of energy into innovating new and better products.",
    ],
  },
  {
    word: "innuendo",
    type: "noun",
    meanings: ["an insinuation"],
    examples: [
      "During the debate, the politician made several innuendos about the sexual activities of his opponent.",
    ],
  },
  {
    word: "inoculate",
    type: "verb",
    meanings: [
      "to introduce a microorganism",
      "serum",
      "or vaccine into an organism in order to increase immunity to illness; to vaccinate",
    ],
    examples: [
      "I've feared needles ever since I was inoculated against 37 diseases at age one; but I have also never been sick.",
    ],
  },
  {
    word: "inquisitor",
    type: "noun",
    meanings: ["one who inquires", "especially in a hostile manner"],
    examples: [
      "The inquisitor was instructed to knock on every door in town in order to find the fugitive.",
    ],
  },
  {
    word: "insatiable",
    type: "adjective",
    meanings: ["incapable of being satisfied"],
    examples: [
      "My insatiable appetite for melons can be a real problem in the winter.",
    ],
  },
  {
    word: "insidious",
    type: "adjective",
    meanings: ["appealing but imperceptibly harmful", "seductive"],
    examples: [
      "Lisa's insidious chocolate cake tastes so good but makes you feel so sick later on!",
    ],
  },
  {
    word: "insinuate",
    type: "verb",
    meanings: ["to suggest indirectly or subtly"],
    examples: [
      "I wish Luke and Spencer would stop insinuating that my perfect report card is the result of anything other than my superior intelligence and good work habits.",
    ],
  },
  {
    word: "insipid",
    type: "adjective",
    meanings: ["dull", "boring"],
    examples: ["The play was so insipid, I fell asleep halfway through."],
  },
  {
    word: "insolent",
    type: "adjective",
    meanings: ["rude", "arrogant", "overbearing"],
    examples: [
      "That celebrity is so insolent, making fun of his fans right to their faces.",
    ],
  },
  {
    word: "instigate",
    type: "verb",
    meanings: ["to urge", "goad"],
    examples: [
      "The demagogue instigated the crowd into a fury by telling them that they had been cheated by the federal government.",
    ],
  },
  {
    word: "insular",
    type: "adjective",
    meanings: ["separated and narrow-minded; tight-knit", "closed off"],
    examples: [
      "Because of the sensitive nature of their jobs, those who work for the CIA must remain insular and generally only spend time with each other.",
    ],
  },
  {
    word: "insurgent",
    type: "noun",
    meanings: ["one who rebels"],
    examples: [
      "The insurgent snuck into and defaced a different classroom each night until the administration agreed to meet his demands.",
    ],
  },
  {
    word: "integral",
    type: "adjective",
    meanings: ["necessary for completeness"],
    examples: [
      "Without the integral ingredient of flour, you wouldn't be able to make bread.",
    ],
  },
  {
    word: "interject",
    type: "verb",
    meanings: ["to insert between other things"],
    examples: [
      "During our conversation, the cab driver occasionally interjected his opinion.",
    ],
  },
  {
    word: "interlocutor",
    type: "noun",
    meanings: ["someone who participates in a dialogue or conversation"],
    examples: [
      "When the officials could not come to an agreement over the correct cover of the flags, the prime minister acted as an interlocutor.",
    ],
  },
  {
    word: "interminable",
    type: "adjective",
    meanings: ["without possibility of end"],
    examples: [
      "The fact that biology lectures came just before lunch made them seem interminable.",
    ],
  },
  {
    word: "intimation",
    type: "noun",
    meanings: ["an indirect suggestion"],
    examples: [
      "Mr. Brinford's intimation that he would soon pass away occurred when he began to discuss how to distribute his belongings among his children.",
    ],
  },
  {
    word: "intractable",
    type: "adjective",
    meanings: ["difficult to manipulate", "unmanageable"],
    examples: [
      "There was no end in sight to the intractable conflict between the warring countries.",
    ],
  },
  {
    word: "intransigent",
    type: "adjective",
    meanings: ["refusing to compromise", "often on an extreme opinion"],
    examples: [
      "The intransigent child said he would have 12 scoops of ice cream, or he would bang his head against the wall until his mother fainted from fear.",
    ],
  },
  {
    word: "intrepid",
    type: "adjective",
    meanings: ["brave in the face of danger"],
    examples: [
      "After scaling a live volcano prior to its eruption, the explorer was praised for his intrepid attitude.",
    ],
  },
  {
    word: "inundate",
    type: "verb",
    meanings: ["to flood with abundance"],
    examples: [
      "Because I am the star of a new sitcom, my fans are sure to inundate me with fan mail and praise.",
    ],
  },
  {
    word: "inure",
    type: "verb",
    meanings: [
      "to cause someone or something to become accustomed to a situation",
    ],
    examples: [
      "Twenty years in the salt mines inured the man to the discomforts of dirt and grime.",
    ],
  },
  {
    word: "invective",
    type: "noun",
    meanings: ["an angry verbal attack"],
    examples: [
      "My mother's irrational invective against the way I dress only made me decide to dye my hair green.",
    ],
  },
  {
    word: "inveterate",
    type: "adjective",
    meanings: ["stubbornly established by habit"],
    examples: [
      "I'm the first to admit that I'm an inveterate coffee drinker-I drink four cups a day.",
    ],
  },
  {
    word: "inviolable",
    type: "adjective",
    meanings: ["secure from assault"],
    examples: [
      "Nobody was ever able to break into Batman's inviolable Batcave.",
    ],
  },
  {
    word: "irascible",
    type: "adjective",
    meanings: ["easily angered"],
    examples: [
      "At the smallest provocation, my irascible cat will begin scratching and clawing.",
    ],
  },
  {
    word: "iridescent",
    type: "adjective",
    meanings: ["showing rainbow colors"],
    examples: [
      "The bride's large diamond ring was iridescent in the afternoon sun.",
    ],
  },
  {
    word: "irreverence",
    type: "noun",
    meanings: ["disrespect"],
    examples: [
      "The irreverence displayed by the band that marched through the chapel disturbed many churchgoers.",
    ],
  },
  {
    word: "irrevocable",
    type: "adjective",
    meanings: ["incapable of being taken back"],
    examples: ["The Bill of Rights is an irrevocable part of American law."],
  },
  {
    word: "jubilant",
    type: "adjective",
    meanings: ["extremely joyful", "happy"],
    examples: [
      "The crowd was jubilant when the firefighter carried the woman from the flaming building.",
    ],
  },
  {
    word: "judicious",
    type: "adjective",
    meanings: ["having or exercising sound judgment"],
    examples: [
      "When the judicious king decided to compromise rather than send his army to its certain death, he was applauded.",
    ],
  },
  {
    word: "juxtaposition",
    type: "noun",
    meanings: [
      "the act of placing two things next to each other for implicit comparison",
    ],
    examples: [
      "The interior designer admired my juxtaposition of the yellow couch and green table.",
    ],
  },
  {
    word: "knell",
    type: "noun",
    meanings: ["the solemn sound of a bell", "often indicating a death"],
    examples: [
      "Echoing throughout our village, the funeral knell made the stormy day even more grim.",
    ],
  },
  {
    word: "kudos",
    type: "noun",
    meanings: ["praise for an achievement"],
    examples: [
      "After the performance, the reviewers gave the opera singer kudos for a job well done.",
    ],
  },
  {
    word: "laceration",
    type: "noun",
    meanings: ["a cut", "tear"],
    examples: [
      "Because he fell off his bike into a rosebush, the paperboy's skin was covered with lacerations.",
    ],
  },
  {
    word: "laconic",
    type: "adjective",
    meanings: ["terse in speech or writing"],
    examples: [
      "The author's laconic style has won him many followers who dislike wordiness.",
    ],
  },
  {
    word: "languid",
    type: "adjective",
    meanings: ["sluggish from fatigue or weakness"],
    examples: [
      "In the summer months, the great heat makes people languid and lazy.",
    ],
  },
  {
    word: "larceny",
    type: "noun",
    meanings: ["obtaining another's property by theft or trickery"],
    examples: [
      "When my car was not where I had left it, I realized that I was a victim of larceny.",
    ],
  },
  {
    word: "largess",
    type: "noun",
    meanings: ["the generous giving of lavish gifts"],
    examples: ["My boss demonstrated great largess by giving me a new car."],
  },
  {
    word: "latent",
    type: "adjective",
    meanings: ["hidden", "but capable of being exposed"],
    examples: [
      "Sigmund's dream represented his latent paranoid obsession with other people's shoes.",
    ],
  },
  {
    word: "laudatory",
    type: "adjective",
    meanings: ["expressing admiration or praise"],
    examples: [
      "Such laudatory comments are unusual from someone who is usually so reserved in his opinions.",
    ],
  },
  {
    word: "lavish",
    type: "adjective",
    meanings: ["given without limits"],
    examples: [
      "Because they had worked very hard, the performers appreciated the critic's lavish praise.",
    ],
  },
  {
    word: "lavish",
    type: "verb",
    meanings: ["to give without limits"],
    examples: [
      "Because the performers had worked hard, they deserved the praise that the critic lavished on them.",
    ],
  },
  {
    word: "legerdemain",
    type: "noun",
    meanings: ["deception", "slight-of-hand"],
    examples: [
      "Smuggling the French plants through customs by claiming that they were fake was a remarkable bit of legerdemain.",
    ],
  },
  {
    word: "lenient",
    type: "adjective",
    meanings: ["demonstrating tolerance or gentleness"],
    examples: [
      "Because Professor Oglethorpe allowed his students to choose their final grades, the other teachers believed that he was excessively lenient.",
    ],
  },
  {
    word: "lethargic",
    type: "adjective",
    meanings: ["in a state of sluggishness or apathy"],
    examples: [
      "When Jean Claude explained to his boss that he was lethargic and didn't feel like working that day, the boss fired him.",
    ],
  },
  {
    word: "liability",
    type: "noun",
    meanings: [
      "something for which one is legally responsible",
      "usually involving a disadvantage or risk",
    ],
    examples: [
      "The bungee-jumping tower was a great liability for the owners of the carnival.",
    ],
  },
  {
    word: "liability",
    type: "noun",
    meanings: ["a handicap", "burden"],
    examples: [
      "Because she often lost her concentration and didn't play defense, Marcy was a liability to the team.",
    ],
  },
  {
    word: "libertarian",
    type: "adjective",
    meanings: ["advocating principles of liberty and free will"],
    examples: [
      "The dissatisfied subjects overthrew the monarch and replaced him with a libertarian ruler who respected their democratic principles.",
    ],
  },
  {
    word: "licentious",
    type: "adjective",
    meanings: ["displaying a lack of moral or legal restraints"],
    examples: [
      "Marilee has always been fascinated by the licentious private lives of politicians.",
    ],
  },
  {
    word: "limpid",
    type: "adjective",
    meanings: ["clear", "transparent"],
    examples: [
      "Mr. Johnson's limpid writing style greatly pleased readers who disliked complicated novels.",
    ],
  },
  {
    word: "linchpin",
    type: "noun",
    meanings: ["something that holds separate parts together"],
    examples: [
      "The linchpin in the prosecution's case was the hair from the defendant's head, which was found at the scene of the crime.",
    ],
  },
  {
    word: "lithe",
    type: "adjective",
    meanings: ["graceful", "flexible", "supple"],
    examples: [
      "Although the dancers were all outstanding, Jae Sun's control of her lithe body was particularly impressive.",
    ],
  },
  {
    word: "litigant",
    type: "noun",
    meanings: ["someone engaged in a lawsuit"],
    examples: [
      "When the litigants began screaming at each other, Judge Koch ordered them to be silent.",
    ],
  },
  {
    word: "lucid",
    type: "adjective",
    meanings: ["clear", "easily understandable"],
    examples: [
      "Because Guenevere's essay was so lucid, I only had to read it once to understand her reasoning.",
    ],
  },
  {
    word: "luminous",
    type: "adjective",
    meanings: ["brightly shining"],
    examples: [
      "The light of the luminous moon graced the shoulders of the beautiful maiden.",
    ],
  },
  {
    word: "lurid",
    type: "adjective",
    meanings: ["ghastly", "sensational"],
    examples: [
      "Gideon's story, in which he described a character torturing his sister's dolls, was judged too lurid to be printed in the school's literary magazine.",
    ],
  },
  {
    word: "maelstrom",
    type: "noun",
    meanings: ["a destructive whirlpool which rapidly sucks in objects"],
    examples: [
      "Little did the explorers know that as they turned the next bend of the calm river a vicious maelstrom would catch their boat.",
    ],
  },
  {
    word: "magnanimous",
    type: "adjective",
    meanings: ["noble", "generous"],
    examples: [
      "Although I had already broken most of her dishes, Jacqueline was magnanimous enough to continue letting me use them.",
    ],
  },
  {
    word: "malediction",
    type: "noun",
    meanings: ["a curse"],
    examples: [
      "When I was arrested for speeding, I screamed maledictions against the policeman and the entire police department.",
    ],
  },
  {
    word: "malevolent",
    type: "adjective",
    meanings: ["wanting harm to befall others"],
    examples: [
      "The malevolent old man sat in the park all day, tripping unsuspecting passersby with his cane.",
    ],
  },
  {
    word: "malleable",
    type: "adjective",
    meanings: ["capable of being shaped or transformed"],
    examples: [
      "Maximillian's political opinions were so malleable that anyone he talked to was able to change his mind instantly.",
    ],
  },
  {
    word: "mandate",
    type: "noun",
    meanings: ["an authoritative command"],
    examples: ["In the Old Testament, God mandates that no one should steal."],
  },
  {
    word: "manifest",
    type: "adjective",
    meanings: ["easily understandable", "obvious"],
    examples: [
      "When I wrote the wrong sum on the chalkboard, my mistake was so manifest that the entire class burst into laughter.",
    ],
  },
  {
    word: "manifest",
    type: "verb",
    meanings: ["to show plainly"],
    examples: [
      "His illness first manifested itself with particularly violent hiccups.",
    ],
  },
  {
    word: "manifold",
    type: "adjective",
    meanings: ["diverse", "varied"],
    examples: [
      "The popularity of Dante's Inferno is partly due to the fact that the work allows for manifold interpretations.",
    ],
  },
  {
    word: "maudlin",
    type: "adjective",
    meanings: ["weakly sentimental"],
    examples: [
      "Although many people enjoy romantic comedies, I usually find them maudlin and shallow.",
    ],
  },
  {
    word: "maverick",
    type: "noun",
    meanings: ["an independent", "nonconformist person"],
    examples: [
      "Andreas is a real maverick and always does things his own way.",
    ],
  },
  {
    word: "mawkish",
    type: "adjective",
    meanings: ["characterized by sick sentimentality"],
    examples: [
      "Although some nineteenthcentury critics viewed Dickens's writing as mawkish, contemporary readers have found great emotional depth in his works.",
    ],
  },
  {
    word: "maxim",
    type: "noun",
    meanings: ["a common saying expressing a principle of conduct"],
    examples: [
      "Miss Manners's etiquette maxims are both entertaining and instructional.",
    ],
  },
  {
    word: "meager",
    type: "adjective",
    meanings: ["deficient in size or quality"],
    examples: ["My meager portion of food did nothing to satisfy my appetite."],
  },
  {
    word: "medley",
    type: "noun",
    meanings: ["a mixture of differing things"],
    examples: [
      "Susannah's wardrobe contained an astonishing medley of colors, from olive green to fluorescent pink.",
    ],
  },
  {
    word: "mendacious",
    type: "adjective",
    meanings: ["having a lying", "false character"],
    examples: [
      "The mendacious content of the tabloid magazines is at least entertaining.",
    ],
  },
  {
    word: "mercurial",
    type: "adjective",
    meanings: ["characterized by rapid change or temperamentality"],
    examples: [
      "Though he was widely respected for his mathematical proofs, the mercurial genius was impossible to live with.",
    ],
  },
  {
    word: "meritorious",
    type: "adjective",
    meanings: ["worthy of esteem or reward"],
    examples: [
      "Manfred was given the congressional medal of honor for his meritorious actions.",
    ],
  },
  {
    word: "metamorphosis",
    type: "noun",
    meanings: ["the change of form", "shape", "substance"],
    examples: [
      "Winnifred went to the gym every day for a year and underwent a metamorphosis from a waiflike girl to an athletic woman.",
    ],
  },
  {
    word: "meticulous",
    type: "adjective",
    meanings: ["extremely careful with details"],
    examples: [
      "The ornate needlework in the bride's gown was a product of meticulous handiwork.",
    ],
  },
  {
    word: "mitigate",
    type: "verb",
    meanings: ["to make less violent", "alleviate"],
    examples: [
      "When I had an awful sore throat, only warm tea would mitigate the pain.",
    ],
  },
  {
    word: "moderate",
    type: "adjective",
    meanings: ["not extreme"],
    examples: [
      "Luckily, the restaurant we chose had moderate prices; none of us have any money.",
    ],
  },
  {
    word: "moderate",
    type: "noun",
    meanings: ["one who expresses moderate opinions"],
    examples: [
      "Because he found both the liberal and conservative proposals too excessive, Mr. Park sided with the moderates.",
    ],
  },
  {
    word: "modicum",
    type: "noun",
    meanings: ["a small amount of something"],
    examples: [
      "Refusing to display even a modicum of sensitivity, Henrietta announced her boss's affair in front of the entire office.",
    ],
  },
  {
    word: "modulate",
    type: "verb",
    meanings: ["to pass from one state to another", "especially in music"],
    examples: [
      "The composer wrote a piece that modulated between minor and major keys.",
    ],
  },
  {
    word: "mollify",
    type: "verb",
    meanings: ["to soften in temper"],
    examples: [
      "The police officer mollified the angry woman by giving her a warning instead of a ticket.",
    ],
  },
  {
    word: "morass",
    type: "noun",
    meanings: [
      "a wet swampy bog; figuratively",
      "something that traps and confuses",
    ],
    examples: [
      "When Theresa lost her job, she could not get out of her financial morass.",
    ],
  },
  {
    word: "mores",
    type: "noun",
    meanings: ["the moral attitudes and fixed customs of a group of people."],
    examples: [
      "Mores change over time; many things that were tolerated in 1975 are no longer seen as being socially acceptable.",
    ],
  },
  {
    word: "morose",
    type: "adjective",
    meanings: ["gloomy or sullen"],
    examples: ["Jason's morose nature made him very unpleasant to talk to."],
  },
  {
    word: "multifarious",
    type: "adjective",
    meanings: ["having great diversity or variety"],
    examples: [
      "This Swiss Army knife has multifarious functions and capabilities. Among other things, it can act as a knife, a saw, a toothpick, and a slingshot.",
    ],
  },
  {
    word: "mundane",
    type: "adjective",
    meanings: [
      "concerned with the world rather than with heaven",
      "commonplace",
    ],
    examples: [
      "He is more concerned with the mundane issues of day-to-day life than with spiritual topics.",
    ],
  },
  {
    word: "munificence",
    type: "noun",
    meanings: ["generosity in giving"],
    examples: [
      "The royal family's munificence made everyone else in their country rich.",
    ],
  },
  {
    word: "mutable",
    type: "adjective",
    meanings: ["able to change"],
    examples: [
      "Because fashion is so mutable, what is trendy today will look outdated in five years.",
    ],
  },
  {
    word: "myriad",
    type: "adjective",
    meanings: ["consisting of a very great number"],
    examples: [
      "It was difficult to decide what to do Friday night because the city presented us with myriad possibilities for fun.",
    ],
  },
  {
    word: "nadir",
    type: "noun",
    meanings: ["the lowest point of something"],
    examples: [
      "My day was boring, but the nadir came when I accidentally spilled a bowl of spaghetti on my head.",
    ],
  },
  {
    word: "nascent",
    type: "adjective",
    meanings: ["in the process of being born or coming into existence"],
    examples: [
      "Unfortunately, my brilliant paper was only in its nascent form on the morning that it was due.",
    ],
  },
  {
    word: "nebulous",
    type: "adjective",
    meanings: ["vaguely defined", "cloudy"],
    examples: [
      "The transition between governments meant that who was actually in charge was a nebulous matter.",
    ],
  },
  {
    word: "nefarious",
    type: "adjective",
    meanings: ["heinously villainous"],
    examples: [
      "Although Dr. Meanman's nefarious plot to melt the polar icecaps was terrifying, it was so impractical that nobody really worried about it.",
    ],
  },
  {
    word: "negligent",
    type: "adjective",
    meanings: ["habitually careless", "neglectful"],
    examples: [
      "Jessie's grandfather called me a negligent fool after I left the door to his apartment unlocked even though there had been a recent string of robberies.",
    ],
  },
  {
    word: "neophyte",
    type: "noun",
    meanings: ["someone who is young or inexperienced"],
    examples: [
      "As a neophyte in the literary world, Malik had trouble finding a publisher for his first novel.",
    ],
  },
  {
    word: "nocturnal",
    type: "adjective",
    meanings: ["relating to or occurring during the night"],
    examples: [
      "Jackie was a nocturnal person; she would study until dawn and sleep until the evening.",
    ],
  },
  {
    word: "noisome",
    type: "adjective",
    meanings: ["unpleasant", "offensive", "especially to the sense of smell"],
    examples: [
      "Nobody would enter the stalls until the horse's noisome leavings were taken away.",
    ],
  },
  {
    word: "nomadic",
    type: "adjective",
    meanings: ["wandering from place to place"],
    examples: [
      "In the first six months after college, Jose led a nomadic life, living in New York, California, and Idaho.",
    ],
  },
  {
    word: "nominal",
    type: "adjective",
    meanings: ["trifling", "insignificant"],
    examples: [
      "Because he was moving the following week and needed to get rid of his furniture more than he needed money, Jordan sold everything for a nominal fee.",
    ],
  },
  {
    word: "nonchalant",
    type: "adjective",
    meanings: ["having a lack of concern", "indifference"],
    examples: [
      "Although deep down she was very angry, Marsha acted in a nonchalant manner when she found out that her best friend had used her clothing without asking.",
    ],
  },
  {
    word: "nondescript",
    type: "adjective",
    meanings: ["lacking a distinctive character"],
    examples: [
      "I was surprised when I saw the movie star in person because she looked nondescript.",
    ],
  },
  {
    word: "notorious",
    type: "adjective",
    meanings: ["widely and unfavorably known"],
    examples: ["Jacob was notorious for always arriving late at parties."],
  },
  {
    word: "novice",
    type: "noun",
    meanings: ["a beginner", "someone without training or experience"],
    examples: [
      "Because we were all novices at yoga, our instructor decided to begin with the basics.",
    ],
  },
  {
    word: "noxious",
    type: "adjective",
    meanings: ["harmful", "unwholesome"],
    examples: [
      "Environmentalists showed that the noxious weeds were destroying the insects' natural habitats.",
    ],
  },
  {
    word: "nuance",
    type: "noun",
    meanings: ["a slight variation in meaning", "tone", "expression"],
    examples: [
      "The nuances of the poem were not obvious to the casual reader, but the professor was able to point them out.",
    ],
  },
  {
    word: "nurture",
    type: "verb",
    meanings: ["to assist the development of"],
    examples: [
      "Although Serena had never watered the plant, which was about to die, Javier was able to nurture it back to life.",
    ],
  },
  {
    word: "obdurate",
    type: "adjective",
    meanings: ["unyielding to persuasion or moral influences"],
    examples: ["The obdurate old man refused to take pity on the kittens."],
  },
  {
    word: "obfuscate",
    type: "verb",
    meanings: ["to render incomprehensible"],
    examples: [
      "The detective did want to answer the newspaperman's questions, so he obfuscated the truth.",
    ],
  },
  {
    word: "oblique",
    type: "adjective",
    meanings: [
      "diverging from a straight line or course",
      "not straightforward",
    ],
    examples: ["Martin's oblique language confused those who listened to him."],
  },
  {
    word: "oblivious",
    type: "adjective",
    meanings: ["lacking consciousness or awareness of something"],
    examples: [
      "Oblivious to the burning smell emanating from the kitchen, my father did not notice that the rolls in the oven were burned until much too late.",
    ],
  },
  {
    word: "obscure",
    type: "adjective",
    meanings: ["unclear", "partially hidden"],
    examples: [
      "Because he was standing in the shadows, his features were obscure.",
    ],
  },
  {
    word: "obsequious",
    type: "adjective",
    meanings: ["excessively compliant or submissive"],
    examples: [
      "Mark acted like Janet's servant, obeying her every request in an obsequious manner.",
    ],
  },
  {
    word: "obsolete",
    type: "adjective",
    meanings: ["no longer used", "out of date"],
    examples: [
      "With the inventions of tape decks and CDs, which both have better sound and are easier to use, eight-track players are now entirely obsolete.",
    ],
  },
  {
    word: "obstinate",
    type: "adjective",
    meanings: ["not yielding easily", "stubborn"],
    examples: [
      "The obstinate child refused to leave the store until his mother bought him a candy bar.",
    ],
  },
  {
    word: "obstreperous",
    type: "adjective",
    meanings: ["noisy", "unruly"],
    examples: [
      "Billy's obstreperous behavior prompted the librarian to ask him to leave the reading room.",
    ],
  },
  {
    word: "obtuse",
    type: "adjective",
    meanings: ["lacking quickness of sensibility or intellect"],
    examples: [
      "Political opponents warned that the prime minister's obtuse approach to foreign policy would embroil the nation in mindless war.",
    ],
  },
  {
    word: "odious",
    type: "adjective",
    meanings: ["instilling hatred or intense displeasure"],
    examples: [
      "Mark was assigned the odious task of cleaning the cat's litter box.",
    ],
  },
  {
    word: "officious",
    type: "adjective",
    meanings: [
      "offering one's services when they are neither wanted nor needed",
    ],
    examples: [
      "Brenda resented Allan's officious behavior when he selected colors that might best improve her artwork.",
    ],
  },
  {
    word: "ominous",
    type: "adjective",
    meanings: ["foreboding or foreshadowing evil"],
    examples: [
      "The fortuneteller's ominous words flashed through my mind as the hooded figure approached me in the alley.",
    ],
  },
  {
    word: "onerous",
    type: "adjective",
    meanings: ["burdensome"],
    examples: [
      "My parents lamented that the pleasures of living in a beautiful country estate no longer outweighed the onerous mortgage payments.",
    ],
  },
  {
    word: "opulent",
    type: "adjective",
    meanings: ["characterized by rich abundance verging on ostentation"],
    examples: [
      "The opulent furnishings of the dictator's private compound contrasted harshly with the meager accommodations of her subjects.",
    ],
  },
  {
    word: "oration",
    type: "noun",
    meanings: ["a speech delivered in a formal or ceremonious manner"],
    examples: [
      "The prime minister was visibly shaken when the unruly parliament interrupted his oration about failed domestic policies.",
    ],
  },
  {
    word: "ornate",
    type: "adjective",
    meanings: ["highly elaborate", "excessively decorated"],
    examples: [
      "The ornate styling of the new model of luxury car could not compensate for the poor quality of its motor.",
    ],
  },
  {
    word: "orthodox",
    type: "adjective",
    meanings: ["conventional", "conforming to established protocol"],
    examples: [
      "The company's profits dwindled because the management pursued orthodox business policies that were incompatible with new industrial trends.",
    ],
  },
  {
    word: "oscillate",
    type: "verb",
    meanings: ["to sway from one side to the other"],
    examples: [
      "My uncle oscillated between buying a station wagon to transport his family and buying a sports car to satisfy his boyhood fantasies.",
    ],
  },
  {
    word: "ostensible",
    type: "adjective",
    meanings: ["appearing as such", "seemingly"],
    examples: [
      "Jack's ostensible reason for driving was that airfare was too expensive, but in reality, he was afraid of flying.",
    ],
  },
  {
    word: "ostentatious",
    type: "adjective",
    meanings: ["excessively showy", "glitzy"],
    examples: [
      "On the palace tour, the guide focused on the ostentatious decorations and spoke little of the royal family's history.",
    ],
  },
  {
    word: "ostracism",
    type: "noun",
    meanings: ["exclusion from a group"],
    examples: [
      "Beth risked ostracism if her roommates discovered her flatulence.",
    ],
  },
  {
    word: "pacific",
    type: "adjective",
    meanings: ["soothing"],
    examples: [
      "The chemistry professor's pacific demeanor helped the class remain calm after the experiment exploded.",
    ],
  },
  {
    word: "palatable",
    type: "adjective",
    meanings: ["agreeable to the taste or sensibilities"],
    examples: [
      "Despite the unpleasant smell, the exotic cheese was quite palatable.",
    ],
  },
  {
    word: "palette",
    type: "adjective",
    meanings: ["a range of colors or qualities"],
    examples: [
      "The palette of colors utilized in the painting was equaled only by the range of intense emotions the piece evoked.",
    ],
  },
  {
    word: "palliate",
    type: "verb",
    meanings: ["to reduce the severity of"],
    examples: [
      "The doctor trusted that the new medication would palliate her patient's discomfort.",
    ],
  },
  {
    word: "pallid",
    type: "adjective",
    meanings: ["lacking color"],
    examples: [
      "Dr. Van Helsing feared that Lucy's pallid complexion was due to an unexplained loss of blood.",
    ],
  },
  {
    word: "panacea",
    type: "noun",
    meanings: ["a remedy for all ills or difficulties"],
    examples: [
      "Doctors wish there was a single panacea for every disease, but sadly there is not.",
    ],
  },
  {
    word: "paradigm",
    type: "noun",
    meanings: ["an example that is a perfect pattern or model"],
    examples: [
      "Because the new SUV was so popular, it became the paradigm upon which all others were modeled.",
    ],
  },
  {
    word: "hallowed",
    type: "adjective",
    meanings: ["revered", "consecrated"],
    examples: [
      "In the hallowed corridors of the cathedral, the disturbed professor felt himself to be at peace.",
    ],
  },
  {
    word: "paradox",
    type: "noun",
    meanings: ["an apparently contradictory statement that is perhaps true"],
    examples: [
      "The diplomat refused to acknowledge the paradox that negotiating a peace treaty would demand more resources than waging war.",
    ],
  },
  {
    word: "paragon",
    type: "noun",
    meanings: ["a model of excellence or perfection"],
    examples: [
      "The mythical Helen of Troy was considered a paragon of female beauty.",
    ],
  },
  {
    word: "paramount",
    type: "adjective",
    meanings: ["greatest in importance", "rank", "character"],
    examples: [
      "It was paramount that the bomb squad disconnect the blue wire before removing the fuse.",
    ],
  },
  {
    word: "pariah",
    type: "noun",
    meanings: ["an outcast"],
    examples: [
      "Following the discovery of his plagiarism, Professor Hurley was made a pariah in all academic circles.",
    ],
  },
  {
    word: "parody",
    type: "noun",
    meanings: ["a satirical imitation"],
    examples: [
      "A hush fell over the classroom when the teacher returned to find Deborah acting out a parody of his teaching style.",
    ],
  },
  {
    word: "parsimony",
    type: "noun",
    meanings: ["frugality", "stinginess"],
    examples: [
      "Many relatives believed that my aunt's wealth resulted from her parsimony.",
    ],
  },
  {
    word: "partisan",
    type: "noun",
    meanings: ["a follower", "adherent"],
    examples: [
      "The king did not believe that his rival could round up enough partisans to overthrow the monarchy.",
    ],
  },
  {
    word: "patent",
    type: "adjective",
    meanings: ["readily seen or understood", "clear"],
    examples: [
      "The reason for Jim's abdominal pain was made patent after the doctor performed a sonogram.",
    ],
  },
  {
    word: "pathology",
    type: "noun",
    meanings: ["a deviation from the normal"],
    examples: [
      "Dr. Hastings had difficulty identifying the precise nature of Brian's pathology.",
    ],
  },
  {
    word: "pathos",
    type: "noun",
    meanings: ["an emotion of sympathy"],
    examples: [
      "Martha filled with pathos upon discovering the scrawny, shivering kitten at her door.",
    ],
  },
  {
    word: "paucity",
    type: "adjective",
    meanings: ["small in quantity"],
    examples: [
      "Gilbert lamented the paucity of twentieth century literature courses available at the college.",
    ],
  },
  {
    word: "pejorative",
    type: "adjective",
    meanings: ["derogatory", "uncomplimentary"],
    examples: [
      "The evening's headline news covered an international scandal caused by a pejorative statement the famous senator had made in reference to a foreign leader.",
    ],
  },
  {
    word: "pellucid",
    type: "adjective",
    meanings: ["easily intelligible", "clear"],
    examples: [
      "Wishing his book to be pellucid to the common man, Albert Camus avoided using complicated grammar when composing The Stranger.",
    ],
  },
  {
    word: "penchant",
    type: "noun",
    meanings: ["a tendency", "partiality", "preference"],
    examples: [
      "Jill's dinner parties quickly became monotonous on account of her penchant for Mexican dishes.",
    ],
  },
  {
    word: "penitent",
    type: "adjective",
    meanings: ["remorseful", "regretful"],
    examples: [
      "The jury's verdict may have been more lenient if the criminal had appeared penitent for his gruesome crimes.",
    ],
  },
  {
    word: "penultimate",
    type: "adjective",
    meanings: ["next to last"],
    examples: [
      "Having smoked the penultimate cigarette remaining in the pack, Cybil discarded the last cigarette and resolved to quit smoking.",
    ],
  },
  {
    word: "penurious",
    type: "adjective",
    meanings: ["miserly", "stingy"],
    examples: [
      "Stella complained that her husband's penurious ways made it impossible to live the lifestyle she felt she deserved.",
    ],
  },
  {
    word: "perfidious",
    type: "adjective",
    meanings: ["disloyal", "unfaithful"],
    examples: [
      "After the official was caught selling government secrets to enemy agents, he was executed for his perfidious ways.",
    ],
  },
  {
    word: "perfunctory",
    type: "adjective",
    meanings: ["showing little interest or enthusiasm"],
    examples: [
      "The radio broadcaster announced the news of the massacre in a surprisingly perfunctory manner.",
    ],
  },
  {
    word: "permeate",
    type: "verb",
    meanings: ["to spread throughout", "saturate"],
    examples: [
      "Mrs. Huxtable was annoyed that the wet dog's odor had permeated the furniture's upholstery.",
    ],
  },
  {
    word: "pernicious",
    type: "adjective",
    meanings: ["extremely destructive or harmful"],
    examples: [
      "The new government feared that the Communist sympathizers would have a pernicious influence on the nation's stability.",
    ],
  },
  {
    word: "perplex",
    type: "verb",
    meanings: ["to confuse"],
    examples: [
      "Brad was perplexed by his girlfriend's suddenly distant manner.",
    ],
  },
  {
    word: "perspicacity",
    type: "adjective",
    meanings: ["shrewdness", "perceptiveness"],
    examples: [
      "The detective was too humble to acknowledge that his perspicacity was the reason for his professional success.",
    ],
  },
  {
    word: "pert",
    type: "adjective",
    meanings: ["flippant", "bold"],
    examples: [
      "My parents forgave Sandra's pert humor at the dinner table because it had been so long since they had last seen her.",
    ],
  },
  {
    word: "pertinacious",
    type: "adjective",
    meanings: ["stubbornly persistent"],
    examples: [
      "Harry's parents were frustrated with his pertinacious insistence that a monster lived in his closet. Then they opened the closet door and were eaten.",
    ],
  },
  {
    word: "perusal",
    type: "noun",
    meanings: ["a careful examination", "review"],
    examples: [
      "The actor agreed to accept the role after a two-month perusal of the movie script.",
    ],
  },
  {
    word: "pervasive",
    type: "adjective",
    meanings: ["having the tendency to spread throughout"],
    examples: [
      "Stepping off the plane in Havana, I recognized the pervasive odor of sugar cane fields on fire.",
    ],
  },
  {
    word: "petulance",
    type: "noun",
    meanings: ["rudeness", "irritability"],
    examples: [
      "The Nanny resigned after she could no longer tolerate the child's petulance.",
    ],
  },
  {
    word: "philanthropic",
    type: "adjective",
    meanings: ["charitable", "giving"],
    examples: [
      "Many people felt that the billionaire's decision to donate her fortune to house the homeless was the ultimate philanthropic act.",
    ],
  },
  {
    word: "phlegmatic",
    type: "adjective",
    meanings: ["uninterested", "unresponsive"],
    examples: [
      "Monique feared her dog was ill after the animal's phlegmatic response to his favorite chew toy.",
    ],
  },
  {
    word: "pillage",
    type: "verb",
    meanings: ["to seize or plunder", "especially in war"],
    examples: [
      "Invading enemy soldiers pillaged the homes scattered along the country's border.",
    ],
  },
  {
    word: "pinnacle",
    type: "noun",
    meanings: ["the highest point"],
    examples: [
      "Book reviewers declared that the author's new novel was extraordinary and probably the pinnacle of Western literature.",
    ],
  },
  {
    word: "pithy",
    type: "adjective",
    meanings: ["concisely meaningful"],
    examples: [
      "My father's long-winded explanation was a stark contrast to his usually pithy statements.",
    ],
  },
  {
    word: "pittance",
    type: "noun",
    meanings: ["a very small amount", "especially relating to money"],
    examples: [
      "Josh complained that he was paid a pittance for the great amount of work he did at the firm.",
    ],
  },
  {
    word: "placate",
    type: "verb",
    meanings: ["to ease the anger of", "soothe"],
    examples: ["The man purchased a lollipop to placate his irritable son."],
  },
  {
    word: "placid",
    type: "adjective",
    meanings: ["calm", "peaceful"],
    examples: ["The placid lake surface was as smooth as glass."],
  },
  {
    word: "platitude",
    type: "noun",
    meanings: ["an uninspired remark", "cliché"],
    examples: [
      "After reading over her paper, Helene concluded that what she thought were profound insights were actually just platitudes.",
    ],
  },
  {
    word: "plaudits",
    type: "noun",
    meanings: ["enthusiastic approval", "applause"],
    examples: [
      "The controversial new film received plaudits from even the harshest critics.",
    ],
  },
  {
    word: "plausible",
    type: "adjective",
    meanings: ["believable", "reasonable"],
    examples: [
      "He studied all the data and then came up with a plausible theory that took all factors into account.",
    ],
  },
  {
    word: "plenitude",
    type: "noun",
    meanings: ["an abundance"],
    examples: [
      "My grandmother was overwhelmed by the plenitude of tomatoes her garden yielded this season.",
    ],
  },
  {
    word: "plethora",
    type: "noun",
    meanings: ["an abundance", "excess"],
    examples: [
      "The wedding banquet included a plethora of oysters piled almost three feet high.",
    ],
  },
  {
    word: "pliable",
    type: "adjective",
    meanings: ["flexible"],
    examples: [
      "Aircraft wings are designed to be somewhat pliable so they do not break in heavy turbulence.",
    ],
  },
  {
    word: "poignant",
    type: "adjective",
    meanings: ["deeply affecting", "moving"],
    examples: [
      "My teacher actually cried after reading to us the poignant final chapter of the novel.",
    ],
  },
  {
    word: "polemic",
    type: "noun",
    meanings: ["an aggressive argument against a specific opinion"],
    examples: [
      "My brother launched into a polemic against my arguments that capitalism was an unjust economic system.",
    ],
  },
  {
    word: "portent",
    type: "noun",
    meanings: ["an omen"],
    examples: [
      "When a black cat crossed my sister's path while she was walking to school, she took it as a portent that she would do badly on her spelling test.",
    ],
  },
  {
    word: "potable",
    type: "adjective",
    meanings: ["suitable for drinking"],
    examples: [
      "During sea voyages it is essential that ships carry a supply of potable water because salty ocean water makes anyone who drinks it sick.",
    ],
  },
  {
    word: "potentate",
    type: "noun",
    meanings: ["one who has great power", "a ruler"],
    examples: [
      "All the villagers stood along the town's main road to observe as the potentate's procession headed towards the capital.",
    ],
  },
  {
    word: "pragmatic",
    type: "adjective",
    meanings: ["practical"],
    examples: [
      "The politician argued that while increased security measures might not fit with the lofty ideals of the nation, they were a pragmatic necessity to ensure everyone's safety.",
    ],
  },
  {
    word: "precipice",
    type: "noun",
    meanings: ["the face of a cliff", "a steep or overhanging place"],
    examples: [
      "The mountain climber hung from a precipice before finding a handhold and pulling himself up.",
    ],
  },
  {
    word: "preclude",
    type: "verb",
    meanings: ["to prevent"],
    examples: [
      "My grandfather's large and vicious guard dog precluded anyone from entering the yard.",
    ],
  },
  {
    word: "precocious",
    type: "adjective",
    meanings: ["advanced", "developing ahead of time"],
    examples: [
      "Derek was so academically precocious that by the time he was 10 years old, he was already in the ninth grade.",
    ],
  },
  {
    word: "predilection",
    type: "noun",
    meanings: ["a preference or inclination for something"],
    examples: [
      "Francois has a predilection for eating scrambled eggs with ketchup, though I prefer to eat eggs without any condiments.",
    ],
  },
  {
    word: "preponderance",
    type: "adjective",
    meanings: ["superiority in importance or quantity"],
    examples: [
      "Britain's preponderance of naval might secured the nation's role as a military power.",
    ],
  },
  {
    word: "prepossessing",
    type: "adjective",
    meanings: [
      "occupying the mind to the exclusion of other thoughts or feelings",
    ],
    examples: [
      "His prepossessing appearance made it impossible for me to think of anything else.",
    ],
  },
  {
    word: "presage",
    type: "noun",
    meanings: ["an omen"],
    examples: [
      "When my uncle's old war injury ached, he interpreted it as a presage of bad weather approaching.",
    ],
  },
  {
    word: "prescient",
    type: "adjective",
    meanings: ["to have foreknowledge of events"],
    examples: [
      "Questioning the fortune cookie's prediction, Ray went in search of the old hermit who was rumored to be prescient.",
    ],
  },
  {
    word: "prescribe",
    type: "verb",
    meanings: ["to lay down a rule"],
    examples: [
      "The duke prescribed that from this point further all of the peasants living on his lands would have to pay higher taxes.",
    ],
  },
  {
    word: "presumptuous",
    type: "adjective",
    meanings: ["disrespectfully bold"],
    examples: [
      "The princess grew angry after the presumptuous noble tried to kiss her, even though he was far below her in social status.",
    ],
  },
  {
    word: "pretense",
    type: "noun",
    meanings: ["an appearance or action intended to deceive"],
    examples: [
      "Though he actually wanted to use his parents' car to go on a date, Nick borrowed his parents' car under the pretense of attending a group study session.",
    ],
  },
  {
    word: "primeval",
    type: "adjective",
    meanings: ["original", "ancient"],
    examples: [
      "The first primates to walk on two legs, called Australopithecus, were the primeval descendants of modern man.",
    ],
  },
  {
    word: "privation",
    type: "noun",
    meanings: ["lacking basic necessities"],
    examples: [
      "After decades of rule by an oppressive government that saw nothing wrong with stealing from its citizens, the recent drought only increased the people's privation.",
    ],
  },
  {
    word: "probity",
    type: "noun",
    meanings: ["virtue", "integrity"],
    examples: [
      "Because he was never viewed as a man of great probity, no one was surprised by Mr. Samson's immoral behavior.",
    ],
  },
  {
    word: "proclivity",
    type: "noun",
    meanings: ["a strong inclination toward something"],
    examples: [
      "In a sick twist of fate, Harold's childhood proclivity for torturing small animals grew into a desire to become a surgeon.",
    ],
  },
  {
    word: "procure",
    type: "verb",
    meanings: ["to obtain", "acquire"],
    examples: [
      "The FBI was unable to procure sufficient evidence to charge the gangster with racketeering.",
    ],
  },
  {
    word: "profane",
    type: "adjective",
    meanings: ["lewd", "indecent"],
    examples: [
      "Jacob's profane act of dumping frogs in the holy water in the chapel at his boarding school resulted in his dismissal.",
    ],
  },
  {
    word: "profligate",
    type: "adjective",
    meanings: ["dissolute", "extravagant"],
    examples: [
      "The profligate gambler loved to drink, spend money, steal, cheat, and hang out with prostitutes.",
    ],
  },
  {
    word: "profuse",
    type: "adjective",
    meanings: ["plentiful", "abundant"],
    examples: [
      "The fans were profuse in their cheers for the star basketball player.",
    ],
  },
  {
    word: "promulgate",
    type: "verb",
    meanings: ["to proclaim", "make known"],
    examples: [
      "The film professor promulgated that both in terms of sex appeal and political intrigue, Sean Connery's James Bond was superior to Roger Moore's.",
    ],
  },
  {
    word: "propagate",
    type: "verb",
    meanings: ["to multiply", "spread out"],
    examples: [
      "Rumors of Paul McCartney's demise propagated like wildfire throughout the world.",
    ],
  },
  {
    word: "propensity",
    type: "noun",
    meanings: ["an inclination", "preference"],
    examples: [
      "Dermit has a propensity for dangerous activities such as bungee jumping.",
    ],
  },
  {
    word: "propitious",
    type: "adjective",
    meanings: ["favorable"],
    examples: [
      "The dark storm clouds visible on the horizon suggested that the weather would not be propitious for sailing.",
    ],
  },
  {
    word: "propriety",
    type: "noun",
    meanings: ["the quality or state of being proper", "decent"],
    examples: [
      'Erma\'s old-fashioned parents believed that her mini-skirt lacked the propriety expected of a "nice" girl.',
    ],
  },
  {
    word: "prosaic",
    type: "adjective",
    meanings: ["plain", "lacking liveliness"],
    examples: ["Heather's prosaic recital of the poem bored the audience."],
  },
  {
    word: "proscribe",
    type: "verb",
    meanings: ["to condemn", "outlaw"],
    examples: [
      "The town council voted to proscribe the sale of alcohol on weekends.",
    ],
  },
  {
    word: "protean",
    type: "adjective",
    meanings: ["able to change shape; displaying great variety"],
    examples: [
      "Among Nigel's protean talents was his ability to touch the tip of his nose with his tongue.",
    ],
  },
  {
    word: "prowess",
    type: "noun",
    meanings: ["extraordinary ability"],
    examples: [
      "The musician had never taken a guitar lesson in his life, making his prowess with the instrument even more incredible.",
    ],
  },
  {
    word: "prudence",
    type: "noun",
    meanings: ["cautious", "circumspect"],
    examples: [
      "After losing a fortune in a stock market crash, my father vowed to practice greater prudence in future investments.",
    ],
  },
  {
    word: "prurient",
    type: "adjective",
    meanings: ["eliciting or possessing an extraordinary interest in sex"],
    examples: [
      "David's mother was shocked by the discovery of prurient reading material hidden beneath her son's mattress.",
    ],
  },
  {
    word: "puerile",
    type: "adjective",
    meanings: ["juvenile", "immature"],
    examples: [
      "The judge demanded order after the lawyer's puerile attempt to object by stomping his feet on the courtroom floor.",
    ],
  },
  {
    word: "pugnacious",
    type: "adjective",
    meanings: ["quarrelsome", "combative"],
    examples: [
      "Aaron's pugnacious nature led him to start several barroom brawls each month.",
    ],
  },
  {
    word: "pulchritude",
    type: "noun",
    meanings: ["physical beauty"],
    examples: [
      "Several of Shakespeare's sonnets explore the pulchritude of a lovely young man.",
    ],
  },
  {
    word: "punctilious",
    type: "adjective",
    meanings: ["eager to follow rules or conventions"],
    examples: [
      "Punctilious Bobby, hall monitor extraordinaire, insisted that his peers follow the rules.",
    ],
  },
  {
    word: "pungent",
    type: "adjective",
    meanings: [
      "having a pointed",
      "sharp quality—often used to describe smells",
    ],
    examples: [
      "The pungent odor in the classroom made Joseph lose his concentration during the test.",
    ],
  },
  {
    word: "punitive",
    type: "adjective",
    meanings: ["involving punishment"],
    examples: [
      "If caught smoking in the boys' room, the punitive result is immediate expulsion from school.",
    ],
  },
  {
    word: "putrid",
    type: "adjective",
    meanings: ["rotten", "foul"],
    examples: ["Those rotten eggs smell putrid."],
  },
  {
    word: "quagmire",
    type: "noun",
    meanings: ["a difficult situation"],
    examples: [
      "We'd all like to avoid the kind of military quagmire characterized by the Vietnam War.",
    ],
  },
  {
    word: "quaint",
    type: "adjective",
    meanings: ["charmingly old-fashioned"],
    examples: [
      "Hilda was delighted by the quaint bonnets she saw in Amish country.",
    ],
  },
  {
    word: "quandary",
    type: "noun",
    meanings: ["a perplexed", "unresolvable state"],
    examples: [
      "Carlos found himself in a quandary: should he choose mint chocolate chip or cookie dough?",
    ],
  },
  {
    word: "quell",
    type: "verb",
    meanings: ["to control or diffuse a potentially explosive situation"],
    examples: ["The skilled leader deftly quelled the rebellion."],
  },
  {
    word: "querulous",
    type: "adjective",
    meanings: ["whiny", "complaining"],
    examples: ["If deprived of his pacifier, young Brendan becomes querulous."],
  },
  {
    word: "quixotic",
    type: "adjective",
    meanings: ["idealistic", "impractical"],
    examples: [
      "Edward entertained a quixotic desire to fall in love at first sight in a laundromat.",
    ],
  },
  {
    word: "quotidian",
    type: "adjective",
    meanings: ["daily"],
    examples: [
      "Ambika's quotidian routines include drinking two cups of coffee in the morning.",
    ],
  },
  {
    word: "rail",
    type: "verb",
    meanings: ["to scold", "protest"],
    examples: [
      "The professor railed against the injustice of the college's tenure policy.",
    ],
  },
  {
    word: "rancid",
    type: "adjective",
    meanings: ["having a terrible taste or smell"],
    examples: [
      "Rob was double-dog-dared to eat the rancid egg salad sandwich.",
    ],
  },
  {
    word: "rancor",
    type: "noun",
    meanings: ["deep", "bitter resentment"],
    examples: [
      "When Eileen challenged me to a fight, I could see the rancor in her eyes.",
    ],
  },
  {
    word: "rapport",
    type: "noun",
    meanings: ["mutual understanding and harmony"],
    examples: ["When Margaret met her paramour, they felt an instant rapport."],
  },
  {
    word: "rash",
    type: "adjective",
    meanings: ["hasty", "incautious"],
    examples: [
      "It's best to think things over calmly and thoroughly, rather than make rash decisions.",
    ],
  },
  {
    word: "raucous",
    type: "adjective",
    meanings: ["loud", "boisterous"],
    examples: [
      "Sarah's neighbors called the cops when her house party got too raucous.",
    ],
  },
  {
    word: "raze",
    type: "verb",
    meanings: ["to demolish", "level"],
    examples: [
      "The old tenement house was razed to make room for the large chain store.",
    ],
  },
  {
    word: "rebuke",
    type: "verb",
    meanings: ["to scold", "criticize"],
    examples: [
      "When the cops showed up at Sarah's party, they rebuked her for disturbing the peace.",
    ],
  },
  {
    word: "recalcitrant",
    type: "adjective",
    meanings: ["defiant", "unapologetic"],
    examples: [
      "Even when scolded, the recalcitrant young girl simply stomped her foot and refused to finish her lima beans.",
    ],
  },
  {
    word: "recapitulate",
    type: "verb",
    meanings: ["to sum up", "repeat"],
    examples: [
      "Before the final exam, the teacher recapitulated the semester's material.",
    ],
  },
  {
    word: "reciprocate",
    type: "verb",
    meanings: ["to give in return"],
    examples: [
      "When Steve gave Samantha a sweater for Christmas, she reciprocated by giving him a kiss.",
    ],
  },
  {
    word: "reclusive",
    type: "adjective",
    meanings: ["solitary", "shunning society"],
    examples: [
      "Reclusive authors such as J.D. Salinger do not relish media attention and sometimes even enjoy holing up in remote cabins in the woods.",
    ],
  },
  {
    word: "reconcile",
    type: "verb",
    meanings: ["to return to harmony"],
    examples: [
      "The feuding neighbors finally reconciled when one brought the other a delicious tuna noodle casserole.",
    ],
  },
  {
    word: "reconcile",
    type: "verb",
    meanings: ["to make consistent with existing ideas"],
    examples: [
      "Alou had to reconcile his skepticism about the existence of aliens with the fact that he was looking at a flying saucer.",
    ],
  },
  {
    word: "rectitude",
    type: "noun",
    meanings: ["uprightness", "extreme morality"],
    examples: [
      "The priest's rectitude gave him the moral authority to counsel his parishioners.",
    ],
  },
  {
    word: "redoubtable",
    type: "adjective",
    meanings: ["formidable"],
    examples: ["The fortress looked redoubtable set against a stormy sky."],
  },
  {
    word: "redoubtable",
    type: "adjective",
    meanings: ["commanding respect"],
    examples: [
      "The audience greeted the redoubtable speaker with a standing ovation.",
    ],
  },
  {
    word: "refract",
    type: "verb",
    meanings: ["to distort", "change"],
    examples: ["The light was refracted as it passed through the prism."],
  },
  {
    word: "refurbish",
    type: "verb",
    meanings: ["to restore", "clean up"],
    examples: [
      "The dingy old chair, after being refurbished, commanded the handsome price of $200.",
    ],
  },
  {
    word: "refute",
    type: "verb",
    meanings: ["to prove wrong"],
    examples: [
      "Maria refuted the president's argument as she yelled and gesticulated at the TV.",
    ],
  },
  {
    word: "regurgitate",
    type: "verb",
    meanings: ["to vomit"],
    examples: ["Feeling sick, Chuck regurgitated his dinner."],
  },
  {
    word: "regurgitate",
    type: "verb",
    meanings: ["to throw back exactly"],
    examples: [
      "Margaret rushed through the test, regurgitating all of the facts she'd memorized an hour earlier.",
    ],
  },
  {
    word: "relegate",
    type: "verb",
    meanings: ["to assign to the proper place"],
    examples: [
      "At the astrology conference, Simon was relegated to the Scorpio room.",
    ],
  },
  {
    word: "relegate",
    type: "verb",
    meanings: ["to assign to an inferior place"],
    examples: [
      "After spilling a drink on a customer's shirt, the waiter found himself relegated to the least lucrative shift.",
    ],
  },
  {
    word: "relish",
    type: "verb",
    meanings: ["to enjoy"],
    examples: ["Pete always relished his bedtime snack."],
  },
  {
    word: "remedial",
    type: "adjective",
    meanings: ["intended to repair gaps in students' basic knowledge"],
    examples: [
      "After his teacher discovered he couldn't read, Alex was forced to enroll in remedial English.",
    ],
  },
  {
    word: "remiss",
    type: "adjective",
    meanings: ["negligent", "failing to take care"],
    examples: [
      "The burglar gained entrance because the security guard, remiss in his duties, forgot to lock the door.",
    ],
  },
  {
    word: "renovate",
    type: "verb",
    meanings: ["restore", "return to original state"],
    examples: ["The renovated antique candelabra looked as good as new."],
  },
  {
    word: "renovate",
    type: "verb",
    meanings: ["to enlarge and make prettier", "especially a house"],
    examples: [
      "After getting renovated, the house was twice as big and much more attractive.",
    ],
  },
  {
    word: "renown",
    type: "noun",
    meanings: ["honor", "acclaim"],
    examples: [
      "The young writer earned international renown by winning the Pulitzer Prize.",
    ],
  },
  {
    word: "renunciation",
    type: "noun",
    meanings: ["to reject"],
    examples: [
      "Fiona's renunciation of red meat resulted in weight loss, but confused those people who thought she'd been a vegetarian for years.",
    ],
  },
  {
    word: "repentant",
    type: "adjective",
    meanings: ["penitent", "sorry"],
    examples: [
      "The repentant Dennis apologized profusely for breaking his mother's vase.",
    ],
  },
  {
    word: "replete",
    type: "adjective",
    meanings: ["full", "abundant"],
    examples: ["The unedited version was replete with naughty words."],
  },
  {
    word: "repose",
    type: "verb",
    meanings: ["to rest", "lie down"],
    examples: [
      "The cat, after eating an entire can of tuna fish, reposed in the sun and took a long nap.",
    ],
  },
  {
    word: "reprehensible",
    type: "adjective",
    meanings: ["deserving rebuke"],
    examples: [
      "Jean's cruel and reprehensible attempt to dump her boyfriend on his birthday led to tears and recriminations.",
    ],
  },
  {
    word: "reprieve",
    type: "noun",
    meanings: ["a temporary delay of punishment"],
    examples: [
      "Because the governor woke up in a particularly good mood, he granted hundreds of reprieves to prisoners.",
    ],
  },
  {
    word: "reproach",
    type: "verb",
    meanings: ["to scold", "disapprove"],
    examples: [
      "Brian reproached the customer for failing to rewind the video he had rented.",
    ],
  },
  {
    word: "reprobate",
    type: "adjective",
    meanings: ["evil", "unprincipled"],
    examples: ["The reprobate criminal sat sneering in the cell."],
  },
  {
    word: "reprove",
    type: "verb",
    meanings: ["to scold", "rebuke"],
    examples: [
      "Lara reproved her son for sticking each and every one of his fingers into the strawberry pie.",
    ],
  },
  {
    word: "repudiate",
    type: "verb",
    meanings: ["to reject", "refuse to accept"],
    examples: [
      "Kwame made a strong case for an extension of his curfew, but his mother repudiated it with a few biting words.",
    ],
  },
  {
    word: "repulse",
    type: "verb",
    meanings: ["to disgust"],
    examples: [
      "Antisocial Annie tried to repulse people by neglecting to brush her teeth.",
    ],
  },
  {
    word: "repulse",
    type: "verb",
    meanings: ["to push back"],
    examples: [
      "With a deft movement of her wrist and a punch to the stomach, Lacy repulsed Jack's attempt to kiss her.",
    ],
  },
  {
    word: "reputable",
    type: "adjective",
    meanings: ["of good reputation"],
    examples: [
      "After the most reputable critic in the industry gave the novel a glowing review, sales took off.",
    ],
  },
  {
    word: "requisition",
    type: "noun",
    meanings: ["a demand for goods", "usually made by an authority"],
    examples: [
      "During the war, the government made a requisition of supplies.",
    ],
  },
  {
    word: "rescind",
    type: "verb",
    meanings: ["to take back", "repeal"],
    examples: [
      "The company rescinded its offer of employment after discovering that Jane's resume was full of lies.",
    ],
  },
  {
    word: "reservoir",
    type: "noun",
    meanings: ["reserves", "large supply"],
    examples: [
      "Igor the Indomitable had quite a reservoir of strengh and could lift ten tons, even after running 700 miles, jumping over three mountains, and swimming across an ocean.",
    ],
  },
  {
    word: "reservoir",
    type: "noun",
    meanings: ["a body of water used for storing water"],
    examples: [
      "After graduation, the more rebellious members of the senior class jumped into the town reservoir used for drinking water.",
    ],
  },
  {
    word: "resilient",
    type: "adjective",
    meanings: ["able to recover from misfortune; able to withstand adversity"],
    examples: [
      "The resilient ballplayer quickly recovered from his wrist injury.",
    ],
  },
  {
    word: "resolute",
    type: "adjective",
    meanings: ["firm", "determined"],
    examples: [
      "With a resolute glint in her eye, Catherine announced that she was set on going to college in New York City even though she was a little frightened of tall buildings.",
    ],
  },
  {
    word: "resolve",
    type: "verb",
    meanings: ["to find a solution"],
    examples: ["Sarah and Emma resolved their differences and shook hands."],
  },
  {
    word: "resolve",
    type: "verb",
    meanings: ["to firmly decide"],
    examples: ["Lady Macbeth resolved to whip her husband into shape."],
  },
  {
    word: "respite",
    type: "noun",
    meanings: ["a break", "rest"],
    examples: [
      "Justin left the pub to gain a brief respite from the smoke and noise.",
    ],
  },
  {
    word: "resplendent",
    type: "adjective",
    meanings: ["shiny", "glowing"],
    examples: ["The partygoers were resplendent in diamonds and fancy dress."],
  },
  {
    word: "restitution",
    type: "noun",
    meanings: ["restoration to the rightful owner"],
    examples: [
      "Many people feel that descendants of slaves should receive restitution for the sufferings of their ancestors.",
    ],
  },
  {
    word: "restive",
    type: "adjective",
    meanings: ["resistant", "stubborn", "impatient"],
    examples: [
      "The restive audience pelted the band with mud and yelled nasty comments.",
    ],
  },
  {
    word: "retract",
    type: "verb",
    meanings: ["withdraw"],
    examples: [
      "As the media worked itself into a frenzy, the publicist hurriedly retracted his client's sexist statement.",
    ],
  },
  {
    word: "revel",
    type: "verb",
    meanings: ["to enjoy intensely"],
    examples: ["Theodore reveled in his new status as Big Man on Campus."],
  },
  {
    word: "revere",
    type: "verb",
    meanings: ["to esteem", "show deference", "venerate"],
    examples: [
      "The doctor saved countless lives with his combination of expertise and kindness and became universally revered.",
    ],
  },
  {
    word: "revoke",
    type: "verb",
    meanings: ["to take back"],
    examples: [
      "After missing the curfew set by the court for eight nights in a row, Marcel's freedom of movement was revoked.",
    ],
  },
  {
    word: "rhapsodize",
    type: "verb",
    meanings: ["to engage in excessive enthusiasm"],
    examples: [
      "The critic rhapsodized about the movie, calling it an instant classic.",
    ],
  },
  {
    word: "ribald",
    type: "adjective",
    meanings: ["coarsely", "crudely humorous"],
    examples: [
      "While some giggled at the ribald joke involving a parson's daughter, most sighed and rolled their eyes.",
    ],
  },
  {
    word: "rife",
    type: "adjective",
    meanings: ["abundant"],
    examples: [
      "Surprisingly, the famous novelist's writing was rife with spelling errors.",
    ],
  },
  {
    word: "ruminate",
    type: "verb",
    meanings: ["to contemplate", "reflect"],
    examples: [
      "Terry liked to ruminate while sitting on the banks of the river, staring pensively into the water.",
    ],
  },
  {
    word: "ruse",
    type: "noun",
    meanings: ["a trick"],
    examples: [
      "Oliver concocted an elaborate ruse for sneaking out of the house to meet his girlfriend while simultaneously giving his mother the impression that he was asleep in bed.",
    ],
  },
  {
    word: "saccharine",
    type: "adjective",
    meanings: ["sickeningly sweet"],
    examples: [
      "Tom's saccharine manner, although intended to make him popular, actually repelled his classmates.",
    ],
  },
  {
    word: "sacrosanct",
    type: "adjective",
    meanings: ["holy", "something that should not be criticized"],
    examples: [
      "In the United States, the Constitution is often thought of as a sacrosanct document.",
    ],
  },
  {
    word: "sagacity",
    type: "noun",
    meanings: ["shrewdness", "soundness of perspective"],
    examples: [
      "With remarkable sagacity, the wise old man predicted and thwarted his children's plan to ship him off to a nursing home.",
    ],
  },
  {
    word: "salient",
    type: "adjective",
    meanings: ["significant", "conspicuous"],
    examples: [
      "One of the salient differences between Alison and Nancy is that Alison is a foot taller.",
    ],
  },
  {
    word: "salutation",
    type: "noun",
    meanings: ["a greeting"],
    examples: [
      'Andrew regularly began letters with the bizarre salutation "Ahoy ahoy."',
    ],
  },
  {
    word: "salve",
    type: "noun",
    meanings: ["a soothing balm"],
    examples: [
      "After Tony applied a salve to his brilliant red sunburn, he soon felt a little better.",
    ],
  },
  {
    word: "sanctimonious",
    type: "adjective",
    meanings: ["giving a hypocritical appearance of piety"],
    examples: [
      "The sanctimonious Bertrand delivered stern lectures on the Ten Commandments to anyone who would listen, but thought nothing of stealing cars to make some cash on the side.",
    ],
  },
  {
    word: "sanguine",
    type: "adjective",
    meanings: ["optimistic", "cheery"],
    examples: [
      'Polly reacted to any bad news with a sanguine smile and the chirpy cry, "When life hands you lemons, make lemonade!"',
    ],
  },
  {
    word: "satiate",
    type: "verb",
    meanings: ["to satisfy excessively"],
    examples: [
      "Satiated after eating far too much turkey and stuffing, Liza lay on the couch watching football and suffering from stomach pains.",
    ],
  },
  {
    word: "scathing",
    type: "adjective",
    meanings: ["sharp", "critical", "hurtful"],
    examples: [
      "Two hours after breaking up with Russell, Suzanne thought of the perfect scathing retort to his accusations.",
    ],
  },
  {
    word: "scintillating",
    type: "adjective",
    meanings: ["sparkling"],
    examples: [
      "The ice skater's scintillating rhinestone costume nearly blinded the judges.",
    ],
  },
  {
    word: "scrupulous",
    type: "adjective",
    meanings: ["painstaking", "careful"],
    examples: ["With scrupulous care, Sam cut a snowflake out of white paper."],
  },
  {
    word: "scurrilous",
    type: "adjective",
    meanings: ["vulgar", "coarse"],
    examples: [
      "When Bruno heard the scurrilous accusation being made about him, he could not believe it because he always tried to be nice to everyone.",
    ],
  },
  {
    word: "sedentary",
    type: "adjective",
    meanings: ["sitting", "settled"],
    examples: ["The sedentary cat did little but loll in the sun."],
  },
  {
    word: "semaphore",
    type: "noun",
    meanings: ["a visual signal"],
    examples: [
      "Anne and Diana communicated with a semaphore involving candles and window shades.",
    ],
  },
  {
    word: "seminal",
    type: "adjective",
    meanings: ["original", "important", "creating a field"],
    examples: [
      "Stephen Greenblatt's essays on Shakespeare proved to be seminal, because they initiated the critical school of New Historicism.",
    ],
  },
  {
    word: "sensual",
    type: "adjective",
    meanings: ["involving sensory gratification", "usually related to sex"],
    examples: [
      "With a coy smile, the guest on the blind-date show announced that he considered himself a very sensual person.",
    ],
  },
  {
    word: "sensuous",
    type: "adjective",
    meanings: ["involving sensory gratification"],
    examples: [
      "Paul found drinking Coke, with all the little bubbles bursting on his tongue, a very sensuous experience.",
    ],
  },
  {
    word: "serendipity",
    type: "noun",
    meanings: ["luck", "finding good things without looking for them"],
    examples: [
      "In an amazing bit of serendipity, penniless Paula found a $20 bill in the subway station.",
    ],
  },
  {
    word: "serene",
    type: "adjective",
    meanings: ["calm", "untroubled"],
    examples: [
      "Louise stood in front of the Mona Lisa, puzzling over the famous woman's serene smile.",
    ],
  },
  {
    word: "servile",
    type: "adjective",
    meanings: ["subservient"],
    examples: [
      "The servile porter crept around the hotel lobby, bowing and quaking before the guests.",
    ],
  },
  {
    word: "sinuous",
    type: "adjective",
    meanings: ["lithe", "serpentine"],
    examples: [
      "With the sinuous movements of her arms, the dancer mimicked the motion of a snake.",
    ],
  },
  {
    word: "sobriety",
    type: "noun",
    meanings: ["sedate", "calm"],
    examples: [
      "Jason believed that maintaining his sobriety in times of crisis was the key to success in life.",
    ],
  },
  {
    word: "solicitous",
    type: "adjective",
    meanings: ["concerned", "attentive"],
    examples: [
      "Jim, laid up in bed with a nasty virus, enjoyed the solicitous attentions of his mother, who brought him soup and extra blankets.",
    ],
  },
  {
    word: "solipsistic",
    type: "adjective",
    meanings: ["believing that oneself is all that exists"],
    examples: [
      "Colette's solipsistic attitude completely ignored the plight of the homeless people on the street.",
    ],
  },
  {
    word: "soluble",
    type: "adjective",
    meanings: ["able to dissolve"],
    examples: [
      "The plot of the spy film revolved around an untraceable and water-soluble poison.",
    ],
  },
  {
    word: "solvent",
    type: "noun",
    meanings: ["a substance that can dissolve other substances"],
    examples: [
      "Water is sometimes called the universal solvent because almost all other substances can dissolve into it.",
    ],
  },
  {
    word: "solvent",
    type: "adjective",
    meanings: ["able to pay debts"],
    examples: [
      "Upon receiving an unexpected check from her aunt, Annabelle found herself suddenly solvent.",
    ],
  },
  {
    word: "somnolent",
    type: "adjective",
    meanings: ["sleepy", "drowsy"],
    examples: [
      "The somnolent student kept falling asleep and waking up with a jerk.",
    ],
  },
  {
    word: "sophomoric",
    type: "adjective",
    meanings: ["immature", "uninformed"],
    examples: [
      "The mature senior rolled her eyes at the sophomoric gross-out humor of the underclassman.",
    ],
  },
  {
    word: "sovereign",
    type: "adjective",
    meanings: ["having absolute authority in a certain realm"],
    examples: [
      "The sovereign queen, with steely resolve, ordered that the traitorous nobleman be killed.",
    ],
  },
  {
    word: "speculative",
    type: "adjective",
    meanings: ["not based in fact"],
    examples: ["Sadly, Tessa was convicted on merely speculative evidence."],
  },
  {
    word: "spurious",
    type: "adjective",
    meanings: ["false but designed to seem plausible"],
    examples: [
      "Using a spurious argument, John convinced the others that he had won the board game on a technicality.",
    ],
  },
  {
    word: "stagnate",
    type: "verb",
    meanings: ["to become or remain inactive", "not develop", "not flow"],
    examples: ["With no room for advancement, the waiter's career stagnated."],
  },
  {
    word: "staid",
    type: "adjective",
    meanings: ["sedate", "serious", "self-restrained"],
    examples: [
      "The staid butler never changed his expression no matter what happened.",
    ],
  },
  {
    word: "stingy",
    type: "adjective",
    meanings: ["not generous", "not inclined to spend or give"],
    examples: [
      "Scrooge's stingy habits did not fit with the generous, giving spirit of Christmas.",
    ],
  },
  {
    word: "stoic",
    type: "adjective",
    meanings: ["unaffected by passion or feeling"],
    examples: [
      "Penelope's faithfulness to Odysseus required that she be stoic and put off her many suitors.",
    ],
  },
  {
    word: "stolid",
    type: "adjective",
    meanings: ["expressing little sensibility", "unemotional"],
    examples: [
      "Charles's stolid reaction to his wife's funeral differed from the passion he showed at the time of her death.",
    ],
  },
  {
    word: "strenuous",
    type: "adjective",
    meanings: ["requiring tremendous energy or stamina"],
    examples: [
      "Running a marathon is quite a strenuous task. So is watching an entire Star Trek marathon.",
    ],
  },
  {
    word: "strident",
    type: "adjective",
    meanings: ["harsh", "loud"],
    examples: [
      "A strident man, Captain Von Trapp yelled at his daughter and made her cry.",
    ],
  },
  {
    word: "stupefy",
    type: "verb",
    meanings: ["to astonish", "make insensible"],
    examples: [
      "Veronica's audacity and ungratefulness stupefied her best friend, Heather.",
    ],
  },
  {
    word: "subjugate",
    type: "verb",
    meanings: ["to bring under control", "subdue"],
    examples: [
      "The invading force captured and subjugated the natives of that place.",
    ],
  },
  {
    word: "sublime",
    type: "adjective",
    meanings: ["lofty", "grand", "exalted"],
    examples: [
      "The homeless man sadly pondered his former wealth and once sublime existence.",
    ],
  },
  {
    word: "submissive",
    type: "adjective",
    meanings: ["easily yielding to authority"],
    examples: [
      "In some cultures, wives are supposed to be submissive and support their husbands in all matters.",
    ],
  },
  {
    word: "succinct",
    type: "adjective",
    meanings: ["marked by compact precision"],
    examples: [
      "The governor's succinct speech energized the crowd while the mayor's rambled on and on.",
    ],
  },
  {
    word: "superfluous",
    type: "adjective",
    meanings: ["exceeding what is necessary"],
    examples: [
      "Tracy had already won the campaign so her constant flattery of others was superfluous.",
    ],
  },
  {
    word: "surfeit",
    type: "noun",
    meanings: ["an overabundant supply or indulgence"],
    examples: [
      "After partaking of the surfeit of tacos and tamales at the All-You-Can-Eat Taco Tamale Lunch Special, Beth felt rather sick.",
    ],
  },
  {
    word: "surmise",
    type: "verb",
    meanings: ["to infer with little evidence"],
    examples: [
      "After speaking to only one of the students, the teacher was able to surmise what had caused the fight.",
    ],
  },
  {
    word: "surreptitious",
    type: "adjective",
    meanings: ["stealthy"],
    examples: [
      "The surreptitious CIA agents were able to get in and out of the house without anyone noticing.",
    ],
  },
  {
    word: "surrogate",
    type: "noun",
    meanings: ["one acting in place of another"],
    examples: [
      "The surrogate carried the child to term for its biological parents.",
    ],
  },
  {
    word: "swarthy",
    type: "adjective",
    meanings: ["of dark color or complexion"],
    examples: [
      "When he got drunk, Robinson's white skin became rather swarthy.",
    ],
  },
  {
    word: "sycophant",
    type: "noun",
    meanings: ["one who flatters for self-gain"],
    examples: [
      "Some see the people in the cabinet as the president's closest advisors, but others see them as sycophants.",
    ],
  },
  {
    word: "tacit",
    type: "adjective",
    meanings: ["expressed without words"],
    examples: [
      "I interpreted my parents' refusal to talk as a tacit acceptance of my request.",
    ],
  },
  {
    word: "taciturn",
    type: "adjective",
    meanings: ["not inclined to talk"],
    examples: [
      "Though Jane never seems to stop talking, her brother is quite taciturn.",
    ],
  },
  {
    word: "tangential",
    type: "adjective",
    meanings: ["incidental", "peripheral", "divergent"],
    examples: [
      "I tried to discuss my salary, but the boss kept veering off into tangential topics.",
    ],
  },
  {
    word: "tantamount",
    type: "adjective",
    meanings: ["equivalent in value or significance"],
    examples: [
      "When it comes to sports, fearing your opponent is tantamount to losing.",
    ],
  },
  {
    word: "tedious",
    type: "adjective",
    meanings: ["dull", "boring"],
    examples: [
      "As time passed and the history professor continued to drone on and on, the lecture became increasingly tedious.",
    ],
  },
  {
    word: "temerity",
    type: "noun",
    meanings: ["audacity", "recklessness"],
    examples: [
      "Tom and Huck entered the scary cave armed with nothing but their own temerity.",
    ],
  },
  {
    word: "temperance",
    type: "noun",
    meanings: ["moderation in action or thought"],
    examples: [
      "Maintaining temperance will ensure that you are able to think rationally and objectively.",
    ],
  },
  {
    word: "tenable",
    type: "adjective",
    meanings: ["able to be defended or maintained"],
    examples: [
      "The department heads tore down the arguments in other people's theses, but Johari's work proved to be quite tenable.",
    ],
  },
  {
    word: "tenuous",
    type: "adjective",
    meanings: ["having little substance or strength"],
    examples: [
      "Your argument is very tenuous, since it relies so much on speculation and hearsay.",
    ],
  },
  {
    word: "terrestrial",
    type: "adjective",
    meanings: ["relating to the land"],
    examples: ["Elephants are terrestrial animals."],
  },
  {
    word: "timorous",
    type: "adjective",
    meanings: ["timid", "fearful"],
    examples: [
      "When dealing with the unknown, timorous Tallulah almost always broke into tears.",
    ],
  },
  {
    word: "tirade",
    type: "noun",
    meanings: ["a long speech marked by harsh or biting language"],
    examples: [
      "Every time Jessica was late, her boyfriend went into a long tirade about punctuality.",
    ],
  },
  {
    word: "toady",
    type: "noun",
    meanings: ["one who flatters in the hope of gaining favors"],
    examples: [
      "The other kids referred to the teacher's pet as the Tenth Grade Toady.",
    ],
  },
  {
    word: "tome",
    type: "noun",
    meanings: ["a large book"],
    examples: [
      "In college, I used to carry around an anatomy book that was the heaviest tome in my bag.",
    ],
  },
  {
    word: "torpid",
    type: "adjective",
    meanings: ["lethargic", "dormant", "lacking motion"],
    examples: ["The torpid whale floated, wallowing in the water for hours."],
  },
  {
    word: "torrid",
    type: "adjective",
    meanings: ["giving off intense heat", "passionate"],
    examples: [
      "I didn't want to witness the neighbor's torrid affair through the window.",
    ],
  },
  {
    word: "tortuous",
    type: "adjective",
    meanings: ["winding"],
    examples: [
      "The scary thing about driving in mountains are the narrow, tortuous roads.",
    ],
  },
  {
    word: "tractable",
    type: "adjective",
    meanings: ["easily controlled"],
    examples: ["The horse was so tractable, Myra didn't even need a bridle."],
  },
  {
    word: "tranquil",
    type: "adjective",
    meanings: ["calm"],
    examples: [
      "There is a time of night when nothing moves and everything is tranquil.",
    ],
  },
  {
    word: "transgress",
    type: "verb",
    meanings: ["to violate", "go over a limit"],
    examples: [
      "The criminal's actions transgressed morality and human decency.",
    ],
  },
  {
    word: "transient",
    type: "adjective",
    meanings: ["passing through briefly; passing into and out of existence"],
    examples: [
      "Because virtually everyone in Palm Beach is a tourist, the population of the town is quite transient.",
    ],
  },
  {
    word: "transmute",
    type: "verb",
    meanings: ["to change or alter in form"],
    examples: [
      "Ancient alchemists believed that it was possible to transmute lead into gold.",
    ],
  },
  {
    word: "travesty",
    type: "noun",
    meanings: ["a grossly inferior imitation"],
    examples: [
      "According to the school newspaper's merciless theater critic, Pacific Coast High's rendition of the musical Oklahoma was a travesty of the original.",
    ],
  },
  {
    word: "tremulous",
    type: "adjective",
    meanings: ["fearful"],
    examples: [
      "I always feel a trifle tremulous when walking through a graveyard.",
    ],
  },
  {
    word: "trenchant",
    type: "adjective",
    meanings: ["effective", "articulate", "clear-cut"],
    examples: [
      "The directions that accompanied my new cell phone were trenchant and easy to follow.",
    ],
  },
  {
    word: "trepidation",
    type: "noun",
    meanings: ["fear", "apprehension"],
    examples: [
      "Feeling great trepidation, Anya refused to jump into the pool because she thought she saw a shark in it.",
    ],
  },
  {
    word: "trite",
    type: "adjective",
    meanings: ["not original", "overused"],
    examples: [
      "Keith thought of himself as being very learned, but everyone else thought he was trite because his observations about the world were always the same as David Letterman's.",
    ],
  },
  {
    word: "truculent",
    type: "adjective",
    meanings: ["ready to fight", "cruel"],
    examples: [
      "This club doesn't really attract the dangerous types, so why was that bouncer being so truculent?",
    ],
  },
  {
    word: "truncate",
    type: "verb",
    meanings: ["to shorten by cutting off"],
    examples: [
      "After winning the derby, the jockey truncated the long speech he had planned and thanked only his mom and his horse.",
    ],
  },
  {
    word: "turgid",
    type: "adjective",
    meanings: ["swollen", "excessively embellished in style or language"],
    examples: [
      "The haughty writer did not realize how we all really felt about his turgid prose.",
    ],
  },
  {
    word: "turpitude",
    type: "noun",
    meanings: ["depravity", "moral corruption"],
    examples: [
      "Sir Marcus's chivalry often contrasted with the turpitude he exhibited with the ladies at the tavern.",
    ],
  },
  {
    word: "ubiquitous",
    type: "adjective",
    meanings: ["existing everywhere", "widespread"],
    examples: [
      "It seems that everyone in the United States has a television. The technology is ubiquitous here.",
    ],
  },
  {
    word: "umbrage",
    type: "noun",
    meanings: ["resentment", "offense"],
    examples: [
      "He called me a lily-livered coward, and I took umbrage at the insult.",
    ],
  },
  {
    word: "uncanny",
    type: "adjective",
    meanings: ["of supernatural character or origin"],
    examples: [
      "Luka had an uncanny ability to know exactly what other people were thinking. She also had an uncanny ability to shoot fireballs from her hands.",
    ],
  },
  {
    word: "unctuous",
    type: "adjective",
    meanings: ["smooth or greasy in texture", "appearance", "manner"],
    examples: [
      "The unctuous receptionist seemed untrustworthy, as if she was only being helpful because she thought we might give her a big tip.",
    ],
  },
  {
    word: "undulate",
    type: "verb",
    meanings: ["to move in waves"],
    examples: [
      "As the storm began to brew, the placid ocean began to undulate to an increasing degree.",
    ],
  },
  {
    word: "upbraid",
    type: "verb",
    meanings: ["to criticize or scold severely"],
    examples: [
      "The last thing Lindsay wanted was for Lisa to upbraid her again about missing the rent payment.",
    ],
  },
  {
    word: "usurp",
    type: "verb",
    meanings: ["to seize by force", "take possession of without right"],
    examples: [
      "The rogue army general tried to usurp control of the government, but he failed because most of the army backed the legally elected president.",
    ],
  },
  {
    word: "utilitarian",
    type: "adjective",
    meanings: ["relating to or aiming at usefulness"],
    examples: [
      "The beautiful, fragile vase couldn't hold flowers or serve any other utilitarian purpose.",
    ],
  },
  {
    word: "utopia",
    type: "noun",
    meanings: ["an imaginary and remote place of perfection"],
    examples: [
      "Everyone in the world wants to live in a utopia, but no one can agree how to go about building one.",
    ],
  },
  {
    word: "vacillate",
    type: "verb",
    meanings: ["to fluctuate", "hesitate"],
    examples: [
      "I prefer a definite answer, but my boss kept vacillating between the distinct options available to us.",
    ],
  },
  {
    word: "vacuous",
    type: "adjective",
    meanings: ["lack of content or ideas", "stupid"],
    examples: [
      "Beyonce realized that the lyrics she had just penned were completely vacuous and tried to add more substance.",
    ],
  },
  {
    word: "validate",
    type: "verb",
    meanings: ["to confirm", "support", "corroborate"],
    examples: [
      "Yoko's chemistry lab partner was asleep during the experiment and could not validate the accuracy of her methods.",
    ],
  },
  {
    word: "vapid",
    type: "adjective",
    meanings: ["lacking liveliness", "dull"],
    examples: [
      "The professor's comments about the poem were surprisingly vapid and dull.",
    ],
  },
  {
    word: "variegated",
    type: "adjective",
    meanings: ["diversified", "distinctly marked"],
    examples: [
      "Each wire in the engineering exam was variegated by color so that the students could figure out which one was which.",
    ],
  },
  {
    word: "vehemently",
    type: "adverb",
    meanings: ["marked by intense force or emotion"],
    examples: [
      "The candidate vehemently opposed cutting back on Social Security funding.",
    ],
  },
  {
    word: "veneer",
    type: "noun",
    meanings: ["a superficial or deceptively attractive appearance", "façade"],
    examples: [
      "Thanks to her Chanel makeup, Shannen was able to maintain a veneer of perfection that hid the flaws underneath.",
    ],
  },
  {
    word: "venerable",
    type: "adjective",
    meanings: ["deserving of respect because of age or achievement"],
    examples: [
      "The venerable Supreme Court justice had made several key rulings in landmark cases throughout the years.",
    ],
  },
  {
    word: "venerate",
    type: "verb",
    meanings: ["to regard with respect or to honor"],
    examples: [
      "The tribute to John Lennon sought to venerate his music, his words, and his legend.",
    ],
  },
  {
    word: "veracity",
    type: "noun",
    meanings: ["truthfulness", "accuracy"],
    examples: [
      "With several agencies regulating the reports, it was difficult for Latifah to argue against its veracity.",
    ],
  },
  {
    word: "verbose",
    type: "adjective",
    meanings: ["wordy", "impaired by wordiness"],
    examples: [
      "It took the verbose teacher two hours to explain the topic, while it should have taken only fifteen minutes.",
    ],
  },
  {
    word: "verdant",
    type: "adjective",
    meanings: ["green in tint or color"],
    examples: ["The verdant leaves on the trees made the world look emerald."],
  },
  {
    word: "vestige",
    type: "noun",
    meanings: ["a mark or trace of something lost or vanished"],
    examples: [
      "Do you know if the Mexican tortilla is a vestige of some form of Aztec corn-based flat bread?",
    ],
  },
  {
    word: "vex",
    type: "verb",
    meanings: ["to confuse or annoy"],
    examples: [
      "My little brother vexes me by poking me in the ribs for hours on end.",
    ],
  },
  {
    word: "vicarious",
    type: "adjective",
    meanings: ["experiencing through another"],
    examples: [
      "All of my lame friends learned to be social through vicarious involvement in my amazing experiences.",
    ],
  },
  {
    word: "vicissitude",
    type: "noun",
    meanings: ["event that occurs by chance"],
    examples: [
      "The vicissitudes of daily life prevent me from predicting what might happen from one day to the next.",
    ],
  },
  {
    word: "vigilant",
    type: "adjective",
    meanings: ["watchful", "alert"],
    examples: [
      "The guards remained vigilant throughout the night, but the enemy never launched the expected attack.",
    ],
  },
  {
    word: "vilify",
    type: "verb",
    meanings: ["to lower in importance", "defame"],
    examples: [
      "After the Watergate scandal, almost any story written about President Nixon sought to vilify him and criticize his behavior.",
    ],
  },
  {
    word: "vindicate",
    type: "verb",
    meanings: ["to avenge; to free from allegation; to set free"],
    examples: [
      "The attorney had no chance of vindicating the defendant with all of the strong evidence presented by the state.",
    ],
  },
  {
    word: "vindictive",
    type: "adjective",
    meanings: ["vengeful"],
    examples: [
      "The vindictive madman seeks to exact vengeance for any insult that he perceives is directed at him, no matter how small.",
    ],
  },
  {
    word: "virtuoso",
    type: "noun",
    meanings: ["one who excels in an art; a highly skilled musical performer"],
    examples: [
      "Even though Lydia has studied piano for many years, she's only average at it. She's no virtuoso, that's for sure.",
    ],
  },
  {
    word: "viscous",
    type: "adjective",
    meanings: ["not free flowing", "syrupy"],
    examples: [
      "The viscous syrup took three minutes to pour out of the bottle.",
    ],
  },
  {
    word: "vitriolic",
    type: "adjective",
    meanings: ["having a caustic quality"],
    examples: ["When angry, the woman would spew vitriolic insults."],
  },
  {
    word: "vituperate",
    type: "verb",
    meanings: ["to berate"],
    examples: [
      "Jack ran away as soon as his father found out, knowing he would be vituperated for his unseemly behavior.",
    ],
  },
  {
    word: "vivacious",
    type: "adjective",
    meanings: ["lively", "sprightly"],
    examples: [
      "The vivacious clown makes all of the children laugh and giggle with his friendly antics.",
    ],
  },
  {
    word: "vocation",
    type: "noun",
    meanings: ["the work in which someone is employed", "profession"],
    examples: [
      "After growing tired of the superficial world of high-fashion, Edwina decided to devote herself to a new vocation: social work.",
    ],
  },
  {
    word: "vociferous",
    type: "adjective",
    meanings: ["loud", "boisterous"],
    examples: [
      "I'm tired of his vociferous whining so I'm breaking up with him.",
    ],
  },
  {
    word: "wallow",
    type: "verb",
    meanings: ["to roll oneself indolently; to become or remain helpless"],
    examples: [
      "My roommate can't get over her breakup with her boyfriend and now just wallows in self-pity.",
    ],
  },
  {
    word: "wane",
    type: "verb",
    meanings: ["to decrease in size", "dwindle"],
    examples: [
      "Don't be so afraid of his wrath because his influence with the president is already beginning to wane.",
    ],
  },
  {
    word: "wanton",
    type: "adjective",
    meanings: ["undisciplined", "lewd", "lustful"],
    examples: [
      "Vicky's wanton demeanor often made the frat guys next door very excited.",
    ],
  },
  {
    word: "whimsical",
    type: "adjective",
    meanings: ["fanciful", "full of whims"],
    examples: [
      "The whimsical little girl liked to pretend that she was an elvin princess.",
    ],
  },
  {
    word: "wily",
    type: "adjective",
    meanings: ["crafty", "sly"],
    examples: [
      "Though they were not the strongest of the Thundercats, wily Kit and Kat were definitely the most clever and full of tricks.",
    ],
  },
  {
    word: "winsome",
    type: "adjective",
    meanings: ["charming", "pleasing"],
    examples: [
      "After such a long, frustrating day, I was grateful for Chris's winsome attitude and childish naivete.",
    ],
  },
  {
    word: "wistful",
    type: "adjective",
    meanings: ["full of yearning; musingly sad"],
    examples: [
      "Since her pet rabbit died, Edda missed it terribly and sat around wistful all day long.",
    ],
  },
  {
    word: "wizened",
    type: "adjective",
    meanings: ["dry", "shrunken", "wrinkled"],
    examples: [
      "Agatha's grandmother, Stephanie, had the most wizened countenance, full of leathery wrinkles.",
    ],
  },
  {
    word: "wrath",
    type: "noun",
    meanings: ["vengeful anger", "punishment"],
    examples: [
      "Did you really want to incur her wrath when she is known for inflicting the worst punishments legally possible?",
    ],
  },
  {
    word: "yoke",
    type: "verb",
    meanings: ["to join", "link"],
    examples: ["We yoked together the logs by tying a string around them."],
  },
  {
    word: "zealous",
    type: "adjective",
    meanings: ["fervent", "filled with eagerness in pursuit of something"],
    examples: [
      "If he were any more zealous about getting his promotion, he'd practically live at the office.",
    ],
  },
  {
    word: "zenith",
    type: "noun",
    meanings: ["the highest point", "culminating point"],
    examples: [
      "I was too nice to tell Nelly that she had reached the absolute zenith of her career with that one hit of hers.",
    ],
  },
  {
    word: "zephyr",
    type: "noun",
    meanings: ["a gentle breeze"],
    examples: [
      "If not for the zephyrs that were blowing and cooling us, our room would've been unbearably hot.",
    ],
  },
];

export const getAllWords = () => {
  return words.map(({ word, type, meanings, examples }, idx) => {
    return {
      uniqueId: `word_${idx + 1}`,
      word: word,
      type: type,
      meanings,
      examples,
    };
  });
};
