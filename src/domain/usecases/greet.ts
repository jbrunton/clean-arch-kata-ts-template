import { Subject } from "entities/subject";

const defaultGreeting = "Hello, :subject!";

export const getGreeting = (subject: Subject, greeting?: string): string => {
  return (greeting ?? defaultGreeting).replace(":subject", subject.name);
};
