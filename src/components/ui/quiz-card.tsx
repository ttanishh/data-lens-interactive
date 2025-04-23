
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CircleCheck, CircleX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizCardProps {
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

export function QuizCard({ title, description, questions }: QuizCardProps) {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const checkAnswer = () => {
    setIsAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      // Show completion message
      toast({
        title: `Quiz Completed! Score: ${correctAnswers + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)}/${questions.length}`,
        description: "Great job working through the questions!",
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setIsCompleted(false);
  };

  const currentQ = questions[currentQuestion];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title} 
          <span className="text-sm font-normal text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isCompleted ? (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">{currentQ.question}</h3>
            <RadioGroup value={selectedAnswer?.toString()} className="gap-3">
              {currentQ.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    isAnswered && index === currentQ.correctAnswer 
                      ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800' 
                      : isAnswered && index === selectedAnswer && index !== currentQ.correctAnswer
                        ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800' 
                        : 'hover:bg-muted/50'
                  } cursor-pointer`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`} 
                    disabled={isAnswered}
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer flex items-center justify-between"
                  >
                    {option}
                    {isAnswered && index === currentQ.correctAnswer && (
                      <CircleCheck className="h-5 w-5 text-green-600 dark:text-green-500" />
                    )}
                    {isAnswered && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <CircleX className="h-5 w-5 text-red-600 dark:text-red-500" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {isAnswered && (
              <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                <p className="font-medium">Explanation:</p>
                <p>{currentQ.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
            <p className="text-xl mb-2">Your Score:</p>
            <p className="text-3xl font-bold mb-6">{correctAnswers}/{questions.length}</p>
            <Button onClick={resetQuiz} className="mt-4">Restart Quiz</Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={resetQuiz}
          disabled={currentQuestion === 0 && !isAnswered && !isCompleted}
        >
          Reset
        </Button>
        
        {!isAnswered ? (
          <Button 
            onClick={checkAnswer} 
            disabled={selectedAnswer === null}
          >
            Check Answer
          </Button>
        ) : !isCompleted ? (
          <Button onClick={handleNextQuestion}>
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
