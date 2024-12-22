import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

const analyzeEntrySchema = z.object({
  analysis: z.object({
    mood: z.string().describe('One-word mood of the journal entry or writer.'),
    subject: z.string().describe('Main subject or theme of the journal entry.'),
    summary: z
      .string()
      .describe('Concise summary addressing the writer directly.'),
    color: z
      .string()
      .describe("Hexadecimal color code representing the entry's mood."),
    emotion: z
      .enum(['NEGATIVE', 'NEUTRAL', 'POSITIVE'])
      .describe('Overall emotional tone.'),
    sentimentScore: z
      .number()
      .min(-10)
      .max(10)
      .describe(
        'Sentiment scale from -10 (very negative) to 10 (very positive).',
      ),
    emoji: z.string().describe("Single emoji representing the entry's mood."),
    recommendation: z
      .string()
      .max(100)
      .describe('Short, actionable advice aligned with the mood.'),
    language: z.string().describe('Detected language of the journal entry.'),
  }),
})

export const analyzeEntry = async (journalEntry: string, language: string) => {
  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-pro-latest'),
      schema: analyzeEntrySchema,
      prompt: `
        You are an empathetic AI assistant specializing in analyzing journal entries.
        Analyze the following journal entry and provide insights. Respond in ${language}.

        Guidelines:
        1. Mood: Capture the predominant feeling in one word.
        2. Subject: Identify the main topic or theme.
        3. Summary: Provide a brief, personalized summary directly addressing the writer.
        4. Color: Choose a hex color that best represents the entry's mood.
        5. Emotion: Categorize as NEGATIVE, NEUTRAL, or POSITIVE.
        6. Sentiment Score: Rate from -10 (extremely negative) to 10 (extremely positive).
        7. Emoji: Select one emoji that encapsulates the entry's mood.
        8. Recommendation: Offer a short, actionable suggestion (max 100 characters) tailored to the mood and content.
        9. Language: Detect and specify the language used in the entry.

        Remember:
        - Be sensitive and supportive in your analysis.
        - Ensure recommendations are helpful and mood-appropriate.
        - Maintain a non-judgmental tone throughout the analysis.

        Journal Entry:
        "${journalEntry}"

        Provide your analysis in a structured JSON format as per the defined schema.
      `,
    })

    console.log('Analysis result:', object.analysis)
    return object.analysis
  } catch (error) {
    console.error('Error analyzing entry:', error)
    throw new Error('Failed to analyze journal entry')
  }
}
