import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../api/axios";
import styles from "./styles.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{5,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#$%]).{8,24}$/;

const RegisterForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  //const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    console.log(username, pwd);

    try {
      const response = await axios.post(
        "auth/login",
        JSON.stringify({ username, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);
      console.log(JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? styles.errMsg : styles.offscreen}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username:{"  "}</label>
        <FontAwesomeIcon
          icon={faCheck}
          className={validName ? styles.valid : styles.hide}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validName || !username ? styles.hide : styles.invalid}
        />
        <input
          type="text"
          id="username"
          ref={usernameRef}
          autoComplete="off"
          maxLength={15}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />

        <p
          id="uidnote"
          className={
            userFocus && username && !validName
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          6 to 15 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <br />

        <label htmlFor="password">Password: </label>
        <FontAwesomeIcon
          icon={faCheck}
          className={validPwd ? styles.valid : styles.hide}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validPwd || !pwd ? styles.hide : styles.invalid}
        />
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          maxLength={24}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={
            pwdFocus && !validPwd ? styles.instructions : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters: <span aria-label="hyphen">-</span>{" "}
          <span aria-label="underscore">_</span>{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <br />

        <label htmlFor="confirm_pwd">Confirm Password: </label>
        <FontAwesomeIcon
          icon={faCheck}
          className={validMatch && matchPwd ? styles.valid : styles.hide}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validMatch || !matchPwd ? styles.hide : styles.invalid}
        />
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={
            matchFocus && !validMatch ? styles.instructions : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>
        <br />

        <button
          type="submit"
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>

      <p>
        Already registered?{" "}
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign In</a>
        </span>
      </p>
    </section>
  );
};

export default RegisterForm;
