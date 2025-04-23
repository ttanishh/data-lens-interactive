
import { useState } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell
} from "recharts";
import { InsightCard } from "@/components/ui/insight-card";
import { ExplainConcept } from "@/components/ui/explain-concept";
import { QuizCard } from "@/components/ui/quiz-card";

interface WordCount {
  word: string;
  count: number;
}

// Quiz questions
const quizQuestions = [
  {
    question: "What is the primary purpose of MapReduce?",
    options: [
      "To provide a user interface for data visualization", 
      "To process large datasets in parallel across distributed systems", 
      "To create maps from raw data into visual representations", 
      "To reduce the size of databases through compression"
    ],
    correctAnswer: 1,
    explanation: "MapReduce is a programming model designed for processing large datasets in parallel by distributing the work across multiple computers (nodes) in a cluster. It was developed by Google to handle the massive scale of web indexing."
  },
  {
    question: "In MapReduce, what does the 'Map' function do?",
    options: [
      "It creates visual maps of data", 
      "It combines the results from multiple nodes", 
      "It processes input data and produces key-value pairs", 
      "It sorts the data into geographical regions"
    ],
    correctAnswer: 2,
    explanation: "The Map function processes input data (typically one record at a time) and produces intermediate key-value pairs. This step filters and transforms the data into a structure that can be processed further."
  },
  {
    question: "What happens in the 'Shuffle' phase of MapReduce?",
    options: [
      "Data is randomly reorganized to ensure privacy", 
      "Key-value pairs are sorted and grouped by key", 
      "Multiple datasets are combined together", 
      "The system chooses which algorithm to apply next"
    ],
    correctAnswer: 1,
    explanation: "The Shuffle phase occurs between Map and Reduce. It sorts the intermediate key-value pairs output by the Map function and groups pairs with the same key together, preparing them for processing by the Reduce function."
  }
];

// Explanation text
const mapReduceExplanation = `MapReduce is a programming model and processing technique for distributed computing based on divide-and-conquer paradigm.

It consists of three main phases:

1. Map Phase:
   - Input data is divided into smaller chunks
   - Each chunk is processed independently and in parallel
   - Produces key-value pairs as intermediate outputs

2. Shuffle Phase:
   - System sorts and groups the key-value pairs by their keys
   - Data with the same key is redirected to the same reducer

3. Reduce Phase:
   - Processes all values associated with the same key
   - Combines these values to produce final output

MapReduce is the foundation for many big data processing frameworks like Hadoop and has been used to solve problems like web indexing, document clustering, and log file analysis.

Its strength lies in its ability to handle petabytes of data across thousands of machines while being resilient to hardware failures.`;

export default function DataManipulation() {
  const [inputText, setInputText] = useState("");
  const [mapOutput, setMapOutput] = useState<Record<string, number[]>>({});
  const [reduceOutput, setReduceOutput] = useState<WordCount[]>([]);
  const [activeStep, setActiveStep] = useState<"input" | "map" | "shuffle" | "reduce">("input");
  const [showQuiz, setShowQuiz] = useState(false);
  const [insight, setInsight] = useState("");
  
  // Process the text through a simulated MapReduce pipeline
  const processMapReduce = () => {
    if (!inputText.trim()) return;
    
    // Step 1: Map - Split text into words and emit (word, 1) pairs
    const words = inputText
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
    
    // Simulate mapping - group by word for visualization
    const mappedWords: Record<string, number[]> = {};
    words.forEach(word => {
      if (!mappedWords[word]) {
        mappedWords[word] = [];
      }
      mappedWords[word].push(1);
    });
    
    setMapOutput(mappedWords);
    setActiveStep("map");
    setInsight("The Map phase has split the text into individual words and assigned a count of 1 to each occurrence. This transforms unstructured text into key-value pairs where each word is a key.");
    
    // We'll use timeouts to simulate the process steps
    setTimeout(() => {
      setActiveStep("shuffle");
      setInsight("The Shuffle phase is grouping all occurrences of the same word together. This is a crucial redistribution step in distributed systems that ensures all instances of a key are processed together.");
      
      // Step 3: Reduce - Sum the counts for each word
      setTimeout(() => {
        const reducedWords: WordCount[] = Object.entries(mappedWords)
          .map(([word, counts]) => ({
            word,
            count: counts.reduce((sum, count) => sum + count, 0)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20); // Only show top 20 for visualization
        
        setReduceOutput(reducedWords);
        setActiveStep("reduce");
        
        // Generate insight based on the results
        const totalWords = words.length;
        const uniqueWords = reducedWords.length;
        const topWord = reducedWords[0];
        
        setInsight(`The Reduce phase has completed, processing ${totalWords} total words with ${uniqueWords} unique words. The most frequent word "${topWord?.word}" appears ${topWord?.count} times (${Math.round((topWord?.count / totalWords) * 100)}% of all words). This pattern distribution is typical in natural language, following Zipf's law where a few words occur very frequently while many words occur rarely.`);
      }, 1500);
    }, 1500);
  };
  
  const resetDemo = () => {
    setActiveStep("input");
    setMapOutput({});
    setReduceOutput([]);
    setInsight("");
  };
  
  const chartColors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c",
    "#d0ed57", "#83a6ed", "#8dd1e1", "#a4262c", "#ec407a"
  ];
  
  const getExampleText = () => {
    const text = `MapReduce is a programming model and an associated implementation for processing and generating big data sets with a parallel, 
    distributed algorithm on a cluster. A MapReduce program is composed of a map procedure, which performs filtering and sorting, 
    and a reduce method, which performs a summary operation. The model is a specialization of the split-apply-combine strategy for data analysis.`;
    setInputText(text);
  };
  
  return (
    <ModuleLayout
      title="Paradigms for Data Manipulation"
      subtitle="Module 3"
      description="Learn data manipulation concepts like MapReduce for processing big data"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">MapReduce Simulator</h2>
            <div className="flex gap-2">
              <ExplainConcept
                title="What is MapReduce?"
                explanation={mapReduceExplanation}
              />
              <Button 
                variant={showQuiz ? "default" : "outline"} 
                onClick={() => setShowQuiz(!showQuiz)}
                size="sm"
              >
                {showQuiz ? "Hide Quiz" : "Test Your Knowledge"}
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            This interactive tool demonstrates the MapReduce paradigm for distributed data processing.
            Enter some text to see how it gets processed through the map, shuffle, and reduce stages.
          </p>
        </div>
        
        {showQuiz ? (
          <div className="mb-8 animate-fade-in">
            <QuizCard 
              title="MapReduce Concepts Quiz" 
              description="Test your understanding of MapReduce and data manipulation paradigms"
              questions={quizQuestions}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-lg border flex items-center justify-center ${activeStep === "input" ? "bg-primary/10 border-primary" : "bg-muted"}`}>
                <div className="text-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">1</div>
                  <h3 className="mt-2 font-semibold">Input</h3>
                </div>
              </div>
              <div className={`p-4 rounded-lg border flex items-center justify-center ${activeStep === "map" ? "bg-primary/10 border-primary" : "bg-muted"}`}>
                <div className="text-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">2</div>
                  <h3 className="mt-2 font-semibold">Map</h3>
                </div>
              </div>
              <div className={`p-4 rounded-lg border flex items-center justify-center ${activeStep === "shuffle" ? "bg-primary/10 border-primary" : "bg-muted"}`}>
                <div className="text-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">3</div>
                  <h3 className="mt-2 font-semibold">Shuffle</h3>
                </div>
              </div>
              <div className={`p-4 rounded-lg border flex items-center justify-center ${activeStep === "reduce" ? "bg-primary/10 border-primary" : "bg-muted"}`}>
                <div className="text-center">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">4</div>
                  <h3 className="mt-2 font-semibold">Reduce</h3>
                </div>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Text Input</CardTitle>
                <CardDescription>
                  Enter text or use an example to process through MapReduce
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Type or paste text here to analyze..." 
                  className="min-h-[120px] mb-4"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={activeStep !== "input"}
                />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button 
                    onClick={processMapReduce} 
                    disabled={!inputText.trim() || activeStep !== "input"}
                  >
                    Run MapReduce
                  </Button>
                  <Button variant="outline" onClick={getExampleText} disabled={activeStep !== "input"}>
                    Use Example Text
                  </Button>
                  {activeStep !== "input" && (
                    <Button variant="secondary" onClick={resetDemo}>
                      Reset Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {activeStep !== "input" && (
              <Card className="mb-8 animate-fade-in">
                <CardHeader>
                  <CardTitle>{activeStep === "map" ? "Map Output" : activeStep === "shuffle" ? "Shuffle Process" : "Reduce Results"}</CardTitle>
                  <CardDescription>
                    {activeStep === "map" 
                      ? "Generated (word, 1) pairs for each word" 
                      : activeStep === "shuffle" 
                      ? "Grouping values by keys" 
                      : "Word count results after reduction"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeStep === "map" && (
                    <div className="p-4 bg-muted/50 rounded-lg max-h-[300px] overflow-y-auto">
                      {Object.entries(mapOutput).map(([word, counts], index) => (
                        <div key={index} className="mb-2">
                          <div className="text-sm font-medium">{word}:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {counts.map((_, i) => (
                              <div 
                                key={i}
                                className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full"
                              >
                                1
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeStep === "shuffle" && (
                    <div className="p-4 bg-muted/50 rounded-lg max-h-[300px] overflow-y-auto">
                      <div className="text-center text-muted-foreground mb-4">Shuffling and sorting data...</div>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(mapOutput).slice(0, 9).map(([word, counts], index) => (
                          <div key={index} className="p-3 bg-card rounded border shadow-sm animate-pulse">
                            <div className="font-medium">{word}</div>
                            <div className="text-sm text-muted-foreground">[{counts.join(', ')}]</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeStep === "reduce" && (
                    <div className="h-[400px] w-full">
                      <ChartContainer config={{}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={reduceOutput.slice(0, 15)} layout="vertical" margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                            <XAxis type="number" />
                            <YAxis 
                              dataKey="word" 
                              type="category" 
                              width={80}
                              tick={{ fontSize: 12 }}
                            />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Bar dataKey="count" fill="#8884d8">
                              {reduceOutput.slice(0, 15).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {insight && (
              <InsightCard title={`${activeStep.charAt(0).toUpperCase() + activeStep.slice(1)} Phase Insight`}>
                <p>{insight}</p>
              </InsightCard>
            )}
          </>
        )}
        
        <div className="p-6 border rounded-lg bg-card mt-8">
          <h3 className="text-lg font-semibold mb-4">Module Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Paradigms for Data Manipulation examines programming models designed for processing large datasets efficiently. This module covers:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>MapReduce programming model for distributed computing</li>
            <li>Key-value pair representation of data</li>
            <li>Parallelization through Map and Reduce operations</li>
            <li>Data locality principles for processing efficiency</li>
            <li>Distributed computing frameworks like Hadoop and Spark</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
