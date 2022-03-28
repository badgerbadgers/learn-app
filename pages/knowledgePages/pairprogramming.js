import Image from "next/image";

const pairProgrammingInfo = [
  {
    label: "What is pair programming?",
    content: [
      "Agile software development technique",
      "Two programmers work together to solve the same coding problem",
      "“Driver” writes the code while “Observer” reviews code as it's typed, switching roles frequently",
    ],
    img: "/img/pairProgrImages/1.png",
  },
  {
    label: "Our goals with pair programming",
    content: [
      "Better code",
      "Fewer bugs and mistakes",
      "Team collaboration and understanding of what we are building/working on together",
      "Learn from each other",
    ],
    /* img: "quote", */
  },
  {
    label: "Some tools you couls use",
    content: [
      "Zoom/Slack - regular screen-sharing",
      "Visual Studio Live Share - easiest with VS IDE, but you can also use VS Web",
      "Codepen - copy-paste files to collaborate one",
      "Sublime Remote - both people must have Sublime IDE",
      "Code Sandbox - import Github URL and work on files",
    ],
    img: "/img/pairProgrImages/2.png",
  },
  {
    label: "The process each week",
    content: [
      "01: Pairs among project teammates are selected using a random round robin generator.In the case of an uneven number of teammates, one person will not be pair programming each week",
      "02: Meet twice during the week, for at least 3 hours each session. You may choose to work either on one of your tickets for both sessions, or do one ticket per session",
      "03: Additionally, if one person has been assigned a PR on Github, you should pair peer-review it on Friday",
    ],
    /*  img: '', */
  },
  /*  {
    label: "A pair programming session...",
    content: [
      {
        subLabel: "01 Plan & Prepare",
        subcontent: [
          "Choose tickets to work on",
          "Write or comment out a brief plan of attack",
          "Discuss plan as a team",
        ],
      },
      {
        subLabel: "02 Program",
        subcontent: [
          "Driver codes and talks through what is being coded",
          "Observer looks out for mistakes, asks questions, and stops the group if further conversation or thought is needed ",
        ],
      },
    ],
    img: "none",
  }, */
  {
    label: `And most importantly.... Have a learning mindset`,
    content: [
      "If you are more experienced, encourage your partner to ask questions and come up with more solutions",
      "If you are less experienced don't hesitate to stop to ask lots of questions",
      "Be patient",
      "Never be discouraging or derisive to your partner",
      "Feel free to change it up more frequently and do 30 min driver/observer sessions",
    ],
    img: "/img/pairProgrImages/3.png",
  },
  {
    label: "Feedback",
    content: [
      "This is going to be a constantly-evolving process. In order to make it the best it can be, we ask that you fill out a feedback form every week letting us know how your experience was.",
      "Link to the form",
    ],
    img: "/img/pairProgrImages/4.png",
  },
];

const PairProgrammingPage = () => {
  return (
    <>
      <h1>A guide to Pair Programming</h1>
      <div>
        {pairProgrammingInfo.map((item, index) => (
          <>
            <h2 key={item.label}>{item.label}</h2>
            <ul key={index}>
              {item.content.map((p, index) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {item.img ? 
            <Image
              alt=""
              width={200}
              height={100}
              key={`${index}image`}
              src={item.img}
            />
             : null}
          </>
        ))}
      </div>
    </>
  );
};

export default PairProgrammingPage;
