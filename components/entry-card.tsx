'use client'
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SpotlightCard from '@/components/spotlight-card'
import { formatTime } from '@/services/format-date'
import Link from 'next/link'
import { EntryActions } from './entry-actions'
const EntryCard = ({ entries }) => {
  return entries?.map((entry) => (
    <Link
      href={`/journal/${entry.id}`}
      key={entry.id}
      className="w-96 flex-auto md:w-80"
    >
      <SpotlightCard>
        <Card className="h-40 min-h-40 w-full cursor-pointer items-center justify-center">
          <CardHeader>
            <CardTitle className="flex justify-between">
              {entry.analysis.subject}
              <EntryActions entryId={entry.id} />
            </CardTitle>
            <CardDescription>
              last updated {formatTime(entry.updatedAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-start">
            <p className="line-clamp-2">{entry.content}</p>
          </CardContent>
        </Card>
      </SpotlightCard>
    </Link>
  ))
}
export default EntryCard
