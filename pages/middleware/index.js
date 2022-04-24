import { useSession } from "next-auth/react"
import PrivateLayout from "../../components/PrivateLayout"

export default function MePage() {
  const { data } = useSession();
  console.log(data, 'session from me');

  return (
    <PrivateLayout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </PrivateLayout>
  )
}