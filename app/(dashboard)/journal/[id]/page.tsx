import Editor from '@/components/editor'
import { getEntryById } from '@/utils/action'

const page = async ({ params }) => {
  const entry = await getEntryById(params.id)

  return <Editor entry={entry} />
}
export default page
