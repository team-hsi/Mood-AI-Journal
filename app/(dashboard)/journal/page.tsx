import EntryCard from '@/components/entry-card'
import NewEntry from '@/components/new-entry'
import { getEntries } from '@/services/actions'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearchInput } from '@/components/search-input'
import { getUserByClerkId } from '@/services/auth'

const Page = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    throw new Error('User not found')
  }
  const entries = await getEntries(user.id)

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h2 className="text-3xl">Journals</h2>
      <SearchInput entries={entries} />
      <NewEntry />
      <ScrollArea className="h-[200px] w-full flex-auto">
        <div className="grid gap-5 pb-3 md:flex md:flex-wrap">
          <EntryCard entries={entries} />
        </div>
      </ScrollArea>
    </div>
  )
}

export default Page
