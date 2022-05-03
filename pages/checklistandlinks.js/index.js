
import PrivateLayout from "../../components/PrivateLayout";


export default function ChecklistPage() {
  return (
    <>

    </>
  );
}

ChecklistPage.getLayout = function getLayout(page) {
    return (
      <PrivateLayout>
        {page}
      </PrivateLayout>
    )
  }


