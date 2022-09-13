import React from "react";
import {
  selectCurrentRoles,
  selectCurrentUserId,
  selectCurrentUser,
} from "../features/auth/authSlice";

import {
  useUpdateEmployeePwdMutation,
  useUpdateEmployeeUsernameMutation,
} from "../features/employees/employeesApiSlice";
import {
  useUpdateUserPwdMutation,
  useUpdateUserUsernameMutation,
} from "../features/users/usersApiSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Settings = () => {
  const [updateEmployeePwd] = useUpdateEmployeePwdMutation();
  const [updateEmployeeUsername] = useUpdateEmployeeUsernameMutation();
  const [updateUserPwd] = useUpdateUserPwdMutation();
  const [updateUserUsername] = useUpdateUserUsernameMutation();

  const userId = useSelector(selectCurrentUserId);
  const roles = useSelector(selectCurrentRoles);
  const username = useSelector(selectCurrentUser);

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [newUsername, setNewUsername] = useState("");
  const [validNewUsername, setValidNewUsername] = useState(false);
  const [newUsernameFocus, setNewUsernameFocus] = useState(false);

  const [oldPwd, setOldPwd] = useState("");

  const [newPwd, setNewPwd] = useState("");
  const [validNewPwd, setValidNewPwd] = useState(false);
  const [newPwdFocus, setNewPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [pwdError, setPwdError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [pwdSuccess, setPwdSuccess] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");

  useEffect(() => {
    setPwdError("");
  }, [newPwd, oldPwd]);

  useEffect(() => {
    setUsernameError("");
  }, [newUsername]);

  useEffect(() => {
    const result = USER_REGEX.test(newUsername);
    setValidNewUsername(result);
  }, [newUsername]);

  useEffect(() => {
    const result = PWD_REGEX.test(newPwd);
    setValidNewPwd(result);
    const match = newPwd === matchPwd;
    setValidMatch(match);
  }, [newPwd, matchPwd]);

  const changeUsername = async (e) => {
    e.preventDefault();
    try {
      if (roles.includes(2001)) {
        await updateUserUsername({ userId, info: { newUsername } }).unwrap();
      } else {
        await updateEmployeeUsername({
          employeeId: userId,
          info: { newUsername },
        }).unwrap();
      }
      setUsernameSuccess("Your username has been changed");
      setNewUsername("");
    } catch (err) {
      if (!err?.status) {
        setUsernameError("No Server Response");
      } else if (err.status === 400) {
        setUsernameError("Missing New Username ");
      } else if (err.status === 409) {
        setUsernameError("Username is taken");
      } else {
        setUsernameError("Change Failed");
      }
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      if (roles.includes(2001)) {
        await updateUserPwd({
          userId,
          info: { newPassword: newPwd, oldPassword: oldPwd },
        }).unwrap();
      } else {
        await updateEmployeePwd({
          employeeId: userId,
          info: { newPassword: newPwd, oldPassword: oldPwd },
        }).unwrap();
      }
      setPwdSuccess("Your password has been changed");
      setOldPwd("");
      setNewPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.status) {
        setPwdError("No Server Response");
      } else if (err.status === 400) {
        setPwdError("Missing New Username or Old Password");
      } else if (err.status === 403) {
        setPwdError("Unauthorized");
      } else {
        setPwdError("Change Failed");
      }
    }
  };

  return (
    <div className="card-body">
      <h5 className="card-title">Settings</h5>
      {usernameError && (
        <div className="alert alert-danger" role="alert">
          {usernameError}
        </div>
      )}
      {usernameSuccess && (
        <div className="alert alert-success" role="alert">
          {usernameSuccess}
        </div>
      )}
      {username.includes("default") && (
        <div className="alert alert-danger" role="alert">
          Not allowed to modify default accounts
        </div>
      )}
      <form onSubmit={changeUsername} className="mb-2">
        <fieldset>
          <legend className="">Change username</legend>
          <div className="mb-3">
            <label className="form-label">New username</label>
            <input
              type="text"
              className="form-control"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onFocus={() => setNewUsernameFocus(true)}
              onBlur={() => setNewUsernameFocus(false)}
            />
          </div>
          {newUsernameFocus && newUsername && !validNewUsername && (
            <div className="alert alert-dark mt-2" role="alert">
              4 to 24 characters. Must begin with a letter. Letters, numbers,
              underscores, hyphens allowed.
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!newUsername ? true : false}
          >
            Change
          </button>
        </fieldset>
      </form>
      {pwdError && (
        <div className="alert alert-danger" role="alert">
          {pwdError}
        </div>
      )}
      {pwdSuccess && (
        <div className="alert alert-success" role="alert">
          {pwdSuccess}
        </div>
      )}
      <form onSubmit={changePassword} className="mt-2">
        <fieldset>
          <legend>Change password</legend>
          <div className="mb-3">
            <label className="form-label">Old password</label>
            <input
              type="text"
              className="form-control"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New password</label>
            <input
              type="text"
              className="form-control"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              onFocus={() => setNewPwdFocus(true)}
              onBlur={() => setNewPwdFocus(false)}
            />
          </div>
          {newPwdFocus && !validNewPwd && (
            <div className="alert alert-dark mt-2" role="alert">
              8 to 24 characters. Must include uppercase and lowercase letters,
              a number and a special character.
              <br />
              Allowed special characters: !@#$%
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Confirm password</label>
            <input
              type="text"
              className="form-control"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </div>
          {matchFocus && !validMatch && (
            <div className="alert alert-dark mt-2" role="alert">
              Must match the first password input field
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!oldPwd || !validNewPwd || !validMatch ? true : false}
          >
            Change
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Settings;
