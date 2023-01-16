import { createNewUser } from '@/services/actions'
const page = async () => {
  await createNewUser()
  return <div className="text-2xl text-black">...loading</div>
}
export default page
