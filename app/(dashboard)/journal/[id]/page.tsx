import Editor from '@/components/editor'
import { getEntryById } from '@/services/actions'
import { currentUser } from '@clerk/nextjs/server'

const page = async ({ params }) => {
  const entry = await getEntryById(params.id)
  const user = await currentUser()

  return <Editor entry={entry} user={user.firstName} />
}
export default page
