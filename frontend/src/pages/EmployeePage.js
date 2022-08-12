import {useGetEmployeeByIdQuery} from '../features/employees/employeesApiSlice'
import {useLocation,useNavigate,Link,useParams} from "react-router-dom"
import NewsGrid from '../components/NewsGrid'

const EmployeePage = () => {
  const {employeeId} = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const {data:employee,isLoading,isError,isSuccess,error} = useGetEmployeeByIdQuery(employeeId)
  let content
  if(isLoading){
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }else if(isSuccess && employee?.news.length){
    content = (
                <>
                  <h5 className="card-title ">{`${employee.username}'s page`}</h5>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {employee.news.map((article) => <NewsGrid key={article} article={article}/>
                    )}
                  </div>
                </>     
              )
  }else if(isSuccess){
    content = (
                <>
                  <h5 className="card-title ">{`${employee.username}'s page`}</h5>
                  <div class="alert alert-dark" role="alert">
                    No news to display
                  </div>
                </>
              )
  }else if(isError){
    console.error(error);
    navigate('/login', { state: { from: location }, replace: true });
  }

  return (
    <div className="card-body">
      {content}
    </div>
  )
}


export default EmployeePage;
