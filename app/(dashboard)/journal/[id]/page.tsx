import Editor from '@/components/editor'
import { getEntryById } from '@/services/actions'

const page = async ({ params }) => {
  const entry = await getEntryById(params.id)

  return <Editor entry={entry} />
}
export default page
