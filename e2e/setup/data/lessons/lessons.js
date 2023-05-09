const { ObjectId } = require("mongodb");
const { faker } = require("@faker-js/faker");

module.exports = [
  {
    _id: ObjectId("62e26dc669dd077fc82fbffa"),
    lesson_label: "Lesson 4.8: HTML Basics",
    order: 8,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=HTML Basics",
    },
    learning_objectives: [
      "Semantic markup",
      "Formatting page content",
      "Understanding file paths",
      "Displaying images",
      "Inline vs. block level elements",
      "Forms",
      "Input elements",
      "Select menus",
      "Radio buttons",
      "Checkboxes",
      "Video element",
      "Audio element",
      "Custom media players",
    ],
    mindset_content:
      "For many, failure has become deeply engrained in us as something to avoid. And for that reason, as you’re learning to code, you may find that your gut response to bright red error messages or long stack traces is one of fear, anger, or frustration. But we’ll let you in on a little secret—those error messages and stack traces are a gift. (And they’re the key to learning!)\n\nThere’s no faster way to learn than to experiment often. Try your code out incrementally as you work on it and see what is or is not working the way you expect! Then put your budding debugging skills to work and figure out what’s going on. If you spend all of your time worrying about making your code perfect before running it, chances are you’ve waited too long. If you don’t believe us, here’s a testimonial on **[the power of learning from failure](https://blog.codinghorror.com/success-through-failure/)** from one of the co-founders of Stack Overflow.\n\nEvery time you encounter an error or failure is another time you have discovered what doesn’t work. That’s valuable information!\n\n1. Think of an example of something you have done in your life that you failed at multiple times before you got it—doesn’t have to be coding-related, maybe a sports play, a piece on a musical instrument, or a video game level. How did you keep yourself motivated to keep trying?\n2. Have you witnessed others learn from failures and then succeed? What strategies have they used?\n",
    assignment_airtableID: ["recnkUVqXPiVm1hQ9"],
    materials_airtableID: [
      "recPIg5BTCTvK2n22",
      "recNXVaVwm2OaE0j5",
      "recbSoPGthb0rHbMS",
      "recmb4E1WP5GLQw5c",
      "recIqQx3JL8UmeRpO",
      "reco3qe9bm6lzhLsP",
    ],
    section_title: ["Section 4: Web Basics"],
    materials: [
      ObjectId("62e26db569dd077fc82fbfdb"),
      ObjectId("62e26dbb69dd077fc82fbfe2"),
      ObjectId("62e26dc769dd077fc82fc013"),
      ObjectId("62e26dc669dd077fc82fbffd"),
      ObjectId("62e26db569dd077fc82fbfdc"),
      ObjectId("62e26dc769dd077fc82fc015"),
    ],
    assignments: [ObjectId("62e26dc669dd077fc82fc00d")],
    title: "HTML Basics",
    section: ObjectId("633d9916ec0d4b5e83a6b061"),
  },
  {
    _id: ObjectId("62e26dc669dd077fc82fc00b"),
    lesson_label: "Lesson 1.4: JavaScript Arrays",
    order: 4,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript Arrays",
    },
    learning_objectives: [
      "Store Multiple Values in an Array",
      "Loop Through Arrays",
      "Multidimensional Arrays",
    ],
    mindset_content:
      "Being afraid of the unknown is part of the human experience. None of us know what tomorrow may bring. The interesting thing about that fear is that it can be positive or negative. If you’ve been excited about the prospect of starting a new job, starting a new relationship, or venturing to a new place, you’re experiencing the positive side. If you’re worried about something in the future that may be an unpleasant experience like having to confront someone about a problem or ending a personal or professional relationship, you’re experiencing the negative side.\n\nYou may be feeling this way in this class; excited to learn new things and start a new chapter in your life, frustrated if you struggle with a concept, happy when you understand and succeed, worried about how to juggle class with the rest of what is going on in your life.\n\nWhether your fear of the unknown is positive or negative, embracing the unknown allows you to continue on your journey and see where it goes. Remember that\n\n“The expert in anything was once a beginner”\n— Helen Hayes\n\nThis week think about where you’re at in your journey.\n\n1. So far in class, have you had any “aha” moments?\n2. What have you enjoyed the most? What has been the hardest?\n3. What were you excited/worried about before class started? How do you feel about what’s still to come in this class and in your journey ahead? \n",
    assignment_airtableID: ["recT82isuCtcuqV2v"],
    materials_airtableID: ["recSKNCYFW06OqMYa"],
    section_title: ["Section 1: Programming Fundamentals"],
    materials: [ObjectId("62e26dc669dd077fc82fc007")],
    assignments: [ObjectId("62e26dc769dd077fc82fc014")],
    title: "JavaScript Arrays",
    section: ObjectId("633d9915ec0d4b5e83a6b05e"),
  },
  {
    _id: ObjectId("62e26dbb69dd077fc82fbfe4"),
    lesson_label: "Lesson 6.14: AJAX Basics",
    order: 14,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=AJAX Basics",
    },
    learning_objectives: [
      "AJAX Concepts",
      "How to use JavaScript to make AJAX requests",
      "Use AJAX callbacks to respond to server responses",
      "How to process JSON with JavaScript",
    ],
    mindset_content:
      "A few weeks back we discussed how to effectively ask for help. Feel free to review that topic and your answers this week ([link to that week’s lesson here](https://airtable.com/appN9Hf8KluRDBAN4/pagrsn4bWZq1w69YZ?sEWUo=rec9RmCGz8oP8jWC1)). We’ll be talking about asking for help again, but this time let’s focus on the _when _since we’ve already covered the _how_.\n\nAt the beginning of this course you may have wanted to ask for help as soon as you hit a problem and before you even tried to debug or problem solve on your own. You don’t have to do that anymore since you have those problem solving and debugging processes we’ve been talking about. But the opposite can happen too; sometimes you get so determined to solve the problem on your own that you spend hours longer than you needed to trying to fix something, when asking for help could have saved you time and frustration.\n\nRead this article about **[knowing when to ask for help at work](https://hbr.org/2021/04/how-to-ask-for-help-at-work)**, then answer the following questions:\n1. Have you implemented/used any new strategies since the previous post on how to ask for help? If so what were they and how did they turn out for you?\n2. After reading the article what changes (if any) will you make to your strategy?\n3. What are some ways you can determine which “circle” (inner circle of things you know, middle circle of things you can figure out on your own, outer circle of things you don’t know and can’t learn by yourself) your blocker/bug/issue falls into?\n",
    assignment_airtableID: ["recCLjW8tktaLeonp"],
    materials_airtableID: null,
    section_title: ["Section 6: AJAX Basics"],
    materials: [],
    assignments: [ObjectId("62e26dc569dd077fc82fbfef")],
    title: "AJAX Basics",
    section: ObjectId("633d9916ec0d4b5e83a6b05f"),
  },
  {
    _id: ObjectId("62e26dc769dd077fc82fc017"),
    lesson_label: "Lesson 1.3: JavaScript Loops",
    order: 3,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript Loops",
    },
    learning_objectives: [
      "Simplify Repetitive Tasks with Loops",
      "Working with ‘for’ Loops",
    ],
    mindset_content:
      "The field of software development is constantly growing and changing—new programming languages, libraries, tools, and best practices are coming out all the time—and what is possible in technology is fueled by the curiosity and open-mindedness of programmers to learn and experiment with new things.\n\nFor this week’s mindset prompts we’re going to focus on developing a practice of learning as a way to grow and evolve your technical skills. Here’s a **[brief episode of Developer Tea](https://developertea.simplecast.com/episodes/habits-of-learning-developers)** that we think gets to the core of good learning habits.\n\n1. In your own words, what does it mean to be curious about something?\n2. What’s one thing that you were curious to learn more about recently (this doesn’t need to be coding-related)? How did you learn more about it?\n3. What’s one best practice you’ve learned in your first few weeks at CTD that you don’t know “the why” behind? How can you find out “the why”?\n",
    assignment_airtableID: ["recjcMr9nYUhlmz4p"],
    materials_airtableID: ["recSKNCYFW06OqMYa"],
    section_title: ["Section 1: Programming Fundamentals"],
    materials: [ObjectId("62e26dc669dd077fc82fc007")],
    assignments: [ObjectId("62e26dc569dd077fc82fbff1")],
    title: "JavaScript Loops",
    section: ObjectId("633d9915ec0d4b5e83a6b05e"),
  },
  {
    _id: ObjectId("62e26dbb69dd077fc82fbfe5"),
    lesson_label: "Lesson 1.1: JavaScript Basics",
    order: 1,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript Basics and Numbers",
    },
    learning_objectives: [
      "What JavaScript is and where it is used",
      "The basic syntax of the JavaScript programming language",
      "Basic programming concepts like variables, data types, and conditional statements",
      "How to troubleshoot programming problems",
    ],
    mindset_content:
      "This week we would just like you to get settled into a good routine, and become familiar with all the different tools you’ll be using throughout the course. Next week will be your first week that has a Mindset Assignment. Welcome to class! Let us (your Class Coordinator or Mentor(s)) know if you need help with anything!\n",
    assignment_airtableID: ["reczY4ncKOVutoWIW"],
    materials_airtableID: [
      "recjl5xt8xcM3gH9e",
      "recQgtkgPrRED97m1",
      "recXVmTT4OBhKEXlf",
    ],
    section_title: ["Section 1: Programming Fundamentals"],
    materials: [
      ObjectId("62e26dbb69dd077fc82fbfe0"),
      ObjectId("62e26dc569dd077fc82fbff0"),
      ObjectId("62e26dbb69dd077fc82fbfdf"),
    ],
    assignments: [ObjectId("62e26dc669dd077fc82fc005")],
    title: "JavaScript Basics",
    section: ObjectId("633d9915ec0d4b5e83a6b05e"),
  },
  {
    _id: ObjectId("62e26dc569dd077fc82fbff8"),
    lesson_label: "Lesson 4.9: JavaScript and the DOM",
    order: 9,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript and the DOM",
    },
    learning_objectives: [
      "What is the DOM?",
      "Making Changes to the DOM",
      "Responding to User Interaction",
      "Traveling Through the DOM (Traversal)",
    ],
    mindset_content:
      "Have you ever gotten advice from someone, that turned out to be wrong, perhaps bad advise or just not applicable in your particular scenario? The internet is a powerful tool to provide information to the masses, but there isn’t anything in place that regulates whether that information is accurate, and it isn’t always immediately apparent when information is or is not applicable to what you’re experiencing. As developers you’ll rely on the internet a lot, but that doesn’t mean all the answers you find will be correct, the best solution, or helpful.\n\nInformation literacy is the ability to identify, find, evaluate, and use information effectively. In technology, this often translates not only to assessing the accuracy of answers but also how to find a solution that aligns with your project specifications (ex. Did you find an article with a solution to your problem, but the solution is for someone using a different version of Ruby or NPM?) The specs may not always be a perfect match, but could still shed light on a shared root cause.\n\nSome helpful tools that equip you to have stronger information literacy are:\n1) Know your own specifications (what tools + versions you’re using) so you can be critical about the answers you read.\n2) Is this information “from the source” (official developer documentation) or second hard (a tutorial or blog post)? The latter may warrant some additional skepticism—when it doubt start with the source, and then look to secondary resources to supplement.\n3) Is this a site you trust and has helped you before reliably?\n\nNavigating information sources takes time to get the hang of, so incorporate some of the tools we’ve covered earlier regarding asking for help, debugging, being curious and willing to try new things, and being ok with not knowing the answer at first!\n\nThis week consider…\n1. When was a time you got misinformation or bad advice? What happened?\n2. What are some ‘clues’ that you use to help you assess whether a resources is applicable/trustworthy or not?\n3. What are some ways you’ll build on your information literacy either in your personal life or as a developer?\n",
    assignment_airtableID: ["recdN6MZKLPRvou55"],
    materials_airtableID: [
      "rec0ciVXtKIxcAn9I",
      "recubtaSFJewIbsq1",
      "recyl1TfA9dK43pvB",
    ],
    section_title: ["Section 4: Web Basics"],
    materials: [
      ObjectId("62e26dc569dd077fc82fbff9"),
      ObjectId("62e26db569dd077fc82fbfd4"),
      ObjectId("62e26db569dd077fc82fbfd0"),
    ],
    assignments: [ObjectId("62e26dc569dd077fc82fbff4")],
    title: "JavaScript and the DOM",
    section: ObjectId("633d9916ec0d4b5e83a6b061"),
  },
  {
    _id: ObjectId("62e26dc569dd077fc82fbff3"),
    lesson_label: "Lesson 4.10: HTML Forms and DOM Practice",
    order: 10,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=HTML Forms and DOM Practice",
    },
    learning_objectives: [
      "HTML Forms",
      "DOM element selection",
      "DOM traversal",
      "DOM manipulation",
      "Event handling",
    ],
    mindset_content:
      "Though, at times, a solution may come together quickly first try, it more often than not takes some determination and thoughtful problem solving to see a new challenge over the finish line. (Pro tip: Those also end up being the truly satisfying wins!) But have you ever looked at a new problem and thought “I have no idea how to even get started!” … Fear not! Problem solving is a learned skill too, and if you develop a solid process—e.g., understanding the problem, planning, dividing the problem into subproblems—even the trickiest of challenges can be chipped away at.\n\nThis **[FreeCodeCamp article](https://www.freecodecamp.org/news/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2/)** does a nice job of defining a problem solving process. Your preferred process may not end up mirroring this one exactly, but use this as inspiration to develop your own approach.\n\n1. Do you already have a problem solving process in place that you’ve found effective? If so, tell us about it!\n2. How does problem solving show up through other hobbies or activities in your life?\n3. Have you observed others in the class solving problems differently than you do? What have you learned from their problem solving techniques?\n",
    assignment_airtableID: ["recRjyCc9sbykt0EN"],
    materials_airtableID: ["recQD8vDDn7i87d2c"],
    section_title: ["Section 4: Web Basics"],
    materials: [ObjectId("62e26dbb69dd077fc82fbfec")],
    assignments: [ObjectId("62e26db569dd077fc82fbfd3")],
    title: "HTML Forms and DOM Practice",
    section: ObjectId("633d9916ec0d4b5e83a6b061"),
  },
  {
    _id: ObjectId("62e26dc669dd077fc82fbffb"),
    lesson_label: "Lesson 4.12: CSS Layout",
    order: 12,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=CSS Layout",
    },
    learning_objectives: [
      "The CSS Box Model",
      "CSS Display Property",
      "CSS Positioning",
      "CSS Media Queries",
      "Understanding Flexbox",
      "Flexbox Properties",
      "Building a Layout with Flexbox",
      "Declaring row and column tracks",
      "Setting gutters between rows and columns",
      "Creating flexible and responsive grid layouts without media queries",
      "Using Grid with Flexbox",
    ],
    mindset_content:
      "This week we’ll continue to explore design by discussing visual hierarchy. Visual hierarchy is how we decide where to place pieces of our site so they’ll be easy to find, interact with, or stand out. Have you ever been somewhere (in person or on the web) that was new to you and you needed a minute to find your way around? If it was a physical location, how did you find the exits/bathrooms/stairs? If it was a website, were you able to find the page that had the information you wanted easily, like the product description page? Visual hierarchy goes a long way in whether or not the user has an easy and pleasant experience navigating their environment, or a challenging and frustrating one.\n\n**[This article from Adobe](https://xd.adobe.com/ideas/process/information-architecture/visual-hierarchy-principles-examples/)** is a lengthy one, but covers basically all the variables to take into account when creating a layout. Design is more than just colors and fonts as you’ll find when reading that article. Where you place things, how much space you put around them, and the fonts and colors too, all go into the design of a site. And just like whether or not there are clear bathroom signs, your design choices can make for a great or uncomfortable experience. Once you’ve taken a look at that article…\n\n1. Think about a time when a layout personally impacted your experience (like the examples in the first paragraph) and describe the scene for us. Also share how you felt when you could/couldn’t find what you were looking for.\n2. In the visual hierarchy article, were there topics that surprised you? If so, which one(s) and why?\n3. What are some of your most favorite and least favorite design features as a user?\n",
    assignment_airtableID: ["recmoTjl98WfwbfIq"],
    materials_airtableID: [
      "recd3IhhfYHkfd1PJ",
      "rect4oKnr59aPQvfe",
      "recLI1vrYErXXAXUS",
    ],
    section_title: ["Section 4: Web Basics"],
    materials: [
      ObjectId("62e26db569dd077fc82fbfda"),
      ObjectId("62e26dbb69dd077fc82fbfed"),
      ObjectId("62e26dc669dd077fc82fc004"),
    ],
    assignments: [ObjectId("62e26dc669dd077fc82fc009")],
    title: "CSS Layout",
    section: ObjectId("633d9916ec0d4b5e83a6b061"),
  },
  {
    _id: ObjectId("62e26dbb69dd077fc82fbfe8"),
    lesson_label: "Lesson 3.7: How the Web Works",
    order: 7,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=How the Web Works",
    },
    learning_objectives: [
      "How the Web Works",
      "URLs",
      "Domain Names",
      "IP addresses",
      "The Domain Name System",
      "HTTP and HTTPS",
    ],
    mindset_content:
      "It may come as a surprise to you that one of the key skills for new software developers to learn is how to _effectively_ ask for help. When we’re a beginner, we certainly don’t know how everything works, and every new topic we stumble across uncovers new and sometimes more complex questions.\n\nIndependently searching for answers on Google, Youtube, and Stack Overflow and developing good debugging practices is a great start, but that may not solve all the challenges you come across (or certainly not in the most timely manner). So learning _when_ and _how_ to ask for help is a skill we recommend developing in this course.\n\nThe amount of time may vary person-to-person, but explore what rule of thumb works for you (e.g., “If I’ve been working at a problem for > 20min and haven’t uncovered any new information or don’t have anything to try next, time to stop and ask!”) Once you’ve made the decision to ask, then it’s important to consider the appropriate level of detail and context to include in the question and who to ask. (Just posting “HELPP!!” in the group Slack channel doesn’t give people much to go off of.)\n\nTake a look at **[this article](https://www.freecodecamp.org/news/how-to-ask-good-technical-questions/)** to get some inspiration for how to ask good technical questions.\n\n1. What’s your rule of thumb for when to ask for help?\n2. When is an instance where you wish you would have asked for help sooner?\n3. What information have you found crucial to include in your questions so that mentors or peers can help answer your questions quicker?\n",
    assignment_airtableID: ["rec9cqpVZovpQTMbT"],
    materials_airtableID: ["recqctkC1xWiKpbJs"],
    section_title: ["Section 3: How the Web Works"],
    materials: [ObjectId("62e26db569dd077fc82fbfcf")],
    assignments: [ObjectId("62e26dc769dd077fc82fc016")],
    title: "How the Web Works",
    section: ObjectId("633d9916ec0d4b5e83a6b060"),
  },
  {
    _id: ObjectId("62e26dc669dd077fc82fc000"),
    lesson_label: "Lesson 6.16: Final Project Completion",
    order: 16,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrvDsCdQ24i80Lv2?prefill_Class%20you%20are%20in=Borr",
    },
    learning_objectives: [
      "Compare your final project to the rubric to ensure you're meeting all requirements",
      "Debug any code that isn't functioning properly",
      "Test your site to make sure it's responsive and functioning as you expect",
    ],
    mindset_content:
      "Welcome to your final week! This week we’ll be talking about accessibility. Take a moment and think of a time when there was something you wanted or needed but didn’t have access to it for some reason or another. Being denied access to something you want or need can feel beyond frustrating.\n\nThe internet is a very powerful tool. So many businesses give extra discounts to people with accounts on their sites; government offices keep forms on their sites now instead of keeping paper copies; medical offices now use client portals for people to be able to access and pay their accounts, and schedule appointments and services. Not being able to get around and use any of these sites can make something that was supposed to be a better/easier alternative seem like a huge stumbling block.\n\nAccessibility focuses on making sure that those of us who are helping build these structures build them in a way that EVERYONE can use them easily. Read the information at the **[WebAim site](https://webaim.org/intro/)** then check out the **[A11y Checklist](https://www.a11yproject.com/checklist/)**. These should give you an introduction into the challenges some people face when trying to use and interact with websites, and the ways in which we can assure our web creations are accessible to everyone. We strongly recommend bookmarking a tool you can run your code through to help check for accessibility compliance ([Wave from WebAIM](https://wave.webaim.org/)) or a simple tool you can add to your code to help you check accessibility features on your site (like [totA11y from Khan Academy](https://khan.github.io/tota11y/)).\n\nAccessibility is a way bigger topic than we can cover here, but hopefully this starts your wheels turning about how to be sure that the awesome things you build throughout your career can be easily used by everyone.\n\n1. When you’ve had limited or no access to something, what did you do? Were you ultimately able to get what you needed? If not, how did your lack of access impact your life?\n2. Now that you’ve read about accessibility, and hopefully considered some of the challenges others face using the internet, are there things you can/will do differently in your current/future project(s)? Give examples/specifics.\n",
    assignment_airtableID: ["recDIXNoFYmGVJXCs"],
    materials_airtableID: null,
    section_title: ["Section 6: AJAX Basics"],
    materials: [],
    assignments: [ObjectId("62e26dc669dd077fc82fc001")],
    title: "Final Project Completion",
    section: ObjectId("633d9916ec0d4b5e83a6b05f"),
  },
  {
    _id: ObjectId("62e26dc669dd077fc82fc00a"),
    lesson_label: "Lesson 5.13: How the Internet Works & Debugging",
    order: 13,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=How the Internet Works and Debugging",
    },
    learning_objectives: [
      "Clients and Servers",
      "TCP/IP",
      "Routers and Switches",
      "Connecting to the Internet",
      "What is Debugging?",
      "Breaking on Events and Basic Stepping",
      "Basic and Conditional Line Breakpoints",
      "Debugging Functions",
      "Debugging Exception Errors",
      "Breaking on DOM Changes and Watch Expressions",
    ],
    mindset_content:
      "This week we’re thinking about bugs. Not the creepy-crawly kind, but the ones that cause our code to break, behave differently than how we expect, or provide incorrect output. Having bugs in your code is inevitable. We are all human and thus prone to making mistakes like misspelling a variable or forgetting to convert a string back into a number before we use it to calculate something. Even the most experienced coders will have bugs in their code. The trick is to know an approach for debugging your code. The first step to that uses skills we’ve talked about previously: having a growth mindset, being ok with not knowing everything, being determined to solve the problem, and knowing when to ask for help. You will find a method of attacking those bugs that work best for you, but for now here are some great starting points…\n\nThe **[first two paragraphs of this gitconnected article](https://levelup.gitconnected.com/beginner-tips-for-debugging-your-code-3c4e2b42863a)** are a great practice for every programmer. When you’re still a beginner, a lot of error messages will be overwhelming and won’t make any sense at first. A good practice is to search for the complete error (ex. you get “Uncaught ReferenceError: battlehsip is not defined at index.js:5:20” in your console, so search for “Uncaught ReferenceError” and make a note of the “index.js:5:20” as that tells you the file ‘index.js’, the line ‘5’ and the character on that line ’20’ where the error is occuring)\n\nFrom there, use these **[suggested codeacademy techniques](https://www.codecademy.com/resources/blog/how-to-debug-your-code/)** (like printing/console logging your variables right before where the error is, or commenting out your code and the add back in the code line by line until it breaks again) to track down the bug and fix it!\n\nAfter reading the two articles linked above…\n1. Share a recent instance of your code not doing what you expected or wanted it to. How did you find out it wasn’t doing what you wanted it to? What did you do to find out why it wasn’t doing what you wanted it to?\n2. Once you found the bug, how did you approach fixing it?\n3. What did you learn from that debugging process that you will carry with you for the next time you’re hunting down a bug to fix?\n",
    assignment_airtableID: ["recAGcDiEFuSTDSgw"],
    materials_airtableID: ["recubtaSFJewIbsq1", "recyl1TfA9dK43pvB"],
    section_title: ["Section 5: How the Internet Works"],
    materials: [
      ObjectId("62e26db569dd077fc82fbfd4"),
      ObjectId("62e26db569dd077fc82fbfd0"),
    ],
    assignments: [ObjectId("62e26dc669dd077fc82fbfff")],
    title: "How the Internet Works & Debugging",
    section: ObjectId("633d9917ec0d4b5e83a6b063"),
  },
  {
    _id: ObjectId("62e26dbb69dd077fc82fbfe6"),
    lesson_label: "Lesson 1.5: JavaScript Objects",
    order: 5,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript Objects",
    },
    learning_objectives: ["Object Basics", "Loop Through Objects"],
    mindset_content:
      "Whether motivated by the possibility of bolstering your learning trajectory or to get started practicing skills that are highly valued in the workplace, we’re excited to talk this week about collaboration. The age old myth of the lone coder sitting in the dark coding through the night has finally been upended in recent years.\n\nLeading tech industry companies now create open, collaborative workspaces and harness tools that enable software developers to work together more effectively—if not on code directly then at least on knowledge sharing or getting projects over the finish line.\n\nEspecially given your cohort mates in Code the Dream are working toward similar goals, there’s no time like the present to start putting peer-to-peer collaboration into practice. **[This article](https://www.smashingmagazine.com/2020/04/collaborative-coding-ultimate-career-hack/)** shares some more formal methods of collaboration common in the software development space (including pair programming, code reviewing, and agile), but feel free to start with some lighter weight collaboration practices first, like asking a peer to hop on a screenshare to walk through code with you when you get stuck—and offering to do the same for them!\n\n1. How is collaboration used in your own family/culture/current workplace/etc. ?\n2. What’s one challenge you, personally, encounter while collaborating with others? What ideas do you have for overcoming that challenge?\n3. What’s one topic you want to start collaborating with classmates on this week?\n",
    assignment_airtableID: ["recda7o8ss1juwNyh"],
    materials_airtableID: ["rec8o9nfKeopSskpt"],
    section_title: ["Section 1: Programming Fundamentals"],
    materials: [ObjectId("62e26dc669dd077fc82fc010")],
    assignments: [ObjectId("62e26dc569dd077fc82fbff2")],
    title: "JavaScript Objects",
    section: ObjectId("633d9915ec0d4b5e83a6b05e"),
  },
  {
    _id: ObjectId("62e26dbb69dd077fc82fbfe1"),
    lesson_label: "Lesson 1.2: JavaScript Functions",
    order: 2,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=JavaScript Functions",
    },
    learning_objectives: [
      "Create Reusable Code with Functions",
      "Pass Information Into Functions",
      "Arrow Functions",
    ],
    mindset_content:
      "Welcome to the mindset curriculum!\n\nFrom our experience seeing folks learn new programming skills over the past many cohorts, we have witnessed how much the right mindset makes a difference in building new skills, putting them into practice, and achieving new heights.\nWhen you hear the word mindset, you likely think of growth vs. fixed mindset. And this is one of the most fundamental mindsets to develop as a new software developer! (If you haven’t heard of growth mindset, here’s a **[TED talk from Carol Dweck](https://www.youtube.com/watch?v=_X0mgOOSpLU)**, who coined the term.)\n\nBut developing the right mindset to learn coding doesn’t stop there—we believe there are a number of important mindsets to develop. Each week, throughout this course, we’ll be posting articles and discussion questions here to help give insight into mindsets that can support not only your learning but your long-term career growth as a software developer.\n\nTo help us set the stage for our mindsets, we’ll kick off by first thinking about our goals and motivations and reflecting on how growth mindset has impacted our past learning experiences.\n\n1. Why do you want to be a software developer?\n2. What do you plan to do with your skills after the class ends?\n3. Can you think of a time when a growth mindset helped you learn or achieve something new?\n4. What other mindsets have helped you learn new skills?\n",
    assignment_airtableID: ["rec0xEldBjD8hz3t6"],
    materials_airtableID: ["recigzvxC6E4VnQ6h"],
    section_title: ["Section 1: Programming Fundamentals"],
    materials: [ObjectId("62e26dbb69dd077fc82fbfe9")],
    assignments: [ObjectId("62e26dc569dd077fc82fbff6")],
    title: "JavaScript Functions",
    section: ObjectId("633d9915ec0d4b5e83a6b05e"),
  },
  {
    _id: ObjectId("62e26dc669dd077fc82fc006"),
    lesson_label: "Lesson 2.6: Introduction to Git",
    order: 6,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=Introduction to Git",
    },
    learning_objectives: ["Repositories", "Commits", "History", "GitHub"],
    mindset_content:
      "By this stage in the course, you’ve probably run into a bug or two that has taken some time—maybe much longer than your anticipated!—to figure out, or perhaps one that required showing your code to a mentor to get unstuck. If you did work with a mentor to figure out that bug, you likely observed them put a few debugging practices into action. Debugging is the process of working through technical challenges when something is broken or not working as expected, and it is a HUGE part of most developer’s day-to-day. Ideally, we would write beautiful, perfect code the first time around and introduce no bugs… but we’re human after all, so that’s not the reality.\n\nGiven, we humans do (often) introduce bugs into our programs, it’s important to invest time into strengthening your[ **debugging processes**](https://www.rithmschool.com/blog/debugging-like-a-scientist)—coming up with hypotheses, observing and investigating how things are working, and piecing together the clues to figure out what’s going on. Only then can you know how to fix it!\n\nThis week, reflect on the following…\n1. When asked to think about debugging, what are the first 3 adjectives that jump to mind?\n2. Are there any debugging practices that you’ve already tried and found helpful?\n3. Any you haven’t tried yet, but want to practice in this upcoming week?\n",
    assignment_airtableID: ["rec3AnGv73ZYOxjg0"],
    materials_airtableID: [
      "recRn5Y7QUlOcKTEW",
      "recGmWna8PxNmFp2Y",
      "recSYDwNN2jku5EUl",
      "recaUxKmlCuSHnIeq",
      "rectgIv2qJWlFwHE7",
    ],
    section_title: ["Section 2: Git Basics"],
    materials: [
      ObjectId("62e26dbb69dd077fc82fbfe3"),
      ObjectId("62e26dc569dd077fc82fbff5"),
      ObjectId("62e26db569dd077fc82fbfd5"),
      ObjectId("62e26dc569dd077fc82fbfee"),
      ObjectId("62e26dc669dd077fc82fc00f"),
    ],
    assignments: [ObjectId("62e26dc769dd077fc82fc012")],
    title: "Introduction to Git",
    section: ObjectId("633d9916ec0d4b5e83a6b062"),
  },
  {
    _id: ObjectId("62e26dc569dd077fc82fbff7"),
    lesson_label: "Lesson 6.15: Working with the Fetch API",
    order: 15,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=Working with the Fetch API",
    },
    learning_objectives: [
      "What is the Fetch API?",
      "Write a Basic Fetch Request",
      "Displaying the Content",
      "Create a Reusable Fetch Function",
      "Handling Errors",
      "Manage Multiple Requests with Promise.all",
      "Posting Data with fetch",
    ],
    mindset_content:
      "Have you ever harbored persistent feelings of self-doubt despite the successes you’ve achieved? Felt like, “someone is going to find out that I don’t deserve to be where I am” or that “others know everything, and I know very little”. Initially coined in the ‘70s, this phenomenon has a name—Imposter Syndrome—and though it tends to disproportionately affect those in underrepresented groups in tech, it is quite widespread across the industry. (A **[2018 study](https://www.techrepublic.com/article/why-58-of-tech-employees-suffer-from-imposter-syndrome/) **reported that 58% of all tech workers feel this way!)\n\nUnfortunately, it’s not something that we can make magically go away—in fact a lot of folks may feel it many years into their career. On a good note, however, it is something we can manage and harness in a positive way for growth and learning, as discussed in this **[TED talk](https://www.youtube.com/watch?v=zNBmHXS3A6I)** by Mike Cannon-Brookes, who founded and runs the tech behemoth, Atlassian. (Yes, even CEOs can have Imposter Syndrome!) And If you don’t experience this phenomenon personally, it’s still worth understanding so you can keep an eye out for it in friends and peers and help them manage it. A good first start to managing Imposter Syndrome is to shine a light on it. Talk to your classmates, mentors, friends, about your feelings and how to keep that self-doubt in check.\n\n1. Have you every felt Imposter Syndrome yourself and, if you’re comfortable sharing, how did it manifest itself? What, if anything, has helped you mitigate these feelings?\n2. What do you think are some of the immediate or long-term effects of Imposter Syndrome if left unchecked?\n",
    assignment_airtableID: ["recY3BpMZkx05tvl0"],
    materials_airtableID: null,
    section_title: ["Section 6: AJAX Basics"],
    materials: [],
    assignments: [ObjectId("62e26dc669dd077fc82fc008")],
    title: "Working with the Fetch API",
    section: ObjectId("633d9916ec0d4b5e83a6b05f"),
  },
  {
    _id: ObjectId("62e26dc669dd077fc82fbffe"),
    lesson_label: "Lesson 4.11: CSS Basics",
    order: 11,
    submission_link: {
      label: "Submit Assignment",
      url:
        "https://airtable.com/shrF8xGZowU5HEuIJ?prefill_Assignment%20Title=CSS Basics",
    },
    learning_objectives: [
      "Getting Started With CSS",
      "Basic Selectors",
      "Understanding Values and Units",
      "Fundamental Concepts",
    ],
    mindset_content:
      "This week we’ll be getting in touch with our creative side! Designing a website can be an intimidating task; so many colors and fonts and icons and graphics! When it comes to designing the structure (home page, about page, etc.) and how you link JS, HTML, CSS, and other files there are clear rules or at least guidelines in order for the site to be functional. But when it comes to picking a color and font for the site anything goes, right? While you do have a lot more creative freedom (which is fun for some and terrifying for others) when it comes to the look of your site, there are still useful guidelines to keep in mind. After all, we hope that more than just you and your team and the client you’re building for will be viewing and using your site!\n\n**[This article from WebSpecDesign](https://www.webspec.com/2017/03/the-importance-of-color-in-web-design/)** gives a good introduction to beginners about color theory and usage on the web. In almost any resource about color theory on the web you’ll notice references to accessibility. We’ll dig more deeply into accessibility the last week of class, but since you’ll be choosing colors and fonts this week, please be sure to use the tool in the second question below by entering your font color as the “foreground color” and your page/background color as the “background color” when making some of your creative decisions this week while working with CSS.\n\n1. What was something new you learned about colors/color theory and how do you think that knowledge will effect your design choices?\n2. Try out some different background/foreground color combinations **[using this tool from A11y](https://color.a11y.com/)**. Are there any combinations that surprise you in terms of not meeting accessibility guidelines?\n",
    assignment_airtableID: ["recxvrE9pbZsfCh2C"],
    materials_airtableID: [
      "rec8FqeKw5DVuNQlO",
      "recxcyNX0XTG05Any",
      "recvxZmyH8pc47GQM",
      "reczlen35afBvEvp0",
    ],
    section_title: ["Section 4: Web Basics"],
    materials: [
      ObjectId("62e26db569dd077fc82fbfde"),
      ObjectId("62e26db569dd077fc82fbfd2"),
      ObjectId("62e26dc669dd077fc82fc003"),
      ObjectId("62e26db569dd077fc82fbfcc"),
    ],
    assignments: [ObjectId("62e26dc669dd077fc82fc002")],
    title: "CSS Basics",
    section: ObjectId("633d9916ec0d4b5e83a6b061"),
  },

  {
    _id: ObjectId("44e26dc669dd077fc82fbffe"),
    lesson_label: "Lesson 5.11: SCSS Basics",
    order: 11,
    learning_objectives: [
      "Basic Selectors",
      "Understanding Values and Units",
      "Fundamental Concepts",
    ],
    mindset_content:
      "This week we’ll be getting in touch with our creative side! Designing a website can be an intimidating task; so many colors and fonts and icons and graphics! When it comes to designing the structure (home page, about page, etc.) and how you link JS, HTML, CSS, and other files there are clear rules or at least guidelines in order for the site to be functional. But when it comes to picking a color and font for the site anything goes, right? While you do have a lot more creative freedom (which is fun for some and terrifying for others) when it comes to the look of your site, there are still useful guidelines to keep in mind. After all, we hope that more than just you and your team and the client you’re building for will be viewing and using your site!\n\n**[This article from WebSpecDesign](https://www.webspec.com/2017/03/the-importance-of-color-in-web-design/)** gives a good introduction to beginners about color theory and usage on the web. In almost any resource about color theory on the web you’ll notice references to accessibility. We’ll dig more deeply into accessibility the last week of class, but since you’ll be choosing colors and fonts this week, please be sure to use the tool in the second question below by entering your font color as the “foreground color” and your page/background color as the “background color” when making some of your creative decisions this week while working with CSS.\n\n1. What was something new you learned about colors/color theory and how do you think that knowledge will effect your design choices?\n2. Try out some different background/foreground color combinations **[using this tool from A11y](https://color.a11y.com/)**. Are there any combinations that surprise you in terms of not meeting accessibility guidelines?\n",

    materials: [
      ObjectId("62e26db569dd077fc82fbfde"),
      ObjectId("62e26db569dd077fc82fbfd2"),
    ],
    assignments: [ObjectId("62e26dc669dd077fc82fc002")],
    title: "SCSS Basics",
    section: ObjectId("633d9916ec0d4b5e83a6b061"),
    deleted_at: faker.date.recent(),
  },
];
