
import { useState } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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
  
  return {
    sentiment,
    emotionScore,
    wordCount: words.length,
    frequentWords: getFrequentWords(words, 5),
  };
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

export default function TextAnalysis() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeSentiment>>(null);
  
  const handleAnalyze = () => {
    const analysisResult = analyzeSentiment(text);
    setResult(analysisResult);
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
  
  return (
    <ModuleLayout
      title="Text Analysis"
      subtitle="Module 4"
      description="Analyze text to detect sentiment, extract key information, and visualize content"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-bold">Sentiment Analysis Tool</h2>
          <p className="text-muted-foreground">
            Enter any text to analyze its sentiment and extract important phrases. This tool uses 
            natural language processing techniques to determine the emotional tone of text.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Text Input</CardTitle>
            <CardDescription>
              Enter text or choose an example to analyze its sentiment
            </CardDescription>
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
          </CardContent>
        </Card>
        
        {result && (
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
                
                <TabsContent value="keywords">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-3">Most Frequent Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.frequentWords.length > 0 ? (
                        result.frequentWords.map((item, index) => (
                          <div 
                            key={index} 
                            className="px-3 py-1 bg-card rounded-full border text-xs font-medium flex items-center"
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
        )}
        
        <div className="p-6 border rounded-lg bg-card">
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
