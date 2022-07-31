
const NewsRow = ({_id,username,title,likes}) => {
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{username}</td>
      <td>{title}</td>
      <td>
        <div className="dropdown">
          <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="badge text-bg-dark">{likes.length}</span>
          </button>
          {likes.length &&
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {likes.map((username,i)=>{
                return <li key={i}><a className="dropdown-item">{username}</a></li>
              })}
            </ul>
          }
        </div>
      </td>
      <td>hi</td>
    </tr>  );
}


export default NewsRow;
