const quote =
  "For an idea to go from your head into the computer it MUST go through someone else's hands.";

//all content from pair programming page inside one object
const pairProgrammingInfo = [
  {
    label: "What is pair programming?",
    header: "What is pair programming?",
    content: [
      "Agile software development technique",
      "Two programmers work together to solve the same coding problem",
      "“Driver” writes the code while “Observer” reviews code as it's typed, switching roles frequently",
    ],
    img: "/img/pairProgrImages/1.png",
  },
  {
    label: "Our goals with pair programming",
    header: "Our goals with pair programming",
    content: [
      "Better code",
      "Fewer bugs and mistakes",
      "Team collaboration and understanding of what we are building/working on together",
      "Learn from each other",
    ],
    quote: quote,
  },
  {
    label: "Some tools you could use",
    header: "Some tools you could use",
   /*  content: [
      "Zoom/Slack - regular screen-sharing",
      "Visual Studio Live Share - easiest with VS IDE, but you can also use VS Web",
      "Codepen - copy-paste files to collaborate one",
      "Sublime Remote - both people must have Sublime IDE",
      "Code Sandbox - import Github URL and work on files",
    ], */
    html: [
      "<a href='https://zoom.us/' target=_blank>Zoom</a>/<a href='https://slack.com/' target=_blank>Slack</a> - regular screen-sharing",
      "<a href='https://visualstudio.microsoft.com/ru/services/live-share/' target=_blank>Visual Studio Live Share</a> - easiest with VS IDE, but you can also use VS Web",
      "<a href='https://codepen.io/' target=_blank>Codepen</a> - copy-paste files to collaborate one",
      "<a href='https://www.sublimetext.com/' target=_blank>Sublime Remote</a> - both people must have Sublime IDE",
      "<a href='https://codesandbox.io/' target=_blank>Code Sandbox</a> - import Github URL and work on files",
    ],
    img: "/img/pairProgrImages/2.png",
  },
  {
    label: "The process each week",
    header: "The process each week",
    content: [
      "Pairs among project teammates are selected using a random round robin generator. In the case of an uneven number of teammates, one person will not be pair programming each week",
      "Meet twice during the week, for at least 3 hours each session. You may choose to work either on one of your tickets for both sessions, or do one ticket per session",
      "Additionally, if one person has been assigned a PR on Github, you should pair peer-review it on Friday",
    ],
  },
  {
    label: "A pair programming session",
    header: "A pair programming session...",
    content: [
      {
        subHeader: "01 Plan & Prepare",
        subcontent: [
          "Choose tickets to work on",
          "Write or comment out a brief plan of attack",
          "Discuss plan as a team",
        ],
      },
      {
        subHeader: "02 Program",
        subcontent: [
          "Driver codes and talks through what is being coded",
          "Observer looks out for mistakes, asks questions, and stops the group if further conversation or thought is needed ",
        ],
      },
    ],
  },
  {
    label: "Important to know",
    header: `And most importantly.... Have a learning mindset`,
    content: [
      "If you are more experienced, encourage your partner to ask questions and come up with more solutions",
      "If you are less experienced don't hesitate to stop to ask lots of questions",
      "Be patient",
      "Never be discouraging or derisive to your partner",
      "Feel free to change it up more frequently and do 30 min driver/observer sessions",
    ],
    img: "/img/pairProgrImages/4.png",
  },
  {
    label: "Feedback",
    header: "Feedback",
    content: [
      "This is going to be a constantly-evolving process. In order to make it the best it can be, we ask that you fill out a feedback form every week letting us know how your experience was.",
      
    ],
    html: ["<a href='https://airtable.com/shrFWLh6SfzFkuyA6' target=_blank>Feedback form</a>"],
    img: "/img/pairProgrImages/3.png",
  },
];

export { pairProgrammingInfo };
