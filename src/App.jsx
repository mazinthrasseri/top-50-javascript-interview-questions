import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    title: "Data Types and Operators",
    questions: [
      "What are the data types in JavaScript?",
      "What is the difference between == and ===?",
      "What is the difference between null and undefined?",
    ],
  },
  {
    title: "Variables and Scope",
    questions: [
      "Explain the concept of hoisting in JavaScript.",
      "What is the difference between let, const, and var?",
      "What is variable scope in JavaScript?",
      "Explain the difference between global and local variables.",
      "What is the temporal dead zone?",
      "What is variable shadowing?",
    ],
  },
  {
    title: "Functions",
    questions: [
      "What is a closure in JavaScript?",
      "What are the different ways to define a function in JavaScript?",
      "What is a higher-order function?",
      "Explain the concept of function hoisting.",
      "What is a pure function?",
      "What is the difference between function declaration and function expression?",
      "What is an Immediately Invoked Function Expression (IIFE)?",
    ],
  },
  {
    title: "Objects",
    questions: [
      "How do you create an object in JavaScript?",
      "How do you add/remove properties to an object dynamically?",
      "How do you check if a property exists in an object?",
      "What is the purpose of the this keyword in JavaScript?",
    ],
  },
  {
    title: "Arrays",
    questions: [
      "What are the different ways to loop through an array in JavaScript?",
      "Explain the difference between for...in and for...of loops.",
      "How do you add/remove elements from an array?",
      "What is the purpose of the map() function?",
      "Explain the difference between filter() and find() methods.",
      "Explain the difference between some() and every() method.",
    ],
  },
  {
    title: "DOM Manipulation",
    questions: [
      "How do you select elements in the DOM using JavaScript?",
      "How do you create and append elements to the DOM?",
      "Explain the difference between innerHTML and textContent.",
      "How do you remove an element from the DOM?",
    ],
  },
  {
    title: "ES6+ Features",
    questions: [
      "What are arrow functions and how do they differ from regular functions?",
      "Explain the concept of destructuring in JavaScript.",
      "What are template literals?",
      "How do you use the spread operator?",
      "What are default parameters in ES6?",
      "How do you use the rest parameter in functions?",
    ],
  },
  {
    title: "Asynchronous JavaScript",
    questions: [
      "What is callback & callback hell explain with example",
      "What is a Promise in JavaScript with example?",
      "How do you chain Promises?",
      "What is the purpose of the Promise.all() method?",
      "What is the purpose of the finally() method in Promises?",
      "What is the purpose of the async await ?",
      "How do you handle errors in async/await?",
      "What is the difference between async/await and Promises?",
    ],
  },
  {
    title: "Modules and JSON",
    questions: [
      "What is the difference between default and named exports?",
      "How do you convert a JavaScript object to a JSON string ?",
      "How do you parse a JSON string back into a JavaScript object?",
    ],
  },
  {
    title: "Web Storage",
    questions: [
      "What is localStorage in JavaScript, and how do you store and retrieve data from it?",
      "What is the difference between localStorage and sessionStorage?",
      "How do you delete a specific item from localStorage or clear all data from it?",
    ],
  },
];

export default function App() {
  const [openSection, setOpenSection] = useState(null);
  const [progress, setProgress] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedProgress = localStorage.getItem("interviewQuestionsProgress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        "interviewQuestionsProgress",
        JSON.stringify(progress)
      );
    }
  }, [progress, isClient]);

  const toggleQuestion = (sectionTitle, questionIndex) => {
    setProgress((prev) => ({
      ...prev,
      [sectionTitle]: {
        ...prev[sectionTitle],
        [questionIndex]: !prev[sectionTitle]?.[questionIndex],
      },
    }));
  };

  const isSectionComplete = (sectionTitle) => {
    const sectionProgress = progress[sectionTitle];
    if (!sectionProgress) return false;
    const sectionQuestions = sections.find(
      (section) => section.title === sectionTitle
    ).questions;
    return sectionQuestions.every((_, index) => sectionProgress[index]);
  };

  if (!isClient) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Top 50 JavaScript Interview Questions and Answers
        </h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Top 50 JavaScript Interview Questions and Answers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Dialog
            key={section.title}
            open={openSection === section.title}
            onOpenChange={(open) => setOpenSection(open ? section.title : null)}
          >
            <DialogTrigger asChild>
              <Card className="hover:bg-gray-100 cursor-pointer transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{section.title}</CardTitle>
                  {isSectionComplete(section.title) && (
                    <Badge variant="secondary" className="ml-2">
                      Complete
                    </Badge>
                  )}
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{section.title}</DialogTitle>
              </DialogHeader>
              <ul className="space-y-2">
                {section.questions.map((question, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Checkbox
                      id={`${section.title}-${index}`}
                      checked={progress[section.title]?.[index] || false}
                      onCheckedChange={() =>
                        toggleQuestion(section.title, index)
                      }
                    />
                    <label
                      htmlFor={`${section.title}-${index}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {question}
                    </label>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
