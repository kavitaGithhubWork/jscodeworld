import { faker } from '@faker-js/faker';

export const fakeEmail = (): string => {
  const prefix = 'techadmin';
  const randomName = faker.person.lastName();
  const name = `${prefix}+${randomName}`;
  // using fundthrough.com domain for now to make sure the email doesn't go out to the internet
  return `${name}@fundthrough.com`.toLowerCase();
};
