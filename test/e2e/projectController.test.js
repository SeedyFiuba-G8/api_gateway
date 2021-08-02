const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const containerFactory = require('../testContainerFactory');

const container = containerFactory.createContainer();
const fakeUserToken = 'fake-user-token';
const fakeAdminToken = 'fake-admin-token';
const bearerAuthHeader = 'Authorization';
const fakeId = '00000000-feed-0000-0000-c0ffee000000';
const projectId = '123e4567-e89b-12d3-a456-426614174001';

const projectsList = [];

describe('projectController', () => {
  let request;
  let spyjwt;
  let axiosMock;
  let baseNocks;

  beforeEach(() => {
    spyjwt = {};
    request = supertest(container.get('app'));
    axiosMock = container.get('axiosMock');
    baseNocks = container.get('baseNocks');

    spyjwt.sign = jest.spyOn(jwt, 'sign').mockImplementation(({ type }) => {
      if (type === 'USER') return fakeUserToken;
      return fakeAdminToken;
    });
    spyjwt.verify = jest
      .spyOn(jwt, 'verify')
      .mockImplementation(async (token) => {
        switch (token) {
          case fakeUserToken: {
            return { id: fakeId, type: 'USER' };
          }
          case fakeAdminToken: {
            return { id: fakeId, type: 'ADMIN' };
          }
          default:
            throw Error({ name: 'JsonWebTokenError' });
        }
      });
  });

  afterEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
  });

  describe('/projects', () => {
    const path = '/projects';
    beforeEach(() => {
      baseNocks.core.get({ path }, () => [200, { projects: projectsList }]);
      baseNocks.core.get(
        {
          path: `/projects?recommended=true&interests=videogames&interests=entertainment&interests=productivity`
        },
        () => [200, { projects: projectsList }]
      );
      baseNocks.users.get({ path: `/users/${fakeId}` }, () => [
        200,
        {
          firstName: 'Tai',
          lastName: 'C',
          banned: false,
          signupDate: '2021-06-13T21:29:29.330Z',
          city: 'Bariloche',
          country: 'Argentina',
          interests: ['videogames', 'entertainment', 'productivity']
        }
      ]);
      baseNocks.core.post({ path }, () => [200, { id: projectId }]);
      baseNocks.users.post({ path: '/emailtranslation' }, () => [
        200,
        ['123e4567-e89b-12d3-a456-426614174000']
      ]);
    });

    describe('GET', () => {
      describe('when a user wants to retrieve all projects', () => {
        it('should return a list and code 200', () =>
          request
            .get(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .expect(200, { projects: projectsList }));
      });

      describe('when a user wants to retrieve the recommended projects', () => {
        it('should return a list and code 200', () =>
          request
            .get(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .query({ recommended: true })
            .expect(200, { projects: projectsList }));
      });
    });

    describe('POST', () => {
      describe('when a user wants to create a new project', () => {
        it('should return the id and code 200', () =>
          request
            .post(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .send({
              title: 'Prohibir la utilizacion de Winbugs globalmente',
              description: 'No puede ser que haya gente que use Winbugs',
              type: 'social',
              objective: 'Salvar a la gente de esta maldicion',
              finalizedBy: '2021-06-13T21:29:29.330Z',
              tags: ['javascript', 'python', 'food'],
              reviewers: ['example@email.com'],
              stages: [
                {
                  cost: 0.0001,
                  description: 'In this stage, we will buy the equipment.'
                }
              ]
            })
            .expect(200, { id: projectId }));
      });
    });
  });

  describe('/projects/:projectId', () => {
    const path = `/projects/${projectId}`;
    const projectFullInfo = {
      id: projectId,
      status: 'DRAFT',
      blocked: false,
      userId: fakeId,
      reviewerId: '123e4567-e89b-12d3-a456-426614174000',
      liked: false,
      likes: 345,
      rating: {
        samples: 25,
        mean: 3.6
      },
      rated: 3,
      title: 'Prohibir la utilizacion de Winbugs globalmente',
      description: 'No puede ser que haya gente que use Winbugs',
      coverPicUrl: 'https://imgur.com/gallery/rFvivtw',
      type: 'social',
      objective: 'Salvar a la gente de esta maldicion',
      lat: 38.8951,
      long: 38.8951,
      publishedOn: '2021-06-13T21:29:29.330Z',
      finalizedBy: '2021-06-13T21:29:29.330Z',
      tags: ['javascript', 'python', 'food'],
      reviewers: [
        {
          email: 'example@email.com',
          firstName: 'Memis',
          lastName: 'Pomofot',
          status: 'PENDING',
          reviewerId: '123e4567-e89b-12d3-a456-426614174000'
        }
      ],
      stages: [
        {
          cost: 0.000001,
          description: 'In this stage, we will buy the equipment.'
        }
      ],
      totalFunded: 0.000001,
      contributors: 2,
      contributions: 5
    };

    beforeEach(() => {
      baseNocks.core.get({ path }, () => [200, projectFullInfo]);
      baseNocks.core.patch({ path }, () => [200, { id: projectId }]);
      baseNocks.users.post({ path: '/idtranslation' }, () => [
        200,
        {
          '123e4567-e89b-12d3-a456-426614174000': {
            email: 'example@email.com',
            firstName: 'Memis',
            lastName: 'Pomofot'
          }
        }
      ]);
    });

    describe('GET', () => {
      describe('when a user wants to retrieve a given project by id', () => {
        it('should return the project data and code 200', () =>
          request
            .get(path)
            .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
            .expect(200, {
              id: projectId,
              status: 'DRAFT',
              blocked: false,
              userId: fakeId,
              reviewerId: '123e4567-e89b-12d3-a456-426614174000',
              liked: false,
              likes: 345,
              rating: {
                samples: 25,
                mean: 3.6
              },
              rated: 3,
              title: 'Prohibir la utilizacion de Winbugs globalmente',
              description: 'No puede ser que haya gente que use Winbugs',
              coverPicUrl: 'https://imgur.com/gallery/rFvivtw',
              type: 'social',
              objective: 'Salvar a la gente de esta maldicion',
              lat: 38.8951,
              long: 38.8951,
              publishedOn: '2021-06-13T21:29:29.330Z',
              finalizedBy: '2021-06-13T21:29:29.330Z',
              tags: ['javascript', 'python', 'food'],
              reviewers: [
                {
                  email: 'example@email.com',
                  firstName: 'Memis',
                  lastName: 'Pomofot',
                  status: 'PENDING'
                }
              ],
              stages: [
                {
                  cost: 0.000001,
                  description: 'In this stage, we will buy the equipment.'
                }
              ],
              totalFunded: 0.000001,
              contributors: 2,
              contributions: 5
            }));
      });
    });

    describe('PATCH', () => {
      it('should return the projects id and success code 200', () =>
        request
          .patch(path)
          .set(bearerAuthHeader, `Bearer ${fakeUserToken}`)
          .send({
            title: 'Prohibir la utilizacion de Winbugs universalmente'
          })
          .expect(200, { id: projectId }));
    });
  });
});
