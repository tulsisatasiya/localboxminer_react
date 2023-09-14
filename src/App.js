import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Header from "./Header";

function App() {
  const getData = () => {
    let getItemData = localStorage.getItem("crud");

    if (getItemData) {
      return JSON.parse(getItemData);
    } else {
      return [];
    }
  };

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [data, setData] = useState(getData());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editId, setEditId] = useState(null);

  const nameHandleChange = (e) => {
    setNameInput(e.target.value);
  };
  const emailHandleChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, { name: nameInput, email: emailInput }]);
    setNameInput("");
    setEmailInput("");
  };
  const updateSubmit = (e) => {
    e.preventDefault();
    setToggleBtn(true);
    data.splice(editId, 1, { name: nameInput, email: emailInput });
    setData([...data]);
    setNameInput("");
    setEmailInput("");
    setEditId(null);
  };

  const deleteData = (id) => {
    let result = data.filter((val, ind) => ind !== id);
    setData([...result]);
  };

  const editData = (id) => {
    let getItem = data.find((val, ind) => ind === id);
    setToggleBtn(false);
    setEditId(id);
    setNameInput(getItem.name);
    setEmailInput(getItem.email);
  };

  useEffect(() => {
    localStorage.setItem("crud", JSON.stringify(data));
  }, [data]);

  return (
    <div className="App">
      <Header />
      <div className="container mt-5">
        <form
          className="text-start"
          onSubmit={toggleBtn ? handleSubmit : updateSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={nameHandleChange}
              value={nameInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email :
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              onChange={emailHandleChange}
              value={emailInput}
            />
          </div>
          {toggleBtn ? (
            <button type="submit" className="btn btn-primary me-3">
              Submit
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary me-3">
              Update
            </button>
          )}
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, ind) => (
              <tr key={`ab${ind}`}>
                <td scope="col">{ind + 1}</td>
                <td scope="col">{val.name}</td>
                <td scope="col">{val.email}</td>
                <td scope="col">
                  <button
                    className="btn btn-danger me-3"
                    onClick={() => {
                      deleteData(ind);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      editData(ind);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
