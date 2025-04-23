
import { useState } from "react";
import { ModuleLayout } from "@/components/modules/ModuleLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Upload, ArrowUp, ArrowDown, CircleCheckBig, CircleAlert } from "lucide-react";
import { ExplainConcept } from "@/components/ui/explain-concept";
import { QuizCard } from "@/components/ui/quiz-card";
import { InsightCard } from "@/components/ui/insight-card";
import { TechnicalPanel } from "@/components/ui/technical-panel";

interface DataRow {
  id: string;
  name: string;
  age: string;
  email: string;
  date: string;
  status: string;
}

interface DataStats {
  totalRows: number;
  missingValues: number;
  duplicateRows: number;
  outliers: number;
}

const sampleData: DataRow[] = [
  { id: "1", name: "John Doe", age: "34", email: "john.doe@example.com", date: "2023-05-15", status: "active" },
  { id: "2", name: "Jane Smith", age: "29", email: "jane.smith@example.com", date: "2023-06-21", status: "inactive" },
  { id: "3", name: "", age: "42", email: "robert.johnson@example.com", date: "2023-04-10", status: "active" },
  { id: "4", name: "Emily Davis", age: "", email: "emily.davis@example.com", date: "2023-07-30", status: "pending" },
  { id: "5", name: "Michael Wilson", age: "38", email: "", date: "2023-03-05", status: "active" },
  { id: "6", name: "John Doe", age: "34", email: "john.doe@example.com", date: "2023-05-15", status: "active" },
  { id: "7", name: "Sarah Brown", age: "215", email: "sarah.brown@example.com", date: "invalid-date", status: "active" },
  { id: "8", name: "David Lee", age: "45", email: "david.lee@example.com", date: "2023-09-12", status: "inactive" },
  { id: "9", name: "Lisa Miller", age: "31", email: "lisa.miller@example", date: "2023-08-22", status: "pending" },
  { id: "10", name: "James Wilson", age: "53", email: "james.wilson@example.com", date: "2023-02-14", status: "" }
];

// Quiz questions
const quizQuestions = [
  {
    question: "What is the primary purpose of data cleaning?",
    options: [
      "To make data look visually appealing", 
      "To reduce the size of datasets", 
      "To improve data quality and accuracy", 
      "To encrypt sensitive information"
    ],
    correctAnswer: 2,
    explanation: "Data cleaning focuses on detecting and correcting (or removing) errors and inconsistencies in data to improve its quality and accuracy for analysis. This process ensures reliable results from data analysis."
  },
  {
    question: "Which of the following is NOT a common data quality issue?",
    options: [
      "Missing values", 
      "Duplicate records", 
      "High-resolution images", 
      "Inconsistent formats"
    ],
    correctAnswer: 2,
    explanation: "High-resolution images refer to image quality, not a data quality issue. Common data quality issues include missing values, duplicate records, outliers, inconsistent formats, and incorrect data types."
  },
  {
    question: "In the context of data cleaning, what is an outlier?",
    options: [
      "A data point that's mandatory in every dataset", 
      "A value that differs significantly from other observations", 
      "A column with missing values", 
      "An encrypted data record"
    ],
    correctAnswer: 1,
    explanation: "An outlier is a data point that differs significantly from other observations in the same dataset. Outliers can be caused by measurement errors, data entry mistakes, or they may be genuine extreme values that require special consideration during analysis."
  }
];

// Explanation text
const dataCleaningExplanation = `Data cleaning (or data cleansing) is the process of identifying and correcting errors, inconsistencies, and inaccuracies in datasets.

Key aspects of data cleaning include:

1. Error Detection
   - Identifying inconsistencies, invalid entries, and outliers
   - Looking for missing values and duplicates
   - Validating data against domain rules and constraints

2. Data Transformation
   - Standardizing formats (dates, phone numbers, etc.)
   - Converting data types
   - Normalizing values to consistent scales or units

3. Data Enrichment
   - Filling in missing values through imputation
   - Adding derived or calculated fields
   - Annotating data with additional information

4. Validation and Verification
   - Checking cleaned data against business rules
   - Cross-referencing with reliable sources
   - Ensuring transformations have preserved data integrity

Data cleaning is often the most time-consuming part of the data science workflow, typically taking 60-80% of a data scientist's time, but is critical for ensuring accurate analysis results.`;

// Technical panel content
const dataPseudocode = `function cleanData(dataset):
    # Step 1: Remove duplicates
    uniqueRows = removeDuplicates(dataset)
    
    # Step 2: Handle missing values
    for each row in uniqueRows:
        for each column in row:
            if isNull(column):
                if isNumerical(column):
                    column = mean(allValuesInColumn)
                else:
                    column = mode(allValuesInColumn)
    
    # Step 3: Fix incorrect data types
    for each column in uniqueRows:
        if shouldBeNumeric(column):
            convertToNumeric(column)
        else if shouldBeDate(column):
            standardizeDate(column)
    
    # Step 4: Handle outliers
    for each numericColumn in uniqueRows:
        q1 = calculateFirstQuartile(numericColumn)
        q3 = calculateThirdQuartile(numericColumn)
        iqr = q3 - q1
        lowerBound = q1 - 1.5 * iqr
        upperBound = q3 + 1.5 * iqr
        
        for each value in numericColumn:
            if value < lowerBound or value > upperBound:
                markAsOutlier(value)
    
    return uniqueRows`;

// Formulas for technical panel
const dataCleaningFormulas = [
  {
    name: "Z-Score for Outlier Detection",
    formula: "z = (x - μ) / σ",
    explanation: "Where x is the observation value, μ is the mean of the sample, and σ is the standard deviation. Values with |z| > 3 are often considered outliers."
  },
  {
    name: "IQR Method for Outlier Detection",
    formula: "Lower bound = Q1 - 1.5 × IQR\nUpper bound = Q3 + 1.5 × IQR",
    explanation: "Where Q1 is the first quartile, Q3 is the third quartile, and IQR is the interquartile range (Q3 - Q1). Values outside these bounds are potential outliers."
  },
  {
    name: "Missing Value Ratio",
    formula: "MVR = (Number of missing values in feature) / (Total number of observations)",
    explanation: "Used to decide whether to impute or drop features with missing values. Features with high MVR may be candidates for removal."
  }
];

export default function LargeScaleData() {
  const [originalData, setOriginalData] = useState<DataRow[]>(sampleData);
  const [cleanedData, setCleanedData] = useState<DataRow[]>(sampleData);
  const [dataStats, setDataStats] = useState<DataStats>({
    totalRows: sampleData.length,
    missingValues: 5,
    duplicateRows: 1,
    outliers: 2
  });
  
  const [cleaningOptions, setCleaningOptions] = useState({
    removeDuplicates: true,
    fillMissingNames: false,
    removeOutliers: false,
    fixEmailFormat: false,
    fixDateFormat: false
  });
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [insight, setInsight] = useState("");
  
  const applyDataCleaning = () => {
    let processedData = [...originalData];
    let stats = {
      totalRows: originalData.length,
      missingValues: 0,
      duplicateRows: 0,
      outliers: 0
    };
    
    // Count issues first
    processedData.forEach(row => {
      if (!row.name || !row.age || !row.email || !row.date || !row.status) {
        stats.missingValues++;
      }
      if (parseInt(row.age) > 120) {
        stats.outliers++;
      }
      if (!row.email.includes('@') || !row.email.includes('.')) {
        stats.outliers++;
      }
    });
    
    // Find duplicates
    const uniqueIds = new Set();
    processedData.forEach(row => {
      const rowString = JSON.stringify(row);
      if (uniqueIds.has(rowString)) {
        stats.duplicateRows++;
      } else {
        uniqueIds.add(rowString);
      }
    });
    
    // Apply cleaning based on selected options
    if (cleaningOptions.removeDuplicates) {
      const uniqueRows = new Map();
      processedData.forEach(row => {
        const key = JSON.stringify(row);
        if (!uniqueRows.has(key)) {
          uniqueRows.set(key, row);
        }
      });
      processedData = Array.from(uniqueRows.values());
      stats.totalRows = processedData.length;
    }
    
    if (cleaningOptions.fillMissingNames) {
      processedData = processedData.map(row => {
        if (!row.name) {
          return { ...row, name: "Unknown" };
        }
        return row;
      });
    }
    
    if (cleaningOptions.removeOutliers) {
      processedData = processedData.filter(row => {
        const age = parseInt(row.age);
        return !isNaN(age) && age <= 120;
      });
      stats.totalRows = processedData.length;
      stats.outliers = 0;
    }
    
    if (cleaningOptions.fixEmailFormat) {
      processedData = processedData.map(row => {
        if (!row.email.includes('@') || !row.email.includes('.')) {
          return { ...row, email: row.email.includes('@') ? row.email : row.email + '@example.com' };
        }
        return row;
      });
    }
    
    if (cleaningOptions.fixDateFormat) {
      processedData = processedData.map(row => {
        if (!row.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return { ...row, date: "2023-01-01" };
        }
        return row;
      });
    }
    
    setCleanedData(processedData);
    setDataStats(stats);
    
    // Generate insight
    let insightText = `Applied ${Object.entries(cleaningOptions).filter(([_, value]) => value).length} cleaning operations. `;
    
    if (cleaningOptions.removeDuplicates && stats.duplicateRows > 0) {
      insightText += `Removed ${stats.duplicateRows} duplicate row(s). `;
    }
    
    if (cleaningOptions.fillMissingNames) {
      const missingNameCount = originalData.filter(row => !row.name).length;
      if (missingNameCount > 0) {
        insightText += `Filled ${missingNameCount} missing name value(s). `;
      }
    }
    
    if (cleaningOptions.removeOutliers) {
      insightText += `Removed ${stats.outliers} outlier(s). `;
    }
    
    if (cleaningOptions.fixEmailFormat || cleaningOptions.fixDateFormat) {
      insightText += 'Standardized formats for consistency. ';
    }
    
    insightText += `Data quality improved by ${calculateQualityImprovement()}%.`;
    
    setInsight(insightText);
  };
  
  const calculateQualityImprovement = () => {
    // Simple calculation for demo purposes
    const initialIssues = 5 + 1 + 2; // initial missing + duplicates + outliers
    const remainingIssues = dataStats.missingValues + dataStats.duplicateRows + dataStats.outliers;
    
    if (initialIssues === 0) return 0;
    
    const improvement = ((initialIssues - remainingIssues) / initialIssues) * 100;
    return Math.round(improvement);
  };
  
  const resetDemo = () => {
    setCleanedData(originalData);
    setCleaningOptions({
      removeDuplicates: true,
      fillMissingNames: false,
      removeOutliers: false,
      fixEmailFormat: false,
      fixDateFormat: false
    });
    setDataStats({
      totalRows: originalData.length,
      missingValues: 5,
      duplicateRows: 1,
      outliers: 2
    });
    setInsight("");
  };
  
  const useSampleData = () => {
    setOriginalData(sampleData);
    setCleanedData(sampleData);
    setDataStats({
      totalRows: sampleData.length,
      missingValues: 5,
      duplicateRows: 1,
      outliers: 2
    });
    setInsight("");
  };
  
  return (
    <ModuleLayout
      title="Managing Large Scale Data"
      subtitle="Module 2"
      description="Learn data cleaning techniques and preprocessing for large datasets"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Data Cleaning Tool</h2>
            <div className="flex gap-2">
              <ExplainConcept
                title="What is Data Cleaning?"
                explanation={dataCleaningExplanation}
              />
              <TechnicalPanel
                title="Data Cleaning Technical Details"
                description="Pseudocode and mathematical formulas for data cleaning operations"
                pseudocode={dataPseudocode}
                formulas={dataCleaningFormulas}
                references={[
                  {
                    title: "Practical Data Cleaning Techniques",
                    url: "https://github.com/Quartz/bad-data-guide"
                  },
                  {
                    title: "Outlier Detection Methods",
                    url: "https://en.wikipedia.org/wiki/Outlier"
                  }
                ]}
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
            This interactive tool demonstrates common data cleaning techniques used when processing large datasets.
            Upload a dataset or use our sample data to apply different cleaning operations and see the results in real-time.
          </p>
        </div>
        
        {showQuiz ? (
          <div className="mb-8 animate-fade-in">
            <QuizCard 
              title="Data Cleaning Quiz" 
              description="Test your understanding of data cleaning techniques and challenges"
              questions={quizQuestions}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Data Source</CardTitle>
                <CardDescription>
                  Upload your data or use our sample dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border-2 border-dashed rounded-lg bg-muted/50 flex flex-col items-center justify-center mb-4">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop a CSV file here</p>
                  <p className="text-xs text-muted-foreground mb-4">or</p>
                  <Button variant="secondary" size="sm" className="mb-2">
                    Browse Files
                  </Button>
                  <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={useSampleData} variant="outline" size="sm">
                    Use Sample Data
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Clear
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Data Quality Report</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Rows</span>
                      <span className="font-mono">{dataStats.totalRows}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Missing Values</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono">{dataStats.missingValues}</span>
                        {dataStats.missingValues > 0 && <CircleAlert className="h-4 w-4 text-amber-500" />}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Duplicate Rows</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono">{dataStats.duplicateRows}</span>
                        {dataStats.duplicateRows > 0 && <CircleAlert className="h-4 w-4 text-amber-500" />}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Potential Outliers</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono">{dataStats.outliers}</span>
                        {dataStats.outliers > 0 && <CircleAlert className="h-4 w-4 text-amber-500" />}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Data Cleaning Operations</CardTitle>
                <CardDescription>
                  Apply cleaning operations to prepare your data for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cleaning" className="mb-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="cleaning">Cleaning Options</TabsTrigger>
                    <TabsTrigger value="preview">Data Preview</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cleaning">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="checkbox" 
                          className="w-4 h-4" 
                          checked={cleaningOptions.removeDuplicates}
                          onChange={() => setCleaningOptions({
                            ...cleaningOptions, 
                            removeDuplicates: !cleaningOptions.removeDuplicates
                          })}
                        />
                        <div>
                          <p className="font-medium">Remove Duplicate Rows</p>
                          <p className="text-sm text-muted-foreground">Eliminate rows with identical values across all columns</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="checkbox" 
                          className="w-4 h-4" 
                          checked={cleaningOptions.fillMissingNames}
                          onChange={() => setCleaningOptions({
                            ...cleaningOptions, 
                            fillMissingNames: !cleaningOptions.fillMissingNames
                          })}
                        />
                        <div>
                          <p className="font-medium">Fill Missing Names</p>
                          <p className="text-sm text-muted-foreground">Replace empty name fields with "Unknown"</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="checkbox" 
                          className="w-4 h-4" 
                          checked={cleaningOptions.removeOutliers}
                          onChange={() => setCleaningOptions({
                            ...cleaningOptions, 
                            removeOutliers: !cleaningOptions.removeOutliers
                          })}
                        />
                        <div>
                          <p className="font-medium">Remove Age Outliers</p>
                          <p className="text-sm text-muted-foreground">Filter out rows with age values over 120</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="checkbox" 
                          className="w-4 h-4" 
                          checked={cleaningOptions.fixEmailFormat}
                          onChange={() => setCleaningOptions({
                            ...cleaningOptions, 
                            fixEmailFormat: !cleaningOptions.fixEmailFormat
                          })}
                        />
                        <div>
                          <p className="font-medium">Fix Email Format</p>
                          <p className="text-sm text-muted-foreground">Ensure all email addresses contain @ and domain</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Input 
                          type="checkbox" 
                          className="w-4 h-4" 
                          checked={cleaningOptions.fixDateFormat}
                          onChange={() => setCleaningOptions({
                            ...cleaningOptions, 
                            fixDateFormat: !cleaningOptions.fixDateFormat
                          })}
                        />
                        <div>
                          <p className="font-medium">Fix Date Format</p>
                          <p className="text-sm text-muted-foreground">Standardize all dates to YYYY-MM-DD format</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex gap-2">
                        <Button onClick={applyDataCleaning}>Apply Cleaning</Button>
                        <Button variant="outline" onClick={resetDemo}>Reset</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="preview">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted">
                              <th className="px-4 py-3 text-left font-medium">ID</th>
                              <th className="px-4 py-3 text-left font-medium">Name</th>
                              <th className="px-4 py-3 text-left font-medium">Age</th>
                              <th className="px-4 py-3 text-left font-medium">Email</th>
                              <th className="px-4 py-3 text-left font-medium">Date</th>
                              <th className="px-4 py-3 text-left font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {cleanedData.map((row, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                                <td className="px-4 py-3">{row.id}</td>
                                <td className={`px-4 py-3 ${!row.name ? 'text-red-500' : ''}`}>
                                  {row.name || 'MISSING'}
                                </td>
                                <td className={`px-4 py-3 ${!row.age ? 'text-red-500' : parseInt(row.age) > 120 ? 'text-amber-500' : ''}`}>
                                  {row.age || 'MISSING'}
                                </td>
                                <td className={`px-4 py-3 ${!row.email ? 'text-red-500' : !row.email.includes('@') || !row.email.includes('.') ? 'text-amber-500' : ''}`}>
                                  {row.email || 'MISSING'}
                                </td>
                                <td className={`px-4 py-3 ${!row.date ? 'text-red-500' : !row.date.match(/^\d{4}-\d{2}-\d{2}$/) ? 'text-amber-500' : ''}`}>
                                  {row.date || 'MISSING'}
                                </td>
                                <td className={`px-4 py-3 ${!row.status ? 'text-red-500' : ''}`}>
                                  {row.status || 'MISSING'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    Data Quality Improvement
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-card rounded-lg border shadow-sm">
                      <div className="text-sm font-medium mb-1">Missing Values</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-semibold">{dataStats.missingValues}</div>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${dataStats.missingValues === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {dataStats.missingValues === 0 ? 
                            <CircleCheckBig className="h-5 w-5" /> : 
                            <ArrowDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border shadow-sm">
                      <div className="text-sm font-medium mb-1">Duplicate Rows</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-semibold">{dataStats.duplicateRows}</div>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${dataStats.duplicateRows === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {dataStats.duplicateRows === 0 ? 
                            <CircleCheckBig className="h-5 w-5" /> : 
                            <ArrowDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border shadow-sm">
                      <div className="text-sm font-medium mb-1">Outliers</div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-semibold">{dataStats.outliers}</div>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${dataStats.outliers === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {dataStats.outliers === 0 ? 
                            <CircleCheckBig className="h-5 w-5" /> : 
                            <ArrowDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {insight && (
                  <div className="mt-6">
                    <InsightCard title="Cleaning Results">
                      <p>{insight}</p>
                    </InsightCard>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-4">Module Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Managing Large Scale Data focuses on techniques for preparing, cleaning and processing large datasets efficiently. This module covers:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>Data cleaning methodologies for large datasets</li>
            <li>Handling missing values, duplicates and outliers</li>
            <li>Standardizing formats and ensuring data consistency</li>
            <li>Data preprocessing workflow optimization</li>
            <li>Quality assessment and validation techniques</li>
          </ul>
        </div>
      </div>
    </ModuleLayout>
  );
}
