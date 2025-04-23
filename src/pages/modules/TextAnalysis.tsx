
import { useState } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { InsightCard } from "@/components/ui/insight-card";
import { ExplainConcept } from "@/components/ui/explain-concept";
import { QuizCard } from "@/components/ui/quiz-card";
import { Label } from "@/components/ui/label";

// Mock sentiment analysis function
const analyzeSentiment = (text: string) => {
  if (!text.trim()) return null;
  
  // Simple keyword-based sentiment analysis for demo purposes
  const positiveWords = ['good', 'great', 'excellent', 'happy', 'love', 'like', 'amazing'];
  const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'hate', 'dislike', 'poor'];
  
  const words = text.toLowerCase().split(/\s+/);
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  let sentiment: 'positive' | 'negative' | 'neutral';
  if (positiveCount > negativeCount) sentiment = 'positive';
  else if (negativeCount > positiveCount) sentiment = 'negative';
  else sentiment = 'neutral';
  
  // Generate emotion score (0-100)
  const emotionScore = Math.min(100, Math.max(0, 50 + (positiveCount - negativeCount) * 15));
  
  // Generate emotions
  const emotions = {
    joy: Math.min(100, positiveCount * 20),
    anger: negativeCount > 1 ? Math.min(100, negativeCount * 15) : 0,
    surprise: text.includes('!') ? 70 : 10,
    sadness: text.toLowerCase().includes('sad') || text.toLowerCase().includes('unhappy') ? 80 : Math.min(80, negativeCount * 10),
    fear: text.toLowerCase().includes('afraid') || text.toLowerCase().includes('scared') ? 80 : 0
  };
  
  // Get dominant emotion
  const dominantEmotion = Object.entries(emotions)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  return {
    sentiment,
    emotionScore,
    wordCount: words.length,
    frequentWords: getFrequentWords(words, 5),
    emotions,
    dominantEmotion
  };
};

// Generate insight based on sentiment analysis
const generateInsight = (result: ReturnType<typeof analyzeSentiment>) => {
  if (!result) return "";
  
  let insight = "";
  
  if (result.sentiment === 'positive') {
    insight = `The text has a positive sentiment with an emotion score of ${result.emotionScore}/100. `;
    if (result.emotionScore > 80) {
      insight += "The content is extremely positive. ";
    }
    insight += `The dominant emotion detected is ${result.dominantEmotion}. `;
  } else if (result.sentiment === 'negative') {
    insight = `The text has a negative sentiment with an emotion score of ${result.emotionScore}/100. `;
    if (result.emotionScore < 20) {
      insight += "The content is extremely negative. ";
    }
    insight += `The dominant emotion detected is ${result.dominantEmotion}. `;
  } else {
    insight = `The text has a neutral sentiment with an emotion score of ${result.emotionScore}/100. `;
  }
  
  if (result.wordCount < 10) {
    insight += "Consider providing more text for a more accurate analysis.";
  } else if (result.frequentWords.length > 0) {
    insight += `The most frequent word "${result.frequentWords[0].word}" appears ${result.frequentWords[0].freq} times, which may indicate a key theme.`;
  }
  
  return insight;
};

// Helper function to get most frequent words
const getFrequentWords = (words: string[], count: number) => {
  const wordFreq: Record<string, number> = {};
  
  // Skip common words
  const stopWords = ['the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'are'];
  
  words.forEach(word => {
    if (!stopWords.includes(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word, freq]) => ({ word, freq }));
};

// Sample datasets for the "real world datasets" feature
const realWorldDatasets = [
  {
    name: "Product Reviews",
    text: "I absolutely love this product! The quality exceeds my expectations and it arrived earlier than expected. The customer service was also excellent when I had questions. Highly recommend to anyone looking for a reliable solution."
  },
  {
    name: "Movie Review",
    text: "The movie was disappointing. The plot was predictable, the acting was mediocre at best, and it was about 30 minutes too long. I wouldn't recommend spending your money on this one. Wait until it's available on streaming services if you're curious."
  },
  {
    name: "News Headline",
    text: "Breaking: Global climate summit ends with mixed reactions as nations struggle to agree on emission targets. Experts call results 'a step in the right direction' but 'insufficient' to address urgent climate crisis."
  }
];

// Quiz questions
const quizQuestions = [
  {
    question: "What is sentiment analysis?",
    options: [
      "A technique to determine the author of a text", 
      "A process of determining the emotional tone behind text", 
      "A method to translate text between languages", 
      "A way to compress text data"
    ],
    correctAnswer: 1,
    explanation: "Sentiment analysis is a natural language processing technique used to determine whether data is positive, negative, or neutral. It's commonly applied to detect sentiment in social media, customer reviews, and survey responses."
  },
  {
    question: "Which of the following is a common challenge in sentiment analysis?",
    options: [
      "Understanding sarcasm and irony", 
      "Counting the number of words", 
      "Detecting palindromes", 
      "Finding spelling errors"
    ],
    correctAnswer: 0,
    explanation: "Sarcasm and irony are difficult for sentiment analysis systems to detect because the literal meaning of words may contradict the intended sentiment. This is a major challenge in developing accurate sentiment analysis models."
  },
  {
    question: "In the bag-of-words model, what information is lost?",
    options: [
      "The frequency of words", 
      "The meaning of words", 
      "The word order and grammar", 
      "The presence of words"
    ],
    correctAnswer: 2,
    explanation: "The bag-of-words model represents text as an unordered collection of words, disregarding grammar and word order. While it counts word frequencies, it loses the contextual information provided by word arrangements and grammatical structures."
  }
];

// Explanation text for the "Explain This Concept" button
const sentimentAnalysisExplanation = `Sentiment Analysis is a Natural Language Processing technique used to determine the emotional tone behind a body of text. It helps identify whether the opinion expressed is positive, negative, or neutral.

Key components of sentiment analysis:

1. Text Preprocessing: Cleaning text by removing irrelevant information
2. Feature Extraction: Converting text into numerical features (like word counts or word embeddings)
3. Classification: Using machine learning algorithms to classify sentiment
4. Evaluation: Testing accuracy and fine-tuning the model

Common approaches:
- Rule-based: Uses predefined rules to identify sentiment
- Machine Learning: Uses training data to learn patterns
- Hybrid: Combines both approaches

Applications include:
- Brand monitoring
- Customer service
- Market research
- Product feedback analysis
- Social media monitoring`;

export default function TextAnalysis() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeSentiment>>(null);
  const [insight, setInsight] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [useRealData, setUseRealData] = useState(false);
  
  const handleAnalyze = () => {
    const analysisResult = analyzeSentiment(text);
    setResult(analysisResult);
    
    if (analysisResult) {
      setInsight(generateInsight(analysisResult));
    }
  };
  
  const getSentimentColor = () => {
    if (!result) return 'bg-muted';
    
    switch(result.sentiment) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };
  
  const getSentimentEmoji = () => {
    if (!result) return '😐';
    
    switch(result.sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      default: return '😐';
    }
  };
  
  const examples = [
    "I had a wonderful day at the park. The weather was beautiful and I met some friends for lunch.",
    "This product is terrible. It broke after two days and customer service was no help at all.",
    "The movie was okay. Some parts were good but the ending was a bit disappointing."
  ];
  
  const handleUseRealData = (checked: boolean) => {
    setUseRealData(checked);
    if (checked) {
      setText(realWorldDatasets[0].text);
    } else {
      setText("");
    }
  };
  
  const selectRealWorldDataset = (index: number) => {
    if (index >= 0 && index < realWorldDatasets.length) {
      setText(realWorldDatasets[index].text);
    }
  };
  
  return (
    <ModuleLayout
      title="Text Analysis"
      subtitle="Module 4"
      description="Analyze text to detect sentiment, extract key information, and visualize content"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Sentiment Analysis Tool</h2>
            <div className="flex gap-2">
              <ExplainConcept
                title="What is Sentiment Analysis?"
                explanation={sentimentAnalysisExplanation}
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
            Enter any text to analyze its sentiment and extract important phrases. This tool uses 
            natural language processing techniques to determine the emotional tone of text.
          </p>
        </div>
        
        {showQuiz ? (
          <div className="mb-8 animate-fade-in">
            <QuizCard 
              title="Text Analysis Quiz" 
              description="Test your understanding of sentiment analysis and text processing concepts"
              questions={quizQuestions}
            />
          </div>
        ) : (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Text Input</CardTitle>
                    <CardDescription>
                      Enter text or choose an example to analyze its sentiment
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="real-data" className="text-sm">Use Real-World Data</Label>
                    <Switch id="real-data" checked={useRealData} onCheckedChange={handleUseRealData} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Type or paste text here for analysis..." 
                  className="min-h-[150px] mb-4"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button onClick={handleAnalyze} disabled={!text.trim()}>
                    Analyze Sentiment
                  </Button>
                  <Button variant="outline" onClick={() => setText("")}>
                    Clear
                  </Button>
                </div>
                
                {useRealData ? (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Real-world datasets:</h4>
                    <div className="flex flex-wrap gap-2">
                      {realWorldDatasets.map((dataset, i) => (
                        <Button 
                          key={i} 
                          variant="secondary" 
                          size="sm"
                          onClick={() => selectRealWorldDataset(i)}
                          className="text-xs"
                        >
                          {dataset.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Example texts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {examples.map((example, i) => (
                        <Button 
                          key={i} 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setText(example)}
                          className="text-xs"
                        >
                          Example {i + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {result && (
              <>
                <Card className="mb-8 animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      Analysis Results
                      <span className="ml-2 text-2xl">{getSentimentEmoji()}</span>
                    </CardTitle>
                    <CardDescription>
                      Sentiment and keyword analysis of your text
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="sentiment">
                      <TabsList className="mb-4">
                        <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                        <TabsTrigger value="emotions">Emotions</TabsTrigger>
                        <TabsTrigger value="keywords">Keywords</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="sentiment">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="p-4 rounded-lg bg-card border text-center">
                            <div className="text-lg font-medium mb-1">Sentiment</div>
                            <div className="flex items-center justify-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getSentimentColor()}`} />
                              <div className="capitalize">{result.sentiment}</div>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-card border text-center">
                            <div className="text-lg font-medium mb-1">Emotion Score</div>
                            <div className="relative h-6 rounded-full bg-muted overflow-hidden">
                              <div 
                                className={`absolute top-0 left-0 h-full ${
                                  result.emotionScore > 65 ? 'bg-green-500' : 
                                  result.emotionScore < 35 ? 'bg-red-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${result.emotionScore}%` }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                {result.emotionScore}/100
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-card border text-center">
                            <div className="text-lg font-medium mb-1">Word Count</div>
                            <div>{result.wordCount} words</div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="emotions">
                        <div className="space-y-4">
                          {result.emotions && (
                            <>
                              <div className="p-4 rounded-lg bg-card border">
                                <h4 className="font-medium mb-3">Emotion Detection</h4>
                                <div className="space-y-3">
                                  {Object.entries(result.emotions).map(([emotion, score]) => (
                                    <div key={emotion}>
                                      <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="capitalize">{emotion}</span>
                                        <span>{score}%</span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-2.5">
                                        <div 
                                          className="h-2.5 rounded-full bg-primary"
                                          style={{ width: `${score}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="mt-4 text-sm font-medium">
                                  Dominant emotion: <span className="capitalize">{result.dominantEmotion}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="keywords">
                        <div className="p-4 rounded-lg bg-muted/50">
                          <h4 className="font-medium mb-3">Most Frequent Words</h4>
                          <div className="flex flex-wrap gap-2">
                            {result.frequentWords.length > 0 ? (
                              result.frequentWords.map((item, index) => (
                                <div 
                                  key={index} 
                                  className="px-3 py-1 bg-card rounded-full border text-xs font-medium flex items-center"
                                  style={{ 
                                    fontSize: `${Math.max(0.75, Math.min(1.5, 0.75 + item.freq * 0.1))}rem` 
                                  }}
                                >
                                  {item.word}
                                  <span className="ml-1 text-muted-foreground">({item.freq})</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No significant words found</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <InsightCard title="Analysis Insight">
                  <p>{insight}</p>
                </InsightCard>
              </>
            )}
          </>
        )}
        
        <div className="p-6 border rounded-lg bg-card mt-8">
          <h3 className="text-lg font-semibold mb-4">Module Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Text Analysis explores techniques for extracting meaningful insights from natural language data.
            This module covers:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>Document representation using shingling and bag-of-words</li>
            <li>Locality-Sensitive Hashing (LSH) for document similarity</li>
            <li>Sentiment analysis and emotion classification</li>
            <li>Word clouds and text visualization techniques</li>
            <li>Named Entity Recognition and key phrase extraction</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
