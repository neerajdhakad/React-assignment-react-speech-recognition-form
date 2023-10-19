import { useEffect, useState } from "react";

function Read() {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getUsers() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        console.error("Server Error:", result.error);
        setError(result.error || "Server Error");
      } else {
        setData(result);
        console.log("Data from API:", result);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Fetch Error");
    }
  }

  const handleDelete = async (id) =>{
    const response = await fetch(`http://localhost:5000/${id}`,{
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Server Error:", result.error);
      setError(result.error || "Server Error");
    } 
    if(response.ok){
      setError("Deleted Successfully!");
      setTimeout(() => {
        setError("");
        getUsers();
      }, 2000);
    }
  }    

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container mt-4">
    <div> {error && <div className="alert alert-danger">{error}</div>}</div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">State</th>
                <th scope="col">District</th>
                <th scope="col">Village</th>
                <th scope="col">PAN Card</th>
                <th scope="col">Aadhaar Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>

              {data?.map((item,index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.state}</td>
                  <td>{item.district}</td>
                  <td>{item.village}</td>
                  <td>{item.panCard}</td>
                  <td>{item.aadhaarNumber}</td>
                  <td>
                  <a style={{ color: 'blue' }} onClick={()=>handleDelete(item._id)}>
                    Delete
                  </a>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );

}


export default Read;
