
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/ui/hero-section";

const About = () => {
  return (
    <Layout>
      <HeroSection
        title="About the Project"
        subtitle="University Project"
        description="An end-semester project demonstrating practical applications of data science concepts"
      />
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <p className="text-muted-foreground mb-8">
              This project was developed as part of the CS322 - Data Science course to demonstrate 
              practical applications of core data science concepts covered throughout the semester. 
              The goal was to create an engaging, interactive web application that illustrates how 
              theoretical concepts can be applied to solve real-world problems.
            </p>
            
            <h3 className="text-xl font-bold mb-4">Technical Implementation</h3>
            <p className="text-muted-foreground mb-6">
              The application is built using modern web technologies including React, TypeScript, 
              and Tailwind CSS. Interactive visualizations are created using libraries like Recharts
              and custom animations. Each module demonstrates different data science techniques with
              a focus on user interaction and visual learning.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-10">
              <div className="p-6 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">Technologies Used</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>React & TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Recharts/D3.js</li>
                  <li>Shadcn UI</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">Learning Objectives</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Apply data science concepts</li>
                  <li>Create interactive visualizations</li>
                  <li>Design intuitive user experiences</li>
                  <li>Implement algorithms</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2">Project Scope</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>6 core data science modules</li>
                  <li>Interactive demos for each</li>
                  <li>User-friendly interface</li>
                  <li>Educational content</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Academic Context</h3>
            <p className="text-muted-foreground mb-6">
              This project represents the culmination of a semester-long exploration of data science 
              principles and practices. Through interactive demonstrations, the application showcases
              the practical implementation of algorithms and techniques taught in the CS322 course.
            </p>
            
            <h3 className="text-xl font-bold mb-4">Future Development</h3>
            <p className="text-muted-foreground">
              While this application was developed as an academic project, there is potential for 
              further enhancement. Future iterations could include more advanced algorithms,
              integration with real datasets, collaboration features, and expanded educational content.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
