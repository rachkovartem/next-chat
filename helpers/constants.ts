export const url = process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.SERVER_URL;
export const square = (x: number) => {
  return Math.pow(x,x)
};
export const testState = {
  user: {
    id: '27d314e7-427f-494e-a672-37c013a16255',
    username: 'Rachkov Artem',
    email: '123@123',
    password: '$2b$10$NuQZIwUPSJ.S0BEvJof9xuEZF/4nBGG1Frm6MtAqoVS13rSy.3NE2',
    registration: '1646204709864',
    friends: [
      '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
      '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
      '53cd4964-bf97-4de3-a87b-0f6015dc7253',
      'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
      '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
      '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
      '2c045227-97a2-458a-ae10-b25ec35251d6',
      '54249bec-7354-4893-91b6-78a322b077ee',
      'dfddc651-b55a-473f-a8b6-72358839838e',
      '08653c83-8a5a-49c6-8d37-fdeb05655bb3'
    ],
    groupRooms: [
      'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
      '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
      'ab206c75-d968-4a56-9d59-a2061030dcc0',
      '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
    ],
    friendsRequests: [],
    imagePath: 'https://ik.imagekit.io/nxinxzljr65/5c6aaac65b26b77edb28907751d2b684_OkBajWQb-',
    objFriends: [
      {
        id: '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
        username: 'Elon Musk',
        email: '1234@1234',
        password: '$2b$10$IhaE0HMUlFHnF.PZpOTpSe/1sD2oN7oEiegTme2wqYfpLJy8WyNCO',
        registration: '1646204829854',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255',
          '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
          '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
          '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/a1942ee93ff7bac5809e938a07e75552_DkUeHqgQx'
      },
      {
        id: '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
        username: 'Vladimir Putin',
        email: '123456@123456',
        password: '$2b$10$CCf5CB0t/INynsPPoVcfRO7ORv3M0ypTQR4pk1mhhi/uJsGSH0QjS',
        registration: '1646204895375',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255',
          '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
          '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/18b3cddd9ae9b0a1dd574a7c9a8bd726_aKHyBqD2c'
      },
      {
        id: '53cd4964-bf97-4de3-a87b-0f6015dc7253',
        username: 'Alexey Navalny',
        email: '1234567@1234567',
        password: '$2b$10$s2IOyoscCTIFmGu7to9vHeDkx9vqgyjGP.NHGJslpzrHpqv9AZb8O',
        registration: '1646204927475',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/8de87e01d5fec7b8cb1f0740bc89bd86_ezbcgqH8W'
      },
      {
        id: 'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
        username: 'Joe Biden',
        email: '12345678@12345678',
        password: '$2b$10$HRrJ9NFxb522.JrcP5q3N.AmT0pjQ6lGns9d0vYtVJiNXpw6NSizC',
        registration: '1646205082282',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255',
          '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
          'ab206c75-d968-4a56-9d59-a2061030dcc0',
          '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/a90fc2f8d72e73a7df810d53a3c9b4c1_jYi5o-z2M'
      },
      {
        id: '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
        username: 'Donald Trump',
        email: '123456789@123456789',
        password: '$2b$10$T.bvi3WeKOgDFtAmrn8QOuQ2TOFsCM7yxsN51ksyBg5X0TU9rIRvi',
        registration: '1646205111093',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255',
          '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
          '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
          'ab206c75-d968-4a56-9d59-a2061030dcc0',
          '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/8cab3297c8a5a4f950f98b3460ce588f_OuJkTZfidl'
      },
      {
        id: '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
        username: 'Emmanuel Macron',
        email: 'macron@macron',
        password: '$2b$10$cYsHTIhN0zQy7jVzb5hlrO4XmW9gusAAaTJDVqQd7YL9Ofl8mT6nC',
        registration: '1646205169647',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255',
          'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
          '2c045227-97a2-458a-ae10-b25ec35251d6',
          '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
          '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
          '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
          '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/320153ab70463745f1d53b1a4ccbfe85_iauReG763'
      },
      {
        id: '2c045227-97a2-458a-ae10-b25ec35251d6',
        username: 'Bill Gates',
        email: '12345@12345',
        password: '$2b$10$AE1BgAx6AoJnzt3IqyHhE.qQ34XW8XQulFI55LsazojNUiqSDiCwS',
        registration: '1646204862262',
        friends: [
          '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [
          'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
          '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9'
        ],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/beeee1c15cf9d71b0c02b015c42afcc1_8pGO2dGu2i'
      },
      {
        id: '54249bec-7354-4893-91b6-78a322b077ee',
        username: 'Volodymyr Zelenskyy',
        email: 'zelenskyy@zelenskyy',
        password: '$2b$10$yEXgeKUs8uHAM5NTEc9LVejg.VeuBsSpEpKWHQx8J8t2Z3dBKN/X.',
        registration: '1648045693864',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/ba0688560766332074135f190e621d8c_H7uZxwB9o'
      },
      {
        id: 'dfddc651-b55a-473f-a8b6-72358839838e',
        username: 'Vladimir Zhirinovsky',
        email: 'zhirinovsky@zhirinovsky',
        password: '$2b$10$SBUchtuXj9fuNFGIr7zvp.mtSvdTgRJ4UZdFwzvdI/Mc5qA0MaHfy',
        registration: '1648046363158',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/4677908833bd10a9d48b3f7a726b24b2_bSyTSztT6d'
      },
      {
        id: '08653c83-8a5a-49c6-8d37-fdeb05655bb3',
        username: 'Jennifer Psaki',
        email: 'psaki@psaki',
        password: '$2b$10$dL3luXDS.ShMbLast2bVwuf5fXqNkl24aznzk25DP4e8ZB3wSUTyG',
        registration: '1648046554634',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/de1fd3e339e74ef3fe54bd05c079fde2_QC6klz7wh'
      }
    ],
    fullGroupRooms: [
      {
        roomId: 'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
        participants: '27d314e7-427f-494e-a672-37c013a16255,2c045227-97a2-458a-ae10-b25ec35251d6,2d9e3e0d-2952-44fd-841e-b6d2b5b07622,3df8bc3f-7ce8-406c-b9a5-fa6436e8d986,4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4,53cd4964-bf97-4de3-a87b-0f6015dc7253,9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b,f5ec049c-243f-4de2-bb5e-2d19d0185a86',
        groupRoom: true,
        creationDate: '1646206359248',
        fullParticipants: [
          {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            username: 'Rachkov Artem',
            email: '123@123',
            password: '$2b$10$NuQZIwUPSJ.S0BEvJof9xuEZF/4nBGG1Frm6MtAqoVS13rSy.3NE2',
            registration: '1646204709864',
            friends: [
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '53cd4964-bf97-4de3-a87b-0f6015dc7253',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '54249bec-7354-4893-91b6-78a322b077ee',
              'dfddc651-b55a-473f-a8b6-72358839838e',
              '08653c83-8a5a-49c6-8d37-fdeb05655bb3'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/5c6aaac65b26b77edb28907751d2b684_OkBajWQb-'
          },
          {
            id: '2c045227-97a2-458a-ae10-b25ec35251d6',
            username: 'Bill Gates',
            email: '12345@12345',
            password: '$2b$10$AE1BgAx6AoJnzt3IqyHhE.qQ34XW8XQulFI55LsazojNUiqSDiCwS',
            registration: '1646204862262',
            friends: [
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '27d314e7-427f-494e-a672-37c013a16255'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/beeee1c15cf9d71b0c02b015c42afcc1_8pGO2dGu2i'
          },
          {
            id: '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
            username: 'Elon Musk',
            email: '1234@1234',
            password: '$2b$10$IhaE0HMUlFHnF.PZpOTpSe/1sD2oN7oEiegTme2wqYfpLJy8WyNCO',
            registration: '1646204829854',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/a1942ee93ff7bac5809e938a07e75552_DkUeHqgQx'
          },
          {
            id: '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
            username: 'Emmanuel Macron',
            email: 'macron@macron',
            password: '$2b$10$cYsHTIhN0zQy7jVzb5hlrO4XmW9gusAAaTJDVqQd7YL9Ofl8mT6nC',
            registration: '1646205169647',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/320153ab70463745f1d53b1a4ccbfe85_iauReG763'
          },
          {
            id: '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
            username: 'Donald Trump',
            email: '123456789@123456789',
            password: '$2b$10$T.bvi3WeKOgDFtAmrn8QOuQ2TOFsCM7yxsN51ksyBg5X0TU9rIRvi',
            registration: '1646205111093',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/8cab3297c8a5a4f950f98b3460ce588f_OuJkTZfidl'
          },
          {
            id: '53cd4964-bf97-4de3-a87b-0f6015dc7253',
            username: 'Alexey Navalny',
            email: '1234567@1234567',
            password: '$2b$10$s2IOyoscCTIFmGu7to9vHeDkx9vqgyjGP.NHGJslpzrHpqv9AZb8O',
            registration: '1646204927475',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/8de87e01d5fec7b8cb1f0740bc89bd86_ezbcgqH8W'
          },
          {
            id: '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
            username: 'Vladimir Putin',
            email: '123456@123456',
            password: '$2b$10$CCf5CB0t/INynsPPoVcfRO7ORv3M0ypTQR4pk1mhhi/uJsGSH0QjS',
            registration: '1646204895375',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/18b3cddd9ae9b0a1dd574a7c9a8bd726_aKHyBqD2c'
          },
          {
            id: 'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
            username: 'Joe Biden',
            email: '12345678@12345678',
            password: '$2b$10$HRrJ9NFxb522.JrcP5q3N.AmT0pjQ6lGns9d0vYtVJiNXpw6NSizC',
            registration: '1646205082282',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/a90fc2f8d72e73a7df810d53a3c9b4c1_jYi5o-z2M'
          }
        ]
      },
      {
        roomId: '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
        participants: '27d314e7-427f-494e-a672-37c013a16255,2c045227-97a2-458a-ae10-b25ec35251d6,2d9e3e0d-2952-44fd-841e-b6d2b5b07622,3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
        groupRoom: true,
        creationDate: '1646207650588',
        fullParticipants: [
          {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            username: 'Rachkov Artem',
            email: '123@123',
            password: '$2b$10$NuQZIwUPSJ.S0BEvJof9xuEZF/4nBGG1Frm6MtAqoVS13rSy.3NE2',
            registration: '1646204709864',
            friends: [
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '53cd4964-bf97-4de3-a87b-0f6015dc7253',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '54249bec-7354-4893-91b6-78a322b077ee',
              'dfddc651-b55a-473f-a8b6-72358839838e',
              '08653c83-8a5a-49c6-8d37-fdeb05655bb3'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/5c6aaac65b26b77edb28907751d2b684_OkBajWQb-'
          },
          {
            id: '2c045227-97a2-458a-ae10-b25ec35251d6',
            username: 'Bill Gates',
            email: '12345@12345',
            password: '$2b$10$AE1BgAx6AoJnzt3IqyHhE.qQ34XW8XQulFI55LsazojNUiqSDiCwS',
            registration: '1646204862262',
            friends: [
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '27d314e7-427f-494e-a672-37c013a16255'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/beeee1c15cf9d71b0c02b015c42afcc1_8pGO2dGu2i'
          },
          {
            id: '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
            username: 'Elon Musk',
            email: '1234@1234',
            password: '$2b$10$IhaE0HMUlFHnF.PZpOTpSe/1sD2oN7oEiegTme2wqYfpLJy8WyNCO',
            registration: '1646204829854',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/a1942ee93ff7bac5809e938a07e75552_DkUeHqgQx'
          },
          {
            id: '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
            username: 'Emmanuel Macron',
            email: 'macron@macron',
            password: '$2b$10$cYsHTIhN0zQy7jVzb5hlrO4XmW9gusAAaTJDVqQd7YL9Ofl8mT6nC',
            registration: '1646205169647',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/320153ab70463745f1d53b1a4ccbfe85_iauReG763'
          }
        ]
      },
      {
        roomId: 'ab206c75-d968-4a56-9d59-a2061030dcc0',
        participants: '27d314e7-427f-494e-a672-37c013a16255,4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4,f5ec049c-243f-4de2-bb5e-2d19d0185a86',
        groupRoom: true,
        creationDate: '1646212676941',
        fullParticipants: [
          {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            username: 'Rachkov Artem',
            email: '123@123',
            password: '$2b$10$NuQZIwUPSJ.S0BEvJof9xuEZF/4nBGG1Frm6MtAqoVS13rSy.3NE2',
            registration: '1646204709864',
            friends: [
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '53cd4964-bf97-4de3-a87b-0f6015dc7253',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '54249bec-7354-4893-91b6-78a322b077ee',
              'dfddc651-b55a-473f-a8b6-72358839838e',
              '08653c83-8a5a-49c6-8d37-fdeb05655bb3'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/5c6aaac65b26b77edb28907751d2b684_OkBajWQb-'
          },
          {
            id: '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
            username: 'Donald Trump',
            email: '123456789@123456789',
            password: '$2b$10$T.bvi3WeKOgDFtAmrn8QOuQ2TOFsCM7yxsN51ksyBg5X0TU9rIRvi',
            registration: '1646205111093',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/8cab3297c8a5a4f950f98b3460ce588f_OuJkTZfidl'
          },
          {
            id: 'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
            username: 'Joe Biden',
            email: '12345678@12345678',
            password: '$2b$10$HRrJ9NFxb522.JrcP5q3N.AmT0pjQ6lGns9d0vYtVJiNXpw6NSizC',
            registration: '1646205082282',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '3b9a51d1-cef5-41c0-ae30-03fcd1d4907b'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/a90fc2f8d72e73a7df810d53a3c9b4c1_jYi5o-z2M'
          }
        ]
      },
      {
        roomId: '656f78f9-93fb-4d58-81bc-88f5c09c9e58',
        participants: '27d314e7-427f-494e-a672-37c013a16255,4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4,9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
        groupRoom: true,
        creationDate: '1646218594186',
        fullParticipants: [
          {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            username: 'Rachkov Artem',
            email: '123@123',
            password: '$2b$10$NuQZIwUPSJ.S0BEvJof9xuEZF/4nBGG1Frm6MtAqoVS13rSy.3NE2',
            registration: '1646204709864',
            friends: [
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '53cd4964-bf97-4de3-a87b-0f6015dc7253',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '54249bec-7354-4893-91b6-78a322b077ee',
              'dfddc651-b55a-473f-a8b6-72358839838e',
              '08653c83-8a5a-49c6-8d37-fdeb05655bb3'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/5c6aaac65b26b77edb28907751d2b684_OkBajWQb-'
          },
          {
            id: '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
            username: 'Donald Trump',
            email: '123456789@123456789',
            password: '$2b$10$T.bvi3WeKOgDFtAmrn8QOuQ2TOFsCM7yxsN51ksyBg5X0TU9rIRvi',
            registration: '1646205111093',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/8cab3297c8a5a4f950f98b3460ce588f_OuJkTZfidl'
          },
          {
            id: '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
            username: 'Vladimir Putin',
            email: '123456@123456',
            password: '$2b$10$CCf5CB0t/INynsPPoVcfRO7ORv3M0ypTQR4pk1mhhi/uJsGSH0QjS',
            registration: '1646204895375',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/18b3cddd9ae9b0a1dd574a7c9a8bd726_aKHyBqD2c'
          }
        ]
      }
    ],
    friendsRoomsIds: {
      '2d9e3e0d-2952-44fd-841e-b6d2b5b07622': '4ce88dbd-c0b0-42ee-ab17-bc321e431ca7',
      '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b': 'abd2f561-b068-4933-bd87-0eaee7966b29',
      '53cd4964-bf97-4de3-a87b-0f6015dc7253': 'f39194af-07c8-44fc-accd-656e37d460ec',
      'f5ec049c-243f-4de2-bb5e-2d19d0185a86': '3caf9564-d3ae-4936-8f9a-d9edd99bf214',
      '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4': 'fd34a1ea-8a1c-4d27-8f28-91978e81e7d9',
      '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986': '936c77f5-68b0-4c5f-a0ab-15e6ceebe7c0',
      '2c045227-97a2-458a-ae10-b25ec35251d6': 'fa30de37-c8b4-410c-ad1e-69e96e7c4d10',
      '54249bec-7354-4893-91b6-78a322b077ee': 'fbea29f7-a78f-4a9c-91e1-783df028b005',
      'dfddc651-b55a-473f-a8b6-72358839838e': '36fbc526-4951-4749-a7c7-652c000b50e2',
      '08653c83-8a5a-49c6-8d37-fdeb05655bb3': '3bae935f-fd1d-4148-814f-17f3e73d7e3c'
    },
    inReqs: [],
    outReqs: []
  },
  fullRooms: [],
  chatWindowLoading: false,
  currentRoom: null,
  currentRoomId: '27d314e7-427f-494e-a672-37c013a16255',
  error: null,
  useChatState: {
    usersOnline: [],
    notification: null
  },
  socket: {
    on: () => {},
    connected: false,
    disconnected: true,
    receiveBuffer: [],
    sendBuffer: [
      {
        type: 2,
        data: [
          'system:connect'
        ],
        options: {
          compress: true
        }
      }
    ],
    ids: 0,
    acks: {},
    flags: {},
    io: {
      nsps: {
        '/': '[CIRCULAR]'
      },
      subs: [
        null,
        null,
        null
      ],
      opts: {
        extraHeaders: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o'
        },
        query: {
          id: '27d314e7-427f-494e-a672-37c013a16255',
          cookies: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4NzM2MjU4fQ.3XkE8BIY_QETZ27K_Xux7RhgEUS0tcwozsAuWGMg0Ac'
        },
        path: '/socket.io',
        hostname: 'localhost',
        secure: false,
        port: '8080'
      },
      _reconnection: true,
      _reconnectionAttempts: null,
      _reconnectionDelay: 1000,
      _reconnectionDelayMax: 5000,
      _randomizationFactor: 0.5,
      backoff: {
        ms: 1000,
        max: 5000,
        factor: 2,
        jitter: 0.5,
        attempts: 0
      },
      _timeout: 20000,
      _readyState: 'opening',
      uri: 'http://localhost:8080',
      encoder: {},
      decoder: {},
      _autoConnect: true,
      engine: {
        secure: false,
        hostname: 'localhost',
        port: '8080',
        transports: [
          'polling',
          'websocket'
        ],
        readyState: 'opening',
        writeBuffer: [],
        prevBufferLen: 0,
        opts: {
          path: '/socket.io/',
          agent: false,
          withCredentials: false,
          upgrade: true,
          timestampParam: 't',
          rememberUpgrade: false,
          rejectUnauthorized: true,
          perMessageDeflate: {
            threshold: 1024
          },
          transportOptions: {},
          closeOnBeforeunload: true,
          extraHeaders: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o'
          },
          query: {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            cookies: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4NzM2MjU4fQ.3XkE8BIY_QETZ27K_Xux7RhgEUS0tcwozsAuWGMg0Ac'
          },
          hostname: 'localhost',
          secure: false,
          port: '8080'
        },
        id: null,
        upgrades: null,
        pingInterval: null,
        pingTimeout: null,
        pingTimeoutTimer: null,
        transport: {
          writable: false,
          opts: {
            path: '/socket.io/',
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: 't',
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
              threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true,
            extraHeaders: {
              Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o'
            },
            query: {
              id: '27d314e7-427f-494e-a672-37c013a16255',
              cookies: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4NzM2MjU4fQ.3XkE8BIY_QETZ27K_Xux7RhgEUS0tcwozsAuWGMg0Ac',
              EIO: 4,
              transport: 'polling',
              t: 'N-_-Uez'
            },
            hostname: 'localhost',
            secure: false,
            port: '8080',
            socket: '[CIRCULAR]'
          },
          query: {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            cookies: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4NzM2MjU4fQ.3XkE8BIY_QETZ27K_Xux7RhgEUS0tcwozsAuWGMg0Ac',
            EIO: 4,
            transport: 'polling',
            t: 'N-_-Uez'
          },
          readyState: 'opening',
          socket: '[CIRCULAR]',
          polling: true,
          xd: true,
          xs: false,
          supportsBinary: true,
          pollXhr: {
            opts: {
              xd: true,
              xs: false,
              path: '/socket.io/',
              agent: false,
              withCredentials: false,
              upgrade: true,
              timestampParam: 't',
              rememberUpgrade: false,
              rejectUnauthorized: true,
              perMessageDeflate: {
                threshold: 1024
              },
              transportOptions: {},
              closeOnBeforeunload: true,
              extraHeaders: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o'
              },
              query: {
                id: '27d314e7-427f-494e-a672-37c013a16255',
                cookies: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4NzM2MjU4fQ.3XkE8BIY_QETZ27K_Xux7RhgEUS0tcwozsAuWGMg0Ac',
                EIO: 4,
                transport: 'polling',
                t: 'N-_-Uez'
              },
              hostname: 'localhost',
              secure: false,
              port: '8080',
              socket: '[CIRCULAR]'
            },
            method: 'GET',
            uri: 'http://localhost:8080/socket.io/?id=27d314e7-427f-494e-a672-37c013a16255&cookies=access_token%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4MjE3ODU4fQ.86J5O1mQwxk7nZ4VFejnSqImcPskPnuvcssPlmUwG0o%3B%20refresh_token%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMiLCJpZCI6IjI3ZDMxNGU3LTQyN2YtNDk0ZS1hNjcyLTM3YzAxM2ExNjI1NSIsImlhdCI6MTY0ODEzMTQ1OCwiZXhwIjoxNjQ4NzM2MjU4fQ.3XkE8BIY_QETZ27K_Xux7RhgEUS0tcwozsAuWGMg0Ac&EIO=4&transport=polling&t=N-_-Uez',
            async: true,
            data: null,
            xhr: {},
            index: 0,
            _callbacks: {
              $data: [
                null
              ],
              $error: [
                null
              ]
            }
          },
          _callbacks: {
            $drain: [
              null
            ],
            $packet: [
              null
            ],
            $error: [
              null
            ],
            $close: [
              null
            ]
          }
        },
        _callbacks: {
          $open: [
            null
          ],
          $error: [
            null
          ]
        }
      },
      skipReconnect: false,
      _callbacks: {
        $open: [
          null
        ],
        $packet: [
          null
        ],
        $error: [
          null
        ],
        $close: [
          null
        ]
      }
    },
    nsp: '/',
    subs: [
      null,
      null,
      null,
      null
    ],
    _callbacks: {
      '$friends:online': [
        null
      ],
      '$friends:wentOffline': [
        null
      ],
      '$friends:wentOnline': [
        null
      ]
    }
  }
};
