const { faker } = require('@faker-js/faker');
const { ObjectId } = require('mongodb');

module.exports = [
  {
    _id: ObjectId('62db592a4101934c0011b357'),
    cohort_name: 'New Alpaca',
    start_date: faker.date.future().toISOString(),
    zoom_link: 'https://us02web.zoom.us/j/87054407958',
    students: [
      {
        user: ObjectId('62d969ade411b721457b4000'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62abc6581f78e685fe3c8066'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62d1cdeb70f32c8f947ee2ba'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62abc6581f78e685fe3c8066'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62a11039db71825ea1c4388f'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62ac7ea1e0fbc232e6e4271c'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
    ],
    mentors: [
      {
        user: ObjectId('62d1cdeb70f32c8f947ee2ba'),
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
      },
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
      },
    ],
    seats: 20,
    slug: 'new-alpaca',
    course: ObjectId('62e056cee6daad619e5cc2c3'),
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'ggggg',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'Lorem Ipsum content',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
    ],
    __v: 2,
    created_at: '2023-02-15T19:49:51.98Z',
    status: 'future',
  },
  {
    _id: ObjectId('6356b06ba070b6cfbfbdf050'),
    cohort_name: 'test',
    created_at: '2022-10-24T15:34:02.877Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    zoom_link: '',
    students: [],
    mentors: [],
    seats: 0,
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe5'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc769dd077fc82fc017'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00b'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe6'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc006'),
        section: ObjectId('633d9916ec0d4b5e83a6b062'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe8'),
        section: ObjectId('633d9916ec0d4b5e83a6b060'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffa'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff8'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff3'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffe'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffb'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00a'),
        section: ObjectId('633d9917ec0d4b5e83a6b063'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe4'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff7'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc000'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
    ],
    slug: 'test',
    __v: 0,
    status: 'future',
    start_date: faker.date.future().toISOString(),
  },
  {
    _id: ObjectId('635841bd9be844015c74719a'),
    cohort_name: 'Mobile View',
    created_at: '2022-10-25T20:06:20.673Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    start_date: faker.date.past(2).toISOString(),
    zoom_link: '',
    students: [
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
        added_at: '2023-03-01T14:48:30.884Z',
      },
      {
        user: ObjectId('62a11039db71825ea1c4388f'),
        added_at: '2023-03-01T14:48:30.885Z',
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
        added_at: '2023-03-01T14:48:30.885Z',
      },
      {
        user: ObjectId('634dd3eda86808cf9acb204f'),
        added_at: '2023-03-01T14:49:35.78Z',
      },
    ],
    mentors: [
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
      },
      {
        user: ObjectId('62a11039db71825ea1c4388f'),
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
      },
    ],
    seats: 0,
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe5'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: '',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content:
          'multiline multilinemultilinemultilinemultilinemultilinemultilinemultilinemultilinemultilinemultilinemultilinemultilinemultdsfsdfsdfsdfsdfsdfdsfsdfjskjfkdshfjdshfdsjfjsdfjdshfnemultiline',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content:
          'ddddddd  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ddddddd  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ddddddd  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'gfgfgf',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'ddddd',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc769dd077fc82fc017'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00b'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe6'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc006'),
        section: ObjectId('633d9916ec0d4b5e83a6b062'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe8'),
        section: ObjectId('633d9916ec0d4b5e83a6b060'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffa'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff8'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff3'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffe'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffb'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00a'),
        section: ObjectId('633d9917ec0d4b5e83a6b063'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe4'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff7'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc000'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
    ],
    slug: 'mobile-view',
    deleted_at: null,
    __v: 6,
    status: 'past',
  },
  {
    _id: ObjectId('632e0184290d23ac4c005e27'),
    cohort_name: 'Walrus',
    created_at: '2022-09-23T18:57:08.344Z',
    course: ObjectId('62e056cee6daad619e5cc2c3'),
    start_date: faker.date.past(2).toISOString(),
    zoom_link: '',
    students: [
      {
        user: ObjectId('62ac7ea1e0fbc232e6e4271c'),
        added_at: '2023-03-10T18:46:30.298Z',
      },
      {
        user: ObjectId('62d969ade411b721457b4d58'),
        added_at: '2023-03-10T18:46:30.299Z',
      },
    ],
    mentors: [],
    seats: 990,
    schedule: [],
    slug: 'walrus',
    __v: 1,
    status: 'past',
  },
  {
    _id: ObjectId('62db592a4101934c0011b356'),
    cohort_name: 'Albatross',
    start_date: faker.date.past(2).toISOString(),
    zoom_link: 'https://us02web.zoom.us/j/87054407958',
    status: 'past',
    students: [
      {
        user: ObjectId('62ac7ea1e0fbc232e6e4271c'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
    ],
    mentors: [
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
      },
    ],
    seats: 50,
    slug: 'albatross',
    created_at: '2022-08-12T02:44:40.094Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    schedule: [],
    __v: 1,
  },
  {
    _id: ObjectId('632d1cf0236764cf2ea1fd20'),
    cohort_name: 'Brain Slug',
    created_at: '2022-09-23T02:41:52.129Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    start_date: faker.date.recent(20).toISOString(),
    zoom_link: '',
    students: [
      {
        user: ObjectId('62a11039db71825ea1c4388f'),
        added_at: '2023-02-15T18:53:28.08Z',
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
        added_at: '2023-02-15T18:53:28.08Z',
      },
      {
        user: ObjectId('634dd3eda86808cf9acb204f'),
        added_at: '2023-02-15T18:53:28.08Z',
      },
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
        added_at: '2023-02-15T18:57:09.459Z',
      },
    ],
    mentors: [
      {
        user: ObjectId('62a11039db71825ea1c4388f'),
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
      },
      {
        user: ObjectId('634dd3eda86808cf9acb204f'),
      },
    ],
    seats: 0,
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe5'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'review',
        content: '',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'review',
        content: 'kjlkjlkj',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'jklj',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'dfsfds',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'Br',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'review',
        content: 'Lessons 1.1 – 1.3 (Lesson 1.3 especially)begin re...',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc769dd077fc82fc017'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00b'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'review',
        content: 'review lesson 1.1',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe6'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'review',
        content: 'review lessons. . . .',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'break',
        content: 'Coffee break',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc006'),
        section: ObjectId('633d9916ec0d4b5e83a6b062'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe8'),
        section: ObjectId('633d9916ec0d4b5e83a6b060'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffa'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff8'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff3'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffe'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffb'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00a'),
        section: ObjectId('633d9917ec0d4b5e83a6b063'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe4'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff7'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc000'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
    ],
    slug: 'brain-slug',
    deleted_at: null,
    __v: 3,
    status: 'active',
  },
  {
    _id: ObjectId('635814a76936e10589dec995'),
    cohort_name: 'test delete',
    created_at: '2022-10-25T16:53:59.396Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    start_date: faker.date.recent(100).toISOString(),
    zoom_link: '',
    students: [],
    mentors: [],
    seats: 0,
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe5'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc769dd077fc82fc017'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00b'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe6'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc006'),
        section: ObjectId('633d9916ec0d4b5e83a6b062'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe8'),
        section: ObjectId('633d9916ec0d4b5e83a6b060'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffa'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff8'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff3'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffe'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffb'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00a'),
        section: ObjectId('633d9917ec0d4b5e83a6b063'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe4'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff7'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc000'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
    ],
    slug: 'test-delete',
    deleted_at: '2022-10-25T17:52:48.113Z',
    __v: 0,
  },
  {
    _id: ObjectId('62db592a4101934c0011b355'),
    cohort_name: 'Sparrow',
    start_date: faker.date.past(2).toISOString(),
    zoom_link: 'https://us02web.zoom.us/j/87054407958',
    status: 'past',
    students: [
      {
        user: ObjectId('62abc6581f78e685fe3c8066'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62abc6581f78e685fe3c8066'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62ac7ea1e0fbc232e6e4271c'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
      {
        user: ObjectId('62a11039db71825ea1c4388f'),
        added_at: '2023-02-15T18:47:19.06Z',
      },
      {
        user: ObjectId('634dbf456cef142cec41c17e'),
        added_at: '2023-02-15T18:47:19.062Z',
      },
      {
        user: ObjectId('634dd3eda86808cf9acb204f'),
        added_at: '2023-02-15T18:47:19.062Z',
      },
    ],
    mentors: [],
    seats: 15,
    slug: 'sparrow',
    created_at: '2022-08-24T23:29:52.258Z',
    course: ObjectId('62e056cee6daad619e5cc2c4'),
    __v: 1,
    schedule: [],
  },
  {
    _id: ObjectId('632de323290d23ac4c005e1c'),
    cohort_name: 'Flamingos',
    created_at: '2022-09-23T16:47:31.51Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    start_date: faker.date.past(2).toISOString(),
    zoom_link: '',
    students: [],
    mentors: [],
    seats: 0,
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe5'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'review',
        content: 'fdfdfd',
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc769dd077fc82fc017'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00b'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe6'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc006'),
        section: ObjectId('633d9916ec0d4b5e83a6b062'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe8'),
        section: ObjectId('633d9916ec0d4b5e83a6b060'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffa'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff8'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff3'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffe'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffb'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00a'),
        section: ObjectId('633d9917ec0d4b5e83a6b063'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe4'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff7'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc000'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
    ],
    slug: 'flamingos',
    __v: 0,
    status: 'past',
  },
  {
    _id: ObjectId('6359f331d1a691672e13ea70'),
    cohort_name: 'import',
    created_at: '2022-10-27T02:55:45.405Z',
    course: ObjectId('62e056cee6daad619e5cc2c4'),
    start_date: faker.date.past(2).toISOString(),
    zoom_link: '',
    students: [],
    mentors: [],
    seats: 0,
    schedule: [],
    slug: '-i-m-p-o-r-t-',
    deleted_at: '2022-10-27T02:55:52.089Z',
    __v: 0,
  },
  {
    _id: ObjectId('62db592a4101934c0011b35a'),
    cohort_name: 'Little arrow',
    start_date: faker.date.past(2).toISOString(),
    zoom_link: 'https://us02web.zoom.us/j/87054407958',
    status: 'past',
    students: [
      {
        user: ObjectId('62abc6581f78e685fe3c8066'),
        added_at: '2023-01-12T18:41:15.964Z',
      },
    ],
    mentors: [],
    seats: 0,
    slug: 'little-arrow',
    created_at: '2022-08-12T01:21:58.219Z',
    course: ObjectId('62e056cee6daad619e5cc2c3'),
    schedule: [],
    deleted_at: '2023-03-02T16:18:32.068Z',
  },
  {
    _id: ObjectId('6363e0a78c688a0ed9d258c1'),
    cohort_name: 'Alabama',
    created_at: '2022-11-03T15:39:19.07Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    start_date: faker.date.future(2).toISOString(),
    zoom_link: '',
    students: [],
    mentors: [],
    seats: 0,
    schedule: [
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe5'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe1'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc769dd077fc82fc017'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00b'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe6'),
        section: ObjectId('633d9915ec0d4b5e83a6b05e'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc006'),
        section: ObjectId('633d9916ec0d4b5e83a6b062'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe8'),
        section: ObjectId('633d9916ec0d4b5e83a6b060'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffa'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff8'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff3'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffe'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fbffb'),
        section: ObjectId('633d9916ec0d4b5e83a6b061'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc00a'),
        section: ObjectId('633d9917ec0d4b5e83a6b063'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dbb69dd077fc82fbfe4'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc569dd077fc82fbff7'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
      {
        type: 'lesson',
        lesson: ObjectId('62e26dc669dd077fc82fc000'),
        section: ObjectId('633d9916ec0d4b5e83a6b05f'),
      },
    ],
    slug: 'alabama',
    deleted_at: null,
    __v: 0,
    status: 'future',
  },

  {
    _id: ObjectId('335841bd9be844015c74719a'),
    cohort_name: 'Mobile View no shedule',
    created_at: '2022-10-25T20:06:20.673Z',
    course: ObjectId('62e056cee6daad619e5cc2c5'),
    start_date: faker.date.future(2).toISOString(),
    zoom_link: '',
    students: [
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
        added_at: '2023-03-01T14:48:30.884Z',
      },
    ],
    mentors: [
      {
        user: ObjectId('6282b0d6d20d837b1c87afa9'),
      },
    ],
    seats: 0,
    schedule: [],
    slug: 'mobile-view-no-schedule',
    deleted_at: null,
    __v: 6,
    status: 'past',
  },
];
