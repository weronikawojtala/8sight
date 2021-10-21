import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
//import { FiUserCheck } from "react-icons/fi";

const UsersAwardsTable = () => {
  return (
    <div className="card">
      <div className="card-info">
        <Table borderless>
          <thead>
            <tr>
              <th> </th>
              <th>Award name</th>
              <th>Date of achievement</th>
              <th>Progress to next level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{/* <FiUserCheck /> */}</td>
              <td>1</td>
              <td>10.10.2021</td>
              <td>
                <ProgressBar animated now={45} />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Thornton</td>
              <td>Thornton</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UsersAwardsTable;
