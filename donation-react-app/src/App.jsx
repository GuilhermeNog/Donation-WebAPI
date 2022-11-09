import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { ModalFooter } from "reactstrap";
import { FaTrash, FaPen, FaMarker } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function App() {
  const baseUrl = "http://localhost:50944/api/dcandidate";

  const [data, setData] = useState([]);
  const [selectCandidate, setSelectCandidate] = useState({
    id: "",
    fullName: "",
    email: "",
    bloodGroup: "",
    mobile: "",
    age: "",
    address: "",
  });
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectCandidate({ ...selectCandidate, [name]: value });
    console.log(selectCandidate);
  };

  const getRequest = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postRequest = async () => {
    delete selectCandidate.id;
    selectCandidate.age = parseInt(selectCandidate.age);
    await axios
      .post(baseUrl, selectCandidate)
      .then((response) => {
        setData(data.concat(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putRequest = async () => {
    selectCandidate.age = parseInt(selectCandidate.age);
    await axios
      .put(baseUrl + "/" + selectCandidate.id, selectCandidate)
      .then((response) => {
        var answer = response.data;
        var auxData = data;
        auxData.map((dcandidate) => {
          if (dcandidate.id == selectCandidate.id) {
            dcandidate.fullName = answer.fullName;
            dcandidate.mobile = answer.mobile;
            dcandidate.email = answer.email;
            dcandidate.age = answer.age;
            dcandidate.bloodGroup = answer.bloodGroup;
            dcandidate.address = answer.address;
          }
        });
        openAndCloseEditModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRequest = async () => {
    await axios
      .delete(baseUrl + "/" + selectCandidate.id)
      .then((respose) => {
        setData(data.filter((dcandidate) => dcandidate.id !== respose.data));
        openAndCloseDeleteModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectModalDCandidate = (dcandidate, opcao) => {
    setSelectCandidate(dcandidate);
    opcao === "Edit" ? openAndCloseEditModal() : openAndCloseDeleteModal();
  };

  const openAndCloseEditModal = () => {
    setEditModal(!editModal);
  };

  const openAndCloseDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  useEffect(() => {
    getRequest();
  });

  return (
    <div className="App">
      <br />
      <h1 color="#000">Cadastro de Doação</h1>

      <form className="form-control">
        <div className="half left">
          <input
            type="text"
            placeholder="Nome"
            name="fullName"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={handleChange}
          />
          <select
            className="form-select"
            name="bloodGroup"
            onChange={handleChange}
          >
            <option seleted className="select-font">
              Blood Group
            </option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="half right">
          <input
            type="text"
            placeholder="Telefone"
            name="mobile"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Idade"
            name="age"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Cidade"
            name="address"
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Enviar Dados"
          class="btn-submit"
          onClick={() => postRequest()}
        />
      </form>

      <Modal
        isOpen={editModal}
        overlayClassName="modal-overlay-edit"
        className="modal-content-edit"
      >
        <h2>Editar Candidato</h2>
        <hr />
        <form className="form-control">
          <input
            type="text"
            className="form-id"
            readOnly
            value={selectCandidate && selectCandidate.id}
          />
          <div className="half left">
            <input
              type="text"
              placeholder="Nome"
              name="fullName"
              onChange={handleChange}
              value={selectCandidate && selectCandidate.fullName}
            />
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
              value={selectCandidate && selectCandidate.email}
            />
            <select
              className="form-select"
              name="bloodGroup"
              onChange={handleChange}
              value={selectCandidate && selectCandidate.bloodGroup}
            >
              <option seleted>Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="half right">
            <input
              type="text"
              placeholder="Telefone"
              name="mobile"
              onChange={handleChange}
              value={selectCandidate && selectCandidate.mobile}
            />
            <input
              type="number"
              placeholder="Idade"
              name="age"
              onChange={handleChange}
              value={selectCandidate && selectCandidate.age}
            />
            <input
              type="text"
              placeholder="Cidade"
              name="address"
              onChange={handleChange}
              value={selectCandidate && selectCandidate.address}
            />
          </div>
        </form>

        <ModalFooter className="modal-fotter">
          <button className="submit-model-edit" onClick={() => putRequest()}>
            Editar
          </button>
          <button
            className="submit-model-cancel"
            onClick={() => openAndCloseEditModal()}
          >
            Fechar
          </button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={deleteModal}
        overlayClassName="modal-overlay-delete"
        className="modal-content-delete"
      >
        <h3>
          Confirmar a exclusão deste(a) candidato(a):{" "}
          {selectCandidate && selectCandidate.fullName}?
          <hr />
        </h3>

        <ModalFooter>
          <button
            className="submit-model-confirmation"
            onClick={() => deleteRequest()}
          >
            Sim
          </button>
          <button
            className="submit-model-cancel"
            onClick={() => openAndCloseDeleteModal()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>

      <div>
        <table className="table-container">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Tipo sanguíneo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((dcandidate) => (
              <tr key={dcandidate.id}>
                <td>{dcandidate.fullName}</td>
                <td>{dcandidate.mobile}</td>
                <td>{dcandidate.bloodGroup}</td>
                <td>
                  <FiEdit
                    className="icon-edit"
                    onClick={() => selectModalDCandidate(dcandidate, "Edit")}
                  />
                  <IoClose
                    className="icon-delete"
                    onClick={() => selectModalDCandidate(dcandidate, "Delete")}
                  />
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
