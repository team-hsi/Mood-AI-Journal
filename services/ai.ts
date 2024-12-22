import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'

const analyzeEntrySchema = z.object({
  analysis: z.object({
    mood: z
      .string()
      .describe(
        'The mood of the journal entry or the person who wrote it, must be one word.',
      ),
    subject: z.string().describe('The subject or theme of the journal entry.'),
    summary: z
      .string()
      .describe(
        'A quick summary of the entire entry that directly addresses the writer.',
      ),
    color: z
      .string()
      .describe(
        'A hexadecimal color code that represents the mood of the entry.',
      ),
    emotion: z
      .enum(['NEGATIVE', 'NEUTRAL', 'POSITIVE'])
      .describe(
        'The emotional tone, whether neutral, positive, or negative (uppercase).',
      ),
    sentimentScore: z
      .number()
      .describe(
        'Sentiment of the text rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
    emoji: z
      .string()
      .describe(
        'Emoji that represents the mood of the entry. Example: 😊 for happiness.',
      ),
    language: z
      .string()
      .describe('The detected language of the journal entry.'),
  }),
})

export const analyzeEntry = async (journalEntry: string, language: string) => {
  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-pro-latest'), // Adjust the model as needed
      schema: analyzeEntrySchema,
      prompt: `
        You are an assistant that analyzes journal entries. Respond in ${language}.
        Analyze the following journal entry and return a JSON object with the following structure:
        - mood (one word)
        - subject
        - summary (addressing the writer)
        - emoji
        - color (hex code)
        - emotion (NEGATIVE, NEUTRAL, POSITIVE)
        - sentimentScore (-10 to 10)
        - detected language
        Journal Entry: ${journalEntry}
      `,
    })

    console.log('Analysis result:', object.analysis)
    return object.analysis
  } catch (error) {
    console.error('Error analyzing entry:', error)
    throw new Error('Failed to analyze journal entry')
  }
}
