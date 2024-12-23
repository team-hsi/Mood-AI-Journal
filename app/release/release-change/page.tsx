import ReactMarkdown from 'react-markdown'

const changeDocMarkdown = `

# Change Document for Mood AI Journal

## Project Name: Mood AI Journal

### Versions:

- **Version 1**: Initial Release
- **Version 2**: Enhanced Release

---

## 1. Summary of Changes

### **Features in Version 1**

1. **Journal Entry Management**:
   - Enable users to create, update, and delete journal entries.
   - Implement auto-save functionality for entries to ensure data integrity.
2. **AI-Powered Journal Analysis**:
   - Deploy analysis features including mood detection, sentiment scoring, emotion classification, subject identification, emoji suggestions, summarization, and color assignment.
   - Incorporate LangChain and Google Generative AI for enhanced analytical accuracy.
3. **Authentication and Database**:
   - Facilitate user authentication through Clerk integration.
   - Utilize Neon Database for robust data storage solutions.
4. **Static Landing Page**:
   - Design an informative and lightweight landing page for improved user onboarding.
5. **Data Visualization**:
   - Present analytics and doughnut charts derived from sentiment scores for enhanced interpretability.
6. **Language Support**:
   - Restrict initial language capabilities to English only.

---

### **New Features in Version 2**

1. **Extended Language Support**:

   - Expand capabilities to detect and respond in **80 languages** tailored to user preferences.

2. **Enhanced Search Functionality**:

   - Enable searching of journal entries based on mood, emotion, sentiment scores, and subject classifications.

3. **AI-Powered Chat**:

   - Integrate a conversational AI chatbot with contextual awareness of user journal data to offer personalized interactions.

4. **Actionable Recommendations**:

   - Provide tailored well-being recommendations derived from mood analysis.

5. **Improved Landing Page**:

   - Redesign the landing page with animations and a visually compelling interface.

6. **Dynamic Language Interaction**:

   - Implement automatic detection of input language with responses in the user-selected language.

7. **Version Updates**:
   - Upgrade the framework to Next.js **14.2.21** from **14.2.13** to ensure optimal performance.

---

## 2. Technical Changes

### **Infrastructure Updates**

- **Prisma Schema Updates**:

  - Revise schema models to accommodate multilingual functionalities.
  - Add new fields to support recommendations and linguistic versatility.

- **Database Migration**:
  - Execute successful schema migrations reflecting enhanced data structures.

### **APIs**

- Augment API endpoints to facilitate advanced search queries and multilingual analytics.
- Integrate language detection and response protocols within the AI analysis module.

### **Frontend Enhancements**

- Introduce animations on the landing page to elevate user engagement.
- Refactor UI components to seamlessly integrate features like search filters and chatbot interfaces.

---

## 3. Benefits of Version 2

1. **Global Accessibility**:

   - Extend application reach through support for 80 languages, enhancing inclusivity.

2. **Personalized Experience**:

   - Leverage recommendations and chatbot functionality to deepen user engagement and provide actionable insights.

3. **Data Utilization**:

   - Optimize search capabilities to allow users to extract meaningful patterns and insights from journal entries.

4. **Modern Design**:

   - Deploy a visually appealing landing page to improve user retention and overall experience.

5. **Future-Ready Framework**:
   - Transition to the latest Next.js version to capitalize on performance and security improvements.

---

## 4. Next Steps

1. **User Feedback**:

   - Collect and analyze user feedback to identify and address potential areas for enhancement.

2. **Performance Optimization**:

   - Monitor and refine application performance, with particular focus on multilingual functionalities.

3. **Documentation Update**:

   - Revise user guides and tutorials to accurately reflect newly introduced features.

4. **Marketing Launch**:
   - Strategically announce the Version 2 release and its salient features through targeted social media and email campaigns.
     `

export default function ReleaseChanges() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <ReactMarkdown className="prose prose-orange">
          {changeDocMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
