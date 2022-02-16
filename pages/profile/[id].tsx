import {Button} from "@mui/material";
import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";


export default function Profile (props: any) {
  const router = useRouter();
  const { id } = props;

  return (
    <>
      <Button
        sx={{marginRight: '20px',
          background: '#a8edea',
          color: '#3b3b3b'}}
        onClick={() => router.push(`/main/${id}`)}
        variant="contained"
      >TO LIST
      </Button>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { getUserById, getAllTasks } = apiServices();
  const responseUser = await getUserById(context.params.id);
  const { id, email, registration } = responseUser.data;
  const date = new Date(Number(registration));
  const registrationDate = {
    day: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear(),
  }
  const responseData = await getAllTasks(context.params.id);
  // console.log(Math.floor((Date.now() - Number(responseData.data[1].date))/1000/60/60));
  const dataInfo = {
    count: responseData.data.length
  }

  return {
    props: { id, email, registrationDate, dataInfo },
  }
}
