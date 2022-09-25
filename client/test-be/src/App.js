import "./App.css";
import { useState, useEffect } from "react";
import Search from "./Components/Search/Search";
import { getAllUser, getUser, updateUser } from "./sevices/userAPI";

function App() {
    const [users, setUsers] = useState([]);
    const [userEdit, setUserEdit] = useState({});

    const getListUser = async () => {
        const userData = await getAllUser();
        setUsers(userData.user);
    };

    useEffect(() => {
        getListUser();
    }, []);

    const handleSearch = async (searchValue) => {
        const searchUserData = await getUser(searchValue);
        setUsers(searchUserData.user);
    };

    const handleSetUserEdit = (user) => {
        setUserEdit({ _id: user._id, username: user.username, email: user.email, birthdate: user.birthdate });
    };

    const handleUpdate = async () => {
        const result = await updateUser(userEdit);

        result?.success ? getListUser() : alert(result?.message);

        setUserEdit({});
    };

    const handleCancel = () => {
        setUserEdit({});
    };

    const datatable = users.map((user, index) => {
        return user._id != userEdit._id ? (
            <tr
                key={index}
                onClick={() => {
                    handleSetUserEdit(user);
                }}
            >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.birthdate.substring(0, 10)}</td>
            </tr>
        ) : (
            <tr key={index} style={{ backgroundColor: "#eee" }}>
                <td>
                    <input
                        className="input-user-edit"
                        value={userEdit.username}
                        onChange={(e) => {
                            setUserEdit((prev) => ({ ...prev, username: e.target.value }));
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        className="input-user-edit"
                        value={userEdit.email}
                        onChange={(e) => {
                            setUserEdit((prev) => ({ ...prev, email: e.target.value }));
                        }}
                    ></input>
                </td>
                <td>
                    <input
                        className="input-user-edit"
                        value={userEdit.birthdate.substring(0, 10)}
                        type="Date"
                        onChange={(e) => {
                            setUserEdit((prev) => ({ ...prev, birthdate: e.target.value }));
                        }}
                    ></input>
                </td>
            </tr>
        );
    });

    return (
        <div className="App">
            <Search handleSearch={handleSearch} />

            <table className="table">
                <thead>
                    <tr>
                        <th>username</th>
                        <th>email</th>
                        <th>birthdate</th>
                    </tr>
                </thead>
                <tbody>{datatable}</tbody>
            </table>

            {userEdit._id && (
                <>
                    <button
                        className="update-btn"
                        onClick={() => {
                            handleCancel();
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="update-btn"
                        onClick={() => {
                            handleUpdate();
                        }}
                    >
                        Update
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
